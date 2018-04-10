define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','layer','public'], function (app, system, composition, $, ko) {
	function aboutBtnClick(){
		app.showMessage('测度提示框', '标题');
	}

    var pro = {
        init: function (dom){
            var that = this;
            //初始化组件
            composition.addBindingHandler("desktopHandler", {
                init: function (dom){
                	pro.clearViewModal();
                    that.loadMenus();//请求加载菜单
                    pro.gotoProjectPanelMenthod({
	        			type:"H001",
	        			title:"草稿"
	        		})
//                  that.gotoMessagePanel(viewModal._$_params.user.id);//消息
                    viewModal.loginName(viewModal._$_params.user.userName);//登陆名称
                    viewModal.arrLists(viewModal._$_params.menu);
                    
                    
                    
//                  app.setRoot('project/projectPigeonholeList', null, 'desktop-content', null);
                }
            });

        }
        ,
       	//退出
       	logoutMenthod:function(){
       		showconfirm("是否退出系统？",function(){
       			api.logout(function (res) {
       				window.location.href = 'index.html';
	            })
       		})
       	}
       	,
       	//登陆用户修改当前账号密码
       	updatePwd:function(){
			app.setRoot('system/updatePwd', null, 'desktop-content',viewModal._$_params);
       	},
        //修改个人信息
        updateUserInfo:function(){
            app.setRoot('system/updatePwd', null, 'desktop-content',viewModal._$_params);
        },
		//请求加载菜单
        loadMenus:function () {
        }
        ,
        //消息
        gotoMessagePanel:function(data){
            app.setRoot('message/messageList', null, 'desktop-content',viewModal._$_params.user);
        }
        ,
        //项目管理模块
         gotoProjectPanelMenthod:function(even){
            app.setRoot('project/projectList', null, 'desktop-content', even);
        },
        //查询消息
        updateNews:function(){
    		api.findTaskmessageByPage({receiveUserId:viewModal._$_params.user.id},function(res){
    			console.log(res)
    		})
        },
        clearViewModal:function(){
        	viewModal.arrLists([]);
        }
    }

	//页面模型
    var viewModal = { 
    	arrLists:ko.observableArray([]),//菜单Array
    	 
    	aboutBtnClick : aboutBtnClick,
        gotoMessagePanel:pro.gotoMessagePanel,
        logoutMenthod:pro.logoutMenthod,//退出
        updatePwd:pro.updatePwd,//重置密码
        updateNews:pro.updateNews,//消息
        gotoProjectPanel :function (data,target) {
        	
        	
        	if(data.parentCode === "1000" || data.parentCode === "1999"){
    			pro.gotoProjectPanelMenthod({
        			type:data.type,
        			title:data.title
        		});
        		
        	}else{
        		switch (data.code){
        			case "2001":
        				app.setRoot('project/projectPigeonholeList', null, 'desktop-content', null);
        				break;
        			case "3001":
        				app.setRoot('system/findUserList', null, 'desktop-content',viewModal._$_params.result);
        				break;
        			case "3002":
        				app.setRoot('system/roleList', null, 'desktop-content',null);
//						app.setRoot('system/roleMenu', null, 'desktop-content',null);
        				break;
        			case "3003":
        				app.setRoot('system/departmentList', null, 'desktop-content',null);
        				break;
        			case "3004":
        				app.setRoot('system/findLogList', null, 'desktop-content',null);
        				break;	
        		}
        	}
        },
        loginName:ko.observable()//登陆名称
    }


    pro.init();
    return viewModal;
});