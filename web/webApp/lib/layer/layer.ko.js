define(['durandal/app', "jquery", "layer"], function(app, $, i18n){


	return {
		open: function(url, layerConfig, params){

			var sid = Math.random().toString(36).substr(2);
			layerConfig.content = '<div id="' + sid + '"></div>';
			layer.open(layerConfig);

			app.setRoot(url, null, sid, params);

			return layer;
		}
	}

})