const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const MongoClient = require('mongodb').MongoClient;
const app = express();


MongoClient.connect("mongodb+srv://sameer:primesam1s@cluster0.8dfo7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true })
    .then(function (client) {
    // if (err) return console.error(err)
    // console.log('Connected to Database');

    const db = client.db('To-Do-List');
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.get("/", function (req, res) {
        const cursor = db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', {quotes: results})
                // console.log(results);
            })
            .catch(error => console.error(error))
        // console.log(cursor);
        //res.sendFile(__dirname + '/index.html');
    });

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
          { quote: req.body.oldQuote },
          {
            $set: {
              
              quote: req.body.newQuote,
            }
          },
          {
            upsert: true
          }
        )
        .then(result => {
          res.json('Success')
        })
       .catch(error => console.error(error))
      
          }) 

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            {quote: req.body.quote}
        )
        .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vadar's quote`)
          })
          .catch(error => console.error(error))
    })

      app.listen(3000, function () {
        console.log('listening on 3000');
      });
    })
    .catch(console.error);


    
