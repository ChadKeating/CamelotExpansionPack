/*
 * Version: 0.1.0
 * Description: Grid Story Events
 *
 */
var GridEvents = {};
(function () {

	/*
	 * Short Hand Variables
	 */
	var evKey = GDT.eventKeys.gameplay;



	/*
	 * Event ID's
	 */
	var con = "STORY-GRID-";
	var comp = con + "COMPETITION";
	var click = con + "KICKSTARTER";
	var modest = con + "MODESTBUNDLE";

	/*
	 * Events
	 */
	var compEvent = {
		id: comp,
		isRandom: true,
		maxTriggers: 1,
		trigger: function() {CAMELOT.gC().flags.grid = true;},
		getNotification: function (company) {
			var message = "N.A. just launched Norigin; a vendor for purchasing and managing games collections just like Grid!";
			return new Notification({
				sourceId: comp,
				header: "N.A. Norigin!".localize(),
				text: message,
				options: ["Oh Well", "Buy Them Out (1M.)", "Slur Campaign (50k.)"]
			});
		},
		complete: function (d) {
		    if (d === 0) {
		        // Reduce "New Content"
		        GridSales.newContentMod();
		        CAMELOT.store().ncMod -= 0.4;
		        return;
		    }
		    if (d === 1) {
                // Do nothing

		        return;
		    }
		    if (d === 2) {
		        // Evil +1
		        CAMELOT.gC().flags.evil++;
		        return;
		    }
		    console.log("Borigin Error"); 
		    return;
		}
	};

	var clickStarter = {
	    id: click,
	    isRandom: true,
	    maxTriggers: 1,
	    trigger: function () { CAMELOT.gC().flags.grid = true; },
	    getNotification: function (company) {
	        var message = "An uprising of indie games from Clickstarter means that indie games are super popular now. We'd sell out if we sold anything physical!";
	        return new Notification({
	            sourceId: click,
	            header: "Clickstarter".localize(),
	            text: message,
	            options: ["Sweet!"]
	        });
	    },
	    complete: function (d) {
	        CAMELOT.store().ncMod += 0.07;
	        return;
	    }
	};

	var modestBundle = {
	    id: modest,
	    isRandom: true,
	    maxTriggers: 1,
	    trigger: function () { CAMELOT.gC().flags.grid = true; },
	    getNotification: function (company) {
	        var message = "Modest Bundle just launched and they are using Grid Codes to distribute their games. More income for us!";
	        return new Notification({
	            sourceId: modest,
	            header: "Modest Bundle".localize(),
	            text: message,
	            options: ["Great!"]
	        });
	    },
	    complete: function (d) {
	        CAMELOT.store().ncMod += 0.1;
	        return;
	    }
	};


	GridEvents.runStartUp = function () {
		//Add Events
		//GDT.addEvent(compEvent);
		//GDT.addEvent(betterOffer);
		//Set Triggers
		//GDT.on(evKey.contractFinished, MiscEvent.BetterOffer);
		//GDT.on(evKey.weekProceeded, MiscEvent.EventLottery);

	};



})();