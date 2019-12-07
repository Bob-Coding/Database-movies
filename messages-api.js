const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(bodyParser.json());

app.post("/messages", (req, res) => {
  const message = req.body;
  if (message) {
    console.log(req.body);
    res.json({
      message: "Message received loud and clear"
    });
  } else {
    res.status(400).end();
  }
});
app.listen(port, () => console.log(`Listening on ${port}`));
