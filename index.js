const express = require("express");
const bodyParser = require('body-parser');

const Recipe = require('./models/Recipe');

const app = express();

app.listen(3000);

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/in', async (req, res) => {

    try {
        const ingredientes = await Recipe.getIngredients();
        res.send(ingredientes);
    }catch (error) {
        console.log('error');
    }

});

app.get('/steps', async (req, res) => {

    try{
        const passos = await Recipe.getRecipeSteps();
        res.send(passos);
    }catch(error) {
        console.log('error');
    }
});

app.get('/image', (req, res) => {

    Recipe.getImage();

});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);

});

app.get('/recipe', async (req, res) => {
    try{
        const receita = await Recipe.getRecipeTastemade();
        console.log(typeof(receita));
        res.send(receita);
    }
    catch(error) {
        console.log("erro");
    }
});

app.post('/recipe', async (req, res) => {
    let recipeURL = req.body.recipeURL;
    console.log(`pegou a url ${recipeURL}`);
    recipeURL = Recipe.checkURL(recipeURL);

    try{
        if(recipeURL === 'www.tastemade.com.br'){
            const receita = await Recipe.getRecipeTastemade();
            res.send(receita);
        }
        else if(recipeURL === 'www.tudogostoso.com.br'){
            const receita = await Recipe.getRecipeTudoGostoso();
            res.send(receita);
        }
        else{
            res.send('404 - NOT FOUND');
        }
    }
    catch(error) {
        console.log(error);
    }

});
