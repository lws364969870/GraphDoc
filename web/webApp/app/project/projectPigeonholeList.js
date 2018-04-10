define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout', 'layerko','session','publicAjax','treeView','treeViewedit','public'], function (app, system, composition, $, ko,layerko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectPigeonholeListHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadMenu(0);//查询初始查询归档
					
				}
			});
        },
        loadMenu:function(parentId){
        	leftTreeFindRightsArchived(parentId);
        },
        rightMenu:function(){
        	var str = '';
        	api.findRightsArchived({name:viewModal.name()},function(res){
				if(res["code"] == 0){
					res = res["result"];
					for(var i = 0 ; i < res.length; i++){
						if(res[i]["type"] != 0){
							str += '<tr class="text-center">';
								str += '<td>';
									if(res[i]["type"] == 0){
										str += '<span>文件夹</span>';
									}else{
										str += '<span>文件</span>';
									}
								str += '</td>';
								str += '<td>'+res[i]["name"]+'</td>';
								str += '<td>'+res[i]["createMan"]+'</td>';
								str += '<td>'+res[i]["createDate"]+'</td>';
								str += '<td>';
									str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="downLoadFile(\''+res[i]["id"]+'\');">下载</button>';
									str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="preview(\''+res[i]["id"]+'\');">预览</button>';
									str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="replaceName(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+res[i]["name"]+'\');">重命名</button>';
									str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="deleteFolders(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+serialNumber+'\');">删除</button>';
								str += '</td>';
							str += '</tr>';
						}
					}
					$("#rightMenu").html(str);
				}else{
					$("#rightMenu").html("");
				}
			})
        },
        selectProId:function(event,target){
        	$(target.currentTarget).addClass("red");
        	$("#projectID").val(event.id);
        	api.findRightsArchived({serialNumber:viewModal._$_params.serialNumber,parentId:$("#projectID").val()},function(res){
        		if(res["code"] == 0){
        			app.setRoot('project/projectSelectTreeFolder', null, event.id,res["result"]);
        		}
        	})
        },
		testClick:function(even){
			console.log("--------");
			console.log(viewModal.projectIds());
		},
		//创建一级目录
		createTopFolders:function(){
			layerko.open('project/createFolders_Pigeonhole', {
                type: 1, 
                title:'创建一级目录',
                content: '',//内容
                area: ['540px','180px'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: false,//是否允许浏览器出现滚动条
                end:function(){
                	proj.loadMenu("0");//查询初始查询归档
                }
          	}, null);
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
		//删除  文件夹  || 文件
		deleteFolders:function(even){
			if(even.type == 0){
				api.deleteFolders({id:even.id},function(res){
					if(res["code"] == 0){
						showAlert("删除文件夹成功！",function(){
							proj.loadMenu("0");//查询初始查询归档
						});		
					}else{
						showAlert(res.message,function(){});
					}
				})
			}else if (even.type == 1){
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
			viewModal.name("");//文件名称
//			viewModal.rightMenu([]);
		}
	}
	
	
	//页面模型
    var viewModal = {
    	name:ko.observable(""),//文件名称
    	
    	parentId:ko.observable(),			//项目ID
        projects:ko.observableArray(),		//table中的数据
        childMenu:ko.observableArray(),		//子级菜单
		projectIds:ko.observableArray(),	//设置为选中状态
		checkAll:ko.observable(false),		//全选按钮 开始默认不选
//		rightMenu:ko.observableArray(),
		
		testClick:proj.testClick,
		rightMenu:proj.rightMenu,
		createTopFolders:proj.createTopFolders,//创建一级目录
		createFolders:proj.createFolders,	//创建文件夹
		deleteFolders:proj.deleteFolders,	//删除文件夹
		replaceName:proj.replaceName,		//修改文件/文件夹
		createFile:proj.createFile,			//创建文件
		download:proj.download,				//下载
		preview:proj.preview,				//预览
		
		selectProId:proj.selectProId,
    }
	proj.init();
    return viewModal;
});