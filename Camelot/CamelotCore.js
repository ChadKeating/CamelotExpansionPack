/*
 * Version: 0.1.0
 * Description: Collection of core functions for the modules in the camelot expansion.
 * 
 */
var CAMELOT = {};
(function () {
	
	CAMELOT.store = function() {
		return GDT.getDataStore("CAMELOT-EXP-PACK").data;
	};	
	CAMELOT.addSR = function (research) {
		Research.SpecialItems.push(research);
	};
	CAMELOT.addBR = function (research) {
		Research.bigProjects.push(research);
	};
	CAMELOT.post = function (post) {
		GameManager.company.notifications.push(post);
	};

	CAMELOT.gC = function () {
		return GameManager.company;
	};
	CAMELOT.runStartUp = function () {
    };
	
})();