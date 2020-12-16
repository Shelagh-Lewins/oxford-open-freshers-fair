// this is a one-time process to extract the existing faq, description from the JSON
// and save them in separate files for easier maintenance
// converting html break tags back into newline character as this is the form societies will supply

const fs = require('fs');

const {
	loadJSON,
	sanitizeFilename,
} = require('./fileUtilities.js');

// to save plain text in a file
const saveText = (text, path) => {
	try {
		fs.writeFileSync(path, text);
		return {
			'result': true,
		};
	} catch (error) {
		return {
			error,
		};
	}
};

const { result, error } = loadJSON('society_data.json');

console.log('societyData', result.length);

const replaceBreaks = (text) => {
	let newString = text;

	while (newString.indexOf('<br />') !== -1) {
		newString = newString.replace('<br />', '\n');
	}

	return newString;
};

if (result) {
// extract description, faq and save each as new file
	result.forEach((society) => {
		const {
			'Society description': description,
			'Society name': name,
			'FAQs': faq,
		} = society;

		const filenameEnd = sanitizeFilename(name);
		const descriptionFilePath = `description/description ${filenameEnd}.txt`;
		const faqFilePath = `faq/faq ${filenameEnd}.txt`;

		saveText(replaceBreaks(description), descriptionFilePath);
		saveText(replaceBreaks(faq), faqFilePath);
	});
} else {
	console.log('error loading society data:', error);
}
