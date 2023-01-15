

var pageobjectSidebar = {
	_tree : null,
	_cdata : [],
	// [0:id, 1:key, 2:locator, 3:parentId, 4:level, 5:index, 6:type]
	_vdata : [],
	// [0:id, 1:key, 2:locator, 3:parentId, 4:level, 5:index, 6:type, 7:open]
	_tdata : [],

	treeView : {

		childData : function() {
			return pageobjectSidebar._cdata;
		},

		visibleData : function() {
			return pageobjectSidebar._vdata;
		},

		tempData : function() {
			return pageobjectSidebar._tdata;
		},

		treeBox : null,
		selection : null,

		get rowCount() { return this.visibleData().length; },

		setTree : function(treeBox) {
			this.treeBox = treeBox;
		},
		getCellText : function(idx, column) {
			try {
				if (column != null) {
					return this.visibleData()[idx][column.index];
				}
			} catch (e) {
				alert("getCellText: " + this);
			}
		},
		isContainer : function(idx) {
			if (typeof this.visibleData()[idx] == "undefined") {
				return false;
			} else {
				if (this.visibleData()[idx][6]) {
					return true;
				} else {
					return false;
				}
			}
		},
		isContainerOpen : function(idx) {
			return this.visibleData()[idx][7];
		},
		isContainerEmpty : function(idx) {
			return false;
		},
		getParentIndex : function(idx) {
			if (typeof this.visibleData()[idx] == "undefined") {
				return -1;
			} else {
				if (this.visibleData()[idx][3] == 0)
					return -1;
				for (var t = idx - 1; t >= 0; t--) {
					if (this.isContainer(t))
						return t;
				}
			}
		},
		getLevel : function(idx) {
			return this.visibleData()[idx][4];
		},
		getParentId : function(idx) {
			return this.visibleData()[idx][3];
		},
		getIndexById : function(eid) {
			for (var t = eid; t < this.visibleData().length; t++) {
				if (this.visibleData()[t][0] == eid)
					return t;
			}
		},
		getIdByIndex : function(idx) {
			return this.visibleData()[idx][0];
		},
		hasNextSibling : function(idx, after) {
			var thisLevel = this.getLevel(idx);
			for (var t = after + 1; t < this.visibleData().length; t++) {
				var nextLevel = this.getLevel(t);
				if (nextLevel == thisLevel)
					return true;
				if (nextLevel < thisLevel)
					break;
			}
			return false;
		},
		toggleOpenState : function(idx) {
			var item = this.visibleData()[idx];
			if (!item[6])
				return;

			if (item[7]) {

				item[7] = false;

				var thisLevel = this.getLevel(idx);
				var deletecount = 0;
				for (var t = idx + 1; t < this.visibleData().length; t++) {
					if (this.isContainer(t - 1)) {
						this.visibleData()[t - 1][7] = false;
					}
					if (this.getLevel(t) > thisLevel)
						deletecount++;
					else
						break;
				}
				if (deletecount) {
					this.visibleData().splice(idx + 1, deletecount);
					this.treeBox.rowCountChanged(idx + 1, -deletecount);
				}

			} else {

				item[7] = true;

				var eid = this.visibleData()[idx][0];
				var toinsert = this.getChildren(eid);
				for (var i = 0; i < toinsert.length; i++) {
					toinsert[i].push(false);
					this.visibleData().splice(idx + i + 1, 0, toinsert[i]);
				}
				this.treeBox.rowCountChanged(idx + 1, toinsert.length);
			}
			// this.treeBox.invalidateRow(idx);
			// this.treeBox.invalidate();
		},
		toggleOpenStateX : function(idx) {
			var item = this.visibleData()[idx];
			if (!item[6])
				return;

			if (item[7]) {

				item[7] = false;

				var thisLevel = this.getLevel(idx);
				var deletecount = 0;
				for (var t = idx + 1; t < this.visibleData().length; t++) {

					if (this.getLevel(t) > thisLevel) {
						deletecount++;
						if (this.isContainer(t)) {
							this.visibleData()[t][7] = false;
						}
					} else {
						break;
					}
				}
				if (deletecount) {
					this.visibleData().splice(idx + 1, deletecount);
					this.treeBox.rowCountChanged(idx + 1, -deletecount);
				}

			} else {

				item[7] = true;

				var eid = this.visibleData()[idx][0];
				var toinsert = this.getAllChildren(eid);
				for (var i = 0; i < toinsert.length; i++) {
					if (toinsert[i][6]) {
						toinsert[i].push(true);
					} else {
						toinsert[i].push(false);
					}
					this.visibleData().splice(idx + i + 1, 0, toinsert[i]);
				}
				this.treeBox.rowCountChanged(idx + 1, toinsert.length);
				this.tempData().splice(0, toinsert.length);
			}
			// this.treeBox.invalidateRow(idx);
			// this.treeBox.invalidate();
		},
		getAllChildren : function(pid) {
			for (var i = 0; i < this.childData().length; i++) {
				if (this.childData()[i][3] == pid) {
					this.tempData().push(this.childData()[i]);
					if (this.childData()[i][6]) {
						this.tempData().concat(this.getAllChildren(this
								.childData()[i][0]));
					}
				}
			}
			return this.tempData();
		},
		getChildren : function(pid) {
			var results = [];
			for (var i = 0; i < this.childData().length; i++) {
				var nextElement = this.childData()[i][3];
				if (nextElement == pid) {
					results.push(this.childData()[i]);
				}
			}
			return results;
		},

		isSeparator : function(idx) {
			return false;
		},
		isSorted : function() {
			return false;
		},
		isEditable : function(idx, column) {
			if (column == null) {
				return false;
			} else {
				return true;
			}
		},
		isSelectable : function(idx, column) {
			if (column == null) {
				return false;
			} else {
				return true;
			}
		},
		getImageSrc : function(idx, column) {
		},
		getProgressMode : function(idx, column) {
		},
		getCellValue : function(idx, column) {
		},
		cycleHeader : function(col, elem) {
		},
		selectionChanged : function() {
		},
		cycleCell : function(idx, column) {
		},
		performAction : function(action) {
		},
		performActionOnCell : function(action, index, column) {
		},
		getRowProperties : function(idx, prop) {
		},
		getCellProperties : function(idx, column, prop) {
		},
		getColumnProperties : function(column, element, prop) {
		},
		setCellText : function(editingRow, editingColumn, value) {
			var eid = this.visibleData()[editingRow][0];
			var cidx = editingColumn.index;
			this.visibleData()[editingRow][cidx] = value;
			for (var i = 0; i < this.childData().length; i++) {
				var nextId = this.childData()[i][0];
				if (nextId == eid) {
					this.childData()[i][cidx] = value;
				}
			}
			if (cidx == 1) {
				sqlite3.updateKeyById(eid, value);
			} else if (cidx == 2) {
				sqlite3.updateLocatorById(eid, value);
			}
			// this.treeBox.invalidateRow(editingRow);
			this.treeBox.invalidateCell(editingRow, editingColumn);
			// this.treeBox.invalidate();

		}

	},

	loadData : function() {
		try {
			this._cdata = sqlite3.getAllElements();
			this._cdata.push([0, "#####New Page#####", null, 0, 0, 0, 0]);

		} catch (exc) {
			alert("loadData: " + exc);

		}
	},

	init : function() {
		try {
			this.loadData();

			var topContainer = new Array();
			topContainer = this.treeView.getChildren(0);
			for (var i = 0; i < topContainer.length; i++) {
				topContainer[i].push(false);
			}

			this._vdata = topContainer;
			this._tree = document.getElementById("elementList");

			this._tree.view = this.treeView;
			this._tree.view.selection.select(topContainer.length - 1);
			document.getElementById("btnLoad").setAttribute("label", "Refresh");
			document.getElementById("btnLoad").setAttribute("image",
					"refresh.png");
		} catch (exc) {
			alert("init: " + exc);

		}
	},

	toggleContainer : function() {
		try {
			var containerIndex = this._tree.currentIndex;
			var openStatus = this._tree.view.isContainerOpen(containerIndex);
			this.treeView.toggleOpenStateX(containerIndex);
			if (openStatus) {
				document.getElementById("btnExpand").setAttribute("label",
						"Expand");
				document.getElementById("btnExpand").setAttribute("image",
						"maximize.gif");
			} else {
				document.getElementById("btnExpand").setAttribute("label",
						"Collapse");
				document.getElementById("btnExpand").setAttribute("image",
						"minimize.gif");
			}

		} catch (exc) {
			alert("toggleContainer: " + exc);

		}
	},

	onTreeClicked : function(event) {
		var tree = document.getElementById("elementList");
		var tbox = tree.treeBoxObject;

		// get the row, col and child element at the point
		var row = {}, col = {}, child = {};
		tbox.getCellAt(event.clientX, event.clientY, row, col, child);

		var treeView = tbox.view;
		var cidx = treeView.selection.currentIndex;
		// returns -1 if the tree is not focused

		// var tree = document.getElementById("elementList");
		// var cidx = tree.currentIndex;
		var parentId = treeView.getCellText(cidx, tree.columns.getColumnAt(3));
		var elementType = treeView.getCellText(cidx, tree.columns
						.getColumnAt(6));

		if (parentId == 0) {
			document.getElementById("btnDelete").setAttribute("disabled",
					"true");
		} else {
			document.getElementById("btnDelete").setAttribute("disabled",
					"false");
		}

		if (elementType == 1) {
			var elementOpen = treeView.isContainerOpen(cidx);
			if (elementOpen) {
				document.getElementById("btnExpand").setAttribute("image",
						"minimize.gif");
				document.getElementById("btnExpand").setAttribute("label",
						"Collapse");
			} else {
				document.getElementById("btnExpand").setAttribute("image",
						"maximize.gif");
				document.getElementById("btnExpand").setAttribute("label",
						"Expand");
			}
			document.getElementById("btnExpand").setAttribute("disabled",
					"false");
		} else {
			document.getElementById("btnExpand").setAttribute("disabled",
					"true");
		}

		// ====================

		// alert(tree.parentNode);
		// alert(tree);
		// alert(col.value);

		// pageobjectSidebar._pid = treeView.getCellText(sel, tree.columns
		// .getColumnAt(0));
		// pageobjectSidebar._lvl = parseInt(treeView.getCellText(sel,
		// tree.columns
		// .getColumnAt(4)))
		// + 1;
		// pageobjectSidebar._idx = parseInt(treeView.getCellText(sel,
		// tree.columns
		// .getColumnAt(5)))
		// + 1;
		// pageobjectSidebar._typ = 0;
		// alert("onTreeClicked");

		// alert(pageobjectSidebar._pid);
		// alert(pageobjectSidebar._lvl);

		// get the text of cell been clicked now
		// var cellText = tree.view.getCellText(row.value, col.value);

		// if (treeView.isContainer(sel)) {
		// treeView.toggleOpenState(sel);
		// }

	},

	onTreeSelected : function() {
		var tree = document.getElementById("elementList");
		var cidx = tree.currentIndex;
		var parentId = tree.view.getCellText(cidx, tree.columns.getColumnAt(3));
		var elementType = tree.view.getCellText(cidx, tree.columns
						.getColumnAt(6));

		if (parentId == 0) {
			window.document.getElementById("btnDelete").setAttribute(
					"disabled", "true");
		} else {
			window.document.getElementById("btnDelete").setAttribute(
					"disabled", "false");
		}

		if (elementType == 1) {
			var elementOpen = tree.view.isContainerOpen(cidx);
			if (elementOpen) {
				window.document.getElementById("btnExpand").setAttribute(
						"label", "Collapse");
				document.getElementById("btnExpand").setAttribute("image",
						"minimize.gif");
			} else {
				window.document.getElementById("btnExpand").setAttribute(
						"label", "Expand");
				document.getElementById("btnExpand").setAttribute("image",
						"maximize.gif");
			}
			window.document.getElementById("btnExpand").setAttribute(
					"disabled", "false");
		} else {
			window.document.getElementById("btnExpand").setAttribute(
					"disabled", "true");
		}

	},

	deleteSelected : function() {

		var tree = document.getElementById("elementList");
		var cidx = tree.currentIndex;
		var elementKey = tree.view.getCellText(cidx, tree.columns
						.getColumnAt(1));
		var elementId = tree.view
				.getCellText(cidx, tree.columns.getColumnAt(0));
		var yesorno = confirm("Are you sure you want to delete: " + elementKey
				+ "?");
		if (yesorno) {
			var pidx = this.treeView.getParentIndex(cidx);
			sqlite3.deleteLocatorById(elementId);
			this.loadData();
			// this.treeView.treeBox.invalidateRow(tree.currentIndex-1);
			this._tree.view.selection.clearSelection();
			this.treeView.toggleOpenState(pidx);
			this.treeView.toggleOpenState(pidx);
			this._tree.view.selection.select(cidx);
		}
	},

	getcellvalues : function() {
		var tree = document.getElementById("elementList");
		var treeView = tree.view;
		var sel = treeView.selection.currentIndex;
		// returns -1 if the tree is not focused
		alert(sel);
		var treeItem = treeView.getItemAtIndex(sel);
		// alert(treeView.getCellText(sel, tree.columns.getColumnAt(1)));

	},

	// this.getCellValueByColumnIndex(2);
	getCellValueByColumnIndex : function(idx) {
		var tree = document.getElementById("elementList");
		var treeView = tree.view;
		var sel = treeView.selection.currentIndex; // returns -1 if the tree is
		// not focused
		alert(sel);
		// var treeItem = treeView.getItemAtIndex(sel);
		alert(treeView.getCellText(sel, tree.columns.getColumnAt(idx)));

	},

	openOptions : function() {
		window.openDialog("chrome://pageobjects/content/optionsDialog.xul",
				"options", "chrome,centerscreen,modal,resizable", null);
	}

}
