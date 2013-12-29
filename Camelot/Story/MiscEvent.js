/*
 * Version: 0.1.0
 * Description: MiscEvent Story Events
 *
 */
var MiscEvent = {};
(function () {

	/*
	 * Short Hand Variables
	 */
	var evKey = GDT.eventKeys.gameplay;



	/*
	 * Event ID's
	 */
	var con = "STORY-MISCEVENT-";
	var bailEVID = con += "BAILOUT";
	var betterOfferEVID = con += "BETTEROFFER";

	/*
	 * Events
	 */

	var bailOut = {
		id: bailEVID,
		isRandom: false,
		maxTriggers: 1,
		trigger: null,
		getNotification: function (company) {
			var staffMember = CAMELOT.gC().staff.skip(1).pickRandom();
			CAMELOT.store().bailstaffMember = staffMember.id;
			var message = staffMember.name + " had a pretty wild night and landed himself in jail. Looks like he won't be joining us again unless you bail him out!".localize().format(staffMember.name);
			return new Notification({
				sourceId: bailEVID,
				header: "Bail!".localize(),
				text: message,
				options: ["Bail (5000)", "Do Nothing"]
			});
		},
		complete: function (decision) {
			var nullme = CAMELOT.store().bailstaffMember;
			var staffMember = CAMELOT.gC().staff.first(function (staff) {
				return staff.id == nullme;
			});
			switch (decision) {
			case 0:
				CAMELOT.gC().adjustCash(-5000, "Bail");
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Bail Made".localize(), staffMember.name + " is a free man once again.".split()));
			case 1:
				CAMELOT.gC().flags.fireEmployeeId = nullme;
				DecisionNotifications.fireEmployee.complete(0);
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Left in Jail".localize(), staffMember.name + " left the company.").split());
			default:
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Bail Out", "There has been an error.").split());
			}

		}
	};

	var betterOffer = {
		id: betterOfferEVID,
		isRandom: false,
		maxTriggers: 1,
		trigger: null,
		getNotification: function (company) {
			var staffMember = CAMELOT.gC().staff.skip(1).pickRandom();
			var salary = staffMember.salary;
			var raise = salary * 0.3;
			CAMELOT.store().bostaffMember = staffMember.id;
			var message = staffMember.name + " did such a good job on that last contract that they now want to hire him! He will stay for a " + raise.toLocaleString() + "Cr. raise.".localize().format(staffMember.name);
			return new Notification({
				sourceId: betterOfferEVID,
				header: "Better Offer...".localize(),
				text: message,
				options: ["Offer Raise", "Let Go"]
			});
		},
		complete: function (decision) {
			var nullme = CAMELOT.store().bostaffMember;
			var staffMember = CAMELOT.gC().staff.first(function (staff) {
				return staff.id == nullme;
			});
			var salary = staffMember.salary;
			switch (decision) {
			case 0:
				salary = salary * 1.3;
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Raise Given".localize(), staffMember.name + " is now being paid " + salary.toLocaleString() + "Cr. a month.").split());
			case 1:
				CAMELOT.gC().flags.fireEmployeeId = nullme;
				DecisionNotifications.fireEmployee.complete(0);
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Bye Bye".localize(), staffMember.name + " left the company.").split());

			default:
				return CAMELOT.gC().activeNotifications.addRange(new Notification("Error", "There has been an error.").split());
			}
		}
	};




	MiscEvent.EventLottery = function () {
		if (CAMELOT.store().lotto !== true) {
			if (Math.floor((Math.random() * 170000) + 1) == 1) {
				var win = Math.floor((Math.random() * 50000000) + 1000000);
				CAMELOT.post(new Notification("You won the lottery!".localize(), "WOW, You had the winning ticket. You won " + win.toLocaleString() + "Cr."));

				CAMELOT.store().lotto = true;
				return CAMELOT.gC().adjustCash(win, "Lottery");
			} else {
				return;
			}

		}
		GDT.off(evKey.weekProceeded, MiscEvent.EventLottery);
		return;
	};

	MiscEvent.Stolen = function () {
		if ( !(2 >= CAMELOT.gC().flags.evil)){return;}
		if (CAMELOT.store().stolen !== true) {
			if (Math.floor((Math.random() * 18000) + 1) != 1) {
				return;
			}
			if (CAMELOT.gC().staff.length == 1) {
				return;
			}
			var staffMember = CAMELOT.gC().staff.skip(1).pickRandom();
			var cash = CAMELOT.gC().cash;
			var stolen = cash * 0.05;
			if (stolen < 0) {
				return;
			}
			CAMELOT.post(new Notification("Stolen!".localize(), "Uh-oh, " + staffMember.name + " walked off with " + stolen.toLocaleString() + "Cr."));
			CAMELOT.post(new Notification(staffMember.name.localize(), staffMember.name + " left the company."));
			CAMELOT.gC().adjustCash((stolen * -1), "Stolen!");
			CAMELOT.gC().flags.fireEmployeeId = staffMember.id;
			DecisionNotifications.fireEmployee.complete(0);
			CAMELOT.store().stolen = true;
		}

		GDT.off(evKey.weekProceeded, MiscEvent.Stolen);
		return;

	};

	MiscEvent.BetterOffer = function () {
		if (CAMELOT.store().boRan !== true) {
			if (CAMELOT.gC().staff.length == 1) {
				return;
			}
			CAMELOT.post(betterOffer.getNotification(CAMELOT.gC()));
			CAMELOT.store().boRan = true;
		}
		GDT.off(evKey.contractFinished, MiscEvent.BetterOffer);
	};

	MiscEvent.BailOut = function () {
		if (CAMELOT.store().bailRan !== true) {
			if (CAMELOT.gC().staff.length == 1) {
				return;
			}
			if (Math.floor((Math.random() * 1500) + 1) != 1) {
				return;
			}

			CAMELOT.post(bailOut.getNotification(CAMELOT.gC()));
			CAMELOT.store().bailRan = true;
		}
		GDT.off(evKey.weekProceeded, MiscEvent.BailOut);
	};

	MiscEvent.runStartUp = function () {
		//Add Events
		GDT.addEvent(bailOut);
		GDT.addEvent(betterOffer);
		//Set Triggers
		GDT.on(evKey.contractFinished, MiscEvent.BetterOffer);
		GDT.on(evKey.weekProceeded, MiscEvent.EventLottery);
		GDT.on(evKey.weekProceeded, MiscEvent.Stolen);
		GDT.on(evKey.weekProceeded, MiscEvent.BailOut);
	};



})();