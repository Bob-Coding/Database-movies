const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Router } = require("express");
const router = new Router();

app.use(bodyParser.json());

// In the JavaScript file, initialize the database connection with Sequelize.
const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);
const port = 3000;

// Using Sequelize, define a model called Movie with the following properties (in addition to an ID)
const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING
  },
  yearOfRelease: {
    type: Sequelize.INTEGER
  },
  synopsis: {
    type: Sequelize.STRING
  }
});

// Truncate on start for testing
// Movie.destroy({ truncate: true, cascade: false });

// Make sure the model is synched with the database upon startup.
// Use the model create() method to insert 3 rows of example data. This logic should happen after the model synchronization completes.
db.sync()
  .then(() =>
    Movie.create({
      title: "Bob, the great coder",
      yearOfRelease: 2019,
      synopsis:
        "Bob tries to become a webdeveloper trough codaisseur, will he succeed..?"
    })
  )
  .then(() =>
    Movie.create({
      title: "Bob, the great sequelizer",
      yearOfRelease: 2019,
      synopsis:
        "Bob tries to become skilled in implenting sequalize, will he succeed..?"
    })
  )
  .then(() =>
    Movie.create({
      title: "Bob, the great routes builder",
      yearOfRelease: 2019,
      synopsis:
        "Bob tries to become the great routes builder, will he succeed to build one single route in his app..?"
    })
  )
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  });

// read a single movie resource
router.get("/movies/:movieID", (req, res) => {
  const id = req.params.movieID;
  Movie.findByPk(id).then(result => res.send(result));
});

// create a new movie resource
router.post("/movies", (req, res) => {
  const movie = req.body;
  Movie.create({
    title: movie.title,
    yearOfRelease: movie.yearOfRelease,
    synopsis: movie.synopsis
  }).then(m => res.send(m));
});

// update a single movie resource
router.put("/movies/:movieID", (req, res) => {
  const movie = {
    title: req.body.title,
    yearOfRelease: req.body.yearOfRelease,
    synopsis: req.body.synopsis
  };
  Movie.update(movie, {
    where: {
      id: req.params.movieID
    }
  }).then(() => res.json(movie));
});

// delete a single movie resource
router.delete("/movies/:movieID", (req, res, next) => {
  Movie.findByPk(req.params.movieID)
    .then(movie => {
      return movie.destroy();
    })
    .then(() => {
      res.send("/movies");
    });
});

// read all movies (the collections resource)
router.get("/movies", (req, res) => {
  Movie.findAll().then(movies => {
    res.send(movies);
  });
});

app.use(router);
app.listen(port);
