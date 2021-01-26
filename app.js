// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs')
const xlsx = require('xlsx')
var matrizWords = []
const matriz = []

const getArrayWords = text => {
    const cell = text.description
    matrizWords.push(cell)
}

const exportXLSX = () => {
    // print the words into a spredsheet
    const workbook = xlsx.utils.book_new()
    const worksheet = xlsx.utils.aoa_to_sheet(matriz)
    xlsx.utils.book_append_sheet(workbook,worksheet,'Words')

    const date = new Date()
    const unique = `${date.getDay()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
    xlsx.writeFile(workbook, `reports/Report_${unique}.xlsx`)
    console.log('Finished!');
}

const detectText = () => {
    // Gets all the images from the img folder
    const data = fs.readFileSync('images.csv', {encoding: 'utf-8'})
    const images = data.split(',')

    // Creates a new client
    const client = new vision.ImageAnnotatorClient();

    const promise = new Promise(async resolve => {
        // Reads the text from each image
        for (const image of images) {
            // Performs text detection on the image file
            const [result] = await client.textDetection(image);
            const detections = result.textAnnotations;
            detections.forEach(getArrayWords);
            matriz.push(matrizWords)
            matrizWords = []
        }
        resolve()
    })
    promise.then(() => exportXLSX())
}

detectText()