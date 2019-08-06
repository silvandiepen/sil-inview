<script>
export default {
	bind: function(el, binding) {
		let observer;
		let settings = {
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
		let actions = {
			init: () => {
				if (el.classList.length > 0) {
					settings.ogclasses = el.classList;
				}
				if (!binding.value) return;
				else {
					if (binding.value.root)
						settings.observerOptions.root = binding.value.root;
					if (binding.value.margin)
						settings.observerOptions.rootMargin = binding.value.margin;
					if (binding.value.treshold)
						settings.observerOptions.treshold = binding.value.treshold;
					if (binding.value.active) settings.active = binding.value.active;
					if (binding.value.setClasses)
						settings.setClasses = binding.value.setClasses;
					if (binding.value.setCustomProperties)
						settings.setCustomProperties = binding.value.setCustomProperties;
					if (binding.value.output) settings.output = binding.value.output;
				}	
				if(!binding.value.treshhold){
					let thresholdSets = [];
					for (let i=0; i<=1.0; i+= 0.01) {
						thresholdSets[0].push(i);
					}
					settings.observerOptions.treshhold = thresholdSets;
				} else {
					settings.observerOptions.treshhold = binding.value.treshhold;
				}
			},
			observer: () => {
				observer = new IntersectionObserver(actions.set, settings.observerOptions);
				observer.observe(el);
			},
			set: (entry) => {
				let outputValue = 0;
				let inview = entry[0].intersectionRatio;
				let percentage = Math.floor(inview * 100);
				
				if(settings.centered){
					if(settings.output == 'percentage') { outputValue = (Math.floor(inview * 100) - 100) + '%'; }
					if(settings.output == 'number') { outputValue = Math.round(inview * 100) / 100; }					
				} else {
					if(settings.output == 'percentage') { outputValue = Math.floor(inview * 100) + '%'; }
					if(settings.output == 'number') { outputValue = Math.round(inview * 100) / 100; }				
				}

				if (settings.setClasses) {
					if (inview > 0) el.classList = actions.classes('notinview');
					else el.classList = actions.classes('notinview');
				}

				if (settings.setCustomProperties) {
					el.style.setProperty(`--${settings.customProperties.inview}`,outputValue);
				}
			},
			classes: (status) => {
				let classes = [];
				switch (status) {
					case 'inview':
						classes.push(settings.classes.inview);
					case 'notinview':
						classes.push(settings.classes.notinview);
				}
				if (settings.ogclasses) classes.push(settings.ogclasses);
				return classes.join(' ');
			}
		};
		actions.init();
		actions.observer();
	}
};
</script>
