const express = require('express')
const app = express()
const detectText = require('./ocr')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

app.listen(port, () => console.log(`Server started at port: ${port}`))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/ocr', (req, res) => {
    detectText().then(images => {
        res.render('table', {images: images})
    })
})