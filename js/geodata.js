
var apiController = {
	url: null,
	isConnected: false,
	"connect": function(host) {
		this.url = 'http://' + host;
		this.isConnected = true;
		uiController.setConnected(true);
		mapController.setEnabled(true);
	},
	"search": function(params) {
		var bounds = mapController.getBounds()
		var bbox = bounds.northLat + "," + bounds.westLng + "," + bounds.southLat + "," + bounds.eastLng

		$.ajax({
			url: this.url,
			type: 'GET',
			data: {query: params.name, size: params.size, bbox: bbox},
			dataType: 'json',
			beforeSend: function(xhr){xhr.setRequestHeader('X-GeodataAPI-Token', '123');},
			success: function(result) {
				var hits = result.hits;
				var message = "<strong>" + hits.length + "</strong> hits " + 
					" in <strong>" + result.took + "</strong> ms";
				$("span#took").html(message).show()
				mapController.drawResult(hits);
			}
		})

	}
}