(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.inview = {})));
}(this, (function (exports) { 'use strict';

	(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
	var silInview = {
		bind: function(el, binding) {
			// The observer
			var observer;
			
			// Default settings
			var settings = {
				observerOptions: {
					root: null,
					rootMargin: '0px',
					threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
				},
				OGclasses: null,
				setClasses: true,
				setCustomProperties: true,
				output: 'number',
				classes: {
					inview: 'is-inview',
					notinview: 'is-not-inview',
					below: 'is-below-view',
					above: 'is-above-view'
				},
				customProperties: {
					inview: 'inview'
				},
				inviewValue: 0,
				centered: true,
				active: false,
				debug: false
			};
			var actions = {
				init: function () {
					// When there are any custom settings, these are defined here. 
					if (el.classList.length > 0) {
						settings.ogclasses = el.classList;
					}
					if (!binding.value) { return; }
					else {
						if (binding.value.root)
							{ settings.observerOptions.root = binding.value.root; }
						if (binding.value.margin)
							{ settings.observerOptions.rootMargin = binding.value.margin; }
						if (binding.value.treshold)
							{ settings.observerOptions.treshold = binding.value.treshold; }
						if (binding.value.active) { settings.active = binding.value.active; }
						if (binding.value.setClasses)
							{ settings.setClasses = binding.value.setClasses; }
						if (binding.value.setCustomProperties)
							{ settings.setCustomProperties = binding.value.setCustomProperties; }
						if (binding.value.output) { settings.output = binding.value.output; }
					}	
					if(!binding.value.treshhold){
						var thresholdSets = [];
						for (var i=0; i<=1.0; i+= 0.01) {
							thresholdSets[0].push(i);
						}
						settings.observerOptions.treshhold = thresholdSets;
					} else {
						settings.observerOptions.treshhold = binding.value.treshhold;
					}
				},
				observer: function () {
					// Initiate the observer
					observer = new IntersectionObserver(actions.set, settings.observerOptions);
					observer.observe(el);
				},
				set: function (entry) {
				
					// Define variables
					var outputValue = 0;
					settings.inviewValue = entry[0].intersectionRatio;
					
					
					// If the returning value is centered, that means that you get back a 0% or 0.5; as a middle value. So your translate can be
					// 0% when its full inview.
					if(settings.centered){
						if(settings.output == 'percentage') { outputValue = (Math.floor(settings.inviewValue * 100) - 100) + '%'; }
						if(settings.output == 'number') { outputValue = Math.round(settings.inviewValue * 100) / 100; }					
					} else {
						if(settings.output == 'percentage') { outputValue = Math.floor(settings.inviewValue * 100) + '%'; }
						if(settings.output == 'number') { outputValue = Math.round(settings.inviewValue * 100) / 100; }				
					}
					
					// Set the classes if applicable
					// el.classList = 
					actions.classes();
				
					// Set the custom properties if applicable
					if (settings.setCustomProperties) {
						el.style.setProperty(("--" + (settings.customProperties.inview)),outputValue);
					}
					
				},
				classes: function (status) {
					var classes = [];
					console.log(classes);

					// Check if if its inview
					if(settings.inviewValue > 0) { el.classList.replace(settings.classes.inview,settings.classes.notinview); }
					else { el.classList.replace(settings.classes.notinview,settings.classes.inview); }

					// Check the position of the fold
					if(settings.inviewValue > 0) { classes.push(settings.classes.inview); }
					else { classes.push(settings.classes.inview); }

		
					if (settings.ogclasses) { classes.push(settings.ogclasses); }
					return classes.join(' ');
				}
			};
			
			// Initiate the settings and the observer
			actions.init();
			actions.observer();
		}
	};

	// Import vue component

	// install function executed by Vue.use()
	function install(Vue) {
		if (install.installed) { return; }
		install.installed = true;
		
		Vue.directive('inview',silInview);
		
	}

	// Create module definition for Vue.use()
	var plugin = {
		install: install,
	};

	// To auto-install when vue is found
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	// It's possible to expose named exports when writing components that can
	// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
	// export const RollupDemoDirective = component;

	exports.install = install;
	exports.default = silInview;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
