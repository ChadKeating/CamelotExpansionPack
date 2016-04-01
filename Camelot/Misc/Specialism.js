Camelot2.Specialism = {};
(function (self) {

	self.Init = function () {
		this.addSpecialismOption();
		this.setSpecialism();
	};

	self.setupSpecialismNewGameOptions = function () {
		var draw = "";
		draw += '<div id="specialism" class="centeredButtonWrapper">';
		draw += '<h2>Specialism</h2>';
		draw += '</ br>';
		draw += '<select id="spSelect" style="max-width: 250px">';
		draw += '<option value="design">Design++</option>';
		draw += '<option value="normal" selected="selected">Normal</option>';
		draw += '<option value="normalPlus">Normal+</option>';
		draw += '<option value="tech">Technology++</option>';
		draw += '</select>';
		draw += '<p>Increase your abilities at the start of the game</p>';
		draw += '</div>';
		var findMe = document.getElementById("newGameView").getElementsByClassName("featureSelectionPanel featureSelectionPanelHiddenState")[0];
		findMe.innerHTML += draw;
	};

	self.setupSpecialismOverride = function () {
		var currentFunction = UI.closeNewGameView;
		var setupSpecialism = function () {
			var findMe = document.getElementById("spSelect").value;
			switch (findMe) {
				case "design":
					GameManager.company.staff[0].designFactor += (0.3);
					GameManager.company.staff[0].technologyFactor -= (0.1);
					break;
				case "tech":
					GameManager.company.staff[0].technologyFactor += (0.3);
					GameManager.company.staff[0].designFactor -= (0.1);
					break;
				case "normalPlus":
					GameManager.company.staff[0].technologyFactor += (0.15);
					GameManager.company.staff[0].designFactor += (0.15);
					break;
				case "normal":
					break;
			}
		};

		UI.closeNewGameView = function () {
			currentFunction();
			setupSpecialism();
		};
	};

	Camelot2.InitListeners.push(self.Init);
})(Camelot2.Specialism);