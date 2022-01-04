redirects = [
    { from: '/test', to: '/test-new' },
    { from: '/test2', to: '/test2-new' }
]

module.exports = function (req, res, next) {
  var url = req.url.split('?')[0];
  var urlParams = null;
  if (req.url.includes("?")) {
    urlParams = '?' + req.url.split('?')[1]
  }

  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    var newLocation;
    if (urlParams) {
      newLocation = redirect.to + urlParams;
    } else {
      newLocation = redirect.to;
    }
    res.writeHead(301, {
      Location: newLocation
    });
    res.end()
  } else {
    next()
  }
}
