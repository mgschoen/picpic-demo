function parseUrlParameters (searchString) {
    var items = searchString.split(/\?|\&/g).filter(function (item) {
        return item.length > 0
    })
    var params = {}
    items.forEach(function (item) {
        var keyValue = item.split('=')
        if (keyValue.length === 1) {
            params[keyValue[0]] = true
        } else {
            params[keyValue[0]] = keyValue[1]
        }
    })
    return params
}

export { parseUrlParameters }