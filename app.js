const express = require('express');
const axios = require('axios');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();


axios.defaults.paramsSerializer = (params) => {
    let result = '';
    Object.keys(params).forEach(key => {
        result += `${key}=${params[key]}&`;
    });
    return result.substring(0, result.length - 1);
};

const homeroute=require("./routes/home.js")
const oigservice=require("./routes/oig.js")
const odaservice=require("./routes/oda.js")

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/",homeroute);
app.use("/",oigservice);
app.use("/",odaservice);


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

