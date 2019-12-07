const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(bodyParser.json());

let count = 0;

app.post("/messages", (req, res) => {
  const message = req.body;
  const messageIsEmpty =
    Object.keys(message).length === 0 || message.text === "";
  if (messageIsEmpty) {
    return res.status(400).end();
  }

  count++;
  if (count > 5) {
    return res.status(429).send("Too many requests");
  }

  console.log(req.body);
  res.json({
    message: "Message received loud and clear"
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));
