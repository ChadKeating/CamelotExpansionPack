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
    CAMELOT.settings = function() {
        return GDT.getDataStore("CAMELOT-EXP-PACK").settings;
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
	
	CAMELOT.setContextButtons = function () {
		var contextMenu = UI._showContextMenu;
		
			UI._showContextMenu = function(b, c, d, h){
				CAMELOT.addContextButtons(b, c);
				contextMenu(b, c, d, h);
			};
	};
	
	
	CAMELOT.addContextButtons = function (screen, buttonArray) { 
		GridInterface.addButton(screen, buttonArray);
	};

	CAMELOT.getShortNumberString = function () {
		//Overrides UI.getShortNumberString
		UI.getShortNumberString = function (number){
	
				var abNum = Math.abs(number);
				var fnum;
				
		        switch (true){
		        	case (abNum >= 1E15):
					fnum = "{0}Q".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E15, 1)));
		        	break;
		        	case (abNum >= 1E12):
					fnum = "{0}T".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E12, 1)));
		        	break;
		        	case (abNum >= 1E9):
					fnum = "{0}B".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E9, 1)));
		        	break;
		        	case (abNum >= 1E6):
					fnum = "{0}M".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E6, 1)));
		        	break;
		        	case (abNum >= 1E3):
					fnum = "{0}K".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E3, 1)));
		        	break;
		        	case (abNum < 1E3):
					fnum = Math.roundToDecimals(number, 1);
		        	break;
		        	default:
		        	fnum = 0;
		        	console.log("error");
		        	break;
		        }
		        return fnum;
		  };
    };

	CAMELOT.runStartUp = function () {
		CAMELOT.setContextButtons();
		CAMELOT.getShortNumberString();
    };
	
	
	
	
	
	
})();