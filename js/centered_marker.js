// Define the overlay, derived from google.maps.OverlayView
function CenteredMarker(opt_options) {
	// Initialization
	this.setValues(opt_options);
	
	// Center specific
	var img = document.createElement('img');
	img.src = "img/marker-blue.png"; 
	
	var div = this.div_ = document.createElement('div');

	div.appendChild(img);
	div.style.cssText = 'position: absolute; display: none';
};

CenteredMarker.prototype = new google.maps.OverlayView;

// Implement onAdd
CenteredMarker.prototype.onAdd = function() {
	var pane = this.getPanes().overlayLayer;
	pane.appendChild(this.div_);
	
	// Ensures the center is redrawn if the map center changes
	var me = this;
	this.listeners_ = [
		google.maps.event.addListener(this.getMap(), 'center_changed',
			function() { me.draw(); }),
	];
};

// Implement onRemove
CenteredMarker.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	
	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		maps.google.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
CenteredMarker.prototype.draw = function() {
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.getMap().getCenter());
	
	var div = this.div_;
	div.style.left = position.x - 10 + 'px';
	div.style.top = position.y - 35 + 'px';
	div.style.display = 'block';
};