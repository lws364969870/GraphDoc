define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout', 'layerko','session','publicAjax','treeView','treeViewedit','public'], function (app, system, composition, $, ko,layerko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectFileManageHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadMenu("0");//查询初始查询归档
					
				}
			});
        },
        loadMenu:function(parentId){
        	leftTree(viewModal._$_params.serialNumber,parentId);
        },
        rightMenu:function(parentId){
        	api.findArchived({serialNumber:viewModal._$_params.serialNumber,parentId:parentId},function(res){
        		if(res["code"] == 0){
					res = res["result"];
        			viewModal.rightMenu(res);
        		}
        	})
        },
        selectProId:function(event,target){
        	$(target.currentTarget).addClass("red");
        	$("#projectID").val(event.id);
        	api.findArchived({serialNumber:viewModal._$_params.serialNumber,parentId:$("#projectID").val()},function(res){
        		if(res["code"] == 0){
        			app.setRoot('project/projectSelectTreeFolder', null, event.id,res["result"]);
        		}
        	})
        },
		testClick:function(even){
			console.log("--------");
			console.log(viewModal.projectIds());
		},
		
		//创建文件夹
		createFolders:function(){
			if($("#projectID").val() == ""){
				showAlert("请选择路径！",function(){});
			}else{
				layerko.open('project/createFolders', {
	                type: 1, 
	                title:'创建文件夹',
	                content: '',//内容
	                area: ['540px','180px'],
	                move: false,//触发拖动的元素
	                resize: false,//是否允许拉伸
	                shadeClose: false,//是否点击遮罩关闭
	                scrollbar: false,//是否允许浏览器出现滚动条
	                end:function(){
	                	proj.loadMenu("0");//查询初始查询归档
	                }
	          	}, {parentId:$("#projectID").val(),type:"add"});
			}
		},
		//上传文件
		createFile:function(){
			if($("#projectID").val() == ""){
				showAlert("请选择路径！",function(){});
			}else{
				layerOpen('上传文件',
				["80%","80%"],
				['upLoad.html'],
				["关闭"],
				null,
				function(layero, index){
					var iframeWin = window[layero.find('iframe')[0]['name']]; 
					iframeWin.layerInit(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+$("#projectID").val());
				},
				[
					function(index,layero){
						layer.close(index);
						proj.loadMenu("0");//查询初始查询归档
					}
				],
				null
				);
	        }
		},
		//判断是否有批量删除的数据
		selectFile:function(){
			$("input[name=batchCheck]").each(function(index,element){
				if($(this).is(":checked")){
					proj.batchDel();
				}else{
					showAlert("请选择需要批量删除的数据！",function(index){
						layer.close(index);
					})
				}
			})
		},
		//全选
		selectAll:function(){
			$("input[name=batchCheck]").prop("checked",true);
		},
		
		//反选
		unSelect:function(){
			$("input[name=batchCheck]").prop("checked",false);
		},
		//批量删除文件
		batchDel:function(){
			if($("input[name=batchCheck]").length > 0){
				showconfirm("是否批量删除文件！",function(){
					$("input[name=batchCheck]").each(function(index,element){
						if($(this).is(":checked")){
							api.deleteFile({id:$(this).val()},function(res){
								if(res["code"] == 0){
									if(($("input[name=batchCheck]").length-1) == index){
										showAlert("批量删除文件成功！",function(index){
											layer.close(index);
											proj.loadMenu("0");//查询初始查询归档
										})
									}
								}else{
									showAlert("删除该文件失败！",function(index){
										layer.close(index);
										proj.loadMenu("0");//查询初始查询归档
									})
								}
							})
						}
					})
				})
			}
		},
		//删除  文件夹  || 文件
		deleteFolders:function(even){
			if(even.type == 0){
				showconfirm("是否删除该文件夹！",function(){
			        api.deleteFolders({id:even.id},function(res){
						if(res["code"] == 0){
							
							showAlert("删除文件夹成功！",function(){
								proj.loadMenu("0");//查询初始查询归档
							});		
						}else{
							showAlert(res.message,function(){});
						}
					})		
			    })
			}else if (even.type == 1){
				showconfirm("是否删除该文件！",function(){
					api.deleteFile({id:even.id},function(res){
						if(res["code"] == 0){
							showAlert("删除文件成功！",function(){
								proj.loadMenu("0");//查询初始查询归档
							});		
						}else{
							showAlert(res.message,function(){
								
							});
						}
					})
				})
			}
		},
		//修改文件夹
		replaceName:function(even){
			var alertStr = "";
			if(even.type == 0){
				layerko.open('project/createFolders', {
	                type: 1, 
	                title:'修改文件夹',
	                content: '',//内容
	                area: ['540px','180px'],
	                move: false,//触发拖动的元素
	                resize: false,//是否允许拉伸
	                shadeClose: false,//是否点击遮罩关闭
	                scrollbar: false,//是否允许浏览器出现滚动条
	                end:function(){
	                	proj.loadMenu("0");//查询初始查询归档
	                }
	          	}, {parentId:viewModal.parentId(),type:"update",id:even.id,name:even.name});
			}else{
				layerko.open('project/createFolders', {
	                type: 1, 
	                title:'修改文件',
	                content: '',//内容
	                area: ['540px','180px'],
	                move: false,//触发拖动的元素
	                resize: false,//是否允许拉伸
	                shadeClose: false,//是否点击遮罩关闭
	                scrollbar: false,//是否允许浏览器出现滚动条
	                end:function(){
	                	proj.loadMenu("0");//查询初始查询归档
	                }
	          	}, {parentId:viewModal.parentId(),type:"update",id:even.id,name:even.name});
			}
		},
		//下载
		download:function(even){
			showAlert("未完成下载",function(){
						
					});
		},
		//预览
		preview:function(even){
			showAlert("未完成下载",function(){
						
			});
		},
		//清除缓存数据
		clearViewModal:function(){
			viewModal.projects([]);//table中的数据
			viewModal.projectIds([]);//设置为选中状态
			viewModal.checkAll(false);//全选按钮 开始默认不选
			
			viewModal.rightMenu([]);
		}
	}
	
	
	//页面模型
    var viewModal = {
    	parentId:ko.observable(),			//项目ID
        projects:ko.observableArray(),		//table中的数据
        childMenu:ko.observableArray(),		//子级菜单
		projectIds:ko.observableArray(),	//设置为选中状态
		checkAll:ko.observable(false),		//全选按钮 开始默认不选
		rightMenu:ko.observableArray(),
		
		testClick:proj.testClick,
		
		createFolders:proj.createFolders,	//创建文件夹
		deleteFolders:proj.deleteFolders,	//删除文件夹
		selectFile:proj.selectFile,			//判断是否批量删除的数据
		batchDel:proj.batchDel,				//批量删除文件
		selectAll:proj.selectAll,			//全选
		unSelect:proj.unSelect,				//不选
		replaceName:proj.replaceName,		//修改文件/文件夹
		createFile:proj.createFile,			//创建文件
		download:proj.download,				//下载
		preview:proj.preview,				//预览
		
		selectProId:proj.selectProId,
    }
	
//	viewModal.checkAll.subscribe(function(newVale){
//		if(newVale){
//			var arr = [];
//			for(var i = 0 ; i < viewModal.projects().length ; i++){
//				arr.push(viewModal.projects()[i]["id"]);
//			}
//			viewModal.projectIds(arr);
//		}else{
//			viewModal.projectIds(false);
//		}
//		
//	})
	
	viewModal.projectIds.subscribe(function(newVale){
//		debugger
		
//		console.log(viewModal.projects().length)
	})
	proj.init();
    return viewModal;
});