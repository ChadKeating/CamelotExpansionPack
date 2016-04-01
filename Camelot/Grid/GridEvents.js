Camelot2.Grid.Events = {};
(function (self) {

	self.Init = function () {
		Camelot2.Store().Events[competitorEventId] = {};

		//Add Events
		GDT.addEvent(competitorEvent);
	};

	var gridEventPrefix = Camelot2.Events.eventPrefix + "Grid-";
	var click = gridEventPrefix + "KICKSTARTER";
	var modest = gridEventPrefix + "MODESTBUNDLE";

	var competitorEventId = gridEventPrefix + "COMPETITION";
	var competitorEvent = {
		id: competitorEventId,
		isRandom: true,
		maxTriggers: 1,
		canUse: function () { return GameManager.company.flags.grid == true; },
		getNotification: function (company) {
			var message = "N.A. just launched Norigin; a vendor for purchasing and managing games just like Grid!";
			return new Notification({
				sourceId: competitorEventId,
				header: "N.A. Norigin!",
				text: message,
				options: ["Oh Well", "Buy Them Out (1M)", "Slur Campaign (50k)"]
			});
		},
		complete: function (decision) {
			if (decision == 1 && GameManager.company.cash >= 1000000) {
				// Do nothing
				GameManager.company.adjustCash(-1000000, "Norigin Purchased");
				return;
			}

			if (decision == 2 && GameManager.company.cash >= 50000) {
				// Evil +1
				Camelot2.Grid.Sales.adjustNewContentModifier(-0.1);
				GameManager.company.adjustCash(-50000, "Slur Campaign");
				GameManager.company.flags.evil++;
				return;
			}

			//Reduce "New Content"
			Camelot2.Grid.Sales.adjustNewContentModifier(-0.4);
		}
	};
	/*
	var clickStarter = {
		id: click,
		isRandom: true,
		maxTriggers: 1,
		trigger: function () { GameManager.company.flags.grid = true; },
		getNotification: function (company) {
			var message = "An uprising of indie games from Clickstarter means that indie games are super popular now. We'd sell out if we sold anything physical!";
			return new Notification({
				sourceId: click,
				header: "Clickstarter",
				text: message,
				options: ["Sweet!"]
			});
		},
		complete: function (d) {
			Camelot2.Store().ncMod += 0.07;
			return;
		}
	};

	var modestBundle = {
		id: modest,
		isRandom: true,
		maxTriggers: 1,
		trigger: function () { GameManager.company.flags.grid = true; },
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
			Camelot2.Store().ncMod += 0.1;
			return;
		}
	};
	*/
	Camelot2.InitListeners.push(self.Init);
})(Camelot2.Grid.Events);