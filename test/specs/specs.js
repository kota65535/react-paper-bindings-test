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
  'Case03_1':  function(client){
    client
      .url('http://localhost:3000/3_1')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .end()
  },
  'Case03_2':  function(client){
    client
      .url('http://localhost:3000/3_2')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  'Case03_3':  function(client){
    client
      .url('http://localhost:3000/3_3')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  'Case03_4':  function(client){
    client
      .url('http://localhost:3000/3_4')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  'Case04_1':  function(client){
    client
      .url('http://localhost:3000/4_1')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .end()
  },
  'Case04_2':  function(client){
    client
      .url('http://localhost:3000/4_2')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  'Case04_3':  function(client){
    client
      .url('http://localhost:3000/4_3')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  'Case04_4':  function(client){
    client
      .url('http://localhost:3000/4_4')
      .assert.visualRegression('body', '0')
      .click('canvas')
      .assert.visualRegression('body', '1')
      .click('canvas')
      .assert.visualRegression('body', '2')
      .click('canvas')
      .end()
  },
  // 'Case03':  function(client){
  //   client
  //     .url('http://localhost:3000/3')
  //     .assert.visualRegression()
  //     .end()
  // },
  // 'Case04':  function(client){
  //   client
  //     .url('http://localhost:3000/4')
  //     .assert.visualRegression()
  //     .end()
  // },
  // 'Case05':  function(client){
  //   client
  //     .url('http://localhost:3000/5')
  //     .assert.visualRegression()
  //     .end()
  // },
  // 'Case06':  function(client){
  //   client
  //     .url('http://localhost:3000/6')
  //     .assert.visualRegression()
  //     .end()
  // },
  // 'Case07':  function(client){
  //   client
  //     .url('http://localhost:3000/7')
  //     .assert.visualRegression()
  //     .end()
  // }
};