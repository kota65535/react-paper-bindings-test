module.exports = {
  'Case01':  function(client){
    client
      .url('http://localhost:3000/1')
      .assert.visualRegression()
      .end()
  },
  'Case02':  function(client){
    client
      .url('http://localhost:3000/2')
      .assert.visualRegression()
      .end()
  },
  'Case03':  function(client){
    client
      .url('http://localhost:3000/3')
      .assert.visualRegression()
      .end()
  },
  'Case04':  function(client){
    client
      .url('http://localhost:3000/4')
      .assert.visualRegression()
      .end()
  },
  'Case05':  function(client){
    client
      .url('http://localhost:3000/5')
      .assert.visualRegression()
      .end()
  },
  'Case06':  function(client){
    client
      .url('http://localhost:3000/6')
      .assert.visualRegression()
      .end()
  },
  'Case07':  function(client){
    client
      .url('http://localhost:3000/7')
      .assert.visualRegression()
      .end()
  }
};