define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("departmentListHandler", { 
				init: function (dom){
					proj.clearViewMoadl();
					proj.loadEpartment(1);
				}
			});
        },
        loadEpartment:function(page){
        	var obj = {};
        	if(viewModal.name() != ""){
        		obj.name = viewModal.name();
        	}
        	viewModal.epartmentArr([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
        	api.findDepartmentByPage(page,pageSize,obj,function (res) {
        		if(res["code"] == 0){
        			res = res["result"];
        			if(res["result"].length >  0 ){
	        			viewModal.epartmentArr(res["result"]);
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
       	adddEpartment:function(even){//添加
       		app.setRoot('system/departmentList_add', null, 'desktop-content',null);
       	},
       	
       	updateDep:function(even){//修改
       		app.setRoot('system/departmentList_add', null, 'desktop-content',even);
       	},
       	
       	delDep:function(even){
       		showconfirm("是否删除该部门？",function(){
	       		api.deleteDepartment({id:even.id},function (res) {
	       			if(res["code"] == 0){
		        		showAlert("删除该部门成功！",function(){
		        			proj.loadEpartment(1);
		        		});
	        		}
	            })
	       	})
       	},
       	
       	clearViewMoadl:function(){
       		startPage = 0;
    		endPage = 5 ;
	    	viewModal.maxPageNum(num);
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.isShowPage(false);
	        
	        viewModal.name("");//名称
        	viewModal.epartmentArr([]);//数组集合
       	},
       	
        gotoPage:function(page){
        	if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadEpartment(page);
        	}
    	},
    	
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadEpartment(page);
    		}
    	},
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadEpartment(page);
    		}
    	}
	}
	
	
	//页面模型
    var viewModal = {
	    name:ko.observable(""),//名称
	    epartmentArr:ko.observableArray([]),
	    
        loadEpartment:proj.loadEpartment,//查询
        adddEpartment:proj.adddEpartment,
        updateDep:proj.updateDep,
        delDep:proj.delDep,//删除
        
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