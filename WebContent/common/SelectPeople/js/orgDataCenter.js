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

			if(memberId.indexOf("_")>=0){
				var index0 = memberId.indexOf("_");
				var eAccountId = memberId.substr(0,index0);
				if(eAccountId != currentAccountId_orgDataCenter || (cm != null && !cm.isInternal && cm.externalType=='0') ){
					var eMember = new Member(memberId.substr(index0+1), memberName, 999999, null, null, null, null, true, '', '', '');

					eMember.type = "E";
					eMember.accountId = currentAccountId_orgDataCenter;
					addExMember(eMember);
				}
			}

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
    		if(id.indexOf("#")>=0){ //开启了参数 returnMemberWithDept，格式为：  部门Id#人员Id#岗位
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
function initOrgModel(accountId, memberId, extParameters, isVjoin,loadPanels){
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

//    var loadAll = true;
////    var loadPanel = new ArrayList();
//    if(loadPanels && loadPanels != ""){
////    	loadAll = false;
////    	var lp = loadPanels.split(",");
////    	for(var i = 0; i < lp.length; i++) {
////    		loadPanel.add(lp[i]);
////    		//loadPanel.add(lp[i] + "_" + orgLocalTimestamp.get(currentAccountId_orgDataCenter_temp + "_" + lp[i], ""));
////    	}
//    }

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
    var firstTime = !accountDataCenter;
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

//      var startTime = new Date().getTime();

        var spm = new selectPeopleManager();

        extParameters = extParameters || "";

        var result = null;
        var externalOptions = {
            dataType: 'text'
        }
        if(loadPanels){
        	result = spm.getOrgModel(orgLocalTimestamp.get(currentAccountId_orgDataCenter_temp + "_" + loadPanels, ""), currentAccountId_orgDataCenter_temp, currentMemberId_orgDataCenter, extParameters, loadPanels, externalOptions);
        	if(result == null || result == ""){
        		//alert($.i18n('org.orgDataCenter.js.layout'));
        		return false;
            }
            if(jQuery.browser.msie){
                result=$.parseJSON(result);
            }else{
                result=JSON.parse(result);
            }
			
            result=$.parseJSON(result);

        	orgLocalTimestamp.put(currentAccountId_orgDataCenter_temp + "_" + loadPanels, result["timestamp"]); //将本地时间戳更新为新的时间戳 格式为Member=234123;Department=3245243
        }else{
        	result = spm.getOrgModel(orgLocalTimestamp.get(currentAccountId_orgDataCenter_temp, ""), currentAccountId_orgDataCenter_temp, currentMemberId_orgDataCenter, extParameters, externalOptions);
        	if(result == null || result == ""){
        		//alert($.i18n('org.orgDataCenter.js.layout'));
        		return false;
            }
            if(jQuery.browser.msie){
                result=$.parseJSON(result);
            }else{
                result=JSON.parse(result);
            }
            result=$.parseJSON(result);

        	orgLocalTimestamp.put(currentAccountId_orgDataCenter_temp, result["timestamp"]); //将本地时间戳更新为新的时间戳 格式为Member=234123;Department=3245243
        }
		

		//merge最新数据，有新数据则覆盖
        window.dataCenterObject = window.dataCenterObject || {};
		window.dataCenterObject[currentAccountId_orgDataCenter_temp] = window.dataCenterObject[currentAccountId_orgDataCenter_temp] || {};
        $.each(result, function(key,value){
            window.dataCenterObject[currentAccountId_orgDataCenter_temp][key] = result[key];
        })
        //对应的Json，可以通过值引用获取
        window.dataCenterCacheJSON = JSON.stringify(window.dataCenterObject);

        //第一次加载
        if(firstTime){
            result = window.dataCenterObject[currentAccountId_orgDataCenter_temp]
        }
        // 单位
        var _accounts = result["Account"];
        if(_accounts){
            allAccounts.clear();

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
            for(var c = 0; c < concurentMembers.size(); c++) {
                var member = concurentMembers.get(c);
                members.add(member);
                membersMap[member.id] = member;
            }

            for(var i = 0; i < _members.length; i++) {
                var d = _members[i];
                var id = d[Constants_key_id];
                //Member(id, name, departmentId, postId, secondPostIds, levelId, _isInternal, email, mobile, description)
                var deptId = departmentHashCodes[d["D"]];
                var levelId = levelHashCodes[d["L"]];
                var postId = postHashCodes[d["P"]];

                if(!deptId){//OA-139496 V6.1sp2 3月修复包：编外人员工作范围选部门时，选人界面没有显示部门下的副岗人员
                	var mf = d["F"];
                	if(mf && mf.length>0){
                		for(var f = 0; f<mf.length; f++){
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
                    for(var s = 0; s < SP.length; s++) {
                        var secondPostId = new Array();
                        secondPostId[0] = departmentHashCodes[SP[s][0]];
                        secondPostId[1] = postHashCodes[SP[s][1]];
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
            for(var i = 0; i < _membeSort.length; i++) {
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

            for(var i = 0; i < members.size(); i++){
                var member = members.get(i);
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
                    for(var k = 0; k < sp.size(); k++) {
                        var dId = sp.get(k)[0]; //副岗所在部门
                        var d1 = departmentsMap[dId];
                        var pId = sp.get(k)[1]; //副岗岗位
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
            return o1[comparatorProperies] < o2[comparatorProperies] ? -1 : (o1[comparatorProperies] == o2[comparatorProperies] ? 0 : 1);
        });
    }
    else{
        arr.sort();
    }
}



/********************** Data Center *************************
 * Load based data
 *
 * 加载组织模型数据
 *
 * @param accountId 需要加载单位
 * loadPanels:如果loadPanels设置了值，本次加载只针对loadPanels里页签对应的数据
 */
function initOrgModelAsync(accountId, memberId, extParameters, isVjoin,loadPanels){
	var currentAccountId_orgDataCenter_temp = currentAccountId_orgDataCenter;//临时存放当前切换的单位id，这个值只能是内部单位的id，加载V-Join数据时，这个值不变。
    if(accountId && memberId){
    	currentAccountId_orgDataCenter_temp = accountId;
        currentMemberId_orgDataCenter  = memberId;
    }

    this.invoke = function(){

    };

    try {
        var spm = new selectPeopleManager();
        var callback = initOrgModelAsyncCallback(currentAccountId_orgDataCenter_temp, loadPanels);
        extParameters = extParameters || "";
        var options = {
            success: function(result){
                if (!$.isPlainObject(result) && result === "__LOGOUT") {//退出，掉线兼容
                    return
                }
                callback(result);
            },
            dataType: 'text'
        };
        if(loadPanels){
        	spm.getOrgModel(orgLocalTimestamp.get(currentAccountId_orgDataCenter_temp + "_" + loadPanels, ""), currentAccountId_orgDataCenter_temp, currentMemberId_orgDataCenter, extParameters, loadPanels, options);
        	 //将本地时间戳更新为新的时间戳 格式为Member=234123;Department=3245243
        }else{
        	spm.getOrgModel(orgLocalTimestamp.get(currentAccountId_orgDataCenter_temp, ""), currentAccountId_orgDataCenter_temp, currentMemberId_orgDataCenter, extParameters, options);
        	// orgLocalTimestamp.put(currentAccountId_orgDataCenter_temp, result["timestamp"]); //将本地时间戳更新为新的时间戳 格式为Member=234123;Department=3245243
        }
    }
    catch (ex1) {
        //alert("loadOrgModel() Exception : " + ex1.message);
      throw ex1
    }
}

function ParseWorker(){
    var _callbackHandler = new CallbackHandler();
    var worker = _initWorker();
    function _initWorker(){
        if(typeof window['Worker'] === 'function'){
            worker = new Worker(_ctxPath + '/common/SelectPeople/js/parseWorker.js');
    
            worker.onmessage = function(event){
                var params = event.data;
                _callbackHandler.execute(params.name, params.data)
            }

            worker.addEventListener("error", function(evt){  
                alert("Line #" + evt.lineno + " - " + evt.message + " in " + evt.filename);  
                }, false); 
            return worker;
        }
        else{
            return null;
        }
    }

    this.parseJSON = function(data, callback){
        var name = getUUID();

        _callbackHandler.add(name, callback);
        worker.postMessage({
            name:name,
            data: data
        })
    }

    return {
        enable: worker != null,
        parseJSON: this.parseJSON
    }
}

var CallbackHandler = function() {
    var callbacks = {};
    
    this.add = function(name, callback){
        if(typeof callback === 'function'){
            callbacks[name] = callback;
        }
    }

    this.execute = function(name, args){
        if(typeof callbacks[name] === 'function'){
            callbacks[name](args);
        }
    }

    this.remove = function(name){
        if(callbacks[name]){
            delete callbacks[name];
        }
    }
};

var parseWorker = new ParseWorker();

function initOrgModelAsyncCallback (currentAccountId_orgDataCenter_temp, loadPanels){
    return function(result){
        if(result == null || result == ""){
            return false;
        }

        if(jQuery.browser.msie){
            result=$.parseJSON(result);
        }else{
            result=JSON.parse(result);
        }

        window.result = result;
        if(parseWorker.enable){
            parseWorker.parseJSON(result, function(data){
                updateLocalOrgModel(data, currentAccountId_orgDataCenter_temp,loadPanels);
            })
        }else{
            result = $.parseJSON(result);
            updateLocalOrgModel(result, currentAccountId_orgDataCenter_temp,loadPanels)
        }
    }
}

function updateLocalOrgModel(result, currentAccountId_orgDataCenter_temp,loadPanels){
    if(loadPanels){
        orgLocalTimestamp.put(currentAccountId_orgDataCenter_temp + "_" + loadPanels, result["timestamp"]);
    }
    else{
        orgLocalTimestamp.put(currentAccountId_orgDataCenter_temp, result["timestamp"]);
    }
    
    //merge最新数据，有新数据则覆盖
    window.dataCenterObject = window.dataCenterObject || {};
    window.dataCenterObject[currentAccountId_orgDataCenter_temp] = window.dataCenterObject[currentAccountId_orgDataCenter_temp] || {};
    $.each(result, function(key,value){
        window.dataCenterObject[currentAccountId_orgDataCenter_temp][key] = result[key];
    })
    //对应的Json，可以通过值引用获取
    window.dataCenterCacheJSON = JSON.stringify(window.dataCenterObject);

}