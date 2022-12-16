
//globalThis.fetch = fetch
'use strict'
//import fetch from "node-fetch";

const http = require("http");
const path = require("path");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const bodyParser = require("body-parser");
const { render } = require("ejs");
const statusCode = 200;
const portNumber = 5000;
//const nf = require("node-fetch")

require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') }) 

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};


app.set("views", path.resolve(__dirname, "template"));
app.set("view engine", "ejs");
process.stdin.setEncoding("utf8");


app.get("/", (request, response) => {

    response.render("mango");

});

app.get("/account", (request, response) => {

    response.render("account");

});

app.get("/olive", (request, response) => {
    /*const fetch = require('node-fetch')
    async function getapi() {
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"; 
        const response = await fetch(url);
        var data = await response.json();
        console.log(data);
    }*/
    //let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"; 
    /*fetch(url)
    .then(response => response.json())
        .then(json => printPrice(json))*/
    

    /*function printPrice(json) {
       let price = json.find(entry => entry.id === "bitcoin").current_price;
        console.log(price);
        document.querySelector("#currPrice").value = price;
    }*/
   
    
   /* const variables ={
        bitcoin:price
    }*/
    response.render("olive");

});

app.get("/cream", (request, response) => {

    response.render("cream");

});

app.use(bodyParser.urlencoded({extended:false}));
app.post("/accountResult", (request, response) => {

    const variables = { 
       
        email : request.body.email
       
       
    };

    console.log(request.body.email)
    const { MongoClient, ServerApiVersion } = require('mongodb');
    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.laouepe.mongodb.net/?retryWrites=true&w=majority`
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            let emailVal = request.body.email;
            await lookUpOneEntry(client, databaseAndCollection, emailVal);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }

    }

    async function lookUpOneEntry(client, databaseAndCollection, emailName) {
        let filter = {email: emailName};
        const result = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .findOne(filter);
    
      
        
        
        let resultEmail = ""
        let resultName = ""
        let resultColor = ""
        if (result) {
           
            resultEmail = result.email;
            resultName = result.name;
            resultColor = result.color;
            
        } else {
          
            resultEmail = "None"
            resultName = "None"
            resultColor = "None"
        }
        
        const variables = {
              
                email : resultEmail,
                name : resultName,
                color : resultColor
            }
            response.render("accountResult", variables);
    }

    main().catch(console.error);
    

});

app.post("/creamConfirm", (request, response) => {

    const variables = { 
        name: request.body.name,
        email : request.body.email,
        address :request.body.address,
        city: request.body.city,
        state: request.body.state
       
       
    };

    response.render("creamConfirm", variables);
    const { MongoClient, ServerApiVersion } = require('mongodb');
    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.laouepe.mongodb.net/?retryWrites=true&w=majority`
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
        try {
            let apply = {name: request.body.name, color: "Cream", email: request.body.email,  address :request.body.address, city: request.body.city, state: request.body.state, nameCard: request.body.cardname, 
                cardNumber: request.body.cardnumber, expMonth: request.body.expmonth, expYear: request.body.expyear, cvv: request.body.cvv  };

            await insertApply(client, databaseAndCollection, apply);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    async function insertApply(client, databaseAndCollection, newApply) {
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newApply);
    
        //console.log(`Apply entry created with id ${result.insertedId}`);
    }
    main().catch(console.error);
});

app.post("/oliveConfirm", (request, response) => {

    const variables = { 
        name: request.body.name,
        email : request.body.email,
        address :request.body.address,
        city: request.body.city,
        state: request.body.state
       
       
    };

    //console.log(name)
    response.render("oliveConfirm", variables);
    const { MongoClient, ServerApiVersion } = require('mongodb');
    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.laouepe.mongodb.net/?retryWrites=true&w=majority`
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
        try {
            let apply = {name: request.body.name, color: "Olive", email: request.body.email,  address :request.body.address, city: request.body.city, state: request.body.state, nameCard: request.body.cardname, 
                cardNumber: request.body.cardnumber, expMonth: request.body.expmonth, expYear: request.body.expyear, cvv: request.body.cvv  };

            await insertApply(client, databaseAndCollection, apply);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    async function insertApply(client, databaseAndCollection, newApply) {
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newApply);
    
        //console.log(`Apply entry created with id ${result.insertedId}`);
    }
    main().catch(console.error);
});



app.use( express.static( "public" ) );

app.listen(portNumber);