const rp = require('request-promise');
const $ = require('cheerio');

const options = {
    method: 'GET',
    uri: 'https://www.tastemade.com.br/videos/pave-de-chocolate-e-coco',
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
              'Accept-Encoding': 'none',
              'Accept-Language': 'en-US,en;q=0.8',
              'Connection': 'keep-alive'}
}


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
    //Video__Thumbnail-sc-14lx47x-1
}

module.exports = {
    getIngredients,
    getRecipeSteps
}

//'https://www.tudogostoso.com.br/receita/458-pao-de-banana.html'
