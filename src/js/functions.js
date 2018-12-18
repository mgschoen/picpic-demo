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

export { changeText, changeView, insertImages, submitText }