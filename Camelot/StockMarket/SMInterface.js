/*
 * Description: Interface Methods for the Stock Market
 * 
 */
var SMIterface = {};
(function () {
	
	GridInterface.setGridWindow = function () {
		var setSMWindow = '' +
			'<div id="setSMWindow" class="windowBorder tallWindow" style="overflow:auto;display:none;>' +
			'<div class="windowTitle smallerWindowTitle">Stock Market</div>' +

			'</div>';
		var findme = document.getElementById("resources");
		findme.innerHTML += smHtml;
		/*
		var header  = document.getElementsByTagName('head')[0];
		var linkme  = document.createElement('link');
                linkme.id   = "gridCss"; linkme.rel  = 'stylesheet'; linkme.type = 'text/css';
                linkme.href = 'mods/Camelot/Grid/html/grid.css'; //linkme.media = 'all';
                header.appendChild(linkme);
 */
		
		
	};
	
	
	SMIterface.addButton = function (screen, buttonArray) {
		if (GameManager.company.flags.grid === true && screen == "primary") {
			buttonArray.push({
				label: "Stock Market...".localize("menu item"),
				action: function () {
					Sound.click();
					SMIterface.showMarket();
				}
			});
		}
	};
	
	
	SMIterface.showGrid = function () {
		
		var draw = $('#smIterface');
		
		draw.css('width', 600);
		 
		draw.scrollTop();
		draw.gdDialog({
			popout: !0,
			close: !0,
			onClose: function () {
				GameManager.togglePause();
			},
			onOpen: function () {
				GameManager.togglePause();
			}
		});
	};

	
	
	SMIterface.runStartUp = function () {
		SMIterface.setSMWindow();
	};

	
	
	
})();