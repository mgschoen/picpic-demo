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

function serializeUrlEncoded (object) {
    var keys = Object.keys(object)
    var encodedString = ''
    for (var i=0; i < keys.length; i++) {
        if (i > 0) {
            encodedString += '&'
        }
        var key = keys[i]
        var value = object[key]
        encodedString += (encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
    return encodedString
}

export { parseUrlParameters, serializeUrlEncoded }
