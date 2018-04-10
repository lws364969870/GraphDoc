define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("pigeonholeListHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadProject(1);
//					viewModal.typeArr([
//						{textStr:"H001",valueStr:"草稿"},
//						{textStr:"H002",valueStr:"设计"},
//						{textStr:"H003",valueStr:"审批"},
//						{textStr:"H004",valueStr:"复审"},
//						{textStr:"H005",valueStr:"生产"},
//						{textStr:"H006",valueStr:"公告"},
//						{textStr:"H007",valueStr:"归档"}
//					]);
				}
			});
        },
        loadProject:function(page){
            var obj = {};
            if(viewModal.projectName() != ""){
                obj.projectName = viewModal.projectName() ;
            }else if (viewModal.typeStr() != ""){
                obj.type = viewModal.typeStr() ;
            }
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
		clearViewModal:function(){
			startPage = 0;
    		endPage = 5 ;
	    	viewModal.maxPageNum(num);
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.isShowPage(false);
	        
	        viewModal.type("");//查询参数
	        viewModal.typeStr("H007");
	        viewModal.projectName("");//项目名称
//	        viewModal.typeArr([]);//查询参数
	        viewModal.arrList([]);
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
    	}
	}
	
	
	//页面模型
    var viewModal = {
        type:ko.observable(""),//查询参数
        typeStr:ko.observable("H007"),
        projectName:ko.observable(""),//项目名称
        
//      typeArr:ko.observableArray([]),//查询参数
        arrList:ko.observableArray([]),

        loadProject:proj.loadProject,//加载项目列表
        
        
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