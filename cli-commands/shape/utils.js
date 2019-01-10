const request = require('request');

async function verifyUrl(url) {
    return new Promise((resolve, reject) => {
        let options = {
            method: "HEAD",
            uri: url
        }
    
        request(options, (err, res) => {

            if(err) {
                return reject(new Error(`Failed to make request to ${options.uri}. Got error: ${err.message} .`));
            }

            if(res.statusCode !== 200) {
                return reject(new Error(`There is a problem fetching repository from url: ${options.uri}. Request error code: ${res.statusCode}`))
            }

            resolve(res)
        })
    })
}

module.exports = {
    verifyUrl
}