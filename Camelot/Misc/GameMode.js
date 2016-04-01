Camelot2.GameMode = {};
(function (self) {

	self.Init = function () {
		GameMode.addGameModeSelector();
		GameMode.setGameMode();
	};

	self.addGameModeSelector = function () {
		var draw = "";
		draw += '<div id="gameMode" class="centeredButtonWrapper">';
		draw += '<h2>Game Mode</h2>';
		draw += '</ br>';
		draw += '<select id="gmSelect" style="max-width: 250px">';
		draw += '<option value="normal" selected="selected">Normal</option>';
		draw += '<option value="oneman">One Man Machine</option>';
		draw += '</select>';
		draw += '<p>One Man Machine: Never leave the garage. How long can you keep up with everyone else.</p>';
		draw += '</div>';
		var findMe = document.getElementById("newGameView").getElementsByClassName("featureSelectionPanel featureSelectionPanelHiddenState")[0];
		findMe.innerHTML += draw;
	};

	self.setGameMode = function () {
		var cachedFunction = UI.closeNewGameView;
		var gameModeSetup = function () {
			var findMe = document.getElementById("gmSelect").value;

			switch (findMe) {
				case "oneman":
					Camelot2.Settings().moveToLevel2Trigger = DecisionNotifications.moveToLevel2.trigger;
					DecisionNotifications.moveToLevel2.trigger = null;
					break;
				case "normal":
					break;
			}
		};

		UI.closeNewGameView = function () {
			cachedFunction();
			gameModeSetup();
		};
	};

	self.setupOneManMachineMode = function () {
		DecisionNotifications.moveToLevel2.trigger = null;
	};

	self.setNormalMode = function () {
		var trigger = Camelot2.Settings().moveToLevel2Trigger;
		if (trigger)
			DecisionNotifications.moveToLevel2.trigger = trigger;
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot2.GameMode);