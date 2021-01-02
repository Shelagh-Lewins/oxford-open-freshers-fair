// ensure that each society has a file for description and faq
// if it does not exist, create a blank file
// this should be run whenever a new society is created
// faq and description can then be copied into the files

const CSVToJSON = require('csvtojson');

const {
	loadText,
	sanitizeFilename,
	saveText,
} = require('./fileUtilities.js');

const { result, error } = loadText('society_data.csv');

if (result) {
	// result is society data
	CSVToJSON()
		.fromString(result)
		.then((societyData) => {
			societyData.forEach((society) => {
				const {
					'Society name': name,
				} = society;

				// try to load each society's FAQ file. If it does not exist, create an empty file.
				const faqFilePath = `faq/faq ${sanitizeFilename(name)}.txt`;

				const {
					'error': faqError,
				} = loadText(faqFilePath);

				if (faqError) {
					if (faqError.code === 'ENOENT') {
						console.log('No faq file found for society:', name);
						console.log('creating empty file...');
						saveText('', faqFilePath);
					} else {
						console.log('Error loading faq for society:', faqError.code, name);
					}
				}

				// try to load each society's description file. If it does not exist, create an empty file.
				const descriptionFilePath = `description/description ${sanitizeFilename(name)}.txt`;

				const {
					'error': descriptionError,
				} = loadText(descriptionFilePath);

				if (faqError) {
					if (descriptionError.code === 'ENOENT') {
						console.log('No description file found for society:', name);
						console.log('creating empty file...');
						saveText('', descriptionFilePath);
					} else {
						console.log('Error loading faq for society:', faqError.code, name);
					}
				}
			});
		});
} else {
	console.log('error loading society data:', error);
}
