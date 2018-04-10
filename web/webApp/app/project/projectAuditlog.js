/**
 * 审批历史列表
 */
define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','layerko','session','publicAjax'], function (app, system, composition, $, ko,layerko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectAuditlogHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadAuditlog(1);
				}
			});
        },
      	//加载审批意见
      	loadAuditlog:function(page){
      		viewModal.arrList([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
    		api.findAuditlogByPage(page,pageSize,{projectId:viewModal._$_params},function (res) {
            	if(res["code"] == 0){
            		res = res["result"];
            		if(res["result"].length > 0 ){
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
	            		//转换时间戳
	            		var result = res["result"];
	            		for(var i = 0 ; i < result.length; i++){
							result[i]["time"] = conversionTimeYMDHMS(result[i]["time"]);            			
	            		}
	            		viewModal.arrList(res["result"]);
	            		
	            		
	            		viewModal.isShowPage(true);
            		}
            	}
          	});
      	},
      	//详细
      	detailMenthod:function(event){
      		layerko.open('project/projectAuditDetail', {
                type: 1, 
                title:'审批详细',
                content: '',//内容
                area: ['540px','540px'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: false,//是否允许浏览器出现滚动条
                end:function(){
                }
          	}, event);
      	},
      	gotoPage:function(page){
        	if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadAuditlog(page);
        	}
    	},
    	
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadAuditlog(page);
    		}
    	},
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadAuditlog(page);
    		}
    	},
		//清除缓存数据
		clearViewModal:function(){
			startPage = 0;
    		endPage = 5 ;
	    	viewModal.maxPageNum(num);
	    	viewModal.minPageNum(num);
	        viewModal.pagesArray([]);
    		viewModal.currentPage(num)//当前页
	        viewModal.pageSize(pageSize),//行数
	        viewModal.arrList([]);
	        viewModal.isShowPage(false);
		},
	}
	
	
	//页面模型
    var viewModal = {
        arrList:ko.observableArray([]),
        
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
        
        detail:proj.detailMenthod,//详细
    }
	
	proj.init();
    return viewModal;
});