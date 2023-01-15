var Export = {

	_cdata : [],
	_tdata : [],

	outfile : function(timeStamp, fileName) {
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		var defaultDataFolder = Option.getUserPrefChar(
				"extensions.pageobjects.defaultExportFolder", "Desk");
		var nsfile = null;
		if (defaultDataFolder == "userdir2") {
			var filePath = Option.getUserPrefComplex(
					"extensions.pageobjects.defaultUserFolder2", "Desk");
			nsfile = new FileUtils.File(filePath.path + "\\" + timeStamp);

		} else {
			nsfile = localFileUtils.createFolder(defaultDataFolder, timeStamp);

		}

		nsfile.append(fileName);
		return nsfile;

	},

	exportAsProperties : function() {

		var elementsArray = new Array();
		var timeStamp = this.getTimeStamp();
		var contentLines = "";
		var header = Option.getUserPrefChar(
				"extensions.pageobjects.formats.pp.header", "");
		var footer = Option.getUserPrefChar(
				"extensions.pageobjects.formats.pp.footer", "");
		elementsArray = sqlite3.getAllElements();
		for (var i = 0; i < elementsArray.length; i++) {
			if (elementsArray[i][6] == 0) {
				contentLines += elementsArray[i][1] + " = "
						+ elementsArray[i][2] + "\r\n";
			}
		}

		// localFileUtils.writeFile(this.outfile("locators.properties"), header
		// + "\r\n" + contentLines + footer);
		localFileUtils.writeFile(this.outfile(timeStamp + "_pp",
						"locators.properties"), header + "\r\n" + contentLines
						+ footer);

		// var outStream = localFileUtils.openFileOutputStream(this
		// .outfile("locators.properties"));
		// var converter =
		// Components.classes["@mozilla.org/intl/converter-output-stream;1"]
		// .createInstance(Components.interfaces.nsIConverterOutputStream);
		// converter.init(outStream, "UTF-8", 0, 0);
		// converter.writeString(contentLines);
		// converter.close();
		alert("Done");
	},

	exportAsPageObjects : function() {
		var elementsArray = new Array();
		var indent = "\t";
		var contentLines = "";
		var level = 1;
		var flag = 0;

		var header = Option.getUserPrefChar(
				"extensions.pageobjects.formats.ss.header", "");
		var footer = Option.getUserPrefChar(
				"extensions.pageobjects.formats.ss.footer", "");
		this._cdata = sqlite3.getAllElements();

		var timeStamp = this.getTimeStamp();

		for (var i = 0; i < this._cdata.length; i++) {

			if (this._cdata[i][6] == 1 && this._cdata[i][3] == 0) {
				this._tdata = [];
				elementsArray = this.getAllChildren(this._cdata[i][0]);
				contentLines = "public class " + this._cdata[i][1]
						+ "Page {\r\n";
				contentLines += "\tprivate WebDriver driver;\r\n";
				contentLines += "\tprivate final String	url	= \"http://www.baidu.com\";\r\n";

				for (var j = 0; j < elementsArray.length; j++) {

					if (elementsArray[j][6] == 0) {
						var reg = new RegExp("^//");
						if (reg.test(elementsArray[j][2])) {
							contentLines += "\t@FindBy(xpath = \""
									+ elementsArray[j][2] + "\")\r\n";

						} else {
							contentLines += "\t@FindBy(css = \""
									+ elementsArray[j][2] + "\")\r\n";

						}
						contentLines += "\tprivate WebElement	"
								+ elementsArray[j][1] + ";\r\n\r\n";

					}
				}

				contentLines += "}\r\n";

				localFileUtils.writeFile(this.outfile(timeStamp + "_po",
								this._cdata[i][1] + "Page.java"), header
								+ "\r\n" + contentLines + footer);

				contentLines = "";

			}

		}

		this._tdata = [];
		this._cdata = [];
		alert("Done");

	},

	exportAsStrings : function() {
		var elementsArray = new Array();
		var indent = "\t";
		var contentLines = "";
		var level = 1;
		var flag = 0;

		var header = Option.getUserPrefChar(
				"extensions.pageobjects.formats.ss.header", "");
		var footer = Option.getUserPrefChar(
				"extensions.pageobjects.formats.ss.footer", "");
		this._cdata = sqlite3.getAllElements();

		var timeStamp = this.getTimeStamp();

		for (var i = 0; i < this._cdata.length; i++) {

			if (this._cdata[i][6] == 1 && this._cdata[i][3] == 0) {
				this._tdata = [];
				elementsArray = this.getAllChildren(this._cdata[i][0]);
				contentLines = "public interface " + this._cdata[i][1]
						+ " {\r\n";

				for (var j = 0; j < elementsArray.length; j++) {
					if (level != elementsArray[j][4]) {
						flag = 1;
						indent = this.getIndent(elementsArray[j][4]);
					} else {
						flag = 0;
					}

					if (elementsArray[j][6] == 1) {
						if (flag == 1 && j > 1) {
							var x = j - 1;
							if (elementsArray[x][6] != 1) {
								contentLines += indent + "}\r\n";
							}
						}
						contentLines += indent + "public interface "
								+ elementsArray[j][1] + " {\r\n";

					} else {

						contentLines += indent + "String "
								+ elementsArray[j][1] + " = \""
								+ elementsArray[j][2] + "\";\r\n";
					}

					level = elementsArray[j][4];

				}

				for (var k = level - 1; k > 0; k--) {
					indent = this.getIndent(k);
					contentLines += indent + "}\r\n";
				}

				contentLines += "}\r\n";
				// localFileUtils.writeFile(this.outfile("I" + this._cdata[i][1]
				// + ".java"), header + "\r\n" + contentLines
				// + footer);

				// // var nsfile = localFileUtils.createFolder("Desk",
				// timeStamp);
				// var nsfile = localFileUtils.createFolder("ProfD", timeStamp);
				//
				// nsfile.append("I" + this._cdata[i][1] + ".java");

				// Components.utils.import("resource://gre/modules/FileUtils.jsm");
				//
				// var nsfile = new FileUtils.File("C:\\test\\" + timeStamp);
				// nsfile.append("I" + this._cdata[i][1] + ".java");
				//
				// localFileUtils.writeFile(nsfile, header + "\r\n" +
				// contentLines
				// + footer);

				localFileUtils.writeFile(this.outfile(timeStamp + "_ss", "I"
										+ this._cdata[i][1] + ".java"), header
								+ "\r\n" + contentLines + footer);

				// localFileUtils.writeFile(localFileUtils.createFolder("Desk",
				// "test").append("I" + this._cdata[i][1]
				// + ".java"), header + "\r\n" + contentLines
				// + footer);

				contentLines = "";

			}

		}

		this._tdata = [];
		this._cdata = [];
		alert("Done");

	},

	getIndent : function(level) {
		var indent = new Array();
		for (var k = 0; k < level; k++) {
			indent.push("\t");
		}
		return indent.join("");
	},

	getAllChildren : function(pid) {
		for (var i = 0; i < this._cdata.length; i++) {
			if (this._cdata[i][3] == pid) {
				this._tdata.push(this._cdata[i]);
				if (this._cdata[i][6]) {
					this._tdata.concat(this.getAllChildren(this._cdata[i][0]));
				}
			}
		}
		return this._tdata;
	},

	getTimeStamp : function() {
		var testDate = new Date();

		var year = testDate.getFullYear();
		var month = testDate.getMonth();
		var day = testDate.getDate();
		var hour = testDate.getHours();
		var minute = testDate.getMinutes();
		var second = testDate.getSeconds();

		var timeStamp = new Array();
		timeStamp.push(hour);
		timeStamp.push(minute);
		timeStamp.push(second);
		timeStamp.push(year);
		timeStamp.push(month);
		timeStamp.push(day);

		return timeStamp.join("-");

	}

}