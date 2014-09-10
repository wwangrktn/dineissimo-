//View Model for the About Us page.
var app = app || {};

app.AboutUs = (function() {
	'use strict';

	return new kendo.observable({
		phone: "+1-888-365-2779",
		email: "triplr@telerik.com",
		title: "About us",
		description: "Opened Jul 2013, this cafe in downtown LA serves organic, gluten-free, and vegan food without added sugar, yeast, caffeine, or alcohol.  In early-2014 its menu added a few dairy options."
	});

})();