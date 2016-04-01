Camelot2.StartingMoney = {};
(function (self) {

	self.Init = function () {
		this.setupStartingMoneyNewGameOptions();
		this.setupStartingMoneyOverride();
		//GDT.on(GDT.eventKeys.gameplay.weekProceeded, this.stopNewOffice);
	};

	self.setupStartingMoneyNewGameOptions = function () {
		var draw = "";
		draw += '<div id="startingMoney" class="centeredButtonWrapper">';
		draw += '<h2>Starting Money</h2>';
		draw += '</ br>';
		draw += '<select id="moneySelect" style="max-width: 250px">';
		draw += '<option value="0">40k.</option>';
		draw += '<option value="1" selected>70k.*</option>';
		draw += '<option value="2">100k.</option>';
		draw += '<option value="3">250k.</option>';
		draw += '<option value="4">500k.</option>';
		draw += '<option value="5">1M.</option>';
		draw += '<option value="6">10M.</option>';
		draw += '<option value="7">100M.</option>';
		draw += '</select>';
		draw += '<p>*Default amount of money</p>';
		draw += '</div>';
		var findMe = document.getElementById("newGameView").getElementsByClassName("featureSelectionPanel featureSelectionPanelHiddenState")[0];
		findMe.innerHTML += draw;
	};

	self.setupStartingMoneyOverride = function () {
		var currentFunction = UI.closeNewGameView;
		var setupStartingMoney = function () {
			var moneySetting = document.getElementById("moneySelect").value;
			//GameManager.company.flags.lastMoveUpLevelQ = true;
			switch (findMe) {
				case "0":
					GameManager.company.cash = 4E4;
					console.log("setMoney 0");
					break;
				case "1":
					//c = 7E4;
					console.log("setMoney 1");
					break;
				case "2":
					GameManager.company.cash = 1E5;
					console.log("setMoney 2");
					break;
				case "3":
					GameManager.company.cash = 25E4;
					console.log("setMoney 3");
					break;
				case "4":
					GameManager.company.cash = 5E5;
					console.log("setMoney 4");
					break;
				case "5":
					GameManager.company.cash = 1E6;
					console.log("setMoney 5");
					break;
				case "6":
					GameManager.company.cash = 1E7;
					console.log("setMoney 6");
					break;
				case "7":
					GameManager.company.cash = 1E8;
					console.log("setMoney 7");
					break;
			}
		};

		UI.closeNewGameView = function () {
			currentFunction();
			setupStartingMoney();
			//Camelot2.Store().sNOc = 0
		};

	};

	self.stopNewOffice = function () {
		if (Camelot2.Store().sNOc !== 1) { Camelot2.Store().sNOc += 1; return; }
		if (Camelot2.Store().NOrunonce !== true) {
			GameManager.company.flags.lastMoveUpLevelQ = false;
			Camelot2.Store().NOrunonce = true;
		}
		GDT.off(GDT.eventKeys.gameplay.weekProceeded, StartingMoney.stopNewOffice);
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot2.StartingMoney);