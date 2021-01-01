// build the JSON data files for the website
// run this every time any data changes, and copy the output into the /data folder:
// categories.json
// society_data.json

// general society data is loaded from society_data.csv
// description, FAQs are loaded from individual text files
// list of categories is loaded from categories.csv

// // to run in command line: // //
// node buildJSONData.js //
// this is not a fully formed package that can be installed, it is just a hack to use csvtojson locally //

/*
# Data update process #

## Add a new society ##
1. Add the new society to the society_data.xls spreadsheet and assign it a unique ID

2. Copy the logo file into img/logos/, getting the ID from the spreadsheet.

3. Make sure the description, faq files exist with the correct name.

Open a command line prompt:

cd /var/www/html/oxfordopenfreshers/process-data

node ensureFilesExist.js

4. Paste the description, faq for the new society into the relevant files in /process-data/description/ and /process-data/faq/

## Update a society listing ##
1. If it is a change to description or faq, update the text in /process-data/description/ or /process-data/faq/.

2. If it is a change to another field, update the society's entry in society_data.xls.

3. Rebuild the data.

## Rebuild the data ##
1. If there are changes to society_data.xls, open it and save the society_data worksheet as society_data.csv.

** choose "file > save a copy" not "save" when outputting csv **

Copy it into:

/var/www/html/oxfordopenfreshers/process-data

2. If there is a new category, save the categories worksheet as categories.csv and copy it into:

/var/www/html/oxfordopenfreshers/process-data

** choose "file > save a copy" not "save" when outputting csv **

3. Generate new JSON data

Open a command line prompt:

cd /var/www/html/oxfordopenfreshers/process-data

node buildJSONData.js

This takes in the csv data, description files and faq files.

4. Copy the output files into /data:

society_data.json
categories.json

5. Upload the new json files to the website.

*/

// use a proper module instead of my own function to ensure that for example commas in text strings are handled
const CSVToJSON = require('csvtojson');

const {
	loadText,
	sanitizeFilename,
	saveJSON,
} = require('./fileUtilities.js');

// //////////////////////////////
// load and process society data
function loadCatetoryData() {
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

		console.log('build data process complete');
	} else {
		console.log('error loading categories data:', categoriesError);
	}
}

const { 'result': societyResult, 'error': societyError } = loadText('society_data.csv');

const replaceNewlineWithBreak = text => text.replace(/(?:\r\n|\r|\n)/g, '<br />');

if (societyResult) {
	// console.log('societyResult', societyResult);
	CSVToJSON()
		.fromString(societyResult)
		.then((societyData) => {
			const JSONData = [];
			//  console.log('societyData', societyData);
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
					'Society logo file extension': logoFileExtension,
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
					logoFileExtension,
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

			loadCatetoryData();
		});
} else {
	console.log('error loading society data:', societyError);
}
