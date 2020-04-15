/**
 * Generic implementation for retrieving content of meta elements accessed by an arbitrary key.
 *
 * @param 
 */
function getMetaContentBy(document, attributeName, attributeValue) {
	const elements = Array.from(document.head.getElementsByTagName('meta'));

	const element = elements.find(element => {
		const attribute = element.attributes.getNamedItem(attributeName);

		if (attribute !== null && attribute.value == attributeValue) {
			return true;
		}

		return false;
	});

	if (element === undefined) {
		console.warn(`Failed to find meta element with "${attribute}" being equal to "${value}"!`);
	}

	return element.content;
}

/**
 * Get a meta tag content by its name.
 */
exports.getMetaContentByName = (document, name) => {
	return getMetaContentBy(document, 'name', name);
};

/**
 * Get a meta tag content by its property attribute.
 */
exports.getMetaContentByProperty = (document, property) => {
	return getMetaContentBy(document, 'property', property);
};

/**
 * Get a link tag reference by its relation.
 */
exports.getLink = (document, rel) => {
	const elements = Array.from(document.head.getElementsByTagName('link'));
	const element = elements.find(element => element.rel === rel);
	return element.href;
};
