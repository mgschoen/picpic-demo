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
    submitText,
    toggleLoadingState
} from './js/functions' 

import { parseUrlParameters } from './js/util'

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
var ppDebugFillImages = document.querySelector('#pp-debug-fill-images')

// event listeners
ppButtonSubmit.addEventListener('click', function () {
    toggleLoadingState(true)
    submitText(function (response) {
        toggleLoadingState(false)
        UIKit.notification('Picpic has found some images!', {
            status: 'success',
            pos: 'bottom-right'
        })
        var urls = response.data.images.map(function(img){ return img.previewUrl })
        changeView('output')
        insertImages(urls)
    }, function (error) {
        toggleLoadingState(false)
        UIKit.notification(error.message, {
            status: 'danger',
            pos: 'bottom-right'
        })
    })
})

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
    ppDebugFillImages.addEventListener('click', function (e) {
        e.preventDefault()
        fillWithImages()
    })
}
