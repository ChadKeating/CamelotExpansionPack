var Camelot2 = {};
(function (self) {

	self.InitListeners = [];

	self.Init = function () {
		console.log("Init Started");
		this.overrideGetShortNumberString();

		for (var i = 0; i < this.InitListeners.length; i++) {
			var listener = this.InitListeners[i];
			if (listener.Init)
				listener.Init();
		}
		console.log("Init Finished");
	};

	self.LoadError = function () {
		console.log("Camelot 2 Failed to load");
	};

	self.Store = function () {
		return GDT.getDataStore("Camelot2").data;
	};
	self.Settings = function () {
		return GDT.getDataStore("Camelot2").settings;
	};

	self.overrideGetShortNumberString = function () {
		UI.getShortNumberString = function (number) {
			var abNum = Math.abs(number);
			if (abNum >= 1E24)
				return "{0}SP".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E24, 1)));
			else if (abNum >= 1E21)
				return "{0}SX".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E21, 1)));
			else if (abNum >= 1E18)
				return "{0}QT".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E18, 1)));
			else if (abNum >= 1E15)
				return "{0}QD".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E15, 1)));
			else if (abNum >= 1E12)
				return "{0}T".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E12, 1)));
			else if (abNum >= 1E9)
				return "{0}B".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E9, 1)));
			else if (abNum >= 1E6)
				return "{0}M".format(UI.getLongNumberString(Math.roundToDecimals(number / 1E6, 1)));
			else if (abNum >= 1E3)
				return "{0}K"
			else if (abNum < 1E3)
				return Math.roundToDecimals(number, 1);
		};
	};

	GDT.loadJs([
		"Camelot2API.js",
		"Misc/Events.js",
		"Misc/MiscFeatures.js",
		"Misc/StaffTrainer.js",
		"Misc/Specialism.js",
		"Misc/GameMode.js",
		"Misc/StartingMoney.js",
		"Misc/Debug.js"
		
	], Camelot2.Init, Camelot2.LoadError);

})(Camelot2API);