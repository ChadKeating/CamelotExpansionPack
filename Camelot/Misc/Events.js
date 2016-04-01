Camelot2.Events = {};
(function (self) {
	var camelotEventPrefix = self.eventPrefix =  "Camelot2-Event-";

	self.Init = function () {
		Camelot2.Store().Events = {};
		Camelot2.Store().Events[bailOutId] = {};
		Camelot2.Store().Events[betterOfferId] = {};

		//Add Events
		GDT.addEvent(bailOut);
		GDT.addEvent(betterOffer);

		//Set Triggers
		GDT.on(GDT.eventKeys.gameplay.contractFinished, this.BetterOffer);
		GDT.on(GDT.eventKeys.gameplay.weekProceeded, this.BailOut);
	};

	var bailOutId = camelotEventPrefix + "BAILOUT";
	var bailOut = {
		id: bailOutId,
		isRandom: false,
		maxTriggers: 1,
		trigger: null,
		getNotification: function (company) {
			var eventData = Camelot2.Store().Events[bailOutId];
			var staffMember = GameManager.company.staff.skip(1).pickRandom();
			eventData.staffToBailOut = staffMember.id;
			var message = staffMember.name + " had a pretty wild night and landed himself in jail. Looks like he won't be joining us again unless you bail him out!".localize().format(staffMember.name);
			return new Notification({
				sourceId: bailOutId,
				header: "Bail!".localize(),
				text: message,
				options: ["Bail (5k.)", "Do Nothing"]
			});
		},
		complete: function (decision) {
			var eventData = Camelot2.Store().Events[bailOutId];
			var staffToBailOut = eventData.staffToBailOut;
			var staffMember = GameManager.company.staff.first(function (staff) {
				return staff.id == staffToBailOut;
			});
			switch (decision) {
				case 0:
					GameManager.company.adjustCash(-5000, "Bail");
					return GameManager.company.activeNotifications.addRange(new Notification("Bail Made".localize(), staffMember.name + " is a free man once again.".split()));
				case 1:
					GameManager.company.flags.fireEmployeeId = staffToBailOut;
					DecisionNotifications.fireEmployee.complete(0);
					return GameManager.company.activeNotifications.addRange(new Notification("Left in Jail".localize(), staffMember.name + " left the company.").split());
				default:
					return GameManager.company.activeNotifications.addRange(new Notification("Bail Out", "There has been an error.").split());
			}

		}
	};
	self.BailOut = function () {
		var eventData = Camelot2.Store().Events[bailOutId];
		if (!eventData.hasRun) {
			if (GameManager.company.staff.length < 2)
				return;

			if (Math.floor((Math.random() * 1500) + 1) !== 1)
				return;

			Camelot2API.postNotification(bailOut.getNotification(GameManager.company));
			eventData.hasRun = true;
		}
		GDT.off(GDT.eventKeys.gameplay.weekProceeded, this.BailOut);
	};

	var betterOfferId = camelotEventPrefix + "BETTER-OFFER";
	var betterOffer = {
		id: betterOfferId,
		isRandom: false,
		maxTriggers: 1,
		trigger: null,
		getNotification: function (company) {
			var eventData = Camelot2.Store().Events[betterOfferId];
			var staffMember = GameManager.company.staff.skip(1).pickRandom();
			var salary = staffMember.salary;
			var raise = salary * 0.3;
			eventData.staffWithBetterOffer = staffMember.id;
			var message = staffMember.name + " did such a good job on that last contract that they now want to hire him! He will stay for a " + raise.toLocaleString() + "Cr. raise.".localize().format(staffMember.name);
			return new Notification({
				sourceId: betterOfferId,
				header: "Better Offer...".localize(),
				text: message,
				options: ["Offer Raise", "Let Go"]
			});
		},
		complete: function (decision) {
			var eventData = Camelot2.Store().Events[betterOfferId];
			var staffWithBetterOffer = eventData.staffWithBetterOffer;
			var staffMember = GameManager.company.staff.first(function (staff) {
				return staff.id == staffWithBetterOffer;
			});
			var salary = staffMember.salary;
			switch (decision) {
				case 0:
					salary = salary * 1.3;
					return GameManager.company.activeNotifications.addRange(new Notification("Raise Given".localize(), staffMember.name + " is now being paid " + salary.toLocaleString() + "Cr. a month.").split());
				case 1:
					GameManager.company.flags.fireEmployeeId = staffWithBetterOffer;
					DecisionNotifications.fireEmployee.complete(0);
					return GameManager.company.activeNotifications.addRange(new Notification("Bye Bye".localize(), staffMember.name + " left the company.").split());

				default:
					return GameManager.company.activeNotifications.addRange(new Notification("Error", "There has been an error.").split());
			}
		}
	};

	self.BetterOffer = function () {
		var eventData = Camelot2.Store().Events[betterOfferId];
		if (!eventData.hasRun) {
			if (GameManager.company.staff.length < 2)
				return;
			Camelot2API.postNotification(betterOffer.getNotification(GameManager.company));
			eventData.hasRun = true;
		}
		GDT.off(GDT.eventKeys.gameplay.contractFinished, this.BetterOffer);
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot2.Events);