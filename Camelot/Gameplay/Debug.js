/*
 * Version: 0.1.0
 * Description: Debugging addon module for Camelot.
 *
 */
var Debug = {};
(function () {

	/*
	 * Short Hand Variables
	 */
	var evKey = GDT.eventKeys.gameplay;

	/*
	 * Researches
	 */
	var effRSearch = {
		id: "DebuggingMethodResearch",
		name: "Debugging Methods".localize(),
		pointsCost: 150,
		duration: 3E4,
		cost: 50E4,
		canResearch: function (a) {
			return (a.staff.length > 1 && CAMELOT.store().effRS !== true);
		},
		category: "Debugging",
		categoryDisplayName: "Debugging".localize(),
		complete: function () {
			CAMELOT.store().effRS = true;
			CAMELOT.store().bugRate += 2;
			CAMELOT.post(new Notification({
				header: "Debugging Methods".localize(),
				text: "Top Notch. Now we can debug our games much faster!".localize()
			}));
		}
	};
	var monRSearch = {
		id: "DebugMonkeyCheckers",
		name: "Monkey Checkers".localize(),
		pointsCost: 300,
		duration: 4E4,
		cost: 80E4,
		canResearch: function (a) {
			return (a.staff.length > 5 && CAMELOT.store().monRS !== true);
		},
		category: "Debugging",
		categoryDisplayName: "Debugging".localize(),
		complete: function (company) {
			CAMELOT.store().monRS = true;
			CAMELOT.store().bugRate += 2;
			CAMELOT.post(new Notification({
				header: "Monkey Checkers Unite!".localize(),
				text: "Huge schools of monkeys will now help check over some of your codes making debugging much faster!".localize()
			}));
		}
	};
	var autoDebugger = {
		id: "BugResearch.AI-Debugger",
		name: "AI-Debugger".localize(),
		pointsCost: 10000,
		canResearch: function (company) {
			return (CAMELOT.store().aiDB !== true && CAMELOT.store().monRS === true);
		},
		iconUri: "./mods/Camelot/Gameplay/images/aibug.png",
		description: "An AI-dubugging algorithm thats great at finding lots of bugs quickly, written by those friendly guys at SkiiNet.".localize(),
		targetZone: 2,
		complete: function () {
			CAMELOT.store().bugRate += 10;
			CAMELOT.post(new Notification({
				header: "AI-DEBUGGER".localize(),
				text: "AI-DEBUGGER ONLINE!".localize()
			}));
		}
	};
	/*
	 * Debug Methods
	 */
	Debug.addBugRate = function () {
		var appendMe = GameManager.decreaseBugs;
		GameManager.decreaseBugs = function (b) {
			console.log(CAMELOT.store().bugRate);
			if (CAMELOT.store().CErunOnce !== true) {
	            //intilising variables
	            CAMELOT.store().bugRate = 1;
	            CAMELOT.store().CErunOnce = true;
	        }
			
			if (CAMELOT.gC().currentGame.bugs <= CAMELOT.store().bugRate * 7) {
				b = 1;
			} else {
				
				b = CAMELOT.store().bugRate;
			}
			appendMe(b);
		};
	};

	Debug.addBugResearch = function () {
		CAMELOT.addSR(monRSearch);
		CAMELOT.addSR(effRSearch);
		CAMELOT.addBR(autoDebugger);
	};

	Debug.runStartUp = function () {
		Debug.addBugResearch();
		Debug.addBugRate();
	};



})();