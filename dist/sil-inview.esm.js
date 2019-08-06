(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var silInview = {
	bind: function(el, binding) {
		var observer;
		var settings = {
			observerOptions: {
				root: null,
				rootMargin: '0px',
				threshold: []
			},
			active: false,
			debug: false
		};
		var actions = {
			init: function () {
				if(!binding.value) { return; }
				else {
					if(binding.value.root) { settings.observerOptions.root = binding.value.root; }
					if(binding.value.margin) { settings.observerOptions.rootMargin = binding.value.margin; }
					if(binding.value.treshold) { settings.observerOptions.treshold = binding.value.treshold; }
				}
			},
			observer: function () {
				observer = new IntersectionObserver(actions.set,settings.observerOptions);
				observer.observe(el); 
			},
			set: function (entry) {
				console.log(entry, el);
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

export default silInview;
export { install };
