const express=require("express");
const router=express.Router();

const axios = require('axios');

const PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/query.properties');

const headers = {
      'Authorization': 'SSWS ' + process.env.API_KEY,
      'Content-Type': 'application/json'
  };


// //Get All active campaigns
router.get("/oigGetAllActiveCampaigns", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "status%20eq%20%22ACTIVE%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("OIG_ALL_CAMPAIGN"), config);
        var response = result.data;
        delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Get All reviews for a campaign
router.get("/oigGetAllReviews", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "campaignId%20eq%20%22" + req.query.campaignId + "%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("OIG_ALL_REVIEWS"), config);
        var response = result.data;
        delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Get all devices
router.get("/odaGetAllDevices", async (req,res,next)=>{
    let config = {
        headers: headers
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_DEVICES"), config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Show all users of a shared machine
router.get("/odaGetUsersOfSharedMachine", async (req,res,next)=>{
    let config = {
        headers: headers
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_DEVICES") + "/" + req.query.deviceId + "/users", config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Generate report of all devices without disk encryption
router.get("/odaGetDevicesWoEncr", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            search: "profile.diskEncryptionType%20eq%20%22NONE%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_DEVICES"), config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Provide a report of all macOS machines that are lower than version 14.5.0
router.get("/odaGetMacVersions", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            search: "profile.osVersion%20lt%20%2216.5.0%22%20and%20profile.platform%20eq%20%22MACOS%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_DEVICES"), config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

//Show users with passwordsync in failed status
router.get("/odaGetFailedPwdSync", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "eventType%20eq%20%22device.password_sync.authentication%22%20and%20outcome.result%20eq%20%22FAILURE%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_LOGS"), config);
        var response = result.data;
        //delete response["_links"];
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})


//Show DMFA failures
router.get("/odaGetFailedDMFA", async (req,res,next)=>{
    let config = {
        headers: headers,
        params: {
            filter: "actor.displayName%20eq%20%22Desktop%20MFA%22%20and%20outcome.result%20eq%20%22FAILURE%22"
          }
    };
    try {
        let result = await axios.get(process.env.OKTA_URL + properties.get("ODA_ALL_LOGS"), config);
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