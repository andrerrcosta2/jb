export const sanitizeObject = (obj, keys) => {
    if (!Array.isArray(keys)) {
        throw new Error('keys parameter must be an array');
    }

    Object.keys(obj).forEach(key => {
        if (!keys.includes(key)) {
          delete obj[key];
        }
      });
}