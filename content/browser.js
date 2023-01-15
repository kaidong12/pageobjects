var WebPanel = {

	getCid : function() {
		var currentId = this.getCellValueByIndex(0);
		return currentId;
	},
	getPid : function() {
		var parentId = this.getCellValueByIndex(3);
		return parentId;
	},
	getLvl : function() {
		var level = this.getCellValueByIndex(4);
		return level;
	},
	getIdx : function() {
		var level = this.getCellValueByIndex(5);
		return level;
	},
	getTyp : function() {
		var level = this.getCellValueByIndex(6);
		return level;
	},
	getCellValueByIndex : function(idx) {
		try {
			var tree = window.top.sidebar.document
					.getElementById("elementList");
			var treeView = tree.view;
			var sel = treeView.selection.currentIndex;
			// returns -1 if the tree is not focused

			return treeView.getCellText(sel, tree.columns.getColumnAt(idx));
		} catch (e) {
			alert("Select a container first Please!");

		}
	},
	getContainerInfo : function() {
		var infoArray = [];
		try {
			var tree = window.top.sidebar.document
					.getElementById("elementList");
			var treeView = tree.view;
			var sel = treeView.selection.currentIndex;

			// parent id
			infoArray.push(treeView.getCellText(sel, tree.columns
							.getColumnAt(3)));
			// current id
			infoArray.push(treeView.getCellText(sel, tree.columns
							.getColumnAt(0)));
			// level
			infoArray.push(parseInt(treeView.getCellText(sel, tree.columns
							.getColumnAt(4)))
					+ 1);
			// index
			infoArray.push(treeView.getCellText(sel, tree.columns
							.getColumnAt(5)));
			// type
			infoArray.push(treeView.getCellText(sel, tree.columns
							.getColumnAt(6)));

		} catch (e) {
			alert("Select a container first Please!");

		}
		return infoArray;
	},
	refreshTree : function() {
		window.top.sidebar.pageobjectSidebar.init();

	},
	refreshContainer : function(cid) {
		var tree = window.top.sidebar.document.getElementById("elementList");
		var treeView = tree.view;
		var sel = treeView.selection.currentIndex;
		window.top.sidebar.pageobjectSidebar.loadData();
		window.top.sidebar.pageobjectSidebar.treeView.toggleOpenState(sel);
		window.top.sidebar.pageobjectSidebar.treeView.toggleOpenState(sel);

	},

	test : function() {
		// function test() {
		// // return "xxx";
		// alert(window.sidebar.document.getElementById("elementList"));
		//
		// var mainWindow = window
		// .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
		// .getInterface(Components.interfaces.nsIWebNavigation)
		// .QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem
		// .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
		// .getInterface(Components.interfaces.nsIDOMWindow);
		// // alert(mainWindow.document.getElementById("elementList").width);
		//
		// var windowMediator =
		// Components.classes["@mozilla.org/appshell/window-mediator;1"]
		// .getService(Components.interfaces.nsIWindowMediator);
		// var mostRecentWindow = windowMediator
		// .getMostRecentWindow('navigator:browser');
		// // alert(mostRecentWindow.document.getElementById("elementList"));
		// alert(window.top.document.getElementById("elementList"));
		//
		// // alert(window.document.getElementById("viewObjectSidebar"));
		// // sidebarWindow =
		// document.getElementById("viewObjectSidebar").contentWindow;
		//
		// // Verify that our sidebar is open at this moment:
		// if (sidebarWindow.location.href ==
		// "chrome://pageobjects/content/pageobjectSidebar.xul") {
		// // call "yourNotificationFunction" in the sidebar's context:
		// // sidebarWindow.yourNotificationFunction(anyArguments);
		// alert("xxxxxxx");
		// } else {
		// alert("yyyyyyyyyy");
		// }

		// var sidebarDocument =
		// document.getElementById("viewObjectSidebar").contentDocument;

		// if (sidebarWindow) {
		// sidebarWindow.location =
		// "chrome://pageobjects/content/pageobjectSidebar.xul";
		// // your xul location
		// } else {
		// alert("sidebar window is not null");
		// }
		var tree = window.top.sidebar.document.getElementById("elementList");

		var treeView = tree.view;
		var sel = treeView.selection.currentIndex; // returns -1 if the tree is
		// not focused

		// var treeItem = treeView.getItemAtIndex(sel);
		return treeView.getCellText(sel, tree.columns.getColumnAt(3));

	}
}
