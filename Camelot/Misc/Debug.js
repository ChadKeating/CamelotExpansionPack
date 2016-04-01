Camelot.DebugImprovements = {};
(function (self) {
	self.Init = function () {
		this.addBugResearch();
		this.addBugRate();
	};

	var effRSearch = {
		id: "DebuggingMethodResearch",
		name: "Debugging Methods",
		pointsCost: 150,
		duration: 3E4,
		cost: 50E4,
		canResearch: function (a) {
			return (a.staff.length > 2 && Camelot2.Store().effRS !== true);
		},
		category: "Debugging",
		categoryDisplayName: "Debugging",
		complete: function () {
			Camelot2.Store().effRS = true;
			Camelot2.Store().bugRate += 2;
			Camelot2API.postNotification(new Notification({
				header: "Debugging Methods",
				text: "Top Notch. Now we can debug our games much faster!"
			}));
		}
	};
	var monRSearch = {
		id: "DebugMonkeyCheckers",
		name: "Monkey Checkers",
		pointsCost: 300,
		duration: 4E4,
		cost: 80E4,
		canResearch: function (a) {
			return (a.staff.length > 5 && Camelot2.Store().monRS !== true);
		},
		category: "Debugging",
		categoryDisplayName: "Debugging",
		complete: function (company) {
			Camelot2.Store().monRS = true;
			Camelot2.Store().bugRate += 2;
			Camelot2API.postNotification(new Notification({
				header: "Monkey Checkers Unite!",
				text: "Huge schools of monkeys will now help check over some of your codes making debugging much faster!"
			}));
		}
	};
	var autoDebugger = {
		id: "BugResearch.AI-Debugger",
		name: "AI-Debugger",
		pointsCost: 10000,
		canResearch: function (company) {
			return (Camelot2.Store().aiDB !== true && Camelot2.Store().monRS === true);
		},
		iconUri: "./mods/Camelot/Gameplay/images/aibug.png",
		description: "An AI-dubugging algorithm thats great at finding lots of bugs quickly, written by those friendly guys at SkiiNet.",
		targetZone: 2,
		complete: function () {
			Camelot2.Store().bugRate += 10;
			Camelot2API.postNotification(new Notification({
				header: "AI-DEBUGGER",
				text: "AI-DEBUGGER ONLINE!"
			}));
		}
	};

	self.addBugRate = function () {
		var currentFunction = GameManager.decreaseBugs;
		var overrideFunction = function () {
			if (Camelot2.Store().CErunOnce != true) {
				Camelot2.Store().bugRate = 1;
				Camelot2.Store().CErunOnce = true;
			}

			if (GameManager.company.currentGame.bugs <= Camelot2.Store().bugRate * 7) {
				b = 1;
			} else {
				b = Camelot2.Store().bugRate;
			}
		};

		GameManager.decreaseBugs = function (b) {
			overrideFunction();
			currentFunction(b);
		};
	};

	self.addBugResearch = function () {
		Camelot2API.addSpecialResearch(monRSearch);
		Camelot2API.addSpecialResearch(effRSearch);
		Camelot2API.addBigLabResearch(autoDebugger);
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot.DebugImprovements);