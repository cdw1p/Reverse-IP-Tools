'use strict'

const fetch = require('node-fetch');
const inquirer = require('inquirer');
const fs = require("fs");

const domain = [
    {
        type: 'string',
        name: 'val',
        message: '[>] Masukan Domain: ',
        validate: function(value){
            if(!value) return 'Can\'t Empty';
            return true;
        }
    }]

inquirer.prompt(domain)
.then(domain => {
    getDataRequest(domain)
})

const getDataRequest = (domain) => new Promise((resolve, reject) => {
    var urlAPI = `https://api.indoxploit.or.id/domain/${domain.val}`;

    fetch(urlAPI, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(json => {
        var resSubdomain = json.data.subdomains;
        var filename = 'resultReverseDomain.txt';
        // Simpan result ke output
        fs.writeFile(filename, resSubdomain, err => {
            if (err) throw err;
            console.log('=> Hasil Berhasil Disimpan.');
       })
       // Buka file & regex line baru
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/,/g, '\n');
            fs.writeFile(filename, result, 'utf8', function (err) {
                if (err) 
                    return console.log(err);
                }
            );
        });
    })
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});