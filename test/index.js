const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var assert = require('assert');
const { getLink, getMetaContentByName, getMetaContentByProperty } = require('./helpers');
const shared = require('./shared');

describe('Index Page', function () {
    before(function () {
        let data = fs.readFileSync('dist/index.html');
        this.documentString = data;
        this.browser = new JSDOM(this.documentString);
        this.document = this.browser.window.document;
    });

    shared.fulfillsCommonRequirements();

    it('should have a specific document title', function () {
        assert.strictEqual(this.document.title, 'Peter Thomas Horn');
    });

    it('should have a specific canonical URL', function () {
        assert.strictEqual(getLink(this.document, 'canonical'), 'https://peterthomashorn.info/');
    });

    it('should have a body tag with "index" class', function () {
        assert.strictEqual(this.document.body.classList.contains('index'), true);
    });
});
