
const fs = require('fs');

// we could use require('file.txt') but that would execute code in the file...this is safer.
// https://flaviocopes.com/how-to-save-json-object-to-file-nodejs/
exports.loadJSON = (path) => {
	try {
		return {
			'result': JSON.parse(fs.readFileSync(path, 'utf8')),
		};
	} catch (error) {
		return {
			error,
		};
	}
};

exports.saveJSON = (data, path) => {
	try {
		fs.writeFileSync(path, JSON.stringify(data));
		return {
			'result': true,
		};
	} catch (error) {
		return {
			error,
		};
	}
};

exports.loadText = (path) => {
	try {
		return {
			'result': fs.readFileSync(path, 'utf8'),
		};
	} catch (error) {
		return {
			error,
		};
	}
};

exports.saveText = (text, path) => {
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

exports.sanitizeFilename = (name) => {
	let sanitizedFilename = name.replace(/\//g, '-');
	sanitizedFilename = sanitizedFilename.replace(/\\/g, '-');
	sanitizedFilename = sanitizedFilename.replace(/[*]/g, '');
	sanitizedFilename = sanitizedFilename.replace(/[(]/g, '');
	sanitizedFilename = sanitizedFilename.replace(/[)]/g, '');
	return sanitizedFilename;
};
