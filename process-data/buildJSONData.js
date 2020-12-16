// build the JSON data files for the website
// run this every time any data changes, and copy the output into the /data folder:
// categories.json
// society_data.json

// most society data is loaded from society_data.csv
// description, FAQs are loaded from individual text files
// list of categories is loaded from categories.csv

const {
	loadText,
	sanitizeFilename,
	saveJSON,
} = require('./fileUtilities.js');
const { CSVToJSON } = require('./CSVToJSON.js');

// //////////////////////////////
// load and process society data
const { 'result': societyResult, 'error': societyError } = loadText('society_data.csv');

const replaceNewlineWithBreak = text => text.replace(/(?:\r\n|\r|\n)/g, '<br />');

if (societyResult) {
	const societyData = CSVToJSON(societyResult);
	const JSONData = [];

	societyData.forEach((society) => {
		// if a new field is added or a field name changed
		// update here
		const {
			'Additional society page address': additionalPageURL,
			'Category': category,
			ID,
			'Intro video YouTube link': introVideoURL,
			'Society email signup address': emailSignupAddress,
			'Society Facebook page address': facebookURL,
			'Society Instagram profile address': instagramURL,
			'Society logo image': logoFilename,
			'Society name': name,
			'Teams call address': teamsCallURL,
			'Society YouTube channel address': youtubeChannelURL,
			'Society website address': websiteURL,
		} = society;

		const societyObj = {
			additionalPageURL,
			category,
			introVideoURL,
			emailSignupAddress,
			facebookURL,
			ID,
			instagramURL,
			logoFilename,
			name,
			teamsCallURL,
			youtubeChannelURL,
			websiteURL,
		};

		// description, FAQs are loaded from individual files
		const filenameEnd = sanitizeFilename(name);
		const descriptionFilePath = `description/description ${filenameEnd}.txt`;
		const faqFilePath = `faq/faq ${filenameEnd}.txt`;

		const { 'result': descriptionResult, 'error': descriptionError } = loadText(descriptionFilePath);

		if (descriptionResult) {
			societyObj.description = replaceNewlineWithBreak(descriptionResult);

			const { 'result': faqResult, 'error': faqError } = loadText(faqFilePath);

			if (faqResult) {
				societyObj.FAQs = replaceNewlineWithBreak(faqResult);
				JSONData.push(societyObj);
			} else {
				console.log(`ERROR society not loaded: ${name}`);
				console.log(`Unable to load FAQs from file ${faqFilePath} due to error ${faqError}`);
			}
		} else {
			console.log(`ERROR society not loaded: ${name}`);
			console.log(`Unable to load description from file ${descriptionFilePath} due to error ${descriptionError}`);
		}
	});

	console.log('saving society_data.json');
	saveJSON(JSONData, 'society_data.json');
} else {
	console.log('error loading society data:', societyError);
}

// //////////////////////////////
// load and process society data
const { 'result': categoriesResult, 'error': categoriesError } = loadText('categories.csv');

if (categoriesResult) {
	const categoriesData = categoriesResult.split('\n');
	const categoriesArray = [];

	categoriesData.forEach((category) => {
		if (category) {
			categoriesArray.push(category);
		}
	});

	console.log('saving categories.json');
	saveJSON(categoriesArray, 'categories.json');
} else {
	console.log('error loading categories data:', categoriesError);
}
