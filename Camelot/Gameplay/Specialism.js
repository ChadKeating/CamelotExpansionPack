/*
 * Version: 0.1.0
 * Description: Specialism addon for Camelot
 *
 */
var Specialism = {};

(function () {
	Specialism.addSpecialismOption = function () {
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
	Specialism.setSpecialism = function () {
		var keepMe = UI.closeNewGameView;
		var inputMe = function () {
			var findMe = document.getElementById("spSelect").value;
			switch (findMe) {
			case "design":
				CAMELOT.gC().staff[0].designFactor += (0.3);
				CAMELOT.gC().staff[0].technologyFactor -= (0.1);
				break;
			case "tech":
				CAMELOT.gC().staff[0].technologyFactor += (0.3);
				CAMELOT.gC().staff[0].designFactor -= (0.1);
				break;
			case "normalPlus":
				CAMELOT.gC().staff[0].technologyFactor += (0.15);
				CAMELOT.gC().staff[0].designFactor += (0.15);
				break;
			case "normal":
				break;
			default:
				console.log("Special Errored");
				break;
			}
                //CAMELOT.store().specialismSet = true;
		};

		UI.closeNewGameView = function () {
			keepMe();
			inputMe();
		};

	};

	Specialism.runStartUp = function () {
		Specialism.addSpecialismOption();
		Specialism.setSpecialism();
	};

})();