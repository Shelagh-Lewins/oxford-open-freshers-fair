// unshuffledCategories and unshuffledData are loaded from data.js

/* eslint-env jquery */

$('document').ready(() => {
	const lightbox = document.getElementById('lightbox');
	const popup = document.getElementById('popup');
	const cover = document.getElementById('cover');
	const categoriesList = document.getElementById('categoriesList');
	const categoriesWrapper = document.getElementById('categoriesWrapper');

	function hideLightbox() {
		lightbox.classList.remove('showLightbox');
	}

	$(cover).on('click', () => {
		hideLightbox();
	});

	const tiles = [];

	function shuffle(array) {
		let currentIndex = array.length;
		let temporaryValue;
		let randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	const data = shuffle(unshuffledData);
	const categories = shuffle(unshuffledCategories);

	function showPopup(id) {
		// Split society description into first sentence (to be put in bold) and rest.
		const socDescLead = data[id]['Society description'].substring(0, data[id]['Society description'].indexOf('.') + 1);
		const socDescRest = data[id]['Society description'].replace(socDescLead, '');

		/*image if desired:         <img src="${data[id]["Society logo image"]}" />*/
		const popupText1 = `<div class="exit">X</div>
					<h2 class="subtitle">${data[id]['Society name']}</h2>`;
		const popupText2 = `<p class="text"><b>${socDescLead}</b>${socDescRest}</p>
					<p class="text"><b>Frequently Asked Questions</b><br />${data[id].FAQs}</p>`;

		let popupText;
		if (data[id]['Intro video YouTube link'] !== '') {
			popupText = `${popupText1}<iframe class="YTVid" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  type="text/html" src=${data[id]['Intro video YouTube link']}></iframe>${popupText2}`;
		} else {
			popupText = `${popupText1}<img class="popupGraphic" src="${data[id]['Society logo image']}">${popupText2}`;
		}

		let teamsLink = '';

		if (data[id]['Teams call address'] !== '') {
			teamsLink = `<a href="${data[id]['Teams call address']}" target="_blank" rel="noopener"><center><h2>Join Teams Call</h2></center></a>`;
		}

		let social = '';
		const facebookLink = data[id]['Society Facebook page address'];
		const instagramLink = data[id]['Society Instagram profile address'];
		const youtubeLink = data[id]['Society YouTube channel address'];

		if (facebookLink || instagramLink || youtubeLink) {
			social += '<div class="social">';

			if (facebookLink) {
				social += `<div class="socLink"><a href=${facebookLink} target="_blank" rel="noopener"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>`;
			}

			if (instagramLink) {
				social += `<div class="socLink"><a href=${instagramLink} target="_blank" rel="noopener"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>`;
			}

			if (youtubeLink) {
				social += `<div class="socLink"><a href=${youtubeLink} target="_blank" rel="noopener"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>`;
			}

			social += '</div>';
		}

		let websiteAddress = '';

		if (data[id]['Society website address'] !== '') {
			websiteAddress = `<div class="website-address"><a href=${data[id]['Society website address']} target="_blank" rel="noopener"><p class="text">Society website link</p></a></div>`;
		}

		let extraLinks = '';
		const additionalPageLink = data[id]['Additional society page address'];
		// const emailSignupLink = data[id]['Society email signup address']; // temporarily remove as sign up sheets only active at start of year

		if (additionalPageLink) {
			// if (additionalPageLink || emailSignupLink) { // temporarily remove as sign up sheets only active at start of year
			extraLinks += '<div class="extra-links">';

			if (additionalPageLink) {
				extraLinks += `<p class="text">Additional related page: <a href=${additionalPageLink} target="_blank" rel="noopener">${additionalPageLink}</a></p>`;
			}

			// temporarily remove as sign up sheets only active at start of year
			/* if (emailSignupLink) {
				extraLinks += `<p class="text"><a href=${emailSignupLink} target="_blank" rel="noopener">Email list sign-up form link</a></p>`;
			} */

			extraLinks += '</div>';
		}

		// temporarily remove teams link as only active in 0th week sessions //
		// popup.innerHTML = popupText + teamsLink + social + websiteAddress + extraLinks;
		popup.innerHTML = popupText + social + websiteAddress + extraLinks;
		$('.exit').on('click', () => {
			hideLightbox();
		});

		lightbox.classList.add('showLightbox');
	}

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
console.log('data', data);
	for (let i = 0; i < data.length; i += 1) {
		const {
			ID,
			'Society name': societyName,
			'Society logo image': societyLogoImage,
		} = data[i];
		const tileIndex = ID - 1;

		const tile = `<div class="tileOuter"><span class='tile' title="${societyName}" role='img' aria-label="${societyName}" id='tile${tileIndex}' style='background-size: 100% 100%; background-image: url("${societyLogoImage}'>
		<div class='tileInner' data-index=${i}></div>
		</span>
		<div class="tileName">${societyName}</div></div>`;
		// const tile = `<div><span class='tile' title="${data[i]['Society name']}" role='img' aria-label="${data[i]['Society name']}" id='tile${oneIndexIsForLosers}' style='background-size: 100% 100%; background-image: url("${
			//data[i]['Society logo image']}'
			//><div class='tileInner'
			//data-index=${twoIndicesIsForLosers}>
		//</div></div></span>`;
		document.getElementById(`${data[i].Category}Grid`).innerHTML += tile;
		tiles.push(document.getElementById(`tile${tileIndex}`));
	}

	$('.tile').on('click', (event) => {
		showPopup(event.target.dataset.index);
	});
});
