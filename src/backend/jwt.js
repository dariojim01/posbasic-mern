const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { privateKEY, publicKEY } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

var i 	= 'DJ';    	
var s 	= 'admin@dj.com';	
var a 	= 'https://dj.com';	

module.exports = {
    sign : (payload)=>{
         // Token signing options
         var signOptions = {
            issuer: 	i,
            subject: 	s,
            audience: 	a,
            expiresIn: '20d',    // 20 days validity
            algorithm: 'RS256'
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify : (req, res, next)=>{ 
        //next();

        var token = req.headers['x-access-token'];
        if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

        var verifyOptions = {
            issuer: 	i,
            subject: 	s,
            audience: 	a,
            expiresIn: 	'12h',
            algorithm: 	['RS256']
        };      

        jwt.verify(token, publicKEY, verifyOptions, function(err, decoded) {
            console.log(JSON.stringify(decoded));
            if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            req.userLevel = decoded.level;
            next();
        });

    }
}