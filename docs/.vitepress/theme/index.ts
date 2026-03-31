import MyLayout from "./MyLayout.vue";
import "./custom.css";
import {
  NaiveUIContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";
import { useOml2d } from "./hooks/useOml2d";
import naive from "naive-ui";
import VuePlayground from "./components/VuePlayground/VuePlayground.vue";
import VuePlaygroundSimple from "./components/VuePlaygroundSimple/VuePlayground.vue";

export default {
  Layout: MyLayout,
  enhanceApp: async ({ app, router, siteData }) => {
    app.component("demo-preview", NaiveUIContainer);
    app.component("vue-sfc-playground", VuePlayground);
    app.component("vue-sfc-playground-simple", VuePlaygroundSimple);
    app.use(naive);

    useOml2d();
  },
};
