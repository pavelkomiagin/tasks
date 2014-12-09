(function() {
	angular.module('app', [
		'hotelAutocomplete',
		'tabs'
	]);
})();

$(function() {
	$('#countries').selectbox();
});