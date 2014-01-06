var GridSales = {};
(function () {


/*

Equation notey-note note notes

More NewContent =  More "potential revenue"

Game log sales 1% = Base potential revenue

NewContent(randomised) Potential Revenue

TPR

Potential revnue  -modifier affected by maintenence, affect by amount of games made 
                  +modifier affected by marketing, affected by fans.
             
 */ 

	GridSales.calculateSales = function(company){
		
			if (!(company.gameLog.length >= 1)){ return; }
			
			var bw = GridInterface.budgetWeightings(); // nc mark main
			var ex = CAMELOT.store().gridExpend; // Grid expenditure cash
			
			var ncPer = bw[0]/100;		// Percentage of New Content
			var markPer = bw[1]/100;	// += % of Marketing
			var mainPer = bw[2]/100;	// -= % of Maintenence
			
			var ncEx = calculateNewContentExp(ncPer, ex);  	// New Content Expendititure
			var markEx = calculateMarketExp(markPer, ex);  // Marketing expend
			var mainEx = calculateMainExp(mainPer, ex); 	// Maintenence expend
			
			var totRev = totalRevenue(); // Total up revenue of all games.
			
			var fans = company.fans;
			
			var potInc = totRev * 0.0025;	// 0.25% of all revenue from games is base potential income
						
			potInc += calculateNewContent(ncEx) * GridSales.newContentMod();
			
			potInc += 5*((fans*0.1)*markPer);
			potInc *= (1 - mainPer); // New Content sales. + Marketing Mod - Maintenence Mod
			
			var lastWeek = CAMELOT.store().lastWeekPotInc; // Get last weeks potential income
			
			// Return Income and Expenditure for the week
			if (lastWeek > 0){ 
					company.adjustCash(lastWeek,"Grid Income"); //Check potential income is not null/undefined.
				}
				
			if (ex >= 0) { 
				company.adjustCash(ncEx*-1,"Grid Maintenece");
				company.adjustCash(markEx*-1,"Grid Marketing");
				company.adjustCash(mainEx*-1,"Grid Content");
				
				lastWeek = Math.floor(potInc); // Store this weeks potential income for next week.
				CAMELOT.store().lastWeekPotInc = lastWeek;
			}
			
	};
	
	GridSales.newContentMod = function () {
	    var a = CAMELOT.store().ncMod;
	    if (a > 0) { return a; }
	    CAMELOT.store().ncMod = 1;
	    return CAMELOT.store().ncMod; 
	}

	function calculateNewContentExp(nc, ex){
		if (nc == 0) { return nc; }
		//nc = UltimateLib.Utils.getFormattedNumber(nc);
		return ex * nc;
	};
	
	function calculateMarketExp(mark, ex){
		if (mark == 0) { return mark; }
		//mark = UltimateLib.Utils.getFormattedNumber(mark);
		return ex * mark;
	};
	
	function calculateMainExp(main, ex){
		if (main == 0) { return main; }
		//main = UltimateLib.Utils.getFormattedNumber(main);
		return ex * main;
	};
	
	function calculateNewContent(nex){
		
		var nc = Math.floor(nex * (CAMELOT.gC().gameLog.length / 10000)); // New Content amount NCSpending * ((amount of games already made) / 1000)
		
		if (nc < 5) { nc = 5; } // Check at least five new products are potential available.
		
		nc = Math.floor((Math.random() * nc) + 1); // Generate new product amounts
			
		var newgames = [];
		
		for (var i = 0; i < nc; i++) {
			newgames.push(Math.floor((Math.random() * 11) + 1)); // Create scores for each new product
		}
		
		var ncTot = 0;
		nex /= 20;
		for (var i = 0; i < newgames.length; i++) {
			ncTot += nex * (newgames[i]/10); // Calculate income from new content base on ratings.
		}
		
		return Math.floor(ncTot);
	};


	function totalRevenue() {
		var totRev = 0;				// Total Revenue of all games
		for (var i = 0; i < CAMELOT.gC().gameLog.length; i++) {
			totRev += CAMELOT.gC().gameLog[i].revenue; // Add up revenue of all games.
		}
		return totRev;
	};




})();