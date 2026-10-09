'use strict';

const Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

const mocha = new Mocha();
const testDir = './tests';

// Add each file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

function run() {
    // Run the tests.
    try {
      let runner = mocha.run(function(){
        console.log('done running tests');
      });
      
      runner.on('pass', function(test){
        console.log('pass: %s', test.fullTitle());
      }).on('fail', function(test, err){
        console.log('fail: %s', test.fullTitle(), err);
      });

    } catch (e) {
      console.log('Tests failed to run:');
      console.log(e);
    }
}

module.exports = {
  run: run
};
