(function() {
	angular
		.module('hotelAutocomplete')
		.directive('hotelAutocomplete', HotelAutocompleteDirective);

	function HotelAutocompleteDirective() {
		return {
			restrict: 'E',
			templateUrl: 'tpl/hotel-autocomplete.html',
			controller: 'HotelAutocompleteController',
			controllerAs: 'autocompleteCtrl'
		}
	};
})();