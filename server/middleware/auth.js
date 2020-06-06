const models = require('../models');
const Promise = require('bluebird');


// session
// id,
// hash
// userId

//Query -> Models.create - result
// OkPacket {_-_-_-_-_-__|  /\_/\
//   fieldCount: 0,_-_-_~|_( ^ .^)
//   affectedRows: 1,_-_ ""  ""
//   insertId: 1,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0 }





module.exports.createSession = (req, res, next) => {
  // if no cookie,
  // console.log('createSession check sessions');
  //if (Object.keys(req.cookies).length === 0) {
  if (req.cookies.shortlyid === undefined) {
    //  create new session
    return models.Sessions.create()
      .then(results => {
        // console.log(results.insertId); // 1
        // Retrieve session info using Id
        return models.Sessions.get({id: results.insertId})
          .then(sessionResult => {
            var parsedSession = JSON.parse(JSON.stringify(sessionResult));
            // console.log('ParsedSession ---- ', parsedSession);
            res.cookies.shortlyid = {
              value: parsedSession.hash
            };
            req.session = parsedSession;
            console.log('Create Session ' , parsedSession);

            next();
          });
      });
  } else {
    console.log('Req.cookies > 0 - ', req.cookies);  // Req.cookies > 0 -  { shortlyid: 'adb1914e9fbc440d6a337a7340e836437b12be097433d5a58d54e41ef974504d' }

    // Retrieve session info using existing hash
    console.log('Shortlyid - ', req.cookies.shortlyid);
    return models.Sessions.get({hash: req.cookies.shortlyid})
      .then(sessionResult => {
        if (sessionResult !== undefined) {
          console.log('Return statement session result - ', sessionResult);
          // Parse data
          var parsedSession = JSON.parse(JSON.stringify(sessionResult));
          // Tie session data to the req.session
          req.session = parsedSession;

          next();
        } else {
          // How to handle bad/malicious cookies
          res.cookies.shortlyid = '0';
          next();
        }
      })
  }
  // if cookie with matching session id
  //    req.session = session
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

