/*----------------------------------------------------------------------------\
|                                Cross Panel 1.0                              |
|-----------------------------------------------------------------------------|
|                       Created by Tanmf (tanmf@seeyon.com)                   |
|                    For UFIDA-Seeyon (http://www.seeyon.com/)                |
|-----------------------------------------------------------------------------|
| A utility will be used for selected people(Member,Department,Team,Post,     |
| Levle,Organization,Special rules etc.).                                     |
|-----------------------------------------------------------------------------|
|                            Copyright (c) 2006 Tanmf                         |
|-----------------------------------------------------------------------------|
| Dependencies:                                                               |
|-----------------------------------------------------------------------------|
| 2006-05-27 | Original Version Posted.                                       |
| 2006-06-06 | Added expanding the current user's department or the given     |
|            | department trees when initiate department-tree.                |
| 2006-06-08 | Extends single select-people mode.                             |
| 2006-06-08 | Support to other Web-Browsers, e.g: Firefox,Opera etc,         |
|            | according as W3C Standard.                                     |
| 2006-09-29 | 支持显示所有面板以及选择所有类型的参数                                |
|-----------------------------------------------------------------------------|
| 主窗口可配置的参数：                                                            |
| 1. elements_${id}               Element[]    原有数据，默认为null              |
| 2. showOriginalElement_${id}    true|false   是否回显原有数据，默认为true       |
| 3. hiddenSaveAsTeam_${id}       true|false   是否隐藏“另存为组”，默认为false    |
| 4. hiddenMultipleRadio_${id}    true|false   是否隐藏“多层”按钮，默认为false    |
| 5. excludeElements_${id}        Element[]    不在被选框中显示  默认为null       |
| 6. isNeedCheckLevelScope_${id}  true|false   是否进行职务级别范围验证  默认true  |
| 7. onlyLoginAccount_${id}       true|false   是否只显示登录单位  默认false       |
| 8. showAccountShortname_${id}   yes|no|auto  是否只一直显示登录简称  默认auto    |
| 9. showConcurrentMember_${id}   true|false   是否显示兼职人员（只外单位）  true  |
| 9. showSecondMember_${id}       true|false   是否显示副岗人员（只外单位）  true  |
|10. hiddenPostOfDepartment_${id} true|false   是否隐藏部门下的岗位 默认false     |
|11. hiddenRoleOfDepartment_${id} true|false   是否隐藏部门下的角色 默认false     |
     hiddenMetadataOfDepartment_${id} true|false   是否隐藏部门下的人员属性 默认false     |
|12. onlyCurrentDepartment_${id}  true|false   是否仅显示当前部门 默认false       |
|13. showDeptPanelOfOutworker_${id} true|false 当是外部人员时，显示部门面板 默认false|
|14. unallowedSelectEmptyGroup_${id} true|false不允许选择空的组、部门, 默认false   |
|15. showTeamType_${id}            "1,2,3"     需要显示的组类型1-个人,2-系统,3-项目, 默认null，表示所有|
|16. hiddenOtherMemberOfTeam_${id} true|false  是否隐藏组下的外单人员(兼职保留)，默认false   |
|17. hiddenAccountIds_${id}        "1,2,3"     隐藏的单位，将不在单位下拉中出现           |
     showAccountIds_${id}          "1,2,3"     显示的单位，将在单位下拉中出现           |
|18. isCanSelectGroupAccount_${id} true|false  是否可以选择集团单位，默认true      |
|19. showAllOuterDepartment_${id}  true|false  是否显示所有的外部部门，默认false   |
|20. hiddenRootAccount_${id}       true|false   是否隐藏集团单位，默认false        |
|21. hiddenGroupLevel_${id}        true|false    是否隐藏集团职务级别，默认false   |
|22. showDepartmentsOfTree_${id}   "部门Id,"    部门树上可以显示的部门                                    |
|23. showRelativeRole_${id}        true|false  显示流程相对角色，默认false         |
|24. showFixedRole_${id}           true|false  显示特定角色，默认false             |
|    showRoleType                  Account|Department  角色页签下显示什么类型的角色，默认显示所有，可以单独设置显示单位角色还是部门角色           |
|25. hiddenAddExternalAccount_${id} true|false  显示增加外部单位连接，默认false     |
|26. showDepartmentMember4Search_${id} true|false  部门查询可用时，是否显示部门下面的成员，默认false，不显示                              |
|27. isAllowContainsChildDept_${id} true|false 在部门面板选择部门时，是否允许同时选择父部门和子部门，默认为false，不允许|
|28. isConfirmExcludeSubDepartment_${id} true|false 选择部门时，是否提示“是否包含子部门”，默认false即包含子部门                       |
|29. returnValueNeedType_${id}      true|false 返回值是否需要带类型，默认true，如果false则只返回Id，只用于单一选择               |
|30. includeElements_${id}         Element[]   备选的数据范围                                               |
|31. showAdminTypes_${id}          "SystemAdmin,AuditAdmin,GroupAdmin,AccountAdministrator,AccountAdministrator_-81232345"   需要显示的管理员,如果不指定，表示显示所有|
|32. extParameters_${id}           文本           用于后台页签显示的扩展参数,通过(String)AppContext.gettThreadContext("extParameters")获取  |
|33. isCheckInclusionRelations     true|false  是否检查已选数据的包含关系，默认true |
|34. hiddenFormFieldRole           true|false  是否隐藏表单控件下的角色，默认false |
|35. isNotShowNoMemberConfirm      true|false 是否不显示“xxx部门下无人，是否继续选择”的提示语，默认false，即显示。
|36. isNotCheckDuplicateData       true|false 是否不检查重复数据，默认false，即检查。
|37. showRecent_${id}              true|false 是否显示最近页签，默认为true，即显示。
|38. notShowAccountRole            true|false （相对角色，表单控件下） 是否显示单位角色，默认按照集团管理员勾选‘选人界面’的设置来。
|    notShowMetadataRole           true|false （相对角色，表单控件下） 是否显示主数据下的角色。
|39. showExternalType              1:外部机构 2:外部单位 默认为null  都显示
|40. onlyShowChildrenAccount       true|false 是否只显示子单位  默认false 都显示（切换单位和单位树 ）
|41. alwaysShowPanels              始终显示的页签，不受切换单位时隐藏某些页签的限制（hiddenOnChanageAccount）
|42. unallowedChangeBusinessAccount         true|false   不允许切换业务线，  默认false       |
|43. currentBusinessAccount_${id}        默认显示的业务线      |
|44. returnMemberWithDept_${id}    true|false 返回人员信息是否包含部门岗位信息（在哪个部门下选到的，部门信息就是哪个部门，同一个人在不同部门下可以同时选择）      | 返回的数据格式为：Member|部门id#人员id#岗位id
|45. allowSeachGroup               true|false 是否允许全集团查询人员，缺省允许 true.
|46. isShowCheckboxIntree          true|false 是否展示的树，允许复选框勾选，缺省不允许 false.单位树不受此开关控制。
|47. showAllAccount          	   true|false 是否展示所有单位，缺省不允许 false.
|48. excludeElementsBeyondMemberSize_${id}         Element[] eg:Department|100,Post|200   指定类型的元素，该元素下的人员超过指定大小后，不允许选择  默认为null       |
|49. alwaysShowBusiness_{ids}      总是显示的多维组织的id
|50. memberWithDeptInfo 人员返回部门信息 @since v80.0sp2 add by shuqi
|51. orgMetadataTagTypes 主数据显示支持类型,默认"Account,Department,Post,Member" @since v80.0sp2  add by shuqi
|-----------------------------------------------------------------------------|
| 关键方法：                                                                    |
| 1. getSelectedPeoples() 点击确认按钮，返回数据                                  |
| 2. searchItems() 搜索                                                        |
| 3. preReturnValueFun_${Element[]} [false, message] 点击"确定"按钮前的回调函数   |
| 4. initOriginalData 数据回填  |
|-----------------------------------------------------------------------------|
| Created 2006-05-27 | All changes are in the log above. | Updated 2010-04-28 |
\----------------------------------------------------------------------------*/

var select2_tag_prefix_fullWin = '<select id="memberDataBody" ondblclick="selectOneMember(this)" onchange="listenermemberDataBody(this)" multiple="multiple" style="padding-top: 1px;overflow:auto; width:100%;height:100%">';
var select2_tag_prefix = '<select id="memberDataBody" ondblclick="selectOneMember(this)" onchange="listenermemberDataBody(this)" multiple="multiple" style="border:none; padding-top: 1px;overflow:auto; width:368px; height:170px">';
var select2_tag_orgTeam_prefix = '<select id="memberDataBody" disabled="disabled"  multiple="multiple" style="border:none; padding-top: 1px;overflow:auto; width:363px; height:190px">';
var select2_tag_subfix = "</select>";
var selectTeam2_tag_prefix = '<select id="memberDataBody" multiple="multiple" style="border:none; padding-top: 1px;overflow:auto; width:100%; height:190px">';
//div展示人员select
var memberDataBody_div = '<div class="div-select" id="memberDataBody">';
//组div展示
var teamMemberDataBody_div = '<div class="div-select" id="memberDataBody">';
//div后缀
var memberDataBody_div_end = '</div>';
var temp_Div = null;

var pageSize = 20;//首次加载的条数，如果需要显示全部，可以点击‘加载全部’。数据量太大，ie下渲染太慢。
var pagingList1Param = new Properties();//分页需要的数据参数
var pagingList2Param = new Properties();//分页需要的数据参数

//~ 固定角色，诸如：AccountManager AccountAdmin account_exchange account_edoccreate FormAdmin HrAdmin ProjectBuild DepManager DepAdmin department_exchange
var FixedRoles = new ArrayList();
{
	FixedRoles.add("DepManager");
	FixedRoles.add("DepLeader");
}

var ua = navigator.userAgent;
var browserIsMSIE = (navigator.appName == "Microsoft Internet Explorer") || ua.indexOf('Trident')!=-1;
var browserIsEDGE = ua.indexOf('Edge') != -1;


var topWindow1 = topWindow;
var topWindow = window;

var selectedPeopleElements = new Properties();
//新增机构组部门是否重复校验
var orgTeamDepartment = new Properties();
//~ 选人的标示
var spId = null;

//~ 最大选择数， -1表示没有限制
var maxSize = -1;

//~ 最小选择数， -1表示没有限制
var minSize = -1;

//~ List1当前选择的对象
var nowSelectedList1Item = null;

//~ 区域12的开关状态
var area12Status = "M"; //M-居中、T-在上面、B-在下面

//~ Tree模型
var tree = null;

//~ 是否显示到子部门，当参数departmentId不为空时
var treeInMyDepart = false;

//~ 当前被选择的内容项
var tempNowSelected = new ArrayList();

//~ 当前显示的Panel
var tempNowPanel = null;

//~ 是否显示最近联系人页签，默认true显示，false不显示
var showRecent = true;

//~ 当前显示的单位
var currentAccount = null;

//~ 当前单位的职务级别范围
var currentAccountLevelScope = -1;

//~ 当前显示的单位Id
var currentAccountId = null;

//~ 当前登录者的Id
var currentMemberId = null;

//~ 当前登录者
var currentMember = null;

//~ 当前登录者的职务级别数
var currentMemberLevelSortId = null;

//~ 是否现实兼职人员（只外单位）
var showConcurrentMember = true;
var showSecondMember     = true;

var onlyCurrentDepartment = false;

//~ 是否只显示当前登录部门的人员
var onlyLoginAccount = false;

//~ 是否显示所有的外部部门，默认false(按照自己的访问权限来)
var showAllOuterDepartmentFlag = false;

//~ 需要显示的组的类型：1-个人,2-系统,3-项目，默认null，表示所有
var showTeamType = null;

var selectableTableRows = null;

var Constants_ShowMode_TREE = "TREE";//数据对象中必须有parentId字段
var Constants_ShowMode_LIST = "LIST";

var extParameters = null;

/**
 * list1的大小
 */
var Constants_List1_size = {
	showMember : 168, //显示人员
	showMember_1 : 194, //显示人员
	noShowMember : 410 //不显示人员
};

//~ 名字最多显示的字节数
var nameMaxLength = {
	two   : [22], //2列
	three : [16, 18]  //3列
};

//~ 名字与后面的补充信息之间的空格数
var nameMaxSpace = 2;

var NameSpace = { };
for(var x = 0; x < 40; x++){
	var s = "";
	for(var y = 0; y < x; y++){
		s += " ";
	}
	NameSpace[x] = s;
}
function getNameSpace(x){
	if(x>=39){
		x = 39;
	}
	if(x<=0){
		x = 0;
	}
	return NameSpace[x];
}


//~ 连接多种实体的显示
var arrayJoinSep = "-";

//~ 连接多种实体的id
var valuesJoinSep = "_";

//~ 只连接多种实体value的id，如部门下的人员：deptId#memberId
var valuesJoinSep2 = "#";

//~ 不在选人被选区域显示的数据 type + id
var excludeElements = new ArrayList();
var excludeElementsBeyondMemberSize = {};

//~ 只在选人被选区域显示的数据 type + id ; null表示没有配置
var includeElements = null;

//~ 是否需要检测职务级别范围，默认true
var isNeedCheckLevelScope = true;

//~ 集团的职务级别 : key-level.id  value-index
var groupLevels = {};

//vjoin显示的部门类型（外部机构/外部单位）
var showExternalType = null;

var onlyShowChildrenAccount = null;

/*****************
 * 一下对象将在页面中重新赋值
 */
var panels = new ArrayList(); //当前需要显示的面板

var selectTypes = new ArrayList(); //当前可以选择的类型

var ShowMe       = true;
var SelectType   = "";
var Panels       = "";

var accountId    = "";
var memberId     = "";
var departmentId = "";
var postId       = "";
var levelId      = "";


var currentArea2Type = Constants_Member;

/**
 * 面板对象,面板的显示名称 从Constants_Component中取
 *
 * @param type 面板类型 Constants_Department...
 * @param showMode 显示方式  tree || list
 * @param isShowMember 时候显示人员，如特殊角色不能显示人员
 * @param getMembersFun 获取其下面人员Member的方法，如 Department.prototype.getDirectMembers，只写getDirectMembers
 * @param getMembersFun 获取其直接子节点方法，只对true有效，如 Department.prototype.getDirectMembers，只写getDirectMembers
 * @param disabledAccountSelector 是否屏蔽单位切换按钮
 * @param hiddenOnChanageAccount 切换单位后是否隐藏面板
 * @param hiddenWhenRootAccount  选择集团后是否隐藏页签
 * @param searchArea 搜索区域，0-不搜索；1-Area1；2-Area2；12-Area1和Area2，默认0
 * @param singleLoad 是否允许单独页签加载（打开选人界面时，对应的页签不加载数据，点击页签或者是手动调用时才加载数据），默认false
 * @author tanmf
 */
function Panel(type, showMode, isShowMember, getMembersFun, getChildrenFun, disabledAccountSelector, hiddenOnChanageAccount, showQueryInputFun, searchArea, hiddenWhenRootAccount,singleLoad){
	this.type = type; //M/O/D/T/P/L/....
	this.showMode = showMode;
	this.isShowMember = isShowMember;
	this.getMembersFun = getMembersFun;
	this.getChildrenFun = getChildrenFun;
	this.disabledAccountSelector = disabledAccountSelector;
	this.hiddenOnChanageAccount = hiddenOnChanageAccount;
	this.showQueryInputFun = showQueryInputFun;
	this.searchArea = searchArea;
	this.hiddenWhenRootAccount = hiddenWhenRootAccount;
	this.singleLoad = singleLoad;
}
Panel.prototype.toString = function(){
	return this.type + "\t" + this.name + "\t" + this.showMode;
};

//~ 系统提供的面板，面板名称不允许用“All”
var Constants_FormField      = "FormField";
var Constants_Panels = new Properties();
Constants_Panels.put(Constants_Account, new Panel(Constants_Account, Constants_ShowMode_TREE, false, null, null, false, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_Department, new Panel(Constants_Department, Constants_ShowMode_TREE, true, "getDirectMembers", "getDirectChildren", false, false, "showQueryInputOfDepart", 3, true, false));
Constants_Panels.put(Constants_Team, new Panel(Constants_Team, Constants_ShowMode_LIST, true, null, null, false, false, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_Post, new Panel(Constants_Post, Constants_ShowMode_LIST, true, "getMembers", null, false, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_Level, new Panel(Constants_Level, Constants_ShowMode_LIST, true, "getMembers", null, false, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_Role, new Panel(Constants_Role, Constants_ShowMode_LIST, false, null, null, false, false, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_BusinessRole, new Panel(Constants_BusinessRole, Constants_ShowMode_LIST, false, null, null, false, false, "showQueryInput", 1, false, true));
Constants_Panels.put(Constants_Outworker, new Panel(Constants_Outworker, Constants_ShowMode_LIST, true, "getDirectMembers", null, false, true, "showQueryInputOfOutworker", 2, true, false));
Constants_Panels.put(Constants_ExchangeAccount, new Panel(Constants_ExchangeAccount, Constants_ShowMode_LIST, false, null, null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_OrgTeam, new Panel(Constants_OrgTeam, Constants_ShowMode_LIST, false, null, null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_RelatePeople, new Panel(Constants_RelatePeople, Constants_ShowMode_LIST, false, null, null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_FormField, new Panel(Constants_FormField, Constants_ShowMode_LIST, true, "getRoles", null, (canShowBusinessOrg == true) ? false : true, (canShowBusinessOrg == true) ? false : true, "showQueryInput", 1, (canShowBusinessOrg == true) ? false : true, false));
Constants_Panels.put(Constants_WFDynamicForm, new Panel(Constants_WFDynamicForm, Constants_ShowMode_LIST, true, "getRoles", null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_OfficeField, new Panel(Constants_OfficeField, Constants_ShowMode_LIST, true, "getRoles", null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_Admin, new Panel(Constants_Admin, Constants_ShowMode_LIST, false, null, null, true, true, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_Node, new Panel(Constants_Node, Constants_ShowMode_LIST, true, "getMembers", null, (canShowBusinessOrg == true) ? false : true, (canShowBusinessOrg == true) ? false : true, "showQueryInput", 1, (canShowBusinessOrg == true) ? false : true, false));
Constants_Panels.put(Constants_WfSuperNode, new Panel(Constants_WfSuperNode, Constants_ShowMode_LIST, false, null, null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_OrgRecent, new Panel(Constants_OrgRecent, Constants_ShowMode_LIST, false, "getMembers", null, true, true, "showQueryInput", 1, true, false));
Constants_Panels.put(Constants_JoinOrganization, new Panel(Constants_JoinOrganization, Constants_ShowMode_TREE, true, "getDirectMembers", "getDirectChildren", true, false, "showQueryInputOfDepart", 3, false, false));
Constants_Panels.put(Constants_JoinAccount, new Panel(Constants_JoinAccount, Constants_ShowMode_LIST, false, null, null, true, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_JoinAccountTag, new Panel(Constants_JoinAccountTag, Constants_ShowMode_TREE, false, null, "getDirectChildren", true, false, null, null, false, false));//暂时没地方用到
Constants_Panels.put(Constants_MemberMetadataTag, new Panel(Constants_MemberMetadataTag, Constants_ShowMode_TREE, false, null, "getDirectChildren", true, false, null, null, false, false));
Constants_Panels.put(Constants_OrgMetadataTag, new Panel(Constants_OrgMetadataTag, Constants_ShowMode_TREE, false, null, "getDirectChildren", false, false, null, null, false, false));
Constants_Panels.put(Constants_BusinessDepartment, new Panel(Constants_BusinessDepartment, Constants_ShowMode_TREE, true, "getDirectMembers", "getDirectChildren", false, false, "showQueryInputOfDepart", 3, false, true));
Constants_Panels.put(Constants_BusinessAccount, new Panel(Constants_BusinessAccount, Constants_ShowMode_LIST, false, null, null, false, false, "showQueryInput", 1, false, true));
Constants_Panels.put(Constants_JoinPost, new Panel(Constants_JoinPost, Constants_ShowMode_LIST, true, "getMembers", null, true, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_Guest, new Panel(Constants_Guest, Constants_ShowMode_LIST, true, null, null, false, false, "showQueryInput", 1, false, false));
Constants_Panels.put(Constants_AppProperty, new Panel(Constants_AppProperty, Constants_ShowMode_LIST, true, "getRoles", null, true, true, "showQueryInput", 1, false, false));

/**
 * 按照面板对象的某个属性查找面板
 *
 * @return 面板的Id
 */
function findPanelsByProperty(property, value){
	var result = new ArrayList();

	var ps = Constants_Panels.values();
	for(var i = 0; i < ps.size(); i++) {
		var p = ps.get(i);
		if(p[property] == value){
			result.add(p.type);
		}
	}

	return result;
}

//中间分隔区域
var Constants_separatorDIV = new ArrayList();
Constants_separatorDIV.add(Constants_Department);
Constants_separatorDIV.add(Constants_BusinessDepartment);
Constants_separatorDIV.add(Constants_Team);
Constants_separatorDIV.add(Constants_Post);

var searchAlt = {
	"Department_Member" : Constants_Component.get(Constants_Department) + "/" + Constants_Component.get(Constants_Member),
	"JoinOrganization_Member" : Constants_Component.get(Constants_JoinOrganization) + "/" + Constants_Component.get(Constants_Member),
	"RelatePeople" : Constants_Component.get(Constants_Member),
	"Post" : Constants_Component.get(Constants_Post),
	"Role" : Constants_Component.get(Constants_Role),
	"Member" : Constants_Component.get(Constants_Member),
	"Department_Post" : Constants_Component.get(Constants_Department) + "/" + Constants_Component.get(Constants_Post),
	"BusinessDepartment" :  Constants_Component.get(Constants_BusinessDepartment)  + Constants_Component.get(Constants_Department),
	"BusinessDepartment_Member" :  Constants_Component.get(Constants_BusinessDepartment)  + Constants_Component.get(Constants_Department)+ "/" + Constants_Component.get(Constants_Member),
	"BusinessRole" :  Constants_Component.get(Constants_BusinessRole),
	"" : ""
};

/**
 * 单位
 * @param id
 * @param name
 * @param levelScope
 * @param description
 */
function Account(id, parentId, path, name, hasChild, shortname, levelScope, description, externalType, memberSize,metadataIds){
	this.id = id;
	this.parentId = parentId;
	this.path = path;
	this.name = name;
	this.hasChild = hasChild;
	this.shortname = shortname;
	this.levelScope = levelScope;
	this.description = description;
	this.externalType = externalType;
	this.memberSize = memberSize;
	this.metadataIds = metadataIds;

	this.accessChildren = new ArrayList();
}

Account.prototype.toString = function(){
	return this.id + "\t" + this.name + "\t" + this.shortname + "\t" + this.levelScope;
};

//所有的单位
var allAccounts = new Properties();
//我能访问的单位
var accessableAccounts = new Properties();
var rootAccount = new Account();

//~ 我的能访问的单位 [id, superior]
var accessableAccountIds = new ArrayList();

var returnMemberWithDept = false;
/**
 * 返回的数据是否显示详细的人员信息，选择一个替换原来的，工作流岗位精准匹配需求
 * @type {boolean}
 */
var memberWithDeptInfo = false;

/*************************************************************************************************
 * 页面初始化
 */
window.onload = function(){
	var startTime = new Date().getTime();

	if(allAccounts.isEmpty()){ //没有单位
		var msg = $.i18n("selectPeople.alertNoAccount");
		document.getElementById("uploadingDiv").innerHTML = "<font color='red'>" + msg + "</font>";
		document.getElementById("processTR").style.display = "none";
		return;
	}

	if(getParentWindowData("hiddenSaveAsTeam") == true || !checkCanSelectMember()
		|| isAdministrator == true || groupAdmin == true || systemAdmin == true || maxSize == 1){
		var saveAsTeamDiv = document.getElementById("saveAsTeamDiv");
		if(saveAsTeamDiv){
			saveAsTeamDiv.style.display = "none";
		}
	}

	if (maxSize == 1) {
		var searchButtonArea = document.getElementById("searchButtonArea");
		if(searchButtonArea){
			searchButtonArea.style.display = "none";
		}

		var showWold = document.getElementById("showWold");
		if(showWold){
			showWold.style.display = "block";
		}
	}

	if(isAdministrator == true || groupAdmin == true || systemAdmin == true){ //管理员默认不限制
		isNeedCheckLevelScope = false;
	}
	else{
		if(getParentWindowData("isNeedCheckLevelScope") == false){
			isNeedCheckLevelScope = false;
		}
		else if(!checkCanSelectMember()){ //不能选人就进行验证了
			isNeedCheckLevelScope = false;
		}
	}

	if(getParentWindowData("hiddenGroupLevel")){
		Constants_Panels.get(Constants_Level).hiddenWhenRootAccount = true;
	}

	returnMemberWithDept = getParentWindowData("returnMemberWithDept",false);
	memberWithDeptInfo = getParentWindowData("memberWithDeptInfo",false);

	onlyLoginAccount = getParentWindowData("onlyLoginAccount") || false;
	showAllOuterDepartmentFlag = getParentWindowData("showAllOuterDepartment") || false;
	extParameters = getParentWindowData("extParameters", "");

	accountId    = getParentWindowData("accountId") || accountId;
	memberId     = getParentWindowData("memberId") || memberId;
	departmentId = getParentWindowData("departmentId") || departmentId;
	postId       = getParentWindowData("postId") || postId;
	levelId      = getParentWindowData("levelId") || levelId;
	showExternalType = getParentWindowData("showExternalType");
	onlyShowChildrenAccount = getParentWindowData("onlyShowChildrenAccount");

	currentAccountId = accountId;

	showConcurrentMember = getParentWindowData("showConcurrentMember");
	if(showConcurrentMember == null){
		showConcurrentMember = true;
	}
	showSecondMember = getParentWindowData("showSecondMember");
	if(showSecondMember == null){
		showSecondMember = true;
	}

	onlyCurrentDepartment = getParentWindowData("onlyCurrentDepartment") || onlyCurrentDepartment;

	if (isV5Member) {
		if (isInternal == false && getParentWindowData("showDeptPanelOfOutworker") != true) {// 编外人员
			panels.remove(Constants_Account);
			panels.remove(Constants_Post);
			panels.remove(Constants_Level);
			panels.remove(Constants_Role);
			panels.remove(Constants_OrgMetadataTag);
			disabledChanageAccountSelector();
		}
	} else {// V-Join人员
		if (!isAdministrator && !isSubVjoinAdmin && panels.size() > 1) {
			panels.remove(Constants_Account);
			panels.remove(Constants_Team);
			panels.remove(Constants_Post);
			panels.remove(Constants_Level);
			panels.remove(Constants_Role);
			panels.remove(Constants_OrgMetadataTag);
		}
	}


	//管理员去掉管理人员页签
	if(isAdministrator || groupAdmin || systemAdmin){
		panels.remove(Constants_RelatePeople);
	}

	//初始化单位选择器
	initChanageAccountTd();

	currentAccount = allAccounts.get(currentAccountId);
	if(currentAccount == null){ //如果是null，取第一个单位
		currentAccount = allAccounts.values().get(0);
		currentAccountId = currentAccount.id;
	}
	if(document.getElementById("currentAccountId")){
		var aName = currentAccount.name || "";
		$("#currentAccountId").val(aName.getLimitLength(16));
		$("#currentAccountId").attr("title", aName);
	}

	//加载操作者主单位数据
	var __accountId = allAccounts.get(myAccountId)
	if(__accountId){
		var _status = topWindow.initOrgModel(myAccountId, currentMemberId, extParameters);
		if(_status == false){
			return;
		}
	}

	//加载V-Join主单位数据
	if(allAccounts.get(currentVjoinAccountId)){
		var _status = topWindow.initOrgModel(currentVjoinAccountId, currentMemberId, extParameters, true);
		if(_status == false){
			return;
		}
	}

	//加载自定义的选人页签
	var custom_Panels = topWindow.Constants_Custom_Panels.values();
	for(var i = 0; i < custom_Panels.size(); i++) {
		var customPanel = custom_Panels.get(i);
		var customPanelType = customPanel.type;
		var customPanelName = customPanel.name;
		var area1ShowType = customPanel.area1ShowType;
		Constants_Panels.put(customPanelType, new Panel(customPanelType, area1ShowType == 'LIST' ? Constants_ShowMode_LIST : Constants_ShowMode_TREE , true, "getRelationData", null, true, true, "showQueryInput", 1, true));
		Constants_Component.put(customPanelType, customPanelName);

	}

	//需要显示组的类型
	var showTeamTypeStr = getParentWindowData("showTeamType");
	if(showTeamTypeStr){
		showTeamType = new ArrayList();
		showTeamType.addAll(showTeamTypeStr.split(","));
	}

	if(myAccountId != currentAccountId){
		//加载当前单位数据，往往出现在兼职单位切换的时候
		var _status = topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters);
		if(_status == false){
			return;
		}
	}

	//加载不显示的数据
	initExcludeElements();
	initIncludeElements();
	initExcludeElementsBeyondMemberSize();

	var getObject2 = topWindow.getObject;
	try{
		if(isV5Member){
			currentMember = getObject2(Constants_Member, currentMemberId, currentAccountId);
		}else{
			currentMember = getObject2(Constants_Member, currentMemberId, currentVjoinAccountId);
		}
	}
	catch(e){
	}

	//外部人员，给一个最低职务界别
	if(currentMember && !currentMember.isInternal){
		var lastLevel = topWindow.getDataCenter(Constants_Level).getLast();
		if(lastLevel){
			currentMember.levelId = lastLevel.id;
		}
	}

	mappingLevelSortId();

	document.getElementById('selectPeopleTable').style.display = "";
	//显示面板
	initAllPanel(currentAccountId);

	//回显原有数据
	initOriginalData();

	log.debug("初始化数据耗时：" + (new Date().getTime() - startTime) + "MS");
};

/**
 * 切换单位
 */
function chanageAccount(newAccountId){
	try {
		initAllPanel(newAccountId);
	}
	catch (e) {
		//selectChangAccount(currentAccountId);
		return;
	}

	currentAccountId = newAccountId;

	if(topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters) == false){ //加载数据
		getA8Top().close();
		return;
	}

	currentAccount = allAccounts.get(currentAccountId);

	if(tempNowPanel){
		selPanel(tempNowPanel.type); //显示当前面板
	}

	mappingLevelSortId();
}

/**
 * 需要检测工作范围显示时：切换单位，把当前登录者的职务级别换算成当前显示单位的职务级别
 */
function mappingLevelSortId(){
	if(isNeedCheckLevelScope && currentMember){
		if(currentAccountId != myAccountId){
			var concurentM = topWindow.getObject(Constants_concurentMembers, currentMember.id, currentAccountId);
			if(concurentM != null){ //我在当前单位兼职
				if(concurentM.getLevel()){
					currentMemberLevelSortId = concurentM.getLevel().sortId;
				}
				else{
					currentMemberLevelSortId = null;
				}

				return;
			}

			var levelIdOfGroup = currentMember.getLevel() ? currentMember.getLevel().groupLevelId : "-1"; //当前登录者对应集团的职务级别id
			var level = null;

			if(levelIdOfGroup && levelIdOfGroup != "0" && levelIdOfGroup != "-1"){ //我的职务级别没有映射到集团，菜单当前单位的最低职务级别
				var myGroupLevelIndex = groupLevels[levelIdOfGroup]; //我在集团职务级别中index

				for(var groupLevelId in groupLevels){
					var index = groupLevels[groupLevelId];
					if(myGroupLevelIndex > index){
						continue;
					}

					var _level = topWindow.findByProperty(topWindow.getDataCenter(Constants_Level), "groupLevelId", groupLevelId);
					if(_level){
						level = _level;
						break;
					}
				}
			}

			if(!level){
				level = topWindow.getDataCenter(Constants_Level).getLast(); //最低职务级别
			}

			if(level){
				currentMemberLevelSortId = level.sortId;
			}
			else{
				currentMemberLevelSortId = null;
			}
		}
		else{
			level = currentMember.getLevel();
			if(level){
				currentMemberLevelSortId = level.sortId;
			}
			else{
				currentMemberLevelSortId = null;
			}
		}
	}
}

/**
 * 非本单位，隐藏不显示的面板, 集团管理员和系统管理员例外
 */
function getPanels(accountId){
	var _panels = new ArrayList();
	_panels.addList(panels);

	if(!systemAdmin && !groupAdmin && loginAccountId != accountId){
		var ps = findPanelsByProperty("hiddenOnChanageAccount", true);
		var alwaysShowPanels = getParentWindowData("alwaysShowPanels");
		alwaysShowPanels = "," + alwaysShowPanels + ",";
		for(var i = 0; i < ps.size(); i++) {
			if(ps.get(i)==Constants_ExchangeAccount){
				var hiddenOnChanageAccountForEA=getParentWindowData("hiddenOnChanageAccountForExchangeAccount");
				if(hiddenOnChanageAccountForEA==null || hiddenOnChanageAccountForEA)
					_panels.remove(ps.get(i));
			}else if(ps.get(i)==Constants_OrgTeam){
				var hiddenOnChanageAccountForOT=getParentWindowData("hiddenOnChanageAccountForOrgTeam");
				if(hiddenOnChanageAccountForOT==null || hiddenOnChanageAccountForOT)
					_panels.remove(ps.get(i));
			}else if(alwaysShowPanels.indexOf(","+ps.get(i)+",")>=0){//总是显示的页签
				continue;
			}else{
				_panels.remove(ps.get(i));
			}
		}
	}

	if(accountId == rootAccount.id){
		var ps2 = findPanelsByProperty("hiddenWhenRootAccount", true);
		for(var i = 0; i < ps2.size(); i++) {
			_panels.remove(ps2.get(i));
		}
	}

	return (_panels);
}

/**
 * 初始化单位选择器
 */
function initChanageAccountTd(){
	/*var chanageAccountSelectorObj = document.getElementById("chanageAccountSelector");
	if(!chanageAccountSelectorObj){
		return;
	}
	var showAccountDivObj = document.getElementById("showAccountValueDiv");

	var selectedInd = 0;
	var _index = 0;
	var _hiddenAccountIds = getParentWindowData("hiddenAccountIds") || "";
	var hiddenAccountIds = _hiddenAccountIds.split(",");
	var hiddenRootAccount = getParentWindowData("hiddenRootAccount");
	for(var i = 0; i < accessableAccountIds.size(); i++) {
		var accessableAccount = accessableAccountIds.get(i);
		var _accountId = accessableAccount.id;
		var _superiorAccountId = accessableAccount.superior;
		if(hiddenRootAccount && _accountId == rootAccount.id){
			continue;
		}

		for(var j = 0; j < accessableAccountIds.size(); j++) {
			var accessableAccount1 = accessableAccountIds.get(j);
			var _accountId1 = accessableAccount1.id;
			var _superiorAccountId1 = accessableAccount1.superior;

			if(_accountId == _superiorAccountId1){
				if(!accessableAccount.children){
					accessableAccount.children = [];
				}

				accessableAccount.children[accessableAccount.children.length] = accessableAccount1;
				accessableAccount1.hasSuperior = true;
			}
		}
	}

	for(var i = 0; i < accessableAccountIds.size(); i++) {
		var _account = accessableAccountIds.get(i);
		if(hiddenRootAccount && _account.id == rootAccount.id){
			continue;
		}

		if(!_account.hasSuperior){
			draw(_account, 0);
		}
	}

	chanageAccountSelectorObj.selectedIndex = selectedInd;
	if(showAccountDivObj){
		showAccountDivObj.innerText = chanageAccountSelectorObj.options[selectedInd].text.trim().getLimitLength(14);
	}

	currentAccountId = chanageAccountSelectorObj.value;*/

	if(onlyLoginAccount == true){
		disabledChanageAccountSelector();
	}

	/*function draw(_account, spaceIndex){
		var _accountId = _account.id;
		var account = allAccounts.get(_accountId);
		if(!account){
			return;
		}

		if(hiddenAccountIds.indexOf(_accountId) == -1){
			var text = "";
			for(var i = 0; i < spaceIndex; i++) {
				text += " ";
			}

			var option = new Option(text + account.shortname, account.id);

			if(account.id == currentAccountId){
				selectedInd = _index;
			}

			chanageAccountSelectorObj.options.add(option);

		_index += 1;
		}

		if(_account.children && _account.children.length > 0){
			for(var i = 0; i < _account.children.length; i++) {
				draw(_account.children[i], spaceIndex + 2);
			}
		}
	}*/
}
// 能够搜索其他单位
function canSearchGroup(){
	var allowSeachGroup = getParentWindowData("allowSeachGroup", true);
	if(allowSeachGroup == false){
		return false;
	}
	return accessableAccounts.size()>2;
}
function disabledChanageAccountSelector(state){
	if(onlyLoginAccount == true){
		state = true;
	}
	else{
		state = state == null ? true : state;
	}

	if(isInternal == false && getParentWindowData("showDeptPanelOfOutworker") != true){
		state = true;
	}
	state=chanageStateFromParameter(state);

	var _flag4showSearchGroup = false;//是否显示【查全集团】临时标示
	var currentAccountIdInput = document.getElementById("currentAccountId");
	if(state == true || state == "true"){
		$('#select_input_div').prop("disabled", true).addClass("bg_color_gray");
		if(currentAccountIdInput){
			currentAccountIdInput.style.backgroundColor="#EFEDED";
		}
	}else{
		$('#select_input_div').prop("disabled", false).removeClass("bg_color_gray");
		if(currentAccountIdInput){
			currentAccountIdInput.style.backgroundColor = "";
			$('#currentAccountId').addClass("arrow_6_b");
		}
		_flag4showSearchGroup = true;
	}
	// 访问访问不是全否 && 当前面板为部门 && 选择到人 && 可以切换单位 = 显示"查全集团"
	var showSearchGroup = canSearchGroup()
		&& tempNowPanel!=null
		&& tempNowPanel.type == Constants_Department
		&& checkCanSelectMember()
		&& _flag4showSearchGroup;
	/**
	 * Fix AEIGHT-4247&AEIGHT-4214
	 * 当选人界面只能在本单位内选择某人时，即切换单位置灰时，屏蔽【查全集团】功能
	 * modify by lilong 2012-04-12
	 */
	//不能选择单位则不能在全集团范围内查询人员
	if(!showSearchGroup || onlyShowChildrenAccount == true){
		$("#seachGroupMember").hide();
	}else{
		$("#seachGroupMember").show();
		$("#select_input_div").css("width","115px");
		// $("#select_input_div_parent").css("width","120px");
		$("#currentAccountId").css("width","113px");
		$("#q").css("width","106px");
		$("#common_search_ul").css("width","146px");//$("#q").css("width")+10+30
	}
	_flag4showSearchGroup = null;

	/*var chanageAccountSelectorObj = document.getElementById("chanageAccountSelector");
	if(chanageAccountSelectorObj){
		chanageAccountSelectorObj.disabled = state;
		var showAccountDiv = document.getElementById('showAccountDiv');
		if(showAccountDiv){
			if(state==true || state == "true"){
				showAccountDiv.disabled = true;
				showAccountDiv.setAttribute("disable","true");
			}else{
				showAccountDiv.disabled = false;
				showAccountDiv.setAttribute("disable","false");
			}
		}
	}*/
}
/**
 * 根据前台页面的参数设置来判断时候disable掉单位选择器。
 */
function chanageStateFromParameter(state){
	if(tempNowPanel!=null){
		//从前台获取参数，判断是否disable掉单位选择器。
		if(tempNowPanel.type==Constants_OrgTeam){
			var disableOrNot=getParentWindowData("disabledAccountSelectorForOrgTeam");
			if(disableOrNot!=null)
				state=disableOrNot;
		}
		if(tempNowPanel.type==Constants_ExchangeAccount){
			var disableOrNot=getParentWindowData("disabledAccountSelectorForExchangeAccount");
			if(disableOrNot!=null)
				state=disableOrNot;
		}
	}
	return state;
}

/**
 * 检测是否可以选择该类型
 */
function checkCanSelect(type){
	var types = type.split(valuesJoinSep);
	if(types.length == 2){
		if(types[0] == Constants_Department){
			return selectTypes.contains(types[1]);
		}else if(types[0] == Constants_BusinessDepartment){
			return selectTypes.contains(types[1]);
		}else if(types[0] == Constants_Account && types[1] == Constants_Role){
			return true;
		}
	}
	else{
		return selectTypes.contains(type);
	}

	return false;
}

/**
 * 检测是否可以选择Member
 */
function checkCanSelectMember(){
	return selectTypes.contains(Constants_Member);
}
/**新增 选择机构组显示**/
function checkCanSelectOrgTeam(){
	return selectTypes.contains(Constants_OrgTeam);
}
var canSelectEmailOrMobileValue = null;
function getCanSelectEmailOrMobile(){
	if(canSelectEmailOrMobileValue == null){
		if(selectTypes.contains("Email")){
			canSelectEmailOrMobileValue = "email";
		}
		else if(selectTypes.contains("Mobile")){
			canSelectEmailOrMobileValue = "mobile";
		}
		else{
			canSelectEmailOrMobileValue = "";
		}
	}

	return canSelectEmailOrMobileValue;
}

function checkIsShowArea2(){
	var type = tempNowPanel.type;
	if(type == Constants_BusinessDepartment && checkCanSelect(Constants_BusinessRole) && getParentWindowData("hiddenRoleOfDepartment") != true){
		return true;
	}

	if(type == Constants_BusinessRole){
		return false;
	}

	if(isRootAccount()){
		if(canShowBusinessOrg && (type == Constants_Node || type == Constants_FormField)){
			return true;
		}

		if((type == Constants_BusinessDepartment || type == Constants_JoinOrganization) && checkCanSelect(Constants_Member)){
			return true;
		}

		return false;
	}

	if(type == Constants_Department && (getParentWindowData("showDepartmentMember4Search"))){
		return true;
	}
	else if(type == Constants_Department && ((checkCanSelect(Constants_Post) && getParentWindowData("hiddenPostOfDepartment") != true) || (checkCanSelect(Constants_Role) && getParentWindowData("hiddenRoleOfDepartment") != true))){
		return true;
	}

	if(type == Constants_FormField && (getParentWindowData("hiddenFormFieldRole") == true)){
		return false;
	}
	if(type == Constants_WFDynamicForm){
		return false;
	}

	if(type == Constants_Node){
		return true;
	}

	if(type == Constants_OrgTeam){
		return true;
	}

	if(type == Constants_Guest){
		return false;
	}

	if(topWindow.Constants_Custom_Panels.keys().contains(type)){
		var customPanel = topWindow.Constants_Custom_Panels.get(type);
		return customPanel.isShowArea2 == 'true' ? true : false;
	}

	return checkCanSelectMember() && tempNowPanel.isShowMember;
}

/**
 * 检测职务级别差
 * 1、同一部门的返回true
 * 2、被检测人职务级别高于当前操作者一个数字，返回false
 *
 * @member 要访问的人
 * @return true 有权访问, false 无权访问
 */
function checkLevelScope(member, entity , childDepts){
	if(!isNeedCheckLevelScope
		|| (currentMember && (currentMember.departmentId == member.departmentId || currentMember.isSecondPostInDept(member.departmentId)))
		|| currentAccount == null  || childDepts.contains(member.departmentId)
		|| currentAccountLevelScope < 0){
		return true;
	}
	// 外部人员通过工作范围校验
	if(isSubVjoinAdmin){
		return true;
	}
	if(!currentMember.isInternal && checkExternalMemberWorkScopeOfMember(member)){
		return true;
	}
	if(currentMemberLevelSortId == null){
		return false;
	}

	//我在这个部门做兼职，我可以访问在这个部门的所有人
	try {
		if(entity){
			var c = entity.getConcurents();
			if(c && c.contains(currentMember, "id")){
				return true;
			}else{//如果我在这个部门的上级部门做兼职，我也可以访问这个人。写死向上找三级吧，不做递归了
				var parentEntity = topWindow.getObject(Constants_Department,entity.parentId);
				if(parentEntity){
					c = parentEntity.getConcurents();
					if(c && c.contains(currentMember, "id")){
						return true;
					}else{
						parentEntity = topWindow.getObject(Constants_Department,parentEntity.parentId);
						if(parentEntity){
							c = parentEntity.getConcurents();
							if(c && c.contains(currentMember, "id")){
								return true;
							}else{
								parentEntity = topWindow.getObject(Constants_Department,parentEntity.parentId);
								if(parentEntity){
									c = parentEntity.getConcurents();
									if(c && c.contains(currentMember, "id")){
										return true;
									}

								}
							}

						}
					}

				}

			}
		}
	}
	catch (e) {
	}

	//副岗在这个部门的有权限
	if(member.isSecondPostInDept(currentMember.departmentId)){
		return true;
	}

	var level = member.getLevel();

	if(!level || level == null){
		level = topWindow.getDataCenter(Constants_Level,currentAccountId).getLast(); //最低职务级别
	}

	if(currentMemberLevelSortId - level.sortId <= currentAccountLevelScope){
		return true;
	}

	return false;
}

function checkAccessLevelScopeWithChildDept(id){
	var check1 = checkScopeWithChildDeptByAccessLevel(id);
	if(check1){
		return checkScopeWithChildDeptByAccessDepartment(id);
	}
	return false;
}
/**
 * 检测越级访问，包含子部门的职务级别校验
 * @return true 有权访问, false 无权访问
 */
function checkScopeWithChildDeptByAccessLevel(id){
	if(tempNowPanel.type == Constants_Team){
		return true;
	}
	if(!isNeedCheckLevelScope || currentAccountLevelScope < 0){
		return true;
	}
	if(currentMemberLevelSortId == null){
		if(isVjoinMember){
			return checkAccessLevelScope4VJoin(tempNowPanel.type, id, true);
		}else{
			return false;
		}
	}

	var members = null;
	var notNeedCheckLevelScope = isChildDeptOfCurrent(currentMember,id);
	if(currentMember && (currentMember.departmentId == id || currentMember.isSecondPostInDept(id)|| notNeedCheckLevelScope)){
		return true;
	}

	var entity = topWindow.getObject(Constants_Department, id);
	if(entity && entity.getConcurents().contains(currentMember, "id")){
		return true;
	}
	members = topWindow.getObject(Constants_Department, id).getAllMembers();
	if(members){
		var childDepts = childDeptOfCurrent(currentMember);
		for(var i = 0; i < members.size(); i++) {
			if(!checkLevelScope(members.get(i),null,childDepts)){
				return false;
			}
		}
	}

	return true;
}

/**
 * 检测越级访问，包含子部门的部门可见性设置
 * @return true 有权访问, false 无权访问
 */
function checkScopeWithChildDeptByAccessDepartment(id){
	if(!isInternal){
		return true;
	}
	if(tempNowPanel.type == Constants_Team){
		return true;
	}
	if(!isNeedCheckLevelScope){
		return true;
	}

	var members = null;
	var notNeedCheckLevelScope = isChildDeptOfCurrent(currentMember,id);
	if(currentMember && (currentMember.departmentId == id || currentMember.isSecondPostInDept(id))){
		return true;
	}

	var entity = topWindow.getObject(Constants_Department, id);
	if(entity && (entity.externalType !="0" || !entity.isInternal)){
		return true;
	}

	if(entity && entity.getConcurents().contains(currentMember, "id")){
		return true;
	}


	var d = topWindow.getObject(Constants_DepartmentAccess, id, currentAccountId);
	if(d){//通过部门下的人员，才找到的该部门，只显示这个部门下能看到的具体人，不显示全部人员。
		if(d.type == 'D'){//整个部门都可见，就可选。
		}else{
			var memberIds = d.memberIds;
			var members = topWindow.getObject(Constants_Department, id).getAllMembers();
			for(var i=0;i<members.size();i++){//所有部门中，有我访问权限外的人员，则不能选择。
				if(memberIds.indexOf(members.get(i).id) == -1){
					return false;
				}
			}
		}
	}else{
		return false;
	}

	//取子部门是不是全部可见
	var cDepartments = entity.getAllChildren();
	for(var i = 0; i < cDepartments.size(); i++){
		var n = cDepartments.get(i);
		if(n.isInternal == true){
			var d = topWindow.getObject(Constants_DepartmentAccess, n.id, currentAccountId);
			if(!d){
				return false;
			}
		}
	}

	return true;
}


function checkAccessLevelScope(type, id){
	var check1 = checkScopeByAccessLevel(type, id);
	if(check1){
		return checkScopeByAccessDepartment(type, id);
	}
	return false;
}
/**
 * 检测越级访问，只要部门/组里面有任何一个人不能选择，则该部门/组不能选择
 * @return true 有权访问, false 无权访问
 */
function checkScopeByAccessLevel(type, id){
	if(isAdmin){
		return true;
	}
	if(tempNowPanel.type == Constants_Team || tempNowPanel.type == Constants_Guest || tempNowPanel.type == Constants_OrgMetadataTag){
		return true;
	}

	if(!isNeedCheckLevelScope){
		return true;
	}
	if(type == Constants_Account){
		if(id == currentAccountId){
			if(currentAccountLevelScope < 0){
				return true;
			}
		}else{
			var a = topWindow.getObject(Constants_Account,id);
			if(a && a.levelScope < 0){
				return true;
			}
		}

	}else{
		if(currentAccountLevelScope < 0){
			return true;
		}
	}

	if(currentMemberLevelSortId == null){
		if(isVjoinMember){
			return checkAccessLevelScope4VJoin(tempNowPanel.type, id, false);
		}else{
			return false;
		}
	}

	var members = null;
	if(type == Constants_Department){
		var notNeedCheckLevelScope = isChildDeptOfCurrent(currentMember,id);
		if(currentMember && (currentMember.departmentId == id || currentMember.isSecondPostInDept(id) || notNeedCheckLevelScope)){
			return true;
		}

		var entity = topWindow.getObject(type, id);
		if(entity && entity.getConcurents().contains(currentMember, "id")){
			return true;
		}
		members = topWindow.getObject(Constants_Department, id).getDirectMembers();
	}
	else if(type == Constants_Team){
		return true;
	}
	else if(type == Constants_Level){
		var entity = topWindow.getObject(type, id);
		return currentMemberLevelSortId - entity.sortId <= currentAccountLevelScope;
	}
	else if(type == Constants_Post){
		var entity = topWindow.getObject(type, id);
		members = entity.getAllMembers();
	}else if( type == Constants_Department + "_" + Constants_Post){
		var ids = id.split("_");
		var types = type.split("_");

		var entity = topWindow.getObject(types[0], ids[0]);
		members =  new ArrayList();
		if(entity){
			var ms = entity.getAllMembers();
			if(ms){
				for(var i = 0; i < ms.size(); i++){
					var m = ms.get(i);
					if(m.postId == ids[1]){
						members.add(m);
					}
				}
			}
		}
	}else if(type == Constants_Account){
		if(isSubVjoinAdmin){
			return true;
		}
		var a = topWindow.getObject(Constants_Account,id);
		if(a && a.levelScope >= 0){
			if(id == currentAccountId){
				var allLevels = topWindow.getDataCenter(Constants_Level,id);

				if(allLevels && allLevels.size()>0){
					var highLevel;
					for(var i = 0; i < allLevels.size(); i++) {
						var l = allLevels.get(i);
						var levelMembers = l.getMembers();
						if(levelMembers && levelMembers.size()>0){
							highLevel = l;
							break;
						}
					}
					if(highLevel){
					}else{
						highLevel = allLevels.get(0);
					}
					return currentMemberLevelSortId - highLevel.sortId <= a.levelScope;
				}
			}else{
				return false;
			}

		}
		return true;
	}else if(type == Constants_BusinessAccount){
		var businessAccount = topWindow.getObject(Constants_BusinessAccount, id);
		if(businessAccount){
			if(businessAccount.showAllMember != "1"){
				return false;
			}
//			var accessMemberIds = businessAccount.accessMemberIds;
//			var childBusinessDepartment = topWindow.findChildInList(topWindow.getDataCenter(Constants_BusinessDepartment, currentAccountId), id);
//			for(var i = 0; i < childBusinessDepartment.size(); i++){
//				var members = childBusinessDepartment.get(i).getAllMembers();
//				for(var j=0;j<members.size();j++){
//					var member = members.get(j);
//					if(accessMemberIds.indexOf(member.id)<0){
//						return false;
//					}
//				}
//			}
		}
		return true;
	}
	else{
		return true;
	}

	if(members){
		var childDepts = childDeptOfCurrent(currentMember);
		for(var i = 0; i < members.size(); i++) {
			if(!checkLevelScope(members.get(i),null,childDepts)){
				return false;
			}
		}
	}

	return true;
}

/**
 * 根据部门可见性设置判断是否有权限访问
 * @return true 有权访问, false 无权访问
 */
function checkScopeByAccessDepartment(type, id){
	if(type == Constants_Account && id != currentAccountId){
		return true;//TODO,从单位跳转过来的
	}
	if(!isNeedCheckLevelScope || !isInternal){
		return true;
	}

	var departmentAccesses = topWindow.getDataCenter(Constants_DepartmentAccess, currentAccountId);
	if(type == Constants_Department){
		var notNeedCheckLevelScope = isChildDeptOfCurrent(currentMember,id);
		if(currentMember && (currentMember.departmentId == id || currentMember.isSecondPostInDept(id) || notNeedCheckLevelScope)){
			return true;
		}

		var entity = topWindow.getObject(type, id);
		if(entity && (entity.getConcurents().contains(currentMember, "id") || !entity.isInternal)){
			return true;
		}

		var d = topWindow.getObject(Constants_DepartmentAccess, id, currentAccountId);
		if(d){//通过部门下的人员，才找到的该部门，只显示这个部门下能看到的具体人，不显示全部人员。
			if(d.type == 'D'){//整个部门都可见，就可选。
				return true;
			}else{
				var memberIds = d.memberIds;
				var members = topWindow.getObject(Constants_Department, id).getDirectMembers();
				for(var i=0;i<members.size();i++){//所有部门中，有我访问权限外的人员，则不能选择。
					if(memberIds.indexOf(members.get(i).id) == -1){
						return false;
					}
				}
			}
		}else{
			return false;
		}

	}
	else if(type == Constants_Team){
		return true;
	}
	else if(type == Constants_Post){
		var _NoAccessPostIdsByDepartmentAccess = topWindow.NoAccessPostIdsByDepartmentAccess;
		if(_NoAccessPostIdsByDepartmentAccess != null && _NoAccessPostIdsByDepartmentAccess.contains(id)){//我不能直接选择的岗位中，包含这个岗位
			return false;
		}
		return true;
	}
	else if(type == Constants_Level){
		var _NoAccessLevelIdsByDepartmentAccess = topWindow.NoAccessLevelIdsByDepartmentAccess;
		if(_NoAccessLevelIdsByDepartmentAccess != null && _NoAccessLevelIdsByDepartmentAccess.contains(id)){//我不能直接选择的职级中，包含这个职级
			return false;
		}
		return true;
	}
	else if( type == Constants_Department + "_" + Constants_Post){
		var ids = id.split("_");
		var types = type.split("_");

		var entity = topWindow.getObject(types[0], ids[0]);
		var __members =  new ArrayList();
		if(entity){
			var ms = entity.getAllMembers();
			if(ms){
				for(var i = 0; i < ms.size(); i++){
					var m = ms.get(i);
					if(m.postId == ids[1]){
						__members.add(m);
					}
				}
			}
		}

		for(var i = 0; i < __members.size(); i++){
			var member = __members.get(i);
			if(!member.isInternal){
				continue;
			}
			var hidden = true;
			for(var j = 0; j < departmentAccesses.size(); j++){
				var departmentAccess = departmentAccesses.get(j);
				var dId = departmentAccess.id;
				var d = topWindow.getObject(Constants_Department, dId, currentAccountId);
				if(!d){
					continue;
				}
				if(departmentAccess.type == 'D'){
					var departMembers = d.getDirectMembers();
					for(var k=0;k<departMembers.size();k++){
						if(departMembers.get(k).id == member.id){
							hidden = false;
							break;
						}
					}
				}else if(departmentAccess.type == 'M'){
					var mIds = departmentAccess.memberIds;
					if(mIds.indexOf(member.id) != -1){
						hidden = false;
						break;
					}
				}

				if(!hidden){
					break;
				}
			}

			if(hidden){
				return false;
			}
		}

	}else if(type == Constants_Account){
		var _NoAccessPostIdsByDepartmentAccess = topWindow.NoAccessPostIdsByDepartmentAccess;
		if(_NoAccessPostIdsByDepartmentAccess != null && _NoAccessPostIdsByDepartmentAccess.size() > 0){//我不能直接选择的岗位中有数据，那么就不能选择单位
			return false;
		}

		var _NoAccessLevelIdsByDepartmentAccess = topWindow.NoAccessLevelIdsByDepartmentAccess;
		if(_NoAccessLevelIdsByDepartmentAccess == null && _NoAccessLevelIdsByDepartmentAccess.size() > 0){//我不能直接选择的职级中有数据，那么就不能选择单位
			return false;
		}
		return true;
	}
	else{
		return true;
	}

	return true;
}

/**
 * 如果当前人是外部人员，检测改实体是否可以访问
 *
 * @param type
 * @param id
 * @return true:可以访问
 */
function checkExternalMemberWorkScope(type, id){
	if(isInternal){//当前人不是外部人员
		return true;
	}

	if(tempNowPanel.type == Constants_Team){
		return true;
	}

	var _type = type.split(valuesJoinSep)[0];
	var _id = id.split(valuesJoinSep)[0];


	//编外人员
	if(isV5Member){
		if(type.startsWith(Constants_Account) || type.startsWith(Constants_BusinessAccount)){
			return false;
		}

		var o = topWindow.getObject(type, id);
		if(o && o.externalType && o.externalType!="0"){//编外人员不允许访问vjoin
			return false;
		}

		if(!type.startsWith(Constants_Department)){
			return true;
		}

		var _ExternalMemberWorkScope = topWindow.ExternalMemberWorkScope;
		if(_ExternalMemberWorkScope.get(0) == "0"){
			return true;
		}

		for(var i = 0; i < _ExternalMemberWorkScope.size(); i++) {
			var wsDepartId = _ExternalMemberWorkScope.get(i); //工作部门的Id 如：D0.1
			if(_type == Constants_Department){
				var d = topWindow.getObject(Constants_Department, _id);
				if(d && (("D" + d.path) == wsDepartId || ("D" + d.path).indexOf(wsDepartId) == 0)){
					return true;
				}
			}
		}
	}

	//vjoin 人员
	if(isVjoinMember){
		if(isAdministrator == true){
			return true;
		}

		if(isSubVjoinAdmin == true){
			if(tempNowPanel.type == Constants_JoinOrganization && _type == Constants_Account){//子机构管理员，不能选择vj根节点(如选择机构的上级机构)
				return false;
			}
			if(tempNowPanel.type == Constants_Department && _type == Constants_Account){//子机构管理员，可以选择准出单位的单位（和vjoin-admin一样，比如授权内外互访权限）
				return true;
			}
		}

		if(tempNowPanel.type != Constants_Department && tempNowPanel.type != Constants_JoinOrganization){
			return true;
		}
		var _VjoinMemberWorkScope = topWindow.VjoinMemberWorkScope;
		if(_VjoinMemberWorkScope.get(0) == "0"){
			return true;
		}

		if(tempNowPanel.type == Constants_Department){
			var d = topWindow.getObject(Constants_Department, _id);
			for(var i = 0; i < _VjoinMemberWorkScope.size(); i++) {
				var wsDepartId = _VjoinMemberWorkScope.get(i); //工作部门的Id 如：D0.1
				if(_type == Constants_Department){
					if(d && (("D" + d.path) == wsDepartId || ("D" + d.path).indexOf(wsDepartId) == 0)){
						return true;
					}
				}

				if(_type == Constants_Member){
					if(_id.indexOf("#")!=-1){
						var _ids = _id.split("#");
						_id = _ids[1];
					}
					if(_VjoinMemberWorkScope.contains("M"+_id)){
						return true;
					}
				}

			}
			if(_type == Constants_Department){
				if(!isNeedCheckLevelScope){//只要能看到這個部門，就能選
					var _AccessInnerDepts = topWindow.AccessInnerDepts;
					if(_AccessInnerDepts != null){
						if(_AccessInnerDepts.contains("D"+_id)){
							return true;
						}
					}else{
						return false;
					}
				}else{
					var _ms = d.getAllMembers();
					var isSelect = true;
					for(var i = 0; i < _ms.size(); i++) {
						if(!_VjoinMemberWorkScope.contains("M"+_ms.get(i).id)){
							isSelect = false;
							break;
						}
					}

					if(isSelect){
						return true;
					}
				}

			}
		}

		if(tempNowPanel.type == Constants_JoinOrganization){
			var cm = topWindow.getObject(Constants_Member, currentMemberId);

			if(_type == Constants_Member){
				var m = topWindow.getObject(Constants_Member, _id);
				if(m != null){
					var _VjMemberAccessVjAccounts = topWindow.VjMemberAccessVjAccounts;
					if(_VjMemberAccessVjAccounts != null && _VjMemberAccessVjAccounts.contains("D"+m.departmentId)){//可以访问本外部单位可访问的其他外部单位下的人员
						return true;
					}
				}
			}else{
				var d = topWindow.getObject(Constants_Department, _id);
				if(_type == Constants_Account || (cm != null && cm.departmentId == d.id)){
					return true;
				}

				var _AccessVjoinDepts = topWindow.AccessVjoinDepts;
				if(!isNeedCheckLevelScope || isSubVjoinAdmin == true){//只要能看到這個部門，就能選
					if(_AccessVjoinDepts != null && _AccessVjoinDepts.contains("D"+_id)){
						return true;
					}else{
						return false;
					}
				}else if(_AccessVjoinDepts.contains("D"+_id)){
					var _ms = d.getAllMembers();
					var _VjMemberAccessVjAccounts = topWindow.VjMemberAccessVjAccounts;
					for(var i=0;i<_ms.size();i++){
						if(_VjMemberAccessVjAccounts != null && !_VjMemberAccessVjAccounts.contains("D"+_ms.get(i).departmentId)){//所选择的外单位/机构，下的人员全部在 当前外部人员可访问的外部单位内，则可以选择。
							return false;
						}
					}
					return true;
				}

			}

		}

	}

	return false;
}

/**
 * 校验vjoin人员，是否可以选择部门包含子部门
 * @param type
 * @param id
 * @returns {Boolean}
 */
function checkAccessLevelScope4VJoin(_type, _id,withChildDept){
	//vjoin 人员
	if(!isNeedCheckLevelScope){
		return true;
	}
	if(isAdministrator == true || isSubVjoinAdmin == true){
		return true;
	}
	var _VjoinMemberWorkScope = topWindow.VjoinMemberWorkScope;
	if(_VjoinMemberWorkScope.get(0) == "0"){
		return true;
	}

	var d = topWindow.getObject(Constants_Department, _id);
	/*	for(var i = 0; i < _VjoinMemberWorkScope.size(); i++) {
		var wsDepartId = _VjoinMemberWorkScope.get(i); //工作部门的Id 如：D0.1
		if(_type == Constants_Department){
			if(d && (("D" + d.path) == wsDepartId || ("D" + d.path).indexOf(wsDepartId) == 0)){
				return true;
			}
		}
	}*/

	var _ms = d.getDirectMembers();
	if(withChildDept == true){
		_ms = d.getAllMembers();
	}
	var isSelect = true;
	for(var i = 0; i < _ms.size(); i++) {
		if(!_VjoinMemberWorkScope.contains("M"+_ms.get(i).id)){
			isSelect = false;
			break;
		}
	}

	if(isSelect){
		return true;
	}
	return false;
}

/**
 * 判断外部人员是否可以访问内部具体的人
 */
function checkExternalMemberWorkScopeOfMember(member){
	if(isInternal){//当前人不是外部人员
		return true;
	}

	if(isV5Member){
		if(!member.isInternal && member.getDepartment().id == currentMember.departmentId){
			return true;
		}
		var _ExternalMemberWorkScope = topWindow.ExternalMemberWorkScope;
		if(_ExternalMemberWorkScope.isEmpty()){
			return false;
		}

		if(member && member.externalType && member.externalType!="0"){//编外人员不允许访问vjoin
			return false;
		}

		if(_ExternalMemberWorkScope.get(0) == "0"){
			return true;
		}

		if(_ExternalMemberWorkScope.contains("M" + member.id)){
			return true;
		}

	}

	if(isVjoinMember){
		if(isAdministrator == true || isSubVjoinAdmin == true){
			return true;
		}

		if(currentMember != null){
			if(member.getDepartment().id == currentMember.departmentId){//可以访问本外部单位的人员
				return true;
			}

			var _VjMemberAccessVjAccounts = topWindow.VjMemberAccessVjAccounts;
			if(_VjMemberAccessVjAccounts != null && _VjMemberAccessVjAccounts.contains("D"+member.getDepartment().id)){//可以访问本外部单位可访问的其他外部单位下的人员
				return true;
			}
		}

		var _VjoinMemberWorkScope = topWindow.VjoinMemberWorkScope;
		if(_VjoinMemberWorkScope.isEmpty()){
			return false;
		}

		if(_VjoinMemberWorkScope.get(0) == "0"){
			return true;
		}

		if(_VjoinMemberWorkScope.contains("M" + member.id)){
			return true;
		}

		return false;

	}

	return checkExternalMemberWorkScope(Constants_Department, member.getDepartment().id);
}

/**
 * 判断内部人员是否可以访问vjoin具体的人
 */
function checkVjoinMemberWorkScopeOfMember(member){
	if(!isInternal){
		return true;
	}

	var _InnerMemberAccessVjoinMember = topWindow.InnerMemberAccessVjoinMember;
	if(_InnerMemberAccessVjoinMember.isEmpty()){
		return false;
	}

	if(_InnerMemberAccessVjoinMember.get(0) == "0"){
		return true;
	}

	if(_InnerMemberAccessVjoinMember.contains("M" + member.id)){
		return true;
	}

	return false;

}

/**
 * 初始化面板，并把第一个面板作为当前显示的面板
 */
function initAllPanel(_accoutId){
	var _panels = getPanels(_accoutId);

	if(_panels == null || (_panels != null && _panels.isEmpty())){
		initNoPanel();
		return;
	}

	var tdPanelObj = document.getElementById("tdPanel");
	var length1 = tdPanelObj.cells.length;
	for(var i = 0; i < length1; i++) {
		tdPanelObj.deleteCell(i);
	}

	// 将要被显示的面板 <Panel>
	var toShowPanels = new ArrayList();
	var toShowPanels2 = new ArrayList();
	var containsDepartment = false;
	var _panelSize = _panels.size();
	for(var i = 0; i < _panelSize; i++){
		var panel = Constants_Panels.get(_panels.get(i));
		if(panel == null){
			//log.warn("The Panel's type '" + _panels.get(i) + "' undefined.");
			continue;
		}
		if(panel.type == Constants_Department) {
			containsDepartment = true;
		}
		toShowPanels2.add(panel);
	}
	/**
	 * 20140411 讨论结果：出现【最近】页签的前提，有部门页签，且用来选人就出现最近联系人
	 */

	if(containsDepartment && checkCanSelectMember()) {
		//只有当前单位不出现最近
		if(onlyLoginAccount == true){
			showRecent = false;
		}
		if(showRecent && !isAdmin && isV5Member) {
			toShowPanels.add(Constants_Panels.get(Constants_OrgRecent));
		}
		for(var i = 0; i < toShowPanels2.size(); i++){
			toShowPanels.add(toShowPanels2.get(i));
		}
	} else {
		toShowPanels = toShowPanels2;
	}


	var canSelectTempNowPanel = false;
	var canSelectDepartmentPanel = false;
	var canSelectJoinOrganization = false;
	var showPanelSize = toShowPanels.size()
	for(var i = 0; i < showPanelSize; i++){
		var panel = toShowPanels.get(i)
		if(tempNowPanel != null && panel.type == tempNowPanel.type){
			canSelectTempNowPanel = true;
			break;
		}
		if(panel.type == "Department"){
			canSelectDepartmentPanel = true;
		}
		if(panel.type == Constants_JoinOrganization){
			canSelectJoinOrganization = true;
		}
	}

	//默认是部门页签。
	if(!canSelectTempNowPanel && canSelectDepartmentPanel) {
		tempNowPanel = Constants_Panels.get(Constants_Department);
	}

	if(isVjoinMember && canSelectJoinOrganization){
		tempNowPanel = Constants_Panels.get(Constants_JoinOrganization);
	}

	var CellTd = tdPanelObj.insertCell(-1);
	CellTd.style.height = "32px";//顶部TAB选项卡高度
	CellTd.style.verticalAlign="bottom";

	var newDiv = document.createElement("div");
	newDiv.className="common_tabs clearfi";
	// CellTd.appendChild(newDiv);

	var newul = document.createElement("ul");
	newul.className="left";
	newDiv.appendChild(newul);

	//选项宽度为iframe的body宽度-左右间距15*2
	var _tabsAreaWidth = document.getElementsByTagName("body")[0].offsetWidth - 15 * 2;
	//tab区的高度
	var _tabAreaHeight = tdPanelObj.offsetHeight;
	//计算宽度的计数器
	var _nowWh = 0;
	//tab区能显示下多少tab页签的计数器
	var _tabMaxNum = 0;
	//tab数量是否过多，宽度超过一行了，初始值false
	var _needReDraw = false;
	//tab的字体大小，用于计算宽度
	var _fontSize = 12;
	//一共有多少个tab页签
	var panelsSize = toShowPanels.size();
	//将面板对象转化为HTML代码
	for(var i = 0; i < panelsSize; i++){
		var panel = toShowPanels.get(i);
		var title = Constants_Component.get(panel.type);

		//获取当前页签的字节数（全角字符、汉字占两字符）
		var _titleBytes = title.getBytesLength();
		//宽度<50时，以50计(与css文件中的定义同步)，这里里的8*2为左右padding各8px
		var _titleLen = (_fontSize / 2 * _titleBytes + 8 * 2) > (50 + 8 * 2) ? (_fontSize / 2 * _titleBytes + 8 * 2) : (50 + 8 * 2);
		//宽度>120时，以120计(与css文件中的定义同步)
		_titleLen = _titleLen > (120 + 8 * 2) ? (120 + 8 * 2) : _titleLen;

		_nowWh += _titleLen;
		//20为下拉箭头所占宽度
		if (_nowWh + 20 > _tabsAreaWidth) {
			_needReDraw = true;
			break;
		}
		_tabMaxNum = i + 1;


		var li = document.createElement("li");
		li.id = 'li_'+panel.type;
		newul.appendChild(li);

		var a = document.createElement("a");
		li.appendChild(a);

		a.onclick  = new Function("selPanel('" + panel.type + "', '" + panel.showMode + "')");
		if(i == panelsSize - 1){
			a.className = "no_b_border last_tab";
		}
		else{
			a.className = "no_b_border";
		}
		a.innerText = title;
		a.title = title;

//		var right = document.createElement("div");
//		right.id='right'+panel.type;
//		right.className="tab-tag-right";
//
//		var separator = document.createElement("div");
//		separator.className="tab-separator";

//		newTd.appendChild(left);
		newul.appendChild(li);
//		newTd.appendChild(right);
//		newTd.appendChild(separator);

	}

	//一行显示不下所有tab页签时，剩下的页签单独放进右侧的下拉div中
	if(_needReDraw){
		//下拉区
		var _newMoretab = document.createElement("div");
		_newMoretab.id = "moreTabsArea";
		_newMoretab.className = "moreTabsArea left";
		newDiv.appendChild(_newMoretab);

		//下拉箭头的div
		var _newMoretabArror = document.createElement("div");
		_newMoretabArror.id = "moreTabsArror";
		_newMoretabArror.className = "moreTabsArror";
		_newMoretab.appendChild(_newMoretabArror);
		_newMoretabArror.style.height = _tabAreaHeight + "px";

		//下拉箭头的图标
		var _newMoretabArrorSpan = document.createElement("span");
		_newMoretabArrorSpan.className = "ico16 arrow_2_b";
		_newMoretabArror.appendChild(_newMoretabArrorSpan);
		_newMoretabArrorSpan.style.marginTop = (_tabAreaHeight - 24) + "px";

		//下拉列表区
		var _newMoretabList = document.createElement("div");
		_newMoretabList.id = "moreTabsList";
		_newMoretabList.className = "moreTabsList";
		_newMoretab.appendChild(_newMoretabList);

		//下拉列表li
		for (var j = _tabMaxNum; j < panelsSize; j++) {
			var morePanel = toShowPanels.get(j);
			var moreTitle = Constants_Component.get(morePanel.type);

			var moreLi = document.createElement("li");
			moreLi.id = 'li_'+morePanel.type;
			_newMoretabList.appendChild(moreLi);

			var moreA = document.createElement("a");
			moreLi.appendChild(moreA);

			moreA.onclick  = new Function("selPanel('" + morePanel.type + "', '" + morePanel.showMode + "')");
			moreA.innerText = moreTitle;
			moreA.title = moreTitle;
		}
	}
	CellTd.appendChild(newDiv);


	//显示第一个面板
	if(!toShowPanels.isEmpty()){

		if(tempNowPanel && toShowPanels.contains(tempNowPanel, "type")){
			selPanel(tempNowPanel.type); //显示当前面板
		}
		else{
			tempNowPanel = null;
			selPanel(toShowPanels.get(0).type);
		}
	}else{
		initNoPanel();
	}
}

function initNoPanel(){
	//没有任何面板
	var area1Reduction = 0;
	if(window.innerHeight < 500){
		area1Reduction = 500 - window.innerHeight;
	}

	document.getElementById("Area1").style.display = "";
	document.getElementById("Area1").style.height = (450 - area1Reduction - 70) + "px";
	if(document.getElementById("List1")){
		document.getElementById("List1").style.height = (450 - area1Reduction - 70 + (true ? 10 : 0)) + "px";
	}

	document.getElementById("Area2").style.display = "none";

	document.getElementById("Separator1").style.height =  "0px";
	document.getElementById("Separator1_0").style.display = "none";
	document.getElementById("Separator1_1").style.display = "none";
	document.getElementById("Separator1_2").style.display = "none";
	$("#Separator1_2").css("margin-top","0");

	$("#seachGroupMember").hide();
	var objectQ = document.getElementById("q");
	objectQ.disabled = true;
	objectQ.className = "search_input color_gray";
	objectQ.style.background="#F8F8F8";
	objectQ.value = "-";
}
/**
 * 根据面板类型显示面板
 *
 * @param type 面板类型
 */
function selPanel(type){
	if(tempNowPanel != null){//
		var middel = $('#li_'+tempNowPanel.type);
		middel.removeClass('current');
		middel.onclick  = new Function("selPanel('" + tempNowPanel.type + "', '" + tempNowPanel.showMode + "')");
	}

	var middel = $('#li_'+type);
	middel.addClass("current");
	middel.onclick  = new Function("");

	//不隐藏外部单位连接时
	if(type=="ExchangeAccount"&&(!getParentWindowData("hiddenAddExternalAccount"))){
		//外部单位时，打开链接对象
		var addExternalAccountObj = document.getElementById("addExternalAccountDiv");
		addExternalAccountObj.style.display="";
	}else{
		var addExternalAccountObj = document.getElementById("addExternalAccountDiv");
		addExternalAccountObj.style.display="none";
	}

	tempNowPanel = Constants_Panels.get(type);

	tempNowSelected.clear();

	if(tempNowPanel.singleLoad == true){//如果是这些页签，在点击页签的时候才加载数据
		topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters,isVjoinMember,type);
	}else{//如果这些页签依赖了单独加载的页签，点击这些页签的时候也需要同时加载需要单独加载的页签。
		if(tempNowPanel.type == Constants_FormField || tempNowPanel.type == Constants_Node){
			topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters,isVjoinMember,Constants_BusinessDepartment);
		}
	}

	showList1(type, tempNowPanel.showMode);
	reArea_1_2();

	if(!checkIsShowArea2()){
		hiddenArea2(true);
		document.getElementById("Separator1").style.display = "none";
	}

	document.getElementById("common_searchTr").style.display = "";
	document.getElementById("common_search_text_Td").style.display = "";
	document.getElementById("metadata_searchTr").style.display = "none";

	var tds=document.getElementById('searchTable').rows[0].cells;//将第一行的单位下拉，展开到整行
	tds[0].colSpan="1";

	//部门页签下查询人员时是否支持全集团查询
	if((type == Constants_Department || type == Constants_BusinessDepartment) && onlyShowChildrenAccount != true){
		$("#seachGroupMember").show();
		$("#select_input_div").css("width","145px");
		// $("#select_input_div_parent").css("width","160px");
		$("#currentAccountId").css("width","143px");
		$("#q").css("width","156px");
		$("#common_search_ul").css("width","190px");//$("#q").css("width")+10+30
		//实际#seachGroupMember是隐藏的
		var obj = document.getElementById("seachGroup");
	}else if(type == Constants_BusinessDepartment){
		$("#seachGroupMember").hide();
		$("#select_input_div").css("width","145px");
		// $("#select_input_div_parent").css("width","160px");
		$("#currentAccountId").css("width","143px");
		$("#q").css("width","156px");
		$("#common_search_ul").css("width","190px");//$("#q").css("width")+10+30
		showSeparatorDIV(Constants_BusinessDepartment);
	}else if(type == Constants_Account){//有组织属性查询条件
		if(isGroupVer){
			var tds=document.getElementById('searchTable').rows[0].cells;//将第一行的单位下拉，展开到整行
			tds[0].colSpan="3";

			document.getElementById("common_searchTr").style.display = "";
			document.getElementById("select_input_div_parent").style.display = "";
			document.getElementById("common_search_text_Td").style.display = "none";

			$("#select_input_div").css("width","342px");
			$("#currentAccountId").css("width","340px");
			$("#seachGroupMemberTd").css("padding-left","0px");
			if(document.getElementById("Area2").style.display == "none"){
				document.getElementById("Area1").style.height ="335px";
			}else{
				document.getElementById("Area1").style.height ="128px";
			}
		}else{
			document.getElementById("common_searchTr").style.display = "none";
			if(document.getElementById("Area2").style.display == "none"){
				document.getElementById("Area1").style.height ="375px";
			}else{
				document.getElementById("Area1").style.height ="168px";
			}
		}

		document.getElementById("metadata_searchTr").style.display = "";

		document.getElementById("metadata_item_search_ul").style.display = "none";
		document.getElementById("metadata_common_search_ul").style.display = "";
		$("#orgMetadataSelect option").remove();

		$("#orgMetadataSelect").append("<option value='-1'>" + $.i18n("common.account.name.label") + "</option>");
		var accountMetadatas = topWindow.getDataCenter(Constants_AccountMetadataTag, currentAccountId);
		if(accountMetadatas.size() > 0){//枚举属性-枚举值...枚举属性-枚举值。  都是按顺序连续的。
			for(var i = 0; i < accountMetadatas.size(); i++){
				var am = accountMetadatas.get(i);
				var bId = am.id;
				var mt = am.enumType;
				var mName = am.name;
				if(mt == 'K'){//枚举属性

					$("#orgMetadataSelect").append("<option value='" + bId + "'>" + mName + "</option>");
				}
			}
		}
	}else if(type == Constants_Post){//有组织属性查询条件
		if(isGroupVer){
			var tds=document.getElementById('searchTable').rows[0].cells;//将第一行的单位下拉，展开到整行
			tds[0].colSpan="3";

			document.getElementById("common_searchTr").style.display = "";
			document.getElementById("select_input_div_parent").style.display = "";
			document.getElementById("common_search_text_Td").style.display = "none";

			$("#select_input_div").css("width","342px");
			$("#currentAccountId").css("width","340px");
			$("#seachGroupMemberTd").css("padding-left","0px");
			if(document.getElementById("Area2").style.display == "none"){
				document.getElementById("Area1").style.height ="335px";
				document.getElementById(tempNowPanel.type + "DataBody").style.height ="335px";
			}else{
				document.getElementById("Area1").style.height ="128px";
				document.getElementById(tempNowPanel.type + "DataBody").style.height ="128px";
			}
		}else{
			document.getElementById("common_searchTr").style.display = "none";
			if(document.getElementById("Area2").style.display == "none"){
				document.getElementById("Area1").style.height ="375px";
				document.getElementById(tempNowPanel.type + "DataBody").style.height ="375px";
			}else{
				document.getElementById("Area1").style.height ="168px";
				document.getElementById(tempNowPanel.type + "DataBody").style.height ="168px";
			}
		}

		document.getElementById("metadata_searchTr").style.display = "";

		document.getElementById("metadata_common_search_ul").style.display = "";
		document.getElementById("metadata_item_search_ul").style.display = "none";
		$("#orgMetadataSelect option").remove();

		$("#orgMetadataSelect").append("<option value='-1'>" + $.i18n("org.post_form.name") + "</option>");
		var postMetadatas = topWindow.getDataCenter(Constants_PostMetadataTag, currentAccountId);
		if(postMetadatas.size() > 0){//枚举属性-枚举值...枚举属性-枚举值。  都是按顺序连续的。
			for(var i = 0; i < postMetadatas.size(); i++){
				var am = postMetadatas.get(i);
				var bId = am.id;
				var mt = am.enumType;
				var mName = am.name;
				if(mt == 'K' || mt == 'PK'){//枚举属性 和 岗位类型属性
					$("#orgMetadataSelect").append("<option value='" + bId + "'>" + mName + "</option>");
				}
			}
		}
	}else{
		$("#seachGroupMember").hide();
		$("#select_input_div").css("width","145px");
		// $("#select_input_div_parent").css("width","160px");
		$("#currentAccountId").css("width","143px");
		$("#q").css("width","156px");
		$("#common_search_ul").css("width","190px");//$("#q").css("width")+10+30
	}

	if(type == Constants_OrgRecent || !isGroupVer){
		$("#select_input_div").hide();
		$("#common_search_ul").width("350px");
		$("#q").width("310px");
	}else{
		$("#select_input_div").show();
	}

	var ps = findPanelsByProperty("disabledAccountSelector", true);
	disabledChanageAccountSelector(ps.contains(type));


	showSearchInput(type);

	//不能查询时则不显示"查全集团"
	if((document.getElementById("q").disabled || !checkCanSelectMember()) &&
		tempNowPanel.type != Constants_Account && tempNowPanel.type != Constants_Post){
		$("#seachGroupMember").hide();
		$("#select_input_div").css("width","145px");
		$("#currentAccountId").css("width","143px");
		$("#q").css("width","156px");
		$("#common_search_ul").css("width","190px");//$("#q").css("width")+10+30
	}

}

function showEnumItems(metadataId){
	if(metadataId == '-1'){
		document.getElementById("metadata_common_search_ul").style.display = "";
		document.getElementById("metadata_item_search_ul").style.display = "none";
	}else{
		document.getElementById("metadata_common_search_ul").style.display = "none";
		document.getElementById("metadata_item_search_ul").style.display = "";

		$("#orgMetadataItemSelect option").remove();
		$("#metadata_text_q").val("");

		var metadatas;
		if(tempNowPanel.type == Constants_Account){
			metadatas = topWindow.getDataCenter(Constants_AccountMetadataTag, currentAccountId);
		}else if(tempNowPanel.type == Constants_Post){
			metadatas = topWindow.getDataCenter(Constants_PostMetadataTag, currentAccountId);
		}
		if(metadatas){
			var firstMetadata;
			if(metadatas.size() > 0){//枚举属性-枚举值...枚举属性-枚举值。  都是按顺序连续的。
				for(var i = 0; i < metadatas.size(); i++){
					var am = metadatas.get(i);
					var bId = am.id;
					var mt = am.enumType;
					var mName = am.name;
					if(mt == 'V' && metadataId == am.parentId){//属性值
						$("#orgMetadataItemSelect").append("<option value='" + bId + "'>" + mName + "</option>");
					}
				}
			}
		}
	}

}

function showSearchInput(type){
	var _showQueryInputFun = tempNowPanel.showQueryInputFun;
	var disabledQ = true;
	var objectQ = document.getElementById("q");
	if(_showQueryInputFun){
		var _showQueryInputFunState = eval(_showQueryInputFun + "()");
		if(_showQueryInputFunState == false){
			objectQ.value = "";
		}
		disabledQ = (_showQueryInputFunState == false);
	}

	objectQ.disabled = disabledQ;
	if(!disabledQ){
		var searchAltSuf = null;
		if(type == Constants_Department){
			var dd = [];

			if(panels.size() == 1 && panels.get(0) == "Department" &&　selectTypes.size() == 1 && selectTypes.get(0) == "Post"){
				//只是查询部门下的岗位，设置副岗
				dd[dd.length++] = "Department_Post";
				currentArea2Type = Constants_Post;
			}else if(currentArea2Type == Constants_Post || currentArea2Type == Constants_Role){
				dd[dd.length++] = currentArea2Type;
			}else if(currentArea2Type == "memberMetadata"){//部门下的人员属性，不能进行搜索。
				objectQ.className = "search_input color_gray";
				// objectQ.style="background:#F8F8F8";
				objectQ.value = "-";
				objectQ.disabled = true;
				return;
			}
			else{
				if(checkCanSelect(type)){
					dd[dd.length++] = type;
				}
				if(checkCanSelectMember()){
					dd[dd.length++] = "Member";
				}
			}

			searchAltSuf = searchAlt[dd.join("_")];
		}else if(type == Constants_BusinessDepartment){
			var dd = [];
			if(currentArea2Type == Constants_BusinessRole){
				if(selectTypes.contains(Constants_BusinessRole) ){
					dd[dd.length++] = currentArea2Type;
				}
			}else if(selectTypes.contains(type) ){
				dd[dd.length++] = type;
			}

			if(checkCanSelectMember()){
				dd[dd.length++] = "Member";
			}

			searchAltSuf = searchAlt[dd.join("_")];
		}else if(type == Constants_JoinOrganization){
			var dd = [];
			if(checkCanSelect(Constants_Department)){
				dd[dd.length++] = type;
			}

			if(checkCanSelectMember()){
				dd[dd.length++] = "Member";
			}

			searchAltSuf = searchAlt[dd.join("_")];
		}

		searchAltSuf = searchAltSuf || searchAlt[type] || Constants_Component.get(type) || "";
		if(type == Constants_OrgRecent){//最近联系人
			searchAltSuf = $.i18n("selectPeople.recent.contactor.label");
		}
		if(type==Constants_Outworker && !selectTypes.contains(Constants_Member)){
			searchAltSuf = $.i18n("selectPeople.search.external");
		}
		objectQ.value = objectQ.defaultValue = $.i18n("selectPeople.search.alt", searchAltSuf);
		objectQ.className = "search_input color_gray";
		objectQ.title = $.i18n("selectPeople.search.alt", searchAltSuf);
		objectQ.style.background="#FFFFFF";
	}
	else{
		objectQ.className = "search_input color_gray";
		objectQ.style.background="#F8F8F8";
		objectQ.value = "-";
	}

	//重置元数据查询的搜索内容
	$("#metadata_text_q").val("");

}

function checkSearchAlt(checkEmpty){
	var objectQ = document.getElementById("q");
	if(objectQ.defaultValue == objectQ.value){
		objectQ.value = "";
		objectQ.className = "search_input";
	}
	if(checkEmpty && objectQ.value == ""){
		objectQ.value = objectQ.defaultValue;
		objectQ.className = "search_input color_gray";
	}
}

/**
 * ??????
 */
function showList1(type, showMode){
	clearList2();

	if(nowSelectedList1Item != null){
		nowSelectedList1Item = null;
	}

	showSeparatorDIV(type);
	document.getElementById("AreaTop1_SubInfo").style.display = "none";
	for(var i = 0; i < Constants_Panels.keys().size(); i++){
		var pn = Constants_Panels.keys().get(i);
		try{
			document.getElementById("AreaTop1_" + pn).style.display = "none";
		}
		catch(e){
		}
	}

	if(showMode == Constants_ShowMode_TREE){
		enableButton("button1");
		if (type == Constants_JoinOrganization) {
			initTree(Constants_Department, currentVjoinAccountId);
		} else if (type == Constants_JoinAccountTag) {
			initTree(type, currentVjoinAccountId);
		} else if (type == Constants_MemberMetadataTag || type == Constants_OrgMetadataTag) {
			initTree(type, currentAccountId);
		} else if (type == Constants_BusinessDepartment) {
			initTree(type, currentAccountId);
		} else  {
			initTree(type, currentAccountId);
		}
	}
	else if(showMode == Constants_ShowMode_LIST){
		disableButton("button1");
		initList(type);
	}
	else{
		log.warn("The Paramter showMode '" + showMode + "' is undefined.");
	}
}

/**
 * 显示部门下的内容：人/岗位/角色/人员属性
 */
function showList2OfDep(area2Type, keyword){
	var state;
	if(onlyLoginAccount == true){
		state = true;
	}
	else{
		state = state == null ? true : state;
	}

	if(isInternal == false && getParentWindowData("showDeptPanelOfOutworker") != true){
		state = true;
	}
	state=chanageStateFromParameter(state);

	var _flag4showSearchGroup = false;//是否显示【查全集团】临时标示
	var currentAccountIdInput = document.getElementById("currentAccountId");
	if(state == true || state == "true"){
		$('#select_input_div').prop("disabled", true).addClass("bg_color_gray");
		if(currentAccountIdInput){
			currentAccountIdInput.style.backgroundColor="#EFEDED";
		}
	}else{
		$('#select_input_div').prop("disabled", false).removeClass("bg_color_gray");
		if(currentAccountIdInput){
			currentAccountIdInput.style.backgroundColor = "";
			$('#currentAccountId').addClass("arrow_6_b");
		}
		_flag4showSearchGroup = true;
	}
	var showSearchGroup = canSearchGroup() && tempNowPanel!=null && checkCanSelectMember() && _flag4showSearchGroup;
	//显示人员时才支持在全集团范围内查询
	if(area2Type == "Member" && onlyShowChildrenAccount != true && tempNowPanel.type == Constants_Department && showSearchGroup){
		$("#seachGroupMember").show();
		$("#select_input_div").css("width","115px");
		// $("#select_input_div_parent").css("width","120px");
		$("#currentAccountId").css("width","113px");
		$("#q").css("width","106px");
		$("#common_search_ul").css("width","146px");//$("#q").css("width")+10+30

	}else{
		$("#seachGroupMember").hide();
		$("#select_input_div").css("width","145px");
		// $("#select_input_div_parent").css("width","160px");
		$("#currentAccountId").css("width","143px");
		$("#q").css("width","156px");
		$("#common_search_ul").css("width","190px");//$("#q").css("width")+10+30
	}

	$("#memberMetadataSelect").disable();
	if(area2Type == 'memberMetadata'){//
		$("#memberMetadataSelect").enable();
	}

	if(!tree.getSelected()){
		return;
	}

	var _Id = tree.getSelected().id;
	var _type = tree.getSelected().type;
	if(tempNowPanel.type == Constants_BusinessDepartment){
		_type = Constants_BusinessDepartment;
		if(area2Type == Constants_Role){
			area2Type = Constants_BusinessRole;
		}
		showList2(_type, _Id, area2Type, keyword);
		showSearchInput(Constants_BusinessDepartment);
	}else{
		showList2(_type, _Id, area2Type, keyword);
		showSearchInput(Constants_Department);
	}
}

/**
 * 显示区域2的内容
 */
function showList2(type, id, area2Type, keyword){
	clearList2();
	if(type == Constants_Account){
		if(!area2Type){
			var _seps = document.getElementsByName("sep");
			for(var i = 0; i < _seps.length; i++) {
				var _sep = _seps[i];
				if(_sep.checked){
					area2Type = _sep.value;
					break;
				}
			}
		}

		if(!checkExternalMemberWorkScope(type, id)){
			return;
		}

		if(area2Type == Constants_Member){
			//ignore
		}
		else if(area2Type == Constants_Role || area2Type == 'memberMetadata'){
			showSubOfAccount(id, area2Type, keyword);
		}
	}else if(type == Constants_BusinessAccount){
	}else if(type == Constants_Department){
		if(tempNowPanel.type == "JoinOrganization"){
			area2Type = Constants_Member
		}

		if(!area2Type){
			var _seps = document.getElementsByName("sep");
			for(var i = 0; i < _seps.length; i++) {
				var _sep = _seps[i];
				if(_sep.checked){
					area2Type = _sep.value;
					break;
				}
			}
		}

		if(area2Type == Constants_Member){
			showMember(type, id, keyword);
		}
		else{
			if(!checkExternalMemberWorkScope(type, id)){
				return;
			}

			showSubOfDepartment(id, area2Type, keyword);
		}
	}
	else if(type == Constants_BusinessDepartment){
		if(!area2Type){
			area2Type = Constants_Member;
			var _seps = document.getElementsByName("sep");
			for(var i = 0; i < _seps.length; i++) {
				var _sep = _seps[i];
				if(_sep.checked){
					if(_sep.value == Constants_Role){
						if(checkCanSelect(Constants_BusinessRole)){
							area2Type = Constants_BusinessRole;
						}else{
							area2Type = Constants_Member;
						}
					}else if(area2Type == Constants_Post){
						area2Type = Constants_Member;
					}
					break;
				}
			}
		}

		if(area2Type == Constants_Member){
			showMember(type, id, keyword);
		}
		else{
			if(!checkExternalMemberWorkScope(type, id)){
				return;
			}

			showSubOfBusinessDepartment(id, area2Type, keyword);
		}
	}
	else if(type == Constants_Node){
		showList2OfNode(type, id, keyword, "");
	}
	else if(type == Constants_FormField){
		showList2OfNode(type, id, keyword, "#");
	}else if(type == Constants_AppDoc || type == Constants_AppMeeting || type == Constants_AppMeetingSummary || type == Constants_AppBulletin || type == Constants_AppNews){//业务属性
		showList2OfAppProperty(type, id, keyword, "#");
	}
	else if(type == Constants_OfficeField){
		showList2OfNode(type, id, keyword, "");
	}else if(topWindow.Constants_Custom_Panels.keys() != null && topWindow.Constants_Custom_Panels.keys().contains(type)){
		showList2OfCustom(type, id,keyword);
	}
	else{
		showMember(type, id, keyword);
	}

	if(area2Type && (checkCanSelect(Constants_Role) || checkCanSelect(Constants_Post)) ){
		currentArea2Type = area2Type;
	}
	else{
		currentArea2Type = Constants_Member;
	}

}

/**
 * 显示/隐藏 部门树和人员列表中见的人/岗位/角色
 */
function showSeparatorDIV(type){
	for(var i = 0; i < Constants_separatorDIV.size(); i++) {
		var d = Constants_separatorDIV.get(i);
		/*		if(d == type){
			continue;
		}*/
		if(d === Constants_BusinessDepartment){
			d = Constants_Department;
		}

		document.getElementById("separatorDIV_" + d).style.display = "none";
	}

	//部门面板 选择部门
	if(type == Constants_Account){
		document.getElementById("separatorDIV_Department").style.display = "none";
	}else if((type == Constants_Department) && (checkCanSelect(Constants_Role) || checkCanSelect(Constants_Post) || checkCanSelect(Constants_OrgMetadataTag))){
		document.getElementById("separatorDIV_Department").style.display = "";
		document.getElementById("sep_per_l").style.display = "none";
		document.getElementById("sep_post_l").style.display = "none";
		document.getElementById("sep_role_l").style.display = "none";
		document.getElementById("sep_memberMetadata_l").style.display = "none";
		document.getElementById("memberMetadataSelect").style.display = "none";

		var selectedIndex = -1;
		if(checkCanSelectMember()){
			document.getElementById("sep_per_l").style.display = "";
			selectedIndex = 0;
		}

		if(currentArea2Type == Constants_Post){
			selectedIndex = 1;
		}else if(currentArea2Type == Constants_Role){
			selectedIndex = 2;
		}

		var seachGroup = !$("#seachGroupMember").is(":hidden") && $("#seachGroup").prop("checked");

		if(!seachGroup && checkCanSelect(Constants_Post) && getParentWindowData("hiddenPostOfDepartment") != true && isInternal){
			document.getElementById("sep_post_l").style.display = "";
			if(selectedIndex == -1){
				selectedIndex = 1;
			}
		}

		if(!seachGroup && checkCanSelect(Constants_Role) && getParentWindowData("hiddenRoleOfDepartment") != true && isInternal){
			document.getElementById("sep_role_l").style.display = "";
			if(selectedIndex == -1){
				selectedIndex = 2;
			}
		}

		$("#memberMetadataSelect").disable();
		var hiddenMetadataOfDepartment = getParentWindowData("hiddenMetadataOfDepartment") || false;

		//如果部门下的岗位屏蔽掉了，那么部门下的人员属性也屏蔽掉，逻辑上保持一致。要不然前台单独设置的点太多了。
		if(!hiddenMetadataOfDepartment){
			hiddenMetadataOfDepartment = getParentWindowData("hiddenPostOfDepartment") || !selectTypes.contains("Post") || false;
		}

		if(!seachGroup && !hiddenMetadataOfDepartment && checkCanSelect(Constants_Member) && isInternal && (maxSize == -1 || maxSize > 1)){
			var memberMetadatas = topWindow.getDataCenter(Constants_MemberMetadataTag, currentAccountId);
			if(memberMetadatas.size() > 1){//人员数据中第一项是 根‘人员分类’，如果只有一项，说明分类下没数据
				document.getElementById("sep_memberMetadata_l").style.display = "";
				document.getElementById("memberMetadataSelect").style.display = "";
				if(selectedIndex == -1){
					$("#memberMetadataSelect").enable();
					selectedIndex = 3;
				}
				if($("#memberMetadataSelect option").size() == 0){
					$("#memberMetadataSelect option").remove();
					for(var i = 0; i < memberMetadatas.size(); i++){
						var mm = memberMetadatas.get(i);
						var bId = mm.id;
						var bName = mm.name;
						var mt = mm.enumType;
						if(mt == 'K'){//只取枚举属性
							if($("#memberMetadataSelect option").size() == 0){
								$("#memberMetadataSelect").append("<option value='" + -1 + "'>" + "--" + $.i18n("org.member.attributes.lable") + "--" + "</option>");
							}
							$("#memberMetadataSelect").append("<option value='" + bId + "'>" + bName + "</option>");
						}
					}
				}
			}
		}

		if(selectedIndex != -1){
			document.getElementsByName("sep")[selectedIndex].checked = true;
		}
	}else if(type == Constants_BusinessDepartment && checkCanSelect(Constants_BusinessRole) ){
		document.getElementById("separatorDIV_Department").style.display = "";
		document.getElementById("sep_per_l").style.display = "none";
		document.getElementById("sep_post_l").style.display = "none";
		document.getElementById("sep_role_l").style.display = "none";
		document.getElementById("sep_memberMetadata_l").style.display = "none";
		document.getElementById("memberMetadataSelect").style.display = "none";
		var selectedIndex = -1;
		if(checkCanSelectMember()){
			document.getElementById("sep_per_l").style.display = "";
			selectedIndex = 0;
		}

		document.getElementById("sep_post_l").style.display = "none";

		if(checkCanSelect(Constants_BusinessRole) && getParentWindowData("hiddenRoleOfDepartment") != true){
			document.getElementById("sep_role_l").style.display = "";
			if(selectedIndex == -1){
				selectedIndex = 2;
			}
		}

		if(selectedIndex != -1){
			document.getElementsByName("sep")[selectedIndex].checked = true;
		}
	}
	else if(type == Constants_Team && checkCanSelect(Constants_Member)){ //组面板
		document.getElementById("separatorDIV_" + type).style.display = "";
	}
	else if(type == Constants_Post && checkCanSelect(Constants_Post)){ //岗位组面板
		document.getElementById("separatorDIV_" + type).style.display = "";
	}
}

/**
 * 选中"查全集团"时, 不显示岗位、角色; 反之显示.
 */
function hideSeparatorDIV(obj){
	if(obj && obj.checked){
		if(!$("#sep_post_l").is(":hidden")){
			$("#sep_post_l").hide();
		}
		if(!$("#sep_role_l").is(":hidden")){
			$("#sep_role_l").hide();
		}
		if(!$("#sep_memberMetadata_l").is(":hidden")){
			$("#sep_memberMetadata_l").hide();
			$("#memberMetadataSelect").hide();
		}
	}else{
		showSeparatorDIV(Constants_Department);
	}
}

/**
 * 在Area2显示部门下的岗位
 */
function showSubOfDepartment(departmentId, subType, keyword){
	var department = topWindow.getObject(Constants_Department, departmentId);
	if(!department){
		return;
	}

	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	if(subType == 'memberMetadata'){
		if(keyword == '-1' || keyword == undefined){
			keyword = $('#memberMetadataSelect option:selected').val();
		}
		//取人员自定义枚举属性值
		var memberMetadatas = topWindow.getDataCenter(Constants_MemberMetadataTag, currentAccountId);
		var _type = Constants_OrgMetadataTag;
		if(memberMetadatas.size() > 0){
			for(var i = 0; i < memberMetadatas.size(); i++){
				var mm = memberMetadatas.get(i);
				var bId = mm.id + "_" + departmentId;
				var mt = mm.enumType;
				if(mt == 'V' && mm.parentId == keyword){//只取枚举属性值
					var mName = mm.name;
					if(!v3x.getBrowserFlag('selectPeopleShowType')){
						selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + mName.escapeHTML(true) + "\" value='").append(bId).append("' type='").append(_type).append("'>").append(mName.escapeHTML(true)).append("</div>");

					}else{
						selectHTML.append("<option title=\"" + mName.escapeSpace() + "\" value='").append(bId).append("' type='").append(_type).append("'>").append(mName.escapeSpace()).append("</option>");
					}
				}
			}
		}

	}else{
		var entites = eval("department.get" + subType + "s()");
		if(entites){
			for(var i = 0; i < entites.size(); i++) {
				var entity = entites.get(i);

				if(entity == null){
					continue;
				}

				if(keyword && entity.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				var _id = departmentId + valuesJoinSep + entity.id;
				var _type = Constants_Department + valuesJoinSep + subType;
				//该数据不显示
				if(excludeElements.contains(_type + _id)){
					continue;
				}

				var text = null;
				var showTitle = "";
				if(entity.code){
					text = entity.name.getLimitLength(nameMaxLength.two[0]);
					if(text != entity.name){
						showTitle = entity.name.escapeSpace();
					}
					text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
					text += entity.code;
				}
				else{
					text = entity.name;
				}


				if(!v3x.getBrowserFlag('selectPeopleShowType')){
					selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + showTitle.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

				}else{
					selectHTML.append("<option title=\"" + showTitle.escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
				}

			}
		}

	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}

/**
 * 在Area2显示部门下的岗位
 */
function showSubOfBusinessDepartment(departmentId, subType, keyword){
	var businessDepartment = topWindow.getObject(Constants_BusinessDepartment, departmentId);
	if(!businessDepartment){
		return;
	}

	var entites = eval("businessDepartment.get" + subType + "s()");
	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	if(entites){
		for(var i = 0; i < entites.size(); i++) {
			var entity = entites.get(i);

			if(entity == null){
				continue;
			}

			if(keyword && entity.name.toLowerCase().indexOf(keyword) < 0){
				continue;
			}

			var _id = departmentId + valuesJoinSep + entity.id;
			var _type = Constants_BusinessDepartment + valuesJoinSep + subType;
			//该数据不显示
			if(excludeElements.contains(_type + _id)){
				continue;
			}

			var text = null;
			var showTitle = "";
			if(entity.code){
				text = entity.name.getLimitLength(nameMaxLength.two[0]);
				if(text != entity.name){
					showTitle = entity.name.escapeSpace();
				}
				text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
				text += entity.code;
			}
			else{
				text = entity.name;
			}


			if(!v3x.getBrowserFlag('selectPeopleShowType')){
				selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + showTitle.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

			}else{
				selectHTML.append("<option title=\"" + showTitle.escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
			}

		}
	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}

/**
 * 在单位下查询所有的部门-岗位 关系（用于支持搜索副岗）
 */
function showDepartmentPostOfAccount(accountId, subType, keyword){
	if(keyword == arrayJoinSep){
		return;
	}

	var account = topWindow.getObject(Constants_Account, accountId);
	if(!account){
		return;
	}

	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	var departments = topWindow.getDataCenter(Constants_Department,accountId);
	for(var d = 0; d < departments.size(); d++) {
		var department = departments.get(d);
		if(!department){
			return;
		}
		var departmentId = department.id;
		var departmentName = department.name;
		var entites = eval("department.get" + subType + "s()");

		if(entites){
			for(var i = 0; i < entites.size(); i++) {
				var entity = entites.get(i);

				if(entity == null){
					continue;
				}

				var deptPostName = departmentName + arrayJoinSep + entity.name;
				if(keyword && deptPostName.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				var _id = departmentId + valuesJoinSep + entity.id;
				var _type = Constants_Department + valuesJoinSep + subType;
				//该数据不显示
				if(excludeElements.contains(_type + _id)){
					continue;
				}

				var text = null;
				var showTitle = "";
				if(entity.code){
					text = entity.name.getLimitLength(nameMaxLength.two[0]);
					if(text != entity.name){
						showTitle = entity.name.escapeSpace();
						showTitle = departmentName + arrayJoinSep + showTitle;
					}
					text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
					text += entity.code;
				}
				else{
					text = entity.name;
				}

				text = departmentName + arrayJoinSep + text;

				if(!v3x.getBrowserFlag('selectPeopleShowType')){
					selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + showTitle.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

				}else{
					selectHTML.append("<option title=\"" + showTitle.escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
				}

			}
		}
	}


	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}


/**
 * 在Area2显示单位下的岗位
 */
function showSubOfAccount(accountId, subType, keyword){
	var entites = topWindow.getCustomerAccountRole(accountId);
	if(!entites){
		return;
	}

	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	if(subType == 'memberMetadata'){
		if(keyword == '-1' || keyword == undefined){
			keyword = $('#memberMetadataSelect option:selected').val();
		}
		//取人员自定义枚举属性值
		var memberMetadatas = topWindow.getDataCenter(Constants_MemberMetadataTag, currentAccountId);
		var _type = Constants_OrgMetadataTag;
		if(memberMetadatas.size() > 0){
			for(var i = 0; i < memberMetadatas.size(); i++){
				var mm = memberMetadatas.get(i);
				var bId = mm.id;
				var mt = mm.enumType;
				if(mt == 'V' && mm.parentId == keyword){//只取枚举属性值
					var mName = mm.name;
					if(!v3x.getBrowserFlag('selectPeopleShowType')){
						selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + mName.escapeHTML(true) + "\" value='").append(bId).append("' type='").append(_type).append("'>").append(mName.escapeHTML(true)).append("</div>");

					}else{
						selectHTML.append("<option title=\"" + mName.escapeSpace() + "\" value='").append(bId).append("' type='").append(_type).append("'>").append(mName.escapeSpace()).append("</option>");
					}
				}
			}
		}

	}else if(entites){
		for(var i = 0; i < entites.length; i++) {
			var entity = entites[i];

			if(entity == null){
				continue;
			}

			if(keyword && entity.name.toLowerCase().indexOf(keyword) < 0){
				continue;
			}

			var _id = accountId + valuesJoinSep + entity.id;
			var _type = Constants_Account + valuesJoinSep + Constants_Role;

			var text = null;
			var showTitle = "";
			if(entity.code){
				text = entity.name.getLimitLength(nameMaxLength.two[0]);
				if(text != entity.name){
					showTitle = entity.name.escapeSpace();
				}
				text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
				text += entity.code;
			}
			else{
				text = entity.name;
			}


			if(!v3x.getBrowserFlag('selectPeopleShowType')){
				selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + showTitle.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

			}else{
				selectHTML.append("<option title=\"" + showTitle.escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
			}

		}
	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}

function showList2OfNode(type, id, keyword, sp){
	var node = topWindow.getObject(type, id, currentAccountId);
	if(!node){
		return;
	}

	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	var showBusinessOrg = false;
	var businessId = -1;
	if(canShowBusinessOrg && (type == Constants_Node || type == Constants_FormField)){
		var businessId = $("#areaTopList1_SubInfo").val();
		if(businessId != -1 && businessId != null){
			showBusinessOrg = true;
		}
	}
	var entites = node.getRoles();//行政组织下的角色
	if(showBusinessOrg){
		entites = new ArrayList();
		var roles = topWindow.getDataCenter(Constants_BusinessRole, currentAccountId);
		for(var i=0;i<roles.size();i++){
			var role = roles.get(i);
			if(businessId == role.businessId){
				entites.add(role);
			}
		}
	}

	if(entites){
		var notShowAccountRole = getParentWindowData("notShowAccountRole") || false;
		var notShowMetadataRole = getParentWindowData("notShowMetadataRole") || false;
		for(var i = 0; i < entites.size(); i++) {
			var entity = entites.get(i);

			if(entity == null){
				continue;
			}

			if(notShowMetadataRole){
				if(entity.K.indexOf("MemberMetadataRole") != -1){
					continue;
				}
			}

			if(showBusinessOrg){//多维组织角色
				if(keyword && entity.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				//相对角色 发起者,上节点,发起者上级部门，发起者主管各部门，发起者分管各部门，上节点上级部门， 上节点主管各部门，上节点分管各部门  下，显示多维组织部门角色
				if(type == Constants_Node
					&& id!="Sender" && id!="NodeUser" && id!="SenderSuperDept" && id!="SenderManageDep" && id!="SenderLeaderDep"
					&& id!="NodeUserSuperDept" && id!="NodeUserManageDep" && id!="NodeUserLeaderDep"
					&& id!="CurrentNode"){
					continue;
				}

				//表单控件中，只有选人，多选人，显示多维组织角色
				if(type == Constants_FormField && id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0){
					continue;
				}

				var _type = type;
				var _id = node.id + sp + entity.id;

				//该数据不显示
				if(excludeElements.contains(_type + _id) || !checkIncludeElements(_type, _id)){
					continue;
				}

				var text = entity.name;
				var preShow = entity.preShow;

				if(!v3x.getBrowserFlag('selectPeopleShowType')){
					selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + text.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

				}else{
					selectHTML.append("<option title=\"" + (preShow +"-"+ node.name + text).escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
				}

			}else{//行政组织下的角色
				if(keyword && entity.N.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				//相对角色下，发起者，上节点，发起者上级单位，上节点上级单位,当前节点，当前节点上级单位 下显示：集团定义的角色
				if(type=="Node" && id!="Sender" && id!="NodeUser" && id!="SenderSuperAccount" && id!="NodeUserSuperAccount" && id!="CurrentNode" && id!="CurrentNodeSuperAccount" && entity.T==2 && entity.B==1){
					continue;
				}

				//相对角色下， 发起者上级单位，上节点上级单位,当前节点上级单位  下只显示：集团定义的角色
				if(type=="Node" && (id=="SenderSuperAccount" || id=="NodeUserSuperAccount" || id=="CurrentNodeSuperAccount") && entity.B!=1){
					continue;
				}

				//相对角色发起者或者上节点下，显示汇报人。
				if(type=="Node" && id!="Sender" && id!="NodeUser" && id!="CurrentNode" && entity.K.indexOf("ReciprocalRoleReporter")>=0){
					continue;
				}

				//相对角色发起者或者上节点下，显示人员的自定义元数据（选人）信息。
				if(type=="Node" && id!="Sender" && id!="NodeUser" && id!="CurrentNode" && entity.K.indexOf("MemberMetadataRole")>=0){
					continue;
				}

				//表单控件中，只有选人和多选人时，显示汇报人
				if(type == Constants_FormField && id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0 && entity.K.indexOf("ReciprocalRoleReporter")>=0){
					continue;
				}

				//表单控件中，只有选人，多选人，单位，多单位时，显示单位角色
				if(type == Constants_FormField
					&& id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0
					&& id.toLowerCase().indexOf("multiaccount@field")<0 && id.toLowerCase().indexOf("account@field")<0
					&& id.toLowerCase().indexOf("accountanddepartment@field")<0
					&& entity.T==2 && entity.B==1){
					continue;
				}

				//表单控件中，只有单位，多单位时，只显示单位角色
				if(type == Constants_FormField
					&& (id.toLowerCase().startsWith("multiaccount@field") || id.toLowerCase().startsWith("account@field"))
					&& entity.B!=1){
					continue;
				}

				//表单控件中，只有选人，多选人时，显示人员的自定义元数据（选人）信息。
				if(type == Constants_FormField
					&& id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0
					&& entity.K.indexOf("MemberMetadataRole")>=0){
					continue;
				}

				//如果设置了不显示单位角色，直接跳过
				if(type == Constants_FormField && entity.T==2 && entity.B==1 && notShowAccountRole){
					continue;
				}
				var _type = type;
				var _id = node.id + sp + entity.K;

				//该数据不显示
				if(excludeElements.contains(_type + _id) || !checkIncludeElements(_type, _id)){
					continue;
				}

				var text = entity.N;

				if(!v3x.getBrowserFlag('selectPeopleShowType')){
					selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + text.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

				}else{
					selectHTML.append("<option title=\"" + (node.name + text).escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
				}
			}

		}
	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}


function showList2OfAppProperty(type, id, keyword, sp){
	var node = topWindow.getObject(type, id, currentAccountId);
	if(!node){
		return;
	}

	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}
	var entites = node.getRoles();//角色

	if(entites){
		var notShowAccountRole = getParentWindowData("notShowAccountRole") || false;
		for(var i = 0; i < entites.size(); i++) {
			var entity = entites.get(i);

			if(entity == null){
				continue;
			}

			if(keyword && entity.N.toLowerCase().indexOf(keyword) < 0){
				continue;
			}

			//表单控件中，只有选人和多选人时，显示汇报人
			if(type == Constants_FormField && id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0 && entity.K.indexOf("ReciprocalRoleReporter")>=0){
				continue;
			}

			//表单控件中，只有选人，多选人，单位，多单位时，显示单位角色
			if(type == Constants_FormField
				&& id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0
				&& id.toLowerCase().indexOf("multiaccount@field")<0 && id.toLowerCase().indexOf("account@field")<0
				&& id.toLowerCase().indexOf("accountanddepartment@field")<0
				&& entity.T==2 && entity.B==1){
				continue;
			}

			//表单控件中，只有单位，多单位时，只显示单位角色
			if(type == Constants_FormField
				&& (id.toLowerCase().startsWith("multiaccount@field") || id.toLowerCase().startsWith("account@field"))
				&& entity.B!=1){
				continue;
			}

			//表单控件中，只有选人，多选人时，显示人员的自定义元数据（选人）信息。
			if(type == Constants_FormField
				&& id.toLowerCase().indexOf("multimember@field")<0 && id.toLowerCase().indexOf("member@field")<0
				&& entity.K.indexOf("MemberMetadataRole")>=0){
				continue;
			}

			//如果设置了不显示单位角色，直接跳过
			if(type == Constants_FormField && entity.T==2 && entity.B==1 && notShowAccountRole){
				continue;
			}
			var _type = type;
			var _id = node.id + sp + entity.K;

			//该数据不显示
			if(excludeElements.contains(_type + _id) || !checkIncludeElements(_type, _id)){
				continue;
			}

			var text = entity.N;

			if(!v3x.getBrowserFlag('selectPeopleShowType')){
				selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title=\"" + text.escapeHTML(true) + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeHTML(true)).append("</div>");

			}else{
				selectHTML.append("<option title=\"" + (node.name + text).escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(text.escapeSpace()).append("</option>");
			}

		}
	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}


function showList2OfCustom(type, id,keyword){
	var custom = topWindow.getObject(type, id, currentAccountId);
	if(!custom){
		return;
	}

	var entites = custom.getRelationData();
	var selectHTML = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		selectHTML.append(memberDataBody_div);
	}else{
		selectHTML.append(select2_tag_prefix);
	}

	var customPanel = topWindow.Constants_Custom_Panels.get(type);

	var area2SelectMode  = customPanel.area2SelectMode;
	var sp = customPanel.sp;

	if(entites){
		for(var i = 0; i < entites.size(); i++) {
			var entity = entites.get(i);

			if(entity == null){
				continue;
			}

			if(keyword && entity.N.toLowerCase().indexOf(keyword) < 0){
				continue;
			}

			var _type = type;
			var _id = custom.id + sp + entity.K;

			//该数据不显示
			if(excludeElements.contains(_type + _id) || !checkIncludeElements(_type, _id)){
				continue;
			}

			var _text = custom.name + entity.N;

			//区域2的内容单独选择
			if(area2SelectMode == 'SINGLE'){
				_type = (entity.T == undefined || entity.T == null) ? type : entity.T;
				_id = entity.K;
				_text = entity.N;
			}

			selectHTML.append("<option title=\"" + _text.escapeSpace() + "\" value='").append(_id).append("' type='").append(_type).append("'>").append(entity.N.escapeSpace()).append("</option>");
		}
	}

	selectHTML.append(select2_tag_subfix);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}

/**
 * 显示组的关联人员
 */
function showTeamRelativeMembers(){
	var id = Constants_Team + "DataBody";
	var dataBody = document.getElementById(id);
	if(dataBody){
		var s = dataBody.value;
		if(s){
			tempNowSelected.clear();
			clearList2();
			addTeamMember2List2(s);

			selectList1Item(Constants_Team, dataBody);
		}
	}
}

/**
 * ??member???header
 */
function showMemberTitle(type){
	var name = "";

	if(type == Constants_Department){//
		name = Constants_Component.get(Constants_Post);
	}
	else if(type == Constants_Role){

	}
	else{ //
		name = Constants_Component.get(Constants_Department);
	}

	document.getElementById("memberTitle2").innerHTML = "&nbsp;" + name;
}

function getFormFieldListHTMLStr(keyword,selectSubDataId){

	var id = Constants_FormField + "DataBody";
	var datas = topWindow.getDataCenter(Constants_FormField);
	var size = tempNowPanel.isShowMember && checkCanSelectMember()&& checkIsShowArea2() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;

	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_FormField + "', this)\" ondblclick=\"selectOne('" + Constants_FormField + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");

	if(datas){
		//var postTypeId = document.getElementById("areaTopList1").value;
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);

			if(canShowBusinessOrg){
				if(selectSubDataId && selectSubDataId != -1){
					if(item.id.toLowerCase().indexOf("multimember@field")<0 && item.id.toLowerCase().indexOf("member@field")<0){
						continue;
					}
				}

			}
			var name = item.name || "";
			try{
				if(keyword && name.toLowerCase().indexOf(keyword) == -1){
					continue ;
				}
				html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_FormField).append("\">").append(name.escapeHTML(true)).append("</option>");
			}
			catch(e){
				log.error("", e);
			}
		}
	}

	html.append("</select>");

	return html.toString();
}

function getAppPropertyListHTMLStr(keyword,selectSubDataId){
	var id = Constants_AppProperty + "DataBody";
	var datas = null;
	if(selectSubDataId){
		datas = topWindow.getDataCenter(selectSubDataId);
	}
	var size = tempNowPanel.isShowMember && checkCanSelectMember()&& checkIsShowArea2() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;

	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + selectSubDataId + "', this)\" ondblclick=\"selectOne('" + selectSubDataId + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");

	if(datas){
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);
			var name = item.name || "";
			try{
				if(keyword && name.toLowerCase().indexOf(keyword) == -1){
					continue ;
				}
				html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(selectSubDataId).append("\">").append(name.escapeHTML(true)).append("</option>");
			}
			catch(e){
				log.error("", e);
			}
		}
	}

	html.append("</select>");

	return html.toString();
}


function getWFDynamicFormListHTMLStr(keyword){
	var id = Constants_WFDynamicForm + "DataBody";
	var datas = topWindow.getDataCenter(Constants_WFDynamicForm);
	var size = tempNowPanel.isShowMember && checkCanSelectMember()&& checkIsShowArea2() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;
	size = size -50;
	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_FormField + "', this)\" ondblclick=\"selectOne('" + Constants_FormField + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");

	if(datas){

		var _FID = document.getElementById("areaTopList1_WFDynamicForm").value;
		var isNeedInitAreaTopList1 = false;



		var FO = {};
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);
			var name = item.name || "";

			FO[item.formId] = item.formName;

			try{
				if(keyword && name.toLowerCase().indexOf(keyword) == -1){
					continue ;
				}
				if(!_FID){
					_FID = item.formId;
					isNeedInitAreaTopList1 = true;
				}

				if(_FID != item.formId){
					continue;
				}
				html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_WFDynamicForm).append("\">").append(name.escapeHTML(true)).append("</option>");
			}
			catch(e){
				log.error("", e);
			}
		}


		if(isNeedInitAreaTopList1){
			var topHtml = new StringBuffer();
			for(var i in FO){
				var topId = i;
				var topName = FO[i];
				topHtml.append("<option title=\"" + topName.escapeHTML(true) + "\" value=\"").append(topId).append("\" type=\"").append(Constants_WFDynamicForm).append("\">").append(topName.escapeHTML(true)).append("</option>");
			}
			document.getElementById("areaTopList1_WFDynamicForm").innerHTML = topHtml.toString();
		}
	}

	html.append("</select>");

	return html.toString();
}


function getOfficeFieldListHTMLStr(keyword){
	var id = Constants_OfficeField + "DataBody";
	var datas = topWindow.getDataCenter(Constants_OfficeField);
	var size = tempNowPanel.isShowMember && checkCanSelectMember() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;

	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_OfficeField + "', this)\" ondblclick=\"selectOne('" + Constants_OfficeField + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");

	if(datas){
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);
			var name = item.name || "";
			try{
				if(keyword && name.toLowerCase().indexOf(keyword) == -1){
					continue ;
				}
				html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_OfficeField).append("\">").append(name.escapeHTML(true)).append("</option>");
			}
			catch(e){
				log.error("", e);
			}
		}
	}

	html.append("</select>");

	return html.toString();
}

function getRoleListHtmlStr(keyword, selectAccountId){
	var id = Constants_Role + "DataBody";
	var datas = topWindow.getDataCenter(Constants_Role, selectAccountId);
	var size = tempNowPanel.isShowMember && checkCanSelectMember() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;

	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Role + "', this)\" ondblclick=\"selectOne('" + Constants_Role + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");

	if(datas){
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);
			var name = item.name || "";

			var id = item.id;
			var realId = item.realId;
			if(id != realId){
				continue;
			}

			if(keyword && name.toLowerCase().indexOf(keyword) == -1){
				continue ;
			}

			var value = item.realId;
			var bond = item.bond;


			var showRoleType = getParentWindowData("showRoleType") || "";
			if(showRoleType == "Account"){
				if(bond != 1){
					continue;
				}
			}else if(showRoleType == "Department"){
				if(bond != 2){
					continue;
				}
			}

			var externalType = item.externalType;

			if(externalType != 0){
				name += $.i18n("selectPeople.out.title");
			}
			name += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - name.getBytesLength());
			if(externalType == 0){
				if(bond == 1){
					name += $.i18n("selectPeople.accountRole.title");
				}else if(bond == 2){
					name += $.i18n("selectPeople.departmentRole.title");
				}
			}else if(externalType == 1){
				name += $.i18n("selectPeople.joinUnitRole.title");
			}else if(externalType == 2){
				name += $.i18n("selectPeople.joinAccountRole.title");
			}

			html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(value).append("\" type=\"").append(Constants_Role).append("\">").append(name.escapeHTML(true)).append("</option>");
		}
	}

	html.append("</select>");

	return html.toString();
}

function getCustomFieldListHTMLStr(type,keyword){
	var customPanel = topWindow.Constants_Custom_Panels.get(type);
	var id = type+"DataBody";
	var datas = topWindow.getDataCenter(type);
	var size =  customPanel.isShowArea2 == 'true' ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;
	//size = size - 50;
	var html = new StringBuffer();
	html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + type + "', this)\" ondblclick=\"selectOne('" + type + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
	if(datas){
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i);
			var name = item.name || "";
			try{
				if(keyword && name.toLowerCase().indexOf(keyword) == -1){
					continue ;
				}
				html.append("<option title=\"" + name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(type).append("\">").append(name.escapeHTML(true)).append("</option>");
			}
			catch(e){
				log.error("", e);
			}
		}
	}

	html.append("</select>");

	return html.toString();
}
/**
 *
 */
function initList(type, keyword, selectSubDataId, metadataId){
//	var startTime = new Date().getTime();

	var id = type + "DataBody";

	if(document.getElementById("AreaTop1_" + type)){
		document.getElementById("AreaTop1_" + type).style.display = "";
	}else if(canShowBusinessOrg){//显示多维组织信息
		if(type == Constants_Node || type == Constants_FormField || type == Constants_BusinessRole){
			var businessAccounts = new ArrayList();
			var allBusinessAccounts = topWindow.getDataCenter(Constants_BusinessAccount, currentAccountId);
			var currentBusinessAccount = getParentWindowData("currentBusinessAccount");
			if(!isAdmin){
				var alwaysShowBusiness = getParentWindowData("alwaysShowBusiness") || "";
				for (var i = 0; i < allBusinessAccounts.size(); i++) {
					var ba = allBusinessAccounts.get(i);
					var isPublic = ba.isPublic;
					if(isPublic == true || isPublic == 'true' || alwaysShowBusiness.indexOf(ba.id)>=0 ){//公开的业务线都能看见
						businessAccounts.add(ba);
					}else if(currentBusinessAccount && currentBusinessAccount == ba.id){//指定了业务线，那就显示这个业务线。
						businessAccounts.add(ba);
					}else{
						var memberIds = ba.memberIds;//私有的业务线只有业务线内的人可见
						if(memberIds.indexOf(currentMemberId.toString())>=0){
							businessAccounts.add(ba);
						}
					}
				}
			}else{
				businessAccounts = allBusinessAccounts;
			}

			$("#areaTopList1_SubInfo option").remove();
			if((type == Constants_Node || type == Constants_FormField) && loginAccountId == currentAccountId){
				$("#areaTopList1_SubInfo").append("<option value='-1'>行政组织</option>");
				if(!selectSubDataId){
					selectSubDataId = -1;
				}
			}else{
				if(!selectSubDataId && businessAccounts.size() > 0){
					if(currentBusinessAccount){
						selectSubDataId = currentBusinessAccount;
					}else{
						selectSubDataId = businessAccounts.get(0).id;
					}
				}
			}

			for(var i = 0; i < businessAccounts.size(); i++){
				var ba = businessAccounts.get(i);
				var bId = ba.id;
				var bName = ba.name;

				if(!selectSubDataId){
					selectSubDataId = bId;
				}
				if(selectSubDataId == bId){
					$("#areaTopList1_SubInfo").append("<option value='" + bId + "' selected='selected'>" + bName + "</option>");
				}else{
					$("#areaTopList1_SubInfo").append("<option value='" + bId + "'>" + bName + "</option>");
				}
			}

			if(businessAccounts.size() == 0 && loginAccountId != currentAccountId){
				document.getElementById("AreaTop1_SubInfo").style.display = "none";
			}else{
				document.getElementById("AreaTop1_SubInfo").style.display = "";
			}

			reArea_1_2();
		}

	}

	var str = null;
	if(type == Constants_Team){
		str = getTeamListHTMLStr(keyword);
	}
	else if(type == Constants_Post || type == Constants_JoinPost){
		clearList2();
		if (type == Constants_JoinPost) {
			if(isV5Member && !isInternal){
			}else{
				str = getPostListHTMLStr(keyword, currentVjoinAccountId, false);
			}
		} else {
			str = getPostListHTMLStr(keyword, currentAccountId, true);
		}
	}else if(type == Constants_Account){
		clearList2();
		str = getAccountListHTMLStr(keyword, metadataId,true);
	}else if(type == Constants_Guest){
		clearList2();
		str = getGuestListHTMLStr(keyword, currentAccountId);
	}
	else if(type == Constants_RelatePeople){
		str = getRelatePeopleListHTMLStr(keyword,currentAccountId);
	}
	else if(type == Constants_OrgRecent){
		clearList2();
		str = getOrgRecentHTMLStr(keyword,currentAccountId);
	}
	else if(type == Constants_FormField){
		clearList2();
		str = getFormFieldListHTMLStr(keyword,selectSubDataId);
	}
	else if(type == Constants_WFDynamicForm){
		clearList2();
		str = getWFDynamicFormListHTMLStr(keyword);
	}
	else if(type == Constants_OfficeField){
		clearList2();
		str = getOfficeFieldListHTMLStr(keyword);
	}
	else if(type == Constants_Role){
		clearList2();
		str = getRoleListHtmlStr(keyword, currentAccountId);
	}else if(topWindow.Constants_Custom_Panels.keys() != null && topWindow.Constants_Custom_Panels.keys().contains(type)){//自定义页签的列表展示
		clearList2();
		str = getCustomFieldListHTMLStr(type,keyword);
	}else if(type == Constants_AppProperty){//业务属性
		var businessAccounts = new ArrayList();
		$("#areaTopList1_SubInfo option").remove();

		var i = 0;
		//文档
		var appDocs = topWindow.getDataCenter(Constants_AppDoc, currentAccountId);
		if(appDocs && appDocs.size()>0){
			if((i == 0 && !selectSubDataId) || (selectSubDataId == Constants_AppDoc)){
				selectSubDataId = Constants_AppDoc;
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppDoc + "' selected='selected'>" + $.i18n("selectPeople.app.doc.label") + "</option>");
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppDoc + "'>" +  $.i18n("selectPeople.app.doc.label") + "</option>");
			}
			i++;
		}
		//会议
		var appMeetings = topWindow.getDataCenter(Constants_AppMeeting, currentAccountId);
		if(appMeetings && appMeetings.size()>0){
			if((i == 0 && !selectSubDataId) || (selectSubDataId == Constants_AppMeeting)){
				selectSubDataId = Constants_AppMeeting;
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppMeeting + "' selected='selected'>" +  $.i18n("selectPeople.app.meeting.label") + "</option>");
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppMeeting + "'>" + $.i18n("selectPeople.app.meeting.label") + "</option>");
			}
			i++;
		}
		//会议纪要
		var appMeetingSummaries = topWindow.getDataCenter(Constants_AppMeetingSummary, currentAccountId);
		if(appMeetingSummaries && appMeetingSummaries.size()>0){
			if((i == 0 && !selectSubDataId) || (selectSubDataId == Constants_AppMeetingSummary)){
				selectSubDataId = Constants_AppMeetingSummary;
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppMeetingSummary + "' selected='selected'>" + $.i18n("selectPeople.app.meetingsummary.label") + "</option>");
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppMeetingSummary + "'>" + $.i18n("selectPeople.app.meetingsummary.label") + "</option>");
			}
			i++;
		}
		//公告
		var appBulletins = topWindow.getDataCenter(Constants_AppBulletin, currentAccountId);
		if(appBulletins && appBulletins.size()>0){
			if((i == 0 && !selectSubDataId) || (selectSubDataId == Constants_AppBulletin)){
				selectSubDataId = Constants_AppBulletin;
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppBulletin + "' selected='selected'>" + $.i18n("selectPeople.app.bulletin.label") + "</option>");
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppBulletin + "'>" + $.i18n("selectPeople.app.bulletin.label") + "</option>");
			}
			i++;
		}

		//新闻
		var appNews = topWindow.getDataCenter(Constants_AppNews, currentAccountId);
		if(appNews && appNews.size()>0){
			if((i == 0 && !selectSubDataId) || (selectSubDataId == Constants_AppNews)){
				selectSubDataId = Constants_AppNews;
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppNews + "' selected='selected'>" + $.i18n("selectPeople.app.news.label") + "</option>");
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + Constants_AppNews + "'>" + $.i18n("selectPeople.app.news.label") + "</option>");
			}
			i++;
		}

		if(i == 0){
			document.getElementById("AreaTop1_SubInfo").style.display = "none";
		}else{
			document.getElementById("AreaTop1_SubInfo").style.display = "";
		}

		reArea_1_2();

		clearList2();
		str = getAppPropertyListHTMLStr(keyword,selectSubDataId);
	}
	else{
		var _selectType = "";
		var _accountId = "";
		var datas = new ArrayList();
		if (type == Constants_JoinAccount) {
			_selectType = Constants_Department;
			_accountId = currentVjoinAccountId;
			if(isV5Member && !isInternal){
			}else{
				datas = topWindow.getDataCenter(_selectType, _accountId);
			}
		}else if(type == Constants_BusinessAccount){
			_selectType = type;
			_accountId = currentAccountId;
			var allBusinessAccounts = topWindow.getDataCenter(type, _accountId);
			if(!isAdmin){
				var alwaysShowBusiness = getParentWindowData("alwaysShowBusiness") || "";
				for (var i = 0; i < allBusinessAccounts.size(); i++) {
					var ba = allBusinessAccounts.get(i);
					var isPublic = ba.isPublic;
					if(isPublic == true || isPublic == 'true' || alwaysShowBusiness.indexOf(ba.id)>=0 ){//公开的业务线都能看见
						datas.add(ba);
					}else{
						var memberIds = ba.memberIds;//私有的业务线只有业务线内的人可见
						if(memberIds.indexOf(currentMemberId.toString())>=0){
							datas.add(ba);
						}
					}
				}
			}else{
				datas = allBusinessAccounts;
			}

		}else if(type == Constants_BusinessRole){
			_selectType = type;
			_accountId = currentAccountId;
			datas = new ArrayList();
			var businessRoles = topWindow.getDataCenter(type, _accountId);
			for(var i = 0;i<businessRoles.size();i++){
				var businessRole = businessRoles.get(i);
				if(businessRole.businessId == selectSubDataId){
					datas.add(businessRole);
				}
			}

		}else if(type == Constants_Node || type == Constants_FormField){
			_selectType = type;
			_accountId = currentAccountId;
			datas = new ArrayList();
			if(selectSubDataId && selectSubDataId != -1){
				datas = new ArrayList();
				var tempDatas = topWindow.getDataCenter(_selectType, _accountId);
				for(var i = 0;i<tempDatas.size();i++){
					var td = tempDatas.get(i);
					//多维角色相对角色只显示  发起者,上节点,发起者上级部门，发起者主管各部门，发起者分管各部门，上节点上级部门， 上节点主管各部门，上节点分管各部门，当前节点
					if(td.id == "Sender" || td.id == "NodeUser" || td.id == "SenderSuperDept" || td.id == "SenderManageDep" || td.id == "SenderLeaderDep"
						|| td.id == "NodeUserSuperDept" || td.id == "NodeUserManageDep" || td.id == "NodeUserLeaderDep"
						|| td.id == "CurrentNode"){
						datas.add(td);
					}
				}
			}else{
				_selectType = type;
				_accountId = loginAccountId;
				datas = topWindow.getDataCenter(_selectType, _accountId);
			}
		}
		else {
			_selectType = type;
			_accountId = currentAccountId;
			datas = topWindow.getDataCenter(_selectType, _accountId);
		}

		var size = tempNowPanel.isShowMember && checkCanSelectMember() && !isRootAccount() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;
		var html = new StringBuffer();
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + _selectType + "', this)\" ondblclick=\"selectOne('" + _selectType + "', this)\" multiple style='padding-top: 2px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
		}else{
			var classStr = tempNowPanel.isShowMember && checkCanSelectMember() ? 'team-list' : 'relatePeople-list';
			html.append("<div id=\"" + id + "\"  class=\""+classStr+"\">");
		}

		if(datas){
			var secondPostDepartmentPaths = null;
			if(currentMember){
				secondPostDepartmentPaths = new ArrayList();
				secondPostDepartmentPaths.add(currentMember.getDepartment().path);

				var departIds = currentMember.getSecondPost().keys();
				for(var i = 0; i < departIds.size(); i++) {
					var department = topWindow.getObject(Constants_Department, departIds.get(i));
					if(department){
						secondPostDepartmentPaths.add(department.path);
					}
				}
			}

			var showAdminTypes = new ArrayList();
			if(getParentWindowData("showAdminTypes", "")){
				showAdminTypes.addAll(getParentWindowData("showAdminTypes", "").split(","));
			}

			var notShowMetadataRole = getParentWindowData("notShowMetadataRole") || false;
			for(var i = 0; i < datas.size(); i++){
				var item = datas.get(i);

				//过滤外部机构
				if (type == Constants_JoinAccount) {
					if(item.externalType != "2"){
						continue;
					}
					//如果是vjoin人员，只保留自己的外部单位和其他可见的外单位
					if(isVjoinMember && isAdministrator != true){
						var _VjMemberAccessVjAccounts = topWindow.VjMemberAccessVjAccounts;
						if(_VjMemberAccessVjAccounts != null && !_VjMemberAccessVjAccounts.contains("D"+item.id)){//可以访问本外部单位可访问的其他外部单位下的人员
							continue;
						}
					}
				}

				if(notShowMetadataRole){
					if(item.id.indexOf("MemberMetadataNode") != -1){
						continue;
					}
				}

				if(keyword){
					var text = item.name.toLowerCase();
					if(text.indexOf(keyword) == -1){
						continue;
					}
				}

				//该数据不显示
				if(excludeElements.contains(_selectType + item.id) || !checkIncludeElements(_selectType, item.id)){
					continue;
				}

				if(_selectType == Constants_Admin && !showAdminTypes.isEmpty()){
					if(showAdminTypes.contains(item.role) || showAdminTypes.contains(item.role + "_" + item.id)){
						//保留
					}
					else{
						continue;
					}
				}

				var text = null;
				var showTitle = "";

				if(_selectType == Constants_Outworker){
					//当前登录者是外部人员,只能看到自己的部门
					if(!showAllOuterDepartmentFlag && !topWindow.ExtMemberScopeOfInternal.containsKey(item.id)){
						if(currentMember && !currentMember.isInternal){
							if(!item.isInternal && item.id != currentMember.departmentId){
								continue;
							}
						}
						else{
							//上级是部门
							if(secondPostDepartmentPaths && !secondPostDepartmentPaths.isEmpty() && item.parentDepartment){
								var isShow = false;
								var parentPathOfOuter = item.parentDepartment.path;
								for(var k = 0; k < secondPostDepartmentPaths.size(); k++) {
									var p = secondPostDepartmentPaths.get(k);
									if(p.startsWith(parentPathOfOuter)){
										isShow = true;
										break;
									}
								}

								if(!isShow){
									continue;
								}
							}
						}
					}

					var ts = getOutworkerListOptionText(item);
					text = ts[0];
					showTitle = ts[1];
				}
				else if(item.code){
					text = item.name.getLimitLength(nameMaxLength.two[0]);
					if(text != item.name){
						showTitle = item.name.escapeSpace();
					}
					text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
					text += item.code;
				}
				else{
					text = item.name;
				}
				if(v3x.getBrowserFlag('selectPeopleShowType')){
					html.append("<option title=\"" + (text.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;") + "\" value=\"").append(item.id).append("\" type=\"").append(_selectType).append("\" accountId=\"").append(_accountId).append("\">").append((text.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</option>");
				}else{
					html.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + _selectType + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+_selectType+"','"+id+"',this)\"  title=\"" + showTitle.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(_selectType).append("\" accountId=\"").append(_accountId).append("\">").append((text.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</div>");
				}
			}
		}
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			html.append("</select>");
		}else{
			html.append("</div>");
		}
		str = html.toString();
	}

	document.getElementById("Area1").innerHTML = str;
	document.getElementById("Area1").className = "";
	initIpadScroll(id);//ipad滚动条解决

//	log.debug("显示列表耗时：" + (new Date().getTime() - startTime) + "MS");
}

function getTeamListHTMLStr(keyword){
	pagingList1Param = new Properties();
	var id = Constants_Team + "DataBody";
	var size = tempNowPanel.isShowMember && checkCanSelectMember() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;

	var datas = topWindow.getDataCenter(Constants_Team,currentAccountId);
	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Team + "', this)\" ondblclick=\"selectOne('" + Constants_Team + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='team-list'>");
	}
	if(datas){
		//设置分页需要的参数
		pagingList1Param.put("keyword",keyword);
		pagingList1Param.put("datas",datas);
		//首次加载一页数据
		var pagingHtml = getTeamListHTMLStrPaging(0, keyword, datas);
		if(pagingHtml != ""){
			html.append(pagingHtml);
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}else{
		html.append("</div>");
	}

	return html.toString().replace("\|,"," ");
}

function getTeamListHTMLStrPaging(startIndex,keyword,datas){
	var html = new StringBuffer();
	var item;
	var text;
	var typeName; //类型名称：1-个人 2-系统(单位、集团) 3-项目
	var showText;
	var temp;
	var tempIndex;
	var len = datas.size();
	var firstPageSize = 0;
	var ids = new Array();
	var  k = 0;
	for(var i = startIndex; i <len;i++){
		try{
			item = datas.get(i);
			//去除重复
			var count = 0;
			for(var j = 0 ; j < ids.length ; j++){
				if(ids[j] == item.id){
					count = 1;
				}
			}
			if(count == 0){
				ids[k]=item.id;
				k++;
			}else{
				continue;
			}
			//排除不需要显示的类型
			if(showTeamType && !showTeamType.contains("" + item.type)){
				continue;
			}

			if(keyword){
				text = item.name.toLowerCase();
				if(text.indexOf(keyword) == -1){
					continue;
				}
			}

			//该数据不显示
			if(excludeElements.contains(Constants_Team + item.id) || !checkIncludeElements(Constants_Team, item.id)){
				continue;
			}

			typeName = ""; //类型名称：1-个人 2-系统(单位、集团) 3-项目

			if(item.type == 1){
				typeName = $.i18n("selectPeople.personalTeam");
			}
			else if(item.type == 2){
				var dep = item.getDepartment();
				if(dep){
					typeName = dep.name;
				}
				else{
					var a = allAccounts.get(item.accountId);
					if(a){
						typeName = a.shortname;
					}
				}

				if(!typeName){
					typeName = $.i18n("common.system.group.label");
				}
			}
			else if(item.type == 3){
				typeName = $.i18n("selectPeople.projectTeam");
			}

			showText = item.name.getLimitLength(nameMaxLength.two[0]);
			showText+= $.browser.chrome ?(showText.getBytesLength()%2>0?"|,":""):"";
			if($.browser.safari){
				temp = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
				tempIndex = (temp -(nameMaxLength.two[0] - temp -3))>20?20:temp -(nameMaxLength.two[0] - temp -3);
				showText += getNameSpace(tempIndex);
			}else{
				tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
				showText += getNameSpace(tempIndex);
			}
			showText += typeName;
			showText = showText.toString().replace("\|,"," ");
			if(v3x.getBrowserFlag('selectPeopleShowType')){
				html.append("<option title=\"" + item.name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"Team\" accountId=\"").append(item.accountId).append("\">").append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</option>");
			}else{
				html.append("<div  class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Team + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Team+"','"+id+"',this)\"  title=\"" + item.name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"Team\" accountId=\"").append(item.accountId).append("\">").append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</div>");
			}
			firstPageSize++;
			if(startIndex == 0 && firstPageSize >= pageSize){
				break;
			}
		}
		catch(e){
			log.error("", e);
		}
	}

	if(startIndex == 0 && (i + 1) < datas.size()){//需要显示‘点击加载全部’
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			html.append("<option id='more' startIndex='" + (i + 1) + "' style='margin:4px 0 0 4px;color:blue;cursor:pointer;'>").append($.i18n("selectPeople.data.load.all")).append("</option>");
		}else{
			//html.append("<div  class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Team + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Team+"','"+id+"',this)\"  title=\"" + item.name.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"Team\" accountId=\"").append(item.accountId).append("\">").append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</div>");
		}
	}

	return html.toString().replace("\|,"," ");
}

function getOrgRecentHTMLStr(keyword, selectAccountId) {
	var id = Constants_OrgRecent + "DataBody";
	var size = tempNowPanel.isShowMember && checkCanSelectMember() ? Constants_List1_size.showMember : Constants_List1_size.noShowMember;
	size = size -20;

	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Member + "', this)\" ondblclick=\"selectOne('" + Constants_Member + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height:" + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='recent-list'>");
	}
	var isCanSelectOuter = checkCanSelect(Constants_Member);
	var datas = topWindow.getDataCenter(Constants_OrgRecent,selectAccountId);
	if(datas){
		for(var i = 0; i < datas.size(); i++){
			var item = datas.get(i).getOneMember();
			if(item) {
				var text = item.name;
				if(keyword && keyword != document.getElementById("q").defaultValue) {
					if(text.indexOf(keyword) == -1){
						continue;
					}
				}
				//该数据不显示
				if(excludeElements.contains(Constants_Member + item.id) || !checkIncludeElements4Member(item)||(!isCanSelectOuter && !item.isInternal)){
					continue;
				}
				html.append(addMember(Constants_RelatePeople, null, item));
			}
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}
	else{
		html.append("</div>");
	}

	return html.toString();
}

function getPostListHTMLStr(keyword, selectAccountId, showAreaTop1){
	pagingList1Param = new Properties();
	var id = Constants_Post + "DataBody";
	var size = tempNowPanel.isShowMember && checkCanSelectMember() && !isRootAccount() ? Constants_List1_size.showMember_1 : Constants_List1_size.noShowMember;
	size = size - 50;
	if (!showAreaTop1) {
		size = size + 26;
	}
	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Post + "', this)\" ondblclick=\"selectOne('" + Constants_Post + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='post-list'>");
	}

	if(selectAccountId != null){
		var datas = topWindow.getDataCenter(Constants_Post, selectAccountId);
		if(datas){
			//设置分页需要的参数
			pagingList1Param.put("keyword",keyword);
			pagingList1Param.put("selectAccountId",selectAccountId);
			pagingList1Param.put("datas",datas);
			//首次加载一页数据
			var pagingHtml = getPostListHTMLStrPaging(0, keyword, selectAccountId, datas);
			if(pagingHtml != ""){
				html.append(pagingHtml);
			}
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}else{
		html.append("</div>");
	}
	return html.toString();
}

function getPostListHTMLStrPaging(startIndex, keyword, selectAccountId, datas){
	var html = new StringBuffer();
	//var postTypeId = document.getElementById("areaTopList1_Post").value;

	var item;
	var text;
	var showTitle;
	var text1;
	var titleShow;
	var len = datas.size();
	var firstPageSize = 0;
	var metadataPostIds;
	for(var i = startIndex; i <len; i++){
		try{
			item = datas.get(i);
			if(keyword){
				if(keyword.toLowerCase().startsWith(Constants_OrgMetadataTag.toLowerCase())){
					//元数据搜索
					var metadataId = keyword.substring(Constants_OrgMetadataTag.length + 1);
					if(isDecimal(metadataId)){
						if($("#orgMetadataSelect").val() == '201'){//按照岗位分类
							if(item.type != metadataId){
								continue;
							}
						}else{//岗位自定义属性
							var originalKey = keyword.replace("post",Constants_Post).replace("orgmetadatatag",Constants_OrgMetadataTag);//OrgMetadataTag|Post_5887735707973469550_2698877969988341725_3914859601377381015
							if(!metadataPostIds){
								var spm = new selectPeopleManager();
								metadataPostIds = spm.getQueryOrgModel(originalKey, false);
								if (!metadataPostIds || metadataPostIds == "") {
									return;
								}
							}

							if(metadataPostIds.indexOf(item.id) <0){
								continue;
							}
						}
					}
				}else{//文本搜索
					text = item.name.toLowerCase();
					if(text.indexOf(keyword) == -1){
						continue;
					}
				}
			}

			//该数据不显示
			if(excludeElements.contains(Constants_Post + item.id) || !checkIncludeElements(Constants_Post, item.id)){
				continue;
			}

			text = null;
			showTitle = "";
			text1 = null ;
			titleShow = "";
			if(item.code){
				text = item.name.getLimitLength(nameMaxLength.two[0]);
				text1 = item.name;
				if(text != item.name){
					showTitle = item.name.escapeSpace();
				}
				text += getNameSpace(nameMaxLength.two[0] + nameMaxSpace - text.getBytesLength());
				text1 += "   ";
				text += item.code;
				text1 += item.code;
			}
			else{
				text = item.name;
				text1 = item.name ;
			}
			if(v3x.getBrowserFlag('selectPeopleShowType')){
				html.append("<option title=\"" + text1.escapeSpace() + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Post).append("\" accountId=\"").append(selectAccountId).append("\" externalType=\"").append(item.externalType).append("\">").append(text.escapeSpace()).append("</option>");
			}else{
				html.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Post + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Post+"','"+id+"',this)\"  title=\"" + text.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Post).append("\" accountId=\"").append(selectAccountId).append("\" externalType=\"").append(item.externalType).append("\">").append(text.escapeHTML(true)).append("</div>");
			}
			firstPageSize++;
			if(startIndex == 0 && firstPageSize >= pageSize){
				break;
			}
		}
		catch(e){
			log.error("", e);
		}
	}

	if(startIndex == 0 && (i + 1) < datas.size()){//需要显示‘点击加载全部’
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			html.append("<option id='more' startIndex='" + (i + 1) + "' style='margin:4px 0 0 4px;color:blue;cursor:pointer;'>").append($.i18n("selectPeople.data.load.all")).append("</option>");
		}else{
			//html.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Post + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Post+"','"+id+"',this)\"  title=\"" + text.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Post).append("\" accountId=\"").append(selectAccountId).append("\" externalType=\"").append(item.externalType).append("\">").append(text.escapeHTML(true)).append("</div>");
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}else{
		html.append("</div>");
	}
	return html.toString();
}


function getAccountListHTMLStr(keyword, metadataId, showAreaTop1){
	var id = Constants_Account + "DataBody";
	var size = Constants_List1_size.noShowMember;
	size = size - 50;
	if (!showAreaTop1) {
		size = size + 26;
	}
	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Account + "', this)\" ondblclick=\"selectOne('" + Constants_Account + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='post-list'>");
	}

	var item;
	var text;
	var showTitle;
	var text1;
	var titleShow;
	var datas = allAccounts.values();
	var len = datas.size();
	for(var i = 0; i <len; i++){
		try{
			item = datas.get(i);
			var metadataIds = item.metadataIds;
			//			if(keyword){
			//				text = item.name.toLowerCase();
			//				if(text.indexOf(keyword) == -1){
			//					continue;
			//				}
			//			}
			if(metadataIds != null){
				if(metadataIds.indexOf(metadataId)<0){
					continue;
				}

				//该数据不显示
				if(excludeElements.contains(Constants_Account + item.id) || !checkIncludeElements(Constants_Account, item.id)){
					continue;
				}

				text = item.name;
				if(v3x.getBrowserFlag('selectPeopleShowType')){
					html.append("<option title=\"" + text.escapeSpace() + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Account).append("\" accountId=\"").append(selectAccountId).append("\" externalType=\"").append(item.externalType).append("\">").append(text.escapeSpace()).append("</option>");
				}else{
					html.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Account + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Account+"','"+id+"',this)\"  title=\"" + text.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Account).append("\" accountId=\"").append(selectAccountId).append("\" externalType=\"").append(item.externalType).append("\">").append(text.escapeHTML(true)).append("</div>");
				}
			}

		}
		catch(e){
			log.error("", e);
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}else{
		html.append("</div>");
	}
	return html.toString();
}

function getGuestListHTMLStr(keyword,selectAccountId){
	var id = Constants_Guest + "DataBody";
	var size = Constants_List1_size.noShowMember;
	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Guest + "', this)\" ondblclick=\"selectOne('" + Constants_Guest + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height: " + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='post-list'>");
	}
	var datas = topWindow.getDataCenter(Constants_Guest, selectAccountId);
	if(datas){
		for(var i = 0; i < datas.size(); i++){
			try{
				var item = datas.get(i);
				//该数据不显示
				if(excludeElements.contains(Constants_Guest + item.id) || !checkIncludeElements(Constants_Guest, item.id)){
					continue;
				}

				if(keyword){
					var text = item.name.toLowerCase();
					if(text.indexOf(keyword) == -1){
						continue;
					}
				}

				var guestAccountId = item.accountId;
				var id = item.id;
				var text = item.name;
				if(v3x.getBrowserFlag('selectPeopleShowType')){
					html.append("<option title=\"" + text.escapeSpace() + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Guest).append("\" accountId=\"").append(guestAccountId).append("\">").append(text.escapeSpace()).append("</option>");
				}else{
					html.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + Constants_Guest + "',this,'"+id+"')\"  onclick=\"selectList1ItemDiv('"+Constants_Guest+"','"+id+"',this)\"  title=\"" + text.escapeHTML(true) + "\" value=\"").append(item.id).append("\" type=\"").append(Constants_Guest).append("\" accountId=\"").append(guestAccountId).append("\">").append(text.escapeHTML(true)).append("</div>");
				}
			}
			catch(e){
				log.error("", e);
			}
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}else{
		html.append("</div>");
	}

	return html.toString();
}

function getRelatePeopleListHTMLStr(keyword, selectAccountId){
	var id = Constants_RelatePeople + "DataBody";
	var size = Constants_List1_size.noShowMember;
	if ($("#select_input_div_parent").css("display") != "none"){
		size = size - $("#select_input_div_parent").height();
	}
	var html = new StringBuffer();
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("<select id=\"" + id + "\" onchange=\"selectList1Item('" + Constants_Member + "', this)\" ondblclick=\"selectOne('" + Constants_Member + "', this)\" multiple style='padding-top: 1px;width:368px; overflow:auto; border:none; height:" + size + "px'>");
	}else{
		html.append("<div id=\"" + id + "\" class='relatePeople-list'>");
	}

	var datas = topWindow.getDataCenter(Constants_RelatePeople,selectAccountId);
	if(datas){
		var toShowType = $("#areaTopList1_RelatePeople").val() || "All";

		for(var i = 0; i < datas.size(); i++){
			if(toShowType != "All" && toShowType != datas.get(i).type){
				continue;
			}

			var members = datas.get(i).getMembers(selectAccountId);
			for(var j = 0; j < members.size(); j++){
				var item = members.get(j);
				var text = item.name;

				if(keyword){
					var text = item.name.toLowerCase();
					if(text.indexOf(keyword) == -1){
						continue;
					}
				}

				if(!excludeElements.contains(Constants_Member + item.id) && checkIncludeElements4Member(item)){
					//function addMember(type, entity, member, fullWin, shadowMembers)
					html.append(addMember(Constants_RelatePeople, null, item));
				}
			}
		}
	}

	if(v3x.getBrowserFlag('selectPeopleShowType')){
		html.append("</select>");
	}
	else{
		html.append("</div>");
	}

	return html.toString();
}

function getOutworkerListOptionText(entity){
	var showText = entity.name.getLimitLength(nameMaxLength.two[0]);
	if($.browser.safari){
		var temp = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
		var tempIndex = (temp -(nameMaxLength.two[0] - temp -3))>20?20:temp -(nameMaxLength.two[0] - temp -3);
		showText += getNameSpace(tempIndex);
	}else{
		var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
		showText += getNameSpace(tempIndex);
	}


	var showTile = "";
	var typeName = null;
	if(entity.parentDepartment){
		typeName = entity.parentDepartment.name;
		showTile = entity.parentDepartment.getFullName() + "/" + entity.name;
	}
	else{
		typeName = currentAccount.shortname;
	}

	showText += typeName;

	return [showText, showTile];
}



/**
 * 隐藏区域1，区域2最大化
 */
function hiddenArea1(noReShowSeparatorDIV){
	if(area12Status == "B"){
		reArea_1_2(noReShowSeparatorDIV);
		return;
	}

	var area1Reduction = 0;
	if(tempNowPanel==undefined || tempNowPanel==null){
		return;
	}
	var AreaTop1Obj = document.getElementById("AreaTop1_" + tempNowPanel.type);
	if((AreaTop1Obj && AreaTop1Obj.style.display != "none")){
		area1Reduction = 26;//顶部<所有岗位>高度
	}else if(canShowBusinessOrg){
		area1Reduction = 26;//顶部<所有岗位>高度
	}

	document.getElementById("Area1").style.display = "none";

	document.getElementById("Area2").style.display = "";
	var memberDataBodyObj = document.getElementById("memberDataBody") || document.getElementById("memberDataBodyOrginal");
	if(memberDataBodyObj){
		memberDataBodyObj.style.height = (450 - area1Reduction  - 50 - 1) + "px";
	}

	document.getElementById("Separator1").style.height = "0";
	document.getElementById("Separator1_0").style.display = "none";
	document.getElementById("Separator1_1").style.display = "none";
	document.getElementById("Separator1_2").style.display = "";
	$("#Separator1_2").css("margin-top","-1px");

	area12Status = "T";
}
/**
 * 隐藏区域2，区域1最大化
 */
function hiddenArea2(isHiddenSeparator1,noReShowSeparatorDIV){
	if(area12Status == "T"){
		reArea_1_2(noReShowSeparatorDIV);
		return;
	}

	var area1Reduction = 0;
	if(window.innerHeight < 500){
		area1Reduction = 500 - window.innerHeight;
	}
	if(tempNowPanel==undefined || tempNowPanel==null){
		return;
	}
	var AreaTop1Obj = document.getElementById("AreaTop1_" + tempNowPanel.type);
	if(canShowBusinessOrg){
		if(tempNowPanel.type == Constants_BusinessDepartment || tempNowPanel.type == Constants_BusinessRole || tempNowPanel.type == Constants_Node ||　tempNowPanel.type == Constants_FormField){
			AreaTop1Obj = document.getElementById("AreaTop1_SubInfo");
		}
	}

	if((AreaTop1Obj && AreaTop1Obj.style.display != "none") || (isGroupVer && tempNowPanel.type == Constants_Account)){
		area1Reduction = 26;//顶部<所有岗位>高度
	}

	var common_searchTrObj = document.getElementById("common_searchTr");
	var metadata_searchTrObj = document.getElementById("metadata_searchTr");
	if(common_searchTrObj && common_searchTrObj.style.display != "none" && metadata_searchTrObj && metadata_searchTrObj.style.display != "none"){
		area1Reduction = area1Reduction + 40;//顶部切换单位+搜索条件，显示2行。
	}

	document.getElementById("Area1").style.display = "";
	document.getElementById("Area1").style.height = (450 - area1Reduction - 70) + "px";
	if(document.getElementById("List1")){
		document.getElementById("List1").style.height = (450 - area1Reduction - 70 + (isHiddenSeparator1 ? 10 : 0)) + "px";
	}
	try{
		document.getElementById(tempNowPanel.type + "DataBody").style.height = (450  - 70 - area1Reduction) + "px";
	}
	catch(e){
	}

	document.getElementById("Area2").style.display = "none";

	document.getElementById("Separator1").style.height = isHiddenSeparator1 ? "0px" : "10px";
	document.getElementById("Separator1_0").style.display = isHiddenSeparator1 ? "none" : "";
	document.getElementById("Separator1_1").style.display = "none";
	document.getElementById("Separator1_2").style.display = "none";
	$("#Separator1_2").css("margin-top","0");

	area12Status = "B";
}

/**
 * 把左侧(区域1\区域2)还原到原始状态
 *
 * @return
 */
function reArea_1_2(noReShowSeparatorDIV){
	var area1Reduction = 0;

	var AreaTop1Obj = document.getElementById("AreaTop1_" + tempNowPanel.type);
	if(tempNowPanel.type == Constants_Node || tempNowPanel.type == Constants_FormField ||
		tempNowPanel.type == Constants_BusinessRole || tempNowPanel.type == Constants_BusinessDepartment){
		AreaTop1Obj = document.getElementById("AreaTop1_SubInfo");
	}

	if(!AreaTop1Obj || AreaTop1Obj.style.display == "none"){
	}else if(AreaTop1Obj && AreaTop1Obj.style.display != "none"){
		area1Reduction = 40;//顶部<所有岗位>高度
	}else if(canShowBusinessOrg){
		area1Reduction = 40;//顶部<所有岗位>高度
	}

	var common_searchTrObj = document.getElementById("common_searchTr");
	var metadata_searchTrObj = document.getElementById("metadata_searchTr");

	if(common_searchTrObj && common_searchTrObj.style.display != "none" && metadata_searchTrObj && metadata_searchTrObj.style.display != "none"){
		area1Reduction = area1Reduction + 40;//顶部切换单位+搜索条件，显示2行。
	}

	if(document.getElementById("List1")){
		document.getElementById("List1").style.height = (Constants_List1_size.showMember - area1Reduction) + "px";
	}
	document.getElementById("Area1").style.display = "";
	document.getElementById("Area1").style.height = (Constants_List1_size.showMember - area1Reduction) + "px";

	if(document.getElementById(tempNowPanel.type + "DataBody")){
		document.getElementById(tempNowPanel.type + "DataBody").style.height = (Constants_List1_size.showMember - area1Reduction) + "px";
	}
	document.getElementById("Area2").style.display = "";
	var memberDataBodyObj = document.getElementById("memberDataBody") || document.getElementById("memberDataBodyOrginal");
	if(memberDataBodyObj){
		memberDataBodyObj.style.height = "170px";
	}

	document.getElementById("Separator1").style.height = "30px";

	document.getElementById("Separator1").style.display = "";
	document.getElementById("Separator1_0").style.display = "";
	document.getElementById("Separator1_1").style.display = "";
	document.getElementById("Separator1_2").style.display = "";

	area12Status = "M";
	if(!noReShowSeparatorDIV){
		showSeparatorDIV(tempNowPanel.type);
	}
}


function getMembersHTML(type, id, keyword, fullWin,showAll){
	pagingList2Param = new Properties();
	var _getMembersFun = null;

	var selectHTML = new StringBuffer();

	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		//div展示人员select
		selectHTML.append(memberDataBody_div);
	}else if(fullWin == true){
		selectHTML.append(select2_tag_prefix_fullWin);
	}
	else{
		selectHTML.append(select2_tag_prefix);
	}

	if(Constants_Panels.get(type) && (_getMembersFun = Constants_Panels.get(type).getMembersFun) != null){
		var memberDataBody = document.getElementById("memberDataBody");
		var entity = topWindow.getObject(type, id);
		if(!entity || (type == Constants_Department && entity.externalType == '1')){
			return selectHTML;
		}

		var __members = eval("entity." + _getMembersFun + "()");
		if(!__members){
			return selectHTML;
		}

		//设置分页需要的参数
		pagingList2Param.put("type",type);
		pagingList2Param.put("id",id);
		pagingList2Param.put("keyword",keyword);
		pagingList2Param.put("fullWin",fullWin);
		pagingList2Param.put("entity",entity);
		pagingList2Param.put("__members",__members);
		//首次加载一页数据
		var pagingHtml = getMembersHTMLPaging(0, type, id, keyword, fullWin, entity, __members,showAll);
		if(pagingHtml != ""){
			selectHTML.append(pagingHtml);
		}
	}
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		//div展示人员select
		selectHTML.append(memberDataBody_div_end);
	}else{
		selectHTML.append(select2_tag_subfix);
	}
	return selectHTML.toString();
}

/**
 * 分页加载数据
 * @param startIndex 开始取数的index
 * @param type
 * @param id
 * @param keyword
 * @param fullWin
 * @param data
 * @returns
 */
function getMembersHTMLPaging(startIndex, type, id, keyword, fullWin, entity, __members,showAll){
	var selectHTML = new StringBuffer();

	var isExternalLookDept = false;
	if(type == Constants_Department){
		isExternalLookDept = checkExternalMemberWorkScope(type, id);
	}

	var _isNeedCheckLevelScope = true;
	var childDepts = [];
	var notNeedCheckLevelScope = true;
	if(isNeedCheckLevelScope && currentAccountLevelScope>=0){
		childDepts = childDeptOfCurrent(currentMember);
		notNeedCheckLevelScope = childDepts.contains(id);
	}
	if(!isNeedCheckLevelScope
		|| (type == Constants_Department && currentMember && (currentMember.departmentId == id || currentMember.isSecondPostInDept(id) || notNeedCheckLevelScope))){
		_isNeedCheckLevelScope = false;
	}

	var member;
	var firstPageSize = 0;
	var departmentAccesses = topWindow.getDataCenter(Constants_DepartmentAccess, currentAccountId);
	for(var i = startIndex; i < __members.size(); i++){
		member = __members.get(i);

		if(keyword && member.name.toLowerCase().indexOf(keyword) < 0){
			continue;
		}

		if(checkIncludeElements(type, id)){ //如果一区能选择，那二区就不限制
			//ignore
		}
		else if(!checkIncludeElements(Constants_Member, member.id)){
			continue;
		}

		if(excludeElements.contains(Constants_Member + member.id)){
			continue;
		}

		try{
			if(isInternal && member.externalType=='1'){
				if(isNeedCheckLevelScope && !checkVjoinMemberWorkScopeOfMember(member)){
					continue;
				}
			}else{

				if(isInternal && _isNeedCheckLevelScope && !checkLevelScope(member, entity, childDepts)){ //越级-职务级别
					continue;
				}

				if(isInternal && isNeedCheckLevelScope && !isAdmin){//部门可见性校验
					if(type == Constants_Department){
						var d = topWindow.getObject(Constants_DepartmentAccess, id, currentAccountId);
						if(d && d.type == 'M'){//通过部门下的人员，才找到的该部门，只显示这个部门下能看到的具体人，不显示全部人员。
							var memberIds = d.memberIds;
							if(memberIds.indexOf(member.id) == -1){
								continue;
							}
						}
					}else if(type == Constants_Post){
						var _NoAccessPostIdsByDepartmentAccess = topWindow.NoAccessPostIdsByDepartmentAccess;
						if(_NoAccessPostIdsByDepartmentAccess != null && _NoAccessPostIdsByDepartmentAccess.contains(id)){//我不能直接选择的岗位中，包含这个岗位
							//判断这个在这个单位下的都在哪些部门，如果在任何一个我可见的部门里，那我就可选这个人
							//主岗：
							var canSelect = false;
							var d = topWindow.getObject(Constants_DepartmentAccess, member.departmentId, currentAccountId);
							if(d){
								canSelect = true;
							}

							if(!canSelect){
								//副岗
								if(member.secondPostIds){ //副岗
									var _secondPostIds = member.secondPostIds; //List<[Department.id, Post.id]>
									for(var t = 0; t < _secondPostIds.size(); t++) {
										var _secondPostId = _secondPostIds.get(t);	//[Department.id, Post.id]
										d = topWindow.getObject(Constants_DepartmentAccess, _secondPostId[0], currentAccountId);
										if(d){
											canSelect = true;
											break;
										}

									}
								}

								if(!canSelect){
									var _concurents = topWindow.getObject(Constants_concurentMembers, member.id); //此人在该单位的兼职
									if(_concurents){
										for(var t = 0; t < _concurents.length; t++) {
											var _concurent = _concurents[t]; //判断是否是这个岗位
											d = topWindow.getObject(Constants_DepartmentAccess, _concurent.departmentId, currentAccountId);
											if(d){
												canSelect = true;
												break;
											}
										}
									}
								}
							}
							if(!canSelect){
								continue;
							}
						}

					}else if(type == Constants_Level){
						var _NoAccessLevelIdsByDepartmentAccess = topWindow.NoAccessLevelIdsByDepartmentAccess;
						if(_NoAccessLevelIdsByDepartmentAccess != null && _NoAccessLevelIdsByDepartmentAccess.contains(id)){//我不能直接选择的职级中，包含这个职级
							//判断这个在这个单位下的都在哪些部门，如果在任何一个我可见的部门里，那我就可选这个人
							//主岗：
							var canSelect = false;
							var d = topWindow.getObject(Constants_DepartmentAccess, member.departmentId, currentAccountId);
							if(d){
								canSelect = true;
							}

							if(!canSelect){
								//副岗
								if(member.secondPostIds){ //副岗
									var _secondPostIds = member.secondPostIds; //List<[Department.id, Post.id]>
									for(var t = 0; t < _secondPostIds.size(); t++) {
										var _secondPostId = _secondPostIds.get(t);	//[Department.id, Post.id]
										d = topWindow.getObject(Constants_DepartmentAccess, _secondPostId[0], currentAccountId);
										if(d){
											canSelect = true;
											break;
										}

									}
								}

								if(!canSelect){
									var _concurents = topWindow.getObject(Constants_concurentMembers, member.id); //此人在该单位的兼职
									if(_concurents){
										for(var t = 0; t < _concurents.length; t++) {
											var _concurent = _concurents[t]; //判断是否是这个岗位
											d = topWindow.getObject(Constants_DepartmentAccess, _concurent.departmentId, currentAccountId);
											if(d){
												canSelect = true;
												break;
											}
										}
									}
								}
							}
							if(!canSelect){
								continue;
							}
						}
					}
				}

				if(!isExternalLookDept && !checkExternalMemberWorkScopeOfMember(member)){
					continue;
				}

				if(isVjoinMember && isAdministrator != true && !checkExternalMemberWorkScopeOfMember(member)){
					continue;
				}
			}

			//当前登录者是内部人员，显示的部门是外部部门，根据工作范围重新计算
			if(!showAllOuterDepartmentFlag && isInternal && !isAdmin && type == Constants_Outworker && !entity.isInternal){
				var extMember = topWindow.ExtMemberScopeOfInternal.get(id);
				if(!extMember || !extMember.contains(member.id)){
					continue;
				}
			}

			var shadowMembers = new Array();
			if (Constants_Department == type) { // 列出部门下的人员
				while (i+1 < __members.size()) { // 还有下一个
					var nMember = __members.get(i+1); // 下一个
					if (nMember.id == member.id) { // 下一个与当前是同一人员
						shadowMembers.push(nMember); // 合并显示
						i++;
					} else {
						break;
					}
				}
			}
			var memberHTML = addMember(type, entity, member, fullWin, shadowMembers);
			if(memberHTML == undefined){
				continue;
			}
			selectHTML.append(memberHTML);
			firstPageSize++;//一个人的多个岗位会合并成一条数据，所以i>=pageSize
			if(!showAll){
				if(startIndex == 0 && firstPageSize >= pageSize){
					break;
				}
			}
		}
		catch(e){
			log.error("", e);
			continue;
		}
	}

	if(startIndex == 0 && (i + 1) < __members.size()){//需要显示‘点击加载全部’
		if(!v3x.getBrowserFlag('selectPeopleShowType')){
			//selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title='" + showTitle + "' value='").append(mId).append("' type='Member' accountId='").append(_accountId).append("' externalType='").append(member.externalType).append("'>").append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</div>");
		}else{
			selectHTML.append("<option id='more' startIndex='" + (i + 1) + "' style='margin:4px 0 0 4px;color:blue;cursor:pointer;'>").append($.i18n("selectPeople.data.load.all")).append("</option>");
		}
	}

	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		//div展示人员select
		selectHTML.append(memberDataBody_div_end);
	}else{
		selectHTML.append(select2_tag_subfix);
	}
	return selectHTML.toString();
}

function getBusinessMembersHTML(type, id, keyword,fullWin){
	var _getMembersFun = null;

	var selectHTML = new StringBuffer();

	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		//div展示人员select
		selectHTML.append(memberDataBody_div);
	}else if(fullWin == true){
		selectHTML.append(select2_tag_prefix_fullWin);
	}
	else{
		selectHTML.append(select2_tag_prefix);
	}

	if(Constants_Panels.get(type) && (_getMembersFun = Constants_Panels.get(type).getMembersFun) != null){
		var memberDataBody = document.getElementById("memberDataBody");

		var entity = topWindow.getObject(type, id);
		if(!entity || (type == Constants_Department && entity.externalType == '1')){
			return selectHTML;
		}
		var __members = eval("entity." + _getMembersFun + "()");
		if(!__members){
			return selectHTML;
		}

		var businessId = $("#areaTopList1_SubInfo").val();
		var businessAccount = topWindow.getObject(Constants_BusinessAccount, businessId);
		if(businessAccount){
			var accessMemberIds = businessAccount.accessMemberIds;

			for(var i = 0; i < __members.size(); i++){
				var member = __members.get(i);

				if(keyword && member.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				if(checkIncludeElements(type, id)){ //如果一区能选择，那二区就不限制
					//ignore
				}
				else if(!checkIncludeElements(Constants_Member, member.id)){
					continue;
				}

				if(excludeElements.contains(Constants_Member + member.id)){
					continue;
				}

				try{
					if(isNeedCheckLevelScope && accessMemberIds.indexOf(member.id) == -1){
						continue;
					}
					selectHTML.append(addMember(type, entity, member, fullWin, ""));
				}
				catch(e){
					log.error("", e);
					continue;
				}
			}
		}
	}
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		//div展示人员select
		selectHTML.append(memberDataBody_div_end);
	}else{
		selectHTML.append(select2_tag_subfix);
	}
	return selectHTML.toString();
}

/**
 * 显示人员
 */
function showMember(type, id, keyword){
	if((tempNowPanel.type != Constants_OrgTeam && !checkCanSelectMember()) || (tempNowPanel.type == Constants_OrgTeam && !checkCanSelectOrgTeam())){
		return;
	}

	//组
	if(type == Constants_Team){
		addTeamMember2List2(id, keyword);
	}else if(type == Constants_OrgTeam){//新增机构组显示
		addOrgTeamToList(id, "");
	}else if(type == Constants_BusinessDepartment){
		var selectHTML = getBusinessMembersHTML(type, id, keyword);
		document.getElementById("Area2").innerHTML = selectHTML;
		initIpadScroll("memberDataBody");//ipad滚动条解决
	}
	else{ //直接关系人
		var selectHTML = getMembersHTML(type, id, keyword);
		document.getElementById("Area2").innerHTML = selectHTML;
		initIpadScroll("memberDataBody");//ipad滚动条解决
	}
}
/**添加机构组部门显示到select option中**/
function addOrgTeamToList(id, keyword){

	var orgTeam = topWindow.getObject(Constants_OrgTeam, id);
	if(!orgTeam){ //个人组不管
		return;
	}
	var concurentDepartments = topWindow.getDataCenter(Constants_concurentMembers, currentAccountId);
	var selectHTML = new StringBuffer();
	selectHTML.append(select2_tag_prefix);

	var sepTteamObj = document.getElementById("sep_team");
	var isShowRelatemember = sepTteamObj && sepTteamObj.checked == true;
	selectHTML.append(addOrgTeamDepartmentOfType(concurentDepartments, orgTeam.getOrgTeamDepartment(), "OrgTeam"));
	function addOrgTeamDepartmentOfType(concurentDepartments, _departments, type){
		if(!_departments){
			return "";
		}


		var loadAccountData = new Array();

		var str = new StringBuffer();
		for(var i = 0; i < _departments.size(); i++){
			var _accountId;
			var department = _departments.get(i);
			var departmentType = department.type;
			var departmentIdStr = department.id;
			var departmentId = departmentIdStr;
			if(departmentId.indexOf("_")>=0){
				var index0 = departmentIdStr.indexOf("_");
				_accountId = departmentIdStr.substr(0,index0);
				departmentId = departmentIdStr.substr(index0+1);

				if(!loadAccountData.contains(_accountId) && currentAccountId != _accountId){
					loadAccountData.push(_accountId);
					topWindow.initOrgModel(_accountId, currentMemberId, extParameters);
				}
			}
			var showText = department.name;
			var titleText = department.name;

			if(!v3x.getBrowserFlag('selectPeopleShowType')){
				str.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('Department', this)\"  onclick=\"selectMemberFn(this,'memberDataBody')\"  value=\"").append(departmentId).append("\" type=\"").append(departmentType).append("\" accountId=\"").append(_accountId).append("\">").append(showText.escapeHTML(true)).append("</div>");
			}else{
				str.append("<option value=\"").append(departmentId).append("\"title=\"").append(titleText.escapeHTML(true)).append("\" type=\"").append(departmentType).append("\" accountId=\"").append(_accountId).append("\" class='TeamMember_" + type + "'>").append(showText.escapeHTML(true)).append("</option>");
			}

		}

		return str;
	}
	selectHTML.append(memberDataBody_div_end);
	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}
/**
 * 把List2区域的数据清空
 */
function clearList2(){
	var memberDataBody = document.getElementById("memberDataBody");
	if(memberDataBody){
		if(memberDataBody.options){
			var len = memberDataBody.options.length;
			for(var i = 0; i < len; i++){
				memberDataBody.remove(0);
			}
		}else{
			memberDataBody.innerHTML='';
		}
	}
}

/**
 * 把人员添加到区域2
 * @param type List1的类型
 * @param entity list1的对象
 * @param member Member对象
 * @param fullWin
 * @param shadowMembers 需要合并显示的Member数组
 */
function addMember(type, entity, member, fullWin, shadowMembers){
	if(ShowMe == false && currentMemberId && member.id == currentMemberId){
		return;
	}
	var sFlag = shadowMembers && shadowMembers.length > 0;
	var mArray = new Array();
	mArray.push(member);
	if (sFlag) {
		for (var i=0; i<shadowMembers.length; i++) {
			var sMember = shadowMembers[i];
			mArray.push(sMember);
		}
	}

	var attribute = "Department";

	if(type == Constants_Department || type == Constants_Outworker){
		attribute = "Post";
	}
	/**
	 * 生成的option的扩展属性
	 */
	var extendAttribute = "";
	var showText = null;
	var _accountId = member.accountId;
	var className = "";
	var secondPostInDepartId = null;
	var showTitle = "";
	var showDeptN = "";
	var emailOrMobileAttribute = getCanSelectEmailOrMobile();
	var emailOrMobile = null;
	if(emailOrMobileAttribute){
		emailOrMobile = member[emailOrMobileAttribute];
	}

	//显示手机号或email，而该人没有设置
	if(emailOrMobileAttribute && !emailOrMobile){
		return null;
	}

	var selectPeople_secondPostLabel = "(" + $.i18n("selectPeople.secondPost") + ")";
	var postId = "-1";
	var postName = "";

	var deptId = "-1";
	var deptName = "";

	if(member.type == "E"){ //兼职
		if(showConcurrentMember == false){
			return "";
		}

		var account = allAccounts.get(_accountId);
		if(!account){
			log.warn("兼职[" + member.name + "]的主岗单位[" + _accountId + "]不存在");
			return "";
		}

		showText = member.name + "(" + account.shortname + ")";
		showText = showText.getLimitLength(nameMaxLength.two[0]);
		showText+= $.browser.chrome ?(showText.getBytesLength()%2>0?"|,":""):"";
		if($.browser.safari){
			var temp = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			var tempIndex = (temp -(nameMaxLength.two[0] - temp -3))>20?20:temp -(nameMaxLength.two[0] - temp -3);
			showText += getNameSpace(tempIndex);
		}else{
			var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			showText += getNameSpace(tempIndex);
		}
		showText = showText.toString().replace("\|,"," ");
		if(emailOrMobile){
			showText += emailOrMobile;
		}
		else{
			for (var i=0; i<mArray.length; i++) {
				var cMember = mArray[i];
				var object_ = null;
				if(attribute == "Department"){
					object_ = cMember.getDepartment();
				}else if(attribute == "Post"){
					object_ = cMember.getPost();
				}
				if(object_){
					if (i > 0) {
						showText += " ";
						showTitle += " ";
					}
					showText += selectPeople_secondPostLabel + ((fullWin == true) ? object_.getFullName() : object_.name);
					if (fullWin && object_.getFullName) {
						showTitle += selectPeople_secondPostLabel + object_.getFullName();
					} else {
						showTitle += selectPeople_secondPostLabel + object_.name;
					}
					postId = object_.id;
					postName = object_.name;

					deptId = object_.id;
					deptName = object_.name;
				}else if(type == Constants_RelatePeople){
					showText += cMember.departmentName;
					showTitle += cMember.departmentName;
				}
				var object_1 = cMember.getDepartment();
				if(object_1){
					if (object_1.getFullName) {
						var fullName = object_1.getFullName();
						showDeptN += selectPeople_secondPostLabel + fullName;
					} else {
						showDeptN += selectPeople_secondPostLabel + object_1.name;
					}
				}
			}
		}
	}
	else if(member.type == "G"){//在全集团范围内查出来的
		showText = member.name;
		showText = showText.getLimitLength(nameMaxLength.two[0]);
		showText+= $.browser.chrome ?(showText.getBytesLength()%2>0?"|,":""):"";

		if($.browser.safari){
			var temp = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			var tempIndex = (temp -(nameMaxLength.two[0] - temp -3))>20?20:temp -(nameMaxLength.two[0] - temp -3);
			showText += getNameSpace(tempIndex);
		}else{
			var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			if(tempIndex<0){
				tempIndex = 0;
			}
			showText += getNameSpace(tempIndex);
		}

		if(tempNowPanel.type == Constants_BusinessDepartment){//多维组织下的人员，显示为人员在这个多维组织部门下的角色
			if(attribute == "Department"){
				extendAttribute = " businessDeptId='" +  member.businessDeptId + "' isBusinessMember='" + member.isBusinessMember + "' ";
				var roleNames = "";
				var roles = member.businessRoles;
				if(roles && roles != ""){
					var roleIds = roles.split(",");
					for(var j = 0; j < roleIds.length; j++) {
						var roleId = roleIds[j];
						var businessRole = topWindow.getObject(Constants_BusinessRole, roleId);
						if(businessRole){
							var roleName = businessRole.name;
							if(roleNames !=""){
								roleNames = roleNames + ",";
							}
							roleNames = roleNames + roleName;
						}
					}
				}
				showText += roleNames;
				showTitle += roleNames;
			}
		}else{
			if(emailOrMobile){
				showText += emailOrMobile;
			}
			else{
				var account = allAccounts.get(_accountId);
				if(account){
					var fullName = "/" + member.departmentName;
					showText += account.shortname + fullName;
					if(attribute == "Post"){
						var post = topWindow.getObject(Constants_Post, member.postId);
						if(post == null && member.accountId != currentAccountId){
							topWindow.initOrgModel(member.accountId, currentMemberId, extParameters)
							post = topWindow.getObject(Constants_Post, member.postId);
						}
						if(post){
							showTitle += post.name;
						}
						postId = post.id;
						postName = post.name;
					}else{
						showTitle += account.shortname + fullName;
					}

				}
			}

			var object_1 = member.departmentNameF;
			if(object_1){
				showDeptN += object_1;
			}
		}
	}
	else{
		if(showSecondMember == false && member.type == "F"){
			return "";
		}

		showText = member.name.getLimitLength(nameMaxLength.two[0]);
		showText+= $.browser.chrome ?(showText.getBytesLength()%2>0?"|,":""):"";
//		******************************显示用户账号的需求 start *******************************
//		李丹
//		2020/10/11
		//发送Ajax请求
	    $.ajax({
	        type: "get",
	        url: "/seeyon/userAccount.do?method=selectUserAccount",
	        data: {
	            'id':member.id,
	        },
			async:false,
	        dataType: "json",
	        success: function(data){
	        	showText+="     "+data.account
	        }
	    });
//		******************************显示用户账号的需求 end *******************************
		if($.browser.safari){
			var temp = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			var tempIndex = (temp -(nameMaxLength.two[0] - temp -3))>20?20:temp -(nameMaxLength.two[0] - temp -3);
			showText += getNameSpace(tempIndex);
		}else{
			var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
			showText += getNameSpace(tempIndex);
		}

		if(emailOrMobile){
			showText += emailOrMobile;
		}
		else{
			for (var i=0; i<mArray.length; i++) {
				var cMember = mArray[i];
				var jianzhiFlag = (cMember.type == "F" ? selectPeople_secondPostLabel : "");
				var object_ = null;
				if(attribute == "Department"){
					object_ = cMember.getDepartment();
				}else if(attribute == "Post"){
					object_ = cMember.getPost();
				}
				if(object_){
					if (i > 0) {
						showText += " ";
						showTitle += " ";
					}
					showText += jianzhiFlag + ((fullWin == true) ? object_.getFullName() : object_.name);
					if (object_.getFullName) {
						showTitle += jianzhiFlag + object_.getFullName();
					} else {
						showTitle += jianzhiFlag + object_.name;
					}
					postId = object_.id;
					postName = object_.name;

					deptId = object_.id;
					deptName = object_.name;
				}
				var object_1 = cMember.getDepartment();
				if(object_1){
					if (object_1.getFullName) {
						var fullName = object_1.getFullName();
						showDeptN += jianzhiFlag + fullName;
					} else {
						showDeptN += jianzhiFlag + object_1.name;
					}
				}
			}
		}
	}

	showText = showText.toString().replace("\|,"," ");
	if (showTitle.length > 0) {
		if(tempNowPanel.type == Constants_BusinessDepartment){
			showTitle = member.name.escapeHTML(true) + "\n" + Constants_Component.get(Constants_Role) + ": " + showTitle.escapeHTML(true);
		}else{
			var attributeName = "";
			if(attribute == "Department"){
				attributeName = Constants_Component.get(Constants_Department);
			}else if(attribute == "Post"){
				attributeName = Constants_Component.get(Constants_Post);
			}
			showTitle = member.name.escapeHTML(true) + "\n" + attributeName + ": " + showTitle.escapeHTML(true);
		}
		if(attribute!=Constants_Department){
			if(member.externalType == '1'){
				showTitle = showTitle + "\n" + Constants_Component.get(Constants_JoinAccount) + ": " + showDeptN.escapeHTML(true);
			}else{
				showTitle = showTitle + "\n" + Constants_Component.get(Constants_Department) + ": " + showDeptN.escapeHTML(true);
			}
		}
	}else{
		showTitle = member.name.escapeHTML(true);
	}


	var mId = member.id;
	// 需要返回部门信息参数
	if(returnMemberWithDept || memberWithDeptInfo){
		var __departmentId  = deptId, __postId = postId;
		if(type == Constants_Department){
			if(entity && entity instanceof Department){
				__departmentId = entity.id;
			}else{
				__departmentId = member.departmentId;
				__postId = member.postId;
			}
		}else if(type == Constants_Post){
			if(entity && entity instanceof Post){
				__postId = entity.id;
			}else{
				__departmentId = member.departmentId;
				__postId = member.postId;
			}
		}else if(type == Constants_Outworker) {
			__departmentId = entity.id;
			__postId = member.postId || postId;
		}

		if(returnMemberWithDept && (type == Constants_Department || type == Constants_Post)){// 返回的数据需要显示人员部门岗位信息
			mId = __departmentId + valuesJoinSep2 + member.id + valuesJoinSep2 + __postId;
		}
		if(memberWithDeptInfo){
			extendAttribute = extendAttribute + " departmentId='"+ __departmentId +"' postId='" + __postId+ "' ";
		}
	}

	var sb = new StringBuffer();
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		sb.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\" title='" + showTitle + "' value='")
			.append(mId).append("' type='Member' accountId='").append(_accountId).append("' externalType='").append(member.externalType).append("' ")
			.append(extendAttribute).append(" ").append(">")
			.append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</div>");
	}else{
		sb.append("<option style='text-overflow: ellipsis;overflow: hidden;margin:4px 0 0 4px' title='" + showTitle + "' value='").append(mId).append("' type='Member' accountId='").append(_accountId).append("' externalType='").append(member.externalType).append("' ")
			.append(extendAttribute).append(" ").append(">")
			.append((showText.escapeHTML(true)).replace(new RegExp("&nbsp;", 'g'),"&ensp;")).append("</option>");
	}
	return sb.toString().replace("\|,"," ");
}

/**
 * 添加组的成员到List2
 */
function addTeamMember2List2(id, keyword){
	var team = topWindow.getObject(Constants_Team, id);
	if(!team){ //个人组不管
		return;
	}
	var hiddenOtherMemberOfTeam = getParentWindowData("hiddenOtherMemberOfTeam");
	var concurentMembers = topWindow.getDataCenter(Constants_concurentMembers, currentAccountId);


	var selectHTML = new StringBuffer();
	selectHTML.append(select2_tag_prefix);

	var sepTteamObj = document.getElementById("sep_team");
	var isShowRelatemember = sepTteamObj && sepTteamObj.checked == true;

	if(isShowRelatemember){
		selectHTML.append(addTeamMemberOfType(concurentMembers, team.getSupervisors(), "Supervisor"));
	}

	selectHTML.append(addTeamMemberOfType(concurentMembers, team.getLeaders(), "Leader"));
	selectHTML.append(addTeamMemberOfType(concurentMembers, team.getMembers(), "Member"));

	if(isShowRelatemember){
		selectHTML.append(addTeamMemberOfType(concurentMembers, team.getRelatives(), "Relative"));
	}

	//Type : Leader/主管 Member/组员 Supervisors/领导 Relative/关联人员
	//如果type 部门，岗位，组，人员    _members 中包含list 只有一个对应的实体
	//如果type是部门下的岗位，_members 中包含list，一个是部门对象，一个是岗位对象
	function addTeamMemberOfType(concurentMembers, _members, type){
		if(!_members){
			return "";
		}

		var loadAccountData = new Array();

		var str = new StringBuffer();
		for(var i = 0; i < _members.size(); i++){
			var _accountId;
			var member = _members.get(i);
			var memberType = member.type;
			var memberIdStr = member.id;
			var memberId = memberIdStr;
			if(memberId.indexOf("_")>=0){
				var index0 = memberIdStr.indexOf("_");
				_accountId = memberIdStr.substr(0,index0);
				memberId = memberIdStr.substr(index0+1);

				if(!loadAccountData.contains(_accountId) && currentAccountId != _accountId){
					loadAccountData.push(_accountId);
					topWindow.initOrgModel(_accountId, currentMemberId, extParameters);
				}
			}

			if(excludeElements.contains(memberType + memberId)){
				continue;
			}

			var showText = member.name.getLimitLength(nameMaxLength.three[0]);
			var titleText = member.name;

			titleText = titleText+"  ";
			showText = showText.getLimitLength(nameMaxLength.three[0]);
			showText += getNameSpace(nameMaxLength.three[0] + nameMaxSpace - showText.getBytesLength());

			if(memberType == Constants_Member){
				if(excludeElements.contains(Constants_Member + memberId)){
					continue;
				}
				var teamMember = topWindow.getObject(Constants_Member, memberId, _accountId);
				if(teamMember && teamMember.departmentId){
					var memberDept = topWindow.getObject(Constants_Department, teamMember.departmentId, _accountId);
					if(memberDept){
						showText += memberDept.name;
						titleText += memberDept.name;
					}
				}
			}

			var tempString =getNameSpace(nameMaxLength.three[0] + nameMaxSpace + nameMaxLength.three[1] + nameMaxSpace - showText.getBytesLength());
			showText += tempString;
			titleText += "  ";
			showText += $.i18n("selectPeople.Team" + type + "_label");
			titleText += $.i18n("selectPeople.Team" + type + "_label");

			if(!v3x.getBrowserFlag('selectPeopleShowType')){
				str.append("<div class='member-list-div' seleted='false' ondblclick=\"selectOne('" + memberType + "', this)\"  onclick=\"selectMemberFn(this,'memberDataBody')\"  value=\"").append(memberId).append("\" type=\"").append(memberType).append("\" accountId=\"").append(_accountId).append("\">").append(showText.escapeHTML(true)).append("</div>");
			}else{
				str.append("<option value=\"").append(memberId).append("\" ondblclick=\"selectOne('" + memberType + "', this)\" title=\"").append(titleText.escapeHTML(true)).append("\" type=\"").append(memberType).append("\" accountId=\"").append(_accountId).append("\" class='TeamMember_" + type + "'>").append(showText.escapeHTML(true)).append("</option>");
			}

		}

		return str;
	}

	selectHTML.append(memberDataBody_div_end);

	document.getElementById("Area2").innerHTML = selectHTML.toString();
	initIpadScroll("memberDataBody");//ipad滚动条解决
}

/**
 * 监听Member的事件
 */
function listenermemberDataBody(object){
	tempNowSelected.clear();
	var ops = object.options;
	for(var i = 0; i < ops.length; i++) {
		var option = ops[i];
		if(option.selected){
			if(option.id && option.id =="more"){
				option.id="loading";
				option.innerHTML=$.i18n("selectPeople.data.loading");

				window.setTimeout(function(){
					var startIndex = option.getAttribute("startIndex");
					var type = pagingList2Param.get("type");
					var id = pagingList2Param.get("id");
					var keyword = pagingList2Param.get("keyword");
					var fullWin = pagingList2Param.get("fullWin");
					var entity = pagingList2Param.get("entity");
					var __members = pagingList2Param.get("__members");
					var pagingHtml = getMembersHTMLPaging(startIndex, type, id, keyword, fullWin, entity, __members);
					//var pagingHtml = eval(evalStr);

					//删除加载全部的option选项
					//window.clearInterval(loadingInterval);
					$("option[id='loading']").remove();
					//tempNowSelected.clear();
					//追加分页数据
					$("#"+object.id).append(pagingHtml);
				},100);
			}else{
				var e = getElementFromOption(option);
				if(e){
					tempNowSelected.add(e);
				}
			}
		}
	}
}

/**
 *
 * @return 0-允许访问; 1-允许看,无动作; -1; //不显示
 */
function isShowDepartmentTree(depart){
	var showDepartmentsOfTree = getParentWindowData("showDepartmentsOfTree");
	if(showDepartmentsOfTree != null && showDepartmentsOfTree != ""){
		var showDepartmentsOfTreeStr = showDepartmentsOfTree.split(",");
		if(showDepartmentsOfTreeStr.indexOf(depart.id) > -1){
			return 0;
		}

		for(var i = 0; i < showDepartmentsOfTreeStr.length; i++) {
			var d = topWindow.getObject(Constants_Department, showDepartmentsOfTreeStr[i]);
			if(!d){
				d = topWindow.getObject(Constants_BusinessDepartment, showDepartmentsOfTreeStr[i]);
			}
			if(d && d.accountId && currentAccountId) {
				if(d.path == depart.path || depart.path.startsWith(d.path)){//当前部门或子部门
					return 0; //允许访问
				}

				if(d.path.startsWith(depart.path)){//当前部门是我的上级部门
					return 1; //允许看
				}
			}
		}

		return -1; //禁止
	}

	var showDepartmentsNoChildrenOfTree = getParentWindowData("showDepartmentsNoChildrenOfTree");
	if(showDepartmentsNoChildrenOfTree != null && showDepartmentsNoChildrenOfTree != ""){
		var showDepartmentsOfTreeStr = showDepartmentsNoChildrenOfTree.split(",");

		for(var i = 0; i < showDepartmentsOfTreeStr.length; i++) {
			var d = topWindow.getObject(Constants_Department, showDepartmentsOfTreeStr[i]);
			if(!d){
				d = topWindow.getObject(Constants_BusinessDepartment, showDepartmentsOfTreeStr[i]);
			}
			if(d && d.accountId && currentAccountId) {
				if(d.path == depart.path){//当前部门或子部门
					return 0; //允许访问
				}

				if(d.path.startsWith(depart.path)){//当前部门是我的上级部门
					return 1; //允许看
				}
			}
		}

		return -1; //禁止
	}

	return 0; //允许访问

}

function initAreaTopSub1(currentAccountId,selectSubDataId){
	if(tempNowPanel.type == Constants_BusinessDepartment){
		initTree(Constants_BusinessDepartment, currentAccountId, selectSubDataId);
	}else if(tempNowPanel.type == Constants_Node || tempNowPanel.type == Constants_FormField || tempNowPanel.type == Constants_BusinessRole  || tempNowPanel.type == Constants_AppProperty){
		initList(tempNowPanel.type , '' , selectSubDataId);
	}
	clearList2();
	reArea_1_2();
	if(!checkIsShowArea2()){
		hiddenArea2(true);
		document.getElementById("Separator1").style.display = "none";
	}
}

function initAccount(metadataId){
	if(metadataId == '-1'){//还是单位树
		initTree(Constants_Account, currentAccountId);
	}else{
		initList(Constants_Account , '', '', metadataId);
	}
	clearList2();
	reArea_1_2();
	if(!checkIsShowArea2()){
		hiddenArea2(true);
		document.getElementById("Separator1").style.display = "none";
	}
}

/**
 * 显示树形结构
 */
function initTree(type, selectAccountId, selectSubDataId){
	tree = new WebFXTree();
	var root = null;
	var allRoots = [];
	var allAccountRoots = [];
	var currentNodeId = null;
	var lockTree = false;

	if(type == Constants_Account){
		root = allAccounts.get(accessableRootAccountId[0]);
		currentNodeId = accessableRootAccountId[0];

		for ( var i = 0; i < accessableRootAccountId.length; i++) {
			allRoots.push(allAccounts.get(accessableRootAccountId[i]));
		}

		/*        var accountMetadatas = topWindow.getDataCenter(Constants_AccountMetadataTag, currentAccountId);
        $("#areaTopList1_" + type).append("<option value='-1'>" + "<所有单位>" + "</option>");
		for(var i = 0; i < accountMetadatas.size(); i++){
			var amd = accountMetadatas.get(i);
			var amdId = amd.id;
			var amdName = amd.name;
			$("#areaTopList1_" + type).append("<option value='" + amdId + "'>" + amdName + "</option>");
		}

		document.getElementById("AreaTop1_Account").style.display = "";*/
		reArea_1_2();

	}else if(type == Constants_BusinessDepartment){
		clearList2();
		var businessAccounts = new ArrayList();
		var allBusinessAccounts = topWindow.getDataCenter(Constants_BusinessAccount, currentAccountId);
		var currentBusinessAccount = getParentWindowData("currentBusinessAccount");
		if(!isAdmin){
			var alwaysShowBusiness = getParentWindowData("alwaysShowBusiness") || "";
			for (var i = 0; i < allBusinessAccounts.size(); i++) {
				var ba = allBusinessAccounts.get(i);
				var isPublic = ba.isPublic;
				if(isPublic == true || isPublic == 'true' || alwaysShowBusiness.indexOf(ba.id)>=0 ){//公开的业务线都能看见
					businessAccounts.add(ba);
				}else if(currentBusinessAccount && currentBusinessAccount == ba.id){//指定了业务线，那就显示这个业务线。
					businessAccounts.add(ba);
				}else{
					var memberIds = ba.memberIds;//私有的业务线只有业务线内的人可见
					if(memberIds != undefined && memberIds.indexOf(currentMemberId.toString())>=0){
						businessAccounts.add(ba);
					}
				}
			}
		}else{
			businessAccounts = allBusinessAccounts;
		}

		if(!selectSubDataId && businessAccounts.size() > 0){
			if(currentBusinessAccount){
				selectSubDataId = currentBusinessAccount;
			}else{
				selectSubDataId = businessAccounts.get(0).id;
			}
		}

		$("#areaTopList1_SubInfo option").remove();
		for(var i = 0; i < businessAccounts.size(); i++){
			var ba = businessAccounts.get(i);
			var bId = ba.id;
			var bName = ba.name;

			if(!selectSubDataId){
				selectSubDataId = bId;
			}
			if(selectSubDataId == bId){
				$("#areaTopList1_SubInfo").append("<option value='" + bId + "' selected='selected'>" + bName + "</option>");
				root = ba;
				allRoots.push(root);
			}else{
				$("#areaTopList1_SubInfo").append("<option value='" + bId + "'>" + bName + "</option>");
			}
		}
		if(businessAccounts.size() == 0){
			document.getElementById("AreaTop1_SubInfo").style.display = "none";
		}else{
			document.getElementById("AreaTop1_SubInfo").style.display = "";
		}

		reArea_1_2();

		var unallowedChangeBusinessAccount = getParentWindowData("unallowedChangeBusinessAccount") || false;
		if(unallowedChangeBusinessAccount){
			$("#AreaTop1_SubInfo").disable();
		}

	}else{
		root = allAccounts.get(selectAccountId);
		currentNodeId = departmentId;
		lockTree = onlyCurrentDepartment;

		if(root!= null){
			currentAccountLevelScope = parseInt(root.levelScope, 10);
			allRoots.push(root);
		}
	}

	if(isV5Member && !isInternal){
		currentNodeId = null;
		if(root && root.externalType && root.externalType!="0"){//编外人员在任何情况下都看不到外部人员
			root = null;
			allRoots = [];
		}
	}
	var isShowCheckboxIntree = getParentWindowData("isShowCheckboxIntree") || false;
	var isShowCheckbox = (type == Constants_Account || isShowCheckboxIntree) && checkCanSelect(type) && maxSize != 1;

	if(lockTree) disableButton("button1");

	var treeHtml = new StringBuffer();

	for(var i = 0; i < allRoots.length; i++){
		var r = allRoots[i];
		var t;
		if(type == Constants_Department){
			t = new WebFXTree(r.id, Constants_Account, r.name, type, true, "showList2('" + Constants_Account + "', '" + r.id + "')", lockTree, "");
		}else if (type == Constants_JoinAccountTag){
			t = new WebFXTree(r.id, type, r.name, type, true, "clearList2()", lockTree, "");
		}else if (type == Constants_MemberMetadataTag || type == Constants_OrgMetadataTag){
			t = new WebFXTree(r.id, type, r.name, type, true, "clearList2()", lockTree, "");
		}else if(type == Constants_BusinessDepartment){
			t = new WebFXTree(r.id, Constants_BusinessAccount, r.name, type, true, "showList2('" + Constants_BusinessAccount + "', '" + r.id + "')", lockTree, "");
		}else{
			t = new WebFXTree(r.id, Constants_Account, r.name, type, true, "clearList2()", lockTree, "");
		}
		t.setBehavior('classic');
		t.hasShowChild = true;
		t.hasGoChild = true;
		t.isShowCheckbox = isShowCheckbox;
		t.externalType = r.externalType;

		treeHtml.append(t);

		allAccountRoots.push(t);

		if(i == 0){
			tree = t;
		}
	}

	if(document.getElementById("AreaTop1_" + type)){
		document.getElementById("Area1").innerHTML = "<div id='List1' style='width:363px; height:138px; overflow:auto;padding:0 0 0 5px;'>" + treeHtml + "</div>";
	}else{
		document.getElementById("Area1").innerHTML = "<div id='List1' style='width:363px; height:168px; overflow:auto;padding:0 0 0 5px;'>" + treeHtml + "</div>";
	}
	document.getElementById("Area1").className = "iframe";

	if(root == null){
		return;
	}

	var allParents = null;

	if(!treeInMyDepart && type == Constants_Department && currentNodeId != null){
		allParents = topWindow.findMultiParent(topWindow.getDataCenter(type, selectAccountId), currentNodeId);
		showChildTree(type, root.id, tree, onlyCurrentDepartment);
		var childs=tree.childNodes;
		var action = null;
		for(var i = 0; i < childs.length; i++){
			var c=childs[i];
			if(c!=null){
				if(allParents.size()==0){
					if(c.id==currentNodeId){
						var entity = topWindow.getObject(type, c.id);
						action = (isShowDepartmentTree(entity) == 0) ? "showList2('" + type + "', '" + c.id + "')" : "";
						c.select();
						break;
					}
				}else{
					if(c.id==currentNodeId){
						var entity = topWindow.getObject(type, c.id);
						action = (isShowDepartmentTree(entity) == 0) ? "showList2('" + type + "', '" + c.id + "')" : "";
						c.select();
						break;
					}
					for(var j = 0; j < allParents.size(); j++){
						var n = allParents.get(j);
						if(((n.isInternal == false || n.isInternal == "false") && n.externalType == "0") || n.id == root.id){
							continue;
						}
						//该部门不显示
						if(excludeElements.contains(type + n.id) || !checkIncludeElements(type, n.id)){
							continue;
						}
						var _status = isShowDepartmentTree(n);
						if(_status == -1){
							continue;
						}
						if(n.id==c.id ){
							c.expand();
							childs=c.childNodes;
							i=-1;
							break;
						}
					}
				}
			}
			if(childs==null){
				break;
			}
		}
		if(action!=null){
			eval(action);
		}
	}
	else if(type == Constants_Account){
		allParents = topWindow.findMultiParent(accessableAccounts.values(), currentNodeId);

		if(allParents != null && isGroupVer){
			var expandNode = tree;
			var isShowCheckbox = (type == Constants_Account) && checkCanSelect(type) && maxSize != 1;
			for(var i = 0; i < allParents.size(); i++){
				var n = allParents.get(i);
				if(n.isInternal == false || n.isInternal == "false" || n.id == root.id){
					continue;
				}

				//该部门不显示
				if(excludeElements.contains(type + n.id) || !checkIncludeElements(type, n.id)){
					continue;
				}

				var _status = isShowDepartmentTree(n);
				if(_status == -1){
					continue;
				}

				var action = (_status == 0) ? "showList2('" + type + "', '" + n.id + "')" : "";

				var item = new WebFXTreeItem(n.id, type, n.name, n.hasChild, action, lockTree, n.description);
				item.isShowCheckbox = isShowCheckbox;
				item.externalType = n.externalType;
				expandNode.add(item);

				expandNode = item;
			}

			var myNode = showChildTree(type, expandNode.id, expandNode, lockTree);
			webFXTreeHandler.expanded = expandNode;

			for(var i = 0; i < allAccountRoots.length; i++){
				if(allAccountRoots[i].id == expandNode.id) continue;
				showChildTree(type, allAccountRoots[i].id, allAccountRoots[i]);
			}

			//tree.expandAll();

			if(myNode != null){
				myNode.toggle();
				myNode.select();

				eval(myNode.action);
			}

			//		treeInMyDepart = true;

			return;
		}

		showChildTree(type, root.id, tree);
	}else{
		showChildTree(type, root.id, tree);
	}
}

/**
 * ????
 */
function showChildTree(type, id, parentNode, _onlyCurrentDepartment){
	if(!type || type == undefined){
		return;
	}
	var datas2Show = null;
	if(type == Constants_Account){
		var account0 = accessableAccounts.get(id);
		datas2Show = account0.accessChildren;
	}else if(type == Constants_BusinessDepartment){
		datas2Show = topWindow.findChildInList(topWindow.getDataCenter(type, currentAccountId), id);
	} else{
		var _getChildrenFun = Constants_Panels.get(type).getChildrenFun;

		var entity = topWindow.getObject(type, id);
		if(entity && _getChildrenFun){
			if(tempNowPanel.type == Constants_Department && window.isInternal && isNeedCheckLevelScope && !isAdmin){
				datas2Show = topWindow.findChildInListFilterByDepartmentAccess(topWindow.getDataCenter(type,currentAccountId), id);
			}else{
				datas2Show = eval("entity." + _getChildrenFun + "()");
			}
		}
		else{

			if(tempNowPanel.type == Constants_Department && window.isInternal && isNeedCheckLevelScope && !isAdmin){
				//要进行部门可见性过滤部门
				datas2Show = topWindow.findChildInListFilterByDepartmentAccess(topWindow.getDataCenter(type, id), id);
			}else{
				datas2Show = topWindow.findChildInList(topWindow.getDataCenter(type, id), id);
			}
		}
	}

	if(!datas2Show){
		return;
	}

	if(!isAdmin && (isNeedCheckLevelScope || isVjoinMember)){
		if(type == Constants_Department){
			var temp = new ArrayList();
			if(tempNowPanel.type == Constants_JoinOrganization){
				var _AccessVjoinDepts = topWindow.AccessVjoinDepts;
				if(_AccessVjoinDepts != null){
					for(var i = 0; i < datas2Show.size(); i++){
						if(_AccessVjoinDepts.contains("D"+datas2Show.get(i).id)){
							temp.add(datas2Show.get(i));
						}
					}
				}
				datas2Show = temp;
			}else{
				if(!isV5Member && tempNowPanel.type == Constants_Department){
					var _AccessInnerDepts = topWindow.AccessInnerDepts;

					if(_AccessInnerDepts != null){
						for(var i = 0; i < datas2Show.size(); i++){
							if(_AccessInnerDepts.contains("D"+datas2Show.get(i).id)){
								if(datas2Show.get(i).hasChild){
									var datas2Child = topWindow.findChildInList(topWindow.getDataCenter(type, currentAccountId), datas2Show.get(i).id);
									var hasChild = false;
									for(var j = 0; j < datas2Child.size(); j++){
										if(_AccessInnerDepts.contains("D"+datas2Child.get(j).id)){
											hasChild = true;
											break;
										}
									}
									datas2Show.get(i).hasChild = hasChild;
								}
								temp.add(datas2Show.get(i));
							}
						}
					}

					datas2Show = temp;
				}
			}

		}
	}


	var myNode = null;
	var isShowCheckboxIntree = getParentWindowData("isShowCheckboxIntree") || false;
	var isShowCheckbox = (type == Constants_Account || isShowCheckboxIntree) && checkCanSelect(type) && maxSize != 1;

	var length = datas2Show.size();
	var instance = datas2Show.instance;
	var orgMetadataTagTypess = getParentWindowData("orgMetadataTagTypes","Account,Department,Post,Member");
	var isDepartment = orgMetadataTagTypess.indexOf(Constants_Department) > -1;
	var isPost = orgMetadataTagTypess.indexOf(Constants_Post)> -1;
	var isMember = orgMetadataTagTypess.indexOf(Constants_Member)> -1;
	var isAccount = orgMetadataTagTypess.indexOf(Constants_Account)> -1;
	var getObject2 = topWindow.getObject;
	parentNode.initChildNodesTemp();
	for(var i = 0; i < length; i++){
		var n = instance[i];
		var externalType = n.externalType;
		var id = n.id;
		var isInternal = n.isInternal;

		if (externalType !== "0" && type === Constants_Account) {
			continue;
		}
		// OA-231251[主数据，没有配置不显示]
		if(type === Constants_OrgMetadataTag
			&& (id === "487522032543285946" || id === "-6402932485259836565" ||id === "-1445256705290776728" || id === "-6950443133669063589")
			&& (n.directChildren === null ||n.directChildren.length === 0)){
			continue;
		}

		if (externalType !== "0" && showExternalType && showExternalType !== externalType) {
			continue;
		}

		if(_onlyCurrentDepartment === true && departmentId !== id){
			continue;
		}

		if((isV5Member || (isVjoinMember && isAdmin)) && externalType === "0" && (isInternal === false || isInternal === "false")){
			continue;
		}

		//该部门不显示
		if(excludeElements.contains(type + id)){
			continue;
		}

		if(type === Constants_Department || type === Constants_BusinessDepartment){
			var _status = isShowDepartmentTree(n);
			if(_status == -1){
				continue;
			}
		}

		// orgMetadataTagTypes 主数据显示支持类型,默认 "Account,Department,Post,Member"
		// @since v80.0sp2  add by shuqi
		if(id == "487522032543285946" && !isDepartment){//部门分类
			continue;
		} else if(id == "-6402932485259836565" && !isPost){//岗位分类
			continue;
		} else if(id == "-1445256705290776728" && !isMember){//人员分类
			continue;
		} else if(id == "-6950443133669063589" && !isAccount){//单位分类
			continue;
		}

		var action = (_status == 0) ? "showList2('" + type + "', '" + id + "')" : "";

		var hasChild = n.hasChild;
		// if(isInternal && type == Constants_Department && isNeedCheckLevelScope && !isAdmin){
		// 	var d = topWindow.getObject(Constants_DepartmentAccess, id, currentAccountId);
		// 	if(d && d.type == 'M'){//通过部门下的人员，才找到的该部门，不能再显示此部门下的子部门
		// 		hasChild = false;
		// 	}
		//
		// }
		var item = new WebFXTreeItem(id, type, n.name, hasChild, action, false, n.description);
		if(type == Constants_OrgMetadataTag){
			item.fullName = n.fullName;
		}
		item.isShowCheckbox = isShowCheckbox;
		item.externalType = externalType;

		if(departmentId == id){
			myNode = item;
		}

		// parentNode.add(item);
		parentNode.addChildNode(item);
	}
	parentNode.drawNodes();

	parentNode.hasShowChild = true;
	parentNode.hasGoChild = false;

	webFXTreeHandler.expanded = parentNode;

	return myNode;
}

function getDataCenterMapDepartmentAccess(){
	window.dataCenterMap =  window.dataCenterMap||[];
	var dataCenterMap = topWindow.dataCenterMap
	for (var dataCenterItem in dataCenterMap) {
		if (dataCenterMap[dataCenterItem]) {
			try {
				window.dataCenterMap[dataCenterItem].push(JSON.parse(JSON.stringify(dataCenterMap[dataCenterItem]['Constants_DepartmentAccess'])));
			} catch (e) {}
		}

	}
}

/**
 * ????
 */
function showParentTree(){
	if(area1Status){//????????????????????????????
		hiddenArea1();
	}

	if(tree == null){
		return;
	}

	var nowExpandNode = tree.getSelected();

	var _parentNode = nowExpandNode.parentNode;

	if(nowExpandNode == null ||  _parentNode== null){
		return;
	}

	webFXTreeHandler.toggle(document.getElementById(_parentNode.id));
	_parentNode.select();
	showList2(_parentNode.type, _parentNode.id);
}
/*
 * ???????
 */
function selectList1Item(type, objTD){
	tempNowSelected.clear();

	var ops = objTD.options;
	var count = 0;
	for(var i = 0; i < ops.length; i++) {
		var option = ops[i];
		if(option.selected){
			if(option.id && option.id =="more"){
				option.id="loading";
				option.innerHTML=$.i18n("selectPeople.data.loading");

				var startIndex = option.getAttribute("startIndex");
				window.setTimeout(function(){
					var pagingHtml = "";
					var keyword = pagingList1Param.get("keyword");
					var datas = pagingList1Param.get("datas");
					if(type == Constants_Post){
						var selectAccountId = pagingList1Param.get("selectAccountId");
						pagingHtml = getPostListHTMLStrPaging(startIndex, keyword, selectAccountId, datas);
					}else if(type == Constants_Team){
						pagingHtml = getTeamListHTMLStrPaging(startIndex, keyword, datas);
					}

					$("option[id='loading']").remove();
					//tempNowSelected.clear();
					//追加分页数据
					$("#"+objTD.id).append(pagingHtml);
				},100);
			}else{
				var e = getElementFromOption(option);
				if(e){
					tempNowSelected.add(e);
					count++;
				}
			}
		}
	}

	//机构组点击监听判断
	if(count == 1 && type == Constants_OrgTeam ){
		var id = objTD.value;
		showList2(type, id);
	}
	if(count == 1 && tempNowPanel.isShowMember == true){
		var id = objTD.value;
		showList2(type, id);
	}

	if(nowSelectedList1Item != null){
		nowSelectedList1Item = null;
	}

	nowSelectedList1Item = objTD;
}
/**
 * ??????
 */
function selectOneMember(selectObj){
	document.body.scrollTop = 0;
	if(!selectObj || selectObj.selectedIndex < 0){
		return;
	}

	var option = selectObj.options[selectObj.selectedIndex];
	if(!option){
		return;
	}

	var element = getElementFromOption(option);
	if(element){
		tempNowSelected.clear();
		tempNowSelected.add(element);

		selectOne();
	}
}

/**
 * 选择了区域2的项目，转换成Element对象
 */
function getElementFromOption(option){
	if(!option){
		return null;
	}
	var typeStr = option.getAttribute("type");
	var idStr  =  option.getAttribute("value");
	var _accountId = option.getAttribute("accountId");
	var _externalType = option.getAttribute("externalType");
	var businessDeptId = option.getAttribute("businessDeptId");
	var isBusinessMember = option.getAttribute("isBusinessMember") || false;
	var postId = option.getAttribute("postId");
	var departmentId = option.getAttribute("departmentId");

	//Element(type, id, name, typeName, accountId, accountShortname, description)
	//如果是选择部门或者部门下的岗位,title 显示部门的全路径（全路径暂时存放在description属性中）
	var _element;
	if(typeStr == Constants_Member && selectTypes.contains('Member') && idStr.indexOf("#") > -1 && returnMemberWithDept ){
		var ids = idStr.split(valuesJoinSep2);

		var memberId;
		var memberName;
		var entity = topWindow.getObject(Constants_Member, ids[1]);
		if(entity){
			memberId = entity.id;
			memberName = entity.name;
		}

		var deptId;
		var deptName;
		var deptEntity = topWindow.getObject(Constants_Department, ids[0]);
		if(deptEntity){
			deptId = deptEntity.id;
			deptName = deptEntity.name;
		}

		var postId;
		var postName;
		var postEntity = topWindow.getObject(Constants_Post, ids[2]);
		if(postEntity){
			postId = postEntity.id;
			postName = postEntity.name;
		}

		_element = new Element(typeStr, idStr, getName(typeStr, idStr,_accountId), "", _accountId, "", getFullNameStr(typeStr, idStr), memberId, memberName, deptId, deptName, postId, postName);

	} else{
		_element = new Element(typeStr, idStr, getName(typeStr, idStr,_accountId), "", _accountId, "", getFullNameStr(typeStr, idStr));
	}
	if(typeStr == Constants_Member){
		//需要返回人员的部门信息，需要绕一下
		PanelUtils.fillDeptInfo(_element,idStr,businessDeptId,departmentId,postId,isBusinessMember == "true",_accountId);
	}
	if (_externalType) {
		_element.externalType = _externalType;
	}
	return _element;
}

/**
 * 获取显示名称
 * @param typeStr   当前选择类型
 * @param idStr     当前选择Id
 * @param accountId0    单位Id
 * @returns {*}
 */
function getName(typeStr, idStr,accountId0){
	if(idStr=="" || typeStr=="" || idStr == undefined || typeStr == undefined || idStr == null || typeStr == null){
		return "";
	}
	if(typeStr == Constants_Node || typeStr == Constants_FormField || typeStr == Constants_OfficeField || typeStr == Constants_WfSuperNode
		|| typeStr == Constants_AppDoc|| typeStr == Constants_AppMeeting|| typeStr == Constants_AppMeetingSummary|| typeStr == Constants_AppBulletin|| typeStr == Constants_AppNews){
		var m = (typeStr == Constants_FormField || typeStr == Constants_AppDoc || typeStr == Constants_AppMeeting || typeStr == Constants_AppMeetingSummary || typeStr == Constants_AppBulletin || typeStr == Constants_AppNews) ? 1 : 0;
		var nodes = topWindow.getDataCenter(typeStr, currentAccountId);
		for(var i = 0; i < nodes.size(); i++){
			if(idStr == nodes.get(i).id){
				return nodes.get(i).name;
			}
			if(idStr.startsWith(nodes.get(i).id)){
				var r = nodes.get(i).getRoles();
				for(var j = 0; j < r.size(); j++){
					if(r.get(j).K == idStr.substring(nodes.get(i).id.length + m)){
						return nodes.get(i).name + r.get(j).N;
					}
				}
			}
			if(idStr.startsWith(nodes.get(i).id)){//业务线下的角色
				var r = topWindow.getDataCenter(Constants_BusinessRole, currentAccountId);
				for(var z = 0; z < r.size(); z++){
					if(r.get(z).id == idStr.substring(nodes.get(i).id.length + m)){
						return r.get(z).preShow + "-" + nodes.get(i).name + r.get(z).name;
					}
				}
			}
		}
		return ;
	}
	if(typeStr == Constants_BusinessDepartment){
		var businessDepartment = topWindow.getObject(typeStr, idStr, accountId0);
		if(businessDepartment){
			return businessDepartment.preShow + "-" + businessDepartment.name;
		}
		return;
	}

	if(typeStr == Constants_OrgMetadataTag){
		var ids = idStr.split("_");
		var orgMetadata = topWindow.getObject(typeStr, idStr);
		if(ids.length == 2){//包含部门的id
			orgMetadata = topWindow.getObject(typeStr, ids[0]);
		}
		if(orgMetadata){
			var departmentName = "";
			if(ids.length == 2){//metadataId
				//如果有第2位，则是部门人员属性所属的部门id
				var department = topWindow.getObject(Constants_Department, ids[1]);
				if(department){
					departmentName = department.name;
				}
			}
			if(departmentName != ""){
				return "[" + departmentName + "]" + orgMetadata.fullName;
			}else{
				return orgMetadata.fullName;
			}
		}
		return;
	}

	if(topWindow.Constants_Custom_Panels.keys() != null && topWindow.Constants_Custom_Panels.keys().contains(typeStr)){
		var custom = topWindow.getDataCenter(typeStr, currentAccountId);
		var customPanel = topWindow.Constants_Custom_Panels.get(typeStr);
		var sp  = customPanel.sp;
		for(var i = 0; i < custom.size(); i++){
			if(idStr == custom.get(i).id){
				return custom.get(i).name;
			}
			if(idStr.startsWith(custom.get(i).id)){
				var r = custom.get(i).getRelationData();
				for(var j = 0; j < r.size(); j++){
					if(r.get(j).K == idStr.substring(custom.get(i).id.length + sp.length)){
						return custom.get(i).name + r.get(j).N;
					}
				}
			}
		}
		return ;
	}



	var businessPreShow = "";
	var types = typeStr.split(valuesJoinSep);
	var ids   = idStr.split(valuesJoinSep);

	var elementName = [];
	var entity ;
	for(var i = 0; i < types.length; i++) {
		entity = topWindow.getObject(types[i], ids[i], currentAccountId);

		if(entity == null){
			//加载单位数据
			accountId = accountId || currentAccountId;
			topWindow.initOrgModel(accountId, currentMemberId, extParameters);
			entity = topWindow.getObject(types[i], ids[i], accountId);
			if(entity == null && accountId0){
				topWindow.initOrgModel(accountId0, currentMemberId, extParameters);
				entity = topWindow.getObject(types[i], ids[i], accountId0);
			}

			if(entity == null){
				entity = topWindow.getObject(types[i], ids[i]);
			}
		}

		if(types[i] == Constants_Role){
			if(entity.externalType == 1 || entity.externalType == 2){//Vjoin 的角色
				entity.name  = entity.name + $.i18n("selectPeople.out.title");
			}
		}

		elementName[elementName.length] = entity ? entity.name : ((searchNames.get(idStr))?searchNames.get(idStr).name:'');
		if(types[i] == Constants_BusinessDepartment || types[i] == Constants_BusinessRole){
			businessPreShow =  entity.preShow;
		}

	}
	//加载了外单位的数据，重启把currentAccountId_orgDataCenter修改回去。
	topWindow.currentAccountId_orgDataCenter = currentAccountId;

	if(businessPreShow != ""){
		return businessPreShow + "-" +elementName.join(arrayJoinSep);
	}
	return elementName.join(arrayJoinSep);
}

function getFullNameStr(typeStr, idStr){
	if(typeStr == "Department_Post"){

		var types = typeStr.split(valuesJoinSep);
		var ids   = idStr.split(valuesJoinSep);

		var elementName = [];
		var entity ;
		for(var i = 0; i < types.length; i++) {
			entity = topWindow.getObject(types[i], ids[i]);
			if(entity == null){
				accountId = accountId || currentAccountId;
				topWindow.initOrgModel(accountId, currentMemberId, extParameters);
				entity = topWindow.getObject(types[i], ids[i]);
			}
			elementName[elementName.length] = entity ? ((types[i] == Constants_Department)?entity.getFullName() : entity.name) : searchNames.get(idStr).name;
		}

		return elementName.join(arrayJoinSep);
	}// sunqs 2018-10-18 右侧显示人员所属部门全路径
	else if(typeStr == Constants_Member){
		var elementName = [];

		var entity;
		var deptEntity;

		var postEntity;
		if(returnMemberWithDept && selectTypes.contains('Member') && idStr.indexOf("#") > -1){
			var ids = idStr.split(valuesJoinSep2);
			entity = topWindow.getObject(Constants_Member, ids[1]);
			deptEntity = topWindow.getObject(Constants_Department, ids[0]);
			postEntity = topWindow.getObject(Constants_Post, ids[2]);
		}else{
			entity = topWindow.getObject(typeStr, idStr);
			deptEntity = topWindow.getObject(Constants_Department, entity.departmentId);
		}
		var showTitle = entity.name;
		var showDeptN = "";
		if(deptEntity){
			showDeptN = deptEntity.getFullName();
		}
		var depTypeName = Constants_Component.get(Constants_Department);
		if(!entity.isInternal){
			if(entity.externalType!="0"){
				depTypeName = Constants_Component.get(Constants_JoinOrganization);
			}else{
				depTypeName = $.i18n("selectPeople.externalOrg.js");
			}
		}
		showTitle = showTitle + "\r\n" + depTypeName + ": " + showDeptN.escapeHTML(true);
		elementName[elementName.length] = entity ? showTitle : searchNames.get(idStr).name;
		return elementName.join(arrayJoinSep);
	}else  if(typeStr == Constants_OrgMetadataTag){
		var ids = idStr.split("_");
		var orgMetadata = topWindow.getObject(typeStr, idStr);
		if(ids.length == 2){//包含部门的id
			orgMetadata = topWindow.getObject(typeStr, ids[0]);
		}
		if(orgMetadata){
			var departmentName = "";
			if(ids.length == 2){//metadataId
				//如果有第2位，则是部门人员属性所属的部门id
				var department = topWindow.getObject(Constants_Department, ids[1]);
				if(department){
					departmentName = department.name;
				}
			}
			if(departmentName != ""){
				return "[" + departmentName + "]" + orgMetadata.fullName;
			}else{
				return orgMetadata.fullName;
			}
		}
		return;

	}
	return "";

}

var NeedCheckEmptyMemberType = new ArrayList();
NeedCheckEmptyMemberType.add(Constants_Account);
NeedCheckEmptyMemberType.add(Constants_Department);
NeedCheckEmptyMemberType.add(Constants_Team);
NeedCheckEmptyMemberType.add(Constants_Post);
NeedCheckEmptyMemberType.add(Constants_Level);
NeedCheckEmptyMemberType.add(Constants_Department + "_" + Constants_Post);
NeedCheckEmptyMemberType.add(Constants_BusinessDepartment);
//NeedCheckEmptyMemberType.add(Constants_BusinessDepartment + "_" + Constants_BusinessRole);


/**
 * 当前显示单位是否是根单位
 */
function isRootAccount(selectAccountId){
	if(selectAccountId){
		return (selectAccountId == rootAccount.id);
	}else{
		return (currentAccountId == rootAccount.id);
	}
}

/**
 * 检测集合里面是否是空的，一般检测部门和组
 * @return true - 是空的， false - 不是空的或者不需要检测
 */
function checkEmptyMember(type, id){
	if(isRootAccount(id)){
		return false;
	}


	if(!type
		|| !id
		|| !NeedCheckEmptyMemberType.contains(type)
		|| !checkCanSelectMember()){
		return false;
	}

	var ids = id.split("_");
	var types = type.split("_");

	var entity = topWindow.getObject(types[0], ids[0]);
	if(!entity){
		return true;
	}

	if(type == Constants_Post && entity.accountId == '-1730833917365171641'){ //集团基准岗
		if(entity.isEmpty == '1'){
			return true;
		}else{
			return false;
		}
	}

	if(type == Constants_Level && entity.accountId == '-1730833917365171641'){ //集团职务级别
		if(entity.isEmpty == '1'){
			return true;
		}else{
			return false;
		}
	}


	if(type == Constants_Account){
		var childrenDept = topWindow.findChildInList(topWindow.getDataCenter(Constants_Department, entity.id), entity.id);
		if(childrenDept == null || childrenDept.isEmpty()){
			topWindow.initOrgModel(entity.id, currentMemberId, extParameters);
			childrenDept = topWindow.findChildInList(topWindow.getDataCenter(Constants_Department, entity.id), entity.id);
		}

		for(var i = 0; i < childrenDept.size(); i++){
			var dept = childrenDept.get(i);
			var ms = dept.getAllMembers();
			if(ms != null && !ms.isEmpty()){
				return false;
			}
		}
		return true;
//		if(entity.memberSize == 0){
//			return true;
//		}
	}else{

		var ms = entity.getAllMembers();
		if(ms == null || ms.isEmpty()){
			return true;
		}

		if(entity.type == Constants_Department && entity.externalType == '1'){
			return false;
		}

		if(type == Constants_Department + "_" + Constants_Post){
			for(var i = 0; i < ms.size(); i++){
				var m = ms.get(i);
				if(m.postId == ids[1]){
					return false;
				}

				//部门下的副岗，可能是多个
				var sps = m.getSecondPost().get(ids[0]);
				if(sps){
					for(var c = 0; c < sps.size(); c++) {
						if(sps.get(c).id == ids[1]){
							return false;
						}
					}
				}
			}

			return true;
		}
	}


	return false;
}
/**
 * 不包含子部门时，父部门没有人员的校验
 */
function checkEmptyMemberWithoutChildDept(type, id){
	if(isRootAccount()){
		return false;
	}
	if(!type
		|| !id
		|| !NeedCheckEmptyMemberType.contains(type)
		|| !checkCanSelectMember()){
		return false;
	}

	var ids = id.split("_");
	var types = type.split("_");

	var entity = topWindow.getObject(types[0], ids[0]);
	if(!entity){
		return true;
	}

	var ms = entity.getDirectMembers();
	if(ms == null || ms.isEmpty()){
		return true;
	}

	if(type == Constants_Department + "_" + Constants_Post){
		for(var i = 0; i < ms.size(); i++){
			var m = ms.get(i);
			if(m.postId == ids[1]){
				return false;
			}

			//部门下的副岗，可能是多个
			var sps = m.getSecondPost().get(ids[0]);
			if(sps){
				for(var c = 0; c < sps.size(); c++) {
					if(sps.get(c).id == ids[1]){
						return false;
					}
				}
			}
		}

		return true;
	}

	return false;
}

/*
 * ?????????????
 * tempNowSelect ArrayList<Element>
 */
function selectOne(type, objTD){
	var flag = false;
	if(type && objTD){
		tempNowSelected.clear();
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			var ops = objTD.options;
			if(!!!ops){
				return;
			}
			var count = 0;
			for(var i = 0; i < ops.length; i++) {
				var option = ops[i];
				if(option.selected){
					var e = getElementFromOption(option);
					if(e){
						tempNowSelected.add(e);
					}
				}
			}
		}else{
			if(arguments[2]){
				var ops = document.getElementById(arguments[2]).childNodes;
				var count = 0;
				for(var i = 0; i < ops.length; i++) {
					var option = ops[i];
					if(option.getAttribute('seleted')){
						var e = getElementFromOption(option);
						if(e){
							tempNowSelected.add(e);
						}
					}
				}
				selectOneMemberDiv(objTD);
				flag = true;
			}
		}
	}
	if(!v3x.getBrowserFlag('selectPeopleShowType')){
		if(arguments[2]){
			//双击组 选择组
			listenermemberDataBodyDiv(document.getElementById(arguments[2]));
		}else{
			listenermemberDataBodyDiv(document.getElementById(temp_Div));
		}
	}
	if(tempNowSelected == null || tempNowSelected.isEmpty()){
		return;
	}

	var _showAccountShortname = false;
	var unallowedSelectEmptyGroup = getParentWindowData("unallowedSelectEmptyGroup") || false;

	var isNotShowNoMemberConfirm = getParentWindowData("isNotShowNoMemberConfirm") || false;

	var alertMessageBeyondLevelScop = new StringBuffer();
	var alertMessageEmptyMemberNO = new StringBuffer();
	var alertMessageBeyondWorkScop = new StringBuffer();
	var alertMessageBeyondMemberSizeScop = new StringBuffer();

	var isCanSelectGroupAccount = getParentWindowData("isCanSelectGroupAccount");
	var isConfirmExcludeSubDepartment = getParentWindowData("isConfirmExcludeSubDepartment");
	for(var i = 0; i < tempNowSelected.size(); i++){
		var element = tempNowSelected.get(i);
		var type = element.type;
		if(type == Constants_WFDynamicForm && element.name=="" && element.id!=""){
			var elId = element.id;
			var els = elId.split("#");
			element.name = els[1];
		}
		if(type == Constants_Outworker){
			type = Constants_Department;

			if(!checkIncludeElements(type, element.id)){
				continue;
			}
		}

		if(!checkCanSelect(type)){
			continue;
		}

		//外部单位标签，只能选枚举值
		if(type == Constants_JoinAccountTag){
			if (element.hasChild) {
				continue;
			}
		}

		if(excludeElements.contains(type + element.id)){
			continue;
		}

		if(!checkExternalMemberWorkScope(type, element.id)){
			if(isVjoinMember && !isAdmin && !isSubVjoinAdmin){
				alert("有超过工作范围的人员，不能选择！");
			}
			continue;
		}

		var _entity = topWindow.getObject(type, element.id);
		if(element.type == Constants_Department){
			if(_entity!=null &&_entity.getFullName){
				element.description = _entity.getFullName();
			}
		}

		if(element.type == Constants_Department || element.type == Constants_JoinOrganization || element.type == Constants_JoinAccount){
			element.externalType = _entity.externalType;
		}

		//内部人员: 当前是外部人员面板，检查外部单位能否直接选择，逻辑：只要有一个不可见，就返回；管理员：只判断人员是否为空
		if(isInternal && tempNowPanel.type == Constants_Outworker && type == Constants_Department && checkCanSelectMember()){
			var _ms = _entity.getAllMembers();

			if((!_ms || _ms.isEmpty()) && !showAllOuterDepartmentFlag){
				alertMessageEmptyMemberNO.append(element.name);
				continue;
			}

			if(!isAdmin && !showAllOuterDepartmentFlag){ //普通用户
				var extMember = topWindow.ExtMemberScopeOfInternal.get(element.id);
				if(!extMember){
					alertMessageEmptyMemberNO.append(element.name);
					continue;
				}

				var isSelect = true;
				for(var a = 0; a < _ms.size(); a++) {
					if(!extMember.contains(_ms.get(a).id)){
						isSelect = false;
						break;
					}
				}

				if(!isSelect){
					alertMessageBeyondWorkScop.append(element.name);
					continue;
				}
			}
		}


		//如果是vjoin的根节点
		if(tempNowPanel.type == Constants_JoinOrganization && type == Constants_Account && checkCanSelectMember()){
			//没有职务级别空的的，可以直接选，有职务级别控制的，需要判断人员是否都可以选
			if(isNeedCheckLevelScope && element.externalType!=null && element.externalType == '3'){
				if(!isAdmin && !isAdministrator){
					var _ms = topWindow.getDataCenter(Constants_Member, currentVjoinAccountId);
					var canSelect = true;
					if(isV5Member){
						for(var a = 0; a < _ms.size(); a++) {
							if(!checkVjoinMemberWorkScopeOfMember(_ms.get(a))){
								canSelect = false;
								break;
							}
						}
					}else if(isVjoinMember){
						var _VjMemberAccessVjAccounts = topWindow.VjMemberAccessVjAccounts;
						for(var a=0;a<_ms.size();a++){
							if(_VjMemberAccessVjAccounts != null && !_VjMemberAccessVjAccounts.contains("D"+_ms.get(a).departmentId)){//所选择的外单位/机构，下的人员全部在 当前外部人员可访问的外部单位内，则可以选择。
								canSelect = false;
								break;
							}
						}
					}
					if(!canSelect){
						alert("有超过工作范围的人员，不能选择！");
						continue;
					}
				}
			}
		}

		if(isInternal && tempNowPanel.type == Constants_JoinOrganization && type == Constants_Department && checkCanSelectMember() && isNeedCheckLevelScope){
			/*			//如果是vjoin的根节点，不能选
			if(element.externalType!=null && element.externalType == '3'){
				continue;
			}*/
			var _ms = _entity.getAllMembers();

			/*		    if(!_ms || _ms.isEmpty()){
            alertMessageEmptyMemberNO.append(element.name);
            continue;
		    }*/

			if(!isAdmin && !showAllOuterDepartmentFlag){ //普通用户
				var vjoinMember = topWindow.VjoinMemberScopeOfInternal.get(_entity.accountId);
				/*		        if(!vjoinMember){
		            alertMessageEmptyMemberNO.append(element.name);
		            continue;
		        }*/

				var isSelect = true;
				for(var a = 0; a < _ms.size(); a++) {
					if(!vjoinMember.contains(_ms.get(a).id)){
						isSelect = false;
						break;
					}
				}

				if(!isSelect){
					alertMessageBeyondWorkScop.append(element.name);
					continue;
				}
			}
		}


		if((isCanSelectGroupAccount == false || isGroupAccessable == false) && type == Constants_Account && element.id == rootAccount.id){
			continue;
		}
		//检测越级访问，只要部门/组里面有任何一个人不能选择，则该部门/组不能选择
		if(type != Constants_Member && type != Constants_Department && type != Constants_BusinessDepartment && !checkAccessLevelScope(type, element.id)){
			alertMessageBeyondLevelScop.append(element.name);
			continue;
		}

		//检测集团是否可选
		var canselectGroup = true;
		if(type == Constants_Account && element.id == "-1730833917365171641" ){
			for(var a=0;a<allAccounts.size();a++){
				var account = allAccounts.values().get(a);
				if(!checkAccessLevelScope(type, account.id)){
					canselectGroup = false;
					break;
				}
			}
			if(!canselectGroup){
				alertMessageBeyondLevelScop.append(element.name);
				continue;
			}
		}

		// 缓存数据的key
		var key = type + element.id;

		if(key == "NodeCurrentNode" || key == "NodeNodeUser" || key == "NodeSenderSuperDept" || key == "NodeNodeUserSuperDept"
			||key=="NodeNodeUserManageDep"||key=="NodeNodeUserLeaderDep"||key=="NodeSenderManageDep" ||key=="NodeSenderLeaderDep"
			||key=="NodeCurrentNodeSuperDept" ||key=="NodeSenderSuperAccount" ||key=="NodeNodeUserSuperAccount"
			|| key.endsWith("MMNEOF")){//自定义元数据：NodeNodeUserMemberMetadataNode-1854419294040210113MMNEOF"，不能直接选择如：上节点费用归属部门
			continue;
		}

		//综合办公控件-用车部门
		if(key == Constants_OfficeField + "UseDept"){
			continue;
		}

		// [memberWithDeptInfo]人员返回部门信息，选择一个替换原来的，工作流岗位精准匹配需求
		if(type === Constants_Member && memberWithDeptInfo){
			if(selectedPeopleElements.containsKey(key)){
				selectedPeopleElements.remove(key);
				$("#List3").find("#" + element.id).remove();
			}
		}

		if(selectedPeopleElements.containsKey(key)){    // 检查是否已经选择
			continue; //Exist
		}

		//判断是否要子部门 //Constants_Node 工作流用的节点type
		if(( type == Constants_Department || type == Constants_Node ) && isConfirmExcludeSubDepartment){
			var isShowPageConfirm4Select = false;

			if(type == Constants_Department){//当前选择的部门
				var _getChildrenFun = Constants_Panels.get(type).getChildrenFun;

				var entity = topWindow.getObject(type, element.id);
				if(entity){
					datas2Show = eval("entity." + _getChildrenFun + "()");
				}
				else{
					datas2Show = topWindow.findChildInList(topWindow.getDataCenter(type), id);
				}
				isShowPageConfirm4Select = datas2Show && !datas2Show.isEmpty();
			}
			else if(type == Constants_Node){
				isShowPageConfirm4Select = element.id.endsWith("DeptMember");
			}

			if(element.externalType != null && element.externalType == '1'){
				isShowPageConfirm4Select = false;
			}
			if(isShowPageConfirm4Select){
				var _index = element.name.indexOf("(" + $.i18n("common.selectPeople.excludechilddepartment") + ")");
				if(_index != -1) {
					element.name = element.name.substring(0, _index);
				}

				//【包含】 true 【不包含】 false【取消】 ''
				var temp = showConfirm4Select(element.name);
				if(temp == '') {
					continue; //表示不选，跳过
				}
				else if(temp == 'false'){//通过JSP页面来提示是否包含子部门
					element.excludeChildDepartment = true;
					element.name += "(" + $.i18n("common.selectPeople.excludechilddepartment") + ")";
				}
				else {
					element.excludeChildDepartment = false;
				}
			}
			if(element.excludeChildDepartment == false) {//包含子部门
				if(type!="Node"){
					if(!checkAccessLevelScopeWithChildDept(element.id)) {
						alertMessageBeyondLevelScop.append(element.name);
						continue;
					}
				}
			} else {//OA-48542
				if(!checkAccessLevelScope(type, element.id)){//不包含子部门
					alertMessageBeyondLevelScop.append(element.name);
					continue;
				}
			}
		} else  if(type == Constants_Department && !checkAccessLevelScope(type, element.id)){
			alertMessageBeyondLevelScop.append(element.name);
			continue;
		}

		//判断是否要业务线子部门
		if(type == Constants_BusinessDepartment){
			var businessId= _entity.businessId;
			var entity = topWindow.getObject(type, element.id);

			if(isConfirmExcludeSubDepartment){
				var isShowPageConfirm4Select = false;

				var _getChildrenFun = Constants_Panels.get(type).getChildrenFun;

				if(entity){
					datas2Show = eval("entity." + _getChildrenFun + "()");
				}
				else{
					datas2Show = topWindow.findChildInList(topWindow.getDataCenter(type), id);
				}
				isShowPageConfirm4Select = datas2Show && !datas2Show.isEmpty();

				if(element.externalType != null && element.externalType == '1'){
					isShowPageConfirm4Select = false;
				}
				if(isShowPageConfirm4Select){
					var _index = element.name.indexOf("(" + $.i18n("common.selectPeople.excludechilddepartment") + ")");
					if(_index != -1) {
						element.name = element.name.substring(0, _index);
					}

					//【包含】 true 【不包含】 false【取消】 ''
					var temp = showConfirm4Select(element.name);
					if(temp == '') {
						continue; //表示不选，跳过
					}
					else if(temp == 'false'){//通过JSP页面来提示是否包含子部门
						element.excludeChildDepartment = true;
						element.name += "(" + $.i18n("common.selectPeople.excludechilddepartment") + ")";
					}
					else {
						element.excludeChildDepartment = false;
					}
				}

				var businessAccount = topWindow.getObject(Constants_BusinessAccount, businessId);
				if(businessAccount){
					var accessMemberIds = businessAccount.accessMemberIds;
					var pass = true;
					if(isNeedCheckLevelScope){
						if(element.excludeChildDepartment == false) {//包含子部门
							var members = entity.getAllMembers();
							for(var i=0;i<members.size();i++){
								var member = members.get(i);
								if(accessMemberIds.indexOf(member.id)<0){
									alertMessageBeyondLevelScop.append(element.name);
									pass = false;
									break;
								}
							}
						} else {
							var members = entity.getDirectMembers();
							for(var i=0;i<members.size();i++){
								var member = members.get(i);
								if(accessMemberIds.indexOf(member.id)<0){
									alertMessageBeyondLevelScop.append(element.name);
									pass = false;
									break;
								}
							}
						}
						if(!pass){
							continue;
						}
					}
				}

			}else{
				var businessAccount = topWindow.getObject(Constants_BusinessAccount, businessId);
				if(businessAccount){
					var accessMemberIds = businessAccount.accessMemberIds;
					var members = entity.getAllMembers();
					var pass = true;
					if(isNeedCheckLevelScope){
						for(var i=0;i<members.size();i++){
							var member = members.get(i);
							if(accessMemberIds.indexOf(member.id)<0){
								alertMessageBeyondLevelScop.append(element.name);
								pass = false;
								break;
							}
						}
						if(!pass){
							continue;
						}
					}
				}
			}
		}


		var isconfirmed = false;
		//检测集合里面是否是空的，一般检测部门和组
		if(checkEmptyMember(type, element.id)){
			if(unallowedSelectEmptyGroup){ //不允许选择空组
				alertMessageEmptyMemberNO.append(element.name);
				continue;
			}
			else{
				if(!isNotShowNoMemberConfirm){
					isconfirmed = true;
					if(!confirm($.i18n("selectPeople.alertEmptyMember", element.name))){
						continue;
					}
				}
			}
		}
		if(type == Constants_Department && element.excludeChildDepartment == true) {//不包含子部门，父部门下没有人
			if(checkEmptyMemberWithoutChildDept(type, element.id)) {
				if(unallowedSelectEmptyGroup){ //不允许选择空部门
					alertMessageEmptyMemberNO.append(element.name);
					continue;
				}
				else{
					if(!isNotShowNoMemberConfirm){
						if(!isconfirmed){
							if(!confirm($.i18n("selectPeople.alertEmptyMember", element.name))){
								continue;
							}
						}
					}
				}
			}
		}

		//校验所选择的元素下的人员是否超过了限制的人数
		if(type == Constants_Department || type == Constants_Post || type == Constants_Level || type == Constants_Team){
			var beyondSize = excludeElementsBeyondMemberSize[type];
			if(beyondSize != null){
				var allMembers = _entity.getAllMembers();
				if(allMembers.size() > beyondSize){
					alertMessageBeyondMemberSizeScop.append(element.name);
					continue;
				}
			}
		}

		var _accountId = currentAccountId;
		if (element && element.accountId) {
			_accountId = element.accountId;
		} else if (_entity && _entity.accountId) {
			_accountId = _entity.accountId;
		}
		var accountShortname = allAccounts.get(_accountId).shortname;

		element.type = type;
		element.typeName = Constants_Component.get(type);
		element.accountId = _accountId;
		element.accountShortname = accountShortname;
		if(element.type == Constants_Member && returnMemberWithDept && selectTypes.contains('Member') && element.id.indexOf("#") > -1){
			var ids = element.id.split(valuesJoinSep2);
			var deptEntity = topWindow.getObject(Constants_Department, ids[0]);
			var postEntity = topWindow.getObject(Constants_Post, ids[2]);
			if(deptEntity && deptEntity.name && postEntity && postEntity.name){
				element.name = element.name + "(" + deptEntity.name + "-" + postEntity.name + ")";
			}
		}

		add2List3(key,element);
		if (maxSize == 1) {
			selectedPeopleElements.clear();
		}
		selectedPeopleElements.put(key, element);
	}

	var sp = v3x.getMessage("common.separator.label");
	var alertMessage = "";
	if(!alertMessageBeyondWorkScop.isBlank()){
		alertMessage += ($.i18n("selectPeople.alertBeyondWorkScope", alertMessageBeyondWorkScop.toString(sp).getLimitLength(50, "..."))) + "\n\n";
	}
	if(!alertMessageBeyondLevelScop.isBlank()){
		alertMessage += ($.i18n("selectPeople.alertBeyondLevelScope", alertMessageBeyondLevelScop.toString(sp).getLimitLength(50, "..."))) + "\n\n";
	}
	if(!alertMessageEmptyMemberNO.isBlank()){
		alertMessage += ($.i18n("selectPeople.alertEmptyMemberNO", alertMessageEmptyMemberNO.toString(sp).getLimitLength(50, "..."))) + "\n\n";
	}

	if(!alertMessageBeyondMemberSizeScop.isBlank()){
		alertMessage += ($.i18n("selectPeople.alertBeyondMemberSize", alertMessageBeyondMemberSizeScop.toString(sp).getLimitLength(50, "...")));
	}

	if(alertMessage){
		alert(alertMessage);
	}
}

//选人界面弹出页面按照提示进行，【包含】【不包含】【取消】提示
function showConfirm4Select(name){
	if(v3x.isChrome || v3x.isFirefox){
		var rv = confirm('"'+name+'"'+ $.i18n("selectPeople.ConfirmChildDept")+"("+ $.i18n("selectPeople.ConfirmChildDesc.js")+")");
		if(rv == true){
			return 'true';
		}else{
			return 'false';
		}
	}else{
		var rv = v3x.openWindow({
			url: _ctxPath + "/selectpeople.do?method=selectPeople4Confirm&name=" + encodeURIComponent(name)+CsrfGuard.getUrlSurffix(),
			height: 120,
			width: 350
		});
		if(rv==0){
			return 'true';
		}
		if(rv==1){
			return 'false';
		}


		return '';
	}
}

/**
 * 将选择数据添加到第三个select区域
 * @param key
 * @param element
 */
function add2List3(key,element){
	var text = element.name;
	try{
		if(element.type === 'BusinessDepartment'){
			//多维组织已经加了单位简称，不需要再后面追加单位简称了
		}else if(element.type === 'BusinessAccount'){
			var endName = "(" + element.accountShortname + ")";
			if(!text.endsWith(endName)){
				text = text + endName;
			}
		}else if(element.accountShortname && element.type != 'Account' && checkShowAccountShortname4Element(element) && $.ctx.CurrentUser.loginAccount != element.accountId){
			var endName = "(" + element.accountShortname + ")";
			if(!text.endsWith(endName)){
				text = text + endName;
			}
		}
	}
	catch(e){
	}
	if(v3x.getBrowserFlag('selectPeopleShowType')){
		var option = new Option(text, key);
		option.id = element.id;
		option.type = element.type;
		option.className = element.type + "";
		if((element.type == Constants_Department || element.type == Constants_Member || element.type == "Department_Post") && element.description!="" &&  element.description!=undefined){
			//如果是选择部门或者部门下的岗位,title 显示部门的全路径（全路径暂时存放在description属性中）
			option.title = element.description;
		}else{
			option.title = text;
		}
		option.setAttribute('style','margin:4px 0 0 4px');
		option.accountId = element.accountId;
		option.accountShortname = element.accountShortname;

		option.setAttribute('type', element.type);
		option.setAttribute('accountId', element.accountId);
		option.setAttribute('accountShortname', element.accountShortname);
		option.setAttribute('externalType', element.externalType);

		if (maxSize==1) {
			document.getElementById("List3").options.length = 0;
		}

		document.getElementById("List3").options.add(option);
	}else{
		var option = document.createElement('div');
		var text = document.createTextNode(text);
		option.appendChild(text);
		option.setAttribute('id',element.id);
		option.setAttribute('value',key);
		option.setAttribute('type',element.type);
		option.setAttribute('seleted','false');
		option.setAttribute('style','margin:4px 0 0 4px');
		option.setAttribute('class','member-list-div');
		option.setAttribute('accountId',element.accountId);
		option.setAttribute('accountShortname',element.accountShortname);
		option.setAttribute('externalType', element.externalType);

		option.onclick = function(){selectMemberFn(this);}
		option.ondblclick = function(){removeOne(key,this);}

		if (maxSize==1) {
			document.getElementById("List3").innerHTML = "";
		}

		document.getElementById("List3").appendChild(option);
		initIpadScroll("List3");//ipad滚动条解决
	}
}
/*
 * 从List3种删除数据，需要选择List3-item
 */
function removeOne(key, obj){
	if(!key){	//删除多项
		var ops = document.getElementById("List3");
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			for(var i = 0; i < ops.length; i ++) {
				if(ops[i].selected){
					var key = ops[i].value;
					document.getElementById("List3").remove(i);

					selectedPeopleElements.remove(key);
					i--;
				}
			}
		}else{
			var ops = document.getElementById("List3").childNodes;
			for(var i = 0; i < ops.length; i++) {
				var option = ops[i];
				if(option){
					if(option.getAttribute('seleted')=='true'){
						var key =option.getAttribute('value');
						option.parentNode.removeChild(option);
						selectedPeopleElements.remove(key);
						i--;
					}
				}
			}
		}
	}
	else{	//删除单项
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			var i = obj.selectedIndex;
			if(i >= 0){
				document.getElementById("List3").remove(obj.selectedIndex);
				selectedPeopleElements.remove(key);
			}
		}else{
			obj.parentNode.removeChild(obj);
			selectedPeopleElements.remove(key);
		}
	}
}

/******************** ?? List3 ?????????????? ********************/

//上移或下移已经选择了的数据
function exchangeList3Item(direction){


	var changeList34Ipad = function(direction){
		var list3Object = document.getElementById("List3");
		var list3Items = list3Object.options;
		var nowIndex = list3Object.selectedIndex;

		var selectedItems = list3Object.selectedOptions;
		//ipad div实现select
		list3Items = list3Object.childNodes;
		for(var i = 0;i<list3Items.length;i++){
			var op = list3Items[i];
			var selected = op.getAttribute('seleted');
			if(selected == 'true'){
				nowIndex = i;
			}
		}

		if(direction == "up"){
			for (var i=0;i<selectedItems.length;i++) {
				nowIndex = selectedItems[i].index;
				if(nowIndex <= 0){
					break;
				}
				var nowOption = list3Items[nowIndex];
				var nextOption = list3Items[nowIndex - 1];

				var textTemp = nextOption.innerHTML;
				var valueTemp = nextOption.getAttribute('value');
				var nowTitle = nowOption.title;
				var nowId = nowOption.id;

				var nextTitle = nextOption.title;
				var nextId = nextOption.id;

				nowOption.innerHTML = textTemp;
				nowOption.setAttribute('value',valueTemp);
				nowOption.setAttribute('seleted','false');
				nowOption.setAttribute('class','member-list-div');
				nowOption.setAttribute('title',nextTitle);
				nowOption.setAttribute('id',nextId);

				nextOption.innerHTML = nowOption.innerHTML;
				nextOption.setAttribute('value',nowOption.getAttribute('value'));
				nextOption.setAttribute('seleted','true');
				nextOption.setAttribute('class','member-list-div-select');
				nextOption.setAttribute('title',nowTitle);
				nextOption.setAttribute('id',nowId);
				selectedPeopleElements.swap(nowOption.getAttribute('value'), nextOption.getAttribute('value'));
			}
		}
		else if(direction == "down"){
			for (var i=selectedItems.length-1;i > -1;i--) {
				nowIndex = selectedItems[i].index;
				if(!(nowIndex > -1 && nowIndex < list3Items.length - 1)){
					break;
				}
				var nowOption = list3Items[nowIndex];
				var nextOption = list3Items[nowIndex + 1];
				var nowTitle = nowOption.title;
				var nowId = nowOption.id;

				var textTemp = nextOption.innerHTML;
				var valueTemp = nextOption.getAttribute('value');
				var nextTitle = nextOption.title;
				var nextId = nextOption.id;

				nextOption.innerHTML = nowOption.innerHTML;
				nextOption.setAttribute('value',nowOption.getAttribute('value'));

				nowOption.innerHTML = textTemp;
				nowOption.setAttribute('value',valueTemp);
				nowOption.setAttribute('seleted','false');
				nowOption.setAttribute('class','member-list-div');
				nowOption.setAttribute('title',nextTitle);
				nowOption.setAttribute('id',nextId);

				nextOption.setAttribute('seleted','true');
				nextOption.setAttribute('class','member-list-div-select');
				nextOption.setAttribute('title',nowTitle);
				nextOption.setAttribute('id',nowId);
				selectedPeopleElements.swap(nowOption.getAttribute('value'), nextOption.getAttribute('value'));
			}
		}
		else{
			log.warn('The direction ' + direction + ' is not defined.');
		}
	}

	var $list3 = $("#List3");
	var $last = $list3.find(":selected:last");
	var $first = $list3.find(":selected:first");
	var objHeight=$list3.height();
	var scrollHeight=$list3.scrollTop();
	var optionHeight = $first.height();
	var averHeight = 0;
	if(optionHeight == 0){
		var $options = $list3.find("option");
		if($options.length  >= 2){
			averHeight = $options.eq(1).offset().top - $options.eq(0).offset().top;
		}
	}else{
		averHeight = optionHeight+4;
	}
	if(direction === "up"){
		var $prevOption = $first.prev("option");
		if($prevOption.length === 1){
			var preObj = selectedPeopleElements.changePostion($prevOption.index(),$last.index());
			$prevOption.clone().insertAfter($last);
			$prevOption.remove();
			var index=$list3.find(":selected:first").index();
			if((index-1)*averHeight<=scrollHeight){
				$list3.scrollTop((index-1)*averHeight);
			}
		}
	}else if(direction === "down"){
		var $nextOption = $last.next("option");
		if($nextOption.length === 1){
			var preObj = selectedPeopleElements.changePostion($nextOption.index(),$first.index());
			$nextOption.clone().insertBefore($first);
			$nextOption.remove();
			var index=$list3.find(":selected:last").index();
			if((index+1)*averHeight>=scrollHeight+objHeight){
				$list3.scrollTop((index+1)*averHeight);
			}
		}
	}
}





function searchTemplate(members,_members,type){
	for(var i = 0; i < _members.length; i++) {
		var m = _members[i];

		var secondPostIds = null;
		var SP = m["F"];
		if(SP){
			secondPostIds = new ArrayList();
			for(var s = 0; s < SP.length; s++) {
				var secondPostId = new Array();
				secondPostId[0] = SP[s][0];
				secondPostId[1] = SP[s][1];
				secondPostIds.add(secondPostId);
			}
		}else{
			secondPostIds = EmptyArrayList;
		}

		var member = new Member(m["K"], m["N"], m["S"], m["D"], m["P"], secondPostIds, m["L"], m["I"], m["Y"], m["M"], "", m["A"], m["E"]);
		member.departmentName = m["DM"];
		member.departmentNameF = m["DF"];
		if(type =="G"){
			member.type = "G";
		}else{
			if(currentAccount.id !=member.accountId){
				member.type = "E";
			}
			member.post = new Post(member.postId,m["PM"]);
		}
		members.add(member);
		searchNames.put(member.id, member);
	}
}
//在全集团范围内查询出的人员, 用于获取人员姓名
var searchNames = new Properties();

/*******************************
 * 搜索
 */
var isSearch = false;
function searchItems(){
	if(tempNowPanel == null){
		return;
	}

	var type = tempNowPanel.type;
	var showMode = tempNowPanel.showMode;
	var searchArea = tempNowPanel.searchArea;

	if(document.getElementById("q").disabled){
		return;
	}

	reArea_1_2();
	if(!checkIsShowArea2()){
		hiddenArea2(true);
		document.getElementById("Separator1").style.display = "none";
	}

	var keyword = document.getElementById("q").value;
	if(tempNowPanel.type == Constants_Account || tempNowPanel.type == Constants_Post){
		var orgMetadataSelectValue = $('#orgMetadataSelect option:selected').val();
		if(orgMetadataSelectValue == '-1'){
			keyword = document.getElementById("metadata_text_q").value;
		}else{
			keyword = Constants_OrgMetadataTag + "|" + $('#orgMetadataItemSelect option:selected').val();
		}
	}

	keyword = (keyword == document.getElementById("q").defaultValue) ? "" : keyword;

	var originalKey = keyword;

	checkSearchAlt(true);

	if(!keyword){//没有关键字, 给出提示
		$("#q").blur();
		if(showMode == Constants_ShowMode_TREE){
			var expandedNode = tree.getSelected();
			if(!expandedNode){
				return;
			}
			if (expandedNode.folder || expandedNode.hasChild) {
				expandedNode.expand();
			}
			clearList2();

			if(type == Constants_Department){
				var n = topWindow.getObject(type, expandedNode.id);
				if(n){
					var _status = isShowDepartmentTree(n);
					if(_status != 0){
						return;
					}
				}
			}

			showList2(type, expandedNode.id);
			return;
		}
	}

	keyword = keyword.toLowerCase();
	if(type==Constants_Outworker && !selectTypes.contains(Constants_Member)){
		searchArea = 1;
	}

	if(showMode == Constants_ShowMode_LIST && searchArea == 1){//只搜索1区
		if(type == Constants_Node){
			try{
				var v = nowSelectedList1Item.options[nowSelectedList1Item.selectedIndex].value;
				if(v){
					showList2(type, v, null, keyword);
				}
			}catch(e){}
		}else{
			if(canShowBusinessOrg && (type == Constants_Node || type == Constants_FormField)){
				initList(type, keyword, $("#areaTopList1_SubInfo").val());
			}else{
				initList(type, keyword);
			}
			reArea_1_2();
			if(!checkIsShowArea2()){
				hiddenArea2(true);
				document.getElementById("Separator1").style.display = "none";
			}
		}
		return;
	}

	if(type == Constants_Department || type == Constants_Account){ //当前是部门面板
		reArea_1_2();
		clearList2();

		var members = null;
		var department = null;
		var departments = null;
		var accounts = null;
		var seachGroup = !$("#seachGroupMember").is(":hidden") && $("#seachGroup").prop("checked");


		if(seachGroup){
			var spm = new selectPeopleManager();
			var proce = $.progressBar();
			spm.getQueryOrgModel(originalKey,isNeedCheckLevelScope,{
				success: function(result) {
					if(!result){
						return;
					}
					result = $.parseJSON(result);
					var _members = result[Constants_Member];
					if(_members){
						members = new ArrayList();
						searchTemplate(members,_members,"G");
					}
					reanderSearch();
					proce.close();
				},
				error:function(jqXHR) {
					proce.close();
					if(jqXHR.readyState != 4){
						return;
					}
					try{
						var msgObj = JSON.parse(jqXHR.responseText);
						getCtpTop().$.alert(msgObj.message);
					}catch(e){}
				}
			});
		}
		else if(type == Constants_Account){
			accounts = accessableAccounts.values();
			reanderSearch();
		}
		else{
			var expandedNode = tree.getSelected();
			if(!expandedNode){
				return;
			}

			var id = expandedNode.id;
			var _type = expandedNode.type;

			if(currentArea2Type != Constants_Member){
				if(_type == Constants_Department){
					showSubOfDepartment(id, currentArea2Type, keyword);
				}else if(_type == Constants_Account && currentArea2Type == Constants_Post){//在单位下查询岗位
					showDepartmentPostOfAccount(id, currentArea2Type, keyword);
				}

				return;
			}

			if(_type == Constants_Department){
				department = topWindow.getObject(Constants_Department, id);
				if(!department){
					return;
				}

				if(isInternal && type == Constants_Department && isNeedCheckLevelScope && !isAdmin){
					departments = department.getAllChildrenFilterByDepartmentAccess();
					members = department.getAllMembersFilterByDepartmentAccess();
				}else{
					departments = department.getAllChildren();
					members = department.getAllMembers();
				}
			}
			else if(_type == Constants_Account){
				department = currentAccount;
				if(isV5Member){
					if(browserIsMSIE || browserIsEDGE){
						var spm = new selectPeopleManager();
						var result = spm.getQueryOrgModel(originalKey, isNeedCheckLevelScope,currentAccount.id);
						if (!result) {
							return;
						}

						var _members = result[Constants_Member];
						members = new ArrayList();
						if(_members!=null && _members!=undefined){
							len = _members.length;
							for(var i = 0; i < len; i++) {
								var TempMember = topWindow.getObject(Constants_Member, _members[i]["K"]);
								if(TempMember && TempMember.isInternal){
									if(isInternal && isNeedCheckLevelScope && !isAdmin){
										var departmentId = TempMember.departmentId;
										var d = topWindow.getObject(Constants_DepartmentAccess, departmentId, currentAccount.id);
										if(d){
											members.add(TempMember);
										}else{//看副岗在不在部门可见性里
											var secondDepartIds = TempMember.getSecondPost().keys();
											for(var a = 0; a < secondDepartIds.size(); a++) {
												var secondDepartment = topWindow.getObject(Constants_Department, secondDepartIds.get(a));
												if(secondDepartment){
													d = topWindow.getObject(Constants_DepartmentAccess, secondDepartIds.get(a), currentAccount.id);
													if(d){
														members.add(TempMember);
														break;
													}
												}
											}
										}
									}else{
										members.add(TempMember);
									}
								}
							}
						}

						var deptResult = spm.getQueryOrgModelByType(originalKey, isNeedCheckLevelScope,currentAccount.id,Constants_Department);

						if (deptResult) {
							var _departments = deptResult[Constants_Department];
							departments = new ArrayList();
							if(_departments!=null && _departments!=undefined){
								len = _departments.length;
								for(var i = 0; i < len; i++) {
									var TempDepartment = topWindow.getObject(Constants_Department, _departments[i]["K"]);
									if(TempDepartment && TempDepartment.isInternal){
										if(isInternal && isNeedCheckLevelScope && !isAdmin){
											var d = topWindow.getObject(Constants_DepartmentAccess, TempDepartment.id, currentAccount.id);
											if(d){
												departments.add(TempDepartment);
											}
										}else{
											departments.add(TempDepartment);
										}

									}
								}
							}
						}
					}
					else{
						if(isInternal && isNeedCheckLevelScope && !isAdmin){
							departments = new ArrayList();
							members = new ArrayList();
							var allDepartments = topWindow.getDataCenter(Constants_Department,currentAccount.id);
							for(var i = 0; i < allDepartments.size(); i++) {
								var department = allDepartments.get(i);
								var d = topWindow.getObject(Constants_DepartmentAccess, department.id, currentAccount.id);
								if(d){//可见部门中存在
									departments.add(department);
									var tempList = new ArrayList();
									if(d.type == 'M'){
										tempList = department.getDirectMembersFilterByDepartmentAccess();
									}else{
										tempList = department.getDirectMembers();
									}
									for(var j = 0; j < tempList.size(); j++) {
										members.add(tempList.get(j));
									}
								}
							}

						}else{
							members = topWindow.getDataCenter(Constants_Member,currentAccount.id);
							departments = topWindow.getDataCenter(Constants_Department,currentAccount.id);
						}
					}
				}else{
					members = topWindow.getDataCenter(Constants_Member,currentAccount.id);
					departments = topWindow.getDataCenter(Constants_Department,currentAccount.id);
				}

			}
			reanderSearch();
		}

		function reanderSearch(){
			var selectHTML = new StringBuffer();
			if(v3x.getBrowserFlag('selectPeopleShowType')){
				selectHTML.append(select2_tag_prefix);
			}else{
				selectHTML.append(memberDataBody_div);
			}
			if(departments && checkCanSelect(Constants_Department)){
				for(var d = 0; d < departments.size(); d++) {
					var dept = departments.get(d);

					if(!dept.isInternal || dept.name.toLowerCase().indexOf(keyword) < 0){
						continue;
					}

					if(isVjoinMember){
						var _AccessInnerDepts = topWindow.AccessInnerDepts;
						if(_AccessInnerDepts == null) continue;
						if(!checkExternalMemberWorkScope(Constants_Department, dept.id)){
							continue;
						}
					}

					var parentDepartmentId = dept.parentId;

					var parentDeptName = null;
					if(parentDepartmentId == currentAccountId){
						parentDeptName = allAccounts.get(parentDepartmentId).shortname;
					}
					else{
						parentDeptName = topWindow.getObject(Constants_Department, dept.parentId).name;
					}

					var showText = dept.name;
					var showTitle = Constants_Component.get(Constants_Department) + ": " +dept.name + "\n"
						+ Constants_Component.get(Constants_OrgUp) + ": "+parentDeptName;

					if(parentDeptName){
						showText = showText.getLimitLength(nameMaxLength.two[0]);
						var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
						showText += getNameSpace(tempIndex);
						showText += parentDeptName;
					}

					if(!excludeElements.contains(Constants_Department + dept.id) && checkIncludeElements(Constants_Department, dept.id)){
						if(v3x.getBrowserFlag('selectPeopleShowType')){
							selectHTML.append("<option value='").append(dept.id).append("' class='Department' type='Department' accountId='").append(currentAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</option>");
						}else{
							selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\"  value='").append(dept.id).append("' class='Department' type='Department' accountId='").append(currentAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</div>");
						}
					}
				}
			}
			if(accounts){
				var metadataAccountIds;
				if(tempNowPanel.type == Constants_Account && originalKey.startsWith(Constants_OrgMetadataTag)){
					var spm = new selectPeopleManager();
					metadataAccountIds = spm.getQueryOrgModel(originalKey, false);
					if (!metadataAccountIds || metadataAccountIds == "") {
						return;
					}
				}

				for(var d = 0; d < accounts.size(); d++) {
					var acc = accounts.get(d);
					if(metadataAccountIds){//通过元数据属性筛选的。
						if(metadataAccountIds.indexOf(acc.id) < 0){
							continue;
						}
					}else if(!acc || acc.name.toLowerCase().indexOf(keyword) < 0){//通过文本筛选的
						continue;
					}

					var showText = acc.name;
					if(!excludeElements.contains(Constants_Account + acc.id) && checkIncludeElements(Constants_Account, acc.id)){
						if(v3x.getBrowserFlag('selectPeopleShowType')){
							selectHTML.append("<option value='").append(acc.id).append("' class='Account' type='Account' accountId='").append(acc.id).append("'>").append(showText.escapeHTML(true)).append("</option>");
						}else{
							selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)' value='").append(acc.id).append("' class='Account' type='Account' accountId='").append(acc.id).append("'>").append(showText.escapeHTML(true)).append("</div>");
						}
					}
				}
			}

			if(members && checkCanSelectMember()){
				var hasShowMembers = {};

				var currentDepartment = null;
				if(onlyCurrentDepartment){
					currentDepartment =  topWindow.getObject(Constants_Department, departmentId);
				}

				var member_size = members.size();
				var childDepts = childDeptOfCurrent(currentMember);
				var memberIdList = [];
				var memberSeconedPostIdMap = {};
				for(var m = 0; m < member_size; m++) {
					var member = members.get(m);
					if(!member.isInternal){// 非内部人员
						continue;
					}
					if(hasShowMembers[member.id]){ // 如果当前是主岗，优先显示主岗
						if(memberSeconedPostIdMap[member.postId]){
							continue;
						}
						hasShowMembers[member.id] = addMember(Constants_Department, department, member);
						//selectHTML.append(addMember(Constants_Department, department, member));
						continue;
					}
					if(member.name.toLowerCase().indexOf(keyword) < 0){
						continue;
					}

					var mDept = member.getDepartment();

					if(member.type != "G" && !checkLevelScope(member, mDept, childDepts)){ //越级
						continue;
					}

					if(isVjoinMember && !checkExternalMemberWorkScope(Constants_Member,member.id)){
						continue;
					}

					var _status = isShowDepartmentTree(mDept);
					if(_status != 0){
						continue;
					}

					if(onlyCurrentDepartment && currentDepartment && !mDept.path.startsWith(currentDepartment.path)){
						continue;
					}

					if(!excludeElements.contains(Constants_Member + member.id) && checkIncludeElements4Member(member)){
						//selectHTML.append(addMember(Constants_Department, department, member));
						hasShowMembers[member.id] = addMember(Constants_Department, department, member);
						memberIdList.push(member.id);
						if(typeof member.secondPostIds !== 'undefined' && member.secondPostIds !== null){
							for(var i=0,len = member.secondPostIds.size();i<len;i++){
								memberSeconedPostIdMap[member.secondPostIds.get(i)] = true;
							}
						}
					}
				}
				for(var i = 0,len = memberIdList.length ; i < len; i++){
					var _eachMemberId = memberIdList[i];
					selectHTML.append(hasShowMembers[_eachMemberId]);
				}
				hasShowMembers = null;
			}
			if(v3x.getBrowserFlag('selectPeopleShowType')){
				selectHTML.append(select2_tag_subfix);
			}else{
				selectHTML.append(memberDataBody_div_end);
			}
			document.getElementById("Area2").innerHTML = selectHTML.toString();
		}
	}
	else if(type == Constants_BusinessDepartment){ //当前是多维组织部门面板
		var businessId = $("#areaTopList1_SubInfo").val();
		reArea_1_2();

		clearList2();

		var members = null;
		var department = null;
		var departments = null;
		var accounts = null;
		var expandedNode = tree.getSelected();
		if(!expandedNode){
			return;
		}

		var id = expandedNode.id;
		var _type = expandedNode.type;

		if(currentArea2Type != Constants_Member){
			if(_type == Constants_BusinessDepartment){
				showSubOfBusinessDepartment(id, currentArea2Type, keyword);
			}
			return;
		}

		if(_type == Constants_BusinessDepartment){
			department = topWindow.getObject(Constants_BusinessDepartment, id);
			if(!department){
				return;
			}
			members = department.getAllMembers();
			departments = department.getAllChildren();
		}
		else if(_type == Constants_BusinessAccount){
			departments = new ArrayList();
			members = new ArrayList();

			var allBusinessDepartments = topWindow.getDataCenter(Constants_BusinessDepartment,currentAccount.id);
			for(var i = 0;i < allBusinessDepartments.size(); i++){
				var b = allBusinessDepartments.get(i);
				if(b.businessId == businessId){
					departments.add(b);
					var deptDirMembers = b.getDirectMembers();
					if(deptDirMembers.size() > 0){
						for(var j=0;j<deptDirMembers.size();j++){
							members.add(deptDirMembers.get(j));
						}
					}
				}
			}
		}

		var selectHTML = new StringBuffer();
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_prefix);
		}else{
			selectHTML.append(memberDataBody_div);
		}
		if(departments && checkCanSelect(Constants_BusinessDepartment)){
			for(var d = 0; d < departments.size(); d++) {
				var dept = departments.get(d);

				if(dept.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				var parentDeptName = "";
				var parent = topWindow.getObject(Constants_BusinessDepartment, dept.parentId);
				if(parent){
					var parentDeptName = parent.name;
				}

				var showText = dept.name;
				var showTitle = Constants_Component.get(Constants_BusinessDepartment) + ": " +dept.name + "\n"
					+ Constants_Component.get(Constants_OrgUp) + ": "+parentDeptName;

				if(parentDeptName){
					showText = showText.getLimitLength(nameMaxLength.two[0]);
					var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
					showText += getNameSpace(tempIndex);
					showText += parentDeptName;
				}

				if(!excludeElements.contains(Constants_BusinessDepartment + dept.id) && checkIncludeElements(Constants_BusinessDepartment, dept.id)){
					if(v3x.getBrowserFlag('selectPeopleShowType')){
						selectHTML.append("<option value='").append(dept.id).append("' class='BusinessDepartment' type='BusinessDepartment' accountId='").append(currentAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</option>");
					}else{
						selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\"  value='").append(dept.id).append("' class='BusinessDepartment' type='BusinessDepartment' accountId='").append(currentAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</div>");
					}
				}
			}
		}

		if(members && checkCanSelectMember()){
			var businessAccount = topWindow.getObject(Constants_BusinessAccount, businessId);
			if(businessAccount){
				var accessMemberIds = businessAccount.accessMemberIds;
				var member_size = members.size();

				var hasMemberId = new ArrayList();
				for(var m = 0; m < member_size; m++) {
					var member = members.get(m);

					if(member.name.toLowerCase().indexOf(keyword) < 0){
						continue;
					}

					if(isNeedCheckLevelScope && accessMemberIds.indexOf(member.id) == -1){
						continue;
					}

					if(!excludeElements.contains(Constants_Member + member.id) && checkIncludeElements4Member(member)){
						if(!hasMemberId.contains(member.id)){
							hasMemberId.add(member.id);
							selectHTML.append(addMember(Constants_Department, department, member));
						}
					}
				}
			}
		}
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_subfix);
		}else{
			selectHTML.append(memberDataBody_div_end);
		}

		document.getElementById("Area2").innerHTML = selectHTML.toString();
	}
	else if(type == Constants_JoinOrganization){ //当前是外部机构页签
		reArea_1_2();

		clearList2();

		var members = null;
		var department = null;
		var departments = null;
		var accounts = null;

		if(isV5Member && !isInternal){
			return;
		}
		var expandedNode = tree.getSelected();
		if(!expandedNode){
			return;
		}

		var id = expandedNode.id;
		var _type = expandedNode.type;

		if(_type == Constants_Department){
			department = topWindow.getObject(Constants_Department, id);
			if(!department){
				return;
			}
			members = department.getAllMembers();
			departments = department.getAllChildren();
		}
		else if(_type == Constants_Account){
			department = currentAccount;
			if(browserIsMSIE || browserIsEDGE){
				var spm = new selectPeopleManager();
				var result = spm.getQueryOrgModelByType(originalKey, isNeedCheckLevelScope,currentAccount.id,"JoinMember");

				if (!result) {
					return;
				}

				var _members = result["JoinMember"];
				members = new ArrayList();
				if(_members!=null && _members!=undefined){
					len = _members.length;
					for(var i = 0; i < len; i++) {
						var TempMember = topWindow.getObject(Constants_Member, _members[i]["K"]);
						if(TempMember){
							members.add(TempMember);
						}
					}
				}

				var deptResult = spm.getQueryOrgModelByType(originalKey, isNeedCheckLevelScope,currentAccount.id,"JoinAccount");

				if (deptResult) {
					var _departments = deptResult["JoinAccount"];
					departments = new ArrayList();
					if(_departments!=null && _departments!=undefined){
						len = _departments.length;
						for(var i = 0; i < len; i++) {
							var TempDepartment = topWindow.getObject(Constants_Department, _departments[i]["K"]);
							if(TempDepartment){
								departments.add(TempDepartment);
							}
						}
					}
				}

			}else{
				var _members = topWindow.getDataCenter(Constants_Member, currentVjoinAccountId);
				members = new ArrayList();
				if(_members!=null && _members!=undefined){
					len = _members.size();
					for(var i = 0; i < len; i++) {
						var TempMember = topWindow.getObject(Constants_Member, _members.get(i).id);
						if(TempMember){
							members.add(TempMember);
						}
					}
				}

				departments = topWindow.getDataCenter(Constants_Department,currentVjoinAccountId);
			}
		}

		var selectHTML = new StringBuffer();
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_prefix);
		}else{
			selectHTML.append(memberDataBody_div);
		}

		var _AccessVjoinDepts = topWindow.AccessVjoinDepts;

		if(departments && checkCanSelect(Constants_Department) && _AccessVjoinDepts != null){
			for(var d = 0; d < departments.size(); d++) {
				var dept = departments.get(d);

				if(dept.isInternal || dept.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				if (dept.externalType == "0" || (showExternalType && showExternalType != dept.externalType)) {
					continue;
				}

				if(isV5Member){
					if(isNeedCheckLevelScope &&!_AccessVjoinDepts.contains("D"+dept.id)){
						continue;
					}
				}

				if(isVjoinMember){
					var _AccessInnerDepts = topWindow.AccessInnerDepts;
					if(_AccessInnerDepts == null) continue;
					if(!checkExternalMemberWorkScope(Constants_Department, dept.id)){
						continue;
					}
				}

				var parentDeptName = null;
				var parentDepartmentId = dept.parentId;
				if(parentDepartmentId == currentVjoinAccountId){
					parentDeptName = allAccounts.get(parentDepartmentId).shortname;
				}
				else{
					parentDeptName = topWindow.getObject(Constants_Department, parentDepartmentId).name;
				}

				var showText = dept.name;
				var showTitle = Constants_Component.get(Constants_Department) + ": " +dept.name + "\n"
					+ Constants_Component.get(Constants_OrgUp) + ": "+parentDeptName;

				if(parentDeptName){
					showText = showText.getLimitLength(nameMaxLength.two[0]);
					var tempIndex = nameMaxLength.two[0] + nameMaxSpace - showText.getBytesLength();
					showText += getNameSpace(tempIndex);
					showText += parentDeptName;
				}

				if(!excludeElements.contains(Constants_Department + dept.id) && checkIncludeElements(Constants_Department, dept.id)){
					if(v3x.getBrowserFlag('selectPeopleShowType')){
						selectHTML.append("<option value='").append(dept.id).append("' class='Department' type='Department' accountId='").append(currentVjoinAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</option>");
					}else{
						selectHTML.append("<div class='member-list-div' seleted='false' ondblclick='selectOneMemberDiv(this)'  onclick=\"selectMemberFn(this,'memberDataBody')\"  value='").append(dept.id).append("' class='Department' type='Department' accountId='").append(currentVjoinAccountId).append("' title='"+showTitle+"'" ).append("'>").append(showText.escapeHTML(true)).append("</div>");
					}
				}
			}
		}

		if(members && checkCanSelectMember()){
			var hasShowMembers = {};
			var member_size = members.size();
			for(var m = 0; m < member_size; m++) {
				var member = members.get(m);

				if(!member.externalType=="1"  || hasShowMembers[member.id]){ //已经显示了，防止副岗兼职重复出现
					continue;
				}
				if(member.name.toLowerCase().indexOf(keyword) < 0){
					continue;
				}

				if(isV5Member){
					if(isNeedCheckLevelScope && !checkVjoinMemberWorkScopeOfMember(member)){
						continue;
					}
				}else if(isVjoinMember){
					if(!isAdministrator){
						var _AccessVjoinDepts = topWindow.AccessVjoinDepts;
						if(_AccessVjoinDepts != null){
							if(!_AccessVjoinDepts.contains("D"+member.getDepartment().id)){
								continue;
							}
						}

					}
				}

				if(!excludeElements.contains(Constants_Member + member.id) && checkIncludeElements4Member(member)){
					selectHTML.append(addMember(Constants_Department, department, member));
					hasShowMembers[member.id] = "T";
				}
			}

			hasShowMembers = null;
		}
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_subfix);
		}else{
			selectHTML.append(memberDataBody_div_end);
		}

		document.getElementById("Area2").innerHTML = selectHTML.toString();
	}
	else if(showMode == Constants_ShowMode_LIST && nowSelectedList1Item){
		if(!checkCanSelectMember()){
			return;
		}

		showList2(type, nowSelectedList1Item.value, null, keyword);
	}
	else if( showMode == Constants_ShowMode_LIST && type == Constants_Outworker){
		if(!checkCanSelectMember()){
			return;
		}

		var selectHTML = new StringBuffer();
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_prefix);
		}else{
			selectHTML.append(memberDataBody_div);
		}

		var allExMembers = new ArrayList;
		if(showAllOuterDepartmentFlag && isInternal && !isAdmin) {
			var _ms = topWindow.getDataCenter(Constants_Member, currentAccountId);
			for(var i=0;i<_ms.size();i++){
				var m = _ms.get(i);
				if(m.isInternal == false){
					allExMembers.addAll(m);
				}
			}

			for(var i = 0; i < allExMembers.size(); i++){
				var member = allExMembers.get(i);
				if(member != null && member.name.toLowerCase().indexOf(keyword) > -1){
					var department = member.getDepartment();
					selectHTML.append(addMember(Constants_Department, department, member));
				}
			}

		} else {
			//找出我能看到的外部人员
			allExMembers = topWindow.ExtMemberScopeOfInternal.values();
			for(var i = 0; i < allExMembers.size(); i++){
				var departMembers = allExMembers.get(i);
				for(var j = 0; j < departMembers.size(); j++){
					var mId = departMembers.get(j);
					var member = topWindow.getObject(Constants_Member, mId);
					if(member != null && member.name.toLowerCase().indexOf(keyword) > -1){
						var department = member.getDepartment();
						selectHTML.append(addMember(Constants_Department, department, member));
					}
				}
			}
		}
		if(v3x.getBrowserFlag('selectPeopleShowType')){
			selectHTML.append(select2_tag_subfix);
		}else{
			selectHTML.append(memberDataBody_div_end);
		}

		document.getElementById("Area2").innerHTML = selectHTML.toString();
	}
}

function searchItems3(){
	var keyword = document.getElementById("q3").value || "";

	var ops = document.getElementById("List3").options;
	for(var i = ops.length - 1; i >= 0; i--) {
		var op = ops.item(i);
		if(keyword && op.text.indexOf(keyword) >= 0){
			op.selected = true;
		}
		else{
			op.selected = false;
		}
	}
}

function removeFromList3(key){
	var ops = document.getElementById("List3").options;
	for(var i = 0; i < ops.length; i++) {
		if(ops.item(i).value == key){
			ops.remove(i);
			break;
		}
	}
}

/**
 * Member(id, name, departmentId, postId, levelId, email, mobile, description)
 *
 * @return Array<Element>
 */
function getSelectedPeoples(_maxSize, _minSize, needlessPreReturnValueFun){
	var _selectedPeopleElements = new ArrayList();
	var _selectedPeopleTypes = new Properties();

	var _selectedPeopleKeys = selectedPeopleElements.keys();

	for(var i = 0; i < _selectedPeopleKeys.size(); i++){
		var key = _selectedPeopleKeys.get(i);
		if(key){
			var value = selectedPeopleElements.get(key);
			_selectedPeopleElements.add(value);

			var type = value.type;
			if(type != Constants_Member){
				var _indexes = _selectedPeopleTypes.get(type);
				if(_indexes == null){
					_indexes = new ArrayList();
					_selectedPeopleTypes.put(type, _indexes);
				}

				_indexes.add(i);
			}
		}
	}

	_maxSize = _maxSize == null ? maxSize : _maxSize;
	_minSize = _minSize == null ? minSize : _minSize;

	var nowSize = _selectedPeopleElements.size();
	if(_maxSize > 0 && nowSize > _maxSize){
		throw ($.i18n("selectPeople.alert_maxSize", _maxSize, nowSize));
	}

	if(_minSize > 0 && nowSize < _minSize){
		throw ($.i18n("selectPeople.alert_minSize", _minSize, nowSize));
	}

	if(nowSize < 2){ //就一项数据比什么比嘛
		return getData();
	}

	//getIsCheckSelectedData() 是否检测被选数据的重复性，由JSP实现
	var isNotCheckDuplicateData= getParentWindowData("isNotCheckDuplicateData") || false;
	if(getIsCheckSelectedData() == false || getParentWindowData("isCheckInclusionRelations") == false || isNotCheckDuplicateData== true){
		return getData();
	}

	if(_selectedPeopleTypes.containsKey(Constants_OrgTeam)){
		isOrgTeamContainChildDepartment();
	}

	if(_selectedPeopleTypes.containsKey(Constants_Account) || _selectedPeopleTypes.containsKey(Constants_BusinessAccount)){
		checkIsContainAccount();
	}

	//不允许同时选择部门和其下的子部门
	if(!getParentWindowData("isAllowContainsChildDept")){
		if(_selectedPeopleTypes.containsKey(Constants_Department)){
			//检查部门子部门的包含关系
			checkIsContainChildDepartment();
		}

		if(_selectedPeopleTypes.containsKey(Constants_BusinessDepartment)){
			checkIsContainChildBusinessDepartment();
		}
	}

	var message = new ArrayList();
	var repeatingItem = new ArrayList();

	for(var i = 0; i < _selectedPeopleElements.size(); i++) {
		var element = _selectedPeopleElements.get(i);

		//检测人
		if(element.type == Constants_Member){
			var member = topWindow.getObject(Constants_Member, element.id);

			if(member == null){ //人员可能被删除了
				continue;
			}

			//检测该人的部门是否也被选择了（包括所有上级部门）
			var departmentIndexes = _selectedPeopleTypes.get(Constants_Department);
			if(departmentIndexes && checkCanSelect(Constants_Department)){
				for(var t = 0; t < departmentIndexes.size(); t++) {
					var el = _selectedPeopleElements.get(departmentIndexes.get(t));
					if(el && el.type == Constants_Department){
						var entity = topWindow.getObject(Constants_Department, el.id);
						if(!entity){
							continue;
						}
						var flag = false;
						if(el.excludeChildDepartment){
							flag = member.departmentId == el.id;
						}else{
							var members = entity.getAllMembersMap();
							flag = members.containsKey(member.id);
						}
						if(flag){
							message.add($.i18n("selectPeople.alert_contain_member", el.name, member.name));
							repeatingItem.add(Constants_Member + element.id);
							break;//判断一个就够了
						}
					}
				}
			}

			var departmentIndexes = _selectedPeopleTypes.get(Constants_BusinessDepartment);
			if(departmentIndexes && checkCanSelect(Constants_BusinessDepartment)){
				for(var t = 0; t < departmentIndexes.size(); t++) {
					var el = _selectedPeopleElements.get(departmentIndexes.get(t));
					if(el && el.type == Constants_BusinessDepartment){
						var entity = topWindow.getObject(Constants_BusinessDepartment, el.id);
						if(!entity){
							continue;
						}
						var flag = false;
						if(el.excludeChildDepartment){
							var members = entity.getDirectMembersMap();
							flag = members.containsKey(member.id);
						}else{
							var members = entity.getAllMembersMap();
							flag = members.containsKey(member.id);
						}
						if(flag){
							message.add($.i18n("selectPeople.alert_contain_member", el.name, member.name));
							repeatingItem.add(Constants_Member + element.id);
							break;//判断一个就够了
						}
					}
				}
			}

			//检测该人的岗位是否也被选择了
			if(_selectedPeopleTypes.containsKey(Constants_Post) && checkCanSelect(Constants_Post)){
				el = selectedPeopleElements.get(Constants_Post + member.postId);

				if(!el && member.secondPostIds){ //副岗
					var _secondPostIds = member.secondPostIds; //List<[Department.id, Post.id]>
					for(var t = 0; t < _secondPostIds.size(); t++) {
						var _secondPostId = _secondPostIds.get(t);	//[Department.id, Post.id]
						var _postId = _secondPostId[1];

						el = selectedPeopleElements.get(Constants_Post + _postId);
						if(el){
							break;
						}
					}
				}
				if(!el){ //兼职
					var _concurents = topWindow.getObject(Constants_concurentMembers, member.id); //此人在该单位的兼职
					if(_concurents){
						for(var t = 0; t < _concurents.length; t++) {
							var _concurent = _concurents[t]; //判断是否是这个岗位
							var __concurentPost = _concurent.postId;
							el =selectedPeopleElements.get(Constants_Post + _concurentPost);
							if(el){
								break;
							}
						}
					}
				}

				if(el){
					message.add($.i18n("selectPeople.alert_contain_member", el.name, member.name));
					repeatingItem.add(Constants_Member + element.id);
					/*
					if(window.confirm($.i18n("selectPeople.alert_contain_member", el.name, member.name))){
						selectedPeopleElements.remove(Constants_Member + element.id);
						removeFromList3(Constants_Member + element.id);
					}
					*/
					continue;
				}
			}

			//检测该人的职务级别是否也被选择了
			if(_selectedPeopleTypes.containsKey(Constants_Level) && checkCanSelect(Constants_Level)){
				el = selectedPeopleElements.get(Constants_Level + member.levelId);
				if(el){
					message.add($.i18n("selectPeople.alert_contain_member", el.name, member.name));
					repeatingItem.add(Constants_Member + element.id);
					/*
					if(window.confirm($.i18n("selectPeople.alert_contain_member", el.name, member.name))){
						selectedPeopleElements.remove(Constants_Member + element.id);
						removeFromList3(Constants_Member + element.id);
					}
					*/
					continue;
				}
			}

			//组
			var teamIndexes = _selectedPeopleTypes.get(Constants_Team);
			if(teamIndexes && checkCanSelect(Constants_Team)){
				var memberExists = false;
				for(var t = 0; t < teamIndexes.size(); t++) {
					el = _selectedPeopleElements.get(teamIndexes.get(t));
					if(el.type == Constants_Team){
						//var memberList = topWindow.getObject(Constants_Team, el.id).getAllMemberIds();
						var memberList = topWindow.getObject(Constants_Team, el.id).members;
						var leadersList = topWindow.getObject(Constants_Team, el.id).leaders;
						var dealTeamList = new ArrayList();
						dealTeamList.instance = dealTeamList.instance.concat(memberList.instance);
						dealTeamList.instance = dealTeamList.instance.concat(leadersList.instance);
						for(var k = 0; k < dealTeamList.size(); k++) {
							var teamMember = dealTeamList.get(k);
							var teamMemberType = teamMember.type;
							if(teamMemberType == Constants_Member){
								var teamMemberId = teamMember.id;
								var teamMemberIds = teamMember.id.split("_");
								if(teamMemberIds.length > 1){
									teamMemberId = teamMemberIds[1];
								}
								if(teamMemberId == member.id){
									message.add($.i18n("selectPeople.alert_contain_member", el.name, member.name));
									repeatingItem.add(Constants_Member + element.id);
									memberExists = true;
									break;//判断一个就够了
								}
							}
						}
					}
					if(memberExists){
						break;
					}
				}
			}
		}
	}

	if(!message.isEmpty()){
		var size = message.size();

		var messageStr = (message.subList(0, 10).toString("<br/>") + "<br/><br/>" + $.i18n("selectPeople.alert_contain_item", size));

		$.confirm({
			msg : messageStr,
			targetWindow:parent.window,
			ok_fn : function(){
				removeRepeatingItem(repeatingItem);
			}
		});

		throw "continue";
	}

	function getData(){
		var selectedElements = selectedPeopleElements.values().toArray();
		var _selectedElements = [];

		for(var i = 0; i < selectedElements.length; i++) {
			var selectedElement = JSON.parse(JSON.stringify(selectedElements[i]));
			if(!checkShowAccountShortname4Element(selectedElement)){
				selectedElement.accountShortname = null;
				if(selectedElement.type == Constants_WfSuperNode){
					var node = topWindow.getObject(Constants_WfSuperNode,selectedElement.id);
					if(node && node.processMode){
						selectedElement["processMode"] = node.processMode;
						selectedElement["nodeDesc"] = node.nodeDesc;
						selectedElement["interveneMemberId"] = node.interveneMemberId;
						selectedElement["stepBackType"] = node.stepBackType;
						selectedElement["tolerantModel"] = node.tolerantModel;
					}
				}
			}
			_selectedElements.push(selectedElement);
		}

		if(needlessPreReturnValueFun != false){
			var _preReturnValueFun = getParentWindowData("preReturnValueFun");
			if(_preReturnValueFun){
				var preSelectedElements = new Array();
				for(var i = 0; i < selectedElements.length; i++) {
					var el = _selectedElements[i];
					preSelectedElements[i] = new Element();
					preSelectedElements[i].copy(el);
					preSelectedElements[i].entity = topWindow.getObject(el.type, el.id);
				}

				try{
					var preResult = null;
					eval("preResult = parentWindow." + _preReturnValueFun + "(preSelectedElements)");
					if(preResult && preResult.length == 2 && preResult[0] == false){
						throw preResult[1];
					}
				}
				catch(e){
					throw e;
				}
			}
		}

		return _selectedElements;
	}

	return getData();
}

/**
 * 检测已选择的数据中是否包含单位
 */
function checkIsContainAccount(){
	if((!checkCanSelect(Constants_Account) && !checkCanSelect(Constants_BusinessAccount)) || selectedPeopleElements.size() < 2){
		return;
	}

	var _selectedPeopleElements = selectedPeopleElements.values();

	var message = new ArrayList();
	var repeatingItem = new ArrayList();

	for(var i = 0; i < _selectedPeopleElements.size(); i++) {
		var element = _selectedPeopleElements.get(i);
		if(element.id=="BlankNode"){
			continue;
		}
		if(element.type == Constants_Account){
			for(var k = 0; k < _selectedPeopleElements.size(); k++) {
				var el = _selectedPeopleElements.get(k);
				//AEIGHT-9496 20130606 lilong 客户BUG修改，tanmf同意修改
				//OA-35642 同样此问题，选了单位根不能其他的组
				if(el.type == Constants_Team || el.type==Constants_JoinAccountTag || el.type==Constants_MemberMetadataTag || el.type==Constants_OrgMetadataTag || el.type==Constants_Guest || el.type == Constants_BusinessAccount || el.type == Constants_BusinessDepartment) {
					continue;
				}
				if((el.type != Constants_Account && el.accountId == element.id) || (element.id == rootAccount.id && el.id != rootAccount.id)){
					var obj = topWindow.getObject(el.type, el.id);
					if(obj && (obj.isInternal == false || (obj.externalType && obj.externalType != '0'))){
						if(obj.externalType && obj.externalType != '0'){
							if(element.id == "-1730833917365171641"){
								continue;
							}
						}else{
							continue;
						}
					}

					if(obj && el.id!="BlankNode"){
						message.add($.i18n("selectPeople.alert_contain_member", element.name, escapeStringToHTML(el.name)));
						repeatingItem.add(el.type + el.id);
					}
				}
			}
		}else if(element.type == Constants_BusinessAccount){//校验多维组织 和多维组织部门的包含关系
			var businessAccount = topWindow.getObject(Constants_BusinessAccount, element.id);
			for(var k = 0; k < _selectedPeopleElements.size(); k++) {
				var el = _selectedPeopleElements.get(k);
				var obj = topWindow.getObject(el.type, el.id);
				if(obj && obj.businessId){
					if(el.type == Constants_BusinessDepartment && obj.businessId == businessAccount.id){//校验多维组织根 和 多维组织部门的包含关系
						if(el.id!="BlankNode"){
							message.add($.i18n("selectPeople.alert_contain_member", element.name, escapeStringToHTML(el.name)));
							repeatingItem.add(el.type + el.id);
						}
					}else if(el.type == Constants_Member){//校验多维组织根  和 人员的包含关系
						if(businessAccount){
							var accessMemberIds = businessAccount.accessMemberIds;
							if(accessMemberIds.indexOf(el.id)>=0){
								if(el.id!="BlankNode"){
									message.add($.i18n("selectPeople.alert_contain_member", element.name, escapeStringToHTML(el.name)));
									repeatingItem.add(el.type + el.id);
								}
							}
						}
					}
				}
			}
		}
	}

	if(!message.isEmpty()){
		var size = message.size();

		var messageStr = (message.subList(0, 10).toString("<br/>") + "<br/><br/>" + $.i18n("selectPeople.alert_contain_item", size));

		$.confirm({
			msg : messageStr,
			targetWindow:parent.window,
			ok_fn : function(){
				removeRepeatingItem(repeatingItem);
			}
		});

		throw "continue";
	}
}


/**
 * 检测是否包含子部门
 */
function checkIsContainChildDepartment(){
	if(!checkCanSelect(Constants_Department) || selectedPeopleElements.size() < 2){
		return;
	}

	var message = new ArrayList();
	var repeatingItem = new ArrayList();

	var _selectedPeopleElements = selectedPeopleElements.values();
	for(var i = 0; i < _selectedPeopleElements.size(); i++) {
		var element = _selectedPeopleElements.get(i);

		// 数据中心不存在该单位的数据，说明没有改变
		if(!topWindow.dataCenter.containsKey(element.accountId)){
			continue;
		}

		if(element.type == Constants_Department){
			var obj = topWindow.getObject(element.type, element.id);
			if(!obj || obj.isInternal == false){
				if(obj.externalType != null && obj.externalType !='0' ){
					//vjoin 的数据
				}else{
					continue;
				}
			}
			var acId = obj.accountId;
			if(obj.accountId == null){
				acId =  element.accountId;
			}
			var allParents = topWindow.findMultiParent(topWindow.getDataCenter(Constants_Department, acId), element.id);
			if(!allParents || allParents.isEmpty()){
				continue;
			}

			for(var k = 0; k < allParents.size(); k++) {
				var entity = allParents.get(k);
				if(!entity || entity.id == element.id){
					continue;
				}

				var ancestor = selectedPeopleElements.get(Constants_Department + entity.id);
				// 选中其祖先且其祖先包含子部门
				if(ancestor && !ancestor.excludeChildDepartment){
					message.add($.i18n("selectPeople.alert_contain_member", entity.name, element.name));
					repeatingItem.add(Constants_Department + element.id);

					/*
					if(window.confirm($.i18n("selectPeople.alert_contain_member", entity.name, element.name))){
						selectedPeopleElements.remove(Constants_Department + element.id);
						removeFromList3(Constants_Department + element.id);
					}
					*/

					continue;
				}
			}
		}
	}

	if(!message.isEmpty()){
		var size = message.size();

		var messageStr = (message.subList(0, 10).toString("<br/>") + "<br/><br/>" + $.i18n("selectPeople.alert_contain_item", size));

		$.confirm({
			msg : messageStr,
			targetWindow:parent.window,
			ok_fn : function(){
				removeRepeatingItem(repeatingItem);
			}
		});

		throw "continue";
	}
}

/**
 * 检测是否包含业务子部门
 */
function checkIsContainChildBusinessDepartment(){
	if(!checkCanSelect(Constants_BusinessDepartment) || selectedPeopleElements.size() < 2){
		return;
	}

	var message = new ArrayList();
	var repeatingItem = new ArrayList();

	var _selectedPeopleElements = selectedPeopleElements.values();
	for(var i = 0; i < _selectedPeopleElements.size(); i++) {
		var element = _selectedPeopleElements.get(i);

		// 数据中心不存在该单位的数据，说明没有改变
		if(!topWindow.dataCenter.containsKey(element.accountId)){
			continue;
		}

		if(element.type == Constants_BusinessDepartment){
			var obj = topWindow.getObject(element.type, element.id);
			var acId = obj.accountId;
			if(obj.accountId == null){
				acId =  element.accountId;
			}
			var allParents = topWindow.findMultiParent(topWindow.getDataCenter(Constants_BusinessDepartment, acId), element.id);
			if(!allParents || allParents.isEmpty()){
				continue;
			}

			for(var k = 0; k < allParents.size(); k++) {
				var entity = allParents.get(k);
				if(!entity || entity.id == element.id){
					continue;
				}

				var ancestor = selectedPeopleElements.get(Constants_BusinessDepartment + entity.id);
				// 选中其祖先且其祖先包含子部门
				if(ancestor && !ancestor.excludeChildDepartment){
					message.add($.i18n("selectPeople.alert_contain_member", entity.name, element.name));
					repeatingItem.add(Constants_BusinessDepartment + element.id);
					continue;
				}
			}
		}
	}

	if(!message.isEmpty()){
		var size = message.size();

		var messageStr = (message.subList(0, 10).toString("<br/>") + "<br/><br/>" + $.i18n("selectPeople.alert_contain_item", size));

		$.confirm({
			msg : messageStr,
			targetWindow:parent.window,
			ok_fn : function(){
				removeRepeatingItem(repeatingItem);
			}
		});

		throw "continue";
	}
}

function removeRepeatingItem(repeatingItem){
	if(!repeatingItem){
		return;
	}

	for(var i = 0; i < repeatingItem.size(); i++) {
		var key = repeatingItem.get(i);

		selectedPeopleElements.remove(key);
		removeFromList3(key);
	}
}
/**
 *校验机构组是否包含部门，包含剔除重复的部门
 * */
function isOrgTeamContainChildDepartment(){
	var message = new ArrayList();
	var repeatingItem = new ArrayList();

	var _selectedOrgTeam = selectedPeopleElements.values();
	for(var i = 0; i < _selectedOrgTeam.size(); i++) {
		var orgTeam = _selectedOrgTeam.get(i);
		var type = orgTeam.type;
		if(type == Constants_OrgTeam){
			var _orgTeam = topWindow.getObject(Constants_OrgTeam, orgTeam.id);
			if(!_orgTeam){
				continue;
			}
			var depts = _orgTeam.getOrgTeamDepartment();
			for(var j = 0; j < depts.size(); j++){
				var dept = depts.get(j);
				var type = dept.type
				var deptidstr = dept.id;
				var deptId = deptidstr;
				if(deptId.indexOf("_")>=0){
					var index0 = deptidstr.indexOf("_");
					deptId = deptidstr.substr(index0+1);
					var key =Constants_Department+deptId
					orgTeamDepartment.put(key,_orgTeam.name);
				}
			}
		}
	}

	for(var i = 0; i < _selectedOrgTeam.size(); i++) {
		var orgTeamDept = _selectedOrgTeam.get(i);
		var type = orgTeamDept.type;
		var deptId = orgTeamDept.id;
		var key = Constants_Department+ deptId;
		if(type == Constants_Department ){
			if(orgTeamDepartment.containsKey(key)){
				message.add($.i18n("selectPeople.alert_contain_member", orgTeamDepartment.get(key),orgTeamDept.name));
				repeatingItem.add(Constants_Department + deptId);
				continue;

			}
		}
	}

	if(!message.isEmpty()){
		var size = message.size();

		var messageStr = (message.subList(0, 10).toString("<br/>") + "<br/><br/>" + $.i18n("selectPeople.alert_contain_item", size));

		$.confirm({
			msg : messageStr,
			targetWindow:parent.window,
			ok_fn : function(){
				removeRepeatingItem(repeatingItem);
			}
		});

		throw "continue";
	}
}
/**移除已经包含的部门**/
function removeRepeatingOrgTeamDept(repeatingItem){
	if(!repeatingItem){
		return;
	}

	for(var i = 0; i < repeatingItem.size(); i++) {
		var key = repeatingItem.get(i);

		selectedPeopleElements.remove(key);
		removeFromList3(key);
	}
}


/**
 * 回显原来的选人数据
 * 在父窗口的elements_${id}中
 */
function initOriginalData() {
	if(getParentWindowData("showOriginalElement") == false){
		return;
	}

	var originalDataValue;
	var originalDataElements;
	var originalDataText;
	if(null != getParentWindowData("params")){
		//Post|-673337325302758626,Post|-5908430834075939152,Post|-6224392101839417413,Post|-2371790963429915424
		originalDataValue = getParentWindowData("params").data || getParentWindowData("params").value;
		originalDataText = getParentWindowData("params").text;
		originalDataElements = getParentWindowData("elements");
	}

	if(!originalDataValue && !originalDataElements){
		return;
	}

	var elements = null;
	//该方法有具体jsp实现
	if((originalDataValue == null || originalDataValue == "") && originalDataElements){
		elements = originalDataElements;
	} else {
		elements = [];

		var enteries = originalDataValue.split(",");
		var textenteries = null;
		if(originalDataText != null && originalDataText != undefined){
			textenteries = originalDataText.toString().replace(new RegExp("、", 'g'), ",").split(",");
		}

		var originalDataValue0 = null;
		var enteriesMap = {};
		if(enteries.length > 0 && enteries[0]){
			for(var i = 0; i < enteries.length; i++){
				var strs = enteries[i].split("|");
				if(strs.length < 3){
					if(originalDataValue0 == null){
						originalDataValue0 = enteries[i];
					} else {
						originalDataValue0 = originalDataValue0 + "," + enteries[i];
					}
				} else if (strs.length >= 5) {
					var typeAndId = strs[0] + "|" + strs[1];
					if (originalDataValue0 == null) {
						originalDataValue0 = typeAndId;
					} else {
						originalDataValue0 = originalDataValue0 + "," + typeAndId;
					}
				}
			}
		}

		if(originalDataValue0 != null){
			var spm = new selectPeopleManager();
			enteriesMap = spm.parseElements(originalDataValue0);
		}

		for(var i = 0; i < enteries.length; i++){
			if(!enteries[i]){
				continue;
			}
			var e = enteries[i].split("|");
			if(!e){
				continue;
			}

			//function Element(type, id, name, typeName, accountId, accountShortname, description)
			var type = e[0];
			var id = e[1];
			if(!type || !id){
				continue;
			}
			/**
			 * 后端返回的entry对象
			 */
			var orgEntry = enteriesMap[id];
			var name = null;
			var accountId = null;
			var isEnabled = true;
			var isexChild = false;//是否包含子部门
			var isBusinessMember = false;

			var entity = topWindow.getObject(type, id);
			if(e.length > 3 || orgEntry != null || orgEntry != undefined){
				if(!entity){
					var dataPanel = Constants_Panels.get(type);
					if(dataPanel && dataPanel.singleLoad == true){//如果是这些页签，在点击页签的时候才加载数据
						topWindow.initOrgModel(orgEntry.accountId, currentMemberId, extParameters, isVjoinMember, type);
						entity = topWindow.getObject(type, id);
					} else {
						topWindow.initOrgModel(orgEntry.accountId, currentMemberId, extParameters, isVjoinMember);
						entity = topWindow.getObject(type, id);
					}
				}
				if(type == "FormField"){//OA-50418 表单控件回填特殊处理
					if(id.indexOf("#") == id.lastIndexOf("#")){
						name = id.substring(id.indexOf("#") + 1);
					} else {
						if(null != textenteries && textenteries.length > i){
							name = textenteries[i];
						} else {
							name = originalDataText;
						}
					}
				} else if(type.indexOf("BusinessDepartment") != -1 || type.indexOf("BusinessRole") != -1){
					if(!entity){
						topWindow.initOrgModel(orgEntry.accountId, currentMemberId, extParameters);
						if(type.indexOf(valuesJoinSep) > 0){
							var types = type.split(valuesJoinSep);
							var ids = id.split(valuesJoinSep);
							entity = topWindow.getObject(types[0], ids[0], orgEntry.accountId);
						} else {
							entity = topWindow.getObject(type, id, orgEntry.accountId);
						}
					}
					if(entity){
						name = entity.preShow + "-" + orgEntry.name;
					} else {
						name = orgEntry.name;
					}
				} else if(type == Constants_Member && returnMemberWithDept && id.indexOf(valuesJoinSep2) > -1){
					//需要显示出来选择的人员的部门 ，岗位
					var ids = id.split(valuesJoinSep2);

					var memberId;
					var memberName;
					if(ids.length > 1){
						var entity = topWindow.getObject(Constants_Member, ids[1]);
						if(entity){
							memberId = entity.id;
							memberName = entity.name;
						}
					}

					var deptId;
					var deptName;
					if(ids.length > 0){
						var deptEntity = topWindow.getObject(Constants_Department, ids[0]);
						if(deptEntity){
							deptId = deptEntity.id;
							deptName = deptEntity.name;
						}
					}

					var postId;
					var postName;
					if(ids.length > 2){
						var postEntity = topWindow.getObject(Constants_Post, ids[2]);
						if(postEntity){
							postId = postEntity.id;
							postName = postEntity.name;
						}
					}
					name = memberName + "(" + deptName + "-" + postName + ")";
				} else {
					name = orgEntry.name;
				}
				if(type == Constants_Member){
					isBusinessMember = orgEntry.isBusinessOrg;
				}
				accountId = orgEntry.accountId;
				isEnabled = orgEntry.isEnabled;
				if(e.length > 5){
					isexChild = (e[5] == "1");
					if(isexChild){
						name = name + "(" + $.i18n("common.selectPeople.excludechilddepartment") + ")";
					}
				}
			} else {
				// 如果不是组织机构的对象
				if(entity){
					if(type == "BusinessDepartment"){
						name = entity.preShow + "-" + entity.name;
					} else {
						name = entity.name;
					}
					if((type == Constants_Department || type == Constants_BusinessDepartment) && e.length > 2 && e[2] == 1){
						isexChild = true;
						name = name + "(" + $.i18n("common.selectPeople.excludechilddepartment") + ")";
					}
					accountId = entity.accountId;
				} else {
					name = getName(type, id);
					if(type == "Node" && e.length > 2 && e[2] == 1){
						isexChild = true;
						name = name + "(" + $.i18n("common.selectPeople.excludechilddepartment") + ")";
					}
				}
			}

			var ele = new Element(type, id, name, null, accountId, null, '');
			ele.isEnabled = isEnabled;
			if(entity){
				ele.externalType = entity.externalType;
			}
			if(isexChild){
				ele.excludeChildDepartment = isexChild;
			}
			if(memberWithDeptInfo && type == Constants_Member){
				var ids = id.split(valuesJoinSep2);
				if(ids.length == 3){
					var businessDeptId = isBusinessMember ? ids[0] : null;
					var departmentId = isBusinessMember ? null : ids[0];
					var postId = ids[2];
					PanelUtils.fillDeptInfo(ele, ids[1], businessDeptId, departmentId, postId, isBusinessMember,accountId)
					ele.id = ids[1];
					ele.name = ele.memberName;
				}
			}
			elements[elements.length] = ele;
		}
	}

	if(!elements || elements.length < 1){
		return;
	}

	var disabledE = new ArrayList();
	var _toAccount = new ArrayList();

	aaa:
		for(var i = 0; i < elements.length; i++){
			var element = elements[i];
			if(element == null || element.name == ""){
				continue;
			}

			var _entity = topWindow.getObject(element.type, element.id);
			if(_entity && _entity.externalType && _entity.externalType != "0"){
				element.externalType = _entity.externalType;
			}

			if(element.type == Constants_Node
				|| element.type == Constants_WfSuperNode
				|| element.type == Constants_Account
				|| (topWindow.Constants_Custom_Panels.keys() != null && topWindow.Constants_Custom_Panels.keys().contains(element.type))
				|| element.type == Constants_OrgMetadataTag){ //如果是这些类型，不校验数据有效性

			} else if(element.type == Constants_Guest && element.id == "-6964000252392685202"){//系统登录前guest账号
				var defaultGuest = topWindow.getObject(Constants_Guest, "-6964000252392685202");
				if(defaultGuest == null || defaultGuest == undefined || !defaultGuest.enable){
					disabledE.add(element.name);
					continue aaa;
				}
			} else if(groupAdmin && element.accountId != "-1730833917365171641"){//如果是集团管理员，不校验单位的数据，单位的其他数据太多了，每次都要再加载一遍单位的数据，有性能问题
				var _accountId = element.accountId;
				var account = allAccounts.get(_accountId);
				if(account){
					element.accountShortname = account.shortname;
					if(!_toAccount.contains(_accountId)){
						_toAccount.add(_accountId);
						if(_accountId != currentAccountId){
							topWindow.initOrgModel(_accountId, currentMemberId, extParameters);
						}
					}
				}
				if(element.isEnabled != false){
					var types = element.type.split(valuesJoinSep);
					var ids = element.id.split(valuesJoinSep);
					for(var k = 0; k < types.length; k++){
						if(types[k] != Constants_FormField){
							var __element = topWindow.getObject(types[k], ids[k]);
							if(__element == null || __element.isEnabled == false){
								if(element.name && element.name != ""){
									disabledE.add(element.name);
								}
								continue aaa;
							}
						}
					}
				}
			} else {
				var _accountId = element.accountId;
				var account = allAccounts.get(_accountId);
				if(account){
					element.accountShortname = account.shortname;

					//加载单位在数据
					if(!_toAccount.contains(_accountId)){
						_toAccount.add(_accountId);
						if(_accountId != currentAccountId){
							topWindow.initOrgModel(_accountId, currentMemberId, extParameters);
						}
					}
				}

				if(_accountId != currentAccountId && onlyLoginAccount && element.type != Constants_Member){
					if((element.externalType && element.externalType != "0")
						|| element.type == Constants_JoinAccountTag
						|| element.type == Constants_MemberMetadataTag
						|| element.type == Constants_OrgMetadataTag){
						//vjoin 数据回填
					} else if(element.type == Constants_Team && element.accountId == "-1730833917365171641"){
						//系统组
					} else {
						if(element.name && element.name != ""){
							disabledE.add(element.name);
						}

						continue aaa;
					}
				}

				if(element.isEnabled == false){
					if(element.name && element.name != ""){
						disabledE.add(element.name);
					}
					continue aaa;
				} else {
					var types = element.type.split(valuesJoinSep);
					var ids = element.id.split(valuesJoinSep);

					for(var k = 0; k < types.length; k++){
						if(types[k] != Constants_FormField){
							var __element = topWindow.getObject(types[k], ids[k]);
							if(__element == null || __element.isEnabled == false){
								if(element.name && element.name != ""){
									disabledE.add(element.name);
								}
								continue aaa;
							}
						}
					}
					if(!(memberWithDeptInfo && element.type === Constants_Member)){
						element.description = getFullNameStr(element.type, element.id);
					}
				}
			}

			var key = element.type + element.id;

			if(element.type == Constants_Department){
				var _entity = topWindow.getObject(element.type, element.id);
				if(_entity != null && _entity != undefined){
					if(_entity.getFullName){
						element.description = _entity.getFullName();
					}
				}
			} else if(element.type == Constants_Role && (element.externalType == 1 || element.externalType == 2)){
				element.name = element.name + $.i18n("selectPeople.out.title");
			}

			add2List3(key, element);
			if(maxSize == 1){
				selectedPeopleElements.clear();
			}
			selectedPeopleElements.put(key, element);
		}

	if(!disabledE.isEmpty()){
		alert($.i18n("selectPeople.disabledE", disabledE));
	}

	if(!_toAccount.isEmpty()){
		topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters);
	}
}

var showAccountShortnameFalg = getParentWindowData("showAccountShortname");
/**
 * 指定的类型是否需要显示类型<br>
 * 外部单位、单位、管理员、表单控制、动态角色 不显示单位简称。
 * @param element
 * @return true：要显示，false：不显示
 */
function checkShowAccountShortname4Element(element){
	if(showAccountShortnameFalg == "yes"){
		return true;
	}
	else if(showAccountShortnameFalg == "no"){
		return false;
	}

	var type = element.type;
	if(type == Constants_ExchangeAccount || type == Constants_Account || type == Constants_Admin || type == Constants_FormField || type == Constants_Node || type==Constants_WfSuperNode){
		return false;
	}

	if(type == Constants_BusinessAccount){
		return true;
	}

	if(loginAccountId != element.accountId){
		return true;
	}

	return false;
}

/**
 * 从主窗口取到排除数据
 */
function initExcludeElements(){
	try {
		var originalElement = getParentWindowData("excludeElements");

		if(!originalElement){
			return;
		}

		if((typeof originalElement) == "string"){
			var enteries = originalElement.split(",");
			for(var i = 0; i < enteries.length; i++) {
				if(!enteries[i]){
					continue;
				}

				var e = enteries[i].split("|");
				excludeElements.add(e[0] + e[1]);
			}
		}
		else{
			for(var i = 0; i < originalElement.length; i++) {
				excludeElements.add(originalElement[i].type + originalElement[i].id);
			}
		}
	}
	catch (e) {
	}

}

/**
 * 从主窗口取到超过人员就不能选择的元素
 */
function initExcludeElementsBeyondMemberSize(){
	try {
		var originalElement = getParentWindowData("excludeElementsBeyondMemberSize");

		if(!originalElement){
			return;
		}

		var enteries = originalElement.split(",");
		for(var i = 0; i < enteries.length; i++) {
			if(!enteries[i]){
				continue;
			}

			var e = enteries[i].split("|");
			excludeElementsBeyondMemberSize[e[0]] =  e[1];
		}
	}
	catch (e) {
	}

}

function initIncludeElements(){
	try {
		var originalElement = getParentWindowData("includeElements");

		if(!originalElement){
			return;
		}

		includeElements = new ArrayList();

		if((typeof originalElement) == "string"){
			var enteries = originalElement.split(",");
			for(var i = 0; i < enteries.length; i++) {
				if(!enteries[i]){
					continue;
				}

				var e = enteries[i].split("|");
				includeElements.add(e[0] + e[1]);

				AddChildDept(e[0], e[1]);
			}
		}
		else{
			for(var i = 0; i < originalElement.length; i++) {
				includeElements.add(originalElement[i].type + originalElement[i].id);

				AddChildDept(originalElement[i].type, originalElement[i].id);
			}
		}
	}
	catch (e) {
		//ignore
	}

	function AddChildDept(type, id){
		if(type == Constants_Department){
			var d = topWindow.getObject(Constants_Department, id);
			if(d){
				var cs = d.getAllChildren();
				if(cs){
					for ( var j = 0; j < cs.size(); j++) {
						includeElements.add(Constants_Department + cs.get(j).id);
					}
				}
			}
		}
	}
}

/**
 * 检查是否要在备选栏目中显示
 *
 * @param type
 * @param id
 * @return true显示，false不在备选中显示
 */
function checkIncludeElements(type, id){
	if(includeElements == null || includeElements.isEmpty()){ //没有指定
		return true;
	}

	if(type == Constants_Outworker){
		type = Constants_Department;
	}

	/*
     *单位、集团在备选范围,那下面的部门和人员能选择
     */
	if(type != Constants_Account){
		if(includeElements.contains(Constants_Account + currentAccountId) || (includeElements.contains(Constants_Account + rootAccount.id) && accessableAccounts.containsKey(rootAccount.id))){
			return true;
		}
	}

	if(type == Constants_Account && includeElements.contains(Constants_Account + rootAccount.id) && accessableAccounts.containsKey(rootAccount.id)){
		var path = allAccounts.get(id).path;
		if(path.startsWith(rootAccount.path)){
			return true;
		}
	}

	return includeElements.contains(type + id);
}

function checkIncludeElements4Member(member){
	if(includeElements == null || includeElements.isEmpty()){ //没有指定
		return true;
	}

	if(includeElements.contains(Constants_Department + member.departmentId) || includeElements.contains(Constants_Member + member.id)){
		return true;
	}

	/*
     *单位、集团在备选范围,那下面的部门和人员能选择
     */
	if(includeElements.contains(Constants_Account + member.accountId) || (includeElements.contains(Constants_Account + rootAccount.id) && accessableAccounts.containsKey(rootAccount.id))){
		return true;
	}

	var secondDepartIds = member.getSecondDepartmentIds();
	if(secondDepartIds){
		for ( var i = 0; i < secondDepartIds.size(); i++) {
			if(includeElements.contains(Constants_Department + secondDepartIds.get(i))){
				return true;
			}
		}
	}

	return false;
}

/**
 * 取得主窗口的数据
 */
function getParentWindowData(_name, defaultValue){
	try{
		if(!parentWindow){
			return;
		}

		var data = parentWindowData[_name];

		return data == null || data == undefined ? defaultValue : data;
	}
	catch(e){
		return defaultValue;
	}
}

function showQueryInput(){
	return true;
}

//function showQueryInputOfDepartOrTerm(){
//	return checkCanSelectMember();
//}
function showQueryInputOfOutworker(){
	return selectTypes.contains(Constants_Member) || selectTypes.contains(Constants_Department);
}
function showQueryInputOfDepart(){
//	if(getParentWindowData("showDepartmentMember4Search")){
//		return true;
//	}
//	else{
//		return selectTypes.contains(Constants_Member) || selectTypes.contains(Constants_Post);
//	}

	return true;
}

/**
 * 另存为组
 */
var saveAsTeamData = null;
function saveAsTeam(){
	try{
		saveAsTeamData = getSelectedPeoples(500, 2, false);
	}
	catch(e){
		if(e != 'continue'){
			$.alert({
				msg:e,
				targetWindow:window
			});
		}
		return;
	}

	for(var i = 0; i < saveAsTeamData.length; i++){
		var m = saveAsTeamData[i];
		if(m.type != Constants_Member){
			$.alert($.i18n("selectPeople.saveAsTeam_alert_OnlnMember"));
			return;
		}else{
			var mm = topWindow.getObject(Constants_Member, m.id);
			if(mm.externalType=="1"){
				$.alert("组中不能包含外部机构人员!");
				return;
			}
		}
	}

	var saveAsTeamData0 = saveAsTeamData;
	var memberIds = getIdsString(saveAsTeamData, false);
	var dialog = $.dialog({
		id : "saveAsTeamDialog",
		url : _ctxPath + "/selectpeople.do?method=saveAsTeam",
		width : 360,
		height: 140,
		title: $.i18n("selectPeople.saveAsTeam.lable"),
		isDrag :false,
		targetWindow : window,
		panelParam : {'show':false},
		maxParam :  {'show':false},
		minParam :  {'show':false},
		closeParam :  {'show':false,handler:function(){window.close();}},
		transParams : {
			"memberIds" : getIdsString(saveAsTeamData, false),
			"memberNames" : getNamesString(saveAsTeamData, $.i18n("common.separator.label"))
		},
		buttons : [
			{
				text : $.i18n('common.button.ok.label'),
				isEmphasize : true,
				handler : function() {
					var result = dialog.getReturnValue();
					if(result != -1){
						var teamId = result.TeamId;
						var teamName = result.TeamName;
						var repeatName = result.repeatName;
						if(repeatName == '1'){
							if (confirm($.i18n("common.organization.recover"))){
								var spm = new selectPeopleManager();
								var r = spm.saveAsTeam(teamId , teamName, memberIds);
								addPersonalTeam0(r["TeamId"], teamName, saveAsTeamData0);
								topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters);
								dialog.close();
							}
						}else{
							addPersonalTeam0(teamId, teamName, saveAsTeamData0);
							topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters);
							dialog.close();
						}
					}
				}
			},
			{
				text : $.i18n('common.button.cancel.label'),
				handler : function() {
					dialog.close();
				}
			}
		]
	});

	saveAsTeamData = null;
}

/**
 * 添加个人组
 * @param memberIds 逗号分隔的人员id
 */
function addPersonalTeam0(teamId, teamName, members){
	if(members == null){
		return;
	}

	topWindow.addPersonalTeam(loginAccountId, teamId, teamName, members);

	if(tempNowPanel.type == Constants_Team){
		initList(Constants_Team);
	}
}

function showDetailPost(){
	var postDataBodyObj = document.getElementById("PostDataBody");
	if(!postDataBodyObj || !postDataBodyObj.value){
		return;
	}

	var dialog = $.dialog({
		url : _ctxPath + "/selectpeople.do?method=showDetailPost",
		width : 530,
		height: 330,
		title: $.i18n("common.pleaseSelect.label"),
		isDrag :false,
		targetWindow : window,
		panelParam : {'show':false},
		maxParam :  {'show':false},
		minParam :  {'show':false},
		closeParam :  {'show':true,handler:function(){window.close();}},
		transParams : {
			_window : window
		},
		buttons : [
			{
				isEmphasize : true,
				text : $.i18n('common.button.ok.label'),
				handler : function() {
					var result = dialog.getReturnValue();
					if(result != -1){
						cb(result);
						dialog.close();
					}
				}
			},
			{
				text : $.i18n('common.button.cancel.label'),
				handler : function() {
					dialog.close();
				}
			}
		]

	});

	function cb(result){
		tempNowSelected.clear();

		for(var i = 0; i < result.length; i++) {
			var a = result[i];
			var e = new Element(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
			tempNowSelected.add(e);
		}

		selectOne();
	}
}
/************************************div实现function****************************************/
//单击组、岗位显示该组人员列表
function selectList1ItemDiv(type, objId,objTD){
	tempNowSelected.clear();

	var ops = document.getElementById(objId).childNodes;
	for(var i = 0; i < ops.length; i++) {
		var option = ops[i];
		option.setAttribute('seleted','false');
		option.setAttribute('class','member-list-div');
	}
	objTD.setAttribute('seleted','true');
	objTD.setAttribute('class','member-list-div-select');
	var count = 0;
	var e = getElementFromOption(objTD);
	if(e){
		tempNowSelected.add(e);
		count++;
	}
	if(count == 1 && tempNowPanel.isShowMember == true){
		var id = objTD.getAttribute('value');
		showList2(type, id);
	}

	if(nowSelectedList1Item != null){
		nowSelectedList1Item = null;
	}

	nowSelectedList1Item = objTD;
}
//单击人员列表改变背景 设置selectd 属性
function selectMemberFn(obj,temp_Id){
	if(!obj){return;}
	var seleted = obj.getAttribute('seleted');
	if(seleted == 'false'){
		obj.setAttribute('seleted','true');
		obj.setAttribute('class','member-list-div-select');
	}else{
		obj.setAttribute('seleted','false');
		obj.setAttribute('class','member-list-div');
	}
	if(temp_Id){temp_Div = temp_Id;}
}
//双击人员列表设置selected 属性 选择 人员
function selectOneMemberDiv(selectObj){
	if(!selectObj){
		return;
	}
	selectObj.setAttribute('seleted','true');
	var element = getElementFromOption(selectObj);
	if(element){
		tempNowSelected.clear();
		tempNowSelected.add(element);

		selectOne();
	}
}
//选中多个人员 一起选择过去
function listenermemberDataBodyDiv(object){
	if(object == null){return;}
	tempNowSelected.clear();
	var ops = object.childNodes;
	for(var i = 0; i < ops.length; i++) {
		var option = ops[i];
		if(option){
			if(option.getAttribute('seleted')=='true'){
				var e = getElementFromOption(option);
				if(e){
					tempNowSelected.add(e);
				}
				option.parentNode.removeChild(option);
				i--;
			}
		}
	}
}

function showSearchButton3(isShow){
	if(isShow){
		$("#SearchButton3_1").removeClass("hidden");
		$("#SearchButton3_2").addClass("hidden");
		$("#q3").focus();
	}
	else if(!isShow && !$("#q3").val()){
		$("#SearchButton3_1").addClass("hidden");
		$("#SearchButton3_2").removeClass("hidden");
	}
}

function isChildDeptOfCurrent(currentMember,departid){
	var isTrue = false;
	if(currentMember){
		var childs = currentMember.getDepartment().getAllChildren();
		for(var index=0;index<childs.size();index++){
			if(childs.get(index).id == departid){
				isTrue= true;
				break;
			}
		}
	}
	return isTrue;
}

function childDeptOfCurrent(currentMember){
	var childDepts =[];
	if(currentMember){
		var childs = currentMember.getDepartment().getAllChildren();
		for(var index=0;index<childs.size();index++){
			childDepts.push(childs.get(index).id);
		}
	}
	return childDepts;
}

function showDepart(fullDepartment){
	var showName = "";
	if(fullDepartment){
		var departNames = fullDepartment.split("/").slice(-3);
		var length = departNames.length;
		for(var i=0; i<length; i++){
			showName = showName + departNames[i]+"/";
		}
		if(showName && showName!=="" && showName.length>0){
			return showName.substring(0,showName.length-1);
		}else{
			return "";
		}
	}
}




/*----------------------------------------------------------------------------\
|                                Cross Panel 1.0                              |
|-----------------------------------------------------------------------------|
|                       Created by Tanmf (tanmf@seeyon.com)                   |
|                    For UFIDA-Seeyon (http://www.seeyon.com/)                |
|-----------------------------------------------------------------------------|
| A utility will be used for Organization Medol, use AJAX Tech. to load the   |
|data                                                                         |
|-----------------------------------------------------------------------------|
|                            Copyright (c) 2006 Tanmf                         |
|-----------------------------------------------------------------------------|
| Dependencies:                                                               |
|-----------------------------------------------------------------------------|
| 2006-09-20 | Original Version Posted.                                       |
|-----------------------------------------------------------------------------|
| Created 2006-09-20 | All changes are in the log above. | Updated 2006-08-20 |
\----------------------------------------------------------------------------*/

var orgDataCenterFlag = true;


var Constants_Account      = "Account";
var Constants_Department   = "Department";
var Constants_Team         = "Team";
var Constants_Post         = "Post";
var Constants_Level        = "Level";
var Constants_Member       = "Member";
var Constants_MemberSort   = "MemberSort";//人员排序号
var Constants_Role         = "Role";
var Constants_BusinessRole = "BusinessRole";
var Constants_Outworker    = "Outworker";
var Constants_ExchangeAccount   = "ExchangeAccount";
var Constants_concurentMembers  = "ConcurentMembers";
var Constants_OrgTeam           = "OrgTeam";
var Constants_RelatePeople      = "RelatePeople";
var Constants_FormField         = "FormField";
var Constants_WFDynamicForm     = "WFDynamicForm";
var Constants_OfficeField       = "office";
var Constants_Admin             = "Admin";
var Constants_Node              = "Node";
var Constants_WfSuperNode       = "WF_SUPER_NODE";
var Constants_OrgRecent         = "OrgRecent";
var Constants_OrgUp             = "OrgUp";
var Constants_JoinOrganization  = "JoinOrganization";
var Constants_JoinAccount       = "JoinAccount";
var Constants_JoinAccountTag    = "JoinAccountTag";
var Constants_JoinPost          = "JoinPost";
var Constants_MemberMetadataTag = "MemberMetadataTag";//单独人员属性，用于‘人员信息标签’ 页签
var Constants_OrgMetadataTag = "OrgMetadataTag";//部门，岗位，人员属性合集，用于‘组织属性’ 页签
var Constants_AccountMetadataTag = "AccountMetadataTag";//单独单位属性，用于‘单位’ 页签，下筛选单位
var Constants_PostMetadataTag = "PostMetadataTag";//单独单位属性，用于‘岗位’ 页签，下筛选岗位
var Constants_BusinessDepartment = "BusinessDepartment";
var Constants_BusinessAccount = "BusinessAccount";
var Constants_DepartmentAccess = "DepartmentAccess";//部门可见性设置
var Constants_Guest             = "Guest";
//应用属性
var Constants_AppProperty       = "AppProperty";//应用属性
//定义与ApplicationCategoryEnum保持一致
var Constants_AppDoc            = "doc";//文档中心
var Constants_AppMeeting        = "meeting";//会议
var Constants_AppMeetingSummary = "meetingsummary";//会议纪要
var Constants_AppBulletin       = "bulletin";//公告
var Constants_AppNews           = "news";//新闻
var Constants_Custom_Panels = new Properties();

var PeopleRelate_TypeName = {
	1 : "",
	2 : "",
	3 : "",
	4 : ""
};


/****************************************************************
 * 自定义页签属性对象
 * @param type 自定义控件类型
 * @param name 自定义控件类型
 * @param isShowArea2 是否显示区域2
 * @param area1ShowType 区域1显示方式，目前只支持列表，不支持属性结构显示
 * @param area2SelectMode 区域2的数据选择方式，
 * 提供2种方式：
 * 1.可作为单独元素选择到右侧已选区域（默认方式）
 * 2.与区域1的元素 拼接在一起作为整体供选择，这种情况下已选元素的数据类型就是当前控件的类型
 * 使用枚举 Area2SelectMode
 @param sp 连接区域1和区域2值的 连接符
 *
 */
function CustomPanel(type,name,isShowArea2,area1ShowType,area2SelectMode,sp){
	this.type = type;
	this.name = name;
	this.isShowArea2 = isShowArea2;
	this.area1ShowType = area1ShowType;
	this.area2SelectMode = area2SelectMode;
	this.sp = sp;
}


/****************************************************************
 * 单位
 * @param id
 * @param parentId 上级单位Id
 * @param name
 * @param hasChild 是否有子单位
 * @param shortname 单位简称
 * @param levelScope 职务级别限制
 * @param description
 */
function Account(id, parentId, path, name, hasChild, shortname, levelScope, description, externalType, memberSize,metadataIds){
	this.id = id;
	this.parentId = parentId;
	this.path = path;
	this.name = name;
	this.hasChild = hasChild;
	this.shortname = shortname;
	this.levelScope = levelScope;
	this.description = description;
	this.externalType = externalType;
	this.memberSize = memberSize;
	this.metadataIds = metadataIds;

	this.accessChildren = new ArrayList();
}

Account.prototype.toString = function(){
	return this.id + "\t" + this.name + "\t" + this.shortname + "\t" + this.levelScope;
};

//key:member.id, value: department.id
var Department2directMembersExist = {};
var BusinessDepartment2directMembersExist = {};
/**
 * @param id
 * @param parentId
 * @param name
 * @param hasChild
 * @param description
 * @param path
 * @param concurents 兼职  "Concurent":{"-3416446029311948944":[{"DN":"销售部","A":"-7402591981046643031","PN":"职员","N":"李华表","id":"7798797857441336066"}]}
 * @param postList 部门下的岗位 ArrayList<Post.id>
 */
function Department(id, parentId, name, hasChild, path, postList, roleList, isInternal, concurents, description, accountId, externalType, include){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.hasChild = hasChild;
	this.path = path;
	this.postList = postList;
	this.roleList = roleList;
	this.isInternal = isInternal == 0 ? false : true;
	this.concurents = concurents;
	this.description = description;
	this.accountId = accountId;
	this.externalType = externalType;
	this.include = include;
	this.type = Constants_Department;

	//部门下所有的人员,包括子部门,以及副岗人员
	this.allMembers = null;
	this.allMembersMap = null; //<Member.id, Member>
	//部门下直接人员，包括副岗人员
	this.directMembers = new ArrayList();
	//直接子部门
	this.directChildren = null;
	//所有的子部门
	this.allChildren = null;
	//兼职人员
	this.concurentMembers = null;

	//部门下的岗位
	this.Dposts = null;
	//部门下的角色
	this.Droles = null;

	//部门全名
	this.fullName = null;
}

Department.prototype.toString = function(){
	return this.name;
};

/**
 * 取得部门下的岗位列表
 * @return List<Post>
 */
Department.prototype.getPosts = function(){
	if(!this.postList){
		return null;
	}

	if(this.Dposts){
		return this.Dposts;
	}

	this.Dposts = new ArrayList();

	for(var i = 0; i < this.postList.size(); i++) {
		var postId = this.postList.get(i);
		var post = getObject(Constants_Post, postId);

		this.Dposts.add(post);
	}

	return this.Dposts;
};

/**
 * 得到部门下所有的角色
 */
Department.prototype.getRoles = function(){
	if(!this.roleList){
		return null;
	}

	if(this.Droles){
		return this.Droles;
	}

	this.Droles = new ArrayList();
	for(var i = 0; i < this.roleList.size(); i++) {
		var roleId = this.roleList.get(i);

		var role = getObject(Constants_Role, roleId);
		this.Droles.add(role);
	}

	return this.Droles;
}
/**
 * 部门下所有的人员,包括子部门,以及副岗人员,兼职人员
 */
Department.prototype.getAllMembers = function(){
	if(this.allMembers == null){
		this.allMembers = new ArrayList();

		var _departments = getDataCenter(Constants_Department, this.accountId);
		if(this.isInternal == false && this.externalType == "0"){//编外部门
			this.allMembers.addList(this.getDirectMembers());
		}else{
			for(var i = 0; i < _departments.size(); i++){
				var d = _departments.get(i);
				if((!(d.isInternal == false) || !(d.externalType == '0')) && checkIsChildDepartment(this.path, d.path)){
					this.allMembers.addList(d.getDirectMembers());
				}
			}
		}

	}

	function checkIsChildDepartment(parentPath, childPath){
		return childPath.indexOf(parentPath) == 0;
	}

	return this.allMembers;
}

/**
 * 部门下所有的人员,包括子部门，过滤掉部门可见性以外的人员
 */
Department.prototype.getAllMembersFilterByDepartmentAccess = function(){
	var allMembersFilterByDepartmentAccess = new ArrayList();
	allMembersFilterByDepartmentAccess.addList(this.getDirectMembersFilterByDepartmentAccess());

	var _departments = getDataCenter(Constants_Department, this.accountId);
	for(var i = 0; i < _departments.size(); i++){
		var d = _departments.get(i);
		if((!(d.isInternal == false) || !(d.externalType == '0')) && checkIsChildDepartment(this.path, d.path)){
			allMembersFilterByDepartmentAccess.addList(d.getDirectMembersFilterByDepartmentAccess());
		}
	}

	function checkIsChildDepartment(parentPath, childPath){
		return childPath.indexOf(parentPath) == 0 && parentPath != childPath;
	}

	return allMembersFilterByDepartmentAccess;
}

/**
 * 得到该部门下所有人<Member.Id, Member>
 */
Department.prototype.getAllMembersMap = function(){
	if(this.allMembersMap == null){
		this.allMembersMap = new Properties();
		var _allMembers = this.getAllMembers();
		for(var i = 0; i < _allMembers.size(); i++) {
			var m = _allMembers.get(i);
			this.allMembersMap.put(m.id, m);
		}
	}

	return this.allMembersMap;
}

/**
 * 添加直接成员，包括副岗人员,兼职人员，如果重复，只显示一个，并且以主岗优先
 */
Department.prototype.addDirectMembers = function(member, isCheck){
	var isExist = false;
	if(isCheck == true){
		isExist = (Department2directMembersExist[member.id] == this.id);
	}

	if(!isExist){ //不包含此人
		this.directMembers.add(member);
		Department2directMembersExist[member.id] = this.id;
	}
}

/**
 * 得到部门的直接成员，包括副岗人员,兼职人员
 */
Department.prototype.getDirectMembers = function(){
	var sortDirectMembers = new ArrayList();
	for(var i = 0; i < this.directMembers.size(); i++) {
		var m = this.directMembers.get(i);
		var newMember = m.clone();
		//取重新设置过的部门下的人员排序
		var key = "Department_"+m.id+"_"+this.id;
		var sortId = getObject(Constants_MemberSort, key);
		if(sortId != null){
			newMember.sortId = parseInt(sortId);
		}
		sortDirectMembers.add(newMember);
	}

	QuickSortArrayList(sortDirectMembers, "sortId");

	return sortDirectMembers;
}

Department.prototype.getDirectMembersFilterByDepartmentAccess = function(){
	var d = getObject(Constants_DepartmentAccess, this.id, this.accountId);
	if(d){//只能看到部分人
		var directMembers = this.getDirectMembers();
		if(d.type == "M"){
			var memberIds = d.memberIds;
			var filterDirectMembers = new ArrayList();
			for(var i = 0; i < directMembers.size(); i++) {
				var m = directMembers.get(i);
				if(memberIds.indexOf(m.id) != -1){
					filterDirectMembers.add(m);
				}
			}
			return filterDirectMembers;
		}else{
			return directMembers;
		}
	}
	return new ArrayList();
}

/**
 * 得到直接子部门
 */
Department.prototype.getDirectChildren = function(){
	if(this.directChildren){
		return this.directChildren;
	}

	return new ArrayList();
}

/**
 *
 */
Department.prototype.getAllChildren = function(){
	if(!this.allChildren){
		this.allChildren =  new ArrayList();

		var currentChildren = this.getDirectChildren();
		this.allChildren.addList(currentChildren);

		for(var i = 0; i < currentChildren.size(); i++) {
			this.allChildren.addList(currentChildren.get(i).getAllChildren());
		}
	}

	return this.allChildren;
}

Department.prototype.getAllChildrenFilterByDepartmentAccess = function(){
	if(!this.allChildren){
		this.allChildren =  new ArrayList();

		var currentChildren = this.getDirectChildren();
		this.allChildren.addList(currentChildren);

		for(var i = 0; i < currentChildren.size(); i++) {
			this.allChildren.addList(currentChildren.get(i).getAllChildren());
		}
	}

	var filterAllChildren = new ArrayList();
	for(var i = 0; i < this.allChildren.size(); i++) {
		var departmemt = this.allChildren.get(i);

		var d = getObject(Constants_DepartmentAccess, departmemt.id, departmemt.accountId);
		if(d){//只能看到部分人
			filterAllChildren.add(departmemt);
		}
	}

	return filterAllChildren;
}

/**
 * 得到兼职人员
 */
Department.prototype.getConcurents = function(){
	if(this.concurentMembers){
		return this.concurentMembers;
	}

	this.concurentMembers = new ArrayList();
	if(this.concurents){
		for(var i = 0; i < this.concurents.length; i++) {
			//{"DN":"销售部","A":"-7402591981046643031","PN":"职员","N":"李华表","id":"7798797857441336066","GL":"5744187978606337796"}
			var em = this.concurents[i];

			var member = getObject(Constants_concurentMembers, em[Constants_key_id]);
			var index = this.concurentMembers.indexOf(member);
			if(index < 0){
				this.concurentMembers.add(member);
			}
		}
	}

	return this.concurentMembers;
}

Department.prototype.getFullName = function(){
	if(this.fullName == null){
		this.fullName = this.name;

		var parentPath = getDepartmentParentPath(this.path);
		var parentDepartment = Path2Depart[parentPath];

		if(parentDepartment){
			var parentDepartmentFullName = parentDepartment.getFullName();
			this.fullName = parentDepartmentFullName + "/" + this.fullName;
		}
	}

	return this.fullName;
}

function DepartmentAccess(id, type, memberIds){
	this.id = id;
	this.type = type;
	this.memberIds = memberIds;
}


/******************************************************************************************************/
function BusinessAccount(id, parentId, name, showName, description, path){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.showName = showName;
	this.description = description;
	this.isPublic = false;
	this.memberIds = "";
	this.accessMemberIds = "";
	this.showAllMember = "0";
	this.path = path;

	this.accessChildren = new ArrayList();
}

BusinessAccount.prototype.toString = function(){
	return this.id + "\t" + this.name;
};

/******************************************************************************************************/
/**
 * 多维组织部门控件
 */
function BusinessDepartment(id, parentId, name, hasChild, path, roleList, description, accountId, include, businessId, preShow){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.hasChild = hasChild;
	this.path = path;
	this.roleList = roleList;
	this.description = description;
	this.accountId = accountId;
	this.include = include;
	this.type = Constants_BusinessDepartment;
	this.businessId = businessId;
	this.preShow = preShow;//前缀 ：  组织简称（单位简称）

	//部门下所有的人员,包括子部门,以及副岗人员
	this.allMembers = null;
	this.directMembersMap = null; //<Member.id, Member>
	this.allMembersMap = null; //<Member.id, Member>
	//部门下直接人员，包括副岗人员
	this.directMembers = new ArrayList();
	//直接子部门
	this.directChildren = null;
	//所有的子部门
	this.allChildren = null;
	//部门下的角色
	this.Droles = null;
	//部门全名
	this.fullName = null;
}

BusinessDepartment.prototype.toString = function(){
	return this.id + ", " + this.name;
};

/**
 * 得到部门下所有的角色
 */
BusinessDepartment.prototype.getBusinessRoles = function(){
	if(!this.roleList){
		return null;
	}

	if(this.Droles){
		return this.Droles;
	}

	this.Droles = new ArrayList();
	for(var i = 0; i < this.roleList.size(); i++) {
		var roleId = this.roleList.get(i);

		var role = getObject(Constants_BusinessRole, roleId);
		this.Droles.add(role);
	}

	return this.Droles;
}
/**
 * 部门下所有的人员,包括子部门
 */
BusinessDepartment.prototype.getAllMembers = function(){
	if(this.allMembers == null){
		this.allMembers = new ArrayList();
		this.allMembers.addList(this.getDirectMembers());

		var _departments = getDataCenter(Constants_BusinessDepartment, this.accountId);
		for(var i = 0; i < _departments.size(); i++){
			var d = _departments.get(i);
			if((!(d.isInternal == false) || !(d.externalType == '0')) && checkIsChildDepartment(this.path, d.path)){
				this.allMembers.addList(d.getDirectMembers());
			}
		}

	}

	function checkIsChildDepartment(parentPath, childPath){
		return childPath.indexOf(parentPath) == 0 && parentPath != childPath;
	}

	return this.allMembers;
}

/**
 * 得到该部门下所有人<Member.Id, Member>
 */
BusinessDepartment.prototype.getAllMembersMap = function(){
	if(this.allMembersMap == null){
		this.allMembersMap = new Properties();
		var _allMembers = this.getAllMembers();
		for(var i = 0; i < _allMembers.size(); i++) {
			var m = _allMembers.get(i);
			this.allMembersMap.put(m.id, m);
		}
	}

	return this.allMembersMap;
}

/**
 * 得到该部门下的人<Member.Id, Member>
 */
BusinessDepartment.prototype.getDirectMembersMap = function(){
	if(this.directMembersMap == null){
		this.directMembersMap = new Properties();
		var _directMembers = this.getDirectMembers();
		for(var i = 0; i < _directMembers.size(); i++) {
			var m = _directMembers.get(i);
			this.directMembersMap.put(m.id, m);
		}
	}

	return this.directMembersMap;
}

/**
 * 添加直接成员
 */
BusinessDepartment.prototype.addDirectMembers = function(member, isCheck){
	var isExist = false;
	if(isCheck == true){
		isExist = (BusinessDepartment2directMembersExist[member.id] == this.id);
	}

	if(!isExist){ //不包含此人
		this.directMembers.add(member);
		BusinessDepartment2directMembersExist[member.id] = this.id;
	}
}

/**
 * 得到部门的直接成员
 */
BusinessDepartment.prototype.getDirectMembers = function(){
	return this.directMembers;
}

/**
 * 得到直接子部门
 */
BusinessDepartment.prototype.getDirectChildren = function(){
	if(this.directChildren){
		return this.directChildren;
	}
	return new ArrayList();
}

/**
 *
 */
BusinessDepartment.prototype.getAllChildren = function(){
	if(!this.allChildren){
		this.allChildren =  new ArrayList();

		var currentChildren = this.getDirectChildren();
		this.allChildren.addList(currentChildren);

		for(var i = 0; i < currentChildren.size(); i++) {
			this.allChildren.addList(currentChildren.get(i).getAllChildren());
		}
	}

	return this.allChildren;
}


BusinessDepartment.prototype.getFullName = function(){
	if(this.fullName == null){
		this.fullName = this.name;

		var parentPath = getDepartmentParentPath(this.path);
		var parentDepartment = Path2Depart[parentPath];

		if(parentDepartment){
			var parentDepartmentFullName = parentDepartment.getFullName();
			this.fullName = parentDepartmentFullName + "/" + this.fullName;
		}
	}

	return this.fullName;
}

/*******************************************************************************************/


//key：member.id, value: post.id
var Post2MembersExist = {};
/****************************************************************
 * @param id
 * @param name
 * @param description
 * @param isEmpty 岗位下人员是否为空，只用于集团岗的判断。
 */
function Post(id, name, type, code, description, accountId, externalType,isEmpty){
	this.id = id;
	this.name = name;
	this.type = type;
	this.code = code;
	this.description = description;
	this.accountId = accountId;
	this.externalType = externalType;
	this.isEmpty = isEmpty;

	this.members = new ArrayList();
}

Post.prototype.getMembers = function(){
	var sortDirectMembers = new ArrayList();
	for(var i = 0; i < this.members.size(); i++) {
		var m = this.members.get(i);
		var newMember = m.clone();
		//取重新设置过的岗位下的人员排序
		var key = "Post_"+m.id+"_"+this.id;
		var sortId = getObject(Constants_MemberSort, key);
		if(sortId != null){
			newMember.sortId = parseInt(sortId);
		}
		sortDirectMembers.add(newMember);
	}

	QuickSortArrayList(sortDirectMembers, "sortId");
	return sortDirectMembers;
}

Post.prototype.addMember = function(member, isCheck){
	var isExist = false;
	var existsPostMember =  Post2MembersExist[member.id];
	if(isCheck == true){
		if(existsPostMember && existsPostMember.indexOf(this.id) != -1){
			isExist = true;
		}
	}

	if(!isExist){ //不包含此人
		this.members.add(member);
		if(existsPostMember && existsPostMember !=""){
			Post2MembersExist[member.id] = existsPostMember + "," + this.id;
		}else{
			Post2MembersExist[member.id] = this.id;
		}
	}
}

Post.prototype.getAllMembers = function(){
	return this.members;
}


/****************************************************************
 * 特殊账号对象
 */
function Guest(id, name, type, accountId, enable){
	this.id = id;
	this.name = name;
	this.type = type;
	this.accountId = accountId;
	this.enable = enable;
}

/****************************************************************
 * @param id
 * @param parentId
 * @param name
 * @param hasChild
 * @param sortId
 * @param groupLevelId 隐射到集团的职务级别id，不是sortId
 * @param description
 * @param isEmpty 职级下人员是否为空，只用于判断集团职务级别
 */
function Level(id, parentId, name, hasChild, sortId, groupLevelId, code, description, accountId, isEmpty){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.hasChild = hasChild;
	this.sortId = sortId;
	this.groupLevelId = groupLevelId;
	this.code = code;
	this.description = description;
	this.accountId = accountId;
	this.type = Constants_Level;
	this.isEmpty = isEmpty;

	this.members = null;
}
Level.prototype.getMembers = function(){
	if(this.members){
		return this.members;
	}

	this.members = new ArrayList();

	var _members = getDataCenter(Constants_Member, this.accountId);
	for(var i = 0; i < _members.size(); i++){
		var member = _members.get(i);
		if(member.levelId == this.id){
			this.members.add(member);
		}
	}

	return this.members;
}

Level.prototype.getAllMembers = function(){
	return this.getMembers();
}

/**
 * @param id
 * @param name
 * @param description
 */
function Role(id, name, type, bond, description, accountId,isGroupCustomer,realId,externalType){
	this.id = id;
	this.name = name;
	this.type = type;
	this.bond = bond;
	this.description = description;
	this.accountId = accountId;
	this.isGroupCustomer = isGroupCustomer;
	this.realId = realId;
	this.externalType = externalType;
}

function BusinessRole(id, name, type, bond, description, accountId,businessId, preShow){
	this.id = id;
	this.name = name;
	this.type = type;
	this.bond = bond;
	this.description = description;
	this.accountId = accountId;
	this.businessId = businessId;
	this.preShow = preShow;
}

/****************************************************************
 * @param id
 * @param name
 * @param departmentId
 * @param postId
 * @param secondPostIds List<[Department.id, Post.id]>
 * @param levelId
 * @param email
 * @param mobile
 * @param description
 */
function Member(id, name, sortId, departmentId, postId, secondPostIds, levelId, _isInternal, email, mobile, description, accountId, externalType,businessRoles){
	this.id = id;
	this.name = name;
	this.sortId = parseInt(sortId);
	this.departmentId = departmentId;
	this.departmentName = "";//人员所在部门名称，用于全集团查询结果显示全路径
	this.departmentNameF = "";//人员所在部门名称，用于全集团查询结果显示全路径--向上三级的部门
	this.postId = postId;
	this.secondPostIds = secondPostIds;
	this.levelId = levelId;
	this.isInternal = _isInternal == 0 ? false : true;
	this.email = email;
	this.mobile = mobile;
	this.description = description;
	this.accountId = accountId;
	this.externalType = externalType;
	this.type = Constants_Member;
	this.businessRoles = businessRoles;

	//一下是Member的扩展属性，通常是在运算过程中赋值，之后不再重新赋值

	this.department = null;
	this.post = null;
	this.level = null;
	this.teams = null;
	this.secondPost = null; //Properties<departmentId, ArrayList<Post>>
}

Member.prototype.clone = function(){
	var newMember = new Member();
	newMember.id = this.id;
	newMember.name = this.name;
	newMember.sortId = this.sortId;
	newMember.departmentId = this.departmentId;
	this.departmentName = this.departmentName;
	this.departmentNameF = this.departmentNameF;
	newMember.postId = this.postId;
	newMember.secondPostIds = this.secondPostIds;
	newMember.levelId = this.levelId;
	newMember.isInternal = this.isInternal;
	newMember.email = this.email;
	newMember.mobile = this.mobile;
	newMember.description = this.description;
	newMember.accountId = this.accountId;
	newMember.externalType = this.externalType;
	newMember.type = this.type;

	//一下是Member的扩展属性，通常是在运算过程中赋值，之后不再重新赋值
	newMember.department = this.department;
	newMember.post = this.post;
	newMember.level = this.level;
	newMember.teams = this.teams;
	newMember.secondPost = this.secondPost;
	return newMember;
}

Member.prototype.getLevel = function(){
	if(this.level == null){
		this.level = getObject(Constants_Level, this.levelId);
	}

	return this.level;
}

Member.prototype.getDepartment = function(){
	if(this.department == null){
		this.department = getObject(Constants_Department, this.departmentId);
	}

	return this.department;
}

Member.prototype.getPost = function(){
	if(this.post == null){
		this.post = getObject(Constants_Post, this.postId);
	}

	return this.post;
}

Member.prototype.getSecondPost = function(){
	if(this.secondPost == null){
		if(this.secondPostIds){
			this.secondPost = new Properties();

			for(var i = 0; i < this.secondPostIds.size(); i++) {
				var dId = this.secondPostIds.get(i)[0];
				var pId = this.secondPostIds.get(i)[1];

				var p = getObject(Constants_Post, pId);
				if(p){
					var _posts = this.secondPost.get(dId);
					if(_posts == null){
						_posts = new ArrayList();
						this.secondPost.put(dId, _posts);
					}

					_posts.add(p);
				}
			}
		}
		else{
			this.secondPost = new Properties();
		}
	}

	return this.secondPost;
}

/**
 * 判断当前人是否在指定部门兼职
 */
Member.prototype.isSecondPostInDept = function(departmentId){
	return this.getSecondPost().get(departmentId) != null;
}

/**
 * 根据兼职岗位得到我兼职部门
 */
Member.prototype.getSecondDepartmentId = function(postId){
	if(this.secondPostIds == null){
		return null;
	}

	for(var i = 0; i < this.secondPostIds.size(); i++) {
		var pId = this.secondPostIds.get(i)[1];

		if(pId == postId){
			return this.secondPostIds.get(i)[0];
		}
	}

	return null;
}

Member.prototype.getSecondDepartmentIds = function(){
	if(this.secondPostIds == null){
		return null;
	}

	var result = new SetList();

	for(var i = 0; i < this.secondPostIds.size(); i++) {
		result.add(this.secondPostIds.get(i)[0]);
	}

	return result;
}

Member.prototype.toString = function(){
	return "id=" + this.id + ", name=" + this.name + ", postId=" + this.postId +
		", levelId=" + this.levelId + ", departmentId=" + this.departmentId;
}

/****************************************************************
 * @param id
 * @param type 类型 1 - 个人 2 - 系统组 3 - 项目组
 * @param name
 * @param teamSupervisors ArrayList<Member.id> 组的主管
 * @param teamMembers ArrayList<Member.id> 组的成员
 * @param teamLeaders ArrayList<Member.id> 组的领导
 * @param teamRelatives ArrayList<Member.id> 组的关联人员
 * @param description
 */
function Team(id, type, name, depId, teamLeaders, teamMembers, teamSupervisors, teamRelatives, externalMember, description, accountId){
	this.id = id;
	this.type = type;
	this.name = name;
	this.depId = depId;
	this.teamLeaders = teamLeaders; //主管
	this.teamMembers = teamMembers; //成员
	this.teamSupervisors = teamSupervisors; //领导
	this.teamRelatives = teamRelatives; //管理人员
	this.externalMember = externalMember || []; //外单位人员
	this.description = description;
	this.accountId = accountId || "";

	this.department = null;

	this.leaders = new ArrayList();
	this.members = new ArrayList();
	this.supervisors = new ArrayList();
	this.relatives = new ArrayList();

	this.isInit = false;
}

/**
 * 取得组所属部门
 */
Team.prototype.getDepartment = function(){
	if(!this.department){
		if(!this.depId || this.depId == -1){
			return null;
		}

		this.department = getObject(Constants_Department, this.depId);
	}

	return this.department;
}

/**
 * 初始化人员
 */
Team.prototype.initMembers = function(){
	if(this.isInit == true){
		return;
	}

	/*    for(var i = 0; i < this.externalMember.length; i++) {
        var em = this.externalMember[i];
        var member = new Member(em[Constants_key_id], em["N"], 999999, null, null, null, null, true, em["Y"], em["M"], '');
        member.type = "E";
        member.departmentName = em["DN"] || "";
        member.accountId = em["A"];

        addExMember(member);
    }*/

	// var temp = dataCenterMap[currentAccountId_orgDataCenter][Constants_Member] || {};

	for(var i = 0; i < this.teamLeaders.size(); i++) {
		var m = this.teamLeaders.get(i);
		var memberArr = m.split("\|");

		var memberType = memberArr[0];
		var memberId= memberArr[1];
		var memberName = memberArr[2];
		//组成员  人员
		var member = new Member(memberId, memberName, 999999, null, null, null, null, true, '', '', '');
		member.type = Constants_Member;
		this.leaders.add(member);
	}

	var cm = getObject("Member",currentMemberId_orgDataCenter);

	for(var i = 0; i < this.teamMembers.size(); i++) {
		var m = this.teamMembers.get(i);
		var memberArr = m.split("\|");

		var memberType = memberArr[0];
		var memberId= memberArr[1];
		var memberName = memberArr[2];
		//并不一定是人员，将组成员放在对应的对象中
		//组成员  人员
		if(memberType == Constants_Member){
			var member = new Member(memberId, memberName, 999999, null, null, null, null, true, '', '', '');
			member.type = Constants_Member;
			this.members.add(member);

			// if(memberId.indexOf("_")>=0){
			// 	var index0 = memberId.indexOf("_");
			// 	var eAccountId = memberId.substr(0,index0);
			// 	if(eAccountId != currentAccountId_orgDataCenter || (cm != null && !cm.isInternal && cm.externalType=='0') ){
			// 		var eMember = new Member(memberId.substr(index0+1), memberName, 999999, null, null, null, null, true, '', '', '');
			//
			// 		eMember.type = "E";
			// 		eMember.accountId = currentAccountId_orgDataCenter;
			// 		addExMember(eMember);
			// 	}
			// }

		}

		//组成员  部门
		if(memberType == Constants_Department){
			//是否包含子部门
			var include = "0";
			if(memberArr.length==4){
				var include = memberArr[3];
				this.members.add(depart);
			}
			var depart = new Department(memberId, null, memberName, false, null, null, null, null, null, "", null, null,include);
			depart.type = Constants_Department;
			this.members.add(depart);
		}


		//组成员  岗位、 部门下的岗位
		if(memberType == Constants_Post || memberType == "Department_Post"){
			var post = new Post(memberId, memberName, memberType, null, null, null, null);
			post.type = memberType;
			this.members.add(post);
		}

		//组成员  组
		if(memberType == Constants_Team){
			var team = new Team(memberId, Constants_Team, memberName, -1, null, null, null, null, null, "");
			team.type = Constants_Team;
			this.members.add(team);
		}

		//组成员  职务级别
		if(memberType == Constants_Level){
			var level = new Level(memberId, "", memberName, true, null, null, null, "", null);
			level.type = Constants_Level;
			this.members.add(level);
		}

	}

	for(var i = 0; i < this.teamSupervisors.size(); i++) {
		var m = this.teamSupervisors.get(i);
		var memberArr = m.split("\|");

		var memberType = memberArr[0];
		var memberId= memberArr[1];
		var memberName = memberArr[2];

		var member = new Member(memberId, memberName, 999999, null, null, null, null, true, '', '', '');
		member.type = Constants_Member;
		this.supervisors.add(member);
	}

	for(var i = 0; i < this.teamRelatives.size(); i++) {
		var m = this.teamRelatives.get(i);
		var memberArr = m.split("\|");

		var memberType = memberArr[0];
		var memberId= memberArr[1];
		var memberName = memberArr[2];

		var member = new Member(memberId, memberName, 999999, null, null, null, null, true, '', '', '');
		member.type = Constants_Member;
		this.relatives.add(member);
	}

	this.isInit = true;

	//加载完成后释放内存
	this.teamLeaders = EmptyArrayList; //主管
	this.teamMembers = EmptyArrayList; //成员
	this.teamSupervisors = EmptyArrayList; //领导
	this.teamRelatives = EmptyArrayList; //管理人员
}

/**
 * 得到成员（主管、成员）的Id
 */
Team.prototype.getAllMemberIds = function(){
	var allMemberIds = new ArrayList();
	allMemberIds.addList(this.teamLeaders);
	allMemberIds.addList(this.teamMembers);

	return allMemberIds;
}


/**
 * 所有的成员，包括主管、组员
 */
Team.prototype.getAllMembers = function(){
	this.initMembers();
	var allMembers = new ArrayList();

	allMembers.addList(this.leaders);
	allMembers.addList(this.members);

	return allMembers;
}

/**
 * 得到组的主管
 * @return List<Member>
 */
Team.prototype.getLeaders = function(){
	this.initMembers();
	return this.leaders;
}

/**
 * 得到组的成员
 *
 * @return List<Member>
 */
Team.prototype.getMembers = function(){
	this.initMembers();
	return this.members;
}

/**
 * 得到组的领导
 * @return List<Member>
 */
Team.prototype.getSupervisors = function(){
	this.initMembers();
	return this.supervisors;
}

/**
 * 得到组的关联人员
 * @return List<Member>
 */
Team.prototype.getRelatives = function(){
	this.initMembers();
	return this.relatives;
}

function addExMember(member){
	try {
		var obj = dataCenterMap[currentAccountId_orgDataCenter][Constants_Member][member.id];
		if(!obj){
			getDataCenter(Constants_Member).add(member);
			dataCenterMap[currentAccountId_orgDataCenter][Constants_Member][member.id] = member;
		}
	}
	catch (e) {
		alert(e.message)
	}
}

/**************************************************************
 * 外部单位，用于公文交换
 */
function ExchangeAccount(id, name, description){
	this.id = id;
	this.name = name;
	this.isInternal = false;
	this.description = description;
}

/**************************************************************
 * 机构组，用于公文，新增orgTeamDepartment参数
 */
function OrgTeam(id, name, description,orgTeamDepartment){
	this.id = id;
	this.name = name;
	this.description = description;
	this.orgTeamDepartment = orgTeamDepartment;
	this.orgTeamDepartments = new ArrayList();
	this.isInit=false;
}
/**新增初始化加载机构组***/
OrgTeam.prototype.initOrgTeamDepartment = function() {
	if (this.isInit == true) {
		return;
	}
	for (var i = 0; i < this.orgTeamDepartment.size(); i++) {
		var m = this.orgTeamDepartment.get(i);
		var departmentArr = m.split("\|");
		var departmentType = departmentArr[0];
		var departmentId = departmentArr[1];
		var departmentName = departmentArr[2];
		// 组成员 人员
		var member = new Member(departmentId, departmentName, 999999, null,
			null, null, null, true, '', '', '');
		member.type = departmentType;
		this.orgTeamDepartments.add(member);
	}
	this.isInit = true;
}
/** 添加机构组部门赋值* */
OrgTeam.prototype.getOrgTeamDepartment = function (){
	this.initOrgTeamDepartment();
	return this.orgTeamDepartments;
}

OrgTeam.prototype.toString = function(){
	return this.id + ", " + this.name;
}

/****************************************************************
 * 关联人员
 */
function RelatePeople(type, name, description){
	this.type = type;
	this.name = name;
	this.description = description;

	this.memberOrginal = new ArrayList();

	this.members = null;
}

RelatePeople.prototype.addMember = function(o){
	this.memberOrginal.add(o);
}

RelatePeople.prototype.getMembers = function(selectAccountId){
	if(this.members == null || this.members.size() == 0){
		if(!selectAccountId){
			selectAccountId = currentAccountId_orgDataCenter;
		}
		var st = new Date();
		this.members = new ArrayList();
		for ( var i = 0; i < this.memberOrginal.size(); i++) {
			var o = this.memberOrginal.get(i);
			var em = o["E"];
			if(em){
				var member = new Member(o["K"], em["N"], 999999, null, null, null, null, true, em["Y"], em["M"], '');
				member.type = "E";
				member.departmentName = em["DN"] || "";
				member.accountId = em["A"];

				addExMember(member);
				this.members.add(member);
			}
			else{
				var member = dataCenterMap[selectAccountId][Constants_Member][o["K"]];
				if(member != null){
					this.members.add(member);
				}
			}
		}
	}

	return this.members;
}

RelatePeople.prototype.toString = function(){
	return this.id + ", " + this.name;
}

/*******************************************************************
 * 管理员
 */
function Admin(id, name, role, accountId, description){
	this.id = id;
	this.name = name;
	this.role = role;
	this.accountId = accountId;
	this.description = description;
};

Admin.prototype.toString = function(){
	return this.is + ", " + this.name;
};

/**
 * 表单控件
 * @param {} id
 * @param {} name
 */
function FormField(id, name, departmentRole){
	this.id = id;
	this.name = name;
	this.departmentRole = departmentRole;
}
FormField.prototype.getRoles = function(){
	var r = new ArrayList();

	if(this.departmentRole){
		for(var i = 0; i < this.departmentRole.length; i++){
			r.add(this.departmentRole[i]);
		}
	}

	return r;
};
FormField.prototype.toString = function(){
	return this.name + ", " + this.id;
};

/**
 * 应用属性
 * @param {} id
 * @param {} name
 * @param {} type
 * "AppDoc";//文档中心
 * "AppMeeting";//会议
 * "AppMeetingSummary";///会议纪要
 * "AppBulletin";//公告
 * "AppNews";//新闻
 */
function AppProperty(id, type, name, role){
	this.id = id;
	this.type = type;
	this.name = name;
	this.role = role;
}
AppProperty.prototype.getRoles = function(){
	var r = new ArrayList();

	if(this.role){
		for(var i = 0; i < this.role.length; i++){
			r.add(this.role[i]);
		}
	}

	return r;
};


/**
 * 流程动态匹配表单控件
 * @param {} id
 * @param {} name
 * @param fid : 表单ID
 * @param fname : 表单名字
 */
function WFDynamicForm(id, name , fid , fname , departmentRole){
	this.id = id;
	this.name = name;
	this.formId = fid;
	this.formName = fname;
	this.departmentRole = departmentRole;
}
WFDynamicForm.prototype.getRoles = function(){
	var r = new ArrayList();

	if(this.departmentRole){
		for(var i = 0; i < this.departmentRole.length; i++){
			r.add(this.departmentRole[i]);
		}
	}

	return r;
};
WFDynamicForm.prototype.toString = function(){
	return this.name + ", " + this.id;
};


/**
 * 综合办公控件
 */
function OfficeField(id, name, departmentRole){
	this.id = id;
	this.name = name;
	this.departmentRole = departmentRole;
}
OfficeField.prototype.getRoles = function(){
	var r = new ArrayList();

	if(this.departmentRole){
		for(var i = 0; i < this.departmentRole.length; i++){
			r.add(this.departmentRole[i]);
		}
	}

	return r;
};
OfficeField.prototype.toString = function(){
	return this.id + ", " + this.name;
};

/**
 * 动态节点
 * @param id
 * @param name
 * @returns
 */
function Node(id, name, departmentRole,processMode,nodeDesc,interveneMemberId,tolerantModel, stepBackType){
	this.id = id;
	this.name = name;
	this.departmentRole = departmentRole;
	this.processMode = processMode;
	this.nodeDesc = nodeDesc;
	this.interveneMemberId = interveneMemberId;
	this.tolerantModel = tolerantModel;
	this.stepBackType = stepBackType;
}
Node.prototype.getRoles = function(){
	var r = new ArrayList();

	if(this.departmentRole){
		for(var i = 0; i < this.departmentRole.length; i++){
			r.add(this.departmentRole[i]);
		}
	}

	return r;
};
Node.prototype.toString = function(){
	return this.id + ", " + this.name;
};


/**
 * 自定义的选人界面页签统一对象
 * @param id
 * @param name
 * @param relationData 关联数据
 * @returns
 */
function Custom(id, name, relationData){
	this.id = id;
	this.name = name;
	this.relationData = relationData;
}

Custom.prototype.getRelationData = function(){
	var r = new ArrayList();

	if(this.relationData){
		for(var i = 0; i < this.relationData.length; i++){
			r.add(this.relationData[i]);
		}
	}

	return r;
};
Custom.prototype.toString = function(){
	return this.id + ", " + this.name;
};

/*****************************************************************************************************
 * 最近联系人页签
 */

function OrgRecent(id, name, em) {
	this.id = id;
	this.name = name;
	this.type = "Member"
	this.em = em;
}

OrgRecent.prototype.getDepartment = function(){
	var _temp = getObject(Constants_Member, this.id);
	return getObject(Constants_Department, _temp.departmentId);
}

OrgRecent.prototype.initMembers = function(){
	var em =this.em;
	if(em){
		var member = new Member(this.id, em["N"], 999999, null, null, null, null, true, em["Y"], em["M"], '');
		member.type = "E";
		member.departmentName = em["DN"] || "";
		member.accountId = em["A"];

		addExMember(member);
	}
}

OrgRecent.prototype.getOneMember = function(){
	this.initMembers();
	return getObject(Constants_Member, this.id);
}

/**
 * 外部单位标签控件
 */
function JoinAccountTag(id, parentId, name, hasChild){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.hasChild = hasChild;

	//直接子
	this.directChildren = null;
	//所有子
	this.allChildren = null;
}

/**
 * 得到直接子
 */
JoinAccountTag.prototype.getDirectChildren = function(){
	if (this.directChildren) {
		return this.directChildren;
	}

	return new ArrayList();
};

JoinAccountTag.prototype.toString = function(){
	return this.id + ", " + this.name;
};


/**
 * 外部单位标签控件
 */
function MemberMetadataTag(id, parentId, name, hasChild, fullName,enumType){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.hasChild = hasChild;
	this.fullName = fullName;
	//枚举数据类型（是枚举属性(K)，还是枚举值(V)）
	this.enumType = enumType;

	//直接子
	this.directChildren = null;
	//所有子
	this.allChildren = null;
}

/**
 * 得到直接子
 */
MemberMetadataTag.prototype.getDirectChildren = function(){
	if (this.directChildren) {
		return this.directChildren;
	}

	return new ArrayList();
};

MemberMetadataTag.prototype.toString = function(){
	return this.id + ", " + this.name;
};

/******************************************************************************************************/
/******************************************************************************************************/
var currentAccountId_orgDataCenter    = null;
var currentMemberId_orgDataCenter  = null;

var ajaxLoadOrganization = "ajaxSelectPeopleManager";
var Constants_key_id = "K";

var hasLoadOrgModel = new Properties();
var hasLoadExchangeAccountModel = new Properties();

//组织模型时间戳
var orgLocalTimestamp = new Properties();

/**
 * Properties<accountId, Properties<EntityType, List<Entity>>>
 *
 * 该对象不要直接访问，请用getDataCenter(type)
 */
var dataCenter = new Properties();

/**
 * 所有的对象都在里面
 *
 * {accountId, {EntityType, {id, Entity}}}
 */
var dataCenterMap = {};

//~ 所有的单位 <account.id, Account>
var allAccounts = new Properties();
var rootAccount = new Account();

/**
 * 职务级别 {accountId, {hashCode, level.id}}
 */
var levelHashCodeMap = {};
var departmentHashCodeMap = {};
var postHashCodeMap = {};

/**
 * 取得组织模型数据
 *
 * @param type 类型，如果没有返回所有
 */
function getDataCenter(type, accountId){
	accountId = accountId || currentAccountId_orgDataCenter;
	if(!hasLoadOrgModel.get(accountId)){
		return null;
	}

	if(type){
		var accountDataCenter = dataCenter.get(accountId);

		if(accountDataCenter){
			return accountDataCenter.get(type);
		}
	}

	return dataCenter.get(accountId);
}

/**
 * 根据类型和Id取得Object
 */
function getObject(type, id, accountId0){
	if(type == Constants_Account){
		return allAccounts.get(id);
	}
	var _accountId = accountId;
	var accountId = accountId0 || currentAccountId_orgDataCenter;

	if(!hasLoadOrgModel.get(accountId)){
		return null;
	}

	var object = null;
	try {
		if(type == Constants_Member){
			if(id.indexOf("#")>-1){ //开启了参数 returnMemberWithDept，格式为：  部门Id#人员Id#岗位
				var ids = id.split("#");
				if(ids.length>1){
					id = ids[1];
				}
			}
		}else if(type == Constants_OrgMetadataTag){
			var ids = id.split("_");
			if(ids.length == 2){//orgMetadataId
				//如果有第2位，则是部门人员属性所属的部门id
				id = ids[0];
			}
		}
		object = dataCenterMap[accountId][type][id]; //从当前的单位找
		if(object){
			return object;
		}

		if(accountId0 != null){ //如果指定了单位，就不再查全局，就此返回
			return object;
		}
	}
	catch (e) {
	}
	if(!_accountId){
		for(var dataCenterItem in dataCenterMap) {
			if(dataCenterMap[dataCenterItem]){
				try{
					object = dataCenterMap[dataCenterItem][type][id];
				}catch(e){}
			}
			if(object){
				return object;
			}
		}
	}

	return null;
}

//可以显示在选人界面的单位角色
function getCustomerAccountRole(accountId){
	if(null == accountId){
		return null;
	}

	if(!hasLoadOrgModel.get(accountId)){
		return null;
	}

	var count = 0;
	var objects = [];
	try {
		var list = getDataCenter(Constants_Role, accountId);
		for ( var i = 0; i < list.size(); i++) {
			if(list.get(i).type == 2 && list.get(i).bond == 1){
				objects[count++] = list.get(i);
			}
		}
	}
	catch (e) {
	}
	return objects;
}

function getObjects(type, id, accountId){
	if(type == Constants_Account){
		return allAccounts.get(id);
	}

	accountId = accountId || currentAccountId_orgDataCenter;

	if(!hasLoadOrgModel.get(accountId)){
		return null;
	}

	var count = 0;
	var objects = [];
	try {
		var list = getDataCenter(type, accountId);
		for ( var i = 0; i < list.size(); i++) {
			if(list.get(i).id == id){
				objects[count++] = list.get(i);
			}
		}
	}
	catch (e) {
	}

	return objects;
}

//Map<Department.path, Department>
var Path2Depart = {};
var Path2BusinessDepart = {};

//当前人是外部人员，这是他的工作范围[Department.path]
var ExternalMemberWorkScope = new ArrayList();
//当前是vjoin人员，这是他的工作范围
var VjoinMemberWorkScope = new ArrayList();
//内部人员都访问的vjoin人员
var InnerMemberAccessVjoinMember = new ArrayList();


//能够访问的内部部门
var AccessInnerDepts = new ArrayList();
//能够访问的vjoin部门
var AccessVjoinDepts = new ArrayList();
//VJoin人员能够访问的vjoin外部单位
var VjMemberAccessVjAccounts = new ArrayList();

//部门可见性设置下，我无法直接选择的岗位
var NoAccessPostIdsByDepartmentAccess = new ArrayList();

//部门可见性设置下，我无法直接选择的职级
var NoAccessLevelIdsByDepartmentAccess = new ArrayList();

//当前切换单位下的部门
var currentV5DepartmentsMap        = null;


//当前人是内部人员，能访问哪些外部人员 <departmentId, List<memberId>>
var ExtMemberScopeOfInternal = new Properties();

//当前人是内部人员，能访问哪些vjoin人员 <departmentId, List<memberId>>
var VjoinMemberScopeOfInternal = new Properties();

/********************** Data Center *************************
 * Load based data
 *
 * 加载组织模型数据
 *
 * @param accountId 需要加载单位
 * loadPanels:如果loadPanels设置了值，本次加载只针对loadPanels里页签对应的数据
 */

if(topWindow1 !=  topWindow){
	var initOrgModel = function(accountId, memberId, extParameters, isVjoin,loadPanels){
		if(accountId === "-1"){
			return;
		}
		var currentAccountId_orgDataCenter_temp = currentAccountId_orgDataCenter;//临时存放当前切换的单位id，这个值只能是内部单位的id，加载V-Join数据时，这个值不变。
		if(accountId && memberId){
			currentAccountId_orgDataCenter_temp = accountId;
			currentMemberId_orgDataCenter  = memberId;
		}

		this.invoke = function(){

		};

		var accountDataCenter  = dataCenter.get(currentAccountId_orgDataCenter_temp);

		var departments        = null; //部门
		var departmentAccesses = null; //部门可见性设置
		var teams              = null; //组
		var posts              = null; //岗位
		var levels             = null; //职务级别
		var members            = null; //人员
		var memberSort         = null; //人员排序
		var roles              = null; //特殊角色
		var businessRoles      = null; //业务组织角色
		var outworkers         = null; //外部人员
		var exchangeAccounts   = null; //外部单位，用于公文交换
		var orgTeams           = null; //机构组，用于公文
		var relatePeoples      = null; //关联人员
		var concurentMembers   = null; //兼职人员，只存人的Id和单位Id
		var admins             = null; //管理员
		var formFields         = null; //表单控件
		var wFDynamicForms     = null; //动态表单控件
		var officeFields       = null; //综合办公控件
		var nodes              = null; //动态节点
		var supernodes         = null; //超级节点
		var orgrecent          = null; //最近页签
		var joinAccountTags    = null; //外部单位标签
		var memberMetadataTags = null; //人员元数据标签
		var orgMetadataTags    = null; //组织属性数据标签
		var accountMetadataTags    = null; //单位元数据
		var postMetadataTags    = null; //岗位元数据
		var businessDepartments = null; //多维组织（部门）
		var businessAccounts    = null; //多维组织（部门）
		var guests             = null; //特殊账号
		//应用属性
		var appDoc             = null; //文档中心
		var appMeeting         = null; //会议
		var appBulletin        = null; //会议纪要
		var appMeetingSummaries  = null; //公告
		var appNews            = null; //新闻

		var firstLoad = false;
		var firstLoad2 = false;
		if(!accountDataCenter){ //第一次加载
			firstLoad = true;
			accountDataCenter   = new Properties();

			departments         = new ArrayList();
			departmentAccesses = new ArrayList();
			teams               = new ArrayList();
			posts               = new ArrayList();
			levels              = new ArrayList();
			members             = new ArrayList();
			memberSort          = new ArrayList();
			roles               = new ArrayList();
			businessRoles       = new ArrayList();
			outworkers          = new ArrayList();
			exchangeAccounts    = new ArrayList();
			orgTeams            = new ArrayList();
			relatePeoples       = new ArrayList();
			concurentMembers    = new ArrayList();
			admins              = new ArrayList();
			formFields          = new ArrayList();
			wFDynamicForms      = new ArrayList();
			officeFields        = new ArrayList();
			nodes               = new ArrayList();
			supernodes          = new ArrayList();
			orgrecent           = new ArrayList();
			joinAccountTags     = new ArrayList();
			memberMetadataTags  = new ArrayList();
			orgMetadataTags     = new ArrayList();
			accountMetadataTags = new ArrayList();
			postMetadataTags    = new ArrayList();
			businessDepartments = new ArrayList();
			businessAccounts    = new ArrayList();
			guests              = new ArrayList();
			//应用属性
			appDocs              = new ArrayList();
			appMeetings          = new ArrayList();
			appMeetingSummaries  = new ArrayList();
			appBulletins         = new ArrayList();
			appNews              = new ArrayList();

			accountDataCenter.put(Constants_Department, departments);
			accountDataCenter.put(Constants_DepartmentAccess, departmentAccesses);
			accountDataCenter.put(Constants_Post, posts);
			accountDataCenter.put(Constants_Level, levels);
			accountDataCenter.put(Constants_Member, members);
			accountDataCenter.put(Constants_MemberSort, memberSort);
			accountDataCenter.put(Constants_Team, teams);
			accountDataCenter.put(Constants_Role, roles);
			accountDataCenter.put(Constants_BusinessRole, businessRoles);
			accountDataCenter.put(Constants_Outworker, outworkers);
			accountDataCenter.put(Constants_ExchangeAccount, exchangeAccounts);
			accountDataCenter.put(Constants_OrgTeam, orgTeams);
			accountDataCenter.put(Constants_RelatePeople, relatePeoples);
			accountDataCenter.put(Constants_concurentMembers, concurentMembers);
			accountDataCenter.put(Constants_Admin, admins);
			accountDataCenter.put(Constants_FormField, formFields);
			accountDataCenter.put(Constants_WFDynamicForm, wFDynamicForms);
			accountDataCenter.put(Constants_OfficeField, officeFields);
			accountDataCenter.put(Constants_Node, nodes);
			accountDataCenter.put(Constants_WfSuperNode, supernodes);
			accountDataCenter.put(Constants_OrgRecent, orgrecent);
			accountDataCenter.put(Constants_JoinAccountTag, joinAccountTags);
			accountDataCenter.put(Constants_MemberMetadataTag, memberMetadataTags);
			accountDataCenter.put(Constants_OrgMetadataTag, orgMetadataTags);
			accountDataCenter.put(Constants_AccountMetadataTag, accountMetadataTags);
			accountDataCenter.put(Constants_PostMetadataTag, postMetadataTags);

			accountDataCenter.put(Constants_BusinessDepartment, businessDepartments);
			accountDataCenter.put(Constants_BusinessAccount, businessAccounts);

			accountDataCenter.put(Constants_Guest, guests);

			//应用属性
			accountDataCenter.put(Constants_AppDoc, appDocs);
			accountDataCenter.put(Constants_AppMeeting, appMeetings);
			accountDataCenter.put(Constants_AppMeetingSummary, appMeetingSummaries);
			accountDataCenter.put(Constants_AppBulletin, appBulletins);
			accountDataCenter.put(Constants_AppNews, appNews);
		}
		else{
			departments         = accountDataCenter.get(Constants_Department);
			departmentAccesses  = accountDataCenter.get(Constants_DepartmentAccess);
			teams               = accountDataCenter.get(Constants_Team);
			posts               = accountDataCenter.get(Constants_Post);
			levels              = accountDataCenter.get(Constants_Level);
			members             = accountDataCenter.get(Constants_Member);
			memberSort          = accountDataCenter.get(Constants_MemberSort);
			businessRoles       = accountDataCenter.get(Constants_BusinessRole);
			roles               = accountDataCenter.get(Constants_Role);
			outworkers          = accountDataCenter.get(Constants_Outworker);
			exchangeAccounts    = accountDataCenter.get(Constants_ExchangeAccount);
			orgTeams            = accountDataCenter.get(Constants_OrgTeam);
			relatePeoples       = accountDataCenter.get(Constants_RelatePeople);
			concurentMembers    = accountDataCenter.get(Constants_concurentMembers);
			admins              = accountDataCenter.get(Constants_Admin);
			formFields          = accountDataCenter.get(Constants_FormField);
			officeFields        = accountDataCenter.get(Constants_OfficeField);
			nodes               = accountDataCenter.get(Constants_Node);
			supernodes          = accountDataCenter.get(Constants_WfSuperNode);
			orgrecent           = accountDataCenter.get(Constants_OrgRecent);
			wFDynamicForms      = accountDataCenter.get(Constants_WFDynamicForm);
			joinAccountTags     = accountDataCenter.get(Constants_JoinAccountTag);
			memberMetadataTags  = accountDataCenter.get(Constants_MemberMetadataTag);
			orgMetadataTags     = accountDataCenter.get(Constants_OrgMetadataTag);
			accountMetadataTags = accountDataCenter.get(Constants_AccountMetadataTag);
			postMetadataTags    = accountDataCenter.get(Constants_PostMetadataTag);
			businessDepartments = accountDataCenter.get(Constants_BusinessDepartment);
			businessAccounts    = accountDataCenter.get(Constants_BusinessAccount);
			guests              = accountDataCenter.get(Constants_Guest);

			//应用属性
			appDocs              = accountDataCenter.get(Constants_AppDoc);
			appMeetings          = accountDataCenter.get(Constants_AppMeeting);
			appMeetingSummaries   = accountDataCenter.get(Constants_AppMeetingSummary);
			appBulletins         = accountDataCenter.get(Constants_AppBulletin);
			appNews              = accountDataCenter.get(Constants_AppNews);
		}

		var departmentsMap        = null; //部门
		var departmentAccessesMap        = null; //部门可见性
		var teamsMap              = null; //组
		var postsMap              = null; //岗位
		var levelsMap             = null; //职务级别
		var membersMap            = null; //人员
		var memberSortMap         = null; //人员排序
		var rolesMap              = null; //特殊角色
		var businessRolesMap      = null; //多维组织角色
		var outworkersMap         = null; //外部人员
		var exchangeAccountsMap   = null; //外部单位，用于公文交换
		var orgTeamsMap           = null; //机构组，用于公文交换
		var relatePeoplesMap      = null; //关联人员
		var concurentMembersMap   = null; //兼职人员，只存人的Id和单位Id
		var adminsMap             = null; //管理员
		var formFieldsMap         = null; //表单控件
		var officeFieldsMap       = null; //综合办公控件
		var nodesMap              = null; //动态节点
		var supernodesMap         = null; //超级节点
		var orgrecentMap          = null; //最近联系人
		var wFDynamicFormsMap     = null; //流程动态匹配控件
		var joinAccountTagsMap    = null; //外部单位标签
		var guestsMap              = null; //特殊账号
		var memberMetadataTagsMap  = null;
		var orgMetadataTagsMap  = null;
		var accountMetadataTagsMap  = null;
		var postMetadataTagsMap  = null;
		var businessDepartmentsMap = null;
		var businessAccountsMap    = null;

		var appDocsMap             = null;
		var appMeetingsMap         = null;
		var appMeetingSummariesMap  = null;
		var appBulletinsMap        = null;
		var appNewsMap             = null;

		var accountDataCenterMap = dataCenterMap[currentAccountId_orgDataCenter_temp];

		if(!accountDataCenterMap){ //第一次加载
			firstLoad2 = true;
			accountDataCenterMap   = {};

			departmentsMap         = {};
			departmentAccessesMap  = {};
			teamsMap               = {};
			postsMap               = {};
			levelsMap              = {};
			membersMap             = {};
			memberSortMap          = {};
			rolesMap               = {};
			businessRolesMap       = {};
			outworkersMap          = {};
			exchangeAccountsMap    = {};
			orgTeamsMap            = {};
			relatePeoplesMap       = {};
			concurentMembersMap    = {};
			adminsMap              = {};
			formFieldsMap          = {};
			officeFieldsMap        = {};
			nodesMap               = {};
			supernodesMap          = {};
			orgrecentMap           = {};
			wFDynamicFormsMap      = {};
			joinAccountTagsMap     = {};
			memberMetadataTagsMap  = {};
			orgMetadataTagsMap     = {};
			accountMetadataTagsMap = {};
			postMetadataTagsMap    = {};
			businessDepartmentsMap = {};
			businessAccountsMap    = {};
			guestsMap              = {};
			//应用属性
			appDocsMap             = {};
			appMeetingsMap         = {};
			appMeetingSummariesMap  = {};
			appBulletinsMap        = {};
			appNewsMap             = {};

			accountDataCenterMap[Constants_Department]        = departmentsMap;
			accountDataCenterMap[Constants_DepartmentAccess]  = departmentAccessesMap;
			accountDataCenterMap[Constants_Post]              = postsMap;
			accountDataCenterMap[Constants_Level]             = levelsMap;
			accountDataCenterMap[Constants_Member]            = membersMap;
			accountDataCenterMap[Constants_MemberSort]        = memberSortMap;
			accountDataCenterMap[Constants_Team]              = teamsMap;
			accountDataCenterMap[Constants_Role]              = rolesMap;
			accountDataCenterMap[Constants_BusinessRole]      = businessRolesMap;
			accountDataCenterMap[Constants_Outworker]         = outworkersMap;
			accountDataCenterMap[Constants_ExchangeAccount]   = exchangeAccountsMap;
			accountDataCenterMap[Constants_OrgTeam]           = orgTeamsMap;
			accountDataCenterMap[Constants_RelatePeople]      = relatePeoplesMap;
			accountDataCenterMap[Constants_concurentMembers]  = concurentMembersMap;
			accountDataCenterMap[Constants_Admin]             = adminsMap;
			accountDataCenterMap[Constants_FormField]         = formFieldsMap;
			accountDataCenterMap[Constants_OfficeField]       = officeFieldsMap;
			accountDataCenterMap[Constants_Node]              = nodesMap;
			accountDataCenterMap[Constants_WfSuperNode]       = supernodesMap;
			accountDataCenterMap[Constants_OrgRecent]         = orgrecentMap;
			accountDataCenterMap[Constants_WFDynamicForm]     = wFDynamicFormsMap;
			accountDataCenterMap[Constants_JoinAccountTag]    = joinAccountTagsMap;
			accountDataCenterMap[Constants_MemberMetadataTag] = memberMetadataTagsMap;
			accountDataCenterMap[Constants_OrgMetadataTag]    = orgMetadataTagsMap;
			accountDataCenterMap[Constants_AccountMetadataTag] = accountMetadataTagsMap;
			accountDataCenterMap[Constants_PostMetadataTag]   = postMetadataTagsMap;
			accountDataCenterMap[Constants_BusinessDepartment] = businessDepartmentsMap;
			accountDataCenterMap[Constants_BusinessAccount]    = businessAccountsMap;

			accountDataCenterMap[Constants_Guest]             = guestsMap;
			//应用属性
			accountDataCenterMap[Constants_AppDoc]             = appDocsMap;
			accountDataCenterMap[Constants_AppMeeting]         = appMeetingsMap;
			accountDataCenterMap[Constants_AppMeetingSummary]  = appMeetingSummariesMap;
			accountDataCenterMap[Constants_AppBulletin]        = appBulletinsMap;
			accountDataCenterMap[Constants_AppNews]            = appNewsMap;

		}

		var levelHashCodes = levelHashCodeMap[currentAccountId_orgDataCenter_temp];
		if(levelHashCodes == null){
			levelHashCodes = {};
			levelHashCodeMap[currentAccountId_orgDataCenter_temp] = levelHashCodes;
		}
		var departmentHashCodes = departmentHashCodeMap[currentAccountId_orgDataCenter_temp];
		if(departmentHashCodes == null){
			departmentHashCodes = {};
			departmentHashCodeMap[currentAccountId_orgDataCenter_temp] = departmentHashCodes;
		}
		var postHashCodes = postHashCodeMap[currentAccountId_orgDataCenter_temp];
		if(postHashCodes == null){
			postHashCodes = {};
			postHashCodeMap[currentAccountId_orgDataCenter_temp] = postHashCodes;
		}

		try {
			var isNeedInitDepartment = false;
			var isNeedInitMember = false;

			topWindow1.initOrgModel(accountId, memberId, extParameters, isVjoin,loadPanels);
			var result = JSON.parse(topWindow1.dataCenterCacheJSON)[accountId];


			// 单位
			var _accounts = result["Account"];
			if(_accounts){
				//allAccounts.clear();

				for(var i = 0; i < _accounts.length; i++) {
					var d = _accounts[i];
					var id = d[Constants_key_id];
					var isRoot = d['R'];

					//Account(id, parentId, path, name, hasChild, shortname, levelScope, description)
					var account = new Account(id, d["P"], null, d["N"], d["C"], d["S"], d["L"], "", d["E"], d['M'],d['MD']);

					allAccounts.put(id, account);
				}
			}

			//兼职 key 部门id, value Members
			var concurents = result["Concurent"];
			if(concurents != null){
				concurentMembers.clear();
				accountDataCenterMap[Constants_concurentMembers] = concurentMembersMap = {};
				for(var dpid in concurents) {
					var ems = concurents[dpid];
					if(ems){
						for(var i = 0; i < ems.length; i++) {
							var em = ems[i];
							var id = em[Constants_key_id];

							var member = new Member(id, em["N"], em["S"], dpid, em["P"], null, em["L"], true, em["Y"], em["M"], '');
							member.type = "E";
							member.accountId = em["A"];
							member.departmentName = em["DN"] || "";

							concurentMembers.add(member);
							concurentMembersMap[id] = member;
						}
					}
				}
				isNeedInitMember = true;
			}
			else{
				concurents = {};
			}

//      startTime = new Date().getTime();
			var _posts = result[Constants_Post];
			if(_posts){
				posts.clear();
				accountDataCenterMap[Constants_Post] = postsMap = {};
				for(var i = 0; i < _posts.length; i++) {
					var d = _posts[i];
					var id = d[Constants_key_id];
					var post = new Post(id, d["N"], d["T"], d["C"], "", currentAccountId_orgDataCenter_temp, d["E"],d["EM"]);
					posts.add(post);

					postsMap[id] = post;

					postHashCodes[d["H"]] = id;
				}
			}


			var _guests = result[Constants_Guest];
			if(_guests){
				guests.clear();
				accountDataCenterMap[Constants_Guest] = guestsMap = {};
				for(var i = 0; i < _guests.length; i++) {
					var g = _guests[i];
					var id = g[Constants_key_id];
					var guest = new Guest(id, g["N"], g["T"], g["A"], g["E"]);
					guests.add(guest);
					guestsMap[id] = guest;
				}
			}

			//V-Join
			var _joinPosts = result["JoinPost"];
			if (_joinPosts) {
				if (isVjoin) {
					posts.clear();
					accountDataCenterMap[Constants_Post] = postsMap = {};
				}
				for (var i = 0; i < _joinPosts.length; i++) {
					var d = _joinPosts[i];
					var id = d[Constants_key_id];

					var post = new Post(id, d["N"], d["T"], d["C"], "", currentAccountId_orgDataCenter_temp, d["E"]);

					posts.add(post);
					postsMap[id] = post;

					postHashCodes[d["H"]] = id;
				}
			}

//      startTime = new Date().getTime();
			var _levels = result[Constants_Level];
			if(_levels){
				levels.clear();
				accountDataCenterMap[Constants_Level] = levelsMap = {};
				for(var i = 0; i < _levels.length; i++) {
					var d = _levels[i];
					var id = d[Constants_key_id];
					var level = new Level(id, "", d["N"], true, d["S"], d["G"], d["C"], "", currentAccountId_orgDataCenter_temp,d["EM"]);
					levels.add(level);
					levelsMap[id] = level;

					levelHashCodes[d["H"]] = id;
				}
			}
//      log.debug("levels : " + (new Date().getTime() - startTime) + "ms");

			//部门角色
			var departmentRoleIds = new ArrayList();

			var _roles = result[Constants_Role];
			if(_roles){
				roles.clear();
				accountDataCenterMap[Constants_Role] = rolesMap = {};
				for(var i = 0; i < _roles.length; i++) {
					var d = _roles[i];
					var id   = d[Constants_key_id];
					var type = d["T"];
					var name = d["N"];
					var bond = d["B"];
					var realId = d["RK"];
					var externalType = d["ET"];
					//集团自定义角色
					var isGroupCustomer = 0;

					/**
					 * 1 固定角色 AccountManager AccountAdmin account_exchange account_edoccreate FormAdmin HrAdmin ProjectBuild DepManager DepAdmin department_exchange
					 * 2 相对角色 Sender SenderDepManager SenderSuperManager NodeUserDepManager NodeUserSuperManager
					 * 3 用户自定义角色
					 * 4 原来是插件角色(廢棄)，暂时保存 集团自定义角色
					 */
					if(id.indexOf("_") > -1){
						continue;
					}

					if(type == 4){
						isGroupCustomer = 1;
						type = 2;
					}

					if(type == 3){
						type = 1;
					}

					//function Role(id, name, type, bond, description, accountId,isGroupCustomer){
					var role = new Role(id, name, type, bond, "", currentAccountId_orgDataCenter_temp,isGroupCustomer,realId,externalType);
					roles.add(role);
					rolesMap[id] = role;

					if(bond == 2 && externalType == 0){
						departmentRoleIds.add(id);
					}

					//显示在角色页签下的角色，id不能用code，构造一个单独的对象。
					if(id != realId){
						var role = new Role(realId, name, type, bond, "", currentAccountId_orgDataCenter_temp,isGroupCustomer,realId,externalType);
						roles.add(role);
						rolesMap[realId] = role;
					}

				}
			}


			//部门角色
			var businessRoleIdsMap = {};

			var _businessRoles = result[Constants_BusinessRole];
			if(_businessRoles){
				businessRoles.clear();
				accountDataCenterMap[Constants_BusinessRole] = businessRolesMap = {};
				var businessDepartmentRoleIds = new ArrayList();
				for(var i = 0; i < _businessRoles.length; i++) {
					var d = _businessRoles[i];
					var id   = d[Constants_key_id];
					var code   = d["C"];
					var name = d["N"];
					var businessId = d["B"];
					var ps = d["PS"];

					var businessRole = new BusinessRole(id, name, "", "2", "", currentAccountId_orgDataCenter_temp,businessId,ps);
					businessRoles.add(businessRole);
					businessRolesMap[id] = businessRole;

					if(businessRoleIdsMap[businessId] == null){
						businessRoleIdsMap[businessId] = new ArrayList();
					}
					businessRoleIdsMap[businessId].add(id);
				}
			}

			//管理员
			var _admins = result[Constants_Admin];
			if(_admins){
				admins.clear();
				accountDataCenterMap[Constants_Admin] = adminsMap = {};
				for(var i = 0; i < _admins.length; i++){
					var a = _admins[i];

					var id = a[Constants_key_id];
					var name = a["N"];

					var admin = new Admin(id, name, a["C"], a["A"], "");
					admins.add(admin);
					adminsMap[id] = admin;
				}
			}

//      startTime = new Date().getTime();
			var _department = result[Constants_Department];
			if(_department && !isVjoin){
				Path2Depart = {};
				outworkers.clear();
				departments.clear();
				accountDataCenterMap[Constants_Department] = departmentsMap = {};
				accountDataCenterMap[Constants_Outworker] = outworkersMap = {};

				for(var i = 0; i < _department.length; i++) {
					var d = _department[i];

					var id = d[Constants_key_id];

					isNeedInitDepartment = true;
					var depPosts = new ArrayList();
					var S = d["S"];
					if(S){
						for(var l = 0; l < S.length; l++) {
							depPosts.add(postHashCodes[S[l]]);
						}
					}

					//兼职人员
					var concurentMembersOfDepart = concurents[d[Constants_key_id]];

					//Department(id, parentId, name, hasChild, path, postList, description)
					var path = d["P"];
					var depart = new Department(id, null, d["N"], false, path, depPosts, departmentRoleIds, d["I"], concurentMembersOfDepart, "", currentAccountId_orgDataCenter_temp, d["E"]);

					if(depart.isInternal){ //内部部门
						departments.add(depart);
						Path2Depart[path] = depart;
					}
					else{
						outworkers.add(depart);
						outworkersMap[id] = depart;
					}

					departmentsMap[id] = depart;
					departmentHashCodes[d["H"]] = id;
				}
			}

			var _departmentAccess = result[Constants_DepartmentAccess];
			if(_departmentAccess && !isVjoin){
				departmentAccesses.clear();
				accountDataCenterMap[Constants_DepartmentAccess] = departmentAccessesMap = {};

				for(var i = 0; i < _departmentAccess.length; i++) {
					var d = _departmentAccess[i];
					var id = d["K"];
					var type = d["T"];
					var memberIds = d["M"];
					var departmentAccess = new DepartmentAccess(id, type, memberIds);
					departmentAccesses.add(departmentAccess);
					departmentAccessesMap[id] = departmentAccess;
				}
			}

			//NoAccessPostIdsByDepartmentAccess
			var _NoAccessPostIdsByDepartmentAccess = result["NoAccessPostIdsByDepartmentAccess"];
			if(_NoAccessPostIdsByDepartmentAccess && !isVjoin){
				NoAccessPostIdsByDepartmentAccess.clear();
				for(var i = 0; i < _NoAccessPostIdsByDepartmentAccess.length; i++) {
					var ws = _NoAccessPostIdsByDepartmentAccess[i];
					NoAccessPostIdsByDepartmentAccess.add(ws);
				}
			}

			//NoAccessLevelIdsByDepartmentAccess
			var _NoAccessLevelIdsByDepartmentAccess = result["NoAccessLevelIdsByDepartmentAccess"];
			if(_NoAccessLevelIdsByDepartmentAccess && !isVjoin){
				NoAccessLevelIdsByDepartmentAccess.clear();
				for(var i = 0; i < _NoAccessLevelIdsByDepartmentAccess.length; i++) {
					var ws = _NoAccessLevelIdsByDepartmentAccess[i];
					NoAccessLevelIdsByDepartmentAccess.add(ws);
				}
			}

//      log.debug("departments : " + (new Date().getTime() - startTime) + "ms");

			//V-Join
			var _joinDepartments = result["JoinDepartment"];
			if(currentV5DepartmentsMap == null || !isVjoin){
				currentV5DepartmentsMap = departmentsMap;
			}
			if (_joinDepartments) {
				if (isVjoin) {
					departments.clear();
					outworkers.clear();

					accountDataCenterMap[Constants_Department] = departmentsMap = {};
					accountDataCenterMap[Constants_Outworker]  = outworkersMap = {};
				}

				for (var i = 0; i < _joinDepartments.length; i++) {
					var d = _joinDepartments[i];
					var id = d[Constants_key_id];
					var path = d["P"];

					var depart = new Department(id, null, d["N"], false, path, null, null, d["I"], null, "", currentAccountId_orgDataCenter_temp, d["E"]);

					departments.add(depart);
					departmentsMap[id] = depart;

					Path2Depart[path] = depart;
					departmentHashCodes[d["H"]] = id;
				}

				isNeedInitDepartment = true;
			}
//      startTime = new Date().getTime();
			var _members = result[Constants_Member];
			if(_members){
				members.clear();
				accountDataCenterMap[Constants_Member] = membersMap = {};
				var memberLength = concurentMembers.size();
				for(var c = 0; c < memberLength; c++) {
					var member = concurentMembers.get(c);
					members.add(member);
					membersMap[member.id] = member;
				}
				var _membersLength = _members.length;
				for(var i = 0; i < _membersLength; i++) {
					var d = _members[i];
					var id = d[Constants_key_id];
					var D11 = d["D"];
					var L11 = d["L"];
					var P11 = d["P"];
					// //##//Member(id, name, departmentId, postId, secondPostIds, levelId, _isInternal, email, mobile, description)
					var deptId = departmentHashCodes[D11];
					var levelId = levelHashCodes[L11];
					var postId = postHashCodes[P11];

					if(!deptId){//OA-139496 V6.1sp2 3月修复包：编外人员工作范围选部门时，选人界面没有显示部门下的副岗人员
						var mf = d["F"];
						if(mf && mf.length>0){
							var _mfLength = mf.length;
							for(var f = 0; f<_mfLength; f++){
								var secondDeptCode = mf[f][0];
								deptId = departmentHashCodes[secondDeptCode];
								if(!deptId){
									continue;
								}
								break;
							}
						}
					}

					if(!deptId){
						continue;
					}

					var secondPostIds = null;
					var SP = d["F"];
					if(SP){
						secondPostIds = new ArrayList();
						var spLength = SP.length;
						for(var s = 0; s < spLength; s++) {
							var secondPostId = [];
							var _sp = SP[s];
							secondPostId[0] = departmentHashCodes[_sp[0]];
							secondPostId[1] = postHashCodes[_sp[1]];
							secondPostIds.add(secondPostId);
						}
					}
					else{
						secondPostIds = EmptyArrayList;
					}

					var member = new Member(id, d["N"], d["S"], deptId, postId, secondPostIds, levelId, d["I"], d["Y"], d["M"], "", currentAccountId_orgDataCenter_temp, d["E"]);
					members.add(member);
					membersMap[id] = member;
				}

				isNeedInitMember = true;
			}


			var _membeSort = result[Constants_MemberSort];
			if(_membeSort && !isVjoin){
				memberSort.clear();
				accountDataCenterMap[Constants_MemberSort] = memberSortMap = {};
				var memberLength = _membeSort.length;
				for(var i = 0; i < memberLength; i++) {
					var d = _membeSort[i];
					var k = d[Constants_key_id];//排序数据的key： type_memberId_entityId
					var s = d["S"];//对应的排序号
					memberSortMap[k] = s;
				}
			}



//      log.debug("members : " + (new Date().getTime() - startTime) + "ms");

			//V-Join
			var _joinMembers = result["JoinMember"];
			if (_joinMembers) {
				if (isVjoin) {
					members.clear();
					accountDataCenterMap[Constants_Member] = membersMap = {};
				}

				for (var i = 0; i < _joinMembers.length; i++) {
					var d = _joinMembers[i];
					var id = d[Constants_key_id];
					var deptId = departmentHashCodes[d["D"]];
					var levelId = levelHashCodes[d["L"]];
					var postId = postHashCodes[d["P"]];

					if (!deptId) {
						continue;
					}

					var member = new Member(id, d["N"], d["S"], deptId, postId, null, levelId, d["I"], d["Y"], d["M"], "", currentAccountId_orgDataCenter_temp, d["E"]);

					members.add(member);
					membersMap[id] = member;
				}

				isNeedInitMember = true;
			}

			var _teams = result[Constants_Team];
			if(_teams){
				teams.clear();
				accountDataCenterMap[Constants_Team] = teamsMap = {};
				for(var i = 0; i < _teams.length; i++) {
					var d = _teams[i];
					var id = d[Constants_key_id];
					var teamLeaders = new ArrayList();
					teamLeaders.addAll(d["L"]);
					var teamMembers = new ArrayList();
					teamMembers.addAll(d["M"]);
					var teamSupervisors = new ArrayList();
					teamSupervisors.addAll(d["S"]);
					var teamRelatives = new ArrayList();
					teamRelatives.addAll(d["RM"]);

					var team = new Team(id, d["T"] || 2, d["N"], d["O"] || currentAccountId_orgDataCenter_temp, teamLeaders, teamMembers, teamSupervisors, teamRelatives, d["E"], "", d["A"] || currentAccountId_orgDataCenter_temp);
					teams.add(team);

					teamsMap[id] = team;
				}
			}

			var _exchangeAccounts = result[Constants_ExchangeAccount];
			if(_exchangeAccounts){
				exchangeAccounts.clear();
				accountDataCenterMap[Constants_ExchangeAccount] = exchangeAccountsMap = {};
				for(var i = 0; i < _exchangeAccounts.length; i++) {
					var d = _exchangeAccounts[i];
					var id = d[Constants_key_id];

					var exchangeAccount = new ExchangeAccount(id, d["N"], "");
					exchangeAccounts.add(exchangeAccount);
					exchangeAccountsMap[id] = exchangeAccount;
				}
			}

			var _orgTeams = result[Constants_OrgTeam];
			if(_orgTeams){
				orgTeams.clear();
				accountDataCenterMap[Constants_OrgTeam] = orgTeamsMap = {};
				for(var i = 0; i < _orgTeams.length; i++) {
					var d = _orgTeams[i];
					var id = d[Constants_key_id];

					var orgTeamDepartment = new ArrayList();
					orgTeamDepartment.addAll(d["M"]);
					var orgTeam = new OrgTeam(id, d["N"], "",orgTeamDepartment);
					orgTeams.add(orgTeam);
					orgTeamsMap[id] = orgTeam;
				}
			}

			var _relatePeoples = result[Constants_RelatePeople];
			if(_relatePeoples){
				relatePeoples.clear();
				accountDataCenterMap[Constants_RelatePeople] = relatePeoplesMap = {};

				var leader = new RelatePeople(1, PeopleRelate_TypeName[1]); // 领导
				var assistant = new RelatePeople(2, PeopleRelate_TypeName[2]); // 秘书
				var junior = new RelatePeople(3, PeopleRelate_TypeName[3]); // 下级
				var confrere = new RelatePeople(4, PeopleRelate_TypeName[4]); //同事

				relatePeoples.add(leader);
				relatePeoples.add(assistant);
				relatePeoples.add(junior);
				relatePeoples.add(confrere);

				relatePeoplesMap[1] = leader;
				relatePeoplesMap[2] = assistant;
				relatePeoplesMap[3] = junior;
				relatePeoplesMap[4] = confrere;

				for(var i = 0; i < _relatePeoples.length; i++) {
					var d = _relatePeoples[i];

					relatePeoplesMap[d["T"]].addMember(d);
				}
			}


			// 最近页签
			var _orgrecent = result[Constants_OrgRecent];
			if(_orgrecent) {
				orgrecent.clear();
				accountDataCenterMap[Constants_OrgRecent] = orgrecentMap = {};
				for(var i = 0; i < _orgrecent.length; i++) {
					var d = _orgrecent[i];
					var id = d[Constants_key_id];
					var orgRec = new OrgRecent(id, d["N"],d["E"]);
					orgrecent.add(orgRec);
					orgrecentMap[id] = orgRec;
				}
			}


			//表单控件
			var _formFields = result[Constants_FormField];
			if(_formFields){
				formFields.clear();
				accountDataCenterMap[Constants_FormField] = formFieldsMap = {};
				if(_formFields){
					for(var i = 0; i < _formFields.length; i++) {
						var f = _formFields[i];

						var formField = new FormField(f[Constants_key_id], f["N"], f["R"]);
						formFields.add(formField);
						formFieldsMap[f[Constants_key_id]] = formField;
					}
				}
			}

			//应用属性
			//文档中心
			var _appDocs = result[Constants_AppDoc];
			if(_appDocs){
				appDocs.clear();
				accountDataCenterMap[Constants_AppDoc] = appDocsMap = {};
				for(var i = 0; i < _appDocs.length; i++) {
					var f = _appDocs[i];

					var appProperty = new AppProperty(f[Constants_key_id], Constants_AppDoc, f["N"], f["R"]);
					appDocs.add(appProperty);
					appDocsMap[f[Constants_key_id]] = appProperty;
				}
			}

			//会议
			var _appMeetings = result[Constants_AppMeeting];
			if(_appMeetings){
				appMeetings.clear();
				accountDataCenterMap[Constants_AppMeeting] = appMeetingsMap = {};
				for(var i = 0; i < _appMeetings.length; i++) {
					var f = _appMeetings[i];

					var appProperty = new AppProperty(f[Constants_key_id], Constants_AppMeeting, f["N"], f["R"]);
					appMeetings.add(appProperty);
					appMeetingsMap[f[Constants_key_id]] = appProperty;
				}
			}

			//会议纪要
			var _appMeetingSummaries = result[Constants_AppMeetingSummary];
			if(_appMeetingSummaries){
				appMeetingSummaries.clear();
				accountDataCenterMap[Constants_AppMeetingSummary] = appMeetingSummariesMap = {};
				for(var i = 0; i < _appMeetingSummaries.length; i++) {
					var f = _appMeetingSummaries[i];

					var appProperty = new AppProperty(f[Constants_key_id], Constants_AppMeetingSummary, f["N"], f["R"]);
					appMeetingSummaries.add(appProperty);
					appMeetingSummariesMap[f[Constants_key_id]] = appProperty;
				}
			}

			//公告
			var _appBulletins = result[Constants_AppBulletin];
			if(_appBulletins){
				appBulletins.clear();
				accountDataCenterMap[Constants_AppBulletin] = appBulletinsMap = {};
				for(var i = 0; i < _appBulletins.length; i++) {
					var f = _appBulletins[i];

					var appProperty = new AppProperty(f[Constants_key_id], Constants_AppBulletin, f["N"], f["R"]);
					appBulletins.add(appProperty);
					appBulletinsMap[f[Constants_key_id]] = appProperty;
				}
			}

			//新闻
			var _appNews = result[Constants_AppNews];
			if(_appNews){
				appNews.clear();
				accountDataCenterMap[Constants_AppNews] = appNewsMap = {};
				for(var i = 0; i < _appNews.length; i++) {
					var f = _appNews[i];

					var appProperty = new AppProperty(f[Constants_key_id], Constants_AppNews, f["N"], f["R"]);
					appNews.add(appProperty);
					appNewsMap[f[Constants_key_id]] = appProperty;
				}
			}

			//流程动态匹配表单控件
			var _dynamicFormFields = result[Constants_WFDynamicForm];
			if(_dynamicFormFields){
				wFDynamicForms.clear();
				accountDataCenterMap[Constants_WFDynamicForm] = wFDynamicFormsMap = {};
				for(var i = 0; i < _dynamicFormFields.length; i++) {
					var f = _dynamicFormFields[i];

					var wFDynamicForm = new WFDynamicForm(f[Constants_key_id], f["N"],f["FID"] ,f["FN"],f["R"]);
					wFDynamicForms.add(wFDynamicForm);
					wFDynamicFormsMap[f[Constants_key_id]] = wFDynamicForm;
				}
			}

			//综合办公控件
			var _officeFields = result[Constants_OfficeField];
			if(_officeFields){
				officeFields.clear();
				accountDataCenterMap[Constants_OfficeField] = officeFieldsMap = {};
				for(var i = 0; i < _officeFields.length; i++) {
					var o = _officeFields[i];

					var officeField = new Node(o[Constants_key_id], o["N"], o["R"]);
					officeFields.add(officeField);
					officeFieldsMap[o[Constants_key_id]] = officeField;
				}
			}

			//动态节点
			var _nodes = result[Constants_Node];
			if(_nodes){
				nodes.clear();
				accountDataCenterMap[Constants_Node] = nodesMap = {};
				for(var i = 0; i < _nodes.length; i++) {
					var n = _nodes[i];

					var node = new Node(n[Constants_key_id], n["N"], n["R"]);
					nodes.add(node);
					nodesMap[n[Constants_key_id]] = node;
				}
			}

			var _supernodes = result[Constants_WfSuperNode];
			if(_supernodes){
				supernodes.clear();
				accountDataCenterMap[Constants_WfSuperNode] = supernodesMap = {};
				for(var i = 0; i < _supernodes.length; i++) {
					var n = _supernodes[i];
					var node = new Node(n[Constants_key_id], n["N"], n["R"],n["processMode"],n["nodeDesc"],n["interveneMemberId"],n["tolerantModel"], n["stepBackType"]);
					supernodes.add(node);
					supernodesMap[n[Constants_key_id]] = node;
				}
			}



			//外部单位标签控件
			var _joinAccountTags = result[Constants_JoinAccountTag];
			if (_joinAccountTags) {
				joinAccountTags.clear();
				accountDataCenterMap[Constants_JoinAccountTag] = joinAccountTagsMap = {};
				for (var i = 0; i < _joinAccountTags.length; i++) {
					var o = _joinAccountTags[i];

					var joinAccountTag = new JoinAccountTag(o[Constants_key_id], o["PK"], o["N"], false);
					joinAccountTags.add(joinAccountTag);
					joinAccountTagsMap[o[Constants_key_id]] = joinAccountTag;
				}

				for (var i = 0; i < joinAccountTags.size(); i++) {
					var tag = joinAccountTags.get(i);
					var parentTag = joinAccountTagsMap[tag.parentId];

					if (parentTag) {
						parentTag.hasChild = true;

						if (parentTag.directChildren == null) {
							parentTag.directChildren = new ArrayList();
						}

						parentTag.directChildren.add(tag);
					}
				}
			}

			/*        //人员元数据标签控件
        var _memberMetadataTags = result[Constants_MemberMetadataTag];
        if (_memberMetadataTags) {
            memberMetadataTags.clear();
            accountDataCenterMap[Constants_MemberMetadataTag] = memberMetadataTagsMap = {};
            for (var i = 0; i < _memberMetadataTags.length; i++) {
                var o = _memberMetadataTags[i];

                var memberMetadataTag = new MemberMetadataTag(o[Constants_key_id], o["PK"], o["N"], false);
                memberMetadataTags.add(memberMetadataTag);
                memberMetadataTagsMap[o[Constants_key_id]] = memberMetadataTag;
            }

            for (var i = 0; i < memberMetadataTags.size(); i++) {
                var tag = memberMetadataTags.get(i);
                var parentTag = memberMetadataTagsMap[tag.parentId];

                if (parentTag) {
                    parentTag.hasChild = true;

                    if (parentTag.directChildren == null) {
                        parentTag.directChildren = new ArrayList();
                    }

                    parentTag.directChildren.add(tag);
                }
            }
        }*/

			//所有元数据标签控件
			var _orgMetadataTags = result[Constants_OrgMetadataTag];
			if (_orgMetadataTags) {
				orgMetadataTags.clear();
				accountMetadataTags.clear();
				memberMetadataTags.clear();
				postMetadataTags.clear();

				accountDataCenterMap[Constants_OrgMetadataTag] = orgMetadataTagsMap = {};
				accountDataCenterMap[Constants_AccountMetadataTag] = accountMetadataTagsMap = {};
				accountDataCenterMap[Constants_MemberMetadataTag] = memberMetadataTagsMap = {};
				accountDataCenterMap[Constants_PostMetadataTag] = postMetadataTagsMap = {};
				for (var i = 0; i < _orgMetadataTags.length; i++) {
					var o = _orgMetadataTags[i];
					var et =  o["ET"];
					var orgMetadataTag = new MemberMetadataTag(o[Constants_key_id], o["PK"], o["N"], false, o["FN"], o["MT"]);
					if(et == Constants_Account){//单位属性
						accountMetadataTags.add(orgMetadataTag);
						accountMetadataTagsMap[o[Constants_key_id]] = orgMetadataTag;
					}else if(et == Constants_Member){//人员属性
						memberMetadataTags.add(orgMetadataTag);
						memberMetadataTagsMap[o[Constants_key_id]] = orgMetadataTag;
					}else if(et == Constants_Post || et == "PostType"){//岗位属性 和 岗位类型枚举数据
						postMetadataTags.add(orgMetadataTag);
						postMetadataTagsMap[o[Constants_key_id]] = orgMetadataTag;
					}

					if(et != "PostType"){
						if(accountId != '-1730833917365171641' && et == Constants_Account){
							continue;
						}
						orgMetadataTags.add(orgMetadataTag);
						orgMetadataTagsMap[o[Constants_key_id]] = orgMetadataTag;
					}
				}

				for (var i = 0; i < orgMetadataTags.size(); i++) {
					var tag = orgMetadataTags.get(i);
					var parentTag = orgMetadataTagsMap[tag.parentId];

					if (parentTag) {
						parentTag.hasChild = true;

						if (parentTag.directChildren == null) {
							parentTag.directChildren = new ArrayList();
						}

						parentTag.directChildren.add(tag);
					}
				}
			}


			//多维组织（单位/部门）
			var _businessDepartments = result[Constants_BusinessDepartment];
			if (_businessDepartments && !isVjoin) {
				Path2BusinessDepart = {};
				businessDepartments.clear();
				businessAccounts.clear();
				accountDataCenterMap[Constants_BusinessDepartment] = businessDepartmentsMap = {};
				accountDataCenterMap[Constants_BusinessAccount] = businessAccountsMap = {};
				for (var i = 0; i < _businessDepartments.length; i++) {
					var o = _businessDepartments[i];
					var parentId = o["PK"];

					if(parentId == "-1"){
						//BusinessAccount(id, parentId, name, showName, description)
						var businessAccount = new BusinessAccount(o[Constants_key_id], o["PK"], o["N"], o["SN"], "", o["P"]);
						businessAccount.isPublic = o["IP"];
						businessAccount.memberIds = o["BM"];
						businessAccounts.add(businessAccount);
						businessAccountsMap[o[Constants_key_id]] = businessAccount;
					}else{
						//BusinessDepartment(id, parentId, name, hasChild, path, roleList, description, accountId, include, businessId, preShow)
						var businessDepartment = new BusinessDepartment(o[Constants_key_id], o["PK"], o["N"], false, o["P"], businessRoleIdsMap[o["B"]], '', o["A"], '', o["B"], o["PS"]);
						var businessMembers = o["M"];
						if(businessMembers){
							for (var j = 0; j < businessMembers.length; j++) {
								var m = businessMembers[j];
								// Member(id, name, sortId, departmentId, postId, secondPostIds, levelId, _isInternal, email, mobile, description, accountId, externalType)
								var businessMember  = new Member(m[Constants_key_id], m["N"], m["S"], '', m["P"], '', '', '', '', '', '', m["A"], '');
								businessMember.type = "G"; //多维组织的部门成员可以是全集团人员，所以这里类型设置成G
								businessMember.departmentName = m["DN"];
								businessMember.departmentNameF = m["DFN"];
								businessMember.businessRoles = m["R"];//人员在多维组织下的角色ids
								businessMember.businessDeptId = o[Constants_key_id];// 业务部门id
								businessMember.businessDeptName = businessDepartment.name;// 业务部门名称
								businessMember.isBusinessMember = true;// 标示为业务部门
								businessDepartment.addDirectMembers(businessMember, false);
							}
						}
						businessDepartments.add(businessDepartment);
						businessDepartmentsMap[o[Constants_key_id]] = businessDepartment;
						var path = o["P"];
						Path2BusinessDepart[path] = businessDepartment;
					}
				}
				intiBusinessDepartmentParentId(businessDepartments, Path2BusinessDepart);
				Path2BusinessDepart = {};

				for (var i = 0; i < businessAccounts.size(); i++) {
					var bd = businessAccounts.get(i);
					var parentBd = businessAccountsMap[bd.parentId];

					if (parentBd) {
						parentBd.hasChild = true;

						if (parentBd.directChildren == null) {
							parentBd.directChildren = new ArrayList();
						}

						parentBd.directChildren.add(bd);
					}
				}

				for (var i = 0; i < businessDepartments.size(); i++) {
					var bd = businessDepartments.get(i);
					var parentBd = businessDepartmentsMap[bd.parentId];

					if (parentBd) {
						parentBd.hasChild = true;

						if (parentBd.directChildren == null) {
							parentBd.directChildren = new ArrayList();
						}

						parentBd.directChildren.add(bd);
					}

				}
			}


			//补充当前人员在单位业务线下的可见人员
			var _businessDepartments_Additional = result[Constants_BusinessDepartment+"_Additional"];
			if (_businessDepartments_Additional && !isVjoin) {
				for (var i = 0; i < _businessDepartments_Additional.length; i++) {
					var o = _businessDepartments_Additional[i];
					var businessId = o[Constants_key_id];
					var ba = businessAccountsMap[businessId];
					ba.accessMemberIds = o["ABM"];
					ba.showAllMember = o["SA"];//是否可见所有人
				}
			}

			//内部人员：可以访问哪些外部人员
			var _ExtMemberScopeOfInternal = result["ExtMemberScopeOfInternal"];
			if(_ExtMemberScopeOfInternal){
				ExtMemberScopeOfInternal.clear();

				for(var extDepatId in _ExtMemberScopeOfInternal) {
					var extMemberIds = new ArrayList();
					extMemberIds.addAll(_ExtMemberScopeOfInternal[extDepatId]);

					ExtMemberScopeOfInternal.put(extDepatId, extMemberIds);
				}
			}


			//内部人员：可以访问哪些vjoin人员
			var _VjoinMemberScopeOfInternal = result["VjoinMemberScopeOfInternal"];
			if(_VjoinMemberScopeOfInternal){
				VjoinMemberScopeOfInternal.clear();

				for(var vjoinAccountId in _VjoinMemberScopeOfInternal) {
					var vjoinMemberIds = new ArrayList();
					vjoinMemberIds.addAll(_VjoinMemberScopeOfInternal[vjoinAccountId]);

					VjoinMemberScopeOfInternal.put(vjoinAccountId, vjoinMemberIds);
				}
			}


			//外部人员：可以访问哪些内部人员
			var _ExternalMemberWorkScope = result["ExternalMemberWorkScope"];
			if(_ExternalMemberWorkScope && !isVjoin){
				ExternalMemberWorkScope.clear();

				for(var i = 0; i < _ExternalMemberWorkScope.length; i++) {
					var ws = _ExternalMemberWorkScope[i];
					if(ws.indexOf("D") == 0){
						var dId = ws.substring(1);
						var d1 = currentV5DepartmentsMap[dId];
						if(d1){
							ExternalMemberWorkScope.add("D" + d1.path);
						}
					}
					else if(ws.indexOf("M") == 0){
						ExternalMemberWorkScope.add(ws);
					}
					else if(ws.indexOf("A") == 0){
						ExternalMemberWorkScope.clear();
						ExternalMemberWorkScope.add("0");
						break;
					}
				}
			}

			//vjion人员：可以访问哪些内部人员
			var _VjoinMemberWorkScope = result["VjoinMemberWorkScope"];
			if(_VjoinMemberWorkScope){
				VjoinMemberWorkScope.clear();

				for(var i = 0; i < _VjoinMemberWorkScope.length; i++) {
					var ws = _VjoinMemberWorkScope[i];
					if(ws.indexOf("D") == 0){
						var dId = ws.substring(1);
						var d1 = currentV5DepartmentsMap[dId];
						if(d1){
							VjoinMemberWorkScope.add("D" + d1.path);
						}
					}
					else if(ws.indexOf("M") == 0){
						VjoinMemberWorkScope.add(ws);
					}else if(ws.indexOf("A") == 0){
						VjoinMemberWorkScope.clear();
						VjoinMemberWorkScope.add("0");
						break;
					}
				}
			}




			var _InnerMemberAccessVjoinMember = result["InnerMemberAccessVjoinMember"];
			if(_InnerMemberAccessVjoinMember){
				InnerMemberAccessVjoinMember.clear();

				for(var i = 0; i < _InnerMemberAccessVjoinMember.length; i++) {
					var ws = _InnerMemberAccessVjoinMember[i];
					InnerMemberAccessVjoinMember.add(ws);
				}
			}

			//可以访问的内部部门
			var _AccessInnerDepts = result["AccessInnerDepts"];
			if(_AccessInnerDepts){
				AccessInnerDepts.clear();
				for(var i = 0; i < _AccessInnerDepts.length; i++) {
					var ws = _AccessInnerDepts[i];
					AccessInnerDepts.add(ws);
				}
			}

			//可以访问的vjoin部门
			var _AccessVjoinDepts = result["AccessVjoinDepts"];
			if(_AccessVjoinDepts){
				AccessVjoinDepts.clear();
				for(var i = 0; i < _AccessVjoinDepts.length; i++) {
					var ws = _AccessVjoinDepts[i];
					AccessVjoinDepts.add(ws);
				}
			}



			//vjMemberAccessVjAccount
			var _VjMemberAccessVjAccounts = result["VjMemberAccessVjAccounts"];
			if(_VjMemberAccessVjAccounts){
				VjMemberAccessVjAccounts.clear();
				for(var i = 0; i < _VjMemberAccessVjAccounts.length; i++) {
					var ws = _VjMemberAccessVjAccounts[i];
					VjMemberAccessVjAccounts.add(ws);
				}
			}

			if(isNeedInitDepartment){
				intiDepartmentParentId(departments, Path2Depart,currentAccountId_orgDataCenter_temp);
				//将外部部门添加到内部部门
				departments.addList(outworkers);
			}

			for(var i = 0; i < outworkers.size(); i++) {
				var d = outworkers.get(i);
				var parentPath = getDepartmentParentPath(d.path);
				var parentDep = Path2Depart[parentPath];

				if(parentDep != null){
					d.parentId = parentDep.id;
					d.parentDepartment = parentDep;
				}
				else{
					d.parentId = currentAccountId_orgDataCenter_temp;
				}
			}

			if(isNeedInitMember && levelsMap && departmentsMap){
				QuickSortArrayList(members, "sortId");

				var lawlevel = levels.getLast();
				var memberLength =  members.size();

				for(var i = 0; i < memberLength; i++){
					var member = members.instance[i];
					if(member == null){
						continue;
					}

					var levelId = member.levelId ? member.levelId : lawlevel != null ? lawlevel.id : null;
					if(levelId){
						member.level = levelsMap[levelId];
					}

					var d = departmentsMap[member.departmentId];
					if(d){
						d.addDirectMembers(member, false);
					}
					else{
						//alert(member.name + "的主岗部门[" + member.departmentId + "]不存在")
					}

					if(member.externalType != "0" || (member.isInternal && member.postId != null)){
						var p = postsMap[member.postId];
						if(p){
							p.addMember(member, true);
							member.post = p;
						}
						else{
							//alert(member.name + "的主岗[" + member.postId + "]不存在")
						}
					}

					var sp = member.secondPostIds; //副岗信息
					if(sp && !sp.isEmpty()){
						var spSize = sp.size();
						for(var k = 0; k < spSize; k++) {
							var spTmp = sp.get(k);
							var dId = spTmp[0]; //副岗所在部门
							var d1 = departmentsMap[dId];
							var pId = spTmp[1]; //副岗岗位
							var p1 = postsMap[pId];
							if(d1){
								var newMember = member.clone();
								newMember.postId = pId;
								newMember.post = p1;
								newMember.departmentId = dId;
								newMember.department = d1;
								newMember.type = "F";
								d1.addDirectMembers(newMember, false);

								if(p1 && member.isInternal){
									p1.addMember(newMember, false);
								}
							}
						}
					}
				}
			}


			//自定义的选人页签控件
			Constants_Custom_Panels = new Properties();
			var customFiledsVars = {};
			var customFiledsMapVars = {};
			var customPanels = result["customPanels"];
			if(customPanels!=null && customPanels.length>0 && customPanels[0]!=""){
				var customPanelsArr = customPanels[0].split(",");
				for(var i = 0; i < customPanelsArr.length; i++) {
					var customPanelItem = customPanelsArr[i];
					var customPanelItemArr = customPanelItem.split("|");
					var customPanelType = customPanelItemArr[0];
					var customPanelName = customPanelItemArr[1];
					var isShowArea2 = customPanelItemArr[2];
					var area1ShowType = customPanelItemArr[3];
					var area2SelectMode  = customPanelItemArr[4];
					var sp  = customPanelItemArr[5];

					Constants_Custom_Panels.put(customPanelType, new CustomPanel(customPanelType,customPanelName,isShowArea2,area1ShowType,area2SelectMode,sp));
					customFiledsVars[customPanelType+"Fields"] = null;
					if(firstLoad){ //第一次加载
						customFiledsVars[customPanelType+"Fields"] = new ArrayList();
						accountDataCenter.put(customPanelType, customFiledsVars[customPanelType+"Fields"]);
					}else{
						customFiledsVars[customPanelType+"Fields"] = accountDataCenter.get(customPanelType);
					}

					if(firstLoad2){ //第一次加载
						customFiledsMapVars[customPanelType+"FieldsMap"] = {};
						accountDataCenterMap[customPanelType] = customFiledsMapVars[customPanelType+"FieldsMap"];
					}
				}
			}



			for(var i = 0; i < Constants_Custom_Panels.keys().size(); i++){
				var customPanelType = Constants_Custom_Panels.keys().get(i);
				var _customFields = result[customPanelType];
				if(_customFields){
					if(typeof customFiledsVars[customPanelType+"Fields"] == "undefined"){
						customFiledsVars[customPanelType+"Fields"] = new ArrayList();
					}
					customFiledsVars[customPanelType+"Fields"].clear();
					accountDataCenterMap[customPanelType] = customFiledsMapVars[customPanelType+"FieldsMap"]= {};
					for(var i = 0; i < _customFields.length; i++) {
						var o = _customFields[i];

						var customField = new Custom(o["K"], o["N"], o["R"]);
						customFiledsVars[customPanelType+"Fields"].add(customField);
						customFiledsMapVars[customPanelType+"FieldsMap"][o["K"]] = customField;
					}
				}

			}


		}
		catch (ex1) {
			//alert("loadOrgModel() Exception : " + ex1.message);
			throw ex1
		}

		//释放内存
		//Path2Depart = {};
		Post2MembersExist = {};
		Department2directMembersExist = {};
		BusinessDepartment2directMembersExist = {};


		dataCenter.put(currentAccountId_orgDataCenter_temp, accountDataCenter);
		dataCenterMap[currentAccountId_orgDataCenter_temp] = accountDataCenterMap;

		hasLoadOrgModel.put(currentAccountId_orgDataCenter_temp, true);


		var _isV5Account = result["isV5Account"];
		if(_isV5Account && _isV5Account == "1"){//加载的是内部单位的数据，才设置为当前单位。
			currentAccountId_orgDataCenter = currentAccountId_orgDataCenter_temp;
		}

	}

}
/**
 * 根据path对部门的parent进行重新调整
 */
function intiDepartmentParentId(departments, Path2Depart,currentAccountId_orgDataCenter_temp){
	for(var i = 0; i < departments.size(); i++){
		var depart = departments.get(i);
		var parentPath = getDepartmentParentPath(depart.path);
		var parentDepart = Path2Depart[parentPath];

		if(parentDepart){
			depart.parentId = parentDepart.id;

			parentDepart.hasChild = true;
			if(parentDepart.directChildren == null){
				parentDepart.directChildren = new ArrayList();
			}

			parentDepart.directChildren.add(depart);
		}
		else{
			depart.parentId = currentAccountId_orgDataCenter_temp;
		}
	}
}

function intiBusinessDepartmentParentId(departments, Path2Depart){
	for(var i = 0; i < departments.size(); i++){
		var depart = departments.get(i);
		var parentPath = getDepartmentParentPath(depart.path);
		var parentDepart = Path2Depart[parentPath];

		if(parentDepart){
			depart.parentId = parentDepart.id;

			parentDepart.hasChild = true;
			if(parentDepart.directChildren == null){
				parentDepart.directChildren = new ArrayList();
			}

			parentDepart.directChildren.add(depart);
		}
		else{

			depart.parentId = depart.businessId;
		}
	}
}

function getDepartmentParentPath(path){
	return path.substring(0, path.length - 4);
}



/**
 * 直接子节点
 * ???? E (id, parentId)
 * @param list ArrayList<E> ?????? ????????????????parentId????
 * @param parentId ??Id
 * @return ArrayList<E> ????????????????
 */
function findChildInList(list, parentId) {
	var temp = new ArrayList();
	if(list == null){
		return temp;
	}

	for(var i = 0; i < list.size(); i++){
		if(list.get(i).parentId == parentId){
			temp.add(list.get(i));
		}
	}

	return temp;
}

function findChildInListFilterByDepartmentAccess(list, parentId){
	var temp = new ArrayList();
	if(list == null){
		return temp;
	}

	var temp2 = new ArrayList();//断层的部门，单独存起来，放到部门的最后面
	for(var i = 0; i < list.size(); i++){
		if(!temp.contains(list.get(i)) && !temp2.contains(list.get(i))){
			if(list.get(i).parentId == parentId){
				//进行部门可见性校验
				var d = getObject(Constants_DepartmentAccess, list.get(i).id, currentAccountId_orgDataCenter);
				if(!d){
				}else{
					if(list.get(i).isInternal == true){
						temp.add(list.get(i));
					}
				}
			}else if(currentAccountId_orgDataCenter == parentId){//如果取的是单位下的一级子部门
				//如果父部门不在可见范围内，也放到一级部门下
				var d1 = getObject(Constants_DepartmentAccess, list.get(i).id, currentAccountId_orgDataCenter);
				var d2 = getObject(Constants_DepartmentAccess, list.get(i).parentId, currentAccountId_orgDataCenter);
				if(d1 && !d2){
					if(list.get(i).isInternal == true){
						temp2.add(list.get(i));
					}
				}
			}
		}
	}

	temp.addList(temp2);
	return temp;
}

/**
 * 所有子节点，包括孙子等
 */
function findAllChildInList(list, parentId) {
	var temp = new ArrayList();
	if(list == null){
		return temp;
	}

	for(var i = 0; i < list.size(); i++){
		var obj = list.get(i);
		if(obj.parentId == parentId){
			temp.add(obj);

			var cList = findAllChildInList(list, obj.id);
			temp.addList(cList);
		}
	}

	return temp;
}

/**
 * ????ID????????????????????????????????????
 * ???? E (id)
 * @param list ArrayList<E> ?????? ????????????????parentId????
 * @param id
 * @return E ????
 */
function findObjectById(list, id){
	if(!list){
		return null;
	}

	for(var i = 0; i < list.size(); i++){
		if(list.get(i).id == id){
			return list.get(i);
		}
	}

	return null;
}
/**
 * ���չؼ����������
 * @param list ArrayList<E>
 * @param keyword Stirng
 * @return tempList ArrayList<E>
 */
function findObjectsLikeName(list, keyword){
	var tempList = new ArrayList();

	if(!list){
		return tempList;
	}
	for(var i = 0; i < list.size(); i++){
		if(list.get(i).name.indexOf(keyword) != -1){
			tempList.add(list.get(i));
		}
	}

	return tempList;
}

/**
 * find parent Object
 * E (id)
 * @param list ArrayList<E> There is the attribute 'parentId' and 'id';
 * @param id current object's id
 * @return E
 */
function findParent(list, id){
	if(!list){
		return null;
	}

	var currentObject = findObjectById(list, id);

	if(currentObject == null){
		return null;
	}

	return findObjectById(list, currentObject.parentId);
}
/**
 * find Mult-Level parent Objects
 * @param list ArrayList<E> There is the attribute 'parentId' and 'id';
 * @param id current object's id
 * @param tempNodes ArrayList empty
 * @return ArrayList the first item is the top parent object
 */
function findMultiParent(list, id, tempNodes){
	if(!list){
		return null;
	}

	var parentObject = findParent(list, id);

	if(tempNodes == null){
		tempNodes = new ArrayList();
	}

	if(parentObject != null){//���ڸ��ڵ�
		tempNodes.add(parentObject);

		findMultiParent(list, parentObject.id, tempNodes);
	}

	var returnNodes = new ArrayList();

	for(var i = tempNodes.size() - 1; i > -1; i--){
		returnNodes.add(tempNodes.get(i));
	}

	return returnNodes;
}

/**
 * 从list中查找符合对象某个属性值的对象，只取一个
 */
function findByProperty(list, propertyName, propertyValue){
	if(!list){
		return null;
	}

	for(var i = 0; i < list.size(); i++){
		if(list.get(i)[propertyName] == propertyValue){
			return list.get(i);
		}
	}

	return null;
}

function addPersonalTeam(myAccountId, teamId, teamName, members){
	var teamMemberIds = new ArrayList();
	var e = []; //外部人员信息
	for(var i = 0; i < members.length; i++) {
		var member = members[i];

		var memberId = member.id;
		var memberName = member.name;
		var accountId = member.accountId;

		if(accountId != myAccountId){ //外单位的
			var m = getObject(Constants_Member, memberId, accountId);
			var departmentName = null;
			if(m){
				departmentName = getObject(Constants_Department, m.departmentId, accountId).name;
			}

			e[e.length] = {
				"K" : memberId,
				"N"  : member.name,
				"DN" : departmentName,
				"A"  : accountId
			};
		}

		teamMemberIds.add("Member|"+memberId+"|"+memberName);
	}

	var team = new Team(teamId, 1, teamName, -1, new ArrayList(), teamMemberIds, new ArrayList(), new ArrayList(), e, "",myAccountId);

	getDataCenter(Constants_Team, myAccountId).add(team);
	dataCenterMap[myAccountId][Constants_Team][teamId] = team;
}


/**
 * 对ArrayList快速排序
 *
 * @param list 要排序的ArrayList
 * @param comparatorProperies 对数据中元素的某个属性值作为排序依据
 */
function QuickSortArrayList(list, comparatorProperies) {
	QuickSortArray(list.toArray(), comparatorProperies);
}

/**
 * 对数组快速排序
 *
 * @param arr 要排序的数组
 * @param comparatorProperies 对数据中元素的某个属性值作为排序依据
 */
function QuickSortArray(arr, comparatorProperies) {
	if(comparatorProperies){
		arr.sort(function(o1, o2){
			if(o1[comparatorProperies] < o2[comparatorProperies]){
				return -1;
			}
			if(o1[comparatorProperies] === o2[comparatorProperies]){
				if("id" in o1){
					var o1Id = o1["id"];
					var o2Id = o2["id"];
					return o1Id > o2Id ? -1 : (o1Id === o2Id ? 0 : 1);
				}
				return 0;
			}
			return 1;
			//return o1[comparatorProperies] < o2[comparatorProperies] ? -1 : (o1[comparatorProperies] == o2[comparatorProperies] ? 0 : 1);
		});
	}
	else{
		arr.sort();
	}
}

/**
 * 独立工具集合
 */
var PanelUtils = {
	/**
	 * 获取id或者默认值
	 * @param id    id
	 * @param defaultId 默认值
	 * @returns {*}
	 */
	getId: function(id, defaultId) {
		if(typeof id === "undefined" || id === null || id === -1 || id === "-1"){
			return defaultId;
		}
		return id;
	},
	/**
	 * 判断是否为空或者未定义
	 * @param obj
	 * @returns {boolean}
	 */
	isNullOrUndefined: function(obj) {
		return (typeof obj === "undefined" || obj === null);
	},
	/**
	 * memberWithDeptInfo为true是需要回填人员部门+岗位信息
	 * @param _element  元素
	 * @param id    人员Ud
	 * @param businessDeptId 业务部门Ud
	 * @param departmentId 部门id
	 * @param postId    岗位id
	 * @param isBusinessMember 是否为业务部门
	 * @param accontId 单位id
	 */
	fillDeptInfo: function(_element, id, businessDeptId, departmentId, postId, isBusinessMember, accontId) {
		if(!memberWithDeptInfo){
			return;
		}
		if(typeof dataCenterMap[accontId] === "undefined"){
			var _status = topWindow.initOrgModel(accontId, currentMemberId, extParameters);
			if(typeof dataCenterMap[accontId] === "undefined"){
				return;
			}
		}
		// 需要返回人员的部门信息，需要绕一下
		var member;
		if((currentMember && currentMember.isInternal) || isVjoinMember){
			member = topWindow.getObject(Constants_Member, id, accontId);
			if(PanelUtils.isNullOrUndefined(member)){
				//优先，如果优先没有再兼容
				member = topWindow.getObject(Constants_Member, id, currentAccountId);
			}
		}else{
			member = topWindow.getObject(Constants_Member, id, currentAccountId);
			if(PanelUtils.isNullOrUndefined(member)){
				//优先，如果优先没有再兼容
				member = topWindow.getObject(Constants_Member, id, accontId);
			}
		}
		var memberName = member.name;
		var depTypeName = "";
		var departmentName = "";
		if(isBusinessMember){
			depTypeName = Constants_Component.get(Constants_BusinessDepartment);
			var businessDepartment = topWindow.getObject(Constants_BusinessDepartment, businessDeptId);
			if(!!!businessDepartment){
				topWindow.initOrgModel(currentAccountId, currentMemberId, extParameters, isVjoinMember, Constants_BusinessDepartment);
				businessDepartment = topWindow.getObject(Constants_BusinessDepartment, businessDeptId);
			}
			departmentName = businessDepartment.name;
			_element.businessDeptId = businessDeptId;
			_element.departmentId = businessDeptId;
			_element.isBusinessMember = true;
		} else {
			var _departmentId = PanelUtils.getId(departmentId, member.departmentId);
			var department = topWindow.getObject(Constants_Department, _departmentId);
			departmentName = department.name;
			_element.departmentId = _departmentId;
			_element.isBusinessMember = false;


			depTypeName = Constants_Component.get(Constants_Department);
			if(!member.isInternal){
				if(member.externalType != "0"){
					depTypeName = Constants_Component.get(Constants_JoinOrganization);
				} else {
					depTypeName = $.i18n("selectPeople.externalOrg.js");
				}
			}
		}

		var description = memberName.escapeHTML(true) + "\r\n" + depTypeName + ": " + departmentName.escapeHTML(true);
		_element.description = description;
		if(isBusinessMember){// OA-230373:多维组织人员不返回岗位
			_element.postId = -1;
		}else{
			_element.postId = PanelUtils.getId(postId, member.postId);
		}
		_element.memberId = id;
		_element.memberName = memberName;
		_element.departmentName = departmentName;
		_element.postName = "";
		if(_element.postId !== -1){
			var postEntity = topWindow.getObject(Constants_Post, _element.postId);
			if(postEntity){
				_element.postName = postEntity.name;
			}
		}
	}
};
