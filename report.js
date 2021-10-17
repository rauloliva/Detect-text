const fs = require('fs')

const readJsonReport = () => {
    return new Promise(resolve => {
        const matriz = []
        const data = fs.readFileSync('ocr_report.json', {encoding: 'UTF-8'})
        const json = JSON.parse(data)

        json.forEach(obj => {
            const array = [obj.url, obj.words]
            matriz.push(array)
        })
        resolve(matriz)
    })    
}

module.exports = readJsonReport

