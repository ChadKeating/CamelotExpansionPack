(function () {
	var ready = function () {
		//Run CAMELOT start up functions
		CAMELOT.runStartUp();
		MiscEvent.runStartUp();
		Train.runStartUp();
		Debug.runStartUp();
		Specialism.runStartUp();
		MiscFeatures.runStartUp();
	
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
		//Load Gameplay
		'mods/Camelot/Gameplay/Specialism.js',
		'mods/Camelot/Gameplay/MiscFeatures.js',
		'mods/Camelot/Gameplay/Debug.js'
		], ready, error);
})();