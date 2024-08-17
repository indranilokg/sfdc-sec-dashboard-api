const express=require("express");
const router=express.Router();

const axios = require('axios');

const PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/query.properties');

const headers = {
      'Authorization': 'SSWS ' + process.env.API_KEY,
      'Content-Type': 'application/json'
  };


// Handling request using router
router.get("/oigShowAllActiveCampaign", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "status%20eq%20%22ACTIVE%22"
          }
    };
    try {
        let result = await await axios.get(process.env.OKTA_URL + properties.get("OIG_ALL_CAMPAIGN"), config);
        var response = result.data;
        delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

router.get("/oigGetAllReviews", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "campaignId%20eq%20%22" + req.query.campaignId + "%22"
          }
    };
    try {
        let result = await await axios.get(process.env.OKTA_URL + properties.get("OIG_ALL_REVIEWS"), config);
        var response = result.data;
        delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

// Importing the router
module.exports=router