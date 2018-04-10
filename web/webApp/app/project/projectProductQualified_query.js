/**
 * 产品合格证
 */
define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','public','Lodop','printTools'], function (app, system, composition, $, ko) {
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("projectProductQualifiedQueryHandler", { 
				init: function (dom){
					proj.updateInof(viewModal._$_params)
				}
			});
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
        isTrue:function(val,objName){
        	if(val == "Y"){
        		$(objName).eq(0).html("□");//☑&#9745;
        		$(objName).eq(1).html("□");
        	}else{
        		$(objName).eq(0).html("□");
        		$(objName).eq(1).html("□");
        	}
        },
        //☑		□
     	updateInof:function(into){
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
	        proj.isTrue(into.controllerConclusion,".controllerType");
	        
	        viewModal.machineType(into.machineType);//主机型号
	        viewModal.machineNumber(into.machineNumber);//主机编号
	        viewModal.machineConclusion(into.machineConclusion);//主机检验结论
	        proj.isTrue(into.machineConclusion,".machineConclusion");
	        
	        
	        viewModal.governorType(into.governorType);//限速器型号
	        viewModal.governorNumber(into.governorNumber);//限速器编号
	        viewModal.governorConclusion(into.governorConclusion);//限速器检验结论
	        proj.isTrue(into.governorConclusion,".governorConclusion");
	        
	        viewModal.safetiesType(into.safetiesType);//安全钳型号
	        viewModal.safetiesNumber(into.safetiesNumber);//安全钳编号
	        viewModal.safetiesConclusion(into.safetiesConclusion);//安全钳检验结论
	        proj.isTrue(into.safetiesConclusion,".safetiesConclusion");
	        
	        
	        viewModal.bufferType(into.bufferType);//缓冲器型号
	        viewModal.bufferNumber(into.bufferNumber);//缓冲器编号
	        viewModal.bufferConclusion(into.bufferConclusion);//缓冲器检验结论
	        proj.isTrue(into.bufferConclusion,".bufferConclusion");
	        
	        
	        viewModal.doorLockType(into.doorLockType);//门锁型号
	        viewModal.doorLockNumber(into.doorLockNumber);//门锁编号
	        viewModal.doorLockConclusion(into.doorLockConclusion);//门锁检验结论
	        proj.isTrue(into.doorLockConclusion,".doorLockConclusion");
	        
	        
	        viewModal.carDoorLockType(into.carDoorLockType);//轿门锁型号
	        viewModal.carDoorLockNumber(into.carDoorLockNumber);//轿门锁编号
	        viewModal.carDoorLockConclusion(into.carDoorLockConclusion);//轿门锁检验结论
	        proj.isTrue(into.carDoorLockConclusion,".carDoorLockConclusion");
	         
	         
	        viewModal.overspeedDeviceType(into.overspeedDeviceType);//上行超速保护装置型号
	        viewModal.overspeedDeviceNumber(into.overspeedDeviceNumber);//上行超速保护装置编号
	        viewModal.overspeedDeviceConclusion(into.overspeedDeviceConclusion);//上行超速保护装置检验结论
	        proj.isTrue(into.overspeedDeviceConclusion,".overspeedDeviceConclusion");
	        
	        
	        viewModal.collisionDeviceType(into.collisionDeviceType);//轿厢意外移动保护装置型号
	        viewModal.collisionDeviceNumber(into.collisionDeviceNumber);//轿厢意外移动保护装置编号
	        viewModal.collisionDeviceConclusion(into.collisionDeviceConclusion);//轿厢意外移动保护装置检验结论
	        proj.isTrue(into.collisionDeviceConclusion,".collisionDeviceConclusion");
	        
	        
	        viewModal.safetyCircuitsType(into.safetyCircuitsType);//安全电路型号
	        viewModal.safetyCircuitsNumber(into.safetyCircuitsNumber);//安全电路编号
	        
	        /************************************电梯整机出厂检验记录表***********************************/
	        viewModal.inspectionRecord(into.inspectionRecord);//记录文字编号
	        viewModal.inspectionConclusion(into.inspectionConclusion);//出厂检验结论
	         proj.isTrue(into.inspectionConclusion,".inspectionConclusion");
	         
	         
	        viewModal.coauthorMan(into.coauthorMan);//编制人
	        viewModal.coauthorDate(proj.updateTimeIsNull(into.coauthorDate));//编制人日期
	        viewModal.inspectionMan(into.inspectionMan);//检验员
	        viewModal.inspectionDate(proj.updateTimeIsNull(into.inspectionDate));//检验员日期
	        /************************************产品合格证***********************************/
	        viewModal.manufacturingLicense(into.manufacturingLicense);//制造许可证编号
	        viewModal.expiryDate(proj.updateTimeIsNull(into.expiryDate));//有效期
     	},
       	clearViewModal:function(){
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
		printPro:function(){
			loadLODOP();//启动打印功能
			proj.CreateAllPages();//需要打印内容
        	printTools.toPreview();//预览
		},
		CreateAllPages:function(){
			var strBodyStyle = '<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css" />';
//				strBodyStyle +='<link rel="stylesheet" href="lib/font-awesome/css/font-awesome.min.css" />';
//			    strBodyStyle +='<link rel="stylesheet" href="lib/durandal/css/durandal.css" />';
//			    strBodyStyle +='<link rel="stylesheet" href="css/global.css" />';
//			    strBodyStyle +='<link rel="stylesheet" href="lib/layer/skin/default/layer.css" />';
				strBodyStyle +='<style>' + document.getElementById("printStyleQualified").innerHTML+'</style>';
            LODOP.ADD_PRINT_HTM("0mm", "0mm", "RightMargin:0mm", "BottomMargin:0mm", '<body>'+strBodyStyle + document.getElementById("Section0").innerHTML + '</body>');
            LODOP.NewPage();
		}
	}
	
	
	//页面模型
    var viewModal = {
    	printPro:proj.printPro,//打印
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
    }
	
	proj.init();
    return viewModal;
});