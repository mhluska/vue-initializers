<!--
<p align="center">
  <img width="450" src="" alt="Preview" />
</p>
-->

<p align="center">
  <a href="https://github.com/mhluska/vue-initializers/actions"><img src="https://github.com/mhluska/vue-initializers/workflows/tests/badge.svg?branch=master" alt="Build Status" /></a>
  <a href="https://www.npmjs.com/package/vue-initializers"><img src="https://img.shields.io/npm/v/vue-initializers.svg" alt="Version"></a>
  <a href="https://github.com/mhluska/vue-initializers/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mhluska/vue-initializers?cache=false" alt="License"></a>
</p>

<p align="center">
  Cleanly configure your Vue application as it boots
</p>

## Installation

An initializer is a JavaScript file placed under `/src/initializers` in your
application. You can use initializers to hold configuration settings that run as
your application boots.

```sh
npm install --save vue-initializers
```

Install `VueInitializers` as early as possible in your `src/main.js` file:

```js
import Vue from 'vue';
import VueInitializers from 'vue-initializers';
import App from '@/App';

Vue.use(VueInitializers, {
  // Tells Webpack to read the contents of the `initializers` dir at build time.
  requires: require.context('@/initializers', false, /\w+\.js$/),

  // Prints optional debug information to console.
  // debug: true,
});

export default new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

## Usage

Initializers should export a function which accepts `Vue` as a parameter. A
common use case for initializers is to hold initialization code for other
plugins:

```js
import VueProgressBar from 'vue-progressbar';

export default function (Vue) {
  Vue.use(VueProgressBar, {
    color: '#0366d6',
  });
}
```

Sometimes you may want to force an initializer to run before others. In that
case, return an object with a `handler` property and one of `index`, `before` or
`after`:

```js
import { init } from '@sentry/browser';

export default {
  // Provide another initializer's filename to ensure this runs before.
  // before: ''

  // Or provide one to ensure this runs after.
  // after: ''

  // Alternatively, pass an index to give an exact position in the run order.
  // `index: 0` ensures this initializer loads first.
  index: 0,

  handler(Vue) {
    init(/* ... */);
  },
};
```
