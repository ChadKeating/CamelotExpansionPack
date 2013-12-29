/*
 * Version: 0.1.0
 * Description: Core functions of the Grid Expansion Module
 *
 */
var GridCore = {};
(function () {
    //Intialise variables
	GridCore.setGridValues = function () {
		var s = CAMELOT.store();
		if (s.gridSet === true) {return;}
		s.gridNewCPer = 50;
		s.gridMarkPer = 25;
		s.gridMainPer = 50;
		s.gridExpenditure = 0;
		s.gridExpPer = 0;
		s.gridSet = true;
	};

    //Slider updates
	GridCore.updateGridCost = function (value){
        var value = value;
        var tenP = CAMELOT.gC().cash * 0.1;
		var ex = tenP * (value/100);
		CAMELOT.store().gridExpPer = value;
		CAMELOT.store().gridExpend = ex;
        $("#gridInterface").find("#gridExpendCost").html(UI.getShortNumberString(ex) + " Cr.");
    };
	GridCore.updateNCCost = function (value){
		CAMELOT.store().gridNewCPer = value;
	};
	GridCore.updateMarkCost = function (value){
		CAMELOT.store().gridMarkPer = value;
	};
	GridCore.updateMainCost = function (value){
		CAMELOT.store().gridMainPer = value;
	};

    //Percentage Values/Slider Values
    GridCore.expPer = function () {
        return CAMELOT.store().gridExpPer;
    };
	GridCore.ncPer = function () {
		return CAMELOT.store().gridNewCPer;
	};
	GridCore.markPer = function () {
		return CAMELOT.store().gridMarkPer;
	};
	GridCore.mainPer = function () {
		return CAMELOT.store().gridMainPer;
	};
	
	
	GridCore.runStartUp = function () {
		GridCore.setGridValues();
	};

/*
    GridCore.salesOverride = function () {
        if (CAMELOT.gC().flags.grid) {
            var availablePlatforms = Platforms.getPlatformsOnMarket(CAMELOT.gC());
            var maxShare = Platforms.getMarketSizeForWeek(availablePlatforms.first(function (p) { return p.id === "PC" }), CAMELOT.gC().currentWeek, CAMELOT.gC(), true);
            var maxId = "PC";
            var customPlatforms = availablePlatforms.filter(function (p) {
                return p.isCustom
            });
            for (var i = 0; i < customPlatforms.length; i++) {
                var currentMax = Platforms.getMarketSizeForWeek(customPlatforms[i], CAMELOT.gC().currentWeek, CAMELOT.gC(), true);
                if (currentMax > maxShare) {
                    maxShare = currentMax;
                    maxId = customPlatforms[i].id
                }
            }
            var maxPlatform = availablePlatforms.first(function (p) {
                return p.id === maxId
            });

            var gridOI = Platforms.getTotalMarketSizePercent(maxPlatform, GameManager.company) / 100 * 2E6;

            var gridIncome =  gridOI + GridCore.calculateSales(gridOI);
            CAMELOT.gC().adjustCash(gridIncome, "Grid income".localize("heading"));
        }
    };

    GridCore.calculateSales = function (gridOI) {
        var nc = GridCore.ncPer();
        var mark = GridCore.markPer();
        var main = GridCore.mainPer();
        var exp = GridCore.expPer();

    };
*/

})();