const express = require('express'),
    morgan = require('morgan');

const app = express();

let top10Movies = [ {
  title : 'Harry Potter and the Sorcerer\'s Stone',
  director : 'J.K. Rowling'
  },
  {
  title : 'Lord of the Rings',
  director : 'J.R.R. Tolkien'
  },
  {
  title : 'Twilight',
  director : 'Stephanie Meyer'
  }
  ];

app.use(morgan('common'));

// GET requests
app.get('/', (req, res, next) => {
    res.send('Welcome to the Cinesider!')
  });
app.get('/movies',(req, res, next) => {
    res.json(top10Movies)
  });

//static public folders
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

app.listen(8080);

console.log("It's working!");
