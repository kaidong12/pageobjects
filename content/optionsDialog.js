var Option = {

	_defaultUserFolder1 : null,
	_defaultUserFolder2 : null,

	getUserPrefChar : function(prefName, prefDefault) {
		try {
			var ife_Preferences = Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefBranch);
			if (!ife_Preferences.prefHasUserValue(prefName))
				ife_Preferences.setCharPref(prefName, prefDefault);
			return ife_Preferences.getCharPref(prefName);
		} catch (exc) {
			alert("getUserPrefBool: " + exc);
		}
	},

	getUserPrefComplex : function(prefName, prefDefault) {
		try {
			var ife_Preferences = Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefBranch);
			if (!ife_Preferences.prefHasUserValue(prefName))
				ife_Preferences.setComplexValue(prefName,
						Components.interfaces.nsILocalFile, prefDefault);
			return ife_Preferences.getComplexValue(prefName,
					Components.interfaces.nsILocalFile);
		} catch (exc) {
			alert("getUserPrefComplex: " + exc);
		}
	},

	setUserPrefChar : function(prefName, newChar) {
		try {
			var ife_Preferences = Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefBranch);
			ife_Preferences.setCharPref(prefName, newChar);
		} catch (exc) {
			alert("setUserPrefChar: " + exc)
		}
	},

	setUserPrefComplex : function(prefName, newComplex) {
		try {
			var ife_Preferences = Components.classes["@mozilla.org/preferences-service;1"]
					.getService(Components.interfaces.nsIPrefBranch);
			ife_Preferences.setComplexValue(prefName,
					Components.interfaces.nsILocalFile, newComplex);
		} catch (exc) {
			alert("setUserPrefComplex: " + exc)
		}
	},

	loadSet : function() {
		try {
			var defaultDataFolder = this.getUserPrefChar(
					"extensions.pageobjects.defaultDataFolder", "ProfD");
			var defaultUserFolder1 = this.getUserPrefComplex(
					"extensions.pageobjects.defaultUserFolder1", null);
			var defaultExportFolder = this.getUserPrefChar(
					"extensions.pageobjects.defaultExportFolder", "Desk");
			var defaultUserFolder2 = this.getUserPrefComplex(
					"extensions.pageobjects.defaultUserFolder2", null);
			// var defaultExportType = this.getUserPrefChar(
			// "extensions.pageobjects.defaultExportType", "pageobjects");
			var po_header = this.getUserPrefChar(
					"extensions.pageobjects.formats.po.header", "");
			var po_footer = this.getUserPrefChar(
					"extensions.pageobjects.formats.po.footer", "");

			switch (defaultDataFolder) {
				case "Desk" :
					document.getElementById("po_load_path").selectedIndex = 0;
					break;
				case "ProfD" :
					document.getElementById("po_load_path").selectedIndex = 1;
					break;
				case "TmpD" :
					document.getElementById("po_load_path").selectedIndex = 2;
					break;
				case "userdir1" :
					document.getElementById("po_load_path").selectedIndex = 3;
					document.getElementById("udir1").value = defaultUserFolder1.path;
					break;
				default :
					alert("loadSet: error1");
			}

			switch (defaultExportFolder) {
				case "Desk" :
					document.getElementById("po_export_path").selectedIndex = 0;
					break;
				case "ProfD" :
					document.getElementById("po_export_path").selectedIndex = 1;
					break;
				case "TmpD" :
					document.getElementById("po_export_path").selectedIndex = 2;
					break;
				case "userdir2" :
					document.getElementById("po_export_path").selectedIndex = 3;
					document.getElementById("udir2").value = defaultUserFolder2.path;
					break;
				default :
					alert("loadSet: error2");
			}

			// switch (defaultExportType) {
			// case "pageobjects" :
			// document.getElementById("po_export_type").selectedIndex = 0;
			// break;
			// case "strings" :
			// document.getElementById("po_export_type").selectedIndex = 1;
			// break;
			// case "properties" :
			// document.getElementById("po_export_type").selectedIndex = 2;
			// break;
			// default :
			// alert("error");
			// }

			this.enableBrowse1();
			this.enableBrowse2();

			document.getElementById("format-list").selectedIndex = 0;
			document.getElementById("po_header").value = po_header;
			document.getElementById("po_footer").value = po_footer;

			return true;
		} catch (exc) {
			alert("loadSet: " + exc);
		}
	},

	loadDefaultSet : function() {
		try {

			var defaultDataFolder = PageObjectGenerator.Preferences.DEFAULT_OPTIONS.DataFolder;
			var defaultUserFolder1 = PageObjectGenerator.Preferences.DEFAULT_OPTIONS.UserFolder1;
			var defaultExportFolder = PageObjectGenerator.Preferences.DEFAULT_OPTIONS.ExportFolder;
			var defaultUserFolder2 = PageObjectGenerator.Preferences.DEFAULT_OPTIONS.UserFolder2;
			// var defaultExportType =
			// PageObjectGenerator.Preferences.DEFAULT_OPTIONS.ExportType;
			switch (defaultDataFolder) {
				case "Desk" :
					document.getElementById("po_load_path").selectedIndex = 0;
					break;
				case "ProfD" :
					document.getElementById("po_load_path").selectedIndex = 1;
					break;
				case "TmpD" :
					document.getElementById("po_load_path").selectedIndex = 2;
					break;
				case "userdir1" :
					document.getElementById("po_load_path").selectedIndex = 3;
					document.getElementById("udir1").value = defaultUserFolder1.path;
					break;
				default :
					alert("loadSet: error1");
			}

			switch (defaultExportFolder) {
				case "Desk" :
					document.getElementById("po_export_path").selectedIndex = 0;
					break;
				case "ProfD" :
					document.getElementById("po_export_path").selectedIndex = 1;
					break;
				case "TmpD" :
					document.getElementById("po_export_path").selectedIndex = 2;
					break;
				case "userdir2" :
					document.getElementById("po_export_path").selectedIndex = 3;
					document.getElementById("udir2").value = defaultUserFolder2.path;
					break;
				default :
					alert("loadSet: error2");
			}

			// switch (defaultExportType) {
			// case "pageobjects" :
			// document.getElementById("po_export_type").selectedIndex = 0;
			// break;
			// case "strings" :
			// document.getElementById("po_export_type").selectedIndex = 1;
			// break;
			// case "properties" :
			// document.getElementById("po_export_type").selectedIndex = 2;
			// break;
			// default :
			// alert("error");
			// }

			this.enableBrowse1();
			this.enableBrowse2();
			return true;
		} catch (exc) {
			alert("loadDefaultSet: " + exc);
		}
	},

	saveSet : function() {
		try {

			var defaultDataFolder = document.getElementById("po_load_path")
					.getAttribute("value");
			var defaultUserFolder1 = document.getElementById("udir1").value;
			var defaultExportFolder = document.getElementById("po_export_path")
					.getAttribute("value");
			var defaultUserFolder2 = document.getElementById("udir2").value;
			// var defaultExportType = document.getElementById("po_export_type")
			// .getAttribute("value");
			var selectedValue = document.getElementById("format-list").selectedItem.value;

			this.setUserPrefChar("extensions.pageobjects.defaultDataFolder",
					defaultDataFolder);
			this.setUserPrefChar("extensions.pageobjects.defaultExportFolder",
					defaultExportFolder);
			// this.setUserPrefChar("extensions.pageobjects.defaultExportType",
			// defaultExportType);
			if (defaultDataFolder == "userdir1") {
				this.setUserPrefComplex(
						"extensions.pageobjects.defaultUserFolder1",
						this._defaultUserFolder1);
			}
			if (defaultExportFolder == "userdir2") {
				this.setUserPrefComplex(
						"extensions.pageobjects.defaultUserFolder2",
						this._defaultUserFolder2);
			}

			switch (selectedValue) {
				case "po" :
					var po_header = document.getElementById("po_header").value;
					var po_footer = document.getElementById("po_footer").value;
					this.setUserPrefChar(
							"extensions.pageobjects.formats.po.header",
							po_header);
					this.setUserPrefChar(
							"extensions.pageobjects.formats.po.footer",
							po_footer);
					break;
				case "ss" :
					var ss_header = document.getElementById("ss_header").value;
					var ss_footer = document.getElementById("ss_footer").value;
					this.setUserPrefChar(
							"extensions.pageobjects.formats.ss.header",
							ss_header);
					this.setUserPrefChar(
							"extensions.pageobjects.formats.ss.footer",
							ss_footer);
					break;
				case "pp" :
					var pp_header = document.getElementById("pp_header").value;
					var pp_footer = document.getElementById("pp_footer").value;
					this.setUserPrefChar(
							"extensions.pageobjects.formats.pp.header",
							pp_header);
					this.setUserPrefChar(
							"extensions.pageobjects.formats.pp.footer",
							pp_footer);
					break;
				default :
					alert("showVbox: value " + selectedValue);
			}

			return true;
		} catch (exc) {
			alert("saveSet: " + exc);
		}
	},

	selectFolder : function(textboxId) {
		var nsIFilePicker = Components.interfaces.nsIFilePicker;
		var fp = Components.classes["@mozilla.org/filepicker;1"]
				.createInstance(nsIFilePicker);
		fp.init(window, "Select a folder", nsIFilePicker.modeGetFolder);
		if (fp.show() == nsIFilePicker.returnOK) {
			var folder = fp.file;
			document.getElementById(textboxId).value = folder.path;
			if (textboxId == "udir1") {
				this._defaultUserFolder1 = folder;
			} else if (textboxId == "udir2") {
				this._defaultUserFolder2 = folder;
			}
		}
	},

	showVbox : function() {

		var selectedValue = document.getElementById("format-list").selectedItem.value;

		switch (selectedValue) {
			case "po" :
				document.getElementById("pageobjects").hidden = false;
				document.getElementById("strings").hidden = true;
				document.getElementById("properties").hidden = true;

				var po_header = this.getUserPrefChar(
						"extensions.pageobjects.formats.po.header", "");
				var po_footer = this.getUserPrefChar(
						"extensions.pageobjects.formats.po.footer", "");
				document.getElementById("po_header").value = po_header;
				document.getElementById("po_footer").value = po_footer;

				break;
			case "ss" :
				document.getElementById("pageobjects").hidden = true;
				document.getElementById("strings").hidden = false;
				document.getElementById("properties").hidden = true;

				var ss_header = this.getUserPrefChar(
						"extensions.pageobjects.formats.ss.header", "");
				var ss_footer = this.getUserPrefChar(
						"extensions.pageobjects.formats.ss.footer", "");
				document.getElementById("ss_header").value = ss_header;
				document.getElementById("ss_footer").value = ss_footer;

				break;
			case "pp" :
				document.getElementById("pageobjects").hidden = true;
				document.getElementById("strings").hidden = true;
				document.getElementById("properties").hidden = false;

				var pp_header = this.getUserPrefChar(
						"extensions.pageobjects.formats.pp.header", "");
				var pp_footer = this.getUserPrefChar(
						"extensions.pageobjects.formats.pp.footer", "");
				document.getElementById("pp_header").value = pp_header;
				document.getElementById("pp_footer").value = pp_footer;

				break;
			default :
				alert("showVbox: value " + selectedValue);
		}
	},

	enableBrowse1 : function() {
		try {

			var userSelection = document.getElementById("po_load_path")
					.getAttribute("value");

			if (userSelection == "userdir1") {
				document.getElementById("browse1").disabled = false;
			} else {
				document.getElementById("browse1").disabled = true;
			}

			return true;
		} catch (exc) {
			alert("enableBrowse1: " + exc);
		}
	},

	enableBrowse2 : function() {
		try {

			var userSelection = document.getElementById("po_export_path")
					.getAttribute("value");

			if (userSelection == "userdir2") {
				document.getElementById("browse2").disabled = false;
			} else {
				document.getElementById("browse2").disabled = true;
			}

			return true;
		} catch (exc) {
			alert("enableBrowse2: " + exc);
		}
	}

};
