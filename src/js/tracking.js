import axios from 'axios'
import cookie from 'js-cookie'
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
    var sessionID = cookie.get(tracking.cookieNames.sessionID)
    if (!sessionID) {
        throw new Error('Could not read PicPic session ID from cookie "' 
            + tracking.cookieNames.sessionID + '"')
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
    var sessionID = cookie.get(tracking.cookieNames.sessionID)
    var now = new Date().getTime()
    var requestHash = hash(now.toString() + sessionID.toString())
    storeRequestHash(requestHash)
    sendTrackingInfo(requestHash, 'submitText', content, '')
}

function recordReceivedAction (searchTerm, images) {
    var requestHash = cookie.get(tracking.cookieNames.requestHash)
    var imageList = images.map(function (image) {
        return image.detailUrl + '\n'
    }).join('')
    sendTrackingInfo(requestHash, 'receiveImages', imageList, searchTerm)
}


/* Cookie management */

function storeTrackingCookie (key, value) {
    var cookieName = tracking.cookieNames[key]
    if (cookieName) {
        cookie.set(cookieName, value)
    } else {
        throw new Error('Could not store cookie. Unknown key "' + key + '"')
    }
}

function storeRequestHash (hash) {
    storeTrackingCookie('requestHash', hash)
}

function storeSessionID (id) {
    storeTrackingCookie('sessionID', id)
}

export { recordReceivedAction, recordSubmitAction, storeSessionID }
