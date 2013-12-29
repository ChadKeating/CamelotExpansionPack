/*
 * Version: 0.1.0
 * Description: Collection of core functions for the modules in the camelot expansion.
 *
 */
var GridInterface = {};
(function () {

	GridInterface.setGridWindow = function () {

		var gridHtml = '' +
			'<div id="gridInterface" class="windowBorder tallWindow" style="overflow:none;display:none;">' +
		'<div id="gridInterfaceOverlay"></div>' +
			'<div id="gridInterfaceContent">' +
			'<div id="gridInterfaceTitle" class="windowTitle smallerWindowTitle">Grid Budget</div>' +
			'<div class="focusSliderContainer">' +
			'<div class="focusSliderWrapper newCon">' +
			'<div id="newCon" class="focusSlider newCon"></div>' +
			'<div class="focusSliderTitle">New Content</div>' +
		'</div>' +
		'<div class="focusSliderWrapper market">' +
			'<div id="market" class="focusSlider market"></div>' +
			'<div class="focusSliderTitle">Marketing</div>' +
		'</div>' +
			'<div class="focusSliderWrapper main">' +
			'<div id="main" class="focusSlider main"></div>' +
			'<div class="focusSliderTitle">Maintenance</div>' +
		'</div>' +
			'</div>' +
			'</div>' +
		'<div class="centeredButtonWrapper" style="margin-top: 20px">' +
			'<h2>Expenditure Cost: </h2><h2 id="gridExpendCost">0 Cr.</h2>' +
			'<div id="expenditureSlider" class="volumeSlider"></div>' +
			'</div>' +
            /*
			'<div class="centeredButtonWrapper" style="margin-bottom: 20px">' +
			'<div class="selectorButton windowMainActionButton orangeButton windowLargeOkButton" onclick="UI.closeModal()">Close</div>' +
			'</div>' +
			*/
		'</div>' +
			'</div>';

		$("body").append(gridHtml);
		var importme = document.createElement('link');
        importme.id = 'gridCss';
        importme.rel = 'stylesheet';
        importme.type = 'text/css';
        importme.href = 'mods/Camelot/Grid/html/grid.css';
        document.getElementsByTagName('head')[0].appendChild(importme);

	};

	GridInterface.addButton = function (screen, buttonArray) {
		//if (GameManager.company.flags.grid === true && screen == "primary") {
		buttonArray.push({
			label: "Grid...".localize("menu item"),
			action: function () {
				Sound.click();
				GridInterface.showGridWindow();
			}
		});
		//}
	};

	GridInterface.showGridWindow = function () {

		var draw = $('#gridInterface');
        draw.scrollTop();
        draw.gdDialog({
            popout: !0,
            close: !0,
            onClose: function () {
                GameManager.togglePause();
            },
            onOpen: function() {
                GameManager.togglePause();
            }
        });

        draw.find("#gridExpendCost").html(UI.getShortNumberString(CAMELOT.store().gridExpend) + " Cr.");

        draw.find("#expenditureSlider").slider({
			min: 0,
			max: 100,
			range: "min",
			value: GridCore.expPer(),
			animate: false,
			slide: function (a, b) {
				var c = b.value;
                GridCore.updateGridCost(c);
			}
		});

        draw.find("#newCon").slider({
			orientation: "vertical",
			min: 0,
			max: 100,
			range: "min",
			value: GridCore.ncPer(),
			animate: false,
			slide: function (a, b) {
				var c = b.value;
				GridCore.updateNCCost(c);
			}
		});

        draw.find("#market").slider({
			orientation: "vertical",
			min: 0,
			max: 100,
			range: "min",
			value: GridCore.markPer(),
			animate: false,
			slide: function (a, b) {
				var c = b.value;
				GridCore.updateMarkCost(c);
			}
		});

        draw.find("#main").slider({
			orientation: "vertical",
			min: 0,
			max: 100,
			range: "min",
			value: GridCore.mainPer(),
			animate: false,
			slide: function (a, b) {
				var c = b.value;
				GridCore.updateMainCost(c);
			}
		});

	};

	GridInterface.runStartUp = function () {
		GridInterface.setGridWindow();
	};

})();