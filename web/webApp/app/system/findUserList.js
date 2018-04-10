define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("findUserListHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadUser(1);
//					console.log(viewModal._$_params.user.level);
//					if(viewModal._$_params.user.level == 100){
//						viewModal.systemUser(true);
//					}
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
       
       	addUser:function(even){
       		app.setRoot('system/findUserList_add', null, 'desktop-content',null);
       	},
       
       	updateUser:function(even){
       		app.setRoot('system/findUserList_add', null, 'desktop-content',even);
       	},
       
        delUser:function(even){
        	showconfirm("是否删除该用户？",function(){
        		api.deleteUser({id:even.id},function(res){
	       			if(res["code"] == 0){
		        		showAlert("删除该用户成功！",function(){
		        			proj.loadUser(1);	
		        		});
	        		}
	       		})
        	})
        },
       
        resetPwd:function(even){
        	console.log(even)
       		api.resetPassWord({id:even.id},function(res){
       			if(res["code"] == 0){
       				showAlert("重置该用户密码成功！",function(){
		        			proj.loadUser(1);	
		        		});
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
	        
	        viewModal.userName("");//操作人
	        viewModal.arrList([]);//集合
	        viewModal.systemUser(false);
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
    	}
	}
	
	
	//页面模型
    var viewModal = {
    	systemUser:ko.observable(false),//设置用户权限
    	
        userName:ko.observable(),//用户名称
        arrList:ko.observableArray(),//集合
        
        loadUser:proj.loadUser,//查询
        addUser:proj.addUser,//添加用户
        updateUser:proj.updateUser,//更新用户
       	delUser:proj.delUser,//删除用户
       	resetPwd:proj.resetPwd,//重置密码
       	
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