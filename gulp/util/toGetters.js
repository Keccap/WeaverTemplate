module.exports = function toGetters(...objects) {
  objects.forEach(obj => {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'function') {
        Object.defineProperty(obj, key, {
          get() {
            return value();
          }
        });
      }

    }
  });
};
