import{_ as a,o as n,a as p,aI as e}from"./chunks/framework.CYBiNvwM.js";const h=JSON.parse('{"title":"Vuex","description":"","frontmatter":{},"headers":[],"relativePath":"Vue/Vuex.md","filePath":"Vue/Vuex.md","lastUpdated":1634152441000}'),t={name:"Vue/Vuex.md"};function l(i,s,o,c,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="vuex" tabindex="-1">Vuex <a class="header-anchor" href="#vuex" aria-label="Permalink to &quot;Vuex&quot;">​</a></h1><h2 id="什么是vuex" tabindex="-1">什么是vuex <a class="header-anchor" href="#什么是vuex" aria-label="Permalink to &quot;什么是vuex&quot;">​</a></h2><p><code>VueX</code>是适用于在<code>Vue</code>项目开发时使用的状态管理工具。<code>Vue</code>为这些被多个组件频繁使用的值提供了一个统一管理的工具——<code>VueX</code>。在具有<code>VueX</code>的<code>Vue</code>项目中，我们只需要把这些值定义在<code>VueX</code>中，即可在整个<code>Vue</code>项目的组件中使用。</p><h2 id="如何安装vuex" tabindex="-1">如何安装vuex <a class="header-anchor" href="#如何安装vuex" aria-label="Permalink to &quot;如何安装vuex&quot;">​</a></h2><p><strong>npm</strong>安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm i vuex -s</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h2 id="如何使用vuex" tabindex="-1">如何使用vuex <a class="header-anchor" href="#如何使用vuex" aria-label="Permalink to &quot;如何使用vuex&quot;">​</a></h2><p><strong>在项目的根目录下新增一个store文件夹，在该文件夹内创建index.js</strong> 此时项目的<code>src</code>文件夹是这样的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>│  App.vue</span></span>
<span class="line"><span>│  main.js</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─assets</span></span>
<span class="line"><span>│      logo.png</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─components</span></span>
<span class="line"><span>│      HelloWorld.vue</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─router</span></span>
<span class="line"><span>│      index.js</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─store</span></span>
<span class="line"><span>       index.js</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>在store.js文件中，引入vuex并且使用vuex，这里注意变量名是大写Vue和Vuex</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//store.js</span></span>
<span class="line"><span>import Vue from &#39;vue&#39;</span></span>
<span class="line"><span>import Vuex from &#39;vuex&#39;</span></span>
<span class="line"><span>//挂载Vuex</span></span>
<span class="line"><span>Vue.use(Vuex)</span></span>
<span class="line"><span>//创建VueX对象</span></span>
<span class="line"><span>const store = new Vuex.Store({</span></span>
<span class="line"><span>    state:{</span></span>
<span class="line"><span>        //存放的键值对就是所要管理的状态</span></span>
<span class="line"><span>        name:&#39;helloVueX&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export default store</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>将store挂载到当前项目的Vue实例当中去</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//main.js</span></span>
<span class="line"><span>import store from &#39;./store&#39;</span></span>
<span class="line"><span>new Vue({</span></span>
<span class="line"><span>  el: &#39;#app&#39;,</span></span>
<span class="line"><span>  router,</span></span>
<span class="line"><span>  store,  // 和router一样，将我们创建的Vuex实例挂载到这个vue实例中</span></span>
<span class="line"><span>  render: h =&gt; h(App)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>在组件中使用Vuex</strong> 例如在<code>App.vue</code>中，我们要将<code>state</code>中定义的<code>name</code>拿来在<code>h1标签</code>中显示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div id=&#39;app&#39;&gt;</span></span>
<span class="line"><span>        name:</span></span>
<span class="line"><span>        &lt;h1&gt;{{ $store.state.name }}&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>或者要在组件方法中使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span>    add(){</span></span>
<span class="line"><span>      console.log(this.$store.state.name)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>具体的使用方法下面会详细介绍 <strong>注意</strong>:<code>vuex</code>的出现是为了解决组件间的通信问题,如果某个操作或者数据不涉及到公共操作,只是单一组件操作,不要把这些状态值或者<code>function</code>存储到<code>vuex</code>中,因为<code>vuex</code>会把自身挂载到所有组件上,不管当前组件是否用到里面的东西,因此这事实上肯定增加了性能的损耗的.</p><h2 id="vuex中的核心内容" tabindex="-1">VueX中的核心内容 <a class="header-anchor" href="#vuex中的核心内容" aria-label="Permalink to &quot;VueX中的核心内容&quot;">​</a></h2><p><code>vuex</code>中，有默认的五种基本的对象：</p><ul><li><strong>state</strong>：存储状态（变量）</li><li><strong>getters</strong>：对数据获取之前的再次编译，可以理解为<code>state</code>的计算属性。</li><li><strong>mutations</strong>：修改状态，并且是同步的。这个和我们组件中的自定义事件类似。</li><li><strong>actions</strong>：异步操作。</li><li><strong>modules</strong>：<code>store</code>的子模块</li></ul><h2 id="拆分成单文件" tabindex="-1">拆分成单文件 <a class="header-anchor" href="#拆分成单文件" aria-label="Permalink to &quot;拆分成单文件&quot;">​</a></h2><p>如果项目中的状态和方法过多,<code>index.js</code>文件看起来就会很臃肿并且不好维护,这个时候我们就可以把<code>state</code>,<code>getters</code>,<code>mutations</code>,<code>actions</code>拆分成单个文件,有利于进行管理 此时<strong>目录结构</strong>是这样的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>store</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─index.js</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>├─state.js</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─getters.js</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─mutations.js</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─actions.js</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>index.js</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import Vuex from &#39;vuex&#39;;</span></span>
<span class="line"><span>import state from &#39;./state&#39;;</span></span>
<span class="line"><span>import getters from &#39;./getters&#39;;</span></span>
<span class="line"><span>import mutations from &#39;./mutations&#39;;</span></span>
<span class="line"><span>import actions from &#39;./actions&#39;;</span></span>
<span class="line"><span>Vue.use(Vuex);</span></span>
<span class="line"><span>export default new Vuex.Store({</span></span>
<span class="line"><span>  state,</span></span>
<span class="line"><span>  mutations,</span></span>
<span class="line"><span>  actions,</span></span>
<span class="line"><span>  getters,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>其他的文件中只需要<code>export</code>导出即可 <strong>state.js</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  name:&#39;hzw&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>mutations.js</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span> changeName(state, name) {</span></span>
<span class="line"><span>    state.name = name;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>getters.js</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span> realName(state) {</span></span>
<span class="line"><span>    return &quot;姓名:&quot; + state.name</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>actions.js</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span> changeName({ commit }, name) {</span></span>
<span class="line"><span>        return commit(&#39;changeName&#39;, name)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>这样看起来就更有结构感,也更易于维护了</p><h2 id="state以及mapstate" tabindex="-1">state以及mapState <a class="header-anchor" href="#state以及mapstate" aria-label="Permalink to &quot;state以及mapState&quot;">​</a></h2><h3 id="什么是state" tabindex="-1">什么是state <a class="header-anchor" href="#什么是state" aria-label="Permalink to &quot;什么是state&quot;">​</a></h3><p><strong>state(vuex) ≈ data (vue)</strong><code>vuex</code>的<code>state</code>和<code>vue</code>的<code>data</code>有很多相似之处,都是用于存储一些数据,或者说状态值.这些值都将被挂载数据和<code>dom</code>的双向绑定事件,也就是当值改变的时候可以触发<code>dom</code>的更新. 我们在<code>state.js</code>中声明一个状态<code>count</code>,初始值为<code>0</code>,然后在组件中输出它</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// state.js </span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  count:&#39;0&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//组件中</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;hello&quot;&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;{{$store.state.count}}&lt;/h3&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>结果如下图所示 <img src="https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554815-5828eeef-b7b5-403d-b925-0edfc600c0c6.png#align=left&amp;display=inline&amp;height=645&amp;margin=%5Bobject%20Object%5D&amp;originHeight=645&amp;originWidth=746&amp;size=0&amp;status=done&amp;style=none&amp;width=746" alt=""><strong>注意</strong>:虽然<code>state</code>和<code>data</code>有很多相似之处,但<code>state</code>在使用的时候一般被挂载到子组件的<code>computed</code>计算属性上,这样有利于<code>state</code>的值发生改变的时候及时响应给子组件.如果用<code>data</code>去接收<code>$store.state</code>,也是可以接收到值的,但是由于这只是一个简单的赋值操作,所以<code>state</code>中的状态改变的时候不能被<code>vue</code>中的<code>data</code>监听到.也可以通过<code>watch $store</code>去解决这个问题,但是稍微有点麻烦. 所以,最好还是用<code>computed</code>去接收<code>state</code>,如下,修改<code>state</code>的方法后面会学习,这里先进行展示.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//mutations.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  add(state, n = 0) {</span></span>
<span class="line"><span>    return (state.count += n)</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  reduce(state, n = 0) {</span></span>
<span class="line"><span>    return (state.count -= n)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//组件中</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;hello&quot;&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;{{$store.state.count}}&lt;/h3&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;button @click=&quot;add(10)&quot;&gt;增加&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;button @click=&quot;reduce(10)&quot;&gt;减少&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;div&gt;computed:{{dataCount}}&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div&gt;data: {{count}}&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;HelloWorld&#39;,</span></span>
<span class="line"><span>   data () {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      dataCount: this.$store.state.count //用data接收</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  computed:{</span></span>
<span class="line"><span>    count(){</span></span>
<span class="line"><span>      return this.$store.state.count //用computed接收</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    add(n){</span></span>
<span class="line"><span>      this.$store.commit(&#39;add&#39;,n);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>   reduce(n){</span></span>
<span class="line"><span>      this.$store.commit(&#39;reduce&#39;,n);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>然后我们点击增加按钮,看看会发生什么变化,结果如下 <img src="https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554845-c4125211-5a8d-411c-9967-e78ab6a18532.png#align=left&amp;display=inline&amp;height=362&amp;margin=%5Bobject%20Object%5D&amp;originHeight=362&amp;originWidth=353&amp;size=0&amp;status=done&amp;style=none&amp;width=353" alt=""> 可以看到,用<strong>data</strong>接收的值不能及时响应更新,用<strong>computed</strong>就可以. <strong>知识点</strong>:<code>Props</code>，<code>methods</code>,<code>data</code>和<code>computed</code>的初始化都是在<code>beforeCreated</code>和<code>created</code>之间完成的。</p><h3 id="什么是mapstate" tabindex="-1">什么是mapState <a class="header-anchor" href="#什么是mapstate" aria-label="Permalink to &quot;什么是mapState&quot;">​</a></h3><p>表面意思:<code>mapState</code>是<code>state</code>的辅助函数 实际作用:当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用 <code>mapState</code> 辅助函数帮助生成计算属性 使用方法:先要导入这个辅助函数.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { mapState } from &#39;vuex&#39;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>然后就可以在<code>computed</code>中使用<code>mapState</code>了 用<code>mapState</code>等这种辅助函数的时候，如果<strong>组件内部的命名</strong>和<strong>vuex内的命名</strong>是一致的,可以简写成<strong>数组</strong>方式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//state.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>    nickname:&#39;Simba&#39;,</span></span>
<span class="line"><span>    age:20,</span></span>
<span class="line"><span>    gender:&#39;男&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//computed</span></span>
<span class="line"><span>computed: mapState([&#39;nickname&#39;,&#39;age&#39;,&#39;gender&#39;])</span></span>
<span class="line"><span>//上面的一句代码就相当于下面这些 是不是简洁了很多</span></span>
<span class="line"><span>computed:{</span></span>
<span class="line"><span>  nickname(){return this.$store.state.nickname}</span></span>
<span class="line"><span>  age(){return this.$store.state.age}</span></span>
<span class="line"><span>  gender(){return this.$store.state.gender}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>如果需要自定义一个计算属性,需要<code>es6</code>中的展开运算符：<strong>...</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data(){</span></span>
<span class="line"><span>  return{</span></span>
<span class="line"><span>    count:14</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>computed: {   </span></span>
<span class="line"><span>  value(){</span></span>
<span class="line"><span>   return &quot;姓名:&quot; + this.coount/7</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>  ...mapState([&#39;nickname&#39;,&#39;age&#39;,&#39;gender&#39;])</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h2 id="getters以及mapgetters" tabindex="-1">getters以及mapGetters <a class="header-anchor" href="#getters以及mapgetters" aria-label="Permalink to &quot;getters以及mapGetters&quot;">​</a></h2><h3 id="什么是getters" tabindex="-1">什么是getters <a class="header-anchor" href="#什么是getters" aria-label="Permalink to &quot;什么是getters&quot;">​</a></h3><p><strong>getters</strong>：对数据获取之前的再次编译，<code>getters</code>的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。说白了就约等于<code>vue</code>的<code>computed</code>,可以像使用<code>computed</code>一样去使用<code>getters</code>,当然二者还是有区别的.</p><h3 id="如何使用getters" tabindex="-1">如何使用getters <a class="header-anchor" href="#如何使用getters" aria-label="Permalink to &quot;如何使用getters&quot;">​</a></h3><p><code>getters</code>中的方法有两个默认参数</p><ul><li><strong>state</strong> 当前<code>VueX</code>对象中的状态对象</li><li><strong>getters</strong> 当前<code>getters</code>对象，用于将<code>getters</code>下的其他<code>getter</code>拿来用</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//state.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name:&#39;simba&#39;,</span></span>
<span class="line"><span>  age:&#39;20&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//getters.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  // 第一个参数是state</span></span>
<span class="line"><span>  realName(state) {</span></span>
<span class="line"><span>    return &quot;姓名:&quot; + state.name</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  // 第二个参数可以访问getters</span></span>
<span class="line"><span>  nameAndAge(state, getters) {</span></span>
<span class="line"><span>    return &quot;年龄:&quot; + state.age +&quot;;&quot;+ getters.realName</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h3 id="如何访问getters" tabindex="-1">如何访问getters <a class="header-anchor" href="#如何访问getters" aria-label="Permalink to &quot;如何访问getters&quot;">​</a></h3><h4 id="通过属性访问" tabindex="-1">通过属性访问 <a class="header-anchor" href="#通过属性访问" aria-label="Permalink to &quot;通过属性访问&quot;">​</a></h4><p><code>getter</code> 会暴露为<code> store.getters</code> 对象，我们可以以属性的形式访问这些值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>store.getters.realName// -&gt; 姓名:simba</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>注意</strong>:<code>getter</code> 在通过属性访问时是作为 <code>Vue</code> 的响应式系统的一部分缓存其中的。</p><h4 id="通过方法访问" tabindex="-1">通过方法访问 <a class="header-anchor" href="#通过方法访问" aria-label="Permalink to &quot;通过方法访问&quot;">​</a></h4><p>我们可以通过让 <code>getters</code> 返回一个函数，来实现给 <code>getters</code> 传参。这样在对 <code>store</code> 里的<strong>数组</strong>进行<strong>查询</strong>时非常有用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>state:{</span></span>
<span class="line"><span>  todos:[</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      id:2,</span></span>
<span class="line"><span>      text:&#39;…&#39;,</span></span>
<span class="line"><span>      done: false</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>getters: {</span></span>
<span class="line"><span>  getTodoById: (state) =&gt; (id) =&gt; {</span></span>
<span class="line"><span>    return state.todos.find(todo =&gt; todo.id === id)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>store.getters.getTodoById(2) // -&gt; { id: 2, text: ‘…’, done: false }</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>注意</strong>:<code>getter</code> 在通过方法访问时，每次都会去进行调用，而不会缓存结果。</p><h4 id="在组件中使用" tabindex="-1">在组件中使用 <a class="header-anchor" href="#在组件中使用" aria-label="Permalink to &quot;在组件中使用&quot;">​</a></h4><p>我们在<code>computed</code>中通过<code>this.$store.getters.xxx</code>来绑定一个计算属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//组件中</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;hello&quot;&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;div&gt;{{message}}&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div&gt;{{message2}}&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>computed:{</span></span>
<span class="line"><span>   message(){</span></span>
<span class="line"><span>     return this.$store.getters.realName </span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   message2(){</span></span>
<span class="line"><span>     return this.$store.getters.nameAndAge; </span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>结果如下: <img src="https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554745-a88381ce-79fb-430f-8303-16f823858145.png#align=left&amp;display=inline&amp;height=300&amp;margin=%5Bobject%20Object%5D&amp;originHeight=300&amp;originWidth=326&amp;size=0&amp;status=done&amp;style=none&amp;width=326" alt=""></p><h3 id="什么是mapgetters" tabindex="-1">什么是mapGetters <a class="header-anchor" href="#什么是mapgetters" aria-label="Permalink to &quot;什么是mapGetters&quot;">​</a></h3><p><code>mapGetters</code> 辅助函数仅仅是将 <code>store</code> 中的 <code>getter</code> 映射到局部计算属性： 使用方法:先要导入这个辅助函数.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { mapGetters } from &#39;vuex&#39;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>然后就可以在<code>computed</code>中使用<code>mapGetters</code> 了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>computed: {</span></span>
<span class="line"><span>  ...mapGetters({</span></span>
<span class="line"><span>    message: &quot;realName&quot;,</span></span>
<span class="line"><span>    message2: &quot;nameAndAge&quot;</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>是不是简洁了很多,如果<strong>计算属性的名</strong>和<strong>getters的名字</strong>相同,还可以使用数组简写形式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>computed: {</span></span>
<span class="line"><span>  ...mapGetters([&quot;realName&quot;,&quot;nameAndAge&quot;])</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h2 id="mutation以及mapmutation" tabindex="-1">mutation以及mapMutation <a class="header-anchor" href="#mutation以及mapmutation" aria-label="Permalink to &quot;mutation以及mapMutation&quot;">​</a></h2><h3 id="什么是mutation" tabindex="-1">什么是mutation <a class="header-anchor" href="#什么是mutation" aria-label="Permalink to &quot;什么是mutation&quot;">​</a></h3><p><code>mutation</code>是操作<code>state</code>数据的方法的集合，比如对该数据的<strong>修改、增加、删除</strong>等等。<code>mutation</code>中通常存放一些<strong>同步修改状态</strong>的方法. <strong>注意</strong>:更改 <strong>Vuex</strong> 的 <strong>store</strong> 中的状态的唯一方法是提交 <strong>mutation</strong>。</p><h3 id="如何使用mutation" tabindex="-1">如何使用mutation <a class="header-anchor" href="#如何使用mutation" aria-label="Permalink to &quot;如何使用mutation&quot;">​</a></h3><p><code>mutations</code>方法都有默认的形参：<code>mutation([state] [,payload])</code></p><ul><li><strong>state</strong> 当前<code>VueX</code>对象中的<code>state</code></li><li><strong>payload</strong> 载荷(该方法在被调用时传递的参数)</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//state.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name:&#39;韩志伟&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//mutations.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> changeName(state, name) {</span></span>
<span class="line"><span>    state.name = name;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>我们需要这样去调用<code>mutation</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.commit(&#39;changeName&#39;,&#39;吴彦祖&#39;)</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>例如我们在组件的<code>methods</code>中修改一下<code>name</code>属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods: {</span></span>
<span class="line"><span>    changeName(name){</span></span>
<span class="line"><span>      this.$store.commit(&#39;changeName&#39;,name);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//调用changeName方法</span></span>
<span class="line"><span>mounted(){</span></span>
<span class="line"><span>  this.changeName(&#39;吴彦祖&#39;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>当需要多参提交时，可以把他们放在一个对象中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.commit(&#39;changeName&#39;,{firstName:&#39;han&#39;,lastName:&#39;zhiwei&#39;})</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>也可以用另外一种传参的方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.commit({</span></span>
<span class="line"><span>    type:&#39;changeName&#39;,</span></span>
<span class="line"><span>    payload:{</span></span>
<span class="line"><span>        firstName:&#39;han&#39;,</span></span>
<span class="line"><span>        lastName:&#39;zhiwei&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h3 id="什么是mapmutation" tabindex="-1">什么是mapMutation <a class="header-anchor" href="#什么是mapmutation" aria-label="Permalink to &quot;什么是mapMutation&quot;">​</a></h3><p><code>mapMutation</code>辅助函数仅仅是将 <code>store</code> 中的 <code>mutation</code> 映射到组件<code>methods</code>中 使用方法:先要导入这个辅助函数.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { mapMutation} from &#39;vuex&#39;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>然后就可以在<code>methods</code>中使用<code>mapMutation</code>了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span> ...mapMutations({</span></span>
<span class="line"><span>      changeName:&#39;changeName&#39;,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>这个代码等同于下面这段</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>changeName(payLoad){</span></span>
<span class="line"><span>  this.$store.commit(&#39;changeName&#39;,payLoad)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>如果<strong>方法名</strong>和<strong>mutation</strong>名字一样 可以简写成下面这样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span> ...mapMutations([&#39;changeName&#39;])</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>还可以使用常量替代<code>mutations</code>事件类型 在<code>store</code>文件夹下面新建<code>mutation-types.js</code>文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//mutation-types.js</span></span>
<span class="line"><span>export const ADD_AGE = &#39;ADD_AGE&#39;</span></span>
<span class="line"><span>//mutations.js</span></span>
<span class="line"><span>import * as types from &#39;./mutation-types&#39;;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  [types.ADD_AGE](state, payLoad) {</span></span>
<span class="line"><span>    state.age += payLoad.number</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//组件中js部分</span></span>
<span class="line"><span> ...mapMutations([types.ADD_AGE]),</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>但是这个不是很常用,知道有这个知识点就可以了</p><h3 id="增删state中的成员" tabindex="-1">增删state中的成员 <a class="header-anchor" href="#增删state中的成员" aria-label="Permalink to &quot;增删state中的成员&quot;">​</a></h3><p>既然讲到了如何修改<code>state</code>的值,顺便提一下如何增删<code>state</code>中的成员 <strong>Vue.set 为某个对象设置成员的值，若不存在则新增</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Vue.set(state,&quot;age&quot;,22)</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>Vue.delete 删除成员</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Vue.delete(state,&#39;age&#39;)</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h2 id="actions以及mapactions" tabindex="-1">actions以及mapActions <a class="header-anchor" href="#actions以及mapactions" aria-label="Permalink to &quot;actions以及mapActions&quot;">​</a></h2><h3 id="什么是actions" tabindex="-1">什么是actions <a class="header-anchor" href="#什么是actions" aria-label="Permalink to &quot;什么是actions&quot;">​</a></h3><p>由于直接在<code>mutation</code>方法中进行异步操作，可能会引起数据失效。所以提供了<code>Actions</code>来专门进行异步操作，类似于<strong>axios请求</strong>,最终通过提交<code>mutation</code>方法来修改<code>state</code>中的值。</p><h3 id="如何使用actions" tabindex="-1">如何使用actions <a class="header-anchor" href="#如何使用actions" aria-label="Permalink to &quot;如何使用actions&quot;">​</a></h3><p><code>Actions</code>中的方法有两个默认参数: <code>Action([context ] [,payload])</code></p><ul><li><strong>context</strong> 上下文对象 包含<code>dispatch</code> <code>commit</code> <code>state</code> <code>getters</code> <code>rootState</code> 可以使用<code>es6</code>的解构赋值看起来更明确<code>{ commit }</code></li><li><strong>payload</strong> 载荷(该方法在被调用时传递的参数)</li></ul><p>看一个例子,一秒钟以后提交<code>mutation</code>修改<code>state</code>中的<code>name</code>属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//state.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name:&#39;韩志伟&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//mutations.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> changeName(state, name) {</span></span>
<span class="line"><span>    state.name = name;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};  </span></span>
<span class="line"><span>//actions.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> asyncChangeName({ commit } ,name) {</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>     commit(&#39;changeName&#39;,name);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>我们需要这样去调用<code>action</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.dispatch(&#39;asyncChangeName&#39;,&#39;吴彦祖&#39;)</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>例如我们在组件的<code>methods</code>中修改一下<code>name</code>属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods: {</span></span>
<span class="line"><span>    changeName(name){</span></span>
<span class="line"><span>      this.$store.dispatch(&#39;asyncChangeName&#39;,name);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//调用changeName方法</span></span>
<span class="line"><span>mounted(){</span></span>
<span class="line"><span>  this.changeName(&#39;吴彦祖&#39;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><code>action</code>中也可以调用另一个<code>action</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//actions.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> asyncChangeName({ dispatch }) {</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>     dispatch(&#39;anotherAction&#39;);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span> anotherAction(){</span></span>
<span class="line"><span>   console.log(&#39;另一个action被调用了&#39;)</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><code>action</code>中也可以传入<code>state</code>,以及<code>rootState</code>,至于什么是<code>rootState</code>,下面学习模块化<code>modules</code>的时候就知道了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//actions.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> action({ state }) {</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>      console.log(state.name)</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span> anotherAction({ rootState }){</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>     console.log(rootState.name);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>至于<code>actions</code>的传参就与<code>mutation</code>一样了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.dispatch(&#39;changeName&#39;,{firstName:&#39;han&#39;,lastName:&#39;zhiwei&#39;})</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h3 id="什么是mapactions" tabindex="-1">什么是mapActions <a class="header-anchor" href="#什么是mapactions" aria-label="Permalink to &quot;什么是mapActions&quot;">​</a></h3><p><code>mapActions</code>辅助函数仅仅是将 <code>store</code> 中的 <code>actions</code> 映射到组件<code>methods</code>中 使用方法:先要导入这个辅助函数.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { mapActions} from &#39;vuex&#39;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>然后就可以在<code>methods</code>中使用<code>mapActions</code>了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span> ...mapActions({</span></span>
<span class="line"><span>      changeName:&#39;changeName&#39;,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>这个代码等同于下面这段</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>changeName(payLoad){</span></span>
<span class="line"><span>  this.$store.dispatch(&#39;changeName&#39;,payLoad)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>如果<strong>方法名</strong>和<strong>actions名字</strong>一样 可以简写成下面这样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span> ...mapActions([&#39;changeName&#39;])</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h2 id="modules模块化" tabindex="-1">modules模块化 <a class="header-anchor" href="#modules模块化" aria-label="Permalink to &quot;modules模块化&quot;">​</a></h2><h3 id="什么是modules" tabindex="-1">什么是modules <a class="header-anchor" href="#什么是modules" aria-label="Permalink to &quot;什么是modules&quot;">​</a></h3><p>当项目庞大，状态非常多时，可以采用<strong>模块化管理模式</strong>。<code>Vuex</code> 允许我们将 <code>store</code> 分割成模块<code>（module）</code>。每个模块拥有自己的 <code>state</code>、<code>mutation</code>、<code>action</code>、<code>getter</code>。</p><h3 id="初始化modules" tabindex="-1">初始化modules <a class="header-anchor" href="#初始化modules" aria-label="Permalink to &quot;初始化modules&quot;">​</a></h3><p>前面我们学习了如何将<code>vuex</code>的<code>index.js</code>文件拆分成单个文件进行管理,所以我们依然对所有的模块进行单文件拆分管理,目录结构如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>store</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>├─index.js</span></span>
<span class="line"><span>│            </span></span>
<span class="line"><span>├─state.js</span></span>
<span class="line"><span>│      </span></span>
<span class="line"><span>├─getters.js     </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─mutations.js      </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─actions.js        </span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─modules</span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span>      ├─moduleA // moduleA的结构与moduleB相同</span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span>      └─moduleB</span></span>
<span class="line"><span>            │ </span></span>
<span class="line"><span>            ├─index.js</span></span>
<span class="line"><span>            │            </span></span>
<span class="line"><span>            ├─state.js</span></span>
<span class="line"><span>            │      </span></span>
<span class="line"><span>            ├─getters.js     </span></span>
<span class="line"><span>            │</span></span>
<span class="line"><span>            ├─mutations.js      </span></span>
<span class="line"><span>            │</span></span>
<span class="line"><span>            └─actions.js</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>1.首先根index.js中除了引入自身的state,getters,mutations,actions之外,还要引入两个模块的index.js并在export中导出modules</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import Vuex from &#39;vuex&#39;;</span></span>
<span class="line"><span>import state from &#39;./state&#39;;</span></span>
<span class="line"><span>import getters from &#39;./getters&#39;;</span></span>
<span class="line"><span>import mutations from &#39;./mutations&#39;;</span></span>
<span class="line"><span>import actions from &#39;./actions&#39;;</span></span>
<span class="line"><span>import moduleA  from &#39;./modules/moduleA/index&#39;;</span></span>
<span class="line"><span>import moduleB  from &#39;./modules/moduleB/index&#39;;</span></span>
<span class="line"><span>Vue.use(Vuex);</span></span>
<span class="line"><span>export default new Vuex.Store({</span></span>
<span class="line"><span>  state,</span></span>
<span class="line"><span>  mutations,</span></span>
<span class="line"><span>  actions,</span></span>
<span class="line"><span>  getters,</span></span>
<span class="line"><span>  modules: {</span></span>
<span class="line"><span>    moduleA,</span></span>
<span class="line"><span>    moduleB,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>2.在 moduleA 的index.js中导入moduleA的state,getters,mutations,actions. moduleB同理</strong><strong>注意</strong>:<code>getter</code>，<code>mutation</code>，<code>action</code> 他们默认都是注册在<strong>全局命名空间</strong>的，所以我们默认是可以和使用<strong>根状态</strong>一样去使用他们，这样就失去了<strong>模块化</strong>的意义，所以我们要在模块的<code>index.js</code>中添加<code>namespaced: true</code>使其成为带命名空间的模块。当模块被注册后，它的所有 <code>getter</code>、<code>action</code> 及 <code>mutation</code> 都会自动根据<strong>模块注册的路径</strong>调整命名。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import state from &#39;./state&#39;;</span></span>
<span class="line"><span>import getters from &#39;./getters&#39;;</span></span>
<span class="line"><span>import mutations from &#39;./mutations&#39;;</span></span>
<span class="line"><span>import actions from &#39;./actions&#39;;</span></span>
<span class="line"><span>const moduleA = {</span></span>
<span class="line"><span>  namespaced: true,</span></span>
<span class="line"><span>  state: state,</span></span>
<span class="line"><span>  getters: getters,</span></span>
<span class="line"><span>  mutations: mutations,</span></span>
<span class="line"><span>  actions: actions,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>export default moduleA ;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>3.moduleA下的state,getters,mutations,actions就和之前学习的一样导出就可以了</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//state.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name:&#39;hzw&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//mutations.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> changeName(state, name) {</span></span>
<span class="line"><span>    state.name = name;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};  </span></span>
<span class="line"><span>//以此类推</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h3 id="如何在模块化中进行定义" tabindex="-1">如何在模块化中进行定义 <a class="header-anchor" href="#如何在模块化中进行定义" aria-label="Permalink to &quot;如何在模块化中进行定义&quot;">​</a></h3><p><strong>state</strong> 正常写在各自的<code>state.js</code>中即可 <strong>getter</strong><code>getter</code>的话，他会有三个参数，第一个是模块内的 <code>state</code>，第二个是 模块内的 <code>getters</code>，第三个是根节点状态 <code>rootState</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//getters.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  nameAndAge(state, getters, rootState) {</span></span>
<span class="line"><span>    return &quot;年龄:&quot; + state.age +&quot;;&quot;+ getters.realName + &quot;&quot; + rootState.name</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>mutation</strong><code>mutation</code> 传入的第一个参数也是模块内的 <code>state</code>，其实就和根状态定义 <code>mutation</code> 的时候一样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>//这里的state是模块的局部状态</span></span>
<span class="line"><span> changeName(state, name) {</span></span>
<span class="line"><span>    state.name = name;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p><strong>actions</strong><code>action</code> 的话，他传入还是只有 <code>context</code> 对象，这个对象里面的 <code>state</code> 属性指模块内的状态，<code>rootState</code> 指根状态，如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default {</span></span>
<span class="line"><span> changeName({ state,rootState }) {</span></span>
<span class="line"><span>        console.log(state.name)</span></span>
<span class="line"><span>        console.log(rootState .name)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h3 id="如何在模块化中进行开发" tabindex="-1">如何在模块化中进行开发 <a class="header-anchor" href="#如何在模块化中进行开发" aria-label="Permalink to &quot;如何在模块化中进行开发&quot;">​</a></h3><h4 id="_1-state-获取" tabindex="-1">1. state 获取 <a class="header-anchor" href="#_1-state-获取" aria-label="Permalink to &quot;1. state 获取&quot;">​</a></h4><p>这个要在原来状态名前面加一个模块名才能取到到模块内的对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>this.$store.state.moduleA.name;</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>辅助函数也一样,<code>name</code> 前面加个模块名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...mapState({     </span></span>
<span class="line"><span>  name: state =&gt; state.moduleA.name, </span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>//简写</span></span>
<span class="line"><span>...mapState(&#39;moduleA&#39;,[&#39;name&#39;]),</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>获取根节点的状态还是和以前一样,不需要加<code>模块名</code>,也不需要加<code>root</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...mapState([&#39;name&#39;]),</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h4 id="_2-getters获取" tabindex="-1">2. getters获取 <a class="header-anchor" href="#_2-getters获取" aria-label="Permalink to &quot;2. getters获取&quot;">​</a></h4><p>这个同样要在原来状态名前面加一个模块名才能取到到模块内的对象。 在获取根状态下的<code>getters</code>不需要加模块名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>store.getters.moduleA.realName</span></span>
<span class="line"><span>//map函数的第一个参数也同样需要加模块名</span></span>
<span class="line"><span>computed: {</span></span>
<span class="line"><span>  //获取moduleA下的getters</span></span>
<span class="line"><span>  ...mapGetters(&quot;moduleA&quot;,[&quot;realName&quot;,&quot;nameAndAge&quot;])</span></span>
<span class="line"><span>  //获取根状态下的getters</span></span>
<span class="line"><span>  ...mapGetters([&quot;realName&quot;])</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h4 id="_3-调用mutation以及action" tabindex="-1">3.调用mutation以及action <a class="header-anchor" href="#_3-调用mutation以及action" aria-label="Permalink to &quot;3.调用mutation以及action&quot;">​</a></h4><p>根据<code>state</code>和<code>getters</code>推算,在调用模块内<code>mutation</code>和<code>action</code>的时候肯定也需要加模块名 在调用根状态中的<code>mutation</code>和<code>action</code>的时候不需要加模块名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>methods:{</span></span>
<span class="line"><span>//调用模块A下的action</span></span>
<span class="line"><span> ...mapActions(&#39;moduleA&#39;,[&#39;changeName&#39;])</span></span>
<span class="line"><span>//调用模块A下的mutation</span></span>
<span class="line"><span> ...mapMutation(&#39;moduleB&#39;,[&#39;changeName&#39;])</span></span>
<span class="line"><span>//调用根状态下的action</span></span>
<span class="line"><span> ...mapActions([&#39;changeName&#39;])</span></span>
<span class="line"><span>//调用根状态下的mutation</span></span>
<span class="line"><span> ...mapMutation([&#39;changeName&#39;])</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h4 id="_4-需要特别注意的是-在模块中的action下调用根状态中的action和mutation需要将-root-true-作为第三个参数传入" tabindex="-1">4.需要特别注意的是,在模块中的action下调用根状态中的action和mutation需要将{root:true}作为第三个参数传入 <a class="header-anchor" href="#_4-需要特别注意的是-在模块中的action下调用根状态中的action和mutation需要将-root-true-作为第三个参数传入" aria-label="Permalink to &quot;4.需要特别注意的是,在模块中的action下调用根状态中的action和mutation需要将{root:true}作为第三个参数传入&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//moduleA下的actions.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> AsyncChangeName({ commit } ,name) {</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>     //调用的是根状态下的mutation</span></span>
<span class="line"><span>     commit(&#39;changeName&#39;,name,{ root: true });</span></span>
<span class="line"><span>     //调用的是根状态下的action</span></span>
<span class="line"><span>    dispatch(&#39;changeName&#39;,name,{ root: true });</span></span>
<span class="line"><span>    }, 1000);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><h4 id="_5-将模块中的action注册为全局" tabindex="-1">5.将模块中的action注册为全局 <a class="header-anchor" href="#_5-将模块中的action注册为全局" aria-label="Permalink to &quot;5.将模块中的action注册为全局&quot;">​</a></h4><p>这个感觉和模块化的设计有点<strong>冲突</strong>，并且也不常用，知道有这个知识点即可，在声明<code>action</code>的时候，添加<code>root:true</code>并将 <code>action</code> 的定义放到 <code>hanler</code> 函数中，具体如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//actions.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span> globalAction:{</span></span>
<span class="line"><span>  root:true,</span></span>
<span class="line"><span>  handler({ commit } ,name) {</span></span>
<span class="line"><span>   setTimeout(() =&gt; {</span></span>
<span class="line"><span>     commit(&#39;changeName&#39;,name);</span></span>
<span class="line"><span>   }, 1000);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><p>到这里就完全可以使用<code>vuex</code>进行开发任务了!</p><p>作者：一尾流莺 链接：<a href="https://juejin.cn/post/6973848448080543758" target="_blank" rel="noreferrer">https://juejin.cn/post/6973848448080543758</a> 来源：掘金 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>`,178)])])}const g=a(t,[["render",l]]);export{h as __pageData,g as default};
