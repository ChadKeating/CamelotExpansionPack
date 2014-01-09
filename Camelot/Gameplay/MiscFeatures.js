/*
 * Version: 0.1.0
 * Description: Collection of core functions for the modules in the camelot expansion.
 * 
 */
var MiscFeatures = {};
(function () {
		
    MiscFeatures.addGameExtentions = function () {
    	
        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        
        appendMe.text = "50 Years (long)";
        appendMe.value = 1.66667;
        findMe.appendChild(appendMe);

        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        appendMe.text = "60 Years (extra long)";
        appendMe.value = 2;

        findMe.appendChild(appendMe);
        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        appendMe.text = "88 Years (1.21 gigawattz!)";
        appendMe.value = 2.93334;
        findMe.appendChild(appendMe);

        var findMe = document.getElementById("gameLengthSelection");
        var appendMe = document.createElement("option");
        appendMe.text = "100 Years (neverending story)";
        appendMe.value = 3.36667;
        findMe.appendChild(appendMe);
        
    };
    
    MiscFeatures.earlySequels = function () {
        var r = Research.Sequels;
        r.pointsCost = 5;
        r.devCost = 500;
        r.canResearch = function (c) { return c.gameLog.length > 1; };
    };


    
   	MiscFeatures.visualTweaks = function (){
   	    UltimateLib.VisualTweaks.setAllTweaks();   		
   	};
        
    
   	MiscFeatures.setFSPHeight = function () {
   	    var find = $("#newGameView");
   	    find.find(".featureSelectionPanel").height = 600;
   	};

   	MiscFeatures.addGameEngineField = function () {
   	    //var findme = $('#gameDetailsTemplate');
   	    var appendme = $('<div class="gameDetailsEngineLabel gameDetailsColumn1">Game Engine:</div><div class="gameDetailsEngine gameDetailsColumn2"></div>');

   	    appendme.insertAfter('.gameDetailsTotal');
   	};

   	MiscFeatures.setGameEngineField = function () {
   	    var keepme = UI._getElementForGameDetail;

   	    UI._getElementForGameDetail = function (game, avgReview) {
   	        var aret = keepme(game, avgReview);
   	        if (game.engine === null || game.engine === undefined) {
   	            aret.find('.gameDetailsEngine').text("None");
   	        } else {
   	            aret.find('.gameDetailsEngine').text(game.engine.name);
   	        }
   	        
   	        aret.find('.gameDetailsEngineLabel').css('position','absolute');
   	        aret.find('.gameDetailsEngineLabel').css('top', '172px');
   	        aret.find('.gameDetailsEngine').css('position', 'absolute');
   	        aret.find('.gameDetailsEngine').css('top', '175px');
            
   	        var mod = 30;
   	        var top = 172;
   	        var top2 = 175;
   	        aret.find('.gameDetailsReleaseWeekLabel').css('top', top += mod)
   	        aret.find('.gameDetailsReleaseWeek').css('top', top2 += mod);
   	        aret.find('.gameDetailsFansChangeLabel').css('top', top += mod)
   	        aret.find('.gameDetailsFansChange').css('top', top2 += mod);
   	        aret.find('.gameDetailsAvgReviewLabel').css('top', top += mod)
   	        aret.find('.gameDetailsAvgReview').css('top', top2 += mod);
   	        aret.find('.gameDetailsTopSalesRankLabel').css('top', top += mod)
   	        aret.find('.gameDetailsTopSalesRank').css('top', top2 += mod);

   	        return aret;
   	    };



   	};

   	MiscFeatures.setWatermarks = function () {
   	    UltimateLib.VisualTweaks.setWatermarks("slider-engine-img", ".\/mods\/Camelot\/Gameplay\/images\/gear.gif");
   	    UltimateLib.VisualTweaks.setWatermarks("slider-ai-img", ".\/mods\/Camelot\/Gameplay\/images\/ai.gif");
   	    UltimateLib.VisualTweaks.setWatermarks("slider-sound-img", ".\/mods\/Camelot\/Gameplay\/images\/sound.gif");
   	};

    MiscFeatures.runStartUp = function () {
    	MiscFeatures.addGameExtentions();
    	MiscFeatures.visualTweaks();
    	MiscFeatures.addGameEngineField();
    	MiscFeatures.setGameEngineField();
    	//MiscFeatures.setWatermarks();
    	//MiscFeatures.setFSPHeight();
    	//MiscFeatures.contractFix();
    };
    
})();