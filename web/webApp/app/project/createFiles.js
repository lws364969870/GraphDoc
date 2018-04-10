define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','public'], 
function (app, system, composition, $, ko) {
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("createFilesHandler", { 
				init: function (dom){
//					uploader.open(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+viewModal._$_params);
//					ajaxFileUpload(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+viewModal._$_params);
				}
			});
        },
        showUp:function(){
        	ajaxFileUpload(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+viewModal._$_params);
        },
        uploadInit:function(){
        	ajaxFileUpload(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+viewModal._$_params);
        },
        //上传文件
       	saveFolders:function(){
//     		ajaxFileUpload(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+viewModal._$_params);
       	},
       	returnFolders:function(){
       		layer.closeAll(); //疯狂模式，关闭所有层
       	},
       	clearViewModal:function(){
       		
       	}
	}
	
	
	//页面模型
    var viewModal = {
    	saveFolders:proj.saveFolders,//保存按钮
    	returnFolders:proj.returnFolders,//返回按钮
    	folderName:ko.observable(""),//文件夹名称
    	
    	showUp:proj.showUp
    }
	
	proj.init();
    return viewModal;
});