/**
* @class Dialog
* @module UltimateLib
* @main UltimateLib
* @namespace UltimateLib
* @requires Base,Core,Logger
* @author Francesco Abbattista (alphabit) and Mathieu Dumoulin (crazycodr)
* @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
* @constructor
* @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
* @beta
*/

UltimateLib.Dialog = (function (self) {
	// Show up in console
	UltimateLib.Logger.log("UltimateLib.Dialog loading...");

	/**
     * @method createButton
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog button. Additional element names will be automatically extended as required.  
     * @param {String} text Text (Title) of the button
     * @param {String|Integer} width The width of the button  (as integer or css string)
     * @param {String|Integer} height The height of the button  (as integer or css string)
     * @param {String|Function} onclick A string or a function indicating the callback function to call (i.e. UI.myCallBackOnUIClick)
    */
	self.createButton = function (name, text, width, height, onclick) {
		var el = $(document.createElement('div'));

		el.addClass('selectorButton whiteButton');
		el.css({ display: 'inline-block', position: 'relative', marginLeft: '50px', width: width, height: height });
		el.attr({ id: name });

		if (typeof (onclick) == 'function') {
			$(el).on('click', onclick);
		}
		else {
			el.attr({ id: name, onclick: onclick });
		}
		el.text(text);

		return el;
	};

	/**
     * @method createSection
     * @description Creates a dialog section and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Section", "SectionTitle", etc.  
     * @param {String} text Text (Title) of the section label
     * @param {Array} buttons An array of buttons to show in the dialog section (use createButton to create each button)  
    */
	self.createSection = function (name, text, buttons) {
		var idSection = name + "Section";
		var idSectionTitle = name + "SectionTitle";

		var section = $(document.createElement('div'));
		section.attr({ id: idSection });

		var label = $(document.createElement('div'));
		label.css({ textAlign: 'center', marginLeft: '50px', width: '450px' });
		label.attr({ id: idSectionTitle });
		label.text(text);
		label.appendTo(section);

		for (var i = 0; i < buttons.length; i++) {
			buttons[i].appendTo(section);
		}

		return section;
	};

	/**
     * @method createDialog
     * @description Creates a dialog and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Modal", "Container", etc.  
     * @param {String} text Text (Title) of the dialog
     * @param {Array} sections An array of sections to show on the dialog (use createSection to create each section)  
    */
	self.createDialog = function (name, text, sections) {
		var idModalDialog = name + "Modal";
		var idDialogContainer = name + "Container";
		var idTop = name + "Top";

		// Modal dialog for a GDT dialog -->
		var modal = $(document.createElement('div'));
		modal.attr({ id: idModalDialog });
		modal.addClass('ow-overlay ow-closed');

		// Container for a modal dialog
		var container = $(document.createElement('div'));
		container.attr({ id: idDialogContainer });
		container.addClass('windowBorder tallWindow');
		container.css({ overflow: 'auto', display: 'none' });

		var scrolltop = $(document.createElement('div'));
		scrolltop.attr({ id: idTop });
		scrolltop.addClass('windowTitle smallerWindowTitle');
		scrolltop.text(text);
		scrolltop.appendTo(container);

		$.each(sections, function (i, v) {
			self.addSection(container, v);
		});

		//Add the poweredby
		return container;
	};

	/**
    * @method clearSections
    * @description Removes all sections from the specified dialog element
    * @param {Object} dialog The dialog object (jQuery wrapped) you wish to clear all sections from
    */
	self.clearSections = function (dialog) {
		//Clear the dialog section
		$('.ultimatelib-dialog-section', dialog).remove();
	};

	/**
    * @method addSection
    * @description Appends a custom section to the specified dialog
    * @param {Object} dialog The dialog object as jQuery wrapped object, you wish to append the section to
    * @param {Object|String} section The section you wish to append to the dialog (DOM or html)
    */
	self.addSection = function (dialog, section) {

		//Append the section
		dialog.append(section);

	};



	// Show up in console
	UltimateLib.Logger.log("UltimateLib.Dialog loaded :-)");

	return self;
})(UltimateLib.Dialog || {});