const express = require('express');
const port = process.env.PORT || 3000;

const Datastore = require('nedb');
const db = new Datastore( {filename: 'database.db' });
db.loadDatabase();

const app = express();
app.listen(port, () => console.log('Listening, master'))
app.use(express.static('public'));
app.use(express.json());

app.post('/api', (req, response) => {
  const data = req.body;
  timestamp = Date.now();
  data.timestamp = timestamp;

  response.send({"status": "success"});
  db.insert(data);
});

const randomNum = Math.floor(Math.random()*3);

app.get('/api', (req, response) => {
  db.find({}).limit(5).skip(randomNum).exec((err, docs) => {
    if(err) {
      console.log(err);
      response.end();
    } else {
      response.send(docs);
    }
  })
});
