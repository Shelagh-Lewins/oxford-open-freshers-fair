// unshuffledCategories and unshuffledData are loaded from data.js

/* eslint-env jquery */

let lightbox;
let popup;
let societyData;
let unshuffledSocietyData;
let unshuffledCategories;

function hideLightbox() {
	lightbox.classList.remove('showLightbox');
}

function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;
	const shuffleMe = [...array];

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = shuffleMe[currentIndex];
		shuffleMe[currentIndex] = shuffleMe[randomIndex];
		shuffleMe[randomIndex] = temporaryValue;
	}

	return shuffleMe;
}

function showPopup(id) {
	const {
		additionalPageURL,
		FAQs,
		introVideoURL,
		description,
		// emailSignupAddress, // temporarily disabled as only active at start of year
		facebookURL,
		instagramURL,
		logoFilename,
		name,
		youtubeChannelURL,
		websiteURL,
		// teamsCallURL, // temporarily disabled as only active in live sessions
	} = societyData[id];

	// Split society description into first sentence (to be put in bold) and rest.
	const socDescLead = description.substring(0, description.indexOf('.') + 1);
	const socDescRest = description.replace(socDescLead, '');

	// popup header and exit button
	let popupText = `<div class="exit">X</div><h2 class="subtitle">${name}</h2>`;

	const popupIntro = `<p class="text"><b>${socDescLead}</b>${socDescRest}</p><p class="text"><b>Frequently Asked Questions</b><br />${FAQs}</p>`;

	popupText += '<div class="popupMain">'; // open wrapper div for scroll

	// show video intro if available
	// otherwise society logo
	if (introVideoURL !== '') {
		popupText += `<iframe class="YTVid" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  type="text/html" src=${introVideoURL}></iframe>${popupIntro}`;
	} else {
		popupText += `<img class="popupGraphic" src="${logoFilename}">${popupIntro}`;
	}

	// temporarily disabled as only active in live sessions
	/* let teamsLink = '';

	if (teamsCallURL !== '') {
		teamsLink = `<a href="${teamsCallURL}" target="_blank" rel="noopener"><center><h2>Join Teams Call</h2></center></a>`;
	} */

	let social = '';

	if (facebookURL || instagramURL || youtubeChannelURL) {
		social += '<div class="social">';

		if (facebookURL) {
			social += `<div class="link-wrapper"><a href=${facebookURL} target="_blank" rel="noopener"><img class="socImg" src="img/social/facebook.png" alt="Facebook link" title="Facebook"></a></div>`;
		}

		if (instagramURL) {
			social += `<div class="link-wrapper"><a href=${instagramURL} target="_blank" rel="noopener"><img class="socImg" src="img/social/instagram.png" alt="Instagram link" title="Instagram"></a></div>`;
		}

		if (youtubeChannelURL) {
			social += `<div class="link-wrapper"><a href=${youtubeChannelURL} target="_blank" rel="noopener"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link" title="YouTube channel"></a></div>`;
		}

		social += '</div>';
	}

	let websiteLink = '';

	if (websiteURL !== '') {
		websiteLink = `<div class="website-address"><a href=${websiteURL} target="_blank" rel="noopener"><p class="text">Society website</p></a></div>`;
	}

	let extraLinks = '';

	if (additionalPageURL) {
		// if (additionalPageLink || emailSignupLink) { // temporarily disabled as sign up sheets only active at start of year
		extraLinks += '<div class="extra-links">';

		if (additionalPageURL) {
			extraLinks += `<p class="text">Additional related page: <a href=${additionalPageURL} target="_blank" rel="noopener">${additionalPageURL}</a></p>`;
		}

		// temporarily disabled as sign up sheets only active at start of year
		/* if (emailSignupAddress) {
			extraLinks += `<p class="text"><a href=${emailSignupAddress} target="_blank" rel="noopener">Email list sign-up form link</a></p>`;
		} */

		extraLinks += '</div>';
	}

	// temporarily disabled as only active in live sessions //
	// popup.innerHTML = popupText + teamsLink + social + websiteLink + extraLinks;
	popup.innerHTML = popupText + social + websiteLink + extraLinks;
	popupText += '</div>'; // close the wrapper div

	$('.exit').on('click', () => {
		hideLightbox();
	});

	lightbox.classList.add('showLightbox');
}

function setupPage() {
	lightbox = document.getElementById('lightbox');
	popup = document.getElementById('popup');
	const cover = document.getElementById('cover');
	const categoriesList = document.getElementById('categoriesList');
	const categoriesWrapper = document.getElementById('categoriesWrapper');

	$(cover).on('click', () => {
		hideLightbox();
	});

	const tiles = [];
	societyData = shuffle(unshuffledSocietyData);
	const categories = shuffle(unshuffledCategories);

	categoriesWrapper.innerHTML = '';
	for (let i = 0; i < categories.length; i += 1) {
		categoriesWrapper.innerHTML += `
			<h2 class="subtitle" id="${categories[i]}Title">${categories[i]}</h2>
			<div class="gridwrapper">
				<div class="grid" id="${categories[i]}Grid"></div>
			</div>`;
	}

	categoriesList.innerHTML = '';
	for (let i = 0; i < categories.length; i += 1) {
		categoriesList.innerHTML += `<li><a href="#${categories[i]}Title" class="link">${categories[i]}</a></li>`;
	}

	for (let i = 0; i < societyData.length; i += 1) {
		const {
			ID,
			logoFilename,
			name,
		} = societyData[i];
		const tileIndex = ID - 1;

		const tile = `<div class="tile" data-index=${i}><span class='tile-logo' title="${name}" role='img' aria-label="${name}" id='tile${tileIndex}' style='background-size: 100% 100%; background-image: url("${logoFilename}")'>
		<div class='tile-inner'></div>
		</span>
		<div class="tile-name">${name}</div></div>`;

		document.getElementById(`${societyData[i].category}Grid`).innerHTML += tile;
		tiles.push(document.getElementById(`tile${tileIndex}`));
	}

	$('.tile').on('click', (event) => {
		showPopup(event.target.dataset.index);
	});
}

// //////////////////////////////////
// wait until the page is loaded
$('document').ready(() => {
	// load society data from JSON file
	let pathroot = '';

	if (window.location.hostname === 'localhost') {
		pathroot = '/oxfordopenfreshers';
	}

	pathroot += '/data/';
	$.getJSON(`${pathroot}society_data.json`, (data) => {
		unshuffledSocietyData = data;

		// load category data from JSON file
		$.getJSON(`${pathroot}categories.json`, (data1) => {
			unshuffledCategories = data1;

			setupPage();
		}).fail(() => {
			console.log('Error parsing category_data.json.');
		});
	}).fail(() => {
		console.log('Error parsing society_data.json.');
	});
});
