import { requireFiles } from './utils/require';

// An initializer can be either a function or an object with a `before` or
// `after` key and a `handler` function. The `after` key can be used to run the
// initializer after another initializer. Similarly, the `before` key can be
// used to run before another initializer. An `index` key can explicitly set the
// position in the run order and overrides previous settings.
function sortInitializers(initializers) {
  initializers.sort(([nameA, iniA], [nameB, iniB]) => {
    if (iniA.hasOwnProperty('index') || iniB.hasOwnProperty('index')) {
      return (iniA.index?.toString() ?? nameA) <
        (iniB.index?.toString() ?? nameB)
        ? -1
        : 1;
    }

    if (
      (iniA.before && iniA.before === nameB) ||
      (iniB.after && iniB.after === nameA)
    ) {
      return -1;
    }

    if (
      (iniA.after && iniA.after === nameB) ||
      (iniB.before && iniB.before === nameA)
    ) {
      return 1;
    }

    return nameA < nameB;
  });
}

export default {
  install(Vue, options) {
    const initializers = requireFiles(options.requires);
    sortInitializers(initializers);

    initializers.forEach(([name, initializer]) => {
      if (options.debug) {
        console.log(`Running initializer ${name}`);
      }

      if (typeof initializer !== 'function' && initializer.handler) {
        initializer = initializer.handler;
      }

      initializer(Vue);
    });
  },
};
