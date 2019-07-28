const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://ellie:resilient@cluster0-stpgj.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "affirmations";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('logs').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {logs: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('logs').save({msg: req.body.msg, days: 0, color: "000"}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('logs')
  .findOneAndUpdate({msg: req.body.msg}, {
    $set: {
      days:req.body.days + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/color', (req, res) => {
  db.collection('logs')
  .findOneAndUpdate({msg: req.body.msg}, {
    $set: {
      'color': "a9d06b"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('logs').findOneAndDelete({msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
