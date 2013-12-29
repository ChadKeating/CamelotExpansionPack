/*
 * Description: Core Methods for the Stock Market
 * 
 */
var SMCore = {};
(function () {
	
	var evKey = GDT.eventKeys.gameplay;
	
	SMCore.getStockPrice = function (){
		
		var stockPrice; // StockPrice = 
						// (company's earnings*company's constant growth rate/(company's risk adjusted discount rate*company's risk adjusted discount rate))+
						// (company's dividend payment/company's risk adjusted discount rate)
		
		var com = CAMELOT.gC();
		var staff = com.staff.length; // 1 - 7
		
		var lastGame = com.gameLog.last();
		var gRating = Math.floor(lastGame.score);
		
		var earning = com.cash;
		var prevEarn = CAMELOT.store().SMearnings;
		var growth = earning - prevEarn;	
		var stockMod = CAMELOT.store().SMstockMod; //0.01-1 Default: 1
		var risk = SMCORE.getRisk(gRating);
		
		stockPrice = (((growth*staff)/ ((risk*risk)+(staff/risk)))/SMCore.getStockAmount())*stockMOd;
		
		return stockPrice;
		
	};
	
	
	SMCore.setEarnings = function () {
		CAMELOT.store().SMearnings = CAMELOT.gC().cash;
		
	}; 
	
	SMCore.companyWorth = function (){
		
		var enginePrice = CAMELOT.gC().gameLog.last().engine.costs;
		var earnings = CAMELOT.store().SMearnings;
		var staff = CAMELOT.gC().staff.length;
		var stockP = SMCore.getStockPrice();
		var stockA = SMCore.getStockAmount();
		
		var worth =;
		
		
		return UI.getShortNumberString(worth);
	};

	SMCore.getRisk = function (rate){
		switch (true){
			case (rate >= 9):
				return 1;
			case (rate >= 8):
				return 1.5;
			case (rate >= 7):
				return 2;
			case (rate >= 6):
				return 3;
			case (rate >= 5):
				return 4;
			case (rate < 5):
				return 5;
			default:
				console.log("getRisk Error");
				return 1;
		};
				
	};
	
	SMCore.runStartUp = function(){
    	GDT.on(evKey.weekProceeded, SMCore.setEarnings);
		
	};
	
})();