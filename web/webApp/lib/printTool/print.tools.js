/*************************************************
*********  打印控件所需代码 - start  ************/


/*********  打印控件所需代码 - end  *************
************************************************/

//打印工具集
var printTools = {
        //解决内容超出表格线问题#18817 Keson
		defaultVal: {
			top:     '2mm',
			left:    '0mm',
			width:   'RightMargin:0mm',
			height:  'BottomMargin:2mm',
			content: ''
		},
		setPrint: function(obj){	//设置打印
			if(!$('#downPrompt').length){
				obj = $.extend({}, this.defaultVal, obj);
				LODOP.SET_SHOW_MODE("NP_NO_RESULT",true);
				LODOP.ADD_PRINT_HTM( obj.top, obj.left, obj.width, obj.height, obj.content );
				LODOP.NewPageA();
			}else{
				if( parent.FK !== undefined ){
					parent.FK.Message.Show({text: '请先安装打印控件',type: "war",timeout: 3000});
				}
			}
		},
		toPreview: function(obj){	//打印预览
			LODOP.PREVIEW();
		}
	};
