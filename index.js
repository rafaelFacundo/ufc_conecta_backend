import express from "express";

const app = express();

app.get("/testserver", (req, res) => {
  res.send("THE SERVER IS ON FIRE 🔥.");
});

app.listen(3000, () => {
  console.log("THE SERVER IS ON THE PORT 3000");
});
