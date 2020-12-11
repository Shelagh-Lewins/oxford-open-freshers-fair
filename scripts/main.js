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
		'Additional society page address': additionalPageAddress,
		FAQs,
		'Intro video YouTube link': introVideoAddress,
		'Society description': description,
		// 'Society email signup address': emailSignupAddress, // temporarily disabled as only active at start of year
		'Society Facebook page address': facebookAddress,
		'Society Instagram profile address': instagramAddress,
		'Society logo image': logoImage,
		'Society name': name,
		'Society YouTube channel address': youtubeChannelAddress,
		'Society website address': websiteAddress,
		// 'Teams call address': teamsCallAddress, // temporarily disabled as only active in live sessions

	} = societyData[id];
	// Split society description into first sentence (to be put in bold) and rest.
	const socDescLead = description.substring(0, description.indexOf('.') + 1);
	const socDescRest = description.replace(socDescLead, '');

	const popupText1 = `<div class="exit">X</div>
				<h2 class="subtitle">${name}</h2>`;
	const popupText2 = `<p class="text"><b>${socDescLead}</b>${socDescRest}</p>
				<p class="text"><b>Frequently Asked Questions</b><br />${FAQs}</p>`;

	// show video intro if available
	// otherwise society logo
	let popupText;
	if (introVideoAddress !== '') {
		popupText = `${popupText1}<iframe class="YTVid" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  type="text/html" src=${introVideoAddress}></iframe>${popupText2}`;
	} else {
		popupText = `${popupText1}<img class="popupGraphic" src="${logoImage}">${popupText2}`;
	}

	// temporarily disabled as only active in live sessions
	/* let teamsLink = '';

	if (teamsCallAddress !== '') {
		teamsLink = `<a href="${teamsCallAddress}" target="_blank" rel="noopener"><center><h2>Join Teams Call</h2></center></a>`;
	} */

	let social = '';

	if (facebookAddress || instagramAddress || youtubeChannelAddress) {
		social += '<div class="social">';

		if (facebookAddress) {
			social += `<div class="link-wrapper"><a href=${facebookAddress} target="_blank" rel="noopener"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>`;
		}

		if (instagramAddress) {
			social += `<div class="link-wrapper"><a href=${instagramAddress} target="_blank" rel="noopener"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>`;
		}

		if (youtubeChannelAddress) {
			social += `<div class="link-wrapper"><a href=${youtubeChannelAddress} target="_blank" rel="noopener"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>`;
		}

		social += '</div>';
	}

	let websiteLink = '';

	if (websiteAddress !== '') {
		websiteLink = `<div class="website-address"><a href=${websiteAddress} target="_blank" rel="noopener"><p class="text">Society website link</p></a></div>`;
	}

	let extraLinks = '';

	if (additionalPageAddress) {
		// if (additionalPageLink || emailSignupLink) { // temporarily disabled as sign up sheets only active at start of year
		extraLinks += '<div class="extra-links">';

		if (additionalPageAddress) {
			extraLinks += `<p class="text">Additional related page: <a href=${additionalPageAddress} target="_blank" rel="noopener">${additionalPageAddress}</a></p>`;
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
			'Society logo image': societyLogoImage,
			'Society name': societyName,

		} = societyData[i];
		const tileIndex = ID - 1;

		const tile = `<div class="tile"><span class='tile-logo' title="${societyName}" role='img' aria-label="${societyName}" id='tile${tileIndex}' style='background-size: 100% 100%; background-image: url("${societyLogoImage}'>
		<div class='tile-inner' data-index=${i}></div>
		</span>
		<div class="tile-name">${societyName}</div></div>`;

		document.getElementById(`${societyData[i].Category}Grid`).innerHTML += tile;
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
	$.getJSON('/oxfordopenfreshers/data/society_data.json', (data) => {
		unshuffledSocietyData = data;
		// load category data from JSON file
		$.getJSON('/oxfordopenfreshers/data/categories.json', (data1) => {
			unshuffledCategories = data1;

			setupPage();
		}).fail(() => {
			console.log('Error parsing category_data.json.');
		});
	}).fail(() => {
		console.log('Error parsing society_data.json.');
	});
});
