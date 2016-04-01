Camelot2.MiscFeatures = {};
(function (self) {

	self.Init = function () {
		this.addGameExtentions();
		this.setGameEngineField();
		this.earlySequels();
	};

	self.addGameExtentions = function () {

		var findMe = document.getElementById("gameLengthSelection");
		var appendMe = document.createElement("option");

		appendMe.text = "50 Years (long)";
		appendMe.value = 1.66667;
		findMe.appendChild(appendMe);

		var findMe = document.getElementById("gameLengthSelection");
		var appendMe = document.createElement("option");
		appendMe.text = "60 Years (extra long)";
		appendMe.value = 2;

		findMe.appendChild(appendMe);
		var findMe = document.getElementById("gameLengthSelection");
		var appendMe = document.createElement("option");
		appendMe.text = "88 Years (1.21 gigawattz!)";
		appendMe.value = 2.93334;
		findMe.appendChild(appendMe);

		var findMe = document.getElementById("gameLengthSelection");
		var appendMe = document.createElement("option");
		appendMe.text = "100 Years (neverending story)";
		appendMe.value = 3.36667;
		findMe.appendChild(appendMe);

	};

	self.earlySequels = function () {
		var sequelsResearch = Research.Sequels;
		sequelsResearch.pointsCost = 5;
		sequelsResearch.devCost = 500;
		sequelsResearch.canResearch = function (c) { return c.gameLog.length > 1; };
	};

	self.setGameEngineField = function () {
		var keepme = UI._getElementForGameDetail;

		UI._getElementForGameDetail = function (game, avgReview) {
			var aret = keepme(game, avgReview);
			if (game.engine === null || game.engine === undefined) {
				aret.find('.gameDetailsEngine').text("None");
			} else {
				aret.find('.gameDetailsEngine').text(game.engine.name);
			}

			aret.find('.gameDetailsEngineLabel').css('position', 'absolute');
			aret.find('.gameDetailsEngineLabel').css('top', '172px');
			aret.find('.gameDetailsEngine').css('position', 'absolute');
			aret.find('.gameDetailsEngine').css('top', '175px');

			var mod = 30;
			var top = 172;
			var top2 = 175;
			aret.find('.gameDetailsReleaseWeekLabel').css('top', top += mod)
			aret.find('.gameDetailsReleaseWeek').css('top', top2 += mod);
			aret.find('.gameDetailsFansChangeLabel').css('top', top += mod)
			aret.find('.gameDetailsFansChange').css('top', top2 += mod);
			aret.find('.gameDetailsAvgReviewLabel').css('top', top += mod)
			aret.find('.gameDetailsAvgReview').css('top', top2 += mod);
			aret.find('.gameDetailsTopSalesRankLabel').css('top', top += mod)
			aret.find('.gameDetailsTopSalesRank').css('top', top2 += mod);

			return aret;
		};
	};

})(Camelot2.MiscFeatures);