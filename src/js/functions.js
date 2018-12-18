import axios from 'axios'

var validViews = [ 'input', 'output' ]
var textArea = document.querySelector('#pp-textarea-article')

/**
 * Swap the text in the input textarea
 * @param {string} newText 
 */
function changeText (newText) {
    textArea.value = ''
    textArea.value = newText
}

/**
 * Switch to the specified view
 * @param {string} view 
 */
function changeView (view) {
    if (validViews.indexOf(view) < 0) {
        console.error(view + ' is an invalid view identifier')
        return
    }
    var allViews = document.querySelectorAll('.pp-view')
    allViews.forEach(function (view) {
        view.style.display = 'none'
    })
    var nextView = document.querySelector('#pp-view-' + view)
    nextView.style.display = 'block'
}

function toggleLoadingState (loading) {
    var hideOnload = document.querySelectorAll('*[data-pp-hide-onload]')
    var showOnload = document.querySelectorAll('*[data-pp-show-onload]')
    console.log(hideOnload)
    var showFunction = function (element) {
        element.removeAttribute('hidden')
    }
    var hideFunction = function (element) {
        element.setAttribute('hidden', '')
    }
    toggleUIDisabled(loading)
    if (loading) {
        hideOnload.forEach(hideFunction)
        showOnload.forEach(showFunction)
    } else {
        hideOnload.forEach(showFunction)
        showOnload.forEach(hideFunction)
    }
}

/**
 * Disable or enable all interactive UI elements
 * @param {boolean} disabled 
 */
function toggleUIDisabled (disabled) {
    var buttons = document.querySelectorAll('button')
    var inputs = document.querySelectorAll('input')
    var textareas = document.querySelectorAll('textarea')
    var toggler = function (element) {
        if (disabled) {
            element.setAttribute('disabled', '')
        } else {
            element.removeAttribute('disabled')
        }
    }
    buttons.forEach(toggler)
    inputs.forEach(toggler)
    textareas.forEach(toggler)
}

/**
 * Insert the specified list of images into the output view
 * @param {string[]} urls 
 */
function insertImages (urls) {
    var imageContainer = document.querySelector('#pp-output-images')
    imageContainer.innerHTML = ''
    urls.forEach(function(url){
        var item = document.createElement('div')
        var tile = document.createElement('div')
        var image = document.createElement('div')
        
        tile.classList.add('uk-tile', 'uk-tile-primary', 'uk-padding-remove')
        image.classList.add('uk-height-medium', 'uk-background-cover')
        image.setAttribute('uk-img', '')
        image.setAttribute('data-src', url)

        tile.append(image)
        item.append(tile)
        imageContainer.append(item)
    })
}

/**
 * Submit the text in the input textarea to the picpic API
 * @param {function} successCallback 
 * @param {function} errorCallback 
 */
function submitText (successCallback, errorCallback) {
    var textContent = textArea.value.trim()
    if (textContent.length === 0) {
        errorCallback(new Error('Please insert an article text'))
        return
    }
    axios({
        url: 'http://picpic-api.argonn.me/custom/picpic/ml?threshold=0.1&numImages=10', 
        method: 'post',
        headers: { 'Content-Type': 'text/plain' },
        data: textContent
    })
    .then(function (response) {
        successCallback(response)
    })
    .catch(function (error) {
        errorCallback(error)
    })
}

export { 
    changeText, 
    changeView, 
    insertImages, 
    submitText, 
    toggleLoadingState, 
    toggleUIDisabled
}