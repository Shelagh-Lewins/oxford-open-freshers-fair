exports.CSVToJSON = (csv) => {
	const lines = csv.split('\n');
	const result = [];
	const headers = lines[0].split(',');

	// don't process header row
	for (let i = 1; i < lines.length; i += 1) {
		const line = lines[i];

		if (line) { // ignore empty string, missing line
			const obj = {};
			const lineArray = line.split(',');

			// ignore any line without the right number of entries
			if (lineArray.length === headers.length) {
				headers.map((h, j) => {
					obj[h] = lineArray[j];
				});

				result.push(obj);
			}
		}
	}

	return result;
};
