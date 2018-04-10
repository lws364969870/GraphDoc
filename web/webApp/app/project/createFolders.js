define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("createFoldersHandler", { 
				init: function (dom){
					proj.clearViewModal();
					if(viewModal._$_params.type == "update"){
						viewModal.folders_Tile("修改文件夹");
					}else{
						viewModal.folders_Tile("创建文件夹");
					}
					if(viewModal._$_params.name != undefined){
						viewModal.folderName(viewModal._$_params.name);
					}
				}
			});
        },
       	//保存文件夹
       	saveFolders:function(){
       		if(viewModal._$_params.type == "add"){
       			api.createFolders({id:viewModal._$_params.parentId,name:viewModal.folderName()},function(res){
					if(res["code"] == 0){
	        			showAlert("创建文件夹成功！",function(){
	        				layer.closeAll(); //疯狂模式，关闭所有层
	        			});
	        		}else{
	        			showAlert(res["message"],function(){
	        				layer.closeAll(); //疯狂模式，关闭所有层
	        			});
	        		}
				})
       		}else{
       			api.replaceName({id:viewModal._$_params.id,name:viewModal.folderName()},function(res){
					if(res.code == 0){
						showAlert("修改文件夹成功",function(){
							layer.closeAll(); //疯狂模式，关闭所有层
						});		
					}else if(res.code == 1){
						showAlert(res.message,function(){
						
						});
					}
				})
       		}
       	},
       	returnFolders:function(){
       		layer.closeAll(); //疯狂模式，关闭所有层
       	},
       	//清除缓存
       	clearViewModal:function(){
       		viewModal.folderName("");
       		viewModal.folders_Tile("");
       	}
	}
	
	
	//页面模型
    var viewModal = {
    	saveFolders:proj.saveFolders,//保存
    	returnFolders:proj.returnFolders,//返回
    	folderName:ko.observable(""),//文件夹名称
    	folders_Tile:ko.observable(""),//弹窗标题
    }
	
	proj.init();
    return viewModal;
});