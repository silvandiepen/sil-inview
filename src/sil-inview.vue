<script>
export default {
	bind: function(el, binding) {
		let observer;
		let settings = {
			observerOptions: {
				root: null,
				rootMargin: '0px',
				threshold: []
			},
			active: false,
			debug: false
		};
		let actions = {
			init: () => {
				if(!binding.value) return;
				else {
					if(binding.value.root) settings.observerOptions.root = binding.value.root;
					if(binding.value.margin) settings.observerOptions.rootMargin = binding.value.margin;
					if(binding.value.treshold) settings.observerOptions.treshold = binding.value.treshold;
				}
			},
			observer: () => {
				observer = new IntersectionObserver(actions.set,settings.observerOptions);
				observer.observe(el); 
			},
			set: (entry) => {
				console.log(entry, el);
			}
		}
		actions.init();
		actions.observer();

	}
};
</script>
