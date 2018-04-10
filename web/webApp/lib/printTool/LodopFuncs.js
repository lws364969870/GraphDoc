var LODOP; //声明为全局变量
var LODOP_PRIVATE = {};
var iRadioValue=0;

function loadLODOP(){
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
}

var CreatedOKLodop7766=null;

//====测试能否调用老Lodop:====
var CanExecOldLodop = null;
function checkOldLodop() {
    return false;
    if (CanExecOldLodop !== null) {
        return CanExecOldLodop;
    }
    var lodop;
    var oOBJECT = document.getElementById('LODOP_OB');
    var oEMBED = document.getElementById('LODOP_EM');
    var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);

    //=====如果页面有Lodop就直接使用，没有则新建:==========
    if (oOBJECT!=undefined || oEMBED!=undefined) {
        if (isIE) lodop=oOBJECT; else  lodop=oEMBED;
    } else if (CreatedOKLodop7766==null){
        lodop=document.createElement("object");
        lodop.setAttribute("width",0);
        lodop.setAttribute("height",0);
        lodop.setAttribute('id', 'tmpLodop');
        lodop.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
        if (isIE) lodop.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
        else lodop.setAttribute("type","application/x-print-lodop");
        document.documentElement.appendChild(lodop);
        CreatedOKLodop7766=lodop;
    } else lodop=CreatedOKLodop7766;
    //=====Lodop插件未安装时提示下载地址:==========
    if ((lodop==null)||(typeof(lodop.VERSION)=="undefined")) {
        CanExecOldLodop = false;
    } else {
        CanExecOldLodop = true;
    }
    document.getElementById('tmpLodop').remove();
    return CanExecOldLodop;
}

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop(){
    try{
        if (checkOldLodop()) {
            return false;
        }
        var ua=navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) !=null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;
        if (ua.match(/QQBrowser/i) != null) return false;
        var verTrident=ua.match(/Trident\D?\d+/i);
        var verIE=ua.match(/MSIE\D?\d+/i);
        var verOPR=ua.match(/OPR\D?\d+/i);
        var verFF=ua.match(/Firefox\D?\d+/i);
        var x64=ua.match(/x64/i);
        if ((verTrident==null)&&(verIE==null)&&(x64!==null))
            return true; else
        if ( verFF !== null) {
            verFF = verFF[0].match(/\d+/);
            if ( verFF[0] >= 42 ) return true;
        } else
        if ( verOPR !== null) {
            verOPR = verOPR[0].match(/\d+/);
            if ( verOPR[0] >= 32 ) return true;
        } else
        if ((verTrident==null)&&(verIE==null)) {
            var verChrome=ua.match(/Chrome\D?\d+/i);
            if ( verChrome !== null ) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0]>=42) return true;
            };
        };
        return false;
    } catch(err) {return true;};
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
    head.insertBefore( oscript,head.firstChild );
    //本机浏览器的后补端口8001：
    oscript = document.createElement("script");
    oscript.src ="http://localhost:8001/CLodopfuncs.js?priority=2";
    head.insertBefore( oscript,head.firstChild );
};

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT,oEMBED){
    if ($('#downPrompt').length) {
        return;
    }
    var fileName = "CLodopPrint_Setup_for_Win32NT.zip";
    var strHtmInstall='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>打印控件未安装!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';
    
    var strHtmUpdate='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>打印控件需要升级!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';

    var strHtm64_Install='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>打印控件未安装!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';

    var strHtm64_Update='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>打印控件需要升级!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';

    var strHtmFireFox='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</div></div>';

    var strHtmChrome='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</div></div>';

    var strCLodopInstall='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>CLodop云打印服务未安装启动!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';

    var strCLodopUpdate='<div style="margin:10px auto 0 auto" class="wb100 tac" id="downPrompt"><div class="dib yellow-alert bra3" style="margin-top:20px;color: rgb(165, 58, 38);background-color: rgb(255, 242, 210);border: solid 1px rgb(192, 121, 98);">'+
        '<span class="dib w16 pr"><i class="dib imgall wh16 pa"></i></span>CLodop云打印服务需升级!点击这里<a href="'+fileName+'" style="color: #f00;text-decoration: underline;font-weight: bold;">'+
        ' 执行安装 </a>,安装后请刷新页面或重新进入。</div></div>';
    
    var LODOP;
    try{
        var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
            try{ LODOP=getCLodop();} catch(err) {};
            //if (!LODOP && document.readyState!=="complete") {$('#toInsert').before('C-Lodop没准备好，请稍后再试！'); return;};
            if (!LODOP) {
                if (isIE) $('#toInsert').before(strCLodopInstall); else
                    $('#toInsert').before(strCLodopInstall);
                return;
            } else {

                if (CLODOP.CVERSION<"2.0.5.3") {
                    if (isIE) $('#toInsert').before(strCLodopUpdate); else
                        $('#toInsert').before(strCLodopUpdate);
                };
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
            };
        } else {
            var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
            } else LODOP=CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                if (navigator.userAgent.indexOf('Chrome')>=0) {
                    $('#toInsert').before(strHtmChrome);
                    //document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
                }
                    
                if (navigator.userAgent.indexOf('Firefox')>=0) {
                    $('#toInsert').before(strHtmFireFox);
                    //document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
                }
                if (is64IE) {
                    $('#toInsert').before(strHtm64_Install);
                    //document.write(strHtm64_Install);
                } else if (isIE) {
                    $('#toInsert').before(strHtmInstall);
                    //document.write(strHtmInstall);
                } else {
                    $('#toInsert').before(strHtmInstall);
                    //document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
                }
                return LODOP;
            };
        };
        if (LODOP.VERSION<"6.1.5.8") {
            if (needCLodop())
                $('#toInsert').before(strCLodopUpdate);
            if (is64IE) $('#toInsert').before(strHtm64_Update); else
            if (isIE) $('#toInsert').before(strHtmUpdate); else
                $('#toInsert').before(strHtmUpdate);
            return LODOP;
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

        //===========================================================
        return LODOP;
    } catch(err) {alert("getLodop出错:"+err);};
};



LODOP_PRIVATE.check_plugins = function(lodop){
  try{
    lodop.PRINT_INIT("打印控件Lodop功能演示_多页预览");
  }catch(e){
    lodop.PRINT_INIT = function(){};
    lodop.ADD_PRINT_HTM = function(){};
    lodop.SET_PRINT_STYLEA = function(){};
    lodop.NewPage = function(){};
    lodop.PREVIEW = function(){
      if( parent.FK !== undefined ){
        parent.FK.Message.Show({text: '请先安装打印控件',type: "war",timeout: 3000});
      }
    };
  }
}
