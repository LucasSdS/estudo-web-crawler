const express = require("express");
const bodyParser = require('body-parser');

const recipe = require('./models/Recipe');

const app = express();

app.listen(3000);

app.use(bodyParser.urlencoded({ extended: true}));

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

app.get('/image', (req, res) => {

    recipe.getImage();

});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);

});

app.get('/recipe', async (req, res) => {
    try{
        const receita = await recipe.getRecipeTastemade();
        console.log(typeof(receita));
        res.send(receita);
    }
    catch(error) {
        console.log("erro");
    }
});

app.post('/recipe', async (req, res) => {
    let rURL = req.body.recipeURL;
    console.log(`pegou a url ${rURL}`);
    rURL = recipe.checkURL(rURL);

    try{
        if(rURL === 'www.tastemade.com.br'){
            console.log('tastemade');
            const receita = await recipe.getRecipeTastemade();
            console.log(typeof(receita));
            res.send(receita);
        }
        else if(rURL === 'www.tudogostos.com.br'){
            console.log('caiu aqui');
            res.send('Outro site');
        }
        console.log('nenhum');
    }
    catch(error) {
        console.log("erro");
    }

});
