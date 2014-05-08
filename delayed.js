function Delayed(){
	
	var delayedScripts = [],	// queue of scripts waiting on dependancy
		loadedScripts = [],		// history of named scripts loaded
		func = "function",		// the following added for better minification
		undef = "undefined",	
		doc = document;
	
	// the main public function
	this.script = function(src, name, cb, dep){
		if(dep) {
			addDelayedScript(src, name, cb, dep);
		} else {
			_loadScript(src, cb, name);
		}
	};

	// adds script to wait if it has dep, 
	// but fires if its already loaded
	function addDelayedScript(src, name, cb, dep){
		if(typeof loadedScripts[dep] != undef) {
			_loadScript(src, cb, name);
		} else {
			if(typeof delayedScripts[dep] == undef)
				delayedScripts[dep] = [];
				
			delayedScripts[dep].push({src: src, name: name, cb: cb});
		}
	}
	
	// dynamically loads the script
	function _loadScript(src,cb,name){
		if(typeof src == func){
			src();
		} else {
			var sc = doc.createElement('script');
			//sc.type = 'text/javascript';
			sc.async = true;
			sc.onload = function(){scriptLoaded(cb,name)};
			
			// fixes an ie 9/10 bug by having both event types
			if(!sc.addEventListener) {
				sc.onreadystatechange = function(){
					if(sc.readyState=="complete" || sc.readyState=="loaded") sc.onload();
				}
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

		// check for waiting dependants
		if(typeof delayedScripts[name] == 'object') {
			// load each dependant
			for(var x=0; x<delayedScripts[name].length; x++){
				_loadScript(
					delayedScripts[name][x].src,
					delayedScripts[name][x].cb,
					delayedScripts[name][x].name
				);
			}
			// remove its waiting dependants from waiting
			delete delayedScripts[name];
		}
	}
}