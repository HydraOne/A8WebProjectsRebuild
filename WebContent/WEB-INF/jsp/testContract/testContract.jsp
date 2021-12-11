	<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/common/common.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<style>
a {
	color: black
}

a:hover {
	color: blue
}

.aclick {
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	width: 75%;
}
.aclickTwo {
	cursor: pointer;
	font-size: 14px;
	font-weight: normal;
	width: 75%;
}
</style>
</head>
<body class="body-pading" leftmargin="0" topmargin="" marginwidth="0"
	marginheight="0">
	<div id='layout'>
		<table id="leaderLnstructionsTable" width="100%"
			style="border-collapse: separate; border-spacing: 0px 15px;">
		</table>
	</div>
	
	<script type="text/javascript">
	$(function(){
		getSectionList();
	});
	var isRequst = true;
	var isRequstTwo = true;
	/* 栏目 */
	function getSectionList(){
		$.ajax({
			url:"/seeyon/ContractSupervisionColumnController.do?method=getColumnFormData&regulatoryContract=5",
			dataType:"json",
			async:true,
			type:"POST",
			success:function(object){
				if(object!=null&&object!==""){
					var html = "";
					html += "<tr><th style='font-size: 12px;'>"+ "经办人" +"</th>"+
					"<th style='font-size: 12px'>"+ "经办部门" +"</th>"+
					"<th style='font-size: 12px'>"+ "申请日期" +"</th>"+
					"<th style='font-size: 12px'>"+ "合同编号" +"</th>"+
					"<th style='font-size: 12px'>"+ "单点登录url" +"</th></tr>";
					 for(var i = 0; i < object.length; i++){
						html += "<tr><td style='font-size: 12px'>"+ object[i].field0001 +"</td>"+
						"<td style='font-size: 12px'>"+ object[i].field0002 +"</td>"+
						"<td style='font-size: 12px'>"+ object[i].field0003 +"</td>"+
						"<td style='font-size: 12px'>"+ object[i].field0004 +"</td>"+
						"<td style='font-size: 12px'>";
						if(object[i].field0036!=""){
							html += "<a href='"+ object[i].field0036 +"' target='view_window'>"+ object[i].field0036 +"</a></td></tr>";
						}
					 }
					 $("#leaderLnstructionsTable").html(html);
				}
			}
		});
		if (isRequst) {
	        isRequst = false;
	        window.setInterval("getSectionList()", 5000);
	    }
	}
	</script>
</body>
</html>