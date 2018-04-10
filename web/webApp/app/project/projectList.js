define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','jedate','session','publicAjax','public'], function (app, system, composition, $, ko) {
	var pageSize = 10 ;//table 固定显示的列
	var startPage = 0; //变换
	var endPage = 5 ;  //变换
 	var row = 5 ;	   //固定
 	var num = 1 ;	   //固定
 	
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("projectListHandler", {
                init: function (dom){
                	proj.clearViewModal();
                	
                	viewModal.delBtnShow(true);//显示删除
//              	if(viewModal._$_params.type == "H001"){
//              		viewModal.addBtnShow(true);//是否显示添加
//              	}
//              	if(viewModal._$_params.type == "H006" || viewModal._$_params.type == "H007"|| viewModal._$_params.type == "H008"){
//              		viewModal.delBtnShow(false);//显示删除
//              	}
                	
                	switch (viewModal._$_params.type){
	        			case "H001"://草稿
	        				viewModal.addBtnShow(true);//是否显示添加
	        				break;
	        			case "H002"://设计
	        				break;
	        			case "H003"://审批
	        				break;
	        			case "H004"://复审
	        				break;
	        			case "H005"://生产
	            			
	        				break;
	        			case "H006"://生产完成
	        				viewModal.delBtnShow(false);//显示删除
	        				break;
	        			case "H007"://公告
	        			 	viewModal.delBtnShow(false);//显示删除
	        				break;
	        			case "H008"://归档
	        				viewModal.delBtnShow(false);//显示删除
	        				viewModal.copyBtnShow(true);//显示复制项目
	        				break;
	        			case "H1999"://所有项目
	        				viewModal.delBtnShow(false);//显示删除
	        				viewModal.copyBtnShow(false);//显示复制项目
	        				break;
	        			default:
	        				break;
	        		}
                	viewModal.type(viewModal._$_params.type);
                    viewModal.typeStr(viewModal._$_params.title);
                    viewModal.navigation(viewModal._$_params.title);//导航栏
                    
                    viewModal._$_params.title
                    proj.loadProject(1);
                }
			});
        },
        queryProject:function(){
			proj.loadProject(1);     	
        },
        //初始化
        loadProject:function(page){
        	if(viewModal.type() == "H1999"){viewModal.type("");}
            var obj = {
            	type:viewModal.type(),//状态 停用N|启用Y
            };
            if(viewModal.projectName() != ""){//项目名
                obj.projectName = viewModal.projectName() ;
            }
            
            if(viewModal.serialNumber() != ""){//项目流水号
                obj.serialNumber = viewModal.serialNumber() ;
            }
            
            if(viewModal.useEnterprise() != ""){//使用单位
                obj.useEnterprise = viewModal.useEnterprise() ;
            }
            
            if(viewModal.productName() != ""){//产品名称
                obj.productName = viewModal.productName() ;
            }
            
            if(viewModal.contractNumber() != ""){//合同编号
                obj.contractNumber = viewModal.contractNumber() ;
            }
            
            if(viewModal.productionNumber() != ""){//出厂编号
                obj.productionNumber = viewModal.productionNumber() ;
            }
            
            
            
            
            if($("#productionDate").val() != "" && $("#productionDate_begin").val() != ""){//出厂日期
            	
            	var start = timesTtamp($("#productionDate").val()+" 00:00:00");
            	var end = timesTtamp($("#productionDate_begin").val()+" 23:59:59");
                obj.productionDate_begin = start;
                obj.productionDate_end = end;
                console.log(conversionTimeYMDHMS(start));
            	console.log(conversionTimeYMDHMS(end));
            }
            
            if(viewModal.responsibleCompany() != ""){//责任公司
                obj.responsibleCompany = viewModal.responsibleCompany() ;
            }
            
            if(viewModal.salesMan() != ""){//业务员
                obj.salesMan = viewModal.salesMan() ;
            }
//          
//          if($("#relevantDate").val() != ""){//相关日期
//              obj.relevantDate_begin = timesTtamp($("#relevantDate").val());
//          }
//          
//          if($("#relevantDate_begin").val() != ""){//相关日期
//              obj.relevantDate_end = timesTtamp($("#relevantDate_begin").val());
//          }
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
       	addProject:function(even){
       		app.setRoot('project/projectList_add', null, 'desktop-content', {even:null,params:viewModal._$_params});
       	},
        updateInfo:function (even) {
        	if(viewModal._$_params.type == "H1999"){
        		viewModal._$_params.type = even["type"];
        		viewModal._$_params.title = setTypeStr(even["type"]);
        	}
            app.setRoot('project/projectList_add', null, 'desktop-content', {even:even,params:viewModal._$_params});
        },
        delInfo:function(even){
        	showconfirm("是否删除该项目！",function(){
        		api.deleteProject({id:even.id,serialNumber:even.serialNumber},function (res) {
	          		if(res["code"]==0){
	          			showAlert("已删除成功！",function(){
	          				app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params);
	          			});
	          		}else{
	          			showAlert(res["message"],function(){});
	          		}
			    })
        	})
        },
        copy:function(event,target){
			api.copyProject({id:event["id"]},function(res){
				if(res["code"] == 0){
					showAlert("复制项目成功，请在草稿中查看！",function(){});
				}else{showAlert("复制失败！",function(){});}
			});
		},
        /*日期控件*/
        jedateMenthod:function(event,target){
        	$.jeDate(target.currentTarget,{
        		format:"YYYY-MM-DD",// hh:mm:ss
	        }) 
        },
        clearViewModal:function(){
        	viewModal.navigation("");//导航栏
        	
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
        	viewModal.typeStr("");
        	
        	viewModal.addBtnShow(false);//显示添加
	        viewModal.delBtnShow(false);//显示删除
	        viewModal.copyBtnShow(false);//显示复制项目
	        
        	//查询条件
        	viewModal.serialNumber("");//流水号
        	viewModal.projectName("");//项目名称
			/*=========状态===============*/
	        viewModal.statusArr([
						{textStr:"Y",valueStr:"启用"},
						{textStr:"N",valueStr:"停用"}]);
	        viewModal.statusStr("");
	        /*=========类型===============*/
	        
	        /**************************基础信息**************************/
	        viewModal.useEnterprise("");//使用单位
	        viewModal.productName("");//产品名称
	        viewModal.contractNumber("");//合同编号
	        viewModal.productionNumber("");//出厂编号
	        viewModal.productionDate("");//出厂日期
	        viewModal.responsibleCompany("");//责任公司
	        viewModal.salesMan("");//业务员
	      	viewModal.relevantDate("");//相关日期
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
        arrList:ko.observableArray([]),
        type:ko.observable(""),//查询参数
        typeStr:ko.observable(""),//查询参数
        addBtnShow:ko.observable(false),//显示添加
        delBtnShow:ko.observable(false),//显示删除
        copyBtnShow:ko.observable(false),//显示复制项目
        
        queryProject:proj.queryProject,//查询方法
        copy:proj.copy,//复制项目
        
        addProject:proj.addProject,//添加项目
        updateInfo:proj.updateInfo,
        loadProject:proj.loadProject,//加载项目列表
        delInfo:proj.delInfo,
        jedateMenthod:proj.jedateMenthod,
        //查询条件
        serialNumber:ko.observable(""),//流水号
        projectName:ko.observable(""),//项目名称
        
        /*=========状态===============*/
        statusArr:ko.observableArray([
					{textStr:"Y",valueStr:"启用"},
					{textStr:"N",valueStr:"停用"}]),
        statusStr:ko.observable(""),
        /*=========类型===============*/
        
        /**************************基础信息**************************/
        useEnterprise:ko.observable(""),//使用单位
        productName:ko.observable(""),//产品名称
        contractNumber:ko.observable(""),//合同编号
        productionNumber:ko.observable(""),//出厂编号
        productionDate:ko.observable(""),//出厂日期
        responsibleCompany:ko.observable(""),//责任公司
        salesMan:ko.observable(""),//业务员
        relevantDate:ko.observable(""),//相关日期
		/**************************基础信息**************************/
		
		navigation:ko.observable(""),//导航栏
		
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