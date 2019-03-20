import axios from 'axios'
import hash from 'object-hash'

import { tracking } from './constants'
import { serializeUrlEncoded } from './util'

/* Tracking requests */

function sendTrackingInfo (requestHash, actionType, content, contentAppendix) {

    if (!actionType || tracking.validActionTypes.indexOf(actionType) < 0) {
        throw new Error('Invalid actionType: ' + actionType)
    }

    var baseUrl = tracking.baseUrl
    var keys = tracking.keys
    var sessionID = getTrackingGlobal('sessionID')
    if (!sessionID) {
        throw new Error('Could not read PicPic session ID with identifier "sessionID"')
    }
    var trackingData = {}
    trackingData[keys.requestHash] = requestHash
    trackingData[keys.sessionID] = sessionID
    trackingData[keys.actionType] = actionType
    trackingData[keys.actionContent] = content || ''
    trackingData[keys.actionContentAppendix] = contentAppendix || ''
    axios({
        url: baseUrl,
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: serializeUrlEncoded(trackingData) 
    }).then(function (response) {
        if (response.statusCode !== 200) {
            console.error('Failed to send tracking info for request ' 
                + requestHash + '. Got response with status: ' 
                + response.statusCode + ' - ' + response.statusText)
        }
    }).catch(function (error) {})
}

function recordSubmitAction (content) {
    var sessionID = getTrackingGlobal('sessionID')
    var now = new Date().getTime()
    var requestHash = hash(now.toString() + sessionID.toString())
    storeRequestHash(requestHash)
    sendTrackingInfo(requestHash, 'submitText', content, '')
}

function recordReceivedAction (searchTerm, images) {
    var requestHash = getTrackingGlobal('requestHash')
    var imageList = images.map(function (image) {
        return image.detailUrl + '\n'
    }).join('')
    sendTrackingInfo(requestHash, 'receiveImages', imageList, searchTerm)
} 


/* Cookie management */

function storeTrackingGlobal (key, value) {
    var globalKey = tracking.globalKeys[key]
    if (globalKey) {
        if (!document.PICPIC_GLOBALS) {
            document.PICPIC_GLOBALS = {}
        }
        document.PICPIC_GLOBALS[globalKey] = value
    } else {
        throw new Error('Could not set tracking global. Unknown key "' + key + '"')
    }
}

function getTrackingGlobal (key) {
    var globalKey = tracking.globalKeys[key]
    return document.PICPIC_GLOBALS[globalKey]
}

function storeRequestHash (hash) {
    storeTrackingGlobal('requestHash', hash)
}

function storeSessionID (id) {
    storeTrackingGlobal('sessionID', id)
}

export { recordReceivedAction, recordSubmitAction, storeSessionID }
