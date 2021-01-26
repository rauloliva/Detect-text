// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
const xlsx = require('xlsx')
const prompt = require('prompt-sync')()
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

    const d = new Date()
    const unique = `${d.getDay()}_${d.getMonth()}_${d.getFullYear()}_${d.getHours()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`
    xlsx.writeFile(workbook, `reports/Report_${unique}.xlsx`)
    console.log('Finished!');
}

const detectText = async () => {
    // Creates a new client
    const client = new vision.ImageAnnotatorClient();
    var moreUrls = false

    do {
        const url = prompt('Insert the url: ')
        const [ result ] = await client.textDetection(url.trim());
        const detections = result.textAnnotations;
        detections.forEach(getArrayWords);
        matriz.push(matrizWords)
        matrizWords = []
        console.log("Image was processed!");

        const Continue = prompt('want to process more? (y=yes, n=no): ')
        moreUrls = Continue === 'y'
    } while(moreUrls === true)

    exportXLSX()
}

detectText()