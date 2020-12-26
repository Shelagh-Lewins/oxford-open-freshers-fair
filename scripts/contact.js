/* eslint-env jquery */

// as an anti-spam measure, the email address is not displayed until the user clicks a button.
function showEmail() {
	const emailHTML = '<a href="mailto:contact@oxfordopenfreshers.online">contact@oxfordopenfreshers.online</a>';
	$('.info-email').html(emailHTML);
}

// //////////////////////////////////
// wait until the page is loaded
$('document').ready(() => {
	$('.info-email button').on('click', () => {
		showEmail();
	});
});
