define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
    var proj = {
        init : function(){
            //初始化组件
            composition.addBindingHandler("pageListHandler", {
                init: function (dom){
                	
                }
            });
        },

    }


    //页面模型
    var viewModal = {
        
    }

    proj.init();
    return viewModal;
});