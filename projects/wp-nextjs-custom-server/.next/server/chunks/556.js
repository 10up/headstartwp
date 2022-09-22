"use strict";
exports.id = 556;
exports.ids = [556];
exports.modules = {

/***/ 1556:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ resolveBatch)
/* harmony export */ });
/**
 * @typedef {import('@10up/headless-core').Entity} Entity
 * @typedef {import('@10up/headless-core').FetchResponse} FetchResponse
 *
 * @typedef {Promise<FetchResponse<Entity>>[]} PromiseFunc
 * @typedef {{ throw?: boolean; func: PromiseFunc }} PromiseObject
 * @typedef {PromiseObject[]} FetchBashPromises
 */

/**
 * The fetchBatch function recieves an array of PromiseObject and
 * optionally skips throwing exceptions for the ones passed with `throw: false`.
 *
 * @param {FetchBashPromises} promises Array of PromiseObject to be resolved.
 *
 * @returns {PromiseFunc} The resolved promises.
 */
async function resolveBatch(promises) {
  const promisesArray = Array.isArray(promises) ? promises : [promises];
  const promisesArrayFunc = promisesArray.map(({
    func
  }) => func);
  const shouldThrowPromisesArray = promisesArray.map(({
    throw: shouldThrow
  }) => typeof shouldThrow === 'undefined' ? true : shouldThrow); // using allSettled bc we still want to proceed if fetching certain promises fails

  const settledPromises = await Promise.allSettled(promisesArrayFunc);
  settledPromises.forEach((promise, index) => {
    const shouldThrow = shouldThrowPromisesArray[index];

    if (promise.status === 'rejected' && shouldThrow) {
      throw promise.reason;
    }
  });
  const fulfilledPromises = settledPromises.filter(({
    status
  }) => status === 'fulfilled');
  return fulfilledPromises.map(({
    value
  }) => value);
}

/***/ })

};
;