(() => {
	"use strict";
	const angular = require("angular");
	const $ = global.jQuery = require('jquery');
	const JSHINT = require("jshint").JSHINT;
	const examplesES6 = require("./examplesES6");
	//set up angular application
	const ESplayApp = angular.module("ESplayApp", []);
	require("./ESplayMethods")(ESplayApp, $, JSHINT, examplesES6);
	require("./ESplayCtrl")(ESplayApp, $);
	//bootstrap
	require("bootstrap");	
})();


