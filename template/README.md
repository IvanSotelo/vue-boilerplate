# {{ name }}

> {{ description }}

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

{{#testing unit e2e}}
# run {{#unit}}unit{{/unit}}{{#unit}}{{#e2e}} & {{/e2e}}{{/unit}}{{#e2e}}end-to-end{{/e2e}} tests
npm test

{{#unit}}
# run unit tests
npm run unit
{{/unit}}

{{#e2e}}
# run e2e tests
npm run e2e
{{/e2e}}
{{/testing}}

{{#if eslint}}
# lint all JS/Vue component files in `src/`
npm run lint

{{/if}}
```
---

This project was generated with [electron-vue](https://github.com/IvanSotelo/Vue-Electron) using [vue-cli](https://github.com/vuejs/vue-cli).

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
