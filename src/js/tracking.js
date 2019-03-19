import axios from 'axios'
import cookie from 'js-cookie'
import hash from 'object-hash'

import { tracking } from './constants'
import { serializeUrlEncoded } from './util'

function sendTrackingInfo (requestHash, actionType, content, contentAppendix) {

    if (!actionType || tracking.validActionTypes.indexOf(actionType) < 0) {
        throw new Error('Invalid actionType: ' + actionType)
    }

    var baseUrl = tracking.baseUrl
    var keys = tracking.keys
    var sessionID = cookie.get(tracking.cookieName)
    if (!sessionID) {
        throw new Error('Could not read PicPic session ID from cookie "' 
            + tracking.cookieName + '"')
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
    var sessionID = cookie.get(tracking.cookieName)
    var now = new Date().getTime()
    var requestHash = hash(now.toString() + sessionID.toString())
    sendTrackingInfo(requestHash, 'submitText', content, '')
}

function storeSessionID (id) {
    cookie.set(tracking.cookieName, id)
}

export { recordSubmitAction, storeSessionID }
