// var EXPORTED_SYMBOLS = ["foo", "bar"];
//
// function foo() {
// return "foo";
// }
//
// var bar = {
// name : "bar",
// size : 3,
// add : function(n){
// this.size +=n;
// }
// };
//
// var dummy = "dummy"; //not exported

// WebPanel.refreshTree();
// ==============================
function add_binding() {
	var selector = this.selector.toLowerCase();
	var locator = this.locator;
	var prefix = "unkown";
	var myControls = new Array("input", "button", "link", "select", "checkbox",
			"image", "img", " a", ">a", "a");
	var maxIndex = -1;
	var currentIndex = -1;
	var currentControl = "unkown";

	if (selector.length > 0) {
		for (control in myControls) {
			if (myControls[control] == "a") {
				if (selector.indexOf(myControls[control]) == 0) {
					currentIndex = 0;
				}
			} else {
				currentIndex = selector.lastIndexOf(myControls[control]);
			}

			if (currentIndex > maxIndex) {
				maxIndex = currentIndex;
				currentControl = myControls[control];
			}
		}

		switch (currentControl) {
			case "input" :
				prefix = "ipt";
				break;
			case "button" :
				prefix = "btn";
				break;
			case "link" :
			case "a" :
			case ">a" :
			case " a" :
				prefix = "lnk";
				break;
			case "select" :
				prefix = "slt";
				break;
			case "checkbox" :
				prefix = "ckb";
				break;
			case "image" :
			case "img" :
				prefix = "img";
				break;
			default :
				prefix = "obj";
		}

		if (locator.length == 0) {
			locator = "WebElement" + this._counter;
			this._counter++;
		}

		if (this.parentToolbar.collapsed)
			this.parentSelector = "";

		var parentContext = this.parentSelector;
		if (parentContext.length < 1 || parentContext == "/") {
			parentContext = "document";
		}

		var data = "String " + prefix + locator + " = \"" + selector
				+ "\";\r\n";
		var con = confirm("Parent Context: " + parentContext + "\r\n" + data);
		if (con) {

			var elementInfo = WebPanel.getContainerInfo();
			if (elementInfo[4] == 1) {
				// elementInfo.splice(4,1,this.elementType);
				// elementInfo.splice(0,1,[prefix + locator,selector]);
				if (this.elementType) {
					this.insertLocator2Sqlite(locator, selector,
							elementInfo[1], elementInfo[2], elementInfo[3],
							this.elementType);
				} else {
					this.insertLocator2Sqlite(prefix + locator, selector,
							elementInfo[1], elementInfo[2], elementInfo[3],
							this.elementType);
				}

				WebPanel.refreshContainer(elementInfo[1]);

			} else {
				alert("The selection is not a container!");
				return false;

			}

			// this.insertLocator2Sqlite(prefix + locator, selector,
			// Firefox.getElementById("sbObjectSidebar"), pageobjectSidebar.getLvl(),
			// pageobjectSidebar.getIdx(), pageobjectSidebar.getTyp());
			/*
			 * this.insertLocator2Sqlite(prefix + locator, selector,
			 * pageobjectSidebar.getPid(), pageobjectSidebar.getLvl(), pageobjectSidebar.getIdx(),
			 * pageobjectSidebar.getTyp()); if(this.lastLoggedParentSelector ==
			 * this.parentSelector){ this.logLocator("locators.txt", data);
			 * }else{ this.logLocator("locators.txt",
			 * "\r\n//==================================================\r\n");
			 * this.logLocator("locators.txt", "// Parent Context: " +
			 * parentContext + "\r\n"); this.logLocator("locators.txt",
			 * "//==================================================\r\n");
			 * this.logLocator("locators.txt", data);
			 * this.lastLoggedParentSelector = this.parentSelector; }
			 */

		} else {
			this._counter--;

		}

	} else {
		var elementInfo = WebPanel.getContainerInfo();
		if (elementInfo[1] == 0) {
			this.insertLocator2Sqlite(locator, selector, 0, 0, 0, 1);
			WebPanel.refreshTree();
		} else {
			alert("Locator is empty!");
			return false;
		}

	}
	// WebPanel.refreshTree();
}