const express = require('express');
const homeroute=require("./routes/home.js")

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/",homeroute);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

