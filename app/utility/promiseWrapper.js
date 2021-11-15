const promiseWrapper = (promise) => {
  return new Promise(resolve => {
    promise
      .then(response => {
        resolve([null, response]);
      })
      .catch(error => {
        resolve([error || new Error(error), null]);
      })
  });
}

module.exports = promiseWrapper;
