## vue3响应式

### 手写ref、reactive
ref
```js
import { reactive } from './reactive.js'
import { track, trigger } from './effect.js'


export function ref(val) {  // 将原始类型数据变成响应式 引用类型也可以
  return createRef(val)
}

function createRef(val) {
  // 判断val是否已经是响应式
  if (val.__v_isRef) {
    return val
  }

  // 将val变为响应式
  return new RefImpl(val)
}


 // const age = ref({n: 18})
class RefImpl {  
  constructor(val) {
    this.__v_isRef = true // 给每一个被ref操作过的属性值都添加标记
    this._value = convert(val)
  }

  get value() {
    // 为this对象做依赖收集
    track(this, 'value')
    return this._value
  }

  set value(newVal) {
    // console.log(newVal);
    
    if (newVal !== this._value) {
      this._value = convert(newVal)
      trigger(this, 'value') // 触发掉 'value' 上的所有副作用函数
    }
  }

}

function convert(val) {
  if (typeof val !== 'object' || val === null) {  // 不是对象
    return val
  } else {
    return reactive(val)
  }
}
```

reactive
```js
import { mutableHandlers } from './baseHandlers.js'

// 保存被代理过的对象
export const reactiveMap = new WeakMap() // new Map() // new WeakMap 对内存的回收更加友好


export function reactive(target) { // 将target变成响应式
    return createReactiveObject(target, reactiveMap, mutableHandlers)
}


export function createReactiveObject(target, proxyMap, proxyHandlers) { // 创建响应式的函数
    // 判断target是不是一个引用类型
    if (typeof target !== 'object' || target === null) {  // 不是对象就不给操作
        return target
    }

    // 该对象是否已经被代理过(已经是响应式对象)
    const existingProxy = proxyMap.get(target)
    if (existingProxy) {
        return existingProxy
    }

    // 执行代理操作（将target处理成响应式）
    const proxy = new Proxy(target, proxyHandlers) // 第二个参数的作用：当target被读取值，设置值，判断值等等操作时会触发的函数

    // 往 proxyMap 增加 proxy, 把已经代理过的对象缓存起来
    proxyMap.set(target, proxy)

    return proxy
}
```

```js
import { track, trigger } from './effect.js'
const get = createGetter(); // 创建一个get函数
const set = createSetter(); // 创建一个set函数

function createGetter() {
    return function get(target, key, receiver) {
        console.log('target被读取值');
        const res = Reflect.get(target, key, receiver); // 获取源对象中的键值
        // 这个属性究竟还有哪些地方用到了，（副作用函数的收集，computed,watch...）
        track(target, key)


        return res;
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        console.log('target被设置值', key, value);
        const res = Reflect.set(target, key, value, receiver); // 设置源对象中的键值 === target[key] = value


        // 需要记录下来此时是哪一个key的值变更了，再去通知其他依赖该值的函数生效，更新浏览器的视图(响应式)
        // 触发被修改的属性身上的副函数 依赖收集（被修改的key在哪些地方被使用了）发布订阅
        trigger(target, key)
        return res;
    }
}


export const mutableHandlers = {
    get,
    set,
}
```
### watchEffect 、computed、 render effect 的核心 —— ReactiveEffect

Vue 3 的响应式系统核心就是 `ReactiveEffect` 这个类，三者都是它的上层封装：

#### 继承关系
```
ReactiveEffect (核心)
├── computed → ComputedRefImpl 内部持有一个 ReactiveEffect
├── watchEffect → 直接创建 ReactiveEffect
└── render effect → 组件渲染时创建的 ReactiveEffect
```

#### 各自的差异

| | computed | watchEffect | render effect |
|---|---|---|---|
| **懒执行** | ✅ 懒（访问时才算） | ❌ 立即执行 | ❌ 立即执行 |
| **缓存** | ✅ 有缓存 | ❌ 无 | ❌ 无 |
| **scheduler** | 标记dirty，不立即重算 | queueFlush异步调度 | queueFlush异步调度 |
| **返回值** | 有返回值 | 无 | 生成vdom |

#### 核心机制都一样

​```js
// 本质上都在做这件事：
const effect = new ReactiveEffect(fn, scheduler)
effect.run() // 执行fn时，自动收集依赖（track）
// 依赖变化时，触发scheduler或重新run（trigger）
​```

#### computed 特殊在哪

computed 引入了 **dirty 标志** 做缓存控制：
```
依赖变化 → 不立即重算 → 只把 dirty 置为 true
访问 .value → dirty为true才重算 → 再把dirty置false
```

#### render effect 特殊在哪

组件挂载时，`mountComponent` 内部调用 `setupRenderEffect`，创建一个 ReactiveEffect，`fn` 就是组件的渲染函数，依赖变化时走 scheduler 排进异步队列，批量更新 DOM。

---


ReactiveEffect 核心
```js
let activeEffect = null  // 当前正在执行的effect

class ReactiveEffect {
  constructor(fn, scheduler = null) {
    this.fn = fn
    this.scheduler = scheduler  // 自定义调度，不传就直接重新run
    this.deps = []              // 收集了哪些依赖
    this.dirty = true           // computed用，标记是否需要重算
  }

  run() {
    activeEffect = this         // 设置当前活跃effect
    const result = this.fn()    // 执行fn，触发getter，自动track
    activeEffect = null
    return result
  }

  trigger() {
    if (this.scheduler) {
      this.scheduler()          // 有scheduler就走scheduler
    } else {
      this.run()                // 没有就直接重新执行
    }
  }
}
```

track / trigger（响应式核心）
```js
const targetMap = new WeakMap()

// 收集依赖：在getter里调用
function track(target, key) {
  if (!activeEffect) return     // 没有活跃effect，不收集
  
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, depsMap = new Map())
  
  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, dep = new Set())
  
  dep.add(activeEffect)         // effect订阅这个key
  activeEffect.deps.push(dep)   // effect也记录自己订阅了哪些
}

// 触发更新：在setter里调用
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  dep?.forEach(effect => effect.trigger())
}
```

watchEffect
```js
function watchEffect(fn) {
  const effect = new ReactiveEffect(fn, () => {
    // scheduler：异步调度，下一个tick执行
    queueMicrotask(() => effect.run())
  })
  
  effect.run()  // 立即执行一次，同时收集依赖
  
  return () => effect.stop()  // 返回停止函数
}

// 使用
const count = ref(0)
watchEffect(() => {
  console.log(count.value)  // 访问.value触发track，收集依赖
})
count.value++  // 触发trigger → scheduler → 异步重新run
```

computed
```js
function computed(getter) {
  let _value
  
  const effect = new ReactiveEffect(getter, () => {
    // scheduler：依赖变化时，不立即重算，只标记dirty
    if (!effect.dirty) {
      effect.dirty = true
      // 通知依赖这个computed的effect也要更新
      triggerRefValue(computedRef)
    }
  })

  const computedRef = {
    get value() {
      trackRefValue(computedRef)  // computed本身也被追踪
      if (effect.dirty) {         // 只有dirty才重新计算
        effect.dirty = false
        _value = effect.run()
      }
      return _value
    }
  }
  
  return computedRef
}

// 使用
const count = ref(1)
const double = computed(() => count.value * 2)

console.log(double.value)  // 执行getter，收集count依赖，dirty=false
console.log(double.value)  // dirty=false，直接返回缓存，不重新计算！
count.value = 2            // trigger → scheduler → dirty=true
console.log(double.value)  // dirty=true，重新计算
```

render effect
```js
function mountComponent(vnode, container) {
  const { render, setup } = vnode.type
  const setupResult = setup()
  
  // 渲染effect：依赖变化时，异步重新渲染
  const effect = new ReactiveEffect(
    () => {
      const subTree = render(setupResult)  // 执行render，收集依赖
      patch(prevSubTree, subTree, container)
      prevSubTree = subTree
    },
    () => {
      // scheduler：不立即重渲染，进队列批量处理
      queueJob(() => effect.run())
    }
  )
  
  effect.run()  // 首次挂载
}
```

#### 串起来看
```
ref/reactive 的 getter  →  track(target, key)  →  dep.add(activeEffect)
ref/reactive 的 setter  →  trigger(target, key) →  effect.trigger()
                                                        ↓
                                              有scheduler → scheduler()
                                              没scheduler → effect.run()
```
四者的区别就是传给 ReactiveEffect 的 fn 和 scheduler 不同，核心的依赖收集和触发机制完全共用。







### shallowRef、shallowReactive
`shallowRef` 是 Vue 3 提供的一个"浅层"响应式 API，和 `ref`、`reactive` 的核心区别在于响应式追踪的深度。

只对 `.value` 的赋值操作做响应式追踪，不会递归地将内部属性转为响应式。
```js
const state = shallowRef({ count: 0, nested: { a: 1 } })

// ✅ 触发更新（替换整个 .value）
state.value = { count: 1, nested: { a: 2 } }

// ❌ 不会触发更新（修改内部属性）
state.value.count = 10
state.value.nested.a = 99
```

如果确实需要修改内部属性后触发更新，可以配合 `triggerRef(state)` 手动触发。

#### 与 ref 的对比

`ref` 会对 `.value` 做深层递归响应式转换（内部对象会被自动包一层 `reactive`）。
```js
const state = ref({ count: 0, nested: { a: 1 } })

state.value.count = 10        // ✅ 触发更新
state.value.nested.a = 99     // ✅ 也触发更新
```

所以 `ref` 等价于"自动深层代理"，而 `shallowRef` 只代理最外面那一层 `.value`。

#### 与 reactive 的对比

`reactive` 直接返回一个深层响应式代理对象，没有 `.value` 包装，但同样是深层追踪。
```js
const state = reactive({ count: 0, nested: { a: 1 } })

state.count = 10       // ✅ 触发
state.nested.a = 99    // ✅ 触发
```

`shallowRef` 和 `reactive` 的差异有两点：一是 `shallowRef` 有 `.value` 包装，二是 `shallowRef` 只做浅层追踪。类似地，Vue 也提供了 `shallowReactive`，作用是只追踪对象第一层属性的变化。

#### 什么时候用 shallowRef

主要有几个场景：

- **性能优化** —— 当数据结构很大（比如几千条数据的列表、大型树结构），深层代理的开销明显时，用 `shallowRef` 可以避免不必要的递归代理，每次更新时直接替换整个 `.value` 即可。
- **存放非响应式对象** —— 比如第三方库实例（ECharts 实例、地图实例、Web Worker 等），这些对象不应该被 Vue 代理，否则可能导致意外行为或性能问题。
- **与不可变数据模式配合** —— 如果你的数据更新策略是"每次产生新对象而非原地修改"（类似 React 的 state 理念），`shallowRef` 就非常契合。

#### 速查总结

| 特性 | `ref` | `shallowRef` | `reactive` | `shallowReactive` |
|------|-------|--------------|------------|-------------------|
| `.value` 包装 | 是 | 是 | 否 | 否 |
| 深层响应式 | 是 | 否 | 是 | 否 |
| 触发更新方式 | 修改任意深度属性 | 替换 `.value` | 修改任意深度属性 | 修改第一层属性 |
| 典型场景 | 通用 | 大数据/外部实例 | 通用对象 | 扁平对象优化 |

## dom diff核心算法——最长递增子序列


 Vue 会把我们编写的组件转换成虚拟 DOM 树，并且将虚拟 DOM 树进行比较后再根据变化情况更新真实 DOM。比如原有列表为 [a, b, c, d, e, f] ，而新列表为 [a, d, b, c, e, f]， 这时会这样进行 diff：

- 去除相同前置和后置元素 ，此优化由 Neil Fraser 提出，可以比较容易实现而且带来带来比较明显的提升；

  比如针对上情况，去除相同的前置和后置元素后，真正需要处理的是 [ b, c, d] 和 [d, b, c] ，复杂性会大大降低。



- 最长递增子序列

  接着要将原数组中的[ b, c, d] 转化成 [d, b, c] 。Vue3 中对移动次数进行了进一步的优化。下面对这个算法进行介绍：

  - 首先遍历新列表，通过 key 去查找在原有列表中的位置，从而得到新列表在原有列表中位置所构成的数组。比如原数组中的[ b, c, d]， 新数组为 [d, b, c] ，得到的位置数组为 [3, 1, 2] ，现在的算法就是通过位置数组判断最小化移动次数；

  - 计算最长递增子序列

    最长递增子序列是经典的动态规划算法，不了解的可以前往 最长递增子序列 去补充一下前序知识。那么为什么最长递增子序列就可以保证移动次数最少呢？因为在位置数组中递增就能保证在旧数组中的相对位置的有序性，从而不需要移动，因此递增子序列的最长可以保证移动次数的最少

    对于前面的得到的位置数组[3, 1, 2]，得到最长递增子序列 [1, 2] ，在子序列内的元素不移动，不在此子序列的元素移动即可。对应的实际的节点即 d 节点移动至b, c前面即可。

vue3源码：👉 https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L2482 getSequence方法。

### 源码
```js
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```

### 源码解读：

它结合了动态规划和二分查找的技巧，时间复杂度为 O(NlogN)。下面是对这段代码的逐行解析，帮助理解它是如何工作的：

1. 初始化和准备阶段：

     - const p = arr.slice()：创建一个数组 p，初始时是 arr 的一个副本。实际上，p 用于记录每个元素在 LIS 中前一个元素的索引，帮助我们最后重建序列。
     - const result = [0]：初始化结果数组 result，开始时只包含第一个元素的索引（假设第一个元素至少是一个长度为1的递增序列）。
2. 主循环：遍历输入数组 arr 的每个元素 arrI。

     - 如果 arrI 不等于 0（这里的检查似乎是特定场景的优化或条件，可能用于过滤掉某些特定值，不是LIS算法的标准部分），执行以下逻辑：
       - 检查当前元素是否可以直接添加到现有的 LIS 末尾，即判断当前元素是否大于 result 最后一个元素对应的 arr 中的值。
       - 如果是，更新 p[i]（表示 arr[i] 是在 LIS 中紧跟在 arr[j] 后面的元素），并将当前索引 i 添加到 result 中。
3. 二分查找：如果当前元素 arrI 不能直接加到 result 的末尾，使用二分查找在 result 中找到第一个不小于 arrI 的元素位置 u。这部分是为了找到 arrI 可以替换的位置，以保持 result 中的序列最长且尾部最小。

4. 更新 result 和 p：根据二分查找的结果更新 result 和 p。如果找到了一个合适的位置 u，并且 arrI 小于这个位置对应的 arr 中的值，就用 i 替换 result[u]，并且更新 p[i] 来记录这个元素在 LIS 中前一个元素的索引。

5. 重建 LIS：最后，使用 p 数组从后向前重建 LIS。u = result.length 是 LIS 的长度，v = result[u - 1] 是 LIS 最后一个元素的索引。然后逆序遍历 result，使用 p 数组回溯每个元素的前驱，重建整个序列。

通过这个过程，result 数组最终包含了最长递增子序列的索引，而不仅仅是长度。这个算法的巧妙之处在于它同时实现了查找 LIS 长度和重建 LIS 序列的功能。

注意
- 此代码的实现假设输入数组 arr 中的元素都是非零的，因为它使用了 if (arrI !== 0) 来进行判断。如果你的应用场景中 0 是有效数据，需要调整这个条件。
- 代码中的 p 数组用于记录在构建 LIS 过程中，每个元素在 LIS 中前一个元素的索引，这是重建 LIS 具体序列的关键。

## Vue3.4 响应式重构——二维双链表

对reactivity的优化，vue3.4 中引入了二维双链表，用于优化 reactivity 的性能。

reference: https://juejin.cn/post/7345725753018236947

## Vue3.5 响应式又重构——减少56%内存

reference:

1.官方 https://blog.vuejs.org/posts/vue-3-5#reactivity-system-optimizations

2.https://www.cnblogs.com/heavenYJJ/p/18542806