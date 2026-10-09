const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

let mocha = new Mocha();
let testDir = './tests';

fs.readdirSync(testDir).filter(function(file){
    return file.substr(-3) === '.js';
}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

let emitter = new (require('events').EventEmitter)();

function run() {
  let tests = [];
  let context = "";
  let separator = " -> ";
  try {
    let runner = mocha.ui('tdd').run()
      .on('test end', function(test) {
        let fullTitle = test.titlePath().join(separator);
        tests.push({
          title: test.title,
          context: fullTitle.slice(0, fullTitle.lastIndexOf(separator)),
          state: test.state
        });
      })
      .on('end', function() {
        emitter.report = tests;
        emitter.emit('done', tests);
      });
  } catch(e) {
    throw(e);
  }
}

emitter.run = run;

module.exports = emitter;
