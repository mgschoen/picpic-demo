import { changeView, insertImages, updateStats } from './functions'

var images = [{"id":"502738801","title":"World Map Geography","caption":"World Map Geography","previewUrl":"https://media.gettyimages.com/vectors/world-map-geography-vector-id502738801?b=1&k=6&m=502738801&s=612x612&h=De7WlRUhK8U2YBwjAx2NTp0_xAUCd60W6LjRsl4RAGA=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-map-geography-royalty-free-illustration/502738801"},{"id":"507573090","title":"Simple World Map in Gray","caption":"The world map was traced and simplified in Adobe Illustrator on 31JAN2016 from a copyright-free resource below:","previewUrl":"https://media.gettyimages.com/vectors/simple-world-map-in-gray-vector-id507573090?b=1&k=6&m=507573090&s=612x612&h=Jg3D1aJOsZkd2uO-y4Fy0-2Xp0uAL0D6ikS7sCkCW-M=","detailUrl":"https://www.gettyimages.com/detail/illustration/simple-world-map-in-gray-royalty-free-illustration/507573090"},{"id":"522786970","title":"World Map","caption":"Empty Dark Gray World Map - illustration","previewUrl":"https://media.gettyimages.com/vectors/world-map-vector-id522786970?b=1&k=6&m=522786970&s=612x612&h=o6JKgtoOqecqm9MFkI_a1bmA44XkvWcx1Ox2nrmU5mo=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-map-royalty-free-illustration/522786970"},{"id":"618068598","title":"World Map of Dots","caption":"A detailed world map illustration made up of dots. This file is an ideal design element for your project. It's easy to colour and customise if required and can be scaled to any size without loss of quality.","previewUrl":"https://media.gettyimages.com/vectors/world-map-of-dots-vector-id618068598?b=1&k=6&m=618068598&s=612x612&h=7nzZMZPrmRuX5FIdtxWPVThYCgKNH4DRxqiL-aG6frY=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-map-of-dots-royalty-free-illustration/618068598"},{"id":"607778136","title":"World Vector Map","caption":"High detailed world map with coloured continents and oceans","previewUrl":"https://media.gettyimages.com/vectors/world-vector-map-vector-id607778136?b=1&k=6&m=607778136&s=612x612&h=Txzao5uKs1EboSatIS4qxrN4OcWWMx6SSEBxu7zroiY=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-vector-map-royalty-free-illustration/607778136"},{"id":"538949193","title":"blue World Political Map with globes and landmarks","caption":"The world map was traced and simplified in Adobe Illustrator on 8 MAY 2013 from a copyright-free resource below:","previewUrl":"https://media.gettyimages.com/vectors/blue-world-political-map-with-globes-and-landmarks-vector-id538949193?b=1&k=6&m=538949193&s=612x612&h=zZGhVBLv5Cq7NB12kIkJtlhn5NaY9Yg4FOFZf5pG-oU=","detailUrl":"https://www.gettyimages.com/detail/illustration/blue-world-political-map-with-globes-and-royalty-free-illustration/538949193"},{"id":"501096790","title":"Colored World Map made from dots","caption":"The World Map made from dots. Easy resize & recolored. Used global color. ","previewUrl":"https://media.gettyimages.com/vectors/colored-world-map-made-from-dots-vector-id501096790?b=1&k=6&m=501096790&s=612x612&h=0yPppqK8EqDAsly48dx6gv442VhuQdqmEsugY5JELx4=","detailUrl":"https://www.gettyimages.com/detail/illustration/colored-world-map-made-from-dots-royalty-free-illustration/501096790"},{"id":"495055771","title":"Clouds with travel monument shapes","caption":"Travel Symbols in clouds","previewUrl":"https://media.gettyimages.com/photos/clouds-with-travel-monument-shapes-picture-id495055771?b=1&k=6&m=495055771&s=612x612&h=via1idDe35Tdogak2eYOs3IrqqB5YkXGf9FkwO-XBD0=","detailUrl":"https://www.gettyimages.com/detail/photo/clouds-with-travel-monument-shapes-royalty-free-image/495055771"},{"id":"522787450","title":"World Map","caption":"Empty Blue World Map","previewUrl":"https://media.gettyimages.com/vectors/world-map-vector-id522787450?b=1&k=6&m=522787450&s=612x612&h=kCvylt9xN6O7HS7tnMpLb3HE4FUUQBErcG1UiCazIPY=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-map-royalty-free-illustration/522787450"},{"id":"639758320","title":"Confident Muslim Doctor Meets with Healthcare Professionals","caption":"Wide shot of a confident Muslim doctor meeting with healthcare professional team.","previewUrl":"https://media.gettyimages.com/photos/confident-muslim-doctor-meets-with-healthcare-professionals-picture-id639758320?b=1&k=6&m=639758320&s=612x612&h=lo4yxy8YE9qLVJYgJCzd4raN8BJ-uXZ7Kdtpk7vMBX0=","detailUrl":"https://www.gettyimages.com/detail/photo/confident-muslim-doctor-meets-with-healthcare-royalty-free-image/639758320"},{"id":"502738801","title":"World Map Geography","caption":"World Map Geography","previewUrl":"https://media.gettyimages.com/vectors/world-map-geography-vector-id502738801?b=1&k=6&m=502738801&s=612x612&h=De7WlRUhK8U2YBwjAx2NTp0_xAUCd60W6LjRsl4RAGA=","detailUrl":"https://www.gettyimages.com/detail/illustration/world-map-geography-royalty-free-illustration/502738801"},{"id":"507573090","title":"Simple World Map in Gray","caption":"The world map was traced and simplified in Adobe Illustrator on 31JAN2016 from a copyright-free resource below:","previewUrl":"https://media.gettyimages.com/vectors/simple-world-map-in-gray-vector-id507573090?b=1&k=6&m=507573090&s=612x612&h=Jg3D1aJOsZkd2uO-y4Fy0-2Xp0uAL0D6ikS7sCkCW-M=","detailUrl":"https://www.gettyimages.com/detail/illustration/simple-world-map-in-gray-royalty-free-illustration/507573090"}]

var terms = [
    { p: 0.44434, originalTerms: ['Lorem ipsum'] },
    { p: 0.4811386317945998, originalTerms: ['Lorem ipsum'] },
    { p: 0.20070689923666518, originalTerms: ['dolor sit amet'] },
    { p: 0.05646828868891807, originalTerms: ['consetetur'] },
    { p: 0.2687879316521846, originalTerms: ['sadipscing elitr'] },
    { p: 0.09173042651152041, originalTerms: ['sed diam nonumy'] },
    { p: 0.3590042015437902, originalTerms: ['eirmod'] },
    { p: 0.7746861576630477, originalTerms: ['tempor invidunt'] },
    { p: 0.5342016053931242, originalTerms: ['ut labore'] },
    { p: 0.2740656756637423, originalTerms: ['dolore'] },
    { p: 0.356941088669815, originalTerms: ['magna aliquyam'] },
    { p: 0.6922117055361947, originalTerms: ['sed diam'] },
    { p: 0.2744611729330326, originalTerms: ['voluptua'] },
    { p: 0.4036854715491207, originalTerms: ['vero'] },
    { p: 0.7004777994342706, originalTerms: ['eos et accusam'] }
]

function populateImages () {
    insertImages(images)
}

function populateTerms () {
    updateStats('Tiger und Bär', terms)
}

function plugRequestMockup (button, originalCallback, callback) {
    button.removeEventListener('click', originalCallback)
    button.addEventListener('click', requestMockup)
    callback()
}

function requestMockup () {
    populateImages()
    populateTerms()
    changeView('output')
}

export { 
    populateImages, 
    populateTerms, 
    plugRequestMockup
}
