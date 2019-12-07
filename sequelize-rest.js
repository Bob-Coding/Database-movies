const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

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
db.sync() // Calling sync creates the table if it does not already exist
  // Movie.create() inserts a new row
  .then(() =>
    Movie.create({
      title: "example1",
      yearOfRelease: 1,
      synopsis: "example1"
    }).then(() =>
      Movie.create({
        title: "example2",
        yearOfRelease: 2,
        synopsis: "example 2"
      }).then(() =>
        Movie.create({
          title: "example3",
          yearOfRelease: 3,
          synopsis: "example 3"
        }).catch(err => {
          console.error("Unable to create tables, shutting down...", err);
          process.exit(1);
        })
      )
    )
  );
module.exports = db;
