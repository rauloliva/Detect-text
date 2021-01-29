// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs')
var matrizWords = []

const getArrayWords = text => {
    const cell = text.description.toLowerCase()
    matrizWords.push(cell)
}

const organizeCells = ocurrencies => {
    let size = ocurrencies.length
    var value = ''
    for (let i = 1; i < size; i++) {
        value += `${ocurrencies[i]}, `
        ocurrencies[i] = null
    }
    //value.length - 2 => removes the last space and comma
    ocurrencies[1] = value.trim().substring(0, value.length - 2)
    return ocurrencies
}

const detectSpecialWords = imgPath => {
    const ocurrencies = matrizWords.filter(foundWord => {
        const masterOcurrencies = (foundWord.match(/master/g) || [])
        const slaveOcurrencies = (foundWord.match(/slave/g) || [])
        const slavesOcurrencies = (foundWord.match(/slaves/g) || [])

        //Gathering all the ocurrencies in a single array
        const ocurrenciesFound = [...masterOcurrencies, ...slaveOcurrencies, ...slavesOcurrencies]
        if(ocurrenciesFound.length > 0) {
            return ocurrenciesFound
        }
    })
    ocurrencies[0] = imgPath

    return organizeCells(ocurrencies)
}

const detectText = () => {
    // Gets all the images from the img folder
    const data = fs.readFileSync('images.csv', {encoding: 'utf-8'})
    const images = data.split(',')

    // Creates a new client
    const client = new vision.ImageAnnotatorClient();

    return new Promise(async resolve => {
        const matriz = []
        // Reads the text from each image
        for (const image of images) {
            // Performs text detection on the image file
            const [result] = await client.textDetection(image);
            const detections = result.textAnnotations;
            detections.forEach(getArrayWords);
            matrizWords = detectSpecialWords(image)

            matriz.push(matrizWords)
            matrizWords = []
        }
        resolve(matriz)
    })
}

module.exports = detectText