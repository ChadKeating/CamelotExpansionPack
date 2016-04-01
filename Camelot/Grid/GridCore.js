Camelot2.Grid = {};
Camelot2.Grid.Core = {};
(function (self) {

	self.Init = function () {
		this.setGridValues();
		this.salesOverride();
	};

	self.setGridValues = function () {
		var s = Camelot2.Store();
		if (s.gridSet === true) { return; }
		s.gridNewCPer = 50;
		s.gridMarkPer = 25;
		s.gridMainPer = 50;
		s.gridExpenditure = 0;
		s.gridExpPer = 0;
		s.gridSet = true;
	};

	//Slider updates
	self.updateGridCost = function (value) {
		var value = value;
		var tenP = GameManager.company.cash * 0.025;
		var ex = tenP * (value / 100);
		Camelot2.Store().gridExpPer = value;
		Camelot2.Store().gridExpend = ex;
		$("#gridInterface").find("#gridExpendCost").html(UI.getShortNumberString(ex) + " Cr.");
	};
	self.updateNCCost = function (value) {
		Camelot2.Store().gridNewCPer = value;
	};
	self.updateMarkCost = function (value) {
		Camelot2.Store().gridMarkPer = value;
	};
	self.updateMainCost = function (value) {
		Camelot2.Store().gridMainPer = value;
	};

	//Percentage Values/Slider Values
	self.expPer = function () {
		return Camelot2.Store().gridExpPer;
	};
	self.ncPer = function () {
		return Camelot2.Store().gridNewCPer;
	};
	self.markPer = function () {
		return Camelot2.Store().gridMarkPer;
	};
	self.mainPer = function () {
		return Camelot2.Store().gridMainPer;
	};

	self.salesOverride = function () {
		var currentFunction = General.proceedOneWeek;
		General.proceedOneWeek = function (company, fractionalWeek) {
			if (company.flags.grid == true &&
				company.getDate(company.currentWeek).week == 1 &&
				company.currentWeek > 0) {
				Camelot2.Grid.Sales.calculateSales(company);
			}
			currentFunction(company, fractionalWeek);
		};
	};

	Camelot2.InitListeners.push(self.Init);
})();