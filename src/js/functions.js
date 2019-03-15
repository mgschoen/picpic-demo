import axios from 'axios'

var validViews = [ 'input', 'output' ]
var apiUrls = {
    default: 'http://picpic-api.argonn.me/custom/picpic/ml',
    netlify: 'https://vigilant-yonath-af08cf.netlify.com/.netlify/functions/custom-picpic'
}

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
function changeView (url) {
    var slugs = url.split('/').filter(function (slug) {
        return slug.length > 0
    })
    var view = slugs[0]
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
    window.history.pushState(null, null, '#/' + view)
}

/**
 * Insert the specified list of images into the output view
 * @param {string[]} urls 
 */
function insertImages (images) {
    var imageContainer = document.querySelector('#pp-output-images')
    imageContainer.innerHTML = ''
    images.forEach(function(imageObject){
        var item = document.createElement('div')
        var tile = document.createElement('div')
        var image = document.createElement('div')

        var overlay = document.createElement('a')
        
        tile.classList.add('uk-tile', 'uk-tile-primary', 'uk-padding-remove')
        image.classList.add('uk-height-medium', 'uk-background-cover')
        image.setAttribute('uk-img', '')
        image.setAttribute('data-src', imageObject.previewUrl)
        
        overlay.classList.add('uk-overlay', 'uk-overlay-primary', 'uk-position-cover')
        overlay.setAttribute('href', imageObject.detailUrl)
        overlay.setAttribute('target', '_blank')
        var title = imageObject.title
        var caption = imageObject.caption
        overlay.innerHTML = '<h4 class="uk-heading-divider">' 
            + title.slice(0,50) + ((title.length > 50) ? '...</h4>' : '</h4>')
            + '<p>' + (caption 
                ? (caption.slice(0,100) + ((caption.length > 100) ? '...' : '')) 
                : '') 
            + '</p>'

        tile.append(image)
        tile.append(overlay)
        item.append(tile)

        imageContainer.append(item)
    })
}

function insertText (plainText) {
    var textContainer = document.querySelector('#pp-output-text')
    var paragraphs = plainText.split('\n')
    var innerHTML = ''
    paragraphs.forEach(function (paragraph) {
        var trimmedParagraphContent = paragraph.trim()
        if (trimmedParagraphContent.length > 0) {
            innerHTML += ('<p>' + trimmedParagraphContent + '</p>')
        }
    })
    textContainer.innerHTML = innerHTML
}

/**
 * Submit the text in the input textarea to the picpic API
 * @param {Object} options
 * @param {function} successCallback 
 * @param {function} errorCallback 
 */
function submitText (options, successCallback, errorCallback) {
    var textContent = textArea.value.trim()
    if (textContent.length === 0) {
        errorCallback(new Error('Please insert an article text'))
        return
    }
    var validApis = Object.keys(apiUrls)
    var apiName = (validApis.indexOf(options.api) >= 0) 
        ? options.api
        : 'default'
    var baseUrl = apiUrls[apiName]
    axios({
        url: baseUrl + '?threshold=0.1&numImages=12', 
        method: 'post',
        headers: { 'Content-Type': 'text/plain' },
        data: textContent
    })
    .then(function (response) {
        successCallback(response, textContent)
    })
    .catch(function (error) {
        errorCallback(error)
    })
}

/**
 * Switch between the visual appearances of being busy
 * loading something and being ready for interaction.
 * In loading state, all interactive UI elements are disabled.
 * Elements with attribute `data-pp-hide-onload` are only
 * visible when not loading, elements with `data-pp-show-onload`
 * are only visible when loading.
 * @param {boolean} loading - if true, loading state is activated,
 *                            otherwise deactivated
 */
function toggleLoadingState (loading) {
    var hideOnload = document.querySelectorAll('*[data-pp-hide-onload]')
    var showOnload = document.querySelectorAll('*[data-pp-show-onload]')
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

function updateStats (searchTerm, termList) {
    var searchTermContainer = document.querySelector('#pp-output-searchterm')
    var termListContainer = document.querySelector('#pp-output-termlist')
    searchTermContainer.textContent = searchTerm
    termListContainer.innerHTML = ''
    termList.forEach(function (term) {
        var termElement = document.createElement('code')
        termElement.classList.add('pp-output-term', 'uk-border-rounded')
        termElement.setAttribute('uk-tooltip', 'p = ' + term.p.toString())
        termElement.textContent = term.canonicalTerm || term.originalTerms[0]
        termListContainer.append(termElement)
        termListContainer.append(document.createTextNode(' '))
    })
}

export { 
    changeText, 
    changeView, 
    insertImages, 
    insertText,
    submitText, 
    toggleLoadingState, 
    toggleUIDisabled,
    updateStats
}