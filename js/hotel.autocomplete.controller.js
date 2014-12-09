(function() {
	angular
		.module('hotelAutocomplete')
		.controller('HotelAutocompleteController', ['$http', HotelAutocompleteController]);

	function HotelAutocompleteController($http) {
		this.query = '';
		this.hotels = [];
		this.selectedHotel = {};
		this.needShowHotels = false;
		this.activeHotelIndex = 0;

		var autocomplete = this;
		this.search = function() {
			$http.get('https://level.travel/papi/references/hotels?js=true&key=da4ad28030cfa998eedb7da1943e1b37&api_version=2&query=' + this.query)
				.success(function(data) {
					data.sort(function(a, b) {
						return a.iso2.localeCompare(b.iso2);
					});
					autocomplete.hotels = data;
				});
		};

		this.selectHotel = function(hotel) {
			this.selectedHotel = hotel;
			this.query = hotel.name;
			this.activeHotelIndex = 0;
			this.needShowHotels = false;
			this.search();
			this.hideSelectedHotel();
		};

		this.showSelectedHotel = function() {
			this.needShowSelectedHotel = true;
		};

		this.hideSelectedHotel = function() {
			this.needShowSelectedHotel = false;
		};

		this.selectNext = function() {
			if(this.activeHotelIndex < this.hotels.length - 1)
				this.activeHotelIndex++;
		};

		this.selectPrev = function() {
			if(this.activeHotelIndex > 0)
				this.activeHotelIndex--;
		};

		this.keyDownHandler = function($event) {
			var keyCode = $event.keyCode;
			switch(keyCode) {
				case 40:
					this.selectNext();
					break;
				case 38:
					this.selectPrev();
					break;
				case 13:
					this.selectHotel(this.hotels[this.activeHotelIndex]);
					break;
				default:
					break;
			}
		}
	};
})();