<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/common/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>查看意见</title>
</head>
<script type="text/javascript" src="${path}/ajax.do?managerName=opinionListManager1"></script>
<script type="text/javascript">


var grid;
var searchobj;
$(document).ready(function() {
	new MxtLayout({
		'id' : 'layout',
		'northArea' : {
			'id' : 'north',
			'height' : 30,
			'sprit' : false,
			'border' : false
		},
		'centerArea' : {
			'id' : 'center',
			'border' : false,
			'minHeight' : 20
		}
	});
	/*动态设置高度 start*/
	var o = document.getElementById("center");
	var centerHeight = o.clientHeight||o.offsetHeight;
	var northDoc = document.getElementById("north");
	var northHeight = northDoc.clientHeight||northDoc.offsetHeight;
	var tableHeight=centerHeight-northHeight;
	/*动态设置高度 end*/
	grid = $('#purchPlanList').ajaxgrid({		
		colModel : [  {
        display : 'id',
        name : 'id',
        width : '40',
        sortable : false,
        align : 'center',
        type : 'checkbox',
		isToggleHideShow:false
      }, {
        display : '公文文号',
        name : 'docMark',
        width : '180',
        sortable : false,
        align : 'left',
		isToggleHideShow:false
      }, {
        display : '标题',
        name : 'subject',
        width : '270',
        sortable : false,
        align : 'left',
		isToggleHideShow:false
      },{
        display : '审批人',
        name : 'check',
        width : '110',
        sortable : false,
        align : 'left',
		isToggleHideShow:false
      }, {
          display : '时间',
          name : 'createTime',
          width : '170',
          sortable : false,
          align : 'left',
  		isToggleHideShow:false
      },{
        display : '意见',
        name : 'opinion',
        width : '490',
        sortable : false,
        align : 'left',
		isToggleHideShow:false
      }, {
          display : '发起人',
          name : 'createPerson',
          width : '110',
          sortable : false,
          align : 'left',
  		isToggleHideShow:false
        } ],
		//dblclick : clickRow,
		height : tableHeight,
		customize:false,
		managerName : "opinionListManager1",
		managerMethod : "opinionList",
		click:clk,
		render : rend
	});
	function clk(row,colIndex,rowIndex){
	}	
	var searchobj = $.searchCondition({
        top:7,
        right:10,
        searchHandler: function(){
        	 var o = new Object();
        	 o.recrodType="bj";
        	 var choose = $('#'+searchobj.p.id).find("option:selected").val();
		    var ssss = searchobj.g.getReturnValue();
        	 if(choose ==='subject'){
	                o.subject = $('#subject').val();
	          }
        	 else  if(choose ==='createPerson'){
	                o.createPerson = $('#createPerson').val();
	          }
        	 else if(choose ==='docMark'){
	                o.docMark = $('#docMark').val();
	          }
        	 else if(choose ==='attribute'){
	                o.attribute = $('#attribute').val();
	          } 
             else if(ssss.type ==='datemulti'){
	                o.datetime = ssss.value;
	          } 		
			  var val = searchobj.g.getReturnValue();		   
			  if(val !== null){
	              $("#purchPlanList").ajaxgridLoad(o);
	           }
        },
        conditions: [
		{
            id: 'subject',//查询条件生成input/select/data的id
            name: 'subject',//查询条件生成input/select/data的name
            type: 'input',//类型: [input:输入框] [select:下拉选择] [datemulti:时间段]
            text: '标题',//查询条件名称
            value: 'subject'//查询条件value
        }, {
            id: 'createPerson',
            name: 'createPerson',
            type: 'input',
            text: '发起人',
            value: 'createPerson'
        },{
            id: 'docMark',
            name: 'docMark',
            type: 'input',
            text: '公文文号',
            value: 'docMark',
        },{
            id: 'datetime',
            name: 'datetime',
            type: 'datemulti',
            text: '发起时间',
            value: 'createDate',
            dateTime: true
        }]
    });
});
function rend(txt, data, r, c, col) {
    if(col.name=="opinionType"){
	    var type = data.opinionType;
		var opinion = data.opinion;
		if(opinion==null){
		    opinion="";
		}
		if(type!=null){
		    if(type==2){
			    return "<strong>[同意]</strong>";
			}
			if(type==3){
			    return "<strong>[不同意]</strong>";
			}
		}
	}
	if(col.name=="opinion"){
		var opinion = data.opinion;
		if(opinion==null){
		    opinion="";
		}
			return "<strong>"+opinion+"</strong>";
    }
	return txt;
}
$("#purchPlanList").ajaxgridLoad();
</script>
<script>
function updateOpinion(){
	var low = grid.grid.getSelectRows();
	var id = '';
	var opinion = "";
	if(low.length==1){
	$.each(low,function(){
         id = this.id;
         opinion = this.opinion;
         });
	showMessageBox0(id,opinion);
	}else {
		var error = $.error("请选择1个意见进行修改!");
	}
};
function showMessageBox0(id,opinion) {
    dialog = $.dialog({
        id: 'url',
        url: '/seeyon/opinionController1.do?method=updateOpinionDataPage',
        width: 400,
        height: 250,
        title: '修改意见',
        transParams:{opinion:opinion},
        checkMax:true,
    closeParam:{
        'show':true,
        autoClose:false,
        handler:function(){
        //var d = dialog.getClose();
        }
    },
    buttons: [{
        text: "确定",
        handler: function () {
        //dialog.startLoading()
        var oo = dialog.getReturnValue();
		var opinion = oo.opinion;
    $.ajax({
        type: "post",
        url: "/seeyon/opinionController1.do?method=updateOpinionData",
        data: {
            'id':id,'opinion':opinion
        },
        dataType: "json",
        success: function(data){
			if(data.message==0){
				 var infor = $.infor("修改成功!");
				 $("#purchPlanList").ajaxgridLoad();
			}
			if(data.message==1){
				 var error = $.error("修改失败!");
			}
			dialog.close();
        }
    });
        }
     }, {
        text: "取消",
        handler: function () {
        dialog.endLoading()
        dialog.close();
        }
        }]
    });
}
</script>
<body>	

	<div id='layout'>
		<div class="layout_north f0f0f0" id="north" style="padding-bottom:10px">
		<a id="btnmodify" class="common_button common_button_gray" href="javascript:updateOpinion()" style="margin-top:5px">${ctp:i18n('common.button.modify.label')}</a>
	    <div class="comp" comp="type:'breadcrumb',comptype:'location',code:'F07_findOpinion'"></div>
		    <table width="100%" border="0" cellpadding="0" cellspacing="0">
		    	<tr>
		    		<td>
		    			<div style="padding-bottom:35px;">
		    				<div id="toolbars"></div>
		    			</div>
		    		</td>
		    		<td width="60" align="center" valign="center">
		    		</td>
		    	</tr>
		    </table>
	    </div>				
		<div class="layout_center over_hidden" id="center" style="margin-top:10px">
			<table class="flexme3 " id="purchPlanList"></table>
			<div id="grid_detail" class="h100b">
				<iframe id="summary" width="100%" height="100%" frameborder="0" class='calendar_show_iframe' style="overflow-y:hidden"></iframe>
			</div>
		</div>
	</div>
	<input type="hidden" id="hy" value="hy"/>
	<script type="text/javascript">
	      $(function(){
	    	  $('.common_button').trigger("click");
	      });
	</script>
</body>
</html>
