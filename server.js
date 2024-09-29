const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const path = require('path')
const app = express()
require('dotenv').config();


//dbConnection

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
app.use(express.json())  // Add this line to parse JSON requests

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

app.delete('/shortUrls/:id', async (req, res) => {
  try {
    await ShortUrl.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error deleting URL:', error)
    res.sendStatus(500)
  }
})

app.get('/qrgen', (req, res) => {
  res.render('index', { page: 'qrgen' })
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