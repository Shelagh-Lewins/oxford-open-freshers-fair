// functions shared across pages

/* eslint-env jquery */

function buildFooter() {
	let footerHMTL = '<h2 class="subtitle">About Oxford Open Freshers\' Fair</h2>';
	footerHMTL += '<p>Oxford Open Freshers\' Fair provides information about student-run and student-centred societies in Oxford. We reserve the right to refuse any listing that is not of legitimate interest to university students in Oxford.</p>';
	footerHMTL += '<p>The rights to all society content reside with the individual society.</p>';
	footerHMTL += '<p><a href="notices/disclaimer.txt" target="_blank” rel=”noopener noreferrer">Disclaimer</a> (explains, among other things, that we are not responsible for the content societies submit to the site)</p>';
	footerHMTL += '<p><a href="notices/privacy_policy.txt" target="_blank” rel=”noopener noreferrer">Privacy notice</a> (explains how we use and protect your personal data)</p>';
	footerHMTL += '<p><a href="contact.html">Contact us</a></p>';
	footerHMTL += '<p>Oxford Open Freshers\' Fair 2020 was created and organised by Peter Wallich, with generous help from Richard Mifsud, Cosima Clara Gillhammer, Jamie Wilmore, Raymond Douglas, Nathan Walemba, Nicolo Stewen, Shelagh Lewins, and others. Website built by Raymond Douglas and Peter Wallich. Logo design by Nicolo Stewen.</p>';
	footerHMTL += '<p>Oxford Open Freshers\' Fair is currently organised by Shelagh Lewins, as of December 2020.</p>';

	$('.footer').html(footerHMTL);
}

// //////////////////////////////////
// wait until the page is loaded
$('document').ready(() => {
	// build footer
	buildFooter();
});
