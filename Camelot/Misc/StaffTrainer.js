Camelot2.StaffTrainer = {};
(function (self) {

	self.EventTrain = function () {

		var allStaff = GameManager.company.staff;
		for (var i = 0; i < allStaff; i++) {
			if (Math.floor((Math.random() * 4) + 1) != 1)
				continue;

			var staffMember = allStaff[i];

			var stat = Math.floor((Math.random() * 4) + 1);

			var changePercent = 0.01;
			switch (stat) {
				case 1:
					var change = Math.round(staffMember.designFactor * changePercent);
					staffMember.designFactor += change;
					stat = "Design";
					break;
				case 2:
					var change = Math.round(staffMember.technologyFactor * changePercent);
					staffMember.technologyFactor += change;
					stat = "Technology";
					break;
				case 3:
					var change = Math.round(staffMember.speedFactor * changePercent);
					staffMember.speedFactor += change;
					stat = "Speed";
					break;
				case 4:
					var change = Math.round(staffMember.researchFactor * changePercent);
					staffMember.researchFactor += change;
					stat = "Research";
					break;
			}

			var game = GameManager.company.gameLog.last();
			var message = "Whilst working on {0}, {1} improved their {2} ability by {3}!".format(game.title, staffMember.name, stat, statAmount);
			Camelot2API.newNotification("Staff Improved!", message);
		}
	};

	self.Init = function () {
		GDT.on(GDT.eventKeys.gameplay.afterReleaseGame, this.EventTrain);
	};

	Camelot2.InitListeners.push(self.Init);

})(Camelot2.StaffTrainer);