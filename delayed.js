function Delayed(){
	
	var self = this;
	//this.delayedCSS = new Array();
	
	// holds scripts in waiting
	var delayedScripts = new Array();
	
	// a record of whats already ran
	var loadedScripts = new Array();
	
	// the main public function
	this.loadScript = function(src, name, cb, dep){
		if(dep) {
			addDelayedScript(src, name, cb, dep);
		} else {
			_loadScript(src, cb, name);
		}
	};

	// adds script to wait if it has dep, 
	// but fires if its already loaded
	function addDelayedScript(src, name, cb, dep){
		if(typeof loadedScripts[dep] != 'undefined') {
			_loadScript(src, cb, name);
		} else {
			if(typeof delayedScripts[dep] == 'undefined')
				delayedScripts[dep] = new Array();
				
			delayedScripts[dep].push({src: src, name: name, cb: cb});
		}				
	}
	
	// dynamically loads the script
	function _loadScript(src,cb,name){
		if(typeof src == 'function'){
			src();
		} else {
			var sc = document.createElement('script');
			//sc.type = 'text/javascript';
			sc.async = true;
			sc.onload = function(){scriptLoaded(cb,name)};
			sc.src = src;
			
			var bo = document.getElementsByTagName('body')[0];
			bo.appendChild(sc);
		}
	}
	
	// marks script as loaded, fires its callback, and loads any waiting scripts
	function scriptLoaded(cb,name){
		// mark the script as loaded
		loadedScripts[name] = true;
		
		// fire the callback
		cb();

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