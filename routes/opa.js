const express=require("express");
const router=express.Router();

const axios = require('axios');

const PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/query.properties');

async function getServiceToken() {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const payload = {
        key_id: process.env.OPA_API_KEY,
        key_secret: process.env.OPA_API_SECRET
    }
    let result = await axios.post(process.env.OPA_URL + properties.get("OPA_SERVICE_TOKEN"), payload, config);
    console.log(result.data);
    return result.data.bearer_token;
}

router.get("/opa", async (req,res,next)=>{
    const serviceToken = await getServiceToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceToken
    };
    let config = {
        headers: headers
    };
    try {
        res.send(serviceToken);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})



// Importing the router
module.exports=router