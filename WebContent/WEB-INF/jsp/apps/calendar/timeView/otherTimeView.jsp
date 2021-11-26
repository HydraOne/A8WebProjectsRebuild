<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ include file="/WEB-INF/jsp/common/common.jsp"%>
<html class="h100b w100b">
<head>
    <title>${ctp:toHTML(pageTitle)}</title>
    <link rel='stylesheet' type='text/css' href='${path}/common/dhtmlxscheduler/dhtmlxscheduler_material.css${ctp:resSuffix()}' charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="${path}/apps_res/timeView/css/timeViewCommon.css${ctp:resSuffix()}"/>
	<style type="text/css" >
		.leader_section_infos { margin: 0px; /* overflow: hidden; */width:100%; height: 100%;cursor: pointer !important;  }
		.leader_section_photo { width: 42px; height: 42px;position: relative;top: 50%;margin-top: -21px;vertical-align:middle;left: 18px;display: inline-block; float: left; border-radius: 50.0%; overflow: hidden; }
		.leader_section_photo img { width: 100%; height: 100%; }
		.leader_section_content { position: relative;top: 50%;margin-left: 20px;margin-top: -26px;display: inline-block; /* float: left; */text-align: left; width: 100px !important;vertical-align:middle; }
		.leader_section_content .content_top { height: 26px; line-height: 26px; float:left;text-align: left !important;width: 100%;}
		.leader_section_content .content_top span, .content_bottom span { width:100%;display: inline-block;overflow: hidden; text-overflow: ellipsis;-o-text-overflow: ellipsis;white-space:nowrap; }
		.leader_section_content .content_bottom { height: 26px; line-height: 26px; float: left; width: 100%; overflow: hidden; text-overflow: ellipsis;-o-text-overflow: ellipsis;white-space:nowrap;}
		.leader_section_content.leader_name { width:42px;height:20px;font-size:20px !important;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;line-height:20px;color:#666666!important; }
		.leader_section_content.leader_role { width:111px;height:17px;font-size:17px !important;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#666666 !important;line-height:17px;}
    </style>
</head>

<body clss="h100 w100" style="min-width: 960px;overflow-x:auto;">
	<input type="hidden" id="viewType" value="${ctp:toHTML(viewType)}">   
	<input type="hidden" id="sourceType" value="${ctp:toHTML(sourceType)}">
	<input type="hidden" id="memberIds" value="${ctp:toHTML(memberIds)}">
	<div id ="kanbanNameDIV"></div>
	<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:1297px;min-width: 960px;'>

		<div class="dhx_cal_navline">
			<div class="dhx_cal_dateContainer">
				<span class="page-prev" onclick="otherTimeView.changePreView()">
					<em class="ico24 arrow_l_24"></em>
				</span>
				<div class="dhx_cal_date" style="left:76px;"></div>
				<span class="page-next" onclick="otherTimeView.changeNextView()">
					<em class="ico24 arrow_r_24"></em>
				</span>
			</div>
			<div id="changeViewDom"></div>
			<div id="changeViewDomNow" style="left: 115px;" >${ctp:i18n("common.this.day.label") }</div>
			    <div id="viewDom" style="position: absolute;right: 120px;top:16px;padding-top:10px;width:16%;height:30px;display: inline-block;">
					<select class="comp comp_select" comp="type:'CtpUiMultiSelect',search:false" id="selMulti">
						<c:if test="${ctp:hasPlugin('leaderagenda')}"><option value="94">${ctp:i18n("timeview.title.agenda") }</option></c:if>
					    <c:if test="${ctp:hasPlugin('meeting')}"><option value="3">${ctp:i18n("timeview.title.meeting") }</option></c:if>
					    <c:if test="${ctp:hasPlugin('plan')}"><option value="1">${ctp:i18n("timeview.title.plan") }</option></c:if>
					    <c:if test="${ctp:hasPlugin('taskmanage')}"><option value="2">${ctp:i18n("timeview.title.task") }</option></c:if>
					    <c:if test="${ctp:hasPlugin('calendar')}"><option value="4">${ctp:i18n("timeview.title.event") }</option></c:if>
						<%--时间视图   李丹 2020 9 *******************************************start**********************--%>
						<c:if test="${register}"><option value="55">付款</option></c:if>
						<%--时间视图   李丹 2020 9 *******************************************end**********************--%>
					</select>
				</div>
            <%-- 时间视图显示，致信端不显示--%>
            <c:if test="${sourceType != 4}">
            	<div id="newMeneuSel" class="comp" comp="type:'CtpUiDropdown',panelTop:'12',width:'120',panelLeft:'63',options:${ctp:toHTML(newBtnList)}"
            			 style="border-radius:3px;position: absolute;line-height:30px;right: 15px;top: 16px;height:30px;text-align:center;padding-left:20px;padding-right:22px;background-color: #1F85EC;color: #ffffff;">
            		<span>${ctp:i18n("timeview.button.new_create") }</span>
            		<em class="syIcon sy-arrow-plane-down" style="font-size: 10px;padding-left:6px;"></em>
            	</div>
            </c:if>
		</div>
		<div class="dhx_cal_header"></div>
		<div class="dhx_cal_data"></div>
		<div id="schedulerEventBTN">
			<c:if test="${ctp:hasPlugin('leaderagenda')  && newAgendaAuth}">
				<a href="javascript:void(0)" class="common_button schedulerCommon_button schedulerEventBTNStyle radius3px" onclick="otherTimeView.newLeaderAgenda()">${ctp:i18n("timeview.oprates.create.new_agenda") }</a>
			</c:if>
			<c:if test="${ctp:hasPlugin('meeting')  && hasNewMeetingAuth}">
				<a href="javascript:void(0)" class="common_button schedulerCommon_button schedulerEventBTNStyle radius3px" onclick="otherTimeView.newMeeting()">${ctp:i18n("timeview.oprates.create.new_meeting") }</a>
			</c:if>
			<c:if test="${ctp:hasPlugin('plan')  && hasNewPlanAuth}">
				<a href="javascript:void(0)" class="common_button schedulerCommon_button schedulerEventBTNStyle radius3px" onclick="otherTimeView.newPlan()">${ctp:i18n("timeview.oprates.create.new_plan") }</a>
			</c:if>
			<c:if test="${ctp:hasPlugin('taskmanage')  && hasNewTaskAuth}">
				<a href="javascript:void(0)" class="common_button schedulerCommon_button schedulerEventBTNStyle radius3px" onclick="otherTimeView.newTask()">${ctp:i18n("timeview.oprates.create.new_task") }</a>
			</c:if>
			<c:if test="${ctp:hasPlugin('calendar')  && hasNewEventAuth}">
				<a href="javascript:void(0)" class="common_button schedulerCommon_button schedulerEventBTNStyle radius3px" onclick="otherTimeView.newCalEvent()">${ctp:i18n("timeview.oprates.create.new_event") }</a>
			</c:if>
		</div>
		<div id="schedulerEventRemove" onclick="otherTimeView.removeEventById()"></div>
		<div id="schedulerEventTips"></div>
	</div>
	
	<!-- dhtmlscheduler组件相关JS -->
	<script src="${path}/common/dhtmlxscheduler/dhtmlxscheduler.js${ctp:resSuffix()}" type="text/javascript" charset="utf-8"></script>
	<script src="${path}/common/dhtmlxscheduler/locale/locale_<%=locale %>.js${ctp:resSuffix()}" type="text/javascript" charset="utf-8"></script>
	<script src="${path}/common/dhtmlxscheduler/ext/dhtmlxscheduler_tooltip.js${ctp:resSuffix()}" type="text/javascript"></script>
	<script src="${path}/common/dhtmlxscheduler/ext/dhtmlxscheduler_timeline.js${ctp:resSuffix()}" type="text/javascript"></script>
	<script src="${path}/common/dhtmlxscheduler/ext/dhtmlxscheduler_api.js${ctp:resSuffix()}" type="text/javascript" charset="utf-8"></script>
	<script src="${path }/common/js/laytpl.js${ctp:resSuffix()}" type="text/javascript"></script>
	
	<!-- 业务相关JS -->
	<script type="text/javascript" src="${path}/apps_res/calendar/js/calEvent_Create_addData_js.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/calendar/js/showTimeLineData.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/calendar/js/calEvent_Create_js.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/taskmanage/js/detail/taskDetailDialog-debug.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/taskmanage/js/taskInfo-api-debug.js${ctp:resSuffix()}"></script>
    <script type="text/javascript" charset="UTF-8" src="${path}/apps_res/leaderagenda/js/agenda_api_debug.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/timeView/js/timeViewCommon.js${ctp:resSuffix()}"></script>
	<script type="text/javascript" src="${path}/apps_res/timeView/js/otherTimeView.js${ctp:resSuffix()}"></script>
	
	<%--头像HTML模版--%>
	<script type="text/html" id="leader_head_tpl">
		<div class="leader_section_infos dhx_scell_nameStyle1 dhx_scell_nameStyleHoverNone" color="{{d.color}}" textColor="{{d.textColor}}" memberId="{{d.key}}" memberName="{{d.label}}" onclick="otherTimeView.showEvnetsByMember(this)">
	  		<span class="leader_section_photo"> 
				{{# if(d.leaderHeadUrl && d.leaderHeadUrl !=-1){ }}
					<img src={{d.leaderHeadUrl}}></img>
				{{# }else{ }}
		 			<img src="${path}/apps_res/v3xmain/images/personal/user-5.gif">
				{{# } }}
	  		</span>
	  		<div class="leader_section_content">
					<div class="content_top" style="text-align: left !important;">
						<span class="leader_name" title="{{d.label}}">{{d.label}}</span>
					</div>
			 		<div class="content_bottom" style="word-wrap: normal;text-align: left !important;font-size:12px !important;color:#666666 !important;">
						<span class="leader_role" title="{{d.role}}">{{d.role}}</span>
			 		</div>
	   		</div>
		</div>
	</script>
	
	<!-- 无行程信息页面提示 -->
	<script type="text/html" id="leader_no_data_tpl">
		<div class="leader-no-data-style">
            <div class="leader_no_data_image"></div>
			<div class="leader-no-data-content">
                <p>${ctp:i18n('timeview.othermember.info.nomember')},<a onclick="otherTimeView.selectRelaMember()">${ctp:i18n('timeview.othermember.info.nomember1')}</a></p>
			</div>
		</div>
	</script>


    <!-- 未勾选行程信息页面提示 -->
    <script type="text/html" id="leader_no_select_tpl">
        <div class="leader-no-data-style">
            <div class="leader_no_data_image"></div>
            <div class="leader-no-data-content">
                <p>${ctp:i18n('timeview.othermemner.info.noselect')}</p>
            </div>
        </div>
    </script>
	
	<!-- 入口 -->
	<script type="text/javascript">
	    var serverTimeStamp = "${ctp:escapeJavascript(serverTimeStamp)}";
	    var defaultOptions = "${ctp:escapeJavascript(defaultOptions)}";
	    $(document).ready(function(){
	    	otherTimeView.initParam();
	        otherTimeView.initData();
	    });
	</script>

</body>
</html>