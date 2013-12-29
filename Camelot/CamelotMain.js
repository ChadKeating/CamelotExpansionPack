(function () {
	var ready = function () {
		//Run CAMELOT start up functions
		CAMELOT.runStartUp();
		MiscEvent.runStartUp();
		Train.runStartUp();
		Debug.runStartUp();
		Specialism.runStartUp();
		MiscFeatures.runStartUp();
        StartingMoney.runStartUp();
		//Grid
		GridInterface.runStartUp();
        GridCore.runStartUp();
	};

	var error = function () {
	};

	GDT.loadJs([
		//Load API
		'mods/gdt-modAPI/api/events.js',
		//Load Core
		'mods/Camelot/CamelotCore.js',
		//Load Staff
		'mods/Camelot/Staff/Train.js',
		//Load Story
		'mods/Camelot/Story/MiscEvent.js',
		//Load Grid
		'mods/Camelot/Grid/GridInterface.js',
        'mods/Camelot/Grid/GridCore.js',
		//Load Gameplay
		'mods/Camelot/Gameplay/Specialism.js',
		'mods/Camelot/Gameplay/MiscFeatures.js',
        'mods/Camelot/Gameplay/StartingMoney.js',
		'mods/Camelot/Gameplay/Debug.js'
		], ready, error);
})();