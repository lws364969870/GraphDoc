define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery','knockout','layerko','bootstrap','jedate','session','publicAjax','treeView','treeViewedit','layer','public'], function (app, system, composition, $, ko,layerko) {
    var proj = {
        //初始化组件
        init : function(){
            composition.addBindingHandler("projectListAddHandler", { 
                init: function (dom){
                    proj.clearViewModal();//清除缓存
                    viewModal.type(viewModal._$_params.params.type);
                    viewModal.typeStr(viewModal._$_params.params.title);//页面返显  （类型）
                    viewModal.navigation(viewModal._$_params.params.title);//导航栏
                    //判断是否为更新状态
                    var obj = viewModal._$_params.even;//更新数据
                    if(obj != null){
                        //基础信息
                        proj.info(obj);
                        
                        viewModal.showsuccess("修改该项目成功！");
                        viewModal.uploadingBtnShow(true);//上传
                        //上传模块
                        app.setRoot('project/projectFileManage', null, 'projectFileManageList', obj);
                        
                        //审批提交
                        viewModal.examineBtnShow(true);//显示提交审批意见 默认不显示
                        
                        //历史审批
                        viewModal.AuditBtnShow(true);//显示历史审批记录意见
                        app.setRoot('project/projectAuditlog', null, 'projectAuditList', viewModal.id());
                        
                        switch (viewModal.type()){
                            //草稿
                            case "H001":
                                viewModal.setProType(true);//保存项目状态
                                break;
                            //设计
                            case "H002":
                                break;
                            //审批
                            case "H003":
                                break;
                            //复审
                            case "H004":
                                break;
                            //生产
                            case "H005":
                                proj.allProductsMenthod();//所有产品
//                              viewModal.exportBtnShow(true);//显示导出
//                              viewModal.addBtnShow(false);
//                              proj.productQualifiedMenthod();//产品合格证
//                              proj.recordMenthod(obj);//电梯整机出厂检验记录表
                                break;
                            //生产完成  
                            case "H006":
//                              viewModal.exportBtnShow(true);//显示导出
                                viewModal.addBtnShow(true);
                                proj.allProductsMenthod("select");//所有产品
                                proj.productQualifiedMenthod(obj);//产品合格证
                                proj.recordMenthod(obj);//电梯整机出厂检验记录表
                                $("#basics input[type=text],#basics  input[type=radio], #basics textarea,#basics .relevance").attr("disabled",true); 
                                break;
                            //公告
                            case "H007":
//                              viewModal.exportBtnShow(true);//显示导出
                                viewModal.addBtnShow(false);
                                proj.allProductsMenthod("query");//所有产品
                                proj.productQualifiedMenthod(obj,"query");//产品合格证
                                proj.recordMenthod(obj,"query");//电梯整机出厂检验记录表
                                $("input[type=text],input[type=radio],textarea,.relevance").attr("disabled",true); 
                                break;
                            //归档
                            case "H008":
//                              viewModal.exportBtnShow(true);//显示导出
                                viewModal.addBtnShow(false);
                                proj.allProductsMenthod("query");//所有产品
                                proj.productQualifiedMenthod(obj,"query");//产品合格证
                                proj.recordMenthod(obj,"query");//电梯整机出厂检验记录表
                                viewModal.copyBtnShow(true);//显示复制项目
                                $("input[type=text],input[type=radio],textarea,.relevance").attr("disabled",true); 
                                break;
                            //所有项目
                            case "H1999":
                                
                                break;
                            default:
                                break;
                        }
                    }else{
                        viewModal.showsuccess("新增该项目成功！");
                    }
                    
                    //tab
                    $('#myTab a').click(function (e) {
                      e.preventDefault();
                      $(this).tab('show');
                    })
                    
                }
            });
        },
        addProduct:function(){
            //isSelect = 0 不选中  =1 选中
            viewModal.workJson.push({isSelect: "0",fileName: "", workUserId: "", workUser: "", workTime: "", workCount: ""});
        },
        //所有产品
        allProductsMenthod:function(queryORInput){
            viewModal.allProductsBtnShow(true);
            if(queryORInput == "select"){
                app.setRoot('project/projectProduct_select', null, 'projectProductList', {even:viewModal._$_params.even,params:viewModal._$_params.params});
                $("#projectProductListAdd").remove();
            }else if(queryORInput == "query"){
                app.setRoot('project/projectProduct_query', null, 'projectProductList', {even:viewModal._$_params.even,params:viewModal._$_params.params});
                $("#projectProductListAdd").remove();
            }else{
//              app.setRoot('project/projectProduct', null, 'projectProductList', {even:viewModal._$_params.even,params:viewModal._$_params.params});
            }
        },
        //产品合格证
        productQualifiedMenthod:function(obj,queryORInput){
            viewModal.productQualifiedBtnShow(true);
            if(queryORInput == "query"){
                app.setRoot('project/projectProductQualified_query', null, 'projectProductQualifiedModule', obj);
                $("#projectProductQualifiedModuleWrite").remove();
            }else{
//              $(".printStyleQualifiedHide").addClass("hide");
//              app.setRoot('project/projectProductQualified_write', null, 'projectProductQualifiedModule', obj);
//              app.setRoot('project/projectProductQualified_query', null, 'projectProductQualifiedModule', obj);
            }
        },
        //电梯整机出厂检验记录表
        recordMenthod:function(obj,queryORInput){
            viewModal.recordBtnShow(true);
            if(queryORInput == "query"){
                app.setRoot('project/projectRecord_query', null, 'projectProductModule', obj);
                $("#projectProductModuleWrite").remove();
            }
            
//          else{
//              app.setRoot('project/projectRecord', null, 'projectProductModule', obj);
//          }
        },
        updateTimeIsNull:function(val){//时间是否为空
            if(val != null){
                return conversionTimeYMD(val);
            }else{
                return ""
            }
        },
        addTimeIsNull:function(val){//时间是否为空
            if(val != ""){
                return timesTtamp(val);
            }else{
                return ""
            }
        },
        updateTimeIsNull:function(val){//时间是否为空
            if(val != null){
                return conversionTimeYMD(val);
            }else{
                return ""
            }
        },
        addTimeIsNull:function(val){//时间是否为空
            if(val != ""){
                return timesTtamp(val);
            }else{
                return ""
            }
        },
        delAllPro:function(even,target){//删除“所有产品”中某一项记录
            $(target.currentTarget).parents("tr").remove();
            var i = viewModal.workJson();
            for(var idx in i){
                if(even.fileName == i[idx].fileName){
                    i.splice(idx,1);//从start的位置开始向后删除delCount个元素
                    
                }
            }
        },
        //修改时回调
        info:function (into) {
            viewModal.id(into.id);
            viewModal.projectName(into.projectName);//项目名
            viewModal.serialNumber(into.serialNumber);//项目流水号
            viewModal.type(into.type);//是否有合格证
            
            viewModal.parentName(into.parentName);//上级项目名称
            viewModal.parentId(into.parentId);//上级项目Id
            viewModal.workJson(into.projectWork);
           viewModal.path(into.path),//文件地址
            /************************************基础信息**********************************/
            viewModal.useEnterprise(into.useEnterprise);//使用单位
            viewModal.productName(into.productName);//产品名称
            viewModal.contractNumber(into.contractNumber);//合同编号
            viewModal.productionNumber(into.productionNumber);//出厂编号
            viewModal.productionDate(proj.updateTimeIsNull(into.productionDate));//出厂日期
            viewModal.responsibleCompany(into.responsibleCompany);//责任公司
            viewModal.salesMan(into.salesMan);//业务员
            viewModal.relevantDate(proj.updateTimeIsNull(into.relevantDate));//相关日期
            
            /************************************电梯主要技术参数***********************************/
            viewModal.productType(into.productType);//产品型号
            viewModal.controlMode(into.controlMode);//控制方式
            viewModal.ratedSpeed(into.ratedSpeed);//额定速度
            viewModal.driveMode(into.driveMode);//驱动方式
            viewModal.serviceLayer(into.serviceLayer);//服务层站
            viewModal.ratedload(into.ratedload);//额定载重
            viewModal.carDoorSize(into.carDoorSize);//开门尺寸
            viewModal.carDoorMode(into.carDoorMode);//开门方式
            viewModal.carSize(into.carSize);//轿厢内尺寸
            viewModal.deviceRatio(into.deviceRatio);//曳引比
            
            /************************************主要部件参数***********************************/
            viewModal.controllerType(into.controllerType);//电柜型号
            viewModal.controllerNumber(into.controllerNumber);//电柜编号
            viewModal.controllerConclusion(into.controllerConclusion);//电柜检验结论
            
            viewModal.machineType(into.machineType);//主机型号
            viewModal.machineNumber(into.machineNumber);//主机编号
            viewModal.machineConclusion(into.machineConclusion);//主机检验结论
            
            
            viewModal.governorType(into.governorType);//限速器型号
            viewModal.governorNumber(into.governorNumber);//限速器编号
            viewModal.governorConclusion(into.governorConclusion);//限速器检验结论
            
            viewModal.safetiesType(into.safetiesType);//安全钳型号
            viewModal.safetiesNumber(into.safetiesNumber);//安全钳编号
            viewModal.safetiesConclusion(into.safetiesConclusion);//安全钳检验结论
            
            
            viewModal.bufferType(into.bufferType);//缓冲器型号
            viewModal.bufferNumber(into.bufferNumber);//缓冲器编号
            viewModal.bufferConclusion(into.bufferConclusion);//缓冲器检验结论
            
            viewModal.doorLockType(into.doorLockType);//门锁型号
            viewModal.doorLockNumber(into.doorLockNumber);//门锁编号
            viewModal.doorLockConclusion(into.doorLockConclusion);//门锁检验结论
            
            
            viewModal.carDoorLockType(into.carDoorLockType);//轿门锁型号
            viewModal.carDoorLockNumber(into.carDoorLockNumber);//轿门锁编号
            viewModal.carDoorLockConclusion(into.carDoorLockConclusion);//轿门锁检验结论
             
             
            viewModal.overspeedDeviceType(into.overspeedDeviceType);//上行超速保护装置型号
            viewModal.overspeedDeviceNumber(into.overspeedDeviceNumber);//上行超速保护装置编号
            viewModal.overspeedDeviceConclusion(into.overspeedDeviceConclusion);//上行超速保护装置检验结论
            
            
            viewModal.collisionDeviceType(into.collisionDeviceType);//轿厢意外移动保护装置型号
            viewModal.collisionDeviceNumber(into.collisionDeviceNumber);//轿厢意外移动保护装置编号
            viewModal.collisionDeviceConclusion(into.collisionDeviceConclusion);//轿厢意外移动保护装置检验结论
            
            
            viewModal.safetyCircuitsType(into.safetyCircuitsType);//安全电路型号
            viewModal.safetyCircuitsNumber(into.safetyCircuitsNumber);//安全电路编号
            
            /************************************电梯整机出厂检验记录表***********************************/
            viewModal.inspectionRecord(into.inspectionRecord);//记录文字编号
            viewModal.inspectionConclusion(into.inspectionConclusion);//出厂检验结论
             
             
            viewModal.coauthorMan(into.coauthorMan);//编制人
            viewModal.coauthorDate(proj.updateTimeIsNull(into.coauthorDate));//编制人日期
            viewModal.inspectionMan(into.inspectionMan);//检验员
            viewModal.inspectionDate(proj.updateTimeIsNull(into.inspectionDate));//检验员日期
            /************************************产品合格证***********************************/
            viewModal.manufacturingLicense(into.manufacturingLicense);//制造许可证编号
            viewModal.expiryDate(proj.updateTimeIsNull(into.expiryDate));//有效期
        },
        //测试定义数据
        testSave:function(){
            var i = viewModal.testIdx();
            viewModal.projectName("项目名" + i);//项目名
            /************************************基础信息**********************************/
            viewModal.useEnterprise("使用单位"+ i);//使用单位
            viewModal.productName("产品名称"+ i);//产品名称
            viewModal.contractNumber("合同编号"+ i);//合同编号
            viewModal.productionNumber("出厂编号"+ i);//出厂编号
            viewModal.productionDate("2017-10-01");//出厂日期
            viewModal.responsibleCompany("责任公司"+ i);//责任公司
            viewModal.salesMan("业务员"+ i);//业务员
            viewModal.relevantDate("2017-10-01");//相关日期
            
            /************************************电梯主要技术参数***********************************/
            viewModal.productType("产品型号"+ i);//产品型号
            viewModal.controlMode("控制方式"+ i);//控制方式
            viewModal.ratedSpeed("额定速度"+ i);//额定速度
            viewModal.driveMode("驱动方式"+ i);//驱动方式
            viewModal.serviceLayer("服务层站"+ i);//服务层站
            viewModal.ratedload("额定载重"+ i);//额定载重
            viewModal.carDoorSize("开门尺寸"+ i);//开门尺寸
            viewModal.carDoorMode("开门方式"+ i);//开门方式
            viewModal.carSize("轿厢内尺寸"+ i);//轿厢内尺寸
            viewModal.deviceRatio("曳引比"+ i);//曳引比
        },
        setProjectType:function(even){
            if(submitFun()){
                var requeset = {
                    id:viewModal.id(),//项目名
                    type:"H008",//上级项目名称
                };
                showconfirm("是否保存归档状态！",function(){
                    api.setProjectType(requeset,function(res){
                        if(res["code"] == 0){
                            showAlert(viewModal.showsuccess(),function(){
                                app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
                            });
                        }else{
                            showAlert(res["message"],function(){});
                        }
                    })
                })
            }
        },
        
        getViewModel:function(){
            var requeset = {
                    projectName:viewModal.projectName(),//项目名
                    parentName:$("#parentName").val(),//上级项目名称
                    parentId:$("#parentId").val(),//上级项目Id
                    status:viewModal.status(),//状态
                    type:viewModal.type(),//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
                    
                    /**************************基础信息**************************/
                    useEnterprise:viewModal.useEnterprise(),//使用单位
                    productName:viewModal.productName(),//产品名称
                    contractNumber:viewModal.contractNumber(),//合同编号
                    productionNumber:viewModal.productionNumber(),//出厂编号
                    productionDate:proj.addTimeIsNull($(".productionDate").val()),//出厂日期
                    responsibleCompany:viewModal.responsibleCompany(),//责任公司
                    salesMan:viewModal.salesMan(),//业务员
                    relevantDate:proj.addTimeIsNull($("#relevantDate").val()),//相关日期
                    
                    /**************************电梯主要技术参数**************************/
                    productType:viewModal.productType(),//产品型号
                    controlMode:viewModal.controlMode(),//控制方式
                    ratedSpeed:viewModal.ratedSpeed(),//额定速度
                    driveMode:viewModal.driveMode(),//驱动方式
                    serviceLayer:viewModal.serviceLayer(),//服务层站
                    ratedload:viewModal.ratedload(),//额定载重
                    carDoorSize:viewModal.carDoorSize(),//开门尺寸
                    carDoorMode:viewModal.carDoorMode(),//开门方式
                    carSize:viewModal.carSize(),//轿厢内尺寸
                    deviceRatio:viewModal.deviceRatio(),//曳引比
                    
                    /**************************主要部件参数**************************/
                    controllerType:viewModal.controllerType(),//电柜型号
                    controllerNumber:viewModal.controllerNumber(),//电柜编号
                    controllerConclusion:viewModal.controllerConclusion(),//电柜检验结论
                    machineType:viewModal.machineType(),//主机型号
                    machineNumber:viewModal.machineNumber(),//主机编号
                    machineConclusion:viewModal.machineConclusion(),//主机检验结论
                    governorType:viewModal.governorType(),//限速器型号
                    governorNumber:viewModal.governorNumber(),//限速器编号
                    governorConclusion:viewModal.governorConclusion(),//限速器检验结论
                    safetiesType:viewModal.safetiesType(),//安全钳型号
                    safetiesNumber:viewModal.safetiesNumber(),//安全钳编号
                    safetiesConclusion:viewModal.safetiesConclusion(),//安全钳检验结论
                    bufferType:viewModal.bufferType(),//缓冲器型号
                    bufferNumber:viewModal.bufferNumber(),//缓冲器编号
                    bufferConclusion:viewModal.bufferConclusion(),//缓冲器检验结论
                    doorLockType:viewModal.doorLockType(),//门锁型号
                    doorLockNumber:viewModal.doorLockNumber(),//门锁编号
                    doorLockConclusion:viewModal.doorLockConclusion(),//门锁检验结论
                    carDoorLockType:viewModal.carDoorLockType(),//轿门锁型号
                    carDoorLockNumber:viewModal.carDoorLockNumber(),//轿门锁编号
                    carDoorLockConclusion:viewModal.carDoorLockConclusion(),//轿门锁检验结论
                    overspeedDeviceType:viewModal.overspeedDeviceType(),//上行超速保护装置型号
                    overspeedDeviceNumber:viewModal.overspeedDeviceNumber(),//上行超速保护装置编号
                    overspeedDeviceConclusion:viewModal.overspeedDeviceConclusion(),//上行超速保护装置检验结论
                    collisionDeviceType:viewModal.collisionDeviceType(),//轿厢意外移动保护装置型号
                    collisionDeviceNumber:viewModal.collisionDeviceNumber(),//轿厢意外移动保护装置编号
                    collisionDeviceConclusion:viewModal.collisionDeviceConclusion(),//轿厢意外移动保护装置检验结论
                    safetyCircuitsType:viewModal.safetyCircuitsType(),//安全电路型号
                    safetyCircuitsNumber:viewModal.safetyCircuitsNumber(),//安全电路编号
                    
                    /**************************电梯整机出厂检验记录表**************************/
                    inspectionRecord:viewModal.inspectionRecord(),//记录文字编号
                    inspectionConclusion:viewModal.inspectionConclusion(),//出厂检验结论
                    coauthorMan:viewModal.coauthorMan(),//编制人
                    coauthorDate:proj.addTimeIsNull($("#coauthorDate2").val()),//编制人日期
                    inspectionMan:viewModal.inspectionMan(),//检验员
                    inspectionDate:proj.addTimeIsNull($("#inspectionDate").val()),//检验员日期
                    
                    /**************************产品合格证**************************/
                    manufacturingLicense:viewModal.manufacturingLicense(),//制造许可证编号
                    expiryDate:proj.addTimeIsNull($("#expiryDate").val()),//有效期
                }
            return requeset;
        },
        //提交数据至数据库
        savePro:function(even){
            var workJsonArr = [];
//          console.log(viewModal.workJson())
            if(viewModal.workJson() == null){
            workJsonArr = ""
            }else{
                if(viewModal.workJson().length > 0 ){
                    workJsonArr = JSON.stringify(viewModal.workJson());
                }else{
                    workJsonArr = ""
                }
            }
            
            if(submitFun() == 1){
                var requeset = {
                    projectName:viewModal.projectName(),//项目名
                    parentName:$("#parentName").val(),//上级项目名称
                    parentId:$("#parentId").val(),//上级项目Id
                    status:viewModal.status(),//状态
                    type:viewModal.type(),//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
                    workJson:workJsonArr,
                    path:viewModal.path(),//文件地址
                    /**************************基础信息**************************/
                    useEnterprise:viewModal.useEnterprise(),//使用单位
                    productName:viewModal.productName(),//产品名称
                    contractNumber:viewModal.contractNumber(),//合同编号
                    productionNumber:viewModal.productionNumber(),//出厂编号
                    productionDate:proj.addTimeIsNull($(".productionDate").val()),//出厂日期
                    responsibleCompany:viewModal.responsibleCompany(),//责任公司
                    salesMan:viewModal.salesMan(),//业务员
                    relevantDate:proj.addTimeIsNull($("#relevantDate").val()),//相关日期
                    
                    /**************************电梯主要技术参数**************************/
                    productType:viewModal.productType(),//产品型号
                    controlMode:viewModal.controlMode(),//控制方式
                    ratedSpeed:viewModal.ratedSpeed(),//额定速度
                    driveMode:viewModal.driveMode(),//驱动方式
                    serviceLayer:viewModal.serviceLayer(),//服务层站
                    ratedload:viewModal.ratedload(),//额定载重
                    carDoorSize:viewModal.carDoorSize(),//开门尺寸
                    carDoorMode:viewModal.carDoorMode(),//开门方式
                    carSize:viewModal.carSize(),//轿厢内尺寸
                    deviceRatio:viewModal.deviceRatio(),//曳引比
                    
                    /**************************主要部件参数**************************/
                    controllerType:viewModal.controllerType(),//电柜型号
                    controllerNumber:viewModal.controllerNumber(),//电柜编号
                    controllerConclusion:viewModal.controllerConclusion(),//电柜检验结论
                    machineType:viewModal.machineType(),//主机型号
                    machineNumber:viewModal.machineNumber(),//主机编号
                    machineConclusion:viewModal.machineConclusion(),//主机检验结论
                    governorType:viewModal.governorType(),//限速器型号
                    governorNumber:viewModal.governorNumber(),//限速器编号
                    governorConclusion:viewModal.governorConclusion(),//限速器检验结论
                    safetiesType:viewModal.safetiesType(),//安全钳型号
                    safetiesNumber:viewModal.safetiesNumber(),//安全钳编号
                    safetiesConclusion:viewModal.safetiesConclusion(),//安全钳检验结论
                    bufferType:viewModal.bufferType(),//缓冲器型号
                    bufferNumber:viewModal.bufferNumber(),//缓冲器编号
                    bufferConclusion:viewModal.bufferConclusion(),//缓冲器检验结论
                    doorLockType:viewModal.doorLockType(),//门锁型号
                    doorLockNumber:viewModal.doorLockNumber(),//门锁编号
                    doorLockConclusion:viewModal.doorLockConclusion(),//门锁检验结论
                    carDoorLockType:viewModal.carDoorLockType(),//轿门锁型号
                    carDoorLockNumber:viewModal.carDoorLockNumber(),//轿门锁编号
                    carDoorLockConclusion:viewModal.carDoorLockConclusion(),//轿门锁检验结论
                    overspeedDeviceType:viewModal.overspeedDeviceType(),//上行超速保护装置型号
                    overspeedDeviceNumber:viewModal.overspeedDeviceNumber(),//上行超速保护装置编号
                    overspeedDeviceConclusion:viewModal.overspeedDeviceConclusion(),//上行超速保护装置检验结论
                    collisionDeviceType:viewModal.collisionDeviceType(),//轿厢意外移动保护装置型号
                    collisionDeviceNumber:viewModal.collisionDeviceNumber(),//轿厢意外移动保护装置编号
                    collisionDeviceConclusion:viewModal.collisionDeviceConclusion(),//轿厢意外移动保护装置检验结论
                    safetyCircuitsType:viewModal.safetyCircuitsType(),//安全电路型号
                    safetyCircuitsNumber:viewModal.safetyCircuitsNumber(),//安全电路编号
                    
                    /**************************电梯整机出厂检验记录表**************************/
                    inspectionRecord:viewModal.inspectionRecord(),//记录文字编号
                    inspectionConclusion:viewModal.inspectionConclusion(),//出厂检验结论
                    coauthorMan:viewModal.coauthorMan(),//编制人
                    coauthorDate:proj.addTimeIsNull($("#coauthorDate2").val()),//编制人日期
                    inspectionMan:viewModal.inspectionMan(),//检验员
                    inspectionDate:proj.addTimeIsNull($("#inspectionDate").val()),//检验员日期
                    
                    /**************************产品合格证**************************/
                    manufacturingLicense:viewModal.manufacturingLicense(),//制造许可证编号
                    expiryDate:proj.addTimeIsNull($("#expiryDate").val()),//有效期
                };
                if(viewModal.serialNumber() != ""){
                    requeset.serialNumber = viewModal.serialNumber()//项目流水号
                }
                if(viewModal.id() != ""){
                    requeset.id = viewModal.id()//id
                }
                console.log(requeset);
                api.saveProject(requeset,function(res){
                    if(res["code"] == 0){
                        showAlert(viewModal.showsuccess(),function(){
                            app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
                        });
                    }else{
                        showAlert(res["message"],function(){});
                    }
                })
            }
        },
        /*关联*/
        relevance:function(){
            layerko.open('project/projectList_subproject', {
                type: 1, 
                title:'关联项目',
                content: '',//内容
                area: ['70%','95%'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: true,//是否允许浏览器出现滚动条
                end:function(){
                }
            }, {});     
        },
        //返回至查询界面
        retrunProject:function(){
            app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
        },
        //提交审核
        submitExamine:function(){
            layerko.open('project/projectAudit', {
                type: 1, 
                title:'审批意见',
                content: '',//内容
                area: ['580px','580px'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: true,//是否允许浏览器出现滚动条
                end:function(){
                }
            }, {params:viewModal._$_params.params,id:viewModal.id()});
        },
        //清除缓存
        clearViewModal:function(){
            viewModal.navigation("");//导航栏
            
            viewModal.showsuccess("");
            viewModal.addBtnShow(true);//显示保存
            viewModal.uploadingBtnShow(false);//显示上传
            viewModal.AuditBtnShow(false);//显示历史审批记录意见
            viewModal.allProductsBtnShow(false);//显示所有产品
            viewModal.productQualifiedBtnShow(false);//显示产品合格证
            viewModal.recordBtnShow(false);//显示电梯整机出厂检验记录表
//          viewModal.exportBtnShow(false);//显示导出
            viewModal.examineBtnShow(false);//显示提交审批意见 默认不显示
            viewModal.copyBtnShow(false);//显示复制项目
            viewModal.setProType(false);//显示保存项目状态
            viewModal.path("");//文件地址
            viewModal.id("");//id
            viewModal.projectName("");//项目名
            viewModal.serialNumber("");//项目流水号
            viewModal.parentName("");//上级项目名称
            viewModal.parentId("");//上级项目Id
            viewModal.status("Y");//状态
            viewModal.type("");//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
            viewModal.typeStr("");//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
            viewModal.workJson([]);
            /**************************基础信息**************************/
            viewModal.useEnterprise("");//使用单位
            viewModal.productName("");//产品名称
            viewModal.contractNumber("");//合同编号
            viewModal.productionNumber("");//出厂编号
            viewModal.productionDate("");//出厂日期
            viewModal.responsibleCompany("");//责任公司
            viewModal.salesMan("");//业务员
            viewModal.relevantDate("");//相关日期
            
            /**************************电梯主要技术参数**************************/
            viewModal.productType("");//产品型号
            viewModal.controlMode("");//控制方式
            viewModal.ratedSpeed("");//额定速度
            viewModal.driveMode("");//驱动方式
            viewModal.serviceLayer("");//服务层站
            viewModal.ratedload("");//额定载重
            viewModal.carDoorSize("");//开门尺寸
            viewModal.carDoorMode("");//开门方式
            viewModal.carSize("");//轿厢内尺寸
            viewModal.deviceRatio("");//曳引比
            
            /**************************主要部件参数**************************/
            viewModal.controllerType("");//电柜型号
            viewModal.controllerNumber("");//电柜编号
            viewModal.controllerConclusion("Y");//电柜检验结论
            viewModal.machineType("");//主机型号
            viewModal.machineNumber("");//主机编号
            viewModal.machineConclusion("Y");//主机检验结论
            viewModal.governorType("");//限速器型号
            viewModal.governorNumber("");//限速器编号
            viewModal.governorConclusion("Y");//限速器检验结论
            viewModal.safetiesType("");//安全钳型号
            viewModal.safetiesNumber("");//安全钳编号
            viewModal.safetiesConclusion("Y");//安全钳检验结论
            viewModal.bufferType("");//缓冲器型号
            viewModal.bufferNumber("");//缓冲器编号
            viewModal.bufferConclusion("Y");//缓冲器检验结论
            viewModal.doorLockType("");//门锁型号
            viewModal.doorLockNumber("");//门锁编号
            viewModal.doorLockConclusion("Y");//门锁检验结论
            viewModal.carDoorLockType("");//轿门锁型号
            viewModal.carDoorLockNumber("");//轿门锁编号
            viewModal.carDoorLockConclusion("Y");//轿门锁检验结论
            viewModal.overspeedDeviceType("");//上行超速保护装置型号
            viewModal.overspeedDeviceNumber("");//上行超速保护装置编号
            viewModal.overspeedDeviceConclusion("Y");//上行超速保护装置检验结论
            viewModal.collisionDeviceType("");//轿厢意外移动保护装置型号
            viewModal.collisionDeviceNumber("");//轿厢意外移动保护装置编号
            viewModal.collisionDeviceConclusion("Y");//轿厢意外移动保护装置检验结论
            viewModal.safetyCircuitsType("");//安全电路型号
            viewModal.safetyCircuitsNumber("");//安全电路编号
            
            /**************************电梯整机出厂检验记录表**************************/
            viewModal.inspectionRecord("");//记录文字编号
            viewModal.inspectionConclusion("Y");//出厂检验结论
            viewModal.coauthorMan("");//编制人
            viewModal.coauthorDate("");//编制人日期
            viewModal.inspectionMan("");//检验员
            viewModal.inspectionDate("");//检验员日期
            
            /**************************产品合格证**************************/
            viewModal.manufacturingLicense("");//制造许可证编号
            viewModal.expiryDate("");//有效期
        },
        /*日期控件*/
        jedateMenthod:function(event,target){
            $.jeDate(target.currentTarget,{
                format:"YYYY-MM-DD",
                okfun:function(elem, val, date) {  
                },
                choosefun:function(elem, val, date) {
                 
                },  //选中日期后的回调
            }) 
        },
        jedateMenthod2:function(event,target,objClass){
            $.jeDate(target.currentTarget,{
                format:"YYYY-MM-DD",
                okfun:function(elem, val, date) {  
                    $(objClass).val(val);
                },
                choosefun:function(elem, val, date) {
                    $(objClass).val(val);
                },  //选中日期后的回调
            }) 
        },
        //导出
        exportCVS:function(event,target){
            window.location.href = urlAddress + "exportCVS?token="+$.session.get("token")+"&id="+viewModal.id()+"&model=produce";
        },
        copy:function(event,target){
            api.copyProject({id:viewModal.id()},function(res){
                if(res["code"] == 0){
                    showAlert("复制项目成功，请在草稿中查看！",function(){});
                }else{showAlert("复制失败！",function(){});}
            });
        },
        printProjectProductQualifiedModule:function(){
            layerko.open('project/projectProductQualified_query', {
                type: 1, 
                title:'打印产品合格证',
                content: '',//内容
                area: ['80%','90%'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: false,//是否允许浏览器出现滚动条
                end:function(){
                }
            }, proj.getViewModel());
            
        },
        printprojectRecord:function(){
            layerko.open('project/projectRecord_query', {
                type: 1, 
                title:'打印电梯整机出厂检验记录表',
                content: '',//内容
                area: ['80%','90%'],
                move: false,//触发拖动的元素
                resize: false,//是否允许拉伸
                shadeClose: false,//是否点击遮罩关闭
                scrollbar: false,//是否允许浏览器出现滚动条
                end:function(){
                }
            }, proj.getViewModel());
            
        },
    }
    
    //页面模型
    var viewModal = {
        navigation:ko.observable(""),//导航栏
        
        addBtnShow:ko.observable(true),//显示保存
        uploadingBtnShow:ko.observable(false),//显示上传
        AuditBtnShow:ko.observable(false),//显示历史审批记录意见
        allProductsBtnShow:ko.observable(false),//显示所有产品
        productQualifiedBtnShow:ko.observable(false),//显示产品合格证
        recordBtnShow:ko.observable(false),//显示电梯整机出厂检验记录表
        copyBtnShow:ko.observable(false),//显示复制项目
        setProType:ko.observable(false),//显示保存项目状态
        
        testIdx:ko.observable(),
        testSave:proj.testSave,
        submitExamine:proj.submitExamine,//审批流程
        savePro:proj.savePro,//保存到数据库
        retrunProject:proj.retrunProject,//返回列表
        jedateMenthod:proj.jedateMenthod,
        jedateMenthod2:proj.jedateMenthod2,
        relevance:proj.relevance,//关联
        exportCVS:proj.exportCVS,//导出CVS
        copy:proj.copy,//复制项目
        addProduct:proj.addProduct,
        setProjectType:proj.setProjectType,//保存项目归档
        delAllPro:proj.delAllPro,//删除“所有产品”中某一项记录
        printProjectProductQualifiedModule:proj.printProjectProductQualifiedModule,//打印产品合格证
        printprojectRecord:proj.printprojectRecord,//打印打印电梯整机出厂检验记录表
        showsuccess:ko.observable(""),//alert显示文字
        examineBtnShow:ko.observable(false),//显示提交审批意见 默认不显示
//      exportBtnShow:ko.observable(false),//显示导出
        
        id:ko.observable(),//id
        projectName:ko.observable(),//项目名
        serialNumber:ko.observable(),//项目流水号
        parentName:ko.observable(),//上级项目名称
        parentId:ko.observable(),//上级项目Id
        status:ko.observable("Y"),//状态
        type:ko.observable(),//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
        typeStr:ko.observable(),//类型 H001草稿  H002设计、H003审批、H004复审、H005生产、H006公告、H007归档   
        workJson:ko.observableArray([]),
        path:ko.observable(),//文件地址
        /**************************基础信息**************************/
        useEnterprise:ko.observable(""),//使用单位
        productName:ko.observable(""),//产品名称
        contractNumber:ko.observable(""),//合同编号
        productionNumber:ko.observable(""),//出厂编号
        productionDate:ko.observable(""),//出厂日期
        responsibleCompany:ko.observable(""),//责任公司
        salesMan:ko.observable(""),//业务员
        relevantDate:ko.observable(""),//相关日期
        
        /**************************电梯主要技术参数**************************/
        productType:ko.observable(""),//产品型号
        controlMode:ko.observable(""),//控制方式
        ratedSpeed:ko.observable(""),//额定速度
        driveMode:ko.observable(""),//驱动方式
        serviceLayer:ko.observable(""),//服务层站
        ratedload:ko.observable(""),//额定载重
        carDoorSize:ko.observable(""),//开门尺寸
        carDoorMode:ko.observable(""),//开门方式
        carSize:ko.observable(""),//轿厢内尺寸
        deviceRatio:ko.observable(""),//曳引比
        
        
        
        /**************************合格证**************************/
            /**************************主要部件参数**************************/
            controllerType:ko.observable(""),//电柜型号
            controllerNumber:ko.observable(""),//电柜编号
            controllerConclusion:ko.observable("Y"),//电柜检验结论
            machineType:ko.observable(""),//主机型号
            machineNumber:ko.observable(""),//主机编号
            machineConclusion:ko.observable("Y"),//主机检验结论
            governorType:ko.observable(""),//限速器型号
            governorNumber:ko.observable(""),//限速器编号
            governorConclusion:ko.observable("Y"),//限速器检验结论
            safetiesType:ko.observable(""),//安全钳型号
            safetiesNumber:ko.observable(""),//安全钳编号
            safetiesConclusion:ko.observable("Y"),//安全钳检验结论
            bufferType:ko.observable(""),//缓冲器型号
            bufferNumber:ko.observable(""),//缓冲器编号
            bufferConclusion:ko.observable("Y"),//缓冲器检验结论
            doorLockType:ko.observable(""),//门锁型号
            doorLockNumber:ko.observable(""),//门锁编号
            doorLockConclusion:ko.observable("Y"),//门锁检验结论
            carDoorLockType:ko.observable(""),//轿门锁型号
            carDoorLockNumber:ko.observable(""),//轿门锁编号
            carDoorLockConclusion:ko.observable("Y"),//轿门锁检验结论
            overspeedDeviceType:ko.observable(""),//上行超速保护装置型号
            overspeedDeviceNumber:ko.observable(""),//上行超速保护装置编号
            overspeedDeviceConclusion:ko.observable("Y"),//上行超速保护装置检验结论
            collisionDeviceType:ko.observable(""),//轿厢意外移动保护装置型号
            collisionDeviceNumber:ko.observable(""),//轿厢意外移动保护装置编号
            collisionDeviceConclusion:ko.observable("Y"),//轿厢意外移动保护装置检验结论
            safetyCircuitsType:ko.observable(""),//安全电路型号
            safetyCircuitsNumber:ko.observable(""),//安全电路编号
            
            /**************************电梯整机出厂检验记录表**************************/
            inspectionRecord:ko.observable(""),//记录文字编号
            inspectionConclusion:ko.observable("Y"),//出厂检验结论
            coauthorMan:ko.observable(""),//编制人
            coauthorDate:ko.observable(""),//编制人日期
            inspectionMan:ko.observable(""),//检验员
            inspectionDate:ko.observable(""),//检验员日期
            
            /**************************产品合格证**************************/
            manufacturingLicense:ko.observable(""),//制造许可证编号
            expiryDate:ko.observable(""),//有效期
        /**************************合格证**************************/    
    }
    
    proj.init();
    return viewModal;
});