requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0.debug',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'session':'../lib/jquerysession',//session
        'treeView':'../lib/treeView/jquery.treeview',//树状接口1（必选）
        'treeViewedit':'../lib/treeView/jquery.treeview.edit',//树状接口2（必选）
        'publicAjax':'../lib/publicAjax',//所有接口
		'layer':'../lib/layer/2.4/layer',
		'layer1':'../lib/layer/layer',
		'layerko':'../lib/layer/layer.ko',
		'uploader':'../lib/upLoadFile/webuploader',
		'preview':'../lib/upLoadFile/uploadPreview',
		'uploaderko':'../lib/upLoadFile/upLoad.ko',
		'public':'../lib/public',
		'jedate':'../lib/jedate/jquery.jedate',
		'Lodop':'../lib/printTool/LodopFuncs',
		'printTools':'../lib/printTool/print.tools'
    },

    shim: {
    	'durandal': {
            deps: ['jquery'],
            exports: 'jQuery'
        } ,
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        } ,
        'session': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'publicAjax': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
		'layer':{
			deps: ['jquery'],
            exports: 'jQuery'
		},
		'uploader': {
            deps: ['jquery'],
            exports: 'jQuery'
        } ,
        'preview': {
            deps: ['uploader'],
            exports: 'uploader'
        } ,
		'public':{
			deps: ['jquery'],
            exports: 'jQuery'
		},
		'treeViewedit': {
            deps: ['treeView'],
            exports: 'TreeView'
        } ,
        'jedate': {
            deps: ['jquery'],
            exports: 'jQuery'
        } ,
    }
});


define(['durandal/system', 'durandal/app', 'bootstrap','session','publicAjax','public','layer'], function (system, app) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = '图文档';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: {
            kinds: ['expander']
        }
    });
    
    app.start().then(function () {
//  	app.setRoot('project/projectProductQualified_write');//合计证
        app.setRoot('login/login');
//         app.setRoot('desktop/shell');
    });
});