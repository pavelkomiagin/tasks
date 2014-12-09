(function() {
	angular
		.module('tabs')
		.directive('tabs', TabsDirective);

	function TabsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'tpl/tabs.html',
			controller: 'TabsController',
			controllerAs: 'tabsCtrl'
		}
	};
})();