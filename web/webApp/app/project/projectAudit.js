define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var pageSize = 50 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("projectAuditHandler", { 
				init: function (dom){
					proj.clearViewModal();
					if(viewModal._$_params.params.type == 'H001'){
						viewModal.type(false);
					}
					
					proj.loadUser(1);
					
				}
			});
        },
        
        loadUser:function(page){
        	var obj = {};
        	if(viewModal.userName != null){
        		obj.userName = viewModal.userName();
        	}
        	viewModal.arrList([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
        	api.findUserByPage(page,pageSize,obj,function (res) {
        		if(res["code"] == 0){
        			res = res["result"];
        			if(res["result"].length >  0 ){
	        			viewModal.arrList(res["result"]);
	        			var arr = [];
	    				if(res["totalPage"] < endPage){
	    					endPage = res["totalPage"];
	    					viewModal.maxPageNum(endPage);
	    				}else{
	    					viewModal.maxPageNum(endPage+1);
	    				}
						
						viewModal.minPageNum(startPage);
	    				
	                	for (var i = startPage ; i < endPage; i++) {
	                		arr.push(i+1);
	                	}
	        			viewModal.pagesArray(arr);
	        			viewModal.isShowPage(true);
	        		}
        		}
            })
        },
        gotoPage:function(page){
        	if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadUser(page);
        	}
    	},
    	
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadUser(page);
    		}
    	},
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadUser(page);
    		}
    	},
    	
    	selectCheck:function(){
    		var str = '';
        	$("input[name=auditCheck]").each(function(index){
        		if($(this).is(":checked")){
        			if(str.length > 0){str+=',';}
        			str += $(this).val();
        		}
        	})
        	return str;
    	},
    	
        //审批通过
        consentExamine:function(){
        	if(submitFun()){
    			var requeset = {
	        		projectId:viewModal._$_params.id,//项目ID
	        		opinion:viewModal.auditName()//意见
	        	};
	        	receiveUserIds = proj.selectCheck();
        		api.commitProject(requeset,receiveUserIds,function(res){
	        		if(res["code"] == 0){
	        			showAlert("审批通过！",function(){
	        				layer.closeAll(); //疯狂模式，关闭所有层
	        				app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
	        			});
	        		}else{
	                	showAlert(res["message"],function(){});
	                }
	        	})
        	}
        },
        turnDown:function(){
        	if(submitFun()){
    			var requeset = {
	        		projectId:viewModal._$_params.id,//项目ID
	        		opinion:viewModal.auditName()//意见
	        	};
	        	receiveUserIds = proj.selectCheck();
        		api.rollbackProject(requeset,receiveUserIds,function(res){
	        		if(res["code"] == 0){
	        			showAlert("审批不通过！",function(){
	        				layer.closeAll(); //疯狂模式，关闭所有层
	        				app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
	        			});
	        		}else{
	                	showAlert(res["message"],function(){});
	                }
	        	})
        	}
        },
        
        
        //返回
      	returnProjectMenthod:function(){
      		layer.closeAll(); //疯狂模式，关闭所有层
      	},
       	//清除缓存
       	clearViewModal:function(){
       		viewModal.type(true);
       		viewModal.auditName("");
       		viewModal.arrList([]);//集合
       		startPage = 0;
    		endPage = 5 ;
	    	viewModal.maxPageNum(num);
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.isShowPage(false);
       	}
	}
	
	
	//页面模型
    var viewModal = {
    	consentExamine:proj.consentExamine,//审批通过
    	turnDown:proj.turnDown,//审批不通过
    	returnProject:proj.returnProjectMenthod,
    	returnFolders:proj.returnFolders,//返回
    	
    	auditName:ko.observable(""),//审批意见
    	arrList:ko.observableArray(),//集合
    	type:ko.observable(true),//类型
    	//分页
		isShowPage:ko.observable(false),//是否显示分页
		currentPage:ko.observable(num),//当前页
		pageSize:ko.observable(pageSize),//行数
		gotoPage:proj.gotoPage,//跳转
		upPage:proj.upPage,//上一页
		nextPage:proj.nextPage,//下一页
		
		startPage:ko.observable(0),//开始显示
    	endPage:ko.observable(row),//结束显示
    	maxPageNum:ko.observable(num),
    	minPageNum:ko.observable(num),
        pagesArray:ko.observableArray([]),
    }
	
	proj.init();
    return viewModal;
});