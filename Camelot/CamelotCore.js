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
		UltimateLib.Research.addSpecial(research);
	};
	CAMELOT.addBR = function (research) {
		UltimateLib.Research.addLab(research);
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
		        	case (abNum >= 1E24):
					fnum = "{0}SP".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E24, 1)));
		        	break;
		        	case (abNum >= 1E21):
					fnum = "{0}SX".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E21, 1)));
		        	break;
		        	case (abNum >= 1E18):
					fnum = "{0}QT".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E18, 1)));
		        	break;
		        	case (abNum >= 1E15):
					fnum = "{0}QD".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E15, 1)));
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
    
    
    
    CAMELOT.stats = function () {
    	
    	console.log("Stats Ran");
    	
    	var gsc = ""+
		"<script>"+
			"var _gaq = _gaq || [];"+
			"_gaq.push(['_setAccount', 'UA-46823981-2']);"+ // your ID/profile
			"_gaq.push(['_trackPageview']);"+
			"(function() {"+
				"var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"+
				"ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"+
				"var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"+
			"})();"+
		"</script>";
		
		
		var gsc2 = ""+
		"<script>"+
		"(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"+
		"(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"+
		"m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"+
		"})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"+
		"ga('create', 'UA-46823981-2', 'auto');"+
		"ga('send', 'pageview');"+
		"</script>";

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-46823981-2']);
		  _gaq.push(['_trackPageview']);
		  _gaq.push(['_trackEvent', 'Test', 'Super Test']);
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		

		
		
		
		
		
		//$("head").append(gsc2);
    	
    };
    
    
    
    
    
    
    
    
    
    
    
    
    

	CAMELOT.runStartUp = function () {
		CAMELOT.setContextButtons();
		CAMELOT.getShortNumberString();
    };
	
	
	
	
	
	
})();