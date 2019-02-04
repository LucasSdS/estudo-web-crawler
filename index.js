const express = require("express");
const rp = require('request-promise');
const $ = require('cheerio');

const recipe = require('./models/Recipe');

const app = express();

app.listen(3000);

app.get('/in', async (req, res) => {

    try {
        const ingredientes = await recipe.getIngredients();
        res.send(ingredientes);
    }catch (error) {
        console.log('error');
    }

});

app.get('/steps', async (req, res) => {

    try{
        const passos = await recipe.getRecipeSteps();
        res.send(passos);
    }catch(error) {
        console.log('error');
    }
});
