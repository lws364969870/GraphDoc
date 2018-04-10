define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("findLogListHandler", { 
				init: function (dom){
					proj.clearViewModal();
					viewModal.typeArr([
						{textStr:"新增",valueStr:"新增"},
						{textStr:"修改",valueStr:"修改"},
						{textStr:"删除",valueStr:"删除"},
						{textStr:"上传",valueStr:"上传"},
						{textStr:"下载",valueStr:"下载"},
						{textStr:"登录",valueStr:"登录"}]);
					proj.loadLog(1);
				}
			});
        },
        
        loadLog:function(page){
    		var obj = {};
        	if(viewModal.userName() != ""){
        		obj.userName = viewModal.userName();
        	}else if(viewModal.tableName() != ""){
        		obj.tableName = viewModal.tableName();
        	}else if(viewModal.typeStr() != ""){
        		obj.type = viewModal.typeStr();
        	}
        	viewModal.arrList([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
        	api.findLogByPage(page,pageSize,obj,function (res) {
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
	    	viewModal.maxPageNum(num)
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.isShowPage(false);
	        
	        viewModal.userName("");//操作人
	        viewModal.tableName("");//表名
	        viewModal.typeStr("");
	        viewModal.typeArr([]);//操作类型
	        viewModal.arrList([]);//集合
    	},
    	gotoPage:function(page){
    		if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadLog(page);
        	}
    	},
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadLog(page);
    		}
    		
    	},
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadLog(page);
    		}
    	}
	}
	
	
	//页面模型
    var viewModal = {
        userName:ko.observable(""),//操作人
        tableName:ko.observable(""),//表名
        typeStr:ko.observable(""),
        typeArr:ko.observableArray([]),//操作类型
        arrList:ko.observableArray([]),//集合
        
		loadLog:proj.loadLog,//加载日志
		
		//分页
		isShowPage:ko.observable(false),
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