require('./scss/main.scss')

import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import {
    sampleText1, 
    sampleText2, 
    sampleText3
} from './js/constants'

import { 
    changeText,
    changeView,
    insertImages, 
    insertText,
    submitText,
    toggleLoadingState,
    updateStats
} from './js/functions' 

import { parseUrlParameters } from './js/util'
import { 
    plugRequestMockup,
    populateImages, 
    populateTerms
} from './js/debug'

import { 
    recordReceivedAction, 
    storeSessionID
} from './js/tracking'

UIKit.use(Icons)

// elements
var ppButtonSubmit = document.querySelector('#pp-button-submit')
var ppButtonSample1 = document.querySelector('#pp-button-sample-1')
var ppButtonSample2 = document.querySelector('#pp-button-sample-2')
var ppButtonSample3 = document.querySelector('#pp-button-sample-3')
var ppButtonReturn = document.querySelector('#pp-button-return')

var ppDebug = document.querySelector('#pp-debug')
var ppDebugViewInput = document.querySelector('#pp-debug-view-input')
var ppDebugViewOutput = document.querySelector('#pp-debug-view-output')
var ppDebugFillAll = document.querySelector('#pp-debug-populate')
var ppDebugFillImages = document.querySelector('#pp-debug-populate-images')
var ppDebugFillTerms = document.querySelector('#pp-debug-populate-terms')
var ppDebugMockup = document.querySelector('#pp-debug-mockup')

// event listeners
var submitEventListener = function () {
    toggleLoadingState(true)
    submitText({
        api: httpsEmbed ? 'netlify' : 'default',
        track: trackingToken ? true : false
    }, function (response, submittedText) {
        if (trackingToken) {
            recordReceivedAction(response.data.queryString, response.data.images)
        }
        toggleLoadingState(false)
        UIKit.notification('Picpic has found some images!', {
            status: 'success',
            pos: 'bottom-right'
        })
        updateStats(response.data.queryString, response.data.queryTerms)
        insertImages(response.data.images)
        insertText(submittedText)
        changeView('output')
    }, function (error) {
        toggleLoadingState(false)
        UIKit.notification(error.message, {
            status: 'danger',
            pos: 'bottom-right'
        })
    })
}

ppButtonSubmit.addEventListener('click', submitEventListener)

ppButtonSample1.addEventListener('click', function () {
    changeText(sampleText1)
})
ppButtonSample2.addEventListener('click', function () {
    changeText(sampleText2)
})
ppButtonSample3.addEventListener('click', function () {
    changeText(sampleText3)
})

ppButtonReturn.addEventListener('click', function () {
    changeView('input')
})

// initialisation
var urlParams = parseUrlParameters(window.location.search)
var initialView = urlParams.initialView || 'input'
var debug = urlParams.godMode ? true : false
var httpsEmbed = urlParams.httpsEmbed ? true : false
var trackingToken = urlParams.trackingToken

// Init tracking
if (trackingToken) {
    storeSessionID(trackingToken)
}

// init hash routing
var navigationEventListener = function () {
    var hash = window.location.hash
    if (hash.length > 0) {
        changeView(hash.slice(1))
    } else {
        changeView(initialView)
    }
}
window.addEventListener('hashchange', navigationEventListener)

changeView(initialView)

if (debug) {
    ppDebug.removeAttribute('hidden')
    ppDebugViewInput.addEventListener('click', function (e) {
        e.preventDefault()
        changeView('input')
    })
    ppDebugViewOutput.addEventListener('click', function (e) {
        e.preventDefault()
        changeView('output')
    })
    ppDebugFillAll.addEventListener('click', function (e) {
        e.preventDefault()
        populateImages()
        populateTerms()
    })
    ppDebugFillImages.addEventListener('click', function (e) {
        e.preventDefault()
        populateImages()
    })
    ppDebugFillTerms.addEventListener('click', function (e) {
        e.preventDefault()
        populateTerms()
    })
    ppDebugMockup.addEventListener('click', function (e) {
        e.preventDefault()
        plugRequestMockup(ppButtonSubmit, submitEventListener, function () {
            ppDebugMockup.setAttribute('data-mockup-active', true)
            UIKit.notification('Request mockup activated', {
                status: 'info',
                pos: 'bottom-right'
            })
        })
    })
}
