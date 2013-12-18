/*
 * Version: 0.1.0
 * Description: Collection of core functions for the modules in the camelot expansion.
 * 
 */
var MiscFeatures = {};
(function () {
	
	/*
	 * Short Hand Variables
	 */
	var Store = CAMELOT.store();
	var evKey = GDT.eventKeys.gameplay;
	
    MiscFeatures.addGameExtentions = function () {
        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        appendMe.text = "60 Years (long)";
        appendMe.value = "2";
        findMe.appendChild(appendMe);

        appendMe = document.createElement("option");
        appendMe.text = "84 Years (super long)";
        appendMe.value = "2.8";
        findMe.appendChild(appendMe);

    };
    
    
    MiscFeatures.runStartUp = function () {
    	MiscFeatures.addGameExtentions();
    };
    
    })();