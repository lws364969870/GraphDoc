define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','jedate','session','publicAjax','public'], function (app, system, composition, $, ko) {
	var pageSize = 9 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("projectList_subproject", {
                init: function (dom){
                	proj.clearViewModal();
                    proj.loadProject(1);
                }
			});
        },
        //搜索
        queryProject:function(page){
        	proj.loadProject(1);
        },
        
        //初始化
        loadProject:function(page){
            var obj = {
            	type:viewModal.type(),//状态 停用N|启用Y
            	serialNumber:viewModal.serialNumber(),
            	projectName:viewModal.projectName(),
            };
            viewModal.arrList([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
            api.findProjectByPage(page,pageSize,obj,function (res) {
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
       	saveSubProject:function(){
       		var juge = false;
       		$("input[name=subprojectRadio]").each(function(idx){
       			if($(this).is(":checked")){
       				juge = true;
       				$("#parentId").val($("input[name=subprojectRadio]").eq([idx]).val());
       				$("#parentName").val($(".subprojectName").eq([idx]).html());
       			}
       		})
       		
       		if(juge){
       			layer.closeAll();
       		}else{
       			showAlert("请选择关联项目！",function(index){
       				layer.close(index);
       			})
       		}
       	},
       	closeSub:function(){
       		layer.closeAll();
       	},
        clearViewModal:function(){
        	startPage = 0;
    		endPage = 5 ;
	    	viewModal.maxPageNum(num);
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.isShowPage(false);
	        
        	viewModal.arrList([]);
        	viewModal.type("");
        	viewModal.serialNumber("");
        	viewModal.projectName("");
        },
        
        gotoPage:function(page){
        	if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadProject(page);
        	}
    	},
    	
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadProject(page);
    		}
    	},
    	
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadProject(page);
    		}
    	},
	}

	//页面模型
    var viewModal = {
    	type:ko.observable(""),
        serialNumber:ko.observable(""),//项目流水号
        projectName:ko.observable(""),//项目名
        arrList:ko.observableArray([]),
        
        saveSubProject:proj.saveSubProject,
        queryProject:proj.queryProject,//搜索
        closeSub:proj.closeSub,
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