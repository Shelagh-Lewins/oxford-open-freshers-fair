// unshuffledCategories and unshuffledData are loaded from data.js

/* eslint-env jquery */

$('document').ready(() => {
	const lightbox = document.getElementById("lightbox");
	const popup = document.getElementById("popup");
	const cover = document.getElementById("cover");
	const categoriesList = document.getElementById("categoriesList");
	const categoriesWrapper = document.getElementById("categoriesWrapper");

	function hideLightbox() {
		lightbox.classList.remove("showLightbox");
	}

	cover.addEventListener("mousedown", function() {
		hideLightbox();
	});
	exit.addEventListener("mousedown", function() {
		hideLightbox();
	});

	const tiles = [];

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

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
		console.log('showPopup, id', id);
		// Split society description into first sentence (to be put in bold) and rest.
		let socDescLead = data[id]["Society description"].substring(0, data[id]["Society description"].indexOf('.') + 1);
		let socDescRest = data[id]["Society description"].replace(socDescLead, "");

		/*image if desired:         <img src="${data[id]["Society logo image"]}" />*/
		let popupText1 = `<div class="exit" onclick="hideLightbox()">X</div>
					<h2 class="subtitle">${data[id]["Society name"]}</h2>`;
		let popupText2 = `<p class="text"><b>${socDescLead}</b>${socDescRest}</p>
					<p class="text"><b>Frequently Asked Questions</b><br />${data[id]["FAQs"]}</p>`;
		let social1 = `<div id="social" style="flex: 100%; padding: 10px;"><a href=${data[id]["Society Facebook page address"]} target="_blank"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>`;
		let social2 = `<div id="social"><a href=${data[id]["Society Instagram profile address"]} target="_blank"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>`;
		let social3 = `<div id="social"><a href=${data[id]["Society YouTube channel address"]} target="_blank"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>`;
		let social4 = `<div id="social">
			<div class="socLink2"><a href=${data[id]["Society Facebook page address"]} target="_blank"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>
				<div class="socLink2"><a href=${data[id]["Society Instagram profile address"]} target="_blank"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>
				</div>`;
		let social5 = `<div id="social">
			<div class="socLink2"><a href=${data[id]["Society Facebook page address"]} target="_blank"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>
				<div class="socLink2"><a href=${data[id]["Society YouTube channel address"]} target="_blank"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>
				</div>`;
		let social6 = `<div id="social">
				<div class="socLink2"><a href=${data[id]["Society Instagram profile address"]} target="_blank"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>
				<div class="socLink2"><a href=${data[id]["Society YouTube channel address"]} target="_blank"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>
				</div>`;
		let social7 = `<div id="social">
				<div class="socLink"><a href=${data[id]["Society Facebook page address"]} target="_blank"><img class="socImg" src="img/social/facebook.png" alt="Facebook link"></a></div>
				<div class="socLink"><a href=${data[id]["Society Instagram profile address"]} target="_blank"><img class="socImg" src="img/social/instagram.png" alt="Instagram link"></a></div>
				<div class="socLink"><a href=${data[id]["Society YouTube channel address"]} target="_blank"><img class="socImg" src="img/social/youtube.png" alt="YouTube channel link"></a></div>
				</div>`;
	if (data[id]["Intro video YouTube link"] != "") {
	var popupText = popupText1 + `<iframe class="YTVid" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  type="text/html" src=${data[id]["Intro video YouTube link"]}></iframe>` + popupText2;
	} else {
	var popupText = popupText1 + `<img class="popupGraphic" src="${data[id]["Society logo image"]}">` + popupText2;
	}

	if (data[id]["Teams call address"] === "") {
	var teamsLink = "";
	} else {
	var teamsLink = `<a href="${data[id]["Teams call address"]}" target="_blank"><center><h2>Join Teams Call</h2></center></a>`;
	}

	if (data[id]["Society Facebook page address"] == "" && data[id]["Society Instagram profile address"] == "" && data[id]["Society YouTube channel address"] == "") {
	var social = "";
	} else if (data[id]["Society Facebook page address"] != "" && data[id]["Society Instagram profile address"] == "" && data[id]["Society YouTube channel address"] == "") {
	var social = social1;
	} else if (data[id]["Society Facebook page address"] == "" && data[id]["Society Instagram profile address"] != "" && data[id]["Society YouTube channel address"] == "") {
	var social = social2;
	} else if (data[id]["Society Facebook page address"] == "" && data[id]["Society Instagram profile address"] == "" && data[id]["Society YouTube channel address"] != "") {
	var social = social3;
	} else if (data[id]["Society Facebook page address"] != "" && data[id]["Society Instagram profile address"] != "" && data[id]["Society YouTube channel address"] == "") {
	var social = social4;
	} else if (data[id]["Society Facebook page address"] != "" && data[id]["Society Instagram profile address"] == "" && data[id]["Society YouTube channel address"] != "") {
	var social = social5;
	} else if (data[id]["Society Facebook page address"] != "" && data[id]["Society Instagram profile address"] == "" && data[id]["Society YouTube channel address"] == "") {
	var social = social6;
	} else {
	var social = social7;
	}

	if (data[id]["Society website address"] != "") {
	var websiteAddress = `<center><a href=${data[id]["Society website address"]} target="_blank"><p class="text">Society website link</p></a></center>`
	} else {
	var websiteAddress = "";
	}

	if (data[id]["Additional society page address"] == "" && data[id]["Society email signup address"] == ""){
	var extraLinks = "";
	} else if (data[id]["Additional society page address"] != "" && data[id]["Society email signup address"] == "") {
	var extraLinks = `<center><p class="text">Additional related page: <a href=${data[id]["Additional society page address"]} target="_blank">${data[id]["Additional society page address"]}</a></p></center>`;
	} else if (data[id]["Additional society page address"] == "" && data[id]["Society email signup address"] != "") {
	var extraLinks = `<center><p class="text"><a href=${data[id]["Society email signup address"]} target="_blank">Email list sign-up form link</a></p></center>`;
	} else {
	var extraLinks = `<center><p class="text">Additional related page: <a href=${data[id]["Additional society page address"]} target="_blank">${data[id]["Additional society page address"]}</a></p>
	<p class="text"><a href=${data[id]["Society email signup address"]} target="_blank">Email list sign-up form link</a></p></center>`
	}

	//popup.innerHTML = popupText + teamsLink + social + websiteAddress + extraLinks;
	popup.innerHTML = popupText + social + websiteAddress + extraLinks;

		lightbox.classList.add("showLightbox");
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

	for (let i = 0; i < data.length; i += 1) {
		const oneIndexIsForLosers = data[i].ID - 1;
		let twoIndicesIsForLosers;

		for (let j = 0; j < data.length; j += 1) {
			if (data[j].ID === data[i].ID) {
				twoIndicesIsForLosers = j;
			}
		}
		const tile = `<div><span class='tile' title="${data[i]['Society name']}" role='img' aria-label="${data[i]['Society name']}" id='tile${oneIndexIsForLosers}' style='background-size: 100% 100%; background-image: url("${
			data[i]['Society logo image']}'
			><div class='tileInner'
			data-index=${twoIndicesIsForLosers}>
		</div></div></span>`;
		document.getElementById(`${data[i].Category}Grid`).innerHTML += tile;
		tiles.push(document.getElementById(`tile${oneIndexIsForLosers}`));
	}

	$('.tile').on('click', (event) => {
		showPopup(event.target.dataset.index);
	});
});
