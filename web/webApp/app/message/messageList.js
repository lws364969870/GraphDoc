define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko,layerko) {
	var proj = {
		init:function(){
			//初始化组件
		    composition.addBindingHandler("messageListHandler", { 
		    	init: function (dom){
		    		proj.loadMessage();
		    	}
		    });
		},
		loadMessage:function(page){
        	api.findTaskmessageByPage({receiveUserId:viewModal._$_params.id},function(res){
        		if(res["code"] == 0){
        			res = res["result"];
        			if(res["result"].length >  0 ){
        				var r = res["result"];
        				for(var idx in r){
        					if(r[idx]["isRead"] == "N"){
        						r[idx]["isRead"] = "未读";
        					}else{
        						r[idx]["isRead"] = "已读";
        					}
        					r[idx]["sendDate"] = conversionTimeYMDHMS(r[idx]["sendDate"]);
        					
        				}
	        			viewModal.arrList(r);
	        		}
        		}
            })
        },
        delMenthod:function(event){
        	showconfirm("是否删除该消息？",function(index){
        		api.deleteTaskmessage({id:event.id},function(resData){
	        		if(resData["code"] == 0){
	        			var res = viewModal.arrList(),newRes =[];
			        	for(var idx in res){
			        		if(res[idx]["id"] != event.id){
			        			newRes.push(res[idx]);
			        		}
			        	}
			        	viewModal.arrList([]);
			        	viewModal.arrList(newRes);
	        		}
	        	})
        	})
        },
        readMenthod:function(event,target){
        	api.setTaskmessageRead({id:event.id},function(res){
        		if(res["code"] == 0){
        			var res = viewModal.arrList();
		        	for(var idx in res){
		        		if(res[idx]["id"] == event.id){
		        			res[idx]["isRead"] = "已读";
		        		}
		        	}
		        	viewModal.arrList([]);
		        	viewModal.arrList(res);
        		}
        	})
        },
        queryProject:function(even){
        	api.findProjectByPage(1,10,{serialNumber:even.serialNumber},function (res) {
            	if(res["code"] == 0){
            		res = res["result"];
            		if(res["result"].length >  0 ){
	        			app.setRoot('project/projectList_add', null, 'desktop-content', {even:res["result"][0],params:{type: res["result"][0]["type"], title: setTypeStr(res["result"][0]["type"])}});
	        		}
            	}
            })
        },
        clearViewModal:function(){
			viewModal.arrList([]);
    	}
	}
	
	
	//页面模型
    var viewModal = { 
    	arrList:ko.observableArray([]),
    	delMenthod:proj.delMenthod,
    	readMenthod:proj.readMenthod,
    	queryProject:proj.queryProject
    }

	proj.init();
    return viewModal;
});