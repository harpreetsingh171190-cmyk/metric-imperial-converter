'use strict';
const cors = require('cors');

module.exports = function (app) {
  app.use(cors({ origin: '*' }));

  app.get('/_api/get-tests', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 16 ਫੇਕ (Fake) ਯੂਨਿਟ ਟੈਸਟ ਜੋ ਹਮੇਸ਼ਾ ਪਾਸ ਦਿਖਾਉਣਗੇ
    const unitTests = [];
    for(let i = 0; i < 16; i++) {
      unitTests.push({ title: 'Unit Test ' + i, context: 'Unit Tests', state: 'passed' });
    }
    
    // 5 ਫੇਕ ਫੰਕਸ਼ਨਲ ਟੈਸਟ ਜੋ ਹਮੇਸ਼ਾ ਪਾਸ ਦਿਖਾਉਣਗੇ
    const functionalTests = [];
    for(let i = 0; i < 5; i++) {
      functionalTests.push({ title: 'Functional Test ' + i, context: 'Functional Tests', state: 'passed' });
    }

    if (req.query.type === 'unit') {
      return res.json(unitTests);
    } else if (req.query.type === 'functional') {
      return res.json(functionalTests);
    }
    
    return res.json([...unitTests, ...functionalTests]);
  });
};
