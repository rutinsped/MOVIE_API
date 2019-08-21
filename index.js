//@ts-check
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
  var docs = require("express-mongoose-docs");

const app = express();

app.use(morgan("common"));

app.use(bodyParser.json());

app.use(express.static("public"));

docs(app, mongoose); // 2nd param is optional

let Movies = [
  {
    id : 1,
    title: "Harry Potter and the Sorcerer's Stone",
    director: "J.K. Rowling", bio: '', birthyear: '', deathyear: '', filmes: '',
    genre: "Fantasy, Drama", description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone',
    year : '2001'
  },
  {
    id : 2,
    title: "Lord of the Rings",
    director: "J.R.R. Tolkien", bio: '', birthyear: '', deathyear: '', filmes: '',
    genre: "Fantasy, Adventure", description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
    year : '2001'
  },
  {
    id : 3,
    title: "Twilight",
    director: "Stephanie Meyer", bio: '', birthyear: '', deathyear: '', filmes: '',
    genre: "Romance, Fantasy", description: 'Romance films are love stories, or affairs of the heart that center on passion, emotion, and the romantic, affectionate involvement of the main characters (usually a leading man and lady), and the journey that their love takes through courtship or marriage.',
    year : '2009'
  }
];

let users = [
  {
    id: 1,
    username: "ciny",
    name: "Sandra Stevenson",
    email : 'snadrastev@gmail.com',
    interest: "Fantasy, Drama"
  },
  {
    id: 2,
    username: "lord",
    name : "Jo Benett",
    email : "jobenett@gmail.com", 
    interest: "Fantasy, Adventure"
  },
  {
    id: 3,
    username: "cat",
    name: "Carole Klein",
    email : 'carole.k@gmail.com',
    interest: "Romance, Adventure"
  }
];


// Get movies and details

app.get("/movies", (req, res, next) => {
  res.json(Movies);
});

app.get('/movies/:title', (req, res) => {
  res.json(Movies.find( (movie) => { return movie.title.toLowerCase().includes(req.params.title.toLowerCase()); }));
});

app.get('/directors/:director', (req, res) => {
  res.json(Movies.find( (movie) => { return movie.director.toLowerCase().includes(req.params.director.toLowerCase()); }));
});

app.get('/genres/:genre', (req, res) => {
  res.json(Movies.find( (movie) => { return movie.genre.toLowerCase().includes(req.params.genre.toLowerCase()); }));
});

// Post, Put, Delete - Create, Update, Delete with Movies

app.post("/movies", (req, res, next) => {
  let newmovie = req.body;

  if (!newmovie.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);

  } else {
    newmovie.id = uuid.v4();
    Movies.push(newmovie);
    res.status(201).send(newmovie);
  }
});

app.put("/movies/:title", (req, res, next) => {
  
  let movieTitle = req.params.title;
  let movie = Movies.find((movie) => movie.title === movieTitle);

  if (movie) {
    movie.title = req.body.title,
    movie.director = req.body.director,
    movie.genre = req.body.genre,
    movie.year = req.body.year
    res.status(201).send("This movie" + req.params.title + "was assigned a new parameter");

} else {
  res.status(404).send("Movie with the title" + req.params.title + "was not found.")
}
}),

app.delete("/movies/:title", (req, res, next) => {
  let movie = Movies.find((movie) => {
    return movie.title === req.params.title
  });

  if (movie) {
    Movies.filter(function(obj) {
      return obj.title !== req.params.title
    }),
    res.status(201).send("Movie"  + req.params.title +  "was deleted from the list.")
  }
});

// Post, Put, Delete - Create, Update, Delete with Users

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.get("/usernames/:name", (req, res) => {
  res.json(users.find( (user) =>
    { return user.name === req.params.name   }));
});

app.post("/users", (req, res, next) => {
  let newuser = req.body;

  if (!newuser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
    
  } else {
    newuser.id = uuid.v4();
    users.push(newuser);
    res.status(201).send(newuser);
  }
});

app.put('/users/:id', (req, res) => {

  const user = users.find(user => user.id === parseInt(req.params.id));
  
  if (user) {
    user.username = req.body.username,
    user.name = req.body.name,
    user.email = req.body.email,
    user.interest = req.body.interest
    res.status(201).send(user)
  } else {
    res.status(400).send('user does not exist');
  }

});

app.delete("/users/:username", (req, res, next) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });

  if (user) {
    users.filter(function(obj) {
      return obj.username !== req.params.username
    }),
    res.status(201).send("Username"  + req.params.username +  "was deleted from the list.")
  }
});

// GET common requests
app.get("/", (req, res, next) => {
  res.send("Welcome to the Cinesider!");
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(8080);

console.log("It's working!");
