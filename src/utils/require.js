// Auto-requires files.
// See https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
export function requireFiles(requires) {
  return requires.keys().map((fileName) => {
    const fileConfig = requires(fileName);

    // Remove file extension.
    const name = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');

    return [
      name,
      // Look for the file options on `.default`, which will exist if the file
      // was exported with `export default`, otherwise fall back to module's
      // root.
      fileConfig.default || fileConfig,
    ];
  });
}
