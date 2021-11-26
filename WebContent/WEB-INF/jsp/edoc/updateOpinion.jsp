<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
 <html>
 <head>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
<title>意见修改</title>
</head>
<body onload="load()">
<div>
<form>
<table >
<tr>
<p align="left" style="font-weight:bold;">意见：</p>
<td><textarea  id="opinion" type="text" name="opinion" style="height: 100px;width: 360px"></textarea>
</td>
</table>
</form>
</div>
<script>
function load(){
	var oo = window.parentDialogObj["url"];
	var opinion = oo.getTransParams();
	document.getElementById('opinion').innerText = opinion.opinion;
}
 function OK(){
	 var oo = document.getElementById('opinion');
	if(oo.value!=""){
     var info={"opinion":oo.value};
     return info;
	}else{
	    alert("请输入意见!");
	} 
 }
 </script>
 </body>
 </html> 