module.exports = {
  'Case01: show a react logo': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/1/paper',
        'http://localhost:3000/1/react',
        0.01)
      .end()
  },
  'Case02: set initial position & rotation': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/2/paper',
        'http://localhost:3000/2/react',
        0.01)
      .end()
  },
  'Case03: set initial pivot, position & rotation': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/3/paper',
        'http://localhost:3000/3/react',
        0.01)
      .end()
  },
  'Case04: update position & rotation': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/4/paper',
        'http://localhost:3000/4/react',
        0.01)
      .end()
  },
  'Case05: update pivot & rotation': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/5/paper',
        'http://localhost:3000/5/react',
        0.01)
      .end()
  }
};
