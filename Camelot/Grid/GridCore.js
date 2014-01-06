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
        var tenP = CAMELOT.gC().cash * 0.025;
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
		GridCore.salesOverride();
	};


    GridCore.salesOverride = function () {
		var keepme = General.proceedOneWeek;
		
		General.proceedOneWeek = function(company, fractionalWeek){
			
			var grid = company.flags.grid;
    		    		
    		company.flags.grid = false;

    		if (grid === true && company.getDate(company.currentWeek).week === 1 && company.currentWeek > 0) {
    			GridSales.calculateSales(company);
    		}

    		keepme(company, fractionalWeek);

    		company.flags.grid = grid;

    	};
    	
    };



})();