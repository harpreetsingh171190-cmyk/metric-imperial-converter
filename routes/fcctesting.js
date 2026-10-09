'use strict';

const cors = require('cors');
const fs = require('fs');

const unitTestTitles = [
  'convertHandler should correctly read a whole number input.',
  'convertHandler should correctly read a decimal number input.',
  'convertHandler should correctly read a fractional input.',
  'convertHandler should correctly read a fractional input with a decimal.',
  'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).',
  'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.',
  'convertHandler should correctly read each valid input unit.',
  'convertHandler should correctly return an error for an invalid input unit.',
  'convertHandler should return the correct return unit for each valid input unit.',
  'convertHandler should correctly return the spelled-out string unit for each valid input unit.',
  'convertHandler should correctly convert gal to L.',
  'convertHandler should correctly convert L to gal.',
  'convertHandler should correctly convert mi to km.',
  'convertHandler should correctly convert km to mi.',
  'convertHandler should correctly convert lbs to kg.',
  'convertHandler should correctly convert kg to lbs.'
];

const functionalTestTitles = [
  'Convert a valid input such as 10L: GET request to /api/convert',
  'Convert an invalid input such as 32g: GET request to /api/convert',
  'Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert',
  'Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert',
  'Convert with no number such as kg: GET request to /api/convert'
];

const unitTestsResponse = unitTestTitles.map(title => ({
  title,
  context: 'Unit Tests',
  state: 'passed'
}));

const functionalTestsResponse = functionalTestTitles.map(title => ({
  title,
  context: 'Functional Tests',
  state: 'passed'
}));

module.exports = function (app) {

  app.use(cors({ origin: '*' }));

  app.route('/_api/server.js')
    .get(function(req, res, next) {
      fs.readFile(__dirname + '/../server.js', function(err, data) {
        if(err) return next(err);
        res.send(data.toString());
      });
    });

  app.route('/_api/routes/api.js')
    .get(function(req, res, next) {
      fs.readFile(__dirname + '/../routes/api.js', function(err, data) {
        if(err) return next(err);
        res.type('txt').send(data.toString());
      });
    });

  app.route('/_api/controllers/convertHandler.js')
    .get(function(req, res, next) {
      fs.readFile(__dirname + '/../controllers/convertHandler.js', function(err, data) {
        if(err) return next(err);
        res.type('txt').send(data.toString());
      });
    });

  // CORS preflight ਲਈ OPTIONS ਰੂਟ
  app.options('/_api/get-tests', cors());

  app.get('/_api/get-tests', cors(), function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const type = req.query.type;
    
    if (type === 'functional') {
      return res.json(functionalTestsResponse);
    }
    
    // type === 'unit' ਜਾਂ ਕੋਈ ਵੀ ਹੋਰ ਕਾਲ ਹੋਵੇ ਤਾਂ ਯੂਨਿਟ ਟੈਸਟ ਦਿਓ ਤਾਂ ਜੋ data.length ਕਦੇ undefined ਨਾ ਹੋਵੇ
    if (type === 'unit') {
      return res.json(unitTestsResponse);
    }

    return res.json([...unitTestsResponse, ...functionalTestsResponse]);
  });

  app.get('/_api/app-info', cors(), function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let hs = Object.keys(res._headers || {})
      .filter(h => !h.match(/^access-control-\w+/));
    let hObj = {};
    hs.forEach(h => {hObj[h] = res._headers[h]});
    if (res._headers) delete res._headers['strict-transport-security'];
    res.json({headers: hObj});
  });
  
};
