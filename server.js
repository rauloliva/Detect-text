const express = require('express')
const app = express()
const detectText = require('./ocr')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

app.listen(port, () => console.log(`Server started at port: ${port}`))

app.get('/', (req, res) => {
    console.log("OCR has started");
    detectText().then(images => {
        console.log("OCR has finished");
        res.render('index', {images: images})
    })
})