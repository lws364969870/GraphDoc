define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','treeView','treeViewedit','layer','public'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		init : function(){
			var that = this;
			//初始化组件
			composition.addBindingHandler("roleListHandler", { 
				init: function (dom){
					proj.clearViewMoadl();
					proj.loadRole(1);
				}
			});
        },
        loadRole:function(page){
        	var obj = {};
        	if(viewModal.name() != ""){
        		obj.name = viewModal.name()
        	}
        	viewModal.roleArr([]);
    		viewModal.pagesArray([]);
    		viewModal.isShowPage(false);
        	api.findRoleByPage(page,pageSize,obj,function (res) {
        		if(res["code"] == 0){
        			res = res["result"];
        			if(res["result"].length >  0 ){
	        			viewModal.roleArr(res["result"]);
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
	        			
	        			
	        			proj.loadTreeView(res["result"][0],null);
	        		}
        		}else{
        			
        		}
            })
        },
        
        addRole:function(even){//添加
       		app.setRoot('system/role_add', null, 'desktop-content',null);
        },
        
        updateRole:function(even){
        	app.setRoot('system/role_add', null, 'desktop-content',even);
        },
        delRole:function(even){
        	showconfirm("是否删除该角色？",function(){
	        	api.deleteRole({id:even.id},function(res){
	        		if(res["code"] == 0){
		        		showAlert("删除该角色成功！",function(){
		        			proj.loadRole(1);	
		        		});
	        		}
	       		})
	        })
        },
        //显示树状
        loadTreeView:function(res, event){
        	if(event != null){
        		$(".table tr").removeClass("currentBody");
        		$(event.currentTarget).addClass("currentBody");
        	}else{
        		$(".table tr").eq(1).addClass("currentBody");
        	}
        	
        	
        	$(".browser").html("");	
        	var str = '';
    		for(var i = 0 ; i < res["roleMenu"].length; i++){
        		var idx = res["roleMenu"][i];
        		if(idx.status == "Y"){
        			str += '<li class="'+idx["code"]+'">';
	        			str += '<span class="folder">'+idx["title"]+'</span>';
	        				str += '<ul>';
	        					for(var k = 0 ;  k < idx["child"].length ;  k++){
	        						if(idx["child"][k].status == "Y"){
	        							str += '<li class="'+idx["child"][k]["code"]+'"><span class="file">'+idx["child"][k]["title"]+'</span></li>';
	        						}
        						}
							str += '</ul>';
	        		str += '</li>';	
        		}
        		
        	}
        	$("#browser").html(str);		
        	$("#browser").treeview();//树状结构加载
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
	        
	        viewModal.name("");//角色名
	        viewModal.roleArr([]);//表单List
      	},
      	
      	gotoPage:function(page){
        	if(page !== 1){
        		viewModal.currentPage(page)
    			proj.loadRole(page);
        	}
    	},
    	
    	upPage:function(page){
    		if(page > 0){
    			startPage = page - row;
	    		endPage = endPage - row;
	    		viewModal.currentPage(startPage+1)
	    		proj.loadRole(page);
    		}
    	},
    	nextPage:function(page){
    		if(viewModal.maxPageNum() !== 1){
    			startPage = page - 1;
	        	endPage = endPage + row;
	        	viewModal.currentPage(page)
	    		proj.loadRole(page);
    		}
    	}
	}
	
	
	//页面模型
    var viewModal = {
	    name:ko.observable(""),//角色名
	    roleArr:ko.observableArray([]),//表单List
	   
	    addRole:proj.addRole,//添加
	    updateRole:proj.updateRole,//修改
	    delRole:proj.delRole,//删除
	    loadTreeView:proj.loadTreeView,//查询菜单
	    loadRole:proj.loadRole,//查询
       
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