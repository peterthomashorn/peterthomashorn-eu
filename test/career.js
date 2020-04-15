const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var assert = require('assert');
const { getLink, getMetaContentByName, getMetaContentByProperty } = require('./helpers');
const shared = require('./shared');

describe('Career Page', function () {
    let browser;

    before(function () {
        let data = fs.readFileSync('dist/career.html');
        this.documentString = data;
        this.browser = new JSDOM(this.documentString);
        this.document = this.browser.window.document;
    });

    shared.fulfillsCommonRequirements();

    it('should have a different document title', function () {
        assert.notStrictEqual(this.document.title, '');
        assert.notStrictEqual(this.document.title, 'Peter Thomas Horn');
    });

    it('should have a specific canonical URL', function () {
        assert.strictEqual(getLink(this.document, 'canonical'), 'https://peterthomashorn.info/career');
    });

    it('should have a body tag with "career" class', function () {
        assert.strictEqual(this.document.body.classList.contains('career'), true);
    });
});
