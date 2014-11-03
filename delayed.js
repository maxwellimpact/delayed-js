function D(){
	
	var delayedScripts = [],	// queue of scripts waiting on dependancy
		loadedScripts = [],		// history of named scripts loaded
		func = "function",		// the following added for better minification
		undef = "undefined",	
		doc = document;

	// adds script to wait if it has dep, 
	// but fires if its already loaded
	this.script = function(src, name, cb, dep){
		if(!dep || loadedScripts[dep]) {
			_loadScript(src, cb, name);
		} else {
			delayedScripts[dep] = [];	
			delayedScripts[dep].push([src, name, cb]);
		}
	};
	
	// dynamically loads the script
	function _loadScript(src,cb,name){
		if(typeof src == func){
			src();
		} else {
			var sc = doc.createElement('script');

			sc.async = true;
			sc.onload = function(){scriptLoaded(cb,name)};
			
			// prevent firing load event twice on ie 9/10
			// http://msdn.microsoft.com/en-us/library/ie/hh180173(v=vs.85).aspx
			if(!sc.addEventListener && sc.readyState) {
				sc.onreadystatechange = sc.onload;
			}

			sc.src = src;
			
			var bo = doc.getElementsByTagName('body')[0];
			bo.appendChild(sc);
		}
	}
	
	// marks script as loaded, fires its callback, and loads any waiting scripts
	function scriptLoaded(cb,name){
		// mark the script as loaded
		loadedScripts[name] = true;
		
		// fire the callback
		if(typeof cb == func) cb();

		if(!delayedScripts[name]) delayedScripts[name]=[];

		// load each dependant
		for(var x=0; x<delayedScripts[name].length; x++){
			_loadScript(
				delayedScripts[name][x][0], //src
				delayedScripts[name][x][1], //name
				delayedScripts[name][x][2]  //cb
			);
		}
		
		// remove its waiting dependants from waiting
		delete delayedScripts[name];
	}
}delayed=new D;