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
	var evKey = GDT.eventKeys.gameplay;
	
    MiscFeatures.addGameExtentions = function () {
    	
        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        
        appendMe.text = "50 Years (long)";
        appendMe.value = 1.66667;
        findMe.appendChild(appendMe);
        
        appendMe.text = "60 Years (extra long)";
        appendMe.value = 2;
        findMe.appendChild(appendMe);

        appendMe.text = "84 Years (super long)";
        appendMe.value = 2.8;
        findMe.appendChild(appendMe);
        
        appendMe.text = "100 Years (neverending story)";
        appendMe.value = 3.36667;
        findMe.appendChild(appendMe);
        
    };
    
    
    MiscFeatures.runStartUp = function () {
    	MiscFeatures.addGameExtentions();
    };
    
})();