'use strict';

const cors = require('cors');
const fs = require('fs');

module.exports = function (app) {

  app.route('_api/package.json')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(__dirname + '/../package.json', function(err, data) {
        if(err) return next(err);
        res.type('application/json').send(data);
      });
    });

  app.get('_api/js-test', cors(), function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/../server.js', function(err, data) {
      if(err) return next(err);
      res.type('text').send(data);
    });
  });

  app.get('_api/get-tests', cors(), function(req, res) {
    let error = null;
    try {
      res.json(process.env.TESTS || []);
    } catch(e) {
      res.json({error: e.message});
    }
  });

};
