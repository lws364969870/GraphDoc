var setTypeStr = function(val){
	var titleStr = "";
	switch (val){
		case "H001"://草稿
			titleStr = "草稿";
			break;
		case "H002"://设计
			titleStr = "设计";
			break;
		case "H003"://审批
			titleStr = "审批";
			break;
		case "H004"://复审
			titleStr = "复审";
			break;
		case "H005"://生产
			titleStr = "生产";
			break;
		case "H006"://生产完成
			titleStr = "生产完成";
			break;
		case "H007"://公告
			titleStr = "公告"; 
			break;
		case "H008"://归档
			titleStr = "归档";
			break;
	}
	return titleStr;
}

var layerOpen = function (title, areaArr, url, btn, zIndex, successMenthod, yesArr, endMenthod) {
    var obj = {
//      skin: 'layui-layer-lan',
        type: 2,
        title: title,
        area: areaArr,
        closeBtn: 2,//关闭按钮
        move: false,//触发拖动的元素
        // shade:[0.8, '#393D49'],//遮罩
        shadeClose: true,//是否点击遮罩关闭
        resize: false,//是否允许拉伸
        content: url,
        zIndex: zIndex, //层叠顺序
    };
    if (zIndex != null || zIndex != undefined) {//层叠顺序
        obj.zIndex = zIndex;
    } else {
        obj.zIndex = 1031;
    }
    if (successMenthod != null || successMenthod != undefined) {//弹出后的成功回调方法
        obj.success = successMenthod;
    }
    if (btn != null || btn != undefined) {//按钮
        obj.btn = btn;
    }
    if (yesArr != null || yesArr != undefined) {
        if (yesArr.length > 0) {//确定按钮回调方法
            if (btn.length == 1) {
                obj.yes = yesArr[0];
            } else if (btn.length == 2) {
                obj.yes = yesArr[0];
                obj.btn2 = function (index, layero) {
                    layer.close(index);
                }
            } else if (btn.length == 3) {
                obj.yes = yesArr[0];
                obj.btn2 = yesArr[1];
                obj.btn3 = function (index, layero) {
                    layer.close(index);
                }
            }
        }
    }


    if (endMenthod != null || endMenthod != undefined) {//销毁后触发的回调
        obj.end = endMenthod;
    }
    layer.open(obj);
}

var showAlert = function(res,callback){
	layer.alert(res,function(index){
		callback();
		layer.close(index);
	});
}

var showconfirm = function(res,callback){
	layer.confirm(res, {
	  btn: ['是','否'] //按钮
	}, function(index){
		layer.close(index);
	  	callback(index);
	}, function(index){
	   layer.close(index);
	});
}


/**
 * 生成上传文件表单
 */
 function ajaxFileUpload(urlAddress){
// 	if ($("#upload").val().length <= 0) {
// 		layer.alert("请选择上传文件！");
//		return;
//	};
}

/**
 * 查询树状结构图（归档管理）
 * @param {Object} serialNumber 流水号
 * @param {Object} parentId 上级项目ID
 * @param {Object} cabll 回调方法 
 */
var findRightsArchived =function (parentId,cabll){
	if(parentId == undefined){
		api.findRightsArchived({},function(res){
			cabll(res);
		})
	}else{
		api.findRightsArchived({parentId:parentId},function(res){
			cabll(res);
		})
	}
}

/**
 * 左边树状
 * @param {Object} serialNumber
 * @param {Object} parentId
 */
var leftTreeFindRightsArchived = function(parentId){
	var str = '';
	$("#projectID").val("");  
	$(".folder,.file").removeClass("red");
	findRightsArchived(parentId,function(res){
		if(res["code"] == 0){
			res = res["result"];
			$("#"+parentId).next("ul").children().remove();
			if(parentId == "0"){
				for(var i = 0 ; i < res.length; i++){
					str += '<li>';
			    		str += '<span id="'+res[i]["id"]+'" class="folder" onclick="leftTreeFindRightsArchived(\''+res[i]["id"]+'\');">'+res[i]["name"]+'</span>';
						str += '<ul class="'+res[i]["id"]+'"></ul>';
				    str += '</li>';
				}
				$("#browser").html(str);
				$("#browser").treeview({collapsed: true});
//				leftTreeFindRightsArchived(res[0]["serialNumber"],res[0]["id"]);//左边菜单
				rightTreeFindRightsArchived(0,"#rightMenu");//右边菜单
				$("#projectID").val(parentId);//项目ID
				$("#serialNumber").val(serialNumber);//流水号
			}else{
				if($("#"+parentId).next("ul").css('display') != 'none'){
						for(var i = 0 ; i < res.length; i++){
								if(res[i]["type"] == 0){//文件夹
									str += '<li class="closed">';
										str += '<span id="'+res[i]["id"]+'" class="folder" onclick="leftTreeFindRightsArchived(\''+res[i]["id"]+'\');">'+res[i]["name"]+'</span>';
										str += '<ul class="'+res[i]["id"]+'"></ul>';
								}else{
									str += '<li class="">';
										str += '<span  id="'+res[i]["id"]+'" class="file" >'+res[i]["name"]+'</span>';
								}
						    str += '</li>';
						}
					var branches = $(str).prependTo("."+parentId);
					$("#browser").treeview({
						add:branches
					});
					rightTreeFindRightsArchived(parentId,"#rightMenu");
					$("#"+parentId).addClass("red");
					$("#projectID").val(parentId);
				}
			}
		}
	});
}

/**
 * 右边
 * @param {Object} serialNumber
 * @param {Object} parentId
 * @param {Object} id
 */
var rightTreeFindRightsArchived = function(parentId,id){
	var str = '';
	findRightsArchived(parentId,function(res){
		if(res["code"] == 0){
			res = res["result"];
			for(var i = 0 ; i < res.length; i++){
				str += '<tr class="text-center">';
					str += '<td>';
						if(res[i]["type"] == 0){
							str += '<span>文件夹</span>';
						}else{
							str += '<span>文件</span>';
						}
					str += '</td>';
					str += '<td title="'+res[i]["name"]+'" class="limitText">'+res[i]["name"]+'</td>';
					str += '<td>'+res[i]["createMan"]+'</td>';
					str += '<td>'+res[i]["createDate"]+'</td>';
					str += '<td>';
						if(res[i]["type"] == 0){
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">下载</button>';
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">预览</button>';
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">替换</button>';
						}else{
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="downLoadFile(\''+res[i]["id"]+'\');">下载</button>';
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="preview(\''+res[i]["id"]+'\');">预览</button>';
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="replaceFile(\''+res[i]["parentId"]+'\',\''+res[i]["id"]+'\');">替换</button>';
						}
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="replaceName(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+res[i]["name"]+'\',0);">重命名</button>';
							str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="deleteFolders(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+serialNumber+'\',0);">删除</button>';
						
					str += '</td>';
				str += '</tr>';
			}
			$(id).html(str);
		}else{
			$(id).html("");
		}
	});
}

/**
 * 查询树状结构图（项目管理）
 * @param {Object} serialNumber 流水号
 * @param {Object} parentId 上级项目ID
 * @param {Object} cabll 回调方法 
 */
var findArchived =function (serialNumber,parentId,cabll){
	if(serialNumber == undefined && parentId == undefined){
		api.findArchived({},function(res){
			cabll(res);
		})
	}else{
		api.findArchived({serialNumber:serialNumber,parentId:parentId},function(res){
			cabll(res);
		})
	}
}


/**
 * 左边树状
 * @param {Object} serialNumber
 * @param {Object} parentId
 */
var leftTree = function(serialNumber,parentId){
	var str = '';
	$("#projectID").val("");
	$(".folder,.file").removeClass("red");
	findArchived(serialNumber,parentId,function(res){
		if(res["code"] == 0){
			res = res["result"];
			$("#"+parentId).next("ul").children().remove();
			if(parentId == "0"){
				for(var i = 0 ; i < res.length; i++){
					str += '<li>';
			    		str += '<span id="'+res[i]["id"]+'" class="folder" onclick="leftTree(\''+res[i]["serialNumber"]+'\',\''+res[i]["id"]+'\');">'+res[i]["name"]+'</span>';
						str += '<ul class="'+res[i]["id"]+'"></ul>';
				    str += '</li>';
				}
				$("#browser").html(str);
				$("#browser").treeview();
				leftTree(res[0]["serialNumber"],res[0]["id"]);//左边菜单
				rightTree(res[0]["serialNumber"],res[0]["id"],"#rightMenu");//右边菜单
				$("#projectID").val(parentId);//项目ID
				$("#serialNumber").val(serialNumber);//流水号
			}else{
				if($("#"+parentId).next("ul").css('display') != 'none'){
						for(var i = 0 ; i < res.length; i++){
								if(res[i]["type"] == 0){//文件夹
									str += '<li class="closed">';
										str += '<span id="'+res[i]["id"]+'" class="folder" onclick="leftTree(\''+res[i]["serialNumber"]+'\',\''+res[i]["id"]+'\');">'+res[i]["name"]+'</span>';
										str += '<ul class="'+res[i]["id"]+'"></ul>';
								}else{
									str += '<li class="">';
										str += '<span  id="'+res[i]["id"]+'" class="file" >'+res[i]["name"]+'</span>';
								}
						    str += '</li>';
						}
					var branches = $(str).prependTo("."+parentId);
					$("#browser").treeview({
						add:branches
					});
					rightTree(serialNumber,parentId,"#rightMenu");
					$("#"+parentId).addClass("red");
					$("#projectID").val(parentId);
				}
			}
		}
	});
}

/**
 * 右边树状
 * @param {Object} serialNumber
 * @param {Object} parentId
 * @param {Object} id
 */
var rightTree = function(serialNumber,parentId,id){
	var str = '';
	findArchived(serialNumber,parentId,function(res){
		if(res["code"] == 0){
			res = res["result"];
			for(var i = 0 ; i < res.length; i++){
//				if(res[i]["type"] != 0){
					str += '<tr class="text-center">';
						if(res[i]["type"] == 0){
							str += '<td><input type="checkbox" disabled="disabled" value="'+res[i]["id"]+'" /></td>';
							str += '<td><span>文件夹</span></td>';
						}else{
							str += '<td><input type="checkbox" name="batchCheck" value="'+res[i]["id"]+'" /></td>';
							str += '<td><span>文件</span></td>';
						}
						
						str += '<td title="'+res[i]["name"]+'" class="limitText">'+res[i]["name"]+'</td>';
						str += '<td>'+res[i]["createMan"]+'</td>';
						str += '<td>'+res[i]["createDate"]+'</td>';
						str += '<td>';
							if(res[i]["type"] == 0){
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">下载</button>';
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">预览</button>';
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" disabled="disabled">替换</button>';
							}else{
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="downLoadFile(\''+res[i]["id"]+'\');">下载</button>';
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="preview(\''+res[i]["id"]+'\');">预览</button>';
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="replaceFile(\''+res[i]["parentId"]+'\',\''+res[i]["id"]+'\');">替换</button>';
							}
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="replaceName(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+res[i]["name"]+'\',1);">重命名</button>';
								str += '<button class="btn btn-primary mr-10 btn-sm" type="button" onclick="deleteFolders(\''+res[i]["id"]+'\',\''+res[i]["type"]+'\',\''+serialNumber+'\',1);">删除</button>';
							
						str += '</td>';
					str += '</tr>';
//				}
			}
			$(id).html(str);
		}else{
			$(id).html("");
		}
	});
}

var replaceFile = function(parentId,id){
	layerOpen('上传文件',
	["80%","80%"],
	['replaceUpLoad.html'],
	["关闭"],
	null,
	function(layero, index){
		var iframeWin = window[layero.find('iframe')[0]['name']]; 
		iframeWin.layerInit(urlAddress+"createFile?token="+$.session.get("token")+"&foldersId="+parentId+"&fileId="+id);
	},
	[
		function(index,layero){
			layer.close(index);
			proj.loadMenu("0");//查询初始查询归档
		}
	],
	null
	);
}

/**
 * 预览
 * @param {Object} id
 */
var preview = function(id){
	requestDownLoadFile(id,function(res){
		if(res["code"] == "0"){
			var url = urlAddress+res["result"],str = '';
			window.open("preview.html?file="+res["result"]);
//				str+='<div class="col-sm-12">';
//					str+='<object id="xxxx" visible="true" classid="CLSID:B6FCC215-D303-11D1-BC6C-0000C078797F" type="application/x-oleobject" width="800" height="600">';
//						str+='<param name="SRC" value="'+url+'">';
//					str+='</object>';
//					
//					str+='<div class="col-sm-3"></div>';
//				    str+='<div class="col-sm-8" style="padding-left: 0;">';
//				  	  	str+='<button class="btn btn-primary mr-10" >修改文件夹</button>';
//				    	str+='<button class="btn btn-primary" onclick="layer.closeAll();">返回</button>';
//				  	str+='</div>';
//			  	str+='</div>';
//				layer.open({
//			        type: 1, 
//			        title:'预览',
//			        content: str,//内容
//			        area: ['540px','180px'],
//			        move: false,//触发拖动的元素
//			        resize: false,//是否允许拉伸
//			        shadeClose: false,//是否点击遮罩关闭
//			        scrollbar: false,//是否允许浏览器出现滚动条
//			  	});
		}
	})
}

/**
 * 下载
 * @param {Object} s_id
 */
var requestDownLoadFile = function(s_id,callback){
	api.getUrlByArchivedId({id:s_id},function(res){
		callback(res);
	})
}

var downLoadFile = function(id,preview){
	requestDownLoadFile(id,function(res){
		if(res["code"] == "0"){
			var str = res["result"].split("/");
			var link = $('<a href="'+res["result"]+'" download="'+str[str.length-1]+'"></a>');
			link.get(0).click();
		}
	})
}

  
//删除  文件夹  || 文件
var deleteFolders = function(id,type,serialNumber,state){
	if(type == 0){
		showconfirm("是否删除该文件夹！",function(){
			api.deleteFolders({id:id},function(res){
				if(res["code"] == 0){
					showAlert("删除该文件夹成功！",function(index){
						if(state ==  0){
							leftTreeFindRightsArchived(id);
							rightTreeFindRightsArchived(id,"#rightMenu");
						}else{
							leftTree(serialNumber,"0");//查询初始查询归档
						}
						layer.close(index);
					});		
				}else{
					showAlert(res["message"],function(index){
						layer.close(index);
					});
				}
			})
		});
	}else if (type == 1){
		showconfirm("是否删除该文件！",function(){
			api.deleteFile({id:id},function(res){
				if(res["code"] == 0){
					showAlert("删除该文件成功！",function(index){
						if(state ==  0){
							leftTreeFindRightsArchived(id);
							rightTreeFindRightsArchived(id,"#rightMenu");
						}else{
							leftTree(serialNumber,"0");//查询初始查询归档
						}
						layer.close(index);
					});		
				}else{
					showAlert(res["message"],function(index){
						layer.close(index);
					});
				}
			})
		})
	}
}

/**
 * 
 * @param {Object} id  
 * @param {Object} type 0 = 文件夹/ 1 = 文件
 * @param {Object} name
 * @param {Object} state 0 = 归档管理/ 1 = 项目管理
 */
var replaceName = function(id,type,name,state){
	var  titleText = "",successText = "",tipsText = "";
	if(type == 0){
		titleText = "文件夹";
		successText = "文件夹名称";
		tipsText = "修改文件夹成功";
	}else{
		titleText = "文件名称";
		successText = "文件名称";
		tipsText = "修改文件成功";
	}
	var str = '';
		str+='<form class="form-horizontal" style="margin-top: 30px; width: 97%;" action="">';
		    str+='<fieldset>';
			    str+='<div class="form-group" style="margin: 10 0 15px 0;">';
		      		str+='<label class="col-sm-3 control-label">'+successText+'：</label>';
		      		str+='<div class="col-sm-8">';
		        		str+='<input type="text" placeholder="请输入'+successText+'" class="form-control foldersName" value="'+name+'"/>';
		       	 	str+='</div>';
			    str+='</div>';
		    str+='</fieldset>';
		str+='</form>';
		str+='<div class="col-sm-3"></div>';
		  
	    str+='<div class="col-sm-8" style="padding-left: 0;">';
	  	  	str+='<button class="btn btn-primary mr-10" onclick="updateFolders(\''+id+'\',\''+tipsText+'\','+state+');">'+titleText+'</button>';
	    	str+='<button class="btn btn-primary" onclick="layer.closeAll();">返回</button>';
	  	str+='</div>';
		layer.open({
	        type: 1, 
	        title:"修改"+titleText,
	        content: str,//内容
	        area: ['540px','180px'],
	        move: false,//触发拖动的元素
	        resize: false,//是否允许拉伸
	        shadeClose: false,//是否点击遮罩关闭
	        scrollbar: false,//是否允许浏览器出现滚动条
	  	});
}

var updateFolders = function(id,successText,state){
	api.replaceName({id:id,name:$(".foldersName").val()},function(res){
		if(res.code == 0){
			showAlert(successText,function(){
				if(state == 0){
					leftTreeFindRightsArchived(0);
					rightTreeFindRightsArchived(0,"#rightMenu");
				}else{
					leftTree($("#serialNumber").val(),0);//左边菜单
				}
				
				layer.closeAll(); //疯狂模式，关闭所有层
			});		
		}else if(res.code == 1){
			showAlert(res.message,function(){
			
			});
		}
	})
}

/**
 * 验证错误提示
 * @param {Object} obj 参数ID或者class  例如 #id  或者 .class
 */
var submitFun = function(obj) {
	var res = true;
	var objName = "";
	if(obj != undefined){
		objName = $(obj +" .txtValidation");
	}else{
		objName = $(".txtValidation");
	}
	objName.each(function() {
		if($(this).data("type") == "txtStr") {
			if($(this).val() == "") {
				layer.alert($(this).data("value"));
				res = false;
				return res;
			}
		}else if($(this).data("type") == "pwd") {
			if($(this).val() == "") {
				layer.alert($(this).data("value"));
				res = false;
				return res;
			}else if($(this).val().length < 8) {
				layer.alert("密码长度必须为8至20个字符!");
				res = false;
				return res;
			}
		}else if($(this).data("type") == "pwd2") {
				if($(this).val().length == 0 ) {
					layer.alert($(this).data("value"));
					res = false;
					return res;
				}else if($(this).val().length < 8) {
					layer.alert("确认密码长度必须为8至20个字符!");
					res = false;
					return res;
				}else if($(this).val() != $(".password").val()){
					layer.alert("密码与确认密码必须一致!");
					res = false;
					return res;
				}
		}else if($(this).data("type") == "selectStr") {
			if(!$(this).hasClass("valHide")){
                if($(this).find("option:selected").text() == "请选择作者") {
                    alert($(this).data("value"));
                    res = false;
                    return res;
                }else if($(this).find("option:selected").text() == "请选择") {
                    layer.alert($(this).data("value"));
                    res = false;
                    return res;
                }
            }
		}else if($(this).data("type") == "checkStr") {
			var checkedFlase = false;
			$(this).find("input[type=checkbox]").each(function(){
				if($(this).is(":checked") == true){
					checkedFlase = true;
				}
			})
			if(checkedFlase == false){
				layer.alert($(this).data("value"));
				res = false;
				return res;
			}
		}else if($(this).data("type") == "imgStr") {
			if($(this).hasClass("imgValidation")) {
				alert($(this).data("value"));
				res = false;
				return res;
			}
		}
	});
	return res;
}


/**
 * 生成时间戳
 */
var timesTtamp =function(ts){
	return Date.parse(new Date(ts));
}

/**
 * 时间戳 转换 
 */
var conversionTime = function(ts){
	var datas = new Date(ts);
	var Y = datas.getFullYear() + '-';
	var M = (datas.getMonth() + 1 < 10 ? '0' + (datas.getMonth() + 1) : datas.getMonth() + 1) + '-';
	var D = (datas.getDate()  <10 ? ('0' + datas.getDate()  ):datas.getDate()  ) + ' ';
	var h = (datas.getHours() <10 ? ('0' + datas.getHours() ):datas.getHours() )+ ':';
	var m = (datas.getMinutes() <10 ? ('0' + datas.getMinutes() ):datas.getMinutes() ) ;
	var s = datas.getSeconds();
//	 console.log("转换后时间" + Y + M + D + h + m + s);
	return Y + M + D + h + m;
}


var conversionTimeYMD = function(ts){
	var datas = new Date(ts);
	var Y = datas.getFullYear() + '-';
	var M = (datas.getMonth() + 1 < 10 ? '0' + (datas.getMonth() + 1) : datas.getMonth() + 1) + '-';
	var D = (datas.getDate()  <10 ? ('0' + datas.getDate()  ):datas.getDate()  ) + ' ';
	var h = (datas.getHours() <10 ? ('0' + datas.getHours() ):datas.getHours() )+ ':';
	var m = (datas.getMinutes() <10 ? ('0' + datas.getMinutes() ):datas.getMinutes() ) + ':';
	var s = (datas.getSeconds() <10 ? ('0' + datas.getSeconds() ):datas.getSeconds() );
	return Y + M + D  ;
}

var conversionTimeYMDHMS = function(ts){
	var datas = new Date(ts);
	var Y = datas.getFullYear() + '-';
	var M = (datas.getMonth() + 1 < 10 ? '0' + (datas.getMonth() + 1) : datas.getMonth() + 1) + '-';
	var D = (datas.getDate()  <10 ? ('0' + datas.getDate()  ):datas.getDate()  ) + ' ';
	var h = (datas.getHours() <10 ? ('0' + datas.getHours() ):datas.getHours() )+ ':';
	var m = (datas.getMinutes() <10 ? ('0' + datas.getMinutes() ):datas.getMinutes() ) + ':';
	var s = (datas.getSeconds() <10 ? ('0' + datas.getSeconds() ):datas.getSeconds() );
//	 console.log("转换后时间" + Y + M + D + h + m + s);
	return Y + M + D + h + m + s;
}

/**
 * 下拉控件
 * @param {Object} name  	id或class  例如#id 或 .class
 * @param {Object} arr		 数组
 * @param {Object} arrVal	option的值
 * @param {Object} arrText	option的文本
 */
var selectControl = function(name,arr,arrVal,arrText,startVal){
    $(name).children().remove();
    var str = '<option value = "">';
    str += startVal != undefined ? startVal:'请选择';
    str += '</option>';
    if(arr.length>0){
        for(var i = 0; i < arr.length ; i++){
            str += '<option value="'+arr[i][arrVal]+'">'+arr[i][arrText]+'</option>';
        }
    }
    $(name).append(str);
}