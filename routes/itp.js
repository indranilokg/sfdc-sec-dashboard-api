const express=require("express");
const router=express.Router();

const axios = require('axios');

const PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/query.properties');

const headers = {
      'Authorization': 'SSWS ' + process.env.ITP_API_KEY,
      'Content-Type': 'application/json'
  };

//Get all devices
router.get("/itpPlaceHolder", async (req,res,next)=>{
    let config = {
        headers: headers
    };
    try {
        let result = await axios.get(process.env.ITP_URL + "/api/v1/logs", config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})


// Importing the router
module.exports=router