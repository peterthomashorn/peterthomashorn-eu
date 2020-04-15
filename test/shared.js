var assert = require('assert');
const { getLink, getMetaContentByName, getMetaContentByProperty } = require('./helpers');

exports.fulfillsCommonRequirements = function () {

	it('should not contain revision placeholders', function () {
        assert.strictEqual(this.documentString.indexOf('?revision=0'), -1)
    });

    it('should have a meta description', function () {
        assert.notStrictEqual(getMetaContentByName(this.document, 'description'), '');
    });

    it('should have an open graph title', function () {
        assert.notStrictEqual(getMetaContentByProperty(this.document, 'og:title'), '');
    });

    it('should have an open graph description', function () {
        assert.notStrictEqual(getMetaContentByProperty(this.document, 'og:description'), '');
    });

    it('should have an open graph locale', function () {
        assert.notStrictEqual(getMetaContentByProperty(this.document, 'og:locale'), '');
    });

    it('should have an open graph type', function () {
        assert.notStrictEqual(getMetaContentByProperty(this.document, 'og:type'), '');
    });

    it('should have an open graph image', function () {
        assert.notStrictEqual(getMetaContentByProperty(this.document, 'og:image'), '');
    });

    it('should have only one toplevel heading', function () {
        assert.strictEqual(this.document.getElementsByTagName('h1').length, 1);
    });

    it('should mention the current year in the footer', function () {
        const currentYear = (new Date()).getFullYear();
        const footer = this.document.getElementsByTagName("footer")[0];
        assert.notStrictEqual(footer.textContent.indexOf(currentYear), -1);
    });

	it('should have a navigation bar with three items', function () {
		const elements = this.document.querySelectorAll('.navigation-list .navigation-item');
		assert.strictEqual(elements.length, 3);
	});

	it('should have a navigation bar wrapped in a navigation section element', function () {
		assert.notStrictEqual(null, this.document.querySelector('nav .navigation-list'));
	});

}