'use strict'

const fetch = require('node-fetch');
const inquirer = require('inquirer');
const fs = require("fs");

const ip = [
    {
        type: 'string',
        name: 'val',
        message: '[>] Masukan IP: ',
        validate: function(value){
            if(!value) return 'Can\'t Empty';
            return true;
        }
    }]

inquirer.prompt(ip)
.then(ip => {
    getDataRequest(ip)
})

const getDataRequest = (ip) => new Promise((resolve, reject) => {
    var urlAPI = `https://api.indoxploit.or.id/ip/${ip.val}`;

    fetch(urlAPI, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(json => {
        var resHostname = json.data.resolutions;
        var data  = resHostname.map(v => v.hostname)
        var filename = 'resultIPDomain.txt';
        // Simpan result ke output
        fs.writeFile(filename, data, err => {
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