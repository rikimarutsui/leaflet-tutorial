L.Control.RangeNoUISlider = L.Control.extend({
	update: function(minValue, maxValue){
		return {"minValue": minValue, "maxValue": maxValue};
	},
	
	options: {
		position: 'topright',
		step: 150,
		start: [1450, 3000], // Handles start at ...
		margin: 300, 		 // ... must be at least 300 apart
		limit: 1300, 		 // ... but no more than 1300
		minValue: 0,
		maxValue: 3250,
		connect: true,		 // Display colored bars between handles
		direction: 'rtl',	 // Put '0' at the bottom of the slider
		orientation: 'vertical',
		id: 'slider',
		
		/* Move handle on tap, bars are draggable */
		behaviour: 'tap-drag',
		tooltips: true,
		range: {
			'min': 0,
			'max': 3250
		},
		format: wNumb({
			decimals: 0
		}),

		/* Show a scale with the slider */
		pips: {
			mode: 'steps',
			stepped: true,
			density: 2
		},
		
		getValue: function(minValue, maxValue){
			return {"minValue": minValue, "maxValue": maxValue};
		}
		
	},
	
	initialize: function(f, options) {
		L.Util.setOptions(this, options);
		
		if(typeof f == "function") { this.update = f; }
		else{ 
			this.update = function(minValue, maxValue){ 
				console.log("minValue : " + minValue + ", maxValue: " + maxValue); 
			};	
		}
		if(typeof this.options.getValue != "function"){ 
			this.options.getValue = function(minValue, maxValue){
			return {"minValue": minValue, "maxValue": maxValue};
		}};
		
		if (this.options.orientation!='vertical') {
            this.options.orientation = 'horizontal';
        }
	},
	
	onAdd: function(map) {
		var controlElement = L.DomUtil.create('div', this.options.id + ' ' + this.options.id + '-' + this.options.orientation);
		
		// Continue implementing the control here.

		return controlElement;
	},
	
	onRemove: function(map){
		// Tear down the control.
	}
});

L.Control.rangenouislider = function(f, options) {
	return new L.Control.RangeNoUISlider(f, options);
};