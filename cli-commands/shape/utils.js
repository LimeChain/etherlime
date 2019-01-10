const request = require('request');

async function verifyUrl(url) {
    return new Promise((resolve, reject) => {
        let options = {
            method: "HEAD",
            uri: url
        }
    
        request(options, (err, res) => {
            if(err) {
                return reject(new Error('Not found'))
            }

            resolve(res)
        })
    })
}

module.exports = {
    verifyUrl
}