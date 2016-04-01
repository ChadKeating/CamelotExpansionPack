var Camelot2API = {};
(function (self) {

	self.Init = function () {
	};

	//Special Research
	self.addSpecialResearch = function (research) {
		if (!this.isNoSpecialResearchConflicts(research))
			console.log("Research conflict for: " + research.id);
		return;
		Research.SpecialItems.push(research);
	};

	self.isNoSpecialResearchConflicts = function (research) {
		return (Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost', 'category', 'categoryDisplayName']) && Checks.checkUniqueness(research, 'id', Research.getAllItems()));
	};

	//Big Lab Research
	self.addBigLabResearch = function (research) {
		if (!this.isNoBigLabResearchConflicts(research)) {
			console.log("Research conflict for: " + research.id);
		}
		Research.bigProjects.push(research);
	};

	self.isNoBigLabResearchConflicts = function (research) {
		return (Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'iconUri', 'description']) && Checks.checkUniqueness(research, 'id', Research.getAllItems()));
	};

	//Notifications
	self.newNotification = function (title, message) {
		var notification = new Notification(title, message);
		this.postNotification(notification);
	};

	self.postNotification = function (notification) {
		GameManager.company.notifications.push(notification);
	};

	//Context Buttons
	self.setContextButtons = function () {
		var contextMenu = UI._showContextMenu;
		var that = this;
		UI._showContextMenu = function (type, menuItems, x, y) {
			that.addContextButtons(type, menuItems);
			contextMenu(type, menuItems, x, y);
		};
	};

	var camelotContextButtons = [];

	self.addContextButtons = function (type, menuItems) {
		for (var i = 0; i < camelotContextButtons.length; i++) {
			var contextButton = camelotContextButtons[i];
			if (contextButton.canShow(type))
				menuItems.push(contextButton);
		}
	};

	self.addContextButton = function (label, action, canShow) {
		camelotContextButtons.push({
			label: label,
			action: function () {
				Sound.click();
				action();
			},
			canShow: canShow
		});
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot2API);