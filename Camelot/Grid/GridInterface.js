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
		'<div class="budgetDurationPreviewContainer">'+
             '<div class="budgetDurationPreviewTitle">Budget Allocation</div>'+
             '<div class="budgetDurationPreviewWrapper ul-vt-bar">'+
             	'<div class="budgetDurationPreview newConPreview ul-vt-bar-left"></div>'+
                '<div class="budgetDurationPreview marketPreview"></div>'+
                '<div class="budgetDurationPreview mainPreview ul-vt-bar-right"></div>'+
             '</div>'+
        '</div>'+
		'<div class="centeredButtonWrapper" style="margin-top: 20px">' +
			'<h2>Expenditure Cost: </h2><h2 id="gridExpendCost">0 Cr.</h2>' +
			'<div id="expenditureSlider" class="volumeSlider"></div>' +
			'</div>' +
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
		if (GameManager.company.flags.grid === true && screen == "primary") {
		buttonArray.push({
			label: "Grid...".localize("menu item"),
			action: function () {
				Sound.click();
				GridInterface.showGridWindow();
			}
		});
		}
	};

	GridInterface.showGridWindow = function () {

		var draw = $('#gridInterface');
		GridInterface.updateFocusPreview();
        draw.scrollTop();
        draw.gdDialog({
            popout: !0,
            close: !0,
            onClose: function () {
                GameManager.togglePause();
            },
            onOpen: function() {
                GameManager.togglePause();
                GameManager.resume(!0);
            }
        });

        draw.find("#gridExpendCost").html(UI.getShortNumberString(Camelot2.Store().gridExpend) + " Cr.");

        draw.find("#expenditureSlider").slider({
			min: 0,
			max: 100,
			range: "min",
			value: GridCore.expPer(),
			animate: false,
			slide: function (a, b) {
				var c = b.value;
                GridCore.updateGridCost(c);
                delayUpdate();
                //GridInterface.updateFocusPreview();
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
				delayUpdate();
				//GridInterface.updateFocusPreview();
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
				delayUpdate();
				//GridInterface.updateFocusPreview();
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
				delayUpdate();
				//GridInterface.updateFocusPreview();
			}
		});

	};

	GridInterface.updateFocusPreview = function() {
		wa = GridInterface.budgetWeightings();
		
		nc = wa[0];
		mk = wa[1];
		mn = wa[2];
		
		f = $(".budgetDurationPreviewWrapper");
		
		a = $(".newConPreview");
		b = $(".marketPreview");
		c = $(".mainPreview");
		
		w = 524 * (GridCore.expPer()/100);
		
		a.width(nc / 100 * w);
		b.width(mk / 100 * w);
		c.width(mn / 100 * w);
	};
	
	GridInterface.budgetWeightings = function(){
		
		var featureWeighting = [GridCore.ncPer(), GridCore.markPer(), GridCore.mainPer()];
		
		var minValuePerFeature = 1;
		
		var total = featureWeighting.sum();
		
		if (total == 0){ return [100 / 3, 100 / 3, 100 / 3];
		}
		
		var finalValues = featureWeighting.map(function (v) {
					return v / (total / (100 - minValuePerFeature * 3)) + minValuePerFeature;
				});
		
		return finalValues;
	};
	
	
	function delayUpdate() {
		GameManager.addTickListener(GridInterface.updateFocusPreview, false);
	};
	


	GridInterface.runStartUp = function () {
		GridInterface.setGridWindow();
	};

})();
