(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.inview = {})));
}(this, (function (exports) { 'use strict';

	(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
	var silInview = {
		bind: function(el, binding) {
			var observer;
			var settings = {
				observerOptions: {
					root: null,
					rootMargin: '0px',
					threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
				},
				OGclasses: null,
				setClasses: true,
				setCustomProperties: true,
				output: 'percentage',
				classes: {
					inview: 'is-inview',
					notinview: 'is-not-inview',
					below: 'is-below-view',
					above: 'is-above-view'
				},
				customProperties: {
					inview: 'inview'
				},
				centered: true,
				active: false,
				debug: false
			};
			var actions = {
				init: function () {
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
					observer = new IntersectionObserver(actions.set, settings.observerOptions);
					observer.observe(el);
				},
				set: function (entry) {
					var outputValue = 0;
					var inview = entry[0].intersectionRatio;
					
					if(settings.centered){
						if(settings.output == 'percentage') { outputValue = Math.floor(inview * 200) - 100 + '%'; }
						if(settings.output == 'number') { outputValue = inview - 0.5; }					
					} else {
						if(settings.output == 'percentage') { outputValue = Math.floor(inview * 100) + '%'; }
						if(settings.output == 'number') { outputValue = inview; }					
					}

					if (settings.setClasses) {
						if (inview > 0) { el.classList = actions.classes('notinview'); }
						else { el.classList = actions.classes('notinview'); }
					}

					if (settings.setCustomProperties) {
						el.style.setProperty(("--" + (settings.customProperties.inview)),outputValue);
					}
				},
				classes: function (status) {
					var classes = [];
					switch (status) {
						case 'inview':
							classes.push(settings.classes.inview);
						case 'notinview':
							classes.push(settings.classes.notinview);
					}
					if (settings.ogclasses) { classes.push(settings.ogclasses); }
					return classes.join(' ');
				}
			};
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
