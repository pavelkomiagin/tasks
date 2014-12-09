(function() {
	angular
		.module('tabs')
		.controller('TabsController', TabsController);

	function TabsController() {
		this.tab = 1;
	};
})();