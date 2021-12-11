<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
		$(function() {
			getSectionList();
		});
		var isRequst = true;
		var isRequstTwo = true;
		/* 栏目 */
		function getSectionList() {
			$
					.ajax({
						url : "/seeyon/regulatoryContractController.do?method=getColumnFormDate&regulatoryContract=5",
						dataType : "json",
						async : true,
						type : "POST",
						success : function(object) {
							if (object != null && object !== "") {
								var html = "";
								 html += "<tr>" + "<td style='font-size: 12px'>"
										+ "经办人" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "经办部门" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "申请日期" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "合同编号" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "合同名称" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "合同金额" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "累计已付金额" + "</td>"
										+ "<td style='font-size: 12px'>"
										+ "单点登录url" + "</td>" + "</tr>"; 
								

								for (var i = 0; i < object.length; i++) {
 									 html += "<tr>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].agentMan == undefined ? ""
 													: object[i].agentMan)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].agentDept == undefined ? ""
 													: object[i].agentDept)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].applyDate == undefined ? ""
													: object[i].applyDate)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].contractNo == undefined ? ""
													: object[i].contractNo)
 											+ "</td>"
											+ "<td style='font-size: 12px'>"
 											+ (object[i].contractName == undefined ? ""
 													: object[i].contractName)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].contractMoney == undefined ? ""
 													: object[i].contractMoney)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"
 											+ (object[i].cumulativeMoney == undefined ? ""
													: object[i].cumulativeMoney)
 											+ "</td>"
 											+ "<td style='font-size: 12px'>"; 
 									 if (object[i].ssoSignInUrl != "") {
 										html += "<a href='"+ object[i].ssoSignInUrl +"' target='view_window'>"
 												+ "跳转" + "</a></td></tr>";
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