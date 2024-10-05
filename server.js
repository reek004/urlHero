const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const QRCode = require('qrcode')
const path = require('path')
const qrCode = require('./models/qrCode')
const app = express()


require('dotenv').config()

const mongoURL = process.env.MONGO_DB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('connected',()=> {
  console.log('db connection establish');
})

db.on('error',(err)=>{
  console.log("MongoDB connection error");
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { page: 'home' })
})

app.get('/shortUrls', async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find()
    res.render('index', { page: 'shortUrls', shortUrls: shortUrls || [] })
  } catch (error) {
    console.error('Error fetching short URLs:', error)
    res.render('index', { page: 'shortUrls', shortUrls: [] })
  }
})

app.post('/shortUrls', async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/shortUrls')
  } catch (error) {
    res.send({Error : error})
  }
})

app.get('/qrgen', (req, res) => {
  res.render('index', { page: 'qrgen', qrCode: null })
})

app.post('/qrgen', async (req, res) => {
  const url = req.body.url
  try {
    const qrCode = await QRCode.toDataURL(url)  // Updated to use QRCode from the library
    res.render('index', { page: 'qrgen', qrCode: qrCode, url: url })
  } catch (error) {
    console.error('Error generating QR code:', error)
    res.render('index', { page: 'qrgen', qrCode: null, error: 'Failed to generate QR code' })
  }
})

app.get('/qrgen/download', (req, res) => {
  const url = req.query.url
  QRCode.toFile('qrcode.png', url, (err) => {
    if (err) {
      res.status(500).send('Error generating QR code')
    } else {
      res.download('qrcode.png')
    }
  })
})

app.post('/deleteUrl', async (req, res) => {
  try {
    await ShortUrl.findByIdAndDelete(req.body.id)
    res.redirect('/shortUrls')
  } catch (error) {
    console.error('Error deleting URL:', error)
    res.status(500).send('Error deleting URL')
  }
})

app.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.full)
  } catch (error) {
    console.error('Error handling short URL:', error)
    res.sendStatus(500)
  }
})

app.listen(process.env.PORT || 5000);