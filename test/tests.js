const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var assert = require('assert');

describe('Frontpage', () => {
    let document;
    let browser;

    before((done) => {
        fs.readFile('dist/index.html', (err, data) => {
            if (err) throw err;
            document = data;
            browser = new JSDOM(document);
            done();
        });
    });

    it('should not contain revision placeholders', () => {
        assert.strictEqual(document.indexOf('?revision=0'), -1)
    });
});