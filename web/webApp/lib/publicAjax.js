/**
 * Created by Administrator on 2017/7/21.
 */
var showConsole = function(res,url){
    console.log({
        resultData:res,
        urlAddress:url
    })
}

//var urlAddress = "http://45.32.8.254:8001/";
//console.log(window.location.host)
var urlAddress = "http://127.0.0.1:8999/";
//var urlAddress = "http://"+window.location.host + "/"; 
function send(type, mothed, params, datatype, successCallback, errorCallback, async) {
    successCallback = successCallback || $.noop();
    errorCallback = errorCallback || $.noop();
    $.ajax({
        type: type,
        url: urlAddress+mothed,
        contentType : 'application/json;charset=utf-8', //设置请求头信息
        data: params,
        async: async,
        dataType: datatype,
        success: function(data) {
            if(data["code"] == 0) {
            	successCallback(data);
                // showConsole(data,mothed);
            }else if(data["code"] == 1){
            	successCallback(data);
                //错误提示
            }else if(data["code"]== 2){
                //系统超时
//              window.location.href = 'index.html';
            }
        },
        error: function(msg) {
            errorCallback(msg);
        }
    })
}

function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  

function sendGet(mothed, params, successCallback, errorCallback) {
	if(!isEmptyObject(params)){
		params = JSON.stringify(params)
	}
    send('get', 
    	mothed, 
    	params, 
    	'json', successCallback, errorCallback, true);
}

function sendPost(mothed, params, successCallback, errorCallback) {
    send('post',
        mothed,
        JSON.stringify(params),
        'json', successCallback, errorCallback, true);
}

!(function(doc, owner) {
	//查询待办消息
	owner.findTaskmessageByPage= function(request,callback){
		sendPost("findTaskmessageByPage?token="+$.session.get("token"),request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//删除待办消息
	owner.deleteTaskmessage= function(request,callback){
		sendPost("deleteTaskmessage?token="+$.session.get("token")+"&id="+request.id,{}, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//设置代办消息已读
	owner.setTaskmessageRead= function(request,callback){
		sendPost("setTaskmessageRead?token="+$.session.get("token")+"&id="+request.id,{}, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	
	//查询项目审批日志
	owner.findAuditlogByPage = function(currentPage,pageSize,request,callback){
		sendPost("findAuditlogByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	//审批项目   receiveUserIds = 消息接收人ID
	owner.commitProject = function(request,receiveUserIds,callback){
		 sendPost("commitProject?token="+$.session.get("token")+"&receiveUserIds="+receiveUserIds, request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//回滚项目
	owner.rollbackProject = function(request,receiveUserIds,callback){
		 sendPost("rollbackProject?token="+$.session.get("token")+"&receiveUserIds="+receiveUserIds,request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//获取URL
	owner.getUrlByArchivedId = function(request,callback){
        sendGet("getUrlByArchivedId?token="+$.session.get("token")+"&id="+request.id, {}, function(result) {
	            callback(result)
	        }, function(msg) {
        });
    }
	
	//保存项目
    owner.saveProject = function(request,callback){
        sendPost("saveProject?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
    }
	
	//保存项目 - 归档
	owner.setProjectType = function(request,callback){
        sendPost("setProjectType?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
    }
	
	//删除项目
	owner.deleteProject = function(request,callback){
        sendPost("deleteProject?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
    }
	
	//查询所有文件
	owner.findAllFile = function(request,callback){
        sendPost("findAllFile?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
    }
	
	//查询归档-所有
	owner.findArchived = function(request,callback){
		sendPost("findArchived?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//查询归档-权限
	owner.findRightsArchived = function(request,callback){
		sendPost("findRightsArchived?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//创建一级目录(归档项目 - 归档)
	owner.createTopFolders = function(request,callback){
		sendPost("createTopFolders?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	//创建文件夹
	owner.createFolders = function(request,callback){
		sendPost("createFolders?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}

    //修改文件夹
    owner.replaceName = function(request,callback){
        sendPost("replaceName?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {
        });
    }

    //删除文件夹
    owner.deleteFolders = function(request,callback){
        sendPost("deleteFolders?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {
        });
    }

    //创建文件（上传接口）
    owner.createFile = function(request,callback){
        sendPost("createFile?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {
        });
    }
    
	//删除文件
    owner.deleteFile = function(request,callback){
        sendPost("deleteFile?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {
        });
    }
	
	
	//下载文件
	owner.downLoadFile = function(request,callback){
		sendPost("downLoadFile?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
	owner.copyProject = function(request,callback){
		sendPost("copyProject?token="+$.session.get("token"), request, function(result) {
	            callback(result)
	        }, function(msg) {
        });
	}
	
    //登录
    owner.login = function(request,callback){
        sendPost("login",request, function(result) {
            callback(result)
        }, function(msg) {
        });
    }

    //退出登录
    owner.logout = function(callback){
        sendGet("logout?token="+$.session.get("token"),{}, function(result) {
            callback(result)
        }, function(msg) {});
    }
	
	//查询用户-分页
    owner.findUserByPage = function(currentPage,pageSize,request,callback){
        sendPost("findUserByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
            callback(result)
        }, function(msg) {});
    }
    
    //保存用户
    owner.saveUser = function(request,callback){
        sendPost("saveUser?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
    }
    
	//删除用户
	owner.deleteUser = function(request,callback){
		sendPost("deleteUser?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
	}
	
	//重置密码
	owner.resetPassWord = function(request,callback){
		sendPost("resetPassWord?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
	}
	
	//本人修改密码
	owner.editPassWord = function(request,callback){
		sendPost("editPassWord?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
	}
	
	
	
    //保存部门
    owner.saveDepartment = function(request,callback){
        sendPost("saveDepartment?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
    }
	
	//删除部门
	owner.deleteDepartment = function(request,callback){
		  sendPost("deleteDepartment?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
	}
	
    //查询菜单-所有
    owner.findAllMenu = function(callback){
        sendPost("findAllMenu?token="+$.session.get("token"), {}, function(result) {
            callback(result)
        }, function(msg) {});
    }

    //查询角色-分页
    owner.findRoleByPage = function(currentPage,pageSize,request,callback){
    	if(currentPage != null && pageSize != null){
    		sendPost("findRoleByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
	            callback(result)
	        }, function(msg) {});
    	}else{
    		sendPost("findRoleByPage?token="+$.session.get("token"),request, function(result) {
	            callback(result)
	        }, function(msg) {});
    	}
    }
	
	//保存角色
	owner.saveRole = function(request,callback){
        sendPost("saveRole?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
    }
	
	//删除角色
	owner.deleteRole = function(request,callback){
		sendPost("deleteRole?token="+$.session.get("token"), request, function(result) {
            callback(result)
        }, function(msg) {});
	}
	
	
    
    //查询部门-分页
    owner.findDepartmentByPage = function(currentPage,pageSize,request,callback){
    	if(currentPage != null && pageSize != null){
    		sendPost("findDepartmentByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
	            callback(result)
	        }, function(msg) {});
    	}else{
    		sendPost("findDepartmentByPage?token="+$.session.get("token"),request, function(result) {
	            callback(result)
	        }, function(msg) {});
    	}
    }
	
	//查询项目-分页
    owner.findProjectByPage = function(currentPage,pageSize,request,callback){
    	if(currentPage != null && pageSize != null){
    		 sendPost("findProjectByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
            callback(result)
        }, function(msg) {});
    	}else{
    		 sendPost("findProjectByPage?token="+$.session.get("token"),request, function(result) {
            callback(result)
        }, function(msg) {});
    	}
    }
    
    //查询操作日志-分页
    owner.findLogByPage = function(currentPage,pageSize,request,callback){
    	sendPost("findLogByPage?token="+$.session.get("token")+"&currentPage="+currentPage+"&pageSize="+pageSize,request, function(result) {
            callback(result)
        }, function(msg) {});
    }
}(document, window.api = {}))


