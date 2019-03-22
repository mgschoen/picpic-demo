function attachPolyfills () {

    // Promises
    require('es6-promise').polyfill()

    // IE11 NodeList.forEach()
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach
    }
}

export { attachPolyfills }