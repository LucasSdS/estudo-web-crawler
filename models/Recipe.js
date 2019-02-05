const rp = require('request-promise');
const $ = require('cheerio');
const request = require('request');
const fs = require('fs');
const slugify = require('slugify');
const url = require('url');

const options = {
    method: 'GET',
    uri: 'https://www.tastemade.com.br/videos/torta-mousse-com-massa-de-coco',
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
              'Accept-Encoding': 'none',
              'Accept-Language': 'en-US,en;q=0.8',
              'Connection': 'keep-alive'}
}
//'https://www.tastemade.com.br/videos/pave-de-chocolate-e-coco'
//https://www.tastemade.com.br/videos/torta-mousse-com-massa-de-coco
//https://www.tastemade.com.br/videos/picole-trufado-de-doce-de-leite

// FUNÇÕES DE TESTE - APENAS ESTUDO
function getIngredients() {
    return new Promise((resolve, reject) => {
        rp(options)
        .then(html => {
            const arrayObj = $('.p-ingredient', html).toArray();
            const ingredientes = arrayObj.map(el => el.children[0].data);
            resolve(ingredientes);
        })
        .catch(error => reject('error'));
    });
}

function getRecipeSteps() {
    return new Promise((resolve, reject) => {
        rp(options)
        .then(html => {
            const arrayObj = $('ol.recipe-steps-list > li > p', html).toArray();
            const passos = arrayObj.map(el => el.children[0].data);
            resolve(passos);
        })
        .catch(error => reject('error'));
    })
}

function getImage() {
    return new Promise((resolve, reject) => {
        rp(options)
        .then(html => {
            const imageUrl = $('.Video__Thumbnail-sc-14lx47x-1', html).attr('src');
            request(`http:${imageUrl}`).pipe(fs.createWriteStream('')).on('close', () => console.log('bora'));
            // console.log(imageObj);
        })
        .catch(error => reject(error));
    });
    //Video__Thumbnail-sc-14lx47x-1
}

// FUNÇÕES REAIS 
function checkURL(recipeURL) {
    const site = url.parse(recipeURL, true);
    options.uri = recipeURL;
    return site.hostname;
}

function getRecipeTastemade() {

    return new Promise((resolve, reject) => {
        rp(options)
        .then(html => {
            //Pega o Título da Receita
            const title = $('h1 > a', html).attr('title');
            console.log(title);

            //Pega os Ingredientes da Receita (array)
            const ingredientsObj = $('.p-ingredient', html).toArray();
            const ingredients = ingredientsObj.map(el => el.children[0].data);

            //Pega os Passos da Receita (array);
            const stepsObj = $('ol.recipe-steps-list > li > p', html).toArray();
            const steps = stepsObj.map(el => el.children[0].data);

            //Pega o URL da Imagem e salva a Imagem em public/images
            const imageUrl = $('.Video__Thumbnail-sc-14lx47x-1', html).attr('src');
            const image = `${slugify(title, {lower: true})}.png`;
            request(`http:${imageUrl}`)
            .pipe(fs.createWriteStream(`./public/images/${image}`))
            .on('close', () => console.log('bora'));

            resolve({
                title,
                ingredients,
                image,
                steps
            });
        })
        .catch(error => reject(error));
    });
}

function getRecipeTudoGostoso() {

    return new Promise((resolve, reject) => {
        rp(options)
        .then(html => {

            resolve(valor);
        })
        .catch(error => reject(error));
    })
}

module.exports = {
    getIngredients,
    getRecipeSteps,
    getImage,
    getRecipeTastemade,
    checkURL
}

//'https://www.tudogostoso.com.br/receita/458-pao-de-banana.html'

// TASTEMADE

// TUDOGOSTOSO

//
