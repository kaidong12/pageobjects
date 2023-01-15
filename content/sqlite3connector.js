var sqlite3 = {
	conn : null,
	// filepath : "Desk",
	filepath : function() {
		var defaultDataFolder = Option.getUserPrefChar("extensions.pageobjects.defaultDataFolder","Desk");
		if(defaultDataFolder == "userdir1"){
			return Option.getUserPrefComplex("extensions.pageobjects.defaultUserFolder1","Desk");
		}else{
			return defaultDataFolder;
		}
	},
	filename : "locators.sqlite",

	openconnection : function() {
		if (this.conn == null) {
			Components.utils.import("resource://gre/modules/Services.jsm");
			Components.utils.import("resource://gre/modules/FileUtils.jsm");

			var filepath = this.filepath();
			var file = null;
			if(typeof(filepath) == "object"){
				// // 1. Write path to prefs
				// var prefs =
				// Components.classes["@mozilla.org/preferences-service;1"].
				// getService(Components.interfaces.nsIPrefService).
				// getBranch("extensions.myext.");
				// prefs.setComplexValue("filename",
				// Components.interfaces.nsILocalFile, file);
				//
				// // 2. Read path from prefs
				// var file = prefs.getComplexValue("filename",
				// Components.interfaces.nsILocalFile);
				filepath.append(this.filename);
				file = filepath;
			}else{
				file = FileUtils.getFile(filepath, [this.filename]);
				// Will also create the file if it does not exist
			}
			
			mDBConn = Services.storage.openDatabase(file);
			
			// var sql = "PRAGMA locking_mode=EXCLUSIVE";
			// mDBConn.executeSimpleSQL(sql);
			this.conn = mDBConn;
		}
	},

	closeconnection : function() {
		if (this.conn != null) {
			this.conn.asyncClose();
			this.conn = null;
		}
	},

	createTable : function(sql) {

		try {
			this.openconnection();
			var sql = "CREATE TABLE IF NOT EXISTS elements(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL, locator TEXT, parent INTEGER NOT NULL, level INTEGER NOT NULL, lindex INTEGER NOT NULL, type INTEGER NOT NULL);";
			this.conn.executeSimpleSQL(sql);
		} catch (e) {
			alert("createTable: \n" + e);
		} finally {
			this.closeconnection();
		}

	},

	insertLocator : function(key, locator, parent, level, index, type) {

		// alert("key: "+key+" locator: "+locator+" parent: "+parent+" level: "+
		// level +" index: "+ index +" type: "+type);

		var sql = "INSERT INTO elements(key, locator, parent, level, lindex, type) VALUES(:key, :locator, :parent, :level, :index, :type);";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("key", key);
			bp.bindByName("locator", locator);
			bp.bindByName("parent", parent);
			bp.bindByName("level", level);
			bp.bindByName("index", index);
			bp.bindByName("type", type);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();
		} catch (e) {
			alert("insertLocator: \n" + e);

		} finally {
			stmt.reset();
			this.closeconnection();
		}

	},

	getAllElements : function() {
		var results = [];
		var sql = "SELECT id, key, locator, parent, level, lindex, type FROM elements ORDER BY parent, type, id;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			while (stmt.executeStep()) {
				let id = stmt.row.id;
				let key = stmt.row.key;
				let locator = stmt.row.locator;
				let parent = stmt.row.parent;
				let level = stmt.row.level;
				let lindex = stmt.row.lindex;
				let type = stmt.row.type;

				let rowArray=new Array();
				rowArray.push(id);
				rowArray.push(key);
				rowArray.push(locator);
				rowArray.push(parent);
				rowArray.push(level);
				rowArray.push(lindex);
				rowArray.push(type);
				// rowArray.push(false);

				results.push(rowArray);

			}
			return results;

		} catch (e) {
			alert("getAllElements: \n" + e);

		} finally {
			stmt.reset();
			this.closeconnection();
		}
	},

	updateKeyById : function(locatorId, key) {
		var sql = "UPDATE elements SET key=:key WHERE id=:locatorId;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("locatorId", locatorId);
			bp.bindByName("key", key);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();

		} catch (e) {
			alert("updateKeyById: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}

	},
	
	updateLocatorById : function(locatorId, locator) {
		var sql = "UPDATE elements SET locator=:locator WHERE id=:locatorId;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("locatorId", locatorId);
			bp.bindByName("locator", locator);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();

		} catch (e) {
			alert("updateLocatorById: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}

	},

	deleteLocatorById : function(locatorId) {
		var sql = "DELETE FROM elements WHERE id=:locatorId;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("locatorId", locatorId);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();

		} catch (e) {
			alert("deleteLocatorById: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}

	},

	getChildrenByPid : function(parentId) {
		var results = [];
		var sql = "SELECT id FROM elements WHERE parent=:parent;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("parent", parentId);
			params.addParams(bp);
			stmt.bindParameters(params);

			while (stmt.executeStep()) {
				results.push(stmt.row.id);
			}
			return results;
		} catch (e) {
			alert("getChildrenByPid: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}
	},

	getParentByChild : function(childid) {
		var sql = "SELECT parent FROM elements WHERE id=:id;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("id", childid);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();
			return stmt.row.parent;
		} catch (e) {
			alert("getParentByChild: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}
	},

	getKeyByID : function(id) {
		var sql = "SELECT parent FROM elements WHERE id=:id;";
		var stmt = null;

		try {
			this.openconnection();
			stmt = this.conn.createStatement(sql);
			var params = stmt.newBindingParamsArray();
			bp = params.newBindingParams();
			bp.bindByName("id", id);
			params.addParams(bp);
			stmt.bindParameters(params);

			stmt.executeStep();
			return stmt.row.parent;
		} catch (e) {
			alert("getKeyByID: \n" + e);
		} finally {
			stmt.reset();
			this.closeconnection();
		}
	},

	handleError : function(aError) {
		print("Error: " + aError.message);
	},

	handleCompletion : function(aReason) {
		if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
			print("Query canceled or aborted!");
	}

};
