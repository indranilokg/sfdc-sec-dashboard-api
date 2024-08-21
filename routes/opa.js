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

router.get("/opaGetAllServers", async (req,res,next)=>{
    const serviceToken = await getServiceToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceToken
    };
    let config = {
        headers: headers
    };
    try {
        let result = await axios.get(process.env.OPA_URL + properties.get("OPA_ALL_SERVERS"), config);
        var response = result.data;
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

router.get("/opaGetAllServerAccounts", async (req,res,next)=>{
    const serviceToken = await getServiceToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceToken
    };
    let config = {
        headers: headers
    };
    try {
        let result = await axios.get(process.env.OPA_URL + properties.get("OPA_ALL_SERVER_ACCOUNTS"), config);
        var response = result.data;
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})


router.get("/opaGetAllGatewaysStatus", async (req,res,next)=>{
    const serviceToken = await getServiceToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceToken
    };
    let config = {
        headers: headers
    };
    try {
        let gateways = [];
        let result = await axios.get(process.env.OPA_URL + properties.get("OPA_ALL_GATEWAYS"), config);
        var response = result.data.list;
        console.log(response);
        for (i in response) {
            let gateway = response[i];
            let statusResult = await axios.get(process.env.OPA_URL + properties.get("OPA_ALL_GATEWAYS") + "/" + gateway.id + "/status", config);
            let statusResponse = statusResult.data;
            gateways.push({"name": gateway.name, "labels": gateway.labels, "status": statusResponse.status, "active_connections": statusResponse.active_connections});
        }
        res.send(gateways);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})



// Importing the router
module.exports=router