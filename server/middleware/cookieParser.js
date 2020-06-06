const parseCookies = (req, res, next) => {
  // cookie is first saved in  req.headers.cookie
  // Variable to hold current cookies
  req.cookies = {};
  var rawCookies = req.headers.cookie;
  // .split(';'); - to make one line of object init... (Create an array)
  if (rawCookies !== undefined) {
    var cookieArray = rawCookies.split(';');
    // For loop the array
    for (let i = 0; i < cookieArray.length; i++) {
      // Parse where we create an obj with id and hash value
      var cookie = cookieArray[i].split('=');
      // Save parsed cookies to req.cookies
      req.cookies[cookie[0].trim()] = cookie[1];
    }
  }
  next();
};

module.exports = parseCookies;