// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs')
const ocr_report = 'ocr_report.json'
var matrizWords = []

const jsonActions = {
    rewrite: (jsonObj) => fs.writeFileSync(ocr_report, jsonObj, {encoding: 'UTF-8'}),
    append: (jsonObj) => {
        const json = fs.readFileSync(ocr_report, {encoding: 'utf-8'})
        const currentContent = JSON.parse(json)
        const array = JSON.parse(jsonObj)
        array.forEach(obj => {
            currentContent.push(obj)
        })
        
        fs.writeFileSync(ocr_report, JSON.stringify(currentContent), {encoding: 'UTF-8'})
    }
}

const getArrayWords = text => {
    const cell = text.description.toLowerCase()
    matrizWords.push(cell)
}

const organizeCells = ocurrencies => {
    let size = ocurrencies.length
    var value = ''
    for (let i = 1; i < size; i++) {
        value += `${ocurrencies[i]}, `
    }
    //value.length - 2 => removes the last space and comma
    ocurrencies[1] = value.trim().substring(0, value.length - 2)
    return ocurrencies
}

const saveReport = (matriz, jsonAction) => {
    const array = []
    matriz.forEach(row => {
        const jsObj = {
            "url": row[0],
            "words": row[1]
        }
        array.push(jsObj)
    })
    const jsonObj = JSON.stringify(array)
    jsonActions[jsonAction](jsonObj)
}

const detectText = jsonAction => {
    console.log("OCR has started");

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
            detections.forEach(getArrayWords)
            matrizWords[0] = image
            matrizWords = organizeCells(matrizWords)
            matriz.push(matrizWords)
            matrizWords = []
        }
        console.log("OCR has finished ")
        saveReport(matriz, jsonAction)
        resolve()
    })
}

module.exports = detectText