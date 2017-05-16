'use strict';

angular
	.module('ConverterApp', [
		'ngRoute',
		'mgcrea.ngStrap'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/temperature', {
				templateUrl: 'views/temperature.html',
				controller: 'TemperatureController'
			})
			.when('/length', {
				templateUrl: 'views/length.html',
				controller: 'LengthController'
			})
			.otherwise({
				redirectTo: '/temperature'
			});
	});
