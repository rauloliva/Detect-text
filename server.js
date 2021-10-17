const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const detectText = require('./ocr')
const report = require('./report')
const port = 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/views'))

app.listen(port, () => console.log(`Server started at port: ${port}`))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/ocr', (req, res) => {
    const jsonAction = req.body.jsonAction
    detectText(jsonAction).then(() => {
        report().then(images => {
            res.render('table', {images: images})
        })
    })
})

app.post('/report', (req, res) => {
    report().then(images => {
        res.render('table', {images: images})
    })
})