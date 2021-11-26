// 节点按钮分类
var DEAL_BTN_CATEGORY_BASE = "baseAction";
var DEAL_BTN_CATEGORY_COMMON = "commonAction";
var DEAL_BTN_CATEGORY_ADVANCE = "advanceAction";


$(function () {

    if (window.superNodeDealPage === true) {
        // 超级节点是写死的
    } else {-
        // 处理初始化按钮
        _initPageBtns();
    }

    /* pcDesFactory.initCommonBtnArea("toolb",pcDesFactory.getCommonBtns("scriptures"));
        if (startCfg) {
            pcDesFactory.initSeniorBtnMenuArea("moreLabel",pcDesFactory.getSeniorBtns("scriptures"));
            pcDesFactory.initBaseOperationArea("scriptures",pcDesFactory.getBaseOperations("scriptures"));
        }*/

    // var commonActs = advanceActs = {};
    $(".nodePerm").each(function (i) {

        var t = $(this);
        var btnCode = t.attr("baseAction") || t.attr("commonAction") || t.attr("advanceAction");

        if (btnCode && PermissionDataHandler.hasOperation(btnCode)) {
            t.show()
        }

    });


    //跟踪设置结束
    //附件
    // $('#uploadAttachmentID').click(function(){
    //     insertAttachmentPoi(commentId);
    // });
    if (typeof (fileUploadMaxSize) == "undefined") {
        fileUploadMaxSize = null;
    }
    new CtpUiUploadFullScreenDrag(document.getElementById("uploadAttachmentDealID"), {
        isDrag: false,
        isShowMaxSize: false,
        width: '120px',
        poi: commentId,
        maxSize: fileUploadMaxSize,
        uploadFullScreenDragStyle: 'text-align: left;margin-left: 11px;height:30px;line-height:30px;',
        UFSDiconStyle: 'font-size: 18px;margin: 0 6px 0 0;color:#1F85EC;'
    });

    //关联文档 --公文已派发不在派发
    if ($("#moduleType").val() == "1") {
        $('#uploadRelDocDealID').click(function () {
            quoteDocument(commentId);
        });
    }

    //常用语
    $("#cphrase").click(function () {
        showphrase($(this).attr("curUser"));
    });

    //意见隐藏 绑定点击事件，选中该checkbox弹出选人对话框
    $('#showToIdSpan').hide();
    $('#isHidden').click(function () {
        var showToIdSpan = $('#showToIdSpan');
        if ($(this).attr('checked')) {
            //显示选人界面
            showToIdSpan.show();
            showToIdSpan.removeClass("common_txtbox_dis");
            showToIdSpan.enable();
        } else {
            //隐藏选人界面
            showToIdSpan.hide();
            showToIdSpan.addClass("common_txtbox_dis");
            showToIdSpan.disable();
        }
    });

    //意见隐藏结束
    $('#showToIdSpan').disable();

    //删除选人返回input中自带的样式
    $("#showToIdInput_txt").removeAttr("style");

    setButtonCanUseReady();
    setShowToIdDisplay();
    customTrackSet();

    //功能  add by libing
    setDealCommentChange();
    //跟踪  意见  归档
    if (nodePerm_baseActionList &&
        (nodePerm_baseActionList.contains("Track") || nodePerm_baseActionList.contains("Opinion") || nodePerm_baseActionList.contains("Archive"))) {
        $("#_showOrCloseBtn").show();
    } else {
        $("#_showOrCloseBtn").hide();
    }

    //控制是否展示editor
    if (richContent != "") {
        initEditorAndShow('content_deal_comment', true);
    } else {
        $("#content_deal_comment").val(drafContent);
    }
});


/**
 * 初始化处理区域的按钮
 * @returns
 */
function _initPageBtns() {
    // 基本操作
    PermissionDataHandler.addPermissions(DEAL_BTN_CATEGORY_BASE, jsonArrBase);
    // 常用操作
    PermissionDataHandler.addPermissions(DEAL_BTN_CATEGORY_COMMON, jsonArrCommon);
    // 高级操作
    PermissionDataHandler.addPermissions(DEAL_BTN_CATEGORY_ADVANCE, jsonArradvance);

    //如果不存在更多按钮 则需要修改工具栏的宽度
    if (jsonArradvance == "[]" || jsonArradvance.length === 0) {
        $("#toolb").css("width", 340);
    } else {
        $("#toolb").css("width", 240);
    }

    var barConfig = {
        category: "",
        btnType: "",
        originalClickFn: _operation_originalClickFn,
        filterFn: _operation_filterFn,
        packageOperationCheckFn: _operation_packageOperationCheck,
        preSubmitDataFn: _operation_preSubmitData,
        getChangeWorkflowParamFn: _operation_getChangeWorkflowParamFn,
        beforeChangeWorkflowFn: _operation_beforeChangeWorkflowFn,
        getAttitudeDomsFn: _operation_getAttitudeDomsFn,
        setAttitudeFn: _operation_setAttitudeFn,
        refreshWorkflowFn: _operation_refreshWorkflowFn
    }

    barConfig.category = DEAL_BTN_CATEGORY_COMMON;
    barConfig.btnType = "toolbar";

    var toolbarBtns = PermissionDataHandler.buildToolbarBtns(barConfig);
    $("#toolb").toolbar({
        toolbar: toolbarBtns,
        borderTop: false,
        borderLeft: false,
        isPager: false,
        borderRight: false
    });


    if (startCfg) {

        barConfig.category = DEAL_BTN_CATEGORY_ADVANCE;
        barConfig.btnType = "menuSimple";
        toolbarBtns = PermissionDataHandler.buildToolbarBtns(barConfig);
        $("#moreLabel").menuSimple({
            width: 100,
            direction: "BR",
            offsetLeft: -40,
            overflow: 'auto',
            data: toolbarBtns
        });


        // 基本按钮
        barConfig.category = DEAL_BTN_CATEGORY_BASE;
        barConfig.btnType = "toolbar_submit";
        toolbarBtns = PermissionDataHandler.buildToolbarBtns(barConfig);

        var itemOnes = [];
        var itemTwos = [];
        $(toolbarBtns).each(function (index, item) {
            // 如果是提交形的按钮
            if (item.type == "2") {

                itemOnes.push(item);
                // 判断该按钮后面是否跟了分割线如果跟了 则一并追加
                var backItem = toolbarBtns[index + 1];
                if (backItem != null && backItem.id === "line") {
                    itemOnes.push(backItem);
                }
            } else {
                itemTwos.push(item);
                var backItem = toolbarBtns[index + 1];
                // 判断该按钮后面是否跟了分割线如果跟了 则一并追加
                if (backItem != null && backItem.id === "line") {
                    itemTwos.push(backItem);
                }
            }
        });

        // 初始化用户自定义的按钮集合
        $("#customerToolBar").toolbar({
            toolbar: itemTwos,
            borderTop: false,
            borderLeft: false,
            isPager: false,
            borderRight: false
        });
        $("#customerToolBar .toolbar_l").css("width", $("#customerToolBar").width())

        //初始化提交区域的按钮方法 将用户定义的提交类按钮放到该区域, 如果存在处理区域 才需要进行按钮顺序的调整
        var btnTemplateHTML = ' <DIV class="right customer_submit" style="margin-bottom: 8px;">\
                    <INPUT ${itemDisabled} ${onclickEvent} title="${name}"\
                        class="common_button ${class} margin_r_5 hand" id="${id}_a"\
                        style="DISPLAY: inline-block; padding: 0 4px;" type=button\
                        value="${name}" data="${data}"/>\
                </DIV>';
        var linTemplateHTML = '<div style="overflow:hidden;line-height:1px;height:3px;padding:2px;width:315px;float:right;margin-left: 15px;margin-bottom: 6px;"><div class="hr_heng">&nbsp;</div></div>';

        function __getCommonBtnHtml(itemObj, tempName) {

            var html = "";
            switch (tempName) {
                case "commonLineHtml":
                    html = linTemplateHTML;
                    break;
                case "submitToolBtnContent":
                    html = btnTemplateHTML;
                    break;
                default:
                    break;
            }
            itemObj["onclickEvent"] = "";
            itemObj["itemDisabled"] = "";

            //如果存在用户定义的click事件 则需要加上用户事件
            if (itemObj.click != null && itemObj.disabled != true) {

                var methodName = "toolbar" + itemObj.id + "_aClick";
                itemObj["onclickEvent"] = "onclick='" + methodName + "(this)'";

                window[methodName] = function (eventEl) {
                    itemObj.click(eventEl);
                }
            }
            //如果按钮不可以点击 则设置disabled
            if (itemObj.disabled) {
                itemObj["itemDisabled"] = "disabled=true";
            }
            for (var prop in itemObj) {
                html = html.replace("${" + prop + "}", itemObj[prop]);
                html = html.replace("${" + prop + "}", itemObj[prop]);
                html = html.replace("${" + prop + "}", itemObj[prop]);
            }
            return html;
        }


        var submitBtnHtml = [];
        $(itemOnes).each(function (index, item) {
            // 表示分割线
            if (item.id === 'line') {
                submitBtnHtml.push(__getCommonBtnHtml(item, 'commonLineHtml'));
            } else if (item.id === 'label' || item.type === '7') {
                submitBtnHtml.push(__getCommonBtnHtml(item, 'text_info'));
            } else {
                submitBtnHtml.push(__getCommonBtnHtml(item, "submitToolBtnContent"));
            }
        });

        var $_dealDiv = $("#_dealDiv");
        $_dealDiv.append(submitBtnHtml.join(""));

        if ($_dealDiv.get(0)) {
            var parentTopEl = $_dealDiv.get(0).offsetTop;

            //对数据进行分行处理
            $(".customer_submit").each(function () {
                $(this).addClass("pageNum_" + (Math.floor(($(this).get(0).offsetTop - parentTopEl - 8) / 34) + 1));
            })
            //对每行数据进行倒序处理
            for (var num = 1; num < 5; num++) {

                var els = $(".pageNum_" + num);
                //如果长度大于0的 才需要进行倒序处理
                if (els.length > 0) {
                    if (num !== 1) {
                        $(els[0]).before("<div class='customer_submit_line' style='width:100%;overflow: hidden;height:1px'></div>");
                    }

                    if (els.length !== 1) {
                        for (var k = 1; k < els.length; k++) {
                            $(els[els.length - 1]).after($(els[k - 1]));
                        }
                    }
                }
            }
        }
    }
}

/**
 * 展现流程图的方法
 * @returns
 */
function _operation_refreshWorkflowFn(workflowChangeData) {
    refreshWorkflow(workflowChangeData);
}

/***
 * 获取页面上的态度 input dom
 * @param attitudeAction 封装的态度 code
 * @param attitudeShowName 分装的态度名称
 * @returns
 */
function _operation_getAttitudeDomsFn() {

    var inputDoms = [];

    if (nodeattitudeListSize == "0") {

    } else {
        $("input[name='attitude']").each(function () {
            inputDoms.push(this);
        });
    }

    return inputDoms;
}


/**
 * 设置态度的值
 * @param value
 * @param code
 * @returns
 */
function _operation_setAttitudeFn(value, code, isClear) {

    if (isClear) {//清空态度
        document.getElementById("hidAttitude").value = "";
        document.getElementById("hidAttitudeCode").value = "";
    } else {
        document.getElementById("hidAttitude").value = value;
        document.getElementById("hidAttitudeCode").value = code;
    }

    $("input[name='attitude']").each(function () {

        if (code == this.getAttribute("code")) {
            this.checked = true;
            return false;
        }
    });
}

/**
 * 修改流程前事件
 * @param type
 * @returns
 */
function _operation_beforeChangeWorkflowFn(type) {

    switch (type) {
        case "AddNode":
            var idMap = {
                "summaryID": summaryId,
                "affairID": affairId
            }
            var sendDevelop = $.ctp.trigger('beforeDealaddnode', idMap);
            if (!sendDevelop) {
                // $.alert($.i18n('collaboration.page.js.third.error.alert.js'));
                return false;
            }
            break;
        case "Infom":
            break;
        case "JointSign":
            break;
        case "moreSign":
            var idMap = {
                "summaryID": summaryId,
                "affairID": affairId
            }
            var sendDevelop = $.ctp.trigger('beforeDealaddnode', idMap);
            if (!sendDevelop) {
                return false;
            }
            break;
        default:
            break;
    }

    return true;
}

/**
 * 获取加签/当前会签/知会/多级会签 流程的时候需要设置流程的参数
 * @returns
 */
function _operation_getChangeWorkflowParamFn(type) {

    // 指定回退状态
    var isForm = bodyType == '20';

    var changeWorkflowParam = {
        workitemId: wfItemId,
        processId: wfProcessId,
        nodeId: wfActivityId,
        caseId: wfCaseId,
        appName: "collaboration",
        isForm: isForm,
        callback: refreshWorkflow,
        affairId: affairId,
        useNowexpirationTime: "true",
    }

    if (isForm) {
        changeWorkflowParam.NPS = "form";
    } else {
        changeWorkflowParam.NPS = "default";
    }

    var tempSPK = "";
    switch (type) {
        case "AddNode":
            tempSPK = "insertNode"
            break;
        case "Infom":
            tempSPK = "informNode"
            break;
        case "JointSign":
            tempSPK = "assignNode"
            break;
        case "moreSign":
            tempSPK = "nodeOperation4Account";
            if (adminType == "formAdmin") {
                tempSPK = "nodeOperation4Form";
            }
            break;
        default:
            break;
    }
    changeWorkflowParam.SPK = tempSPK;

    if (type == "AddNode" || type == "Infom" || type == "JointSign") {
        changeWorkflowParam.performer = currUserId;
        changeWorkflowParam.summaryId = summaryId;
        changeWorkflowParam.formRecordId = formRecordid
    } else {
        // 多级会签独有的参数
        changeWorkflowParam.affairMemberId = currUserId;
        changeWorkflowParam.workitemId = wfItemId;
        //changeWorkflowParam.formId = formId;
        //changeWorkflowParam.flowPermAccountId = _accountId;
        changeWorkflowParam.callBackFn = refreshWorkflow;
        changeWorkflowParam.selectPeopleDialogLeftTitle = "";
        changeWorkflowParam.panels = "Department,Team,BusinessDepartment";
    }

    if (type == "Infom") {
        changeWorkflowParam.defaultPolicyId = "collaboration";
    } else if (type == "JointSign") {
        changeWorkflowParam.defaultPolicyId = nodePolicy;
        changeWorkflowParam.defaultPolicyName = nodePolicyName;
    }

    changeWorkflowParam.accountId = flowPermAccountId;
    changeWorkflowParam.flowPermAccountId = flowPermAccountId;

    if (type == "AddNode" || type == "moreSign") {
        changeWorkflowParam.isTemplete = isTemplete;
    }

    return changeWorkflowParam;
}

/**
 * 封装操作， 预提交数据
 * @returns
 */
function _operation_preSubmitData(wrapContent, config) {

    var fnx = _getZWIframe();

    fnx.contentAPI.preSubmit({
        "checkNull": false,
        "needCheckRule": false,
        "needCheckCustom": true,
        "failed": null,
        "success": function (_contentObj, snMsg) {
            config.success();
        },
        error: function () {
            config.error();
        }
    });

}


/**
 * 封装动作执行前的校验
 * @param wrapContent
 * @returns
 */
function _operation_packageOperationCheck(wrapContent) {

    var msg = "";
    var tempIsTemplate = !(!templateId || templateId == '' || templateId == "0" || templateId == "-1");
    var isForm = bodyType == "20";
    if (!tempIsTemplate || !isForm) {
        var jsonObject = wrapContent;
        var specialNodePolicy = new Array();
        if (tempIsTemplate) {
            specialNodePolicy = ["formaudit", "vouch"];
        } else {
            specialNodePolicy = ["formaudit", "vouch", "newsaudit", "bulletionaudit"];
        }

        // 然后判断操作
        if (jsonObject.submitAction != "Return" && jsonObject.processAction != "") {

            var changeNodeMessage = jsonObject.processActionDetail;
            if (changeNodeMessage && changeNodeMessage.policyId) {
                var policy = changeNodeMessage.policyId;

                var policyArray = [];

                if (policy) {
                    if (jsonObject.processAction != "moreSign") {
                        policyArray.push(policy);
                    } else {

                        if (policy instanceof Array) {
                            policyArray = policy;
                        } else {
                            policyArray.push(policy);
                        }
                    }
                }

                var colTypeName = $.i18n("common.free.coll.label");
                if (tempIsTemplate) {
                    colTypeName = $.i18n("common.collaboration.template.label");
                }
                for (var i = 0; i < policyArray.length; i++) {
                    if ($.inArray(policyArray[i], specialNodePolicy) >= 0) {
                        msg = $.i18n("collaboration.canNotDeal.specialNodePolicy.js", $.i18n("node.policy." + policyArray[i]), colTypeName);
                        break;
                    }
                }
            }
        }
    }

    var ret = {result: true};

    if (msg != "") {
        $.alert(msg);
        ret.result = false;
    }

    return ret;

}


/**
 * 按钮原子操作执行方法
 * @param operation
 * @returns
 */
function _operation_originalClickFn(atomicCode, config) {

    // 原子操作映射关系
    var code2Click = {
        "Track": "trackBoxFunc",
        "Comment": "dealDoZcdbFunc",
        "ContinueSubmit": "submitClickFunc",
        "Terminate": "stepStopFunc",
        "Infom": "addInformFunc",
        "AddNode": "addNode",
        "JointSign": "currentAssign",
        "RemoveNode": "deleteNodeFunc",
        "moreSign": "addMoreNode",
        "Forward": "dealForwardFunc",
        "Edit": "editContentFunc",
        "Sign": "openSignature",
        "Cancel": "dealCancelFunc_deal",
        "SuperviseSet": "superviseSetFunc",
        "allowUpdateAttachment": "modifyAttFunc",
        "Transform": "transformFunc",
        "Transfer": "transferFunc",
        "Return": "stepBackCallBack",
        "SpecifiesReturn": "specifiesReturnFunc",
        //<!-- 东证资管  添加手动调用接口按钮   2021-05-14 hehaitao   start-->
        // "sendPort": "sendPort",
        //<!-- 公文附件下载   end-->
        "download": "download"


    }

    var clickFn = code2Click[atomicCode];

    if (clickFn && typeof window[clickFn] === "function") {

        config = config || {};
        var data = config.data;

        // 执行原子操作
        window[clickFn](data);

    }
    //<!-- 东证资管  添加手动调用接口按钮   2021-05-14 hehaitao   start-->
    else if (clickFn == "sendPort") {
//        	alert(affairId);
        $.ajax({
            url: "/seeyon/thirdpartyController.do?method=sendPort",
            type: 'POST',
            dataType: "json",
            data: {"affairId": affairId},
            async: false,
            success: function (responseStr) {
                message = responseStr.message;
                if (message == 0) {
                    alert("手动触发接口调用成功!");
                }
            },
        });
    }
    //文档下载   李丹 *****************************start**************************
    else if (clickFn == "download") {
        $.ajax({
            url: "/seeyon/DownloadAttachment.do?method=getTheDownloadFile",
            type: 'POST',
            data: {"affairId": affairId},
            async: false,
            success: function () {
                alert("下载请求发送成功")
            },
        });
    }
    //文档下载   李丹 *****************************end**************************
    // $.ajax({
    //     url: "/seeyon/myDownloadController.do?method=downLoadAll",
    //     type: 'POST',
    //     data: {"affairId": affairId},
    //     async: false,
    //     success: function () {
    //         console.log(arguments)
    //     },
    //     error: function (){
    //         console.log(arguments)
    //         alert("12313123")
    //     }
    // });
}

/*===================下载文件

//<!-- 东证资管  添加手动调用接口按钮   2021-05-14 hehaitao   end-->
else {
    if (!clickFn) {
        alert("xml定义的操作[" + atomicCode + "]没有定义click方法");
    } else {
        alert("在window下没有找到xml定义的操作[" + atomicCode + "]没有定义click方法[" + clickFn + "]");
    }
}
}


/**
* 按钮显示时按钮置灰校验
* @param operation
* @returns
*/
function _operation_filterFn(operation, category) {


    var disabled = false;
    var remove = false;


    if (category == DEAL_BTN_CATEGORY_BASE) {
        // 基础操作需要对数据做移除
        var excludeArray = ['Track', 'Archive', 'Comment', 'ContinueSubmit',
            'UploadAttachment', 'UploadRelDoc', 'Opinion', 'Print',
            "CommonPhrase"];

        if ($.inArray(operation.id, excludeArray) > -1) {
            // 过滤按钮
            return {disabled: true, remove: true};
        }
    }

    if (typeof (hasFormLock) != "undefined" && hasFormLock == "true") {
        //0：流程调整类、2：提交类、3：意见回复类
        if (operation.type == "0" || operation.type == "2" || operation.type == "3") {
            disabled = true;
        }
    }

    if (!disabled && canModifyWorkFlow == 'false') {

        var flowChangeArr = ["AddNode", "JointSign", "RemoveNode", "Infom", "moreSign"];
        if (operation.hasProcessChange || operation.type == "0" || $.inArray(operation.id, flowChangeArr) > -1) {
            disabled = true;
        }
    }


    //指定回退等状态置灰某些操作
    if (!disabled && (inInSpecialSB || (state == '3' && (subState == "15" || subState == "16" || subState == "17")))) {

        if (inInSpecialSB) {
            // 回退与指定回退
            if (_isReturnOrSpecifiesReturn(operation.codes)) {
                disabled = true;
            }
        } else {

            // 移交\加签\减签\当前会签\知会\多级会签 及其封装操作,都不允许操作
            var flowChangeArr = ["Transfer", "AddNode", "RemoveNode", "JointSign", "Infom", "moreSign"];
            if (operation.isFlowChange || $.inArray(operation.id, flowChangeArr) > -1) {
                disabled = true;
            }

            if (!disabled && operation.codes && operation.codes.length > 0) {
                for (var n = 0; n < operation.codes.length; n++) {
                    if ($.inArray(operation.codes[n], flowChangeArr) > -1) {
                        disabled = true;
                    }
                }
            }

            if (!disabled) {

                if (subState == "16") {
                    // 指定回退只能做提交给我
                    if (_isReturnOrSpecifiesReturn(operation.codes) && !operation.isSpecifiesReturnToMe) {
                        disabled = true;
                    }
                } else {
                    // 提交\签章\督办设置\修改正文\修改附件
                    var dontUseArr = ["ContinueSubmit", "Sign", "SuperviseSet", "Edit", "allowUpdateAttachment"];
                    if (operation.hasSubmit) {// 提交
                        disabled = true;
                    } else if (_isReturnOrSpecifiesReturn(operation.codes)) {// 回退与指定回退
                        disabled = true;
                    } else if ($.inArray(operation.id, dontUseArr) > -1) {
                        disabled = true;
                    }
                }
            }

        }
    }

    // 第三方正文，不允许修改正文
    if (typeof (isThirdContent) != "undefined" && isThirdContent) {
        var cannotUseBtns = ['Edit']; //修改正文
        if ($.inArray(operation.id, cannotUseBtns) > -1) {
            disabled = true;
        }
    }

    var ret = {disabled: disabled, remove: remove}

    return ret;
}

/**
 * 判定是否是回退 或者指定回退
 * @param codes
 * @returns
 */
function _isReturnOrSpecifiesReturn(codes) {
    return $.inArray("Return", codes) > -1 || $.inArray("SpecifiesReturn", codes) > -1;
}


//ready方法结束
var isclickInput = false;
var cursorPos = 0;

/**
 * $("#_vouchPass") 归档回调
 * @returns
 */
function vouchPassPigeonCallback(result) {
    if (result && result === "cancel") {
        mainbody_callBack_failed();
        setButtonCanUseReady();
        return;
    }
    $("#pigeonholeValue").val(result);
    vouchPassAffterPigeon();
}

/**
 * $("#_vouchPass") 归档后执行代码
 * @returns
 */
function vouchPassAffterPigeon() {
    if ($.content.callback.vouchPass) {
        $.content.callback.vouchPass();
    }
}

/**
 * $("#_auditPass") 归档回调函数
 * @returns
 */
function auditPassPigeonCallback(result) {
    if (result && result === "cancel") {
        mainbody_callBack_failed();
        return;
    }
    $("#pigeonholeValue").val(result);
    auditPassAffterPigeon();
}

/**
 * $("#_auditPass") 归档后调用函数
 * @returns
 */
function auditPassAffterPigeon() {
    if ($.content.callback.auditPass) {
        $.content.callback.auditPass();
    }
}


//at功能实现
function setDealCommentChange() {
    //ckediter 加载成功后
    $("#content_deal_comment").bind("editorReady", function () {
        var ckIframes = $("iframe", $("#cke_content_deal_comment"));
        var ckIfameBody = null;
        var ifr = null;
        if (ckIframes.length > 0) {
            ifr = ckIframes[0];
            var cDoc = ifr.contentDocument || iframe.contentWindow.document;
            ckIfameBody = cDoc.body;
        }
        //进行at初始化
        _initAtwho(ifr, ckIfameBody);

        if (templateId && templateId != "" && nodeDesc != "" && drafContent == "") {
            _ckIfameBody = ckIfameBody;
            _nodeDesc = $(ckIfameBody).text();
            //初始化节点属性的显示
            _initNodeDesc(ckIfameBody);
        }
    });
    atwhoWhenDealTextArea($("#content_deal_comment"));
}

function _initNodeDesc(ckIfameBody) {
    $("p", ckIfameBody).css("color", "#cacaca");//提示语置灰
}

//初始化at
function _initAtwho(ifr, ckIfameBody) {

    //添加at事件
    if (_getPushMesgMembers && ckIfameBody) {
        atwhoWhenDeal(ifr, ckIfameBody);
    } else {
        setTimeout(function () {
            _initAtwho(ifr, ckIfameBody);
            ifr = null;
            ckIfameBody = null;
        }, 1000);
    }
    //覆盖组件计算的具体宽度值，改用百分比
    setTimeout(function () {
        $(".cke_wysiwyg_frame").css({'width': '100%'});
    }, 1);
}

//处理协同时at功能
var deal_userDatas;
var atUserData = []; //用于存放意见区域选择的@数据
function atwhoWhenDeal(editerIframe, editerIframeBody) {
    var at_config = {
        at: "@",
        alias: (new Date()).getTime(),
        data: null,
        searchKey: "memberName",
        displayTpl: "<li>${memberName}</li>",
        insertTpl: "${atwho-at}${memberName}",
        editableAtwhoCssAttrs: {
            "color": "#318ed9",
            "font-size": "14px",
            "border-width": "0px",
            "padding": "0",
            "margin": "0",
            "background-color": "transparent",
            "background-image": "none"
        },
        editableAtwhoQueryAttrs: {"checkAffair": affairId},
        customFn4LowIE: showAtSelectWin,
        startWithSpace: false,
        lookUpOnClick: false,
        callbacks: {
            beforeInsert: function (value, $li) {
                var data = $li.data('item-data');
                var userData = {
                    affairId: data.affairId,
                    memberId: data.memberId,
                    memberName: data.memberName,
                    content: "@" + data.memberName
                }
                atUserData.push(userData);

                return value;
            },
            afterSorter: function (items, query, searchKey) {
                if (!items) {
                    items = [];
                }

                if (items.length > 0 && items[0].affairId != "All") {
                    items.push(_getAtAllData());
                }
                return items;
            },
            remoteFilter: function (query, searchKey, callbackFn) {
                //获取列表数据
                deal_userDatas = _getPushMesgMembers("deal");

                var ds = this.callbacks('filter').call(this, query, deal_userDatas, searchKey) || [];

                if (ds.length == 0) {
                    var toAddAll = true;
                    if (query && "all".indexOf(query.toLocaleLowerCase()) == -1) {
                        toAddAll = false;
                    }
                    if (toAddAll) {
                        ds.push(_getAtAllData());
                    }
                }
                callbackFn.call(this, ds);
            }
        },
        limit: 200
    };

    var ifr = editerIframe;

    try {
        // 干掉IE http之类地址自动加链接
        ifr.document.execCommand("AutoUrlDetect", false, false);
    } catch (e) {
    }


    // Make sure the textarea's `contentEditable` property is set to `true`
    editerIframeBody.contentEditable = true;
    var $ifrBody = $(editerIframeBody);
    $ifrBody.atwho('setIframe', ifr).atwho(at_config);

    var ckeditor = CKEDITOR.instances['content_deal_comment'];
    ckeditor.enableEnter = true; //Use this as a flag

    $ifrBody.on('shown-' + at_config["alias"] + '.atwho', function (event) {
        ckeditor.enableEnter = false;
    }).on('hidden-' + at_config["alias"] + '.atwho', function (event) {
        setTimeout(function () {
            //console.log("hide! setting to TRUE");
            ckeditor.enableEnter = true;
        }, 100); //Give it a small time so that the ENTER key only affects the popup and not the editor
    });

    ckeditor.on('key', function (event) {
        if (event.data.keyCode == 13 && !ckeditor.enableEnter) {
            event.cancel();
        }
    });
}

function atwhoWhenDealTextArea($textArea) {
    var at_config = {
        at: "@",
        alias: (new Date()).getTime(),
        data: null,
        searchKey: "memberName",
        displayTpl: "<li>${memberName}</li>",
        insertTpl: "${atwho-at}${memberName}",
        startWithSpace: false,
        customFn4LowIE: showAtSelectWin,
        callbacks: {
            beforeInsert: function (value, $li) {
                var data = $li.data('item-data');
                var userData = {
                    affairId: data.affairId,
                    memberId: data.memberId,
                    memberName: data.memberName,
                    content: "@" + data.memberName
                }
                atUserData.push(userData);

                return value;
            },
            afterSorter: function (items, query, searchKey) {
                if (!items) {
                    items = [];
                }

                if (items.length > 0 && items[0].affairId != "All") {
                    items.push(_getAtAllData());
                }
                return items;
            },
            remoteFilter: function (query, searchKey, callbackFn) {
                // 获取列表数据
                deal_userDatas = _getPushMesgMembers("deal");

                var ds = this.callbacks('filter').call(this, query,
                        deal_userDatas, searchKey)
                    || [];

                if (ds.length == 0) {
                    var toAddAll = true;
                    if (query && "all".indexOf(query.toLocaleLowerCase()) == -1) {
                        toAddAll = false;
                    }
                    if (toAddAll) {
                        ds.push(_getAtAllData());
                    }
                }
                callbackFn.call(this, ds);
            }
        },
        limit: 200
    };

    $textArea.atwho(at_config);
}

/**
 * 获取textArea中光标的位置
 */
function getTextAreaPosition(t) {
    var startPos = 0, endPos = 0;
    if (t != null) {
        if (t.ownerDocument.selection) {
            t.focus();
            var ds = t.ownerDocument.selection;
            var range = ds.createRange();
            var stored_range = range.duplicate();
            stored_range.moveToElementText(t);
            stored_range.setEndPoint("EndToEnd", range);
            startPos = t.selectionStart = stored_range.text.length - range.text.length;
            endPos = t.selectionEnd = t.selectionStart + range.text.length;
            ds = range = null;
        } else if (t.selectionStart) {
            startPos = t.selectionStart;
            endPos = t.selectionEnd;
        } else {
            startPos = endPos = 0;
        }
    }
    return {"startPos": startPos, "endPos": endPos};
}

/**
 * 设置textArea光标的位置
 */
function setTextAreaPosition(t, number) {
    if (t == null || number == null) {
        return;
    }
    selectTextAreaValue(t, number, number);
}


function customTrackSet() {
    if (typeof (trackIds) != "undefined" && "" == trackIds && affairSubState != '13' && customSetTrackFlag) {
        $("#isTrack").click();
        var trackRange = $('input:radio[name="trackRange"]');
        trackRange.removeAttr('disabled');
        //将‘全部’置为选中状态
        try {
            trackRange.get(0).checked = true;
        } catch (e) {
        }
        //改变<label>样式
        $('#label_all').removeClass('disabled_color hand');
        $('#label_members').removeClass('disabled_color hand');
    }
}

function toggleTrackRange_members() {
    $("#trackRange_members").click();
}

//设置有默认意见隐藏不包括的人
function setShowToIdDisplay() {


    if (isHidden) {
        $("#isHidden").attr("checked", "true");
        //显示选人界面
        $("#showToIdSpan").show();
        $("#showToIdSpan").removeClass("common_txtbox_dis");
        $("#showToIdSpan").enable();
        $("#showToIdInput").val(displayIds);
        $("#showToIdInput_txt").val(displayNames);
    } else {
        //设置默认发起人
        $("#showToIdInput").val("Member|" + startMemberId);
        $("#showToIdInput_txt").val(stateMemberName);
    }
}

function setButtonCanUseReady() {
    //其他节点(待办),并发的两个节点，其中一个节点做了指定回退，另外一个的状态就是这个分支
    if (inInSpecialSB) {
        setButtonCanUse('_concurrentBranch');
    } else if (state == '3' && (subState == "15" || subState == "16" || subState == "17")) {
        setButtonCanUse(subState);
    }
}

function setButtonCanUse(subState) {
    if (subState == "15") {
        //转办
        $("#_commonTransfer").addClass("back_disable_color").disable();
        $("#_commonTransfer_a").addClass("common_menu_dis").disable();
        // 指定回退
        //$("#_dealSpecifiesReturn").css("color","#ccc").disable();
        $("#_dealSpecifiesReturn").addClass("back_disable_color").disable();
        $("#_dealSpecifiesReturn_a").addClass("common_menu_dis").disable();
        //回退
        //$("#_dealStepBack,#_commonStepBack").css("color","#ccc").disable();
        $("#_dealStepBack,#_commonStepBack").addClass("back_disable_color").disable();
        $("#_dealStepBack_a,#_commonStepBack_a").addClass("common_menu_dis").disable();
        //提交
        $("#_dealSubmit").addClass("back_disable_color").disable();
        //暂存待办
        $('#_dealSaveWait').addClass("back_disable_color").disable();
        //审核不通过
        $('#_auditNotPass').addClass("back_disable_color").disable();
        //终止
        //$("#_dealStepStop,#_commonStepStop").disable(); OA-43332
        //加签
        $("#_dealAddNode,#_commonAddNode").addClass("back_disable_color").disable();
        $("#_dealAddNode_a,#_commonAddNode_a").addClass("common_menu_dis").disable();
        //减签
        $("#_dealDeleteNode,#_commonDeleteNode").addClass("back_disable_color").disable();
        $("#_dealDeleteNode_a,#_commonDeleteNode_a").addClass("common_menu_dis").disable();
        //当前会签
        $("#_dealAssign,#_commonAssign").addClass("back_disable_color").disable();
        $("#_dealAssign_a,#_commonAssign_a").addClass("common_menu_dis").disable();//基本操作
        //知会
        $("#_dealAddInform,#_commonAddInform").addClass("back_disable_color").disable();
        $("#_dealAddInform_a,#_commonAddInform_a").addClass("common_menu_dis").disable();
        //签章
        $("#_dealSign").addClass("back_disable_color").disable();
        $("#_commonSign_a,#_dealSign_a").addClass("common_menu_dis").disable();
        //督办设置
        $("#_dealSuperviseSet").addClass("back_disable_color").disable();
        $("#_dealSuperviseSet_a,#_commonSuperviseSet_a").addClass("common_menu_dis").disable();
        //修改正文
        $('#_commonEditContent,#_dealEditContent').addClass("back_disable_color").disable();
        $('#_commonEditContent_a,#_dealEditContent_a').addClass("common_menu_dis").disable();
        //修改附件
        $("#_commonUpdateAtt,#_dealUpdateAttachment").addClass("back_disable_color").disable();
        $("#_commonUpdateAtt_a,#_dealUpdateAttachment_a").addClass("common_menu_dis").disable();
        //消息推送
        $("#pushMessageButton").addClass("common_menu_dis").disable();
        $("#pushMessageButtonSpan").addClass("color_gray").disable();
        //意见隐藏
        $("#isHidden").disable();
        $("#isHiddenLable").addClass("color_gray").disable();
        //跟踪
        $("#isTrack").disable();
        $("#isTrackLable").addClass("color_gray").disable();
        //处理后归档
        $("#pigeonhole").disable();
        $("#pigeonholeLable").addClass("color_gray").disable();
        $("#_auditPass").disable();
        $("#_auditNotPass").disable();
        $("#_dealPass1").disable();
    } else if (subState == "16") {
        //转办
        $("#_commonTransfer").addClass("back_disable_color").disable();
        $("#_commonTransfer_a").addClass("common_menu_dis").disable();
        // 指定回退
        //$("#_dealSpecifiesReturn").disable();
        //$("#_dealSpecifiesReturn_a").disable();
        //回退
        $("#_dealStepBack,#_commonStepBack").addClass("back_disable_color").disable();
        $("#_dealStepBack_a,#_commonStepBack_a").addClass("common_menu_dis").disable();
        //暂存待办
        $('#_dealSaveWait').addClass("back_disable_color").disable();
        //审核不通过
        $('#_auditNotPass').addClass("back_disable_color").disable();

        //取回(待办下无此操作)
        //加签
        $("#_dealAddNode,#_commonAddNode").addClass("back_disable_color").disable();
        $("#_dealAddNode_a,#_commonAddNode_a").addClass("common_menu_dis").disable();
        //减签
        $("#_dealDeleteNode,#_commonDeleteNode").addClass("back_disable_color").disable();
        $("#_dealDeleteNode_a,#_commonDeleteNode_a").addClass("common_menu_dis").disable();
        //当前会签
        $("#_dealAssign,#_commonAssign").addClass("back_disable_color").disable();
        $("#_dealAssign_a,#_commonAssign_a").addClass("common_menu_dis").disable();
        //知会
        $("#_dealAddInform,#_commonAddInform").addClass("back_disable_color").disable();
        $("#_dealAddInform_a,#_commonAddInform_a").addClass("common_menu_dis").disable();
    } else if (subState == "17") {
        //转办
        $("#_commonTransfer").addClass("back_disable_color").disable();
        $("#_commonTransfer_a").addClass("common_menu_dis").disable();
        //修改正文
        $('#_commonEditContent,#_dealEditContent').addClass("back_disable_color").disable();
        $('#_commonEditContent_a,#_dealEditContent_a').addClass("common_menu_dis").disable();
        //签章
        $("#_dealSign").addClass("back_disable_color").disable();
        $("#_commonSign_a,#_dealSign_a").addClass("common_menu_dis").disable();
        //督办设置
        $("#_dealSuperviseSet").addClass("back_disable_color").disable();
        $("#_dealSuperviseSet_a,#_commonSuperviseSet_a").addClass("common_menu_dis").disable();
        //修改附件
        $("#_commonUpdateAtt,#_dealUpdateAttachment").addClass("back_disable_color").disable();
        $("#_commonUpdateAtt_a,#_dealUpdateAttachment_a").addClass("common_menu_dis").disable();
        // 指定回退
        $("#_dealSpecifiesReturn").addClass("back_disable_color").disable();
        $("#_dealSpecifiesReturn_a").addClass("common_menu_dis").disable();
        //回退
        $("#_dealStepBack,#_commonStepBack").addClass("back_disable_color").disable();
        $("#_dealStepBack_a,#_commonStepBack_a").addClass("common_menu_dis").disable();
        //暂存待办
        $('#_dealSaveWait').addClass("back_disable_color").disable();
        //审核不通过
        $('#_auditNotPass').addClass("back_disable_color").disable();
        //取回(待办下无此操作)
        //加签
        $("#_dealAddNode,#_commonAddNode").addClass("back_disable_color").disable();
        $("#_dealAddNode_a,#_commonAddNode_a").addClass("common_menu_dis").disable();
        //减签
        $("#_dealDeleteNode,#_commonDeleteNode").addClass("back_disable_color").disable();
        $("#_dealDeleteNode_a,#_commonDeleteNode_a").addClass("common_menu_dis").disable();
        //当前会签
        $("#_dealAssign,#_commonAssign").addClass("back_disable_color").disable();
        $("#_dealAssign_a,#_commonAssign_a").addClass("common_menu_dis").disable();
        //知会
        $("#_dealAddInform,#_commonAddInform").addClass("back_disable_color").disable();
        $("#_dealAddInform_a,#_commonAddInform_a").addClass("common_menu_dis").disable();
        //消息推送
        $("#pushMessageButton").disable();
        $("#pushMessageButtonSpan").addClass("color_gray").disable();
        //意见隐藏
        $("#isHidden").disable();
        $("#isHiddenLable").addClass("color_gray").disable();
        //跟踪
        $("#isTrack").disable();
        $("#isTrackLable").addClass("color_gray").disable();
        //处理后归档
        $("#pigeonhole").disable();
        $("#pigeonholeLable").addClass("color_gray").disable();
        //提交
        $("#_dealSubmit").addClass("back_disable_color").disable();
    } else if (subState == '_concurrentBranch') {
        // 指定回退
        $("#_dealSpecifiesReturn").addClass("back_disable_color").disable();
        $("#_dealSpecifiesReturn_a").addClass("common_menu_dis").disable();
        //回退
        $("#_dealStepBack,#_commonStepBack").addClass("back_disable_color").disable();
        $("#_dealStepBack_a,#_commonStepBack_a").addClass("common_menu_dis").disable();
        $("#_auditNotPass").disable();
        $("#_vouchNotPass").disable();
    }
}

//展示常用语
function showphrase(str) {
    //var pManager = new phraseManager();
    /** 异步调用 */
    var phraseBean = [];

    callBackendMethod("phraseManager", "getAllPhrases", {

        success: function (phraseBean) {
            //特殊操作，常用语和节点说明回写冲突
            if (templateId && templateId != "" && nodeDesc != "" && drafContent == "") {//chenxd
                if ($(_ckIfameBody).text() == _nodeDesc) {
                    $(_ckIfameBody).text("");
                }
            }
            var phrasecontent = [];
            var phrasepersonal = [];
            for (var count = 0; count < phraseBean.length; count++) {
                phrasecontent.push(phraseBean[count].content);
                if (phraseBean[count].memberId == str && phraseBean[count].type == "0") {
                    phrasepersonal.push(phraseBean[count]);
                }
            }

            var width, height, inputType;
            if (typeof (CKEDITOR) === "undefined") {
                width = $("#content_deal_comment").innerWidth() - 4;
                height = $("#content_deal_comment").innerHeight() - 2;
                inputType = "textarea";
            } else {
                var contentCkeditor = CKEDITOR.instances["content_deal_comment"];
                if (contentCkeditor == null) {
                    width = $("#content_deal_comment").innerWidth() - 4;
                    height = $("#content_deal_comment").innerHeight() - 2;
                    inputType = "textarea";
                } else {
                    width = $("#cke_content_deal_comment").innerWidth() - 4;
                    height = $("#cke_content_deal_comment").innerHeight() - 2;
                    inputType = "ckeditor";
                }
            }

            if (typeof (jQuery.fn.comLanguage) === "function") {
                showphraseFun(phrasecontent, inputType, width, height, phrasepersonal);
            } else {
                var _comLanguageJSURL = _ctxPath + "/common/js/ui/seeyon.ui.comLanguage-debug.js";
                $.getScript(_comLanguageJSURL, function (_result, _textStatus, _jqXHR) {
                    //请求过来的JS文件实际为一串string，需要eval一下
                    eval(_result);
                    showphraseFun(phrasecontent, inputType, width, height, phrasepersonal);
                });
            }
        },
        error: function (request, settings, e) {
            $.alert(e);
        }

    });

}

function showphraseFun(phrasecontent, inputType, width, height, phrasepersonal) {
    $("#cphrase").comLanguage({
        textboxID: "content_deal_comment",
        data: phrasecontent,
        inputType: inputType,
        width: width,
        height: height - 2,
        left: $("#areaTopDiv").offset().left + 2,
        top: $("#areaTopDiv").offset().top + $("#areaTopDiv").height() + 2,
        newBtnHandler: function (phraseper) {
            $.dialog({
                url: _ctxPath + '/phrase/phrase.do?method=gotolistpage',
                transParams: phrasepersonal,
                width: 600,
                height: 400,
                targetWindow: top,
                title: $.i18n('common.common.language.label')
            });
        }
    });
}

//流程说明
function colShowNodeExplain() {
    var rv = "";
    try {
        var intro = document.getElementById("nodeExplainDiv");
        var loadedState = intro.getAttribute("data-state");
        if (loadedState == 'loaded') {
            //已经加载直接显示
            intro.style.display = "block";
        } else {
            var params = new Object();
            params["affairId"] = affairId;
            params["templeteId"] = templeteId;
            params["processId"] = processId;
            callBackendMethod("colManager", "getDealExplain", params, {

                success: function (data) {
                    rv = data;
                    if (rv == 'undefined') {
                        rv = "";
                    }

                    var nodeExplainTd = document.getElementById("nodeExplainTd");
                    nodeExplainTd.innerHTML = rv;
                    intro.setAttribute("data-state", "loaded");
                    intro.style.display = "block";
                }

            });
        }
    } catch (ex1) {
    }
}

//关闭流程说明
function hiddenNodeIntroduction() {
    var intro = document.getElementById("nodeExplainDiv");
    intro.style.display = "none";
}

//判断意见是否为空
function dealCommentTrue(action) {
    //节点权限和意见，如果节点权限选择了意见必填或不同意必填意见，添加校验
    if ($.trim(getTextDealComment()) === "") {
        //vouchPass-核定通过;vouchNotPass-核定不通过;auditPass-审核通过;auditNotPass-审核不通过;stepStop-终止;
        //comDeal-处理归档;specifiesReturn-指定回退;stepBack-回退;dealCancel-撤销流程;dealPass1-新闻公告审核
        var isPass = $("#canDeleteORarchive").val() === "true" //处理时必须填写意见
            || ($("#disAgreeOpinionPolicy").val() === "1" && ($("#notagree").is(":checked") || $("#hidAttitudeCode").val() == "disagree"))//不同意时必须填写意见
            || ($("#cancelOpinionPolicy").val() === "1" && (action == "specifiesReturn" || action == "stepBack" || action == "stepStop" || action == "dealCancel"))//撤销/回退/终止时必须填写意见
        if (isPass) {//不同意必填
            $.alert($.i18n('collaboration.common.deafult.dealCommentNotNull'));
            return false;
        }
    }
    return true;
}

function checkYozo() {
    var isYozoWps = false;
    if (bodyType && (bodyType == "43" || bodyType == "44")) {
        isYozoWps = true;
    }
    var isYoZoOffice = parent.isYoZoOffice();
    if (isYozoWps && isYoZoOffice) {
        //对不起，您本地的永中office软件不支持对当前正文格式的此操作！
        $.alert($.i18n('collaboration.alertWpsYozoOffice_modify'));
        return true;
    }
    return false;
}

//修改正文开始
var modifyFlag = 0;

function editContentFunc() {
    //修改HTML正文的时候判断是否有印章，有印章的时候不让修改
    var bodyType = $("#bodyType").val();
    //永中office不支持wps正文修改
    var isYozoWps = checkYozo(bodyType);
    if (isYozoWps) {
        return;
    }
    if (bodyType == "10") {
        var zwIframeObj;
        if ($.browser.mozilla) {
            zwIframeObj = document.getElementById("zwIframe").contentWindow;
        } else {
            zwIframeObj = document.zwIframe;
        }
        if (typeof (zwIframeObj.isHasISignFlag) == "function") {
            var hasSign = zwIframeObj.isHasISignFlag();
            if (hasSign) {
                $.alert($.i18n("collaboration.alert.CantModifyBecauseOfIsignature"));
                return false;
            }
        }
    }
    // 指定回退状态
    if (isSpecifiesBack()) return;

    updateContent();
}

var updateContentCount = 0;

//修改正文内容
function updateContent() {
    /*if( bodyType != '10'){
            $.alert($.i18n('collaboration.summary.label.chooseIe'));
            return;
        }*/
    //添加正文锁
    var lockWorkflowRe = lockWorkflow(summaryId, currUserId, 15);
    if (lockWorkflowRe[0] == "false") {
        alert(lockWorkflowRe[1]);
        return;
    }
    //var fnx =$(window.componentDiv)[0];
    //var zwIframeObj = fnx.document.zwIframe;

    var zwIframeObj;
    if ($.browser.mozilla) {
        zwIframeObj = document.getElementById("zwIframe").contentWindow;
    } else {
        zwIframeObj = document.zwIframe;
    }

    //获取正文内容
    var viewStateold = zwIframeObj.$("#viewState").val();
    zwIframeObj.$("#viewState").val("1");
    var curContent = zwIframeObj.$.content.getContent();
    //if($.browser.msie && ($.browser.version=='7.0' || $.browser.version=='8.0')){
    getA8Top().updataContentOBJ = [window, curContent];
    //alert(getA8Top().updataContentOBJ);
    //}
    zwIframeObj.$("#viewState").val(viewStateold);
    var modifySuccess = false;
    if (bodyType == '10') {
        //第一次修改的时候,从后台获取数据,避免AB同时打开,A修改完成后,B再修改,B会覆盖A的内容
        if (updateContentCount == 0) {
            callBackendMethod("colManager", "getContent", summaryId, {
                success: function (latestContent) {
                    if (latestContent != 'undefined') {
                        curContent = latestContent;
                    }
                    getA8Top().updataContentOBJ = [window, curContent];
                    updateContentPageDialog(summaryId, curContent);
                }
            });
            updateContentCount++;
        } else {
            curContent = zwIframeObj.$.content.getContent();
            updateContentPageDialog(summaryId, curContent);
        }
        zwIframeObj.$("#viewState").val("1");

    } else {

        document.getElementById("modifyFlag").value = "1";
        var officeparamDiv = $(zwIframeObj.document).find(".officeparam");
        officeparamDiv.attr("style", "");

        var _officeTransIframe = $(zwIframeObj)[0].$("#officeTransIframe");
        var _officeEditorFrame = $(zwIframeObj)[0].$("#officeEditorFrame");

        var canSign = false;
        if (nodePerm_commonActionList.indexOf("Sign") > -1 || nodePerm_advanceActionList.indexOf("Sign") > -1) {
            canSign = true;
        }

        var paramStr = officeparamDiv.attr("param");
        if (paramStr) {
            var paramObj = $.parseJSON('{' + paramStr + '}');

            if (bodyType == '45') {
                $(zwIframeObj)[0].createPdfOcx({
                    webRoot: paramObj.webRoot,
                    fileId: paramObj.fileId,
                    officecanSaveLocal: "true",
                    officecanPrint: "true",
                    needReadFile: true,
                    editType: "2,0",
                    createDate: paramObj.createDate,
                    callback: function () {
                        $(zwIframeObj)[0].checkPDFOpenState();
                        $(zwIframeObj)[0].pdfFullSize();
                        $(zwIframeObj)[0].ModifyContent();
                    }
                });
            } else {

                $(zwIframeObj)[0].OfficeAPI.showOffice({
                    fileId: paramObj.fileId,
                    createDate: paramObj.createDate,
                    officeOcxUploadMax: paramObj.officeOcxUploadMax,
                    handWriteCurrentUserId: _currentUserId,
                    editType: "2,0",
                    fileType: paramObj.fileType,
                    officecanPrint: true,
                    officecanSaveLocal: true,
                    fileName: subject
                });
            }
            if (v3x.isChrome || v3x.isMSIE || v3x.isFirefox) {
                setTimeout(function () {
                    _officeTransIframe.remove();
                    $(zwIframeObj)[0].$("#officeFrameDiv").attr("style", "width:100%;height:100%");
                    _officeEditorFrame.attr("width", "100%");
                    _officeEditorFrame.attr("height", "100%");

                    if (bodyType != '45') {
                        modifySuccess = $(zwIframeObj)[0].OfficeAPI.modifyContent(canSign);
                        if (modifySuccess) {
                            //  $(zwIframeObj)[0].OfficeAPI.fullSize();
                            //设置正文为编辑状态
                            zwIframeObj.$("#viewState").val("1");
                        }
                    } else {
                        zwIframeObj.$("#viewState").val("1");
                    }
                }, 3000);
            }
        } else {

            $(zwIframeObj)[0].$("#officeFrameDiv").attr("style", "display:none;height:100%");
            _officeTransIframe.remove();
            $(zwIframeObj)[0].$("#officeFrameDiv").show();

            if (bodyType == '45') {
                $(zwIframeObj)[0].pdfFullSize();
                $(zwIframeObj)[0].ModifyContent();
            } else {

                $(zwIframeObj)[0].OfficeAPI.loadOffice(false);

                modifySuccess = $(zwIframeObj)[0].OfficeAPI.modifyContent(canSign);
                if (modifySuccess) {
                    $(zwIframeObj)[0].OfficeAPI.fullSize(true);
                    //设置正文为编辑状态
                    zwIframeObj.$("#viewState").val("1");
                }
            }
        }

    }
    summaryChange("content");

}

function updateContentPageDialog(summaryId, curContent) {

    var url = _ctxPath + "/collaboration/collaboration.do?method=updateContentPage&summaryId=" + summaryId;
    var title = $.i18n('common.detail.label.editContent');
    var width = $(getA8Top().document).width() - 100;
    var height = $(getA8Top().document).height() - 50;
    var _updateDialog = $.dialog({
        url: url,
        width: width,
        height: height,
        title: title,
        id: 'dialogUpdate',
        transParams: [window, curContent],
        targetWindow: getCtpTop(),
        closeParam: {
            show: true,
            autoClose: false,
            handler: function () {
                var confirm = $.confirm({
                    'msg': $.i18n('collaboration.common.confirmleave'),
                    ok_fn: function () {
                        _updateDialog.close();
                    },
                    cancel_fn: function () {
                    }
                });
                return false;
            }
        }
    });
}

function setFlagto1() {
    // 标记协同内容有变化，关闭页面时需进行判断
    summaryChange();
    document.getElementById("modifyFlag").value = "1";
}

function setFlagto0() {
    document.getElementById("modifyFlag").value = "0";
}

//多级会签
function addMoreNode() {

    var actionCode = "moreSign";

    if (!_operation_beforeChangeWorkflowFn(actionCode)) {
        return;
    }

    //adminType  formId  _accountId 后台获取
    var insertNodeParams = _operation_getChangeWorkflowParamFn(actionCode);
    multistageSign(insertNodeParams);
}

//加签
function addNode() {

    var actionCode = "AddNode";

    if (!_operation_beforeChangeWorkflowFn(actionCode)) {
        return;
    }

    //
    var insertNodeParams = _operation_getChangeWorkflowParamFn(actionCode);
    insertNode(insertNodeParams);
}


//当前会签
function currentAssign() {
    // 指定回退状态
    //if(isSpecifiesReturn())return;

    var assignNodeParams = _operation_getChangeWorkflowParamFn("JointSign");

    assignNode(assignNodeParams);
}

//减签
function deleteNodeFunc() {
    //js事件接口
    var idMap = {
        "summaryID": summaryId,
        "affairID": affairId
    }
    var sendDevelop = $.ctp.trigger('beforeDealdeletenode', idMap);
    if (!sendDevelop) {
        // $.alert($.i18n('collaboration.page.js.third.error.alert.js'));
        return;
    }

    var isProcessTemplate = "false";
    if (templateWorkflowId) {
        isProcessTemplate = "true";
    }
    deleteNode(wfItemId, wfProcessId,
        wfActivityId, currUserId,
        wfCaseId, refreshWorkflow,
        summaryId, affairId, isProcessTemplate, "true", "collaboration", templateCanDeleteNode);
}

//知会
function addInformFunc() {
    // 指定回退状态
    //if(isSpecifiesReturn())return;
    var informNodeParams = _operation_getChangeWorkflowParamFn("Infom");
    informNode(informNodeParams);
}

//修改附件
function modifyAttFunc() {
    // 指定回退状态
    if (isSpecifiesBack()) return;
    updateAtt(processId, summaryId);
}

//终止
function stepStopFunc(param) {
    //js事件接口
    var idMap = {
        "summaryID": summaryId,
        "affairID": affairId
    }
    var sendDevelop = $.ctp.trigger('beforeDealstepstop', idMap);
    if (!sendDevelop) {
        // $.alert($.i18n('collaboration.page.js.third.error.alert.js'));
        return;
    }

    disableOperation();
    if (!dealCommentTrue("stepStop")) {
        mainbody_callBack_failed();
        return;
    }
    if ($.content.callback.dealStepStop) {
        $.content.callback.dealStepStop(param);
    }
}

//撤销流程
function dealCancelFunc_deal(param) {
    //js事件接口
    var idMap = {
        "summaryID": summaryId,
        "affairID": affairId
    }
    var sendDevelop = $.ctp.trigger('beforeDealCancel', idMap);
    if (!sendDevelop) {
        // $.alert($.i18n('collaboration.page.js.third.error.alert.js'));
        return;
    }

    disableOperation();
    if ($.content.callback.dealCancel) {
        $.content.callback.dealCancel(param);
    }
}

//转发
function dealForwardFunc() {
    if ($.content.callback.dealForward) {
        $.content.callback.dealForward();
    }
}

//转事件
function transformFunc() {
    AddCalEvent("", affairId, collEnumKey, "", forwardEventSubject);
}

//督办设置开始
function superviseSetFunc() {
    if (isSpecifiesBack()) return;
    openSuperviseWindow('1', false, summaryId, templeteId, null, startMemberId);
}

//指定回退
function specifiesReturnFunc(param) {
    //js事件接口
    var idMap = {
        "summaryID": summaryId,
        "affairID": affairId
    }
    var sendDevelop = $.ctp.trigger('beforeDealspecifiesReturn', idMap);
    if (!sendDevelop) {
        // $.alert($.i18n('collaboration.page.js.third.error.alert.js'));
        return;
    }

    disableOperation();
    if ($.content.callback.specifiesReturnFunc) {
        $.content.callback.specifiesReturnFunc(param);
    }
}

//转办
function transferFunc() {
    if (!dealCommentTrue("comDeal")) {
        mainbody_callBack_failed()
        return;
    }
    var lockWorkflowRe = lockWorkflow(_contextProcessId, _currentUserId, 20);
    if (lockWorkflowRe[0] == "false") {
        //$.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + _summaryProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        mainbody_callBack_failed();
        return;
    }
    $.selectPeople({
        type: 'selectPeople',
        panels: 'Department,Outworker,JoinOrganization,transferFunc,BusinessDepartment',
        selectType: 'Member',
        minSize: 1,
        maxSize: 1,
        text: $.i18n('common.default.selectPeople.value'),
        hiddenPostOfDepartment: true,
        hiddenRoleOfDepartment: true,
        returnMemberWithDept: isExactMatchingMode,
        returnValueNeedType: false,
        showFlowTypeRadio: false,
        showMe: false,
        targetWindow: getCtpTop(),
        callback: function (res) {
            //自己不转给自己
            if (currUserId == res.value) {
                $.alert($.i18n('collaboration.summary.noTransferToSelf'));  //不能转发给自己！
                return;
            }
            disableOperation();
            $("#transferMemberId").val(res.value);

            if ($.content.callback.transferFunc) {
                $.content.callback.transferFunc(res.value);
            }
        }, canclecallback: function () {
            $.ctp.trigger("operationRollbackEvent", {});
            releaseWorkflowByAction(_contextProcessId, _currentUserId, 20);
        }
    });
}

// 是否是指定回退
function isSpecifiesReturn(type) {
    // type === 1表示被回退者不限制
    if (!type || type === 1) {
        if (subState == "15" || subState == "17") {
            $.alert($.i18n('collaboration.alert.CantModifyBecauseOfAppointStepBack'));
            mainbody_callBack_failed();
            return true;
        }
    }
    if (!type) {
        if (subState == "16" || subState == "17") {
            $.alert($.i18n('collaboration.alert.CantModifyBecauseOfAppointStepBack'));
            mainbody_callBack_failed();
            return true;
        }
    }
    return false;
}

//是否指定回退被回退者
function isSpecifiesBacked() {
    if (subState == "16") {
        $.alert($.i18n('collaboration.alert.CantModifyBecauseOfAppointStepBack'));
        mainbody_callBack_failed();
        return true;
    }
}

//是否指定回退者
function isSpecifiesBack() {
    if (subState == "15" || subState == "17") {
        $.alert($.i18n('collaboration.alert.CantModifyBecauseOfAppointStepBack'));
        mainbody_callBack_failed();
        return true;
    }
}

function comDealSubmit() {
    if (!dealCommentTrue("comDeal")) {
        mainbody_callBack_failed();
        return;
    }
    $("#pigeonholeValue").val("");
    if ($("#pigeonhole").size() > 0 && $("#pigeonhole")[0].checked) {
        var result = pigeonhole(null, null, null, null, null, "comDealSubmitPigeonCallback");
    } else {
        comDealSubmitAffterPigeon();
    }
}

/**
 * 提交归档回调函数
 * @returns
 */
function comDealSubmitPigeonCallback(result) {
    if (result && result === "cancel") {
        mainbody_callBack_failed();
        return;
    }
    $("#pigeonholeValue").val(result);
    comDealSubmitAffterPigeon();
}

function praiseToSummary() {
    if ($("#praiseToObj").hasClass("no_like_16")) {
        $("#praiseToObj").removeClass("no_like_16").removeClass("sy-praise").addClass("like_16").addClass("sy-praise-fill");
        $("#praiseToObj")[0].title = _praisedealCa;
        $("#praiseInput").val(1);
    } else {
        $("#praiseToObj").removeClass("like_16").removeClass("sy-praise-fill").addClass("no_like_16").addClass("sy-praise");
        $("#praiseToObj")[0].title = _praisedeal;
        $("#praiseInput").val(0);
    }
}

/**
 * comDealSubmit在归档后执行的方法
 * @returns
 */
function comDealSubmitAffterPigeon() {
    if ($.content.callback.dealSubmit) {
        $.content.callback.dealSubmit();
    }
}

// $(document).keyup(function(e){
//     var key =  e.which || e.keyCode;;
//     if(key == 27){
//         enableOperation();
//     }
// })
// $(document).bind('keydown', 'esc',function (evt){
//     enableOperation();
// });

//截取跟踪指定人长度
function trackName(res) {
    var userName = "";
    var nameSprit = "";
    if (res.obj.length > 0) {
        for (var co = 0; co < res.obj.length; co++) {
            userName += res.obj[co].name + ",";
        }
        userName = userName.substring(0, userName.length - 1);
        //只显示前三个名字
        nameSprit = userName.split(",");
        if (nameSprit.length > 3) {
            nameSprit = userName.split(",", 3);
        }
        $("#zdgzryName").attr("title", userName);
        var partText = document.getElementById("zdgzryName");
        partText.style.display = "";
        $("#zdgzryName").val(nameSprit + "...");
    }
}

//初始化editor控件 并且显示菜单
var initEditorAndShow = function (elId, defaultLoad) {
    $("#" + elId).css("height", 195);
    $("#editor_icon").removeClass("active_editor_icon");
    if (typeof (CKEDITOR) === "undefined") {
        showEditorFun(elId, defaultLoad);
    } else {
        var contentCkeditor = CKEDITOR.instances[elId];
        if (contentCkeditor == undefined) {
            showEditorFun(elId, defaultLoad);
        } else {
            //切换数据展现为textarea格式
            var content = getTextDealComment();
            $("#content_deal_comment").val(content);
            deleteEditor(elId);
        }
    }
}

var showEditorFun = function (elId, defaultLoad) {
    $("#editor_icon").addClass("active_editor_icon");
    var elObj$ = $("#" + elId);
    var tc = elObj$.attr("comp");
    var tj = $.parseJSON('{' + tc + '}');
    tj["backFun"] = function () {
        //切换数据展现为editor格式
        var content = $("#content_deal_comment").val();
        if (content == "") {
            content = richContent;
        }
        // 解决BUG OA-179844 特殊字符转义问题
        if (!defaultLoad) {
            content = escapeStringToHTML(content, true, true);
        }

        //计算需要替换的at符号
        replaceAtData = [];
        fnReplaceAtData(content, 0);

        //替换正文
        var newContent = fnReplaceComment(content);
        $("#content_deal_comment").initEditorContent(newContent);
    }
    $("#" + elId).showEditor(tj);
}

var replaceAtData = [];

//计算需要替换的at符号
function fnReplaceAtData(content, index) {
    if (content.length == 0) {
        return;
    }

    //寻找字符串中最早出现的at标记
    var minIndex = content.length, key = "";
    var tempAtUserData = [];
    if (hasContent) {
        tempAtUserData = getAllAtUserData();
    } else {
        tempAtUserData = atUserData;
    }
    for (var i = 0; i < tempAtUserData.length; i++) {
        var obj = tempAtUserData[i];
        var tempMinIndex = content.indexOf(obj.content);
        if (tempMinIndex != -1 && tempMinIndex < minIndex) {
            minIndex = tempMinIndex;
            key = obj.content;
        }
    }

    if (minIndex != content.length) {
        var atData = {
            content: key,
            beginIndex: index,
            endIndex: minIndex + index
        }
        replaceAtData.push(atData);
    }

    fnReplaceAtData(content.substr(minIndex + key.length), index + minIndex + key.length);
}

/**
 * 获取所有可at人员数组
 * @returns {Array}
 */
function getAllAtUserData() {
    var atMessageMembers = window.pushMessageToMembersArray;
    if (!atMessageMembers || atMessageMembers.length == 0) {
        atMessageMembers = window.callManagerMethod();
    }

    var assignNodeMember = window.findAssignNodeMember();
    atMessageMembers = atMessageMembers.concat(assignNodeMember);

    var atUserData = [];
    for (var i = 0; i < atMessageMembers.length; i++) {
        var obj = atMessageMembers[i];
        var tempUserData = {
            affairId: obj.id,
            memberId: obj.memberId,
            memberName: obj.name,
            content: "@" + obj.name
        }
        atUserData.push(tempUserData);
    }
    return atUserData;
}

//删除ckediotr对象
function deleteEditor(elId) {
    var editor2 = CKEDITOR.instances[elId];
    if (editor2) editor2.destroy(true);
}

//替换正文
function fnReplaceComment(content) {
    if (replaceAtData.length == 0) {
        return content;
    }

    var tempAtUserData = [];
    if (hasContent) {
        tempAtUserData = getAllAtUserData();
    } else {
        tempAtUserData = atUserData;
    }

    var newContent = "";
    for (var i = 0; i < replaceAtData.length; i++) {
        var obj = replaceAtData[i];
        newContent += content.substr(obj.beginIndex, obj.endIndex - obj.beginIndex);

        var _affairId, memberId;
        for (var j = 0; j < tempAtUserData.length; j++) {
            var obj1 = tempAtUserData[j];
            if (obj1.content == obj.content) {
                _affairId = obj1.affairId;
                memberId = obj1.memberId;
            }
        }

        newContent += "<button class=\"atwho-inserted\" checkaffair=\"" + affairId + "\" data-atwho-at-query=\"@\" data-atwho-at-validate=\"" + obj.content + "\" ";
        newContent += "atinfo=\"@{affairId:'" + _affairId + "',memberId:'" + memberId + "'}\" onclick=\"return false;\" contenteditable=\"false\" ";
        newContent += "style=\"color: rgb(49, 142, 217); font-size: 14px; border-width: 0px; padding: 0px; margin: 0px; background-color: transparent; background-image: none;\"> ";
        newContent += obj.content + "</button> ";

        if (i == replaceAtData.length - 1) {
            newContent += content.substr(obj.beginIndex + obj.endIndex + obj.content.length);
        }
    }
    return newContent;
}

//at页面
function showAtSelectWin() {
    //特殊操作，常用语和节点说明回写冲突
    if (templateId && templateId != "" && nodeDesc != "" && drafContent == "") {
        if ($(_ckIfameBody).text() == _nodeDesc) {
            $(_ckIfameBody).text("");
        }
    }
    var params = {
        "atAllMemberInput": $("#atAllMembers"),
        "callback": function (dataList) {
            if (dataList && dataList.length > 0) {
                var ckIframes = $("iframe", $("#cke_content_deal_comment"));
                var isAtAll = false;
                var isSetValue = true;
                for (var i = 0; i < dataList.length; i++) {
                    var obj = dataList[i];

                    if (obj.data.affairId == "All") {
                        isAtAll = true;
                    }
                    var userData = {
                        affairId: obj.data.affairId,
                        memberId: obj.data.memberId,
                        memberName: obj.data.memberName,
                        content: "@" + obj.data.memberName
                    }
                    atUserData.push(userData);

                    if (ckIframes.length == 0 && isSetValue) {
                        var content = $("#content_deal_comment").val();
                        if (isAtAll) {
                            isSetValue = false;
                            $("#content_deal_comment").val(content + obj.context + " ");
                        } else {
                            $("#content_deal_comment").val(content + obj.context + " ");
                        }
                    }
                }

                if (ckIframes.length > 0) {
                    var ifr = ckIframes[0];
                    var cDoc = ifr.contentDocument || iframe.contentWindow.document;
                    var ckIfameBody = cDoc.body;

                    if (ckIfameBody) {
                        var $body = $(ckIfameBody);
                        //editor聚焦
                        CKEDITOR.instances['content_deal_comment'].focus()
                        if (isAtAll) {
                            dataList = new Array();
                            var atAllData = {
                                "context": "@All",
                                "data": {
                                    "affairId": "All",
                                    "atwho-at": "@",
                                    "memberId": "All",
                                    "memberName": "All"
                                }
                            };

                            dataList.push(atAllData);
                        }
                        $body.atwho('insertNoSelect', dataList);
                    }
                }
            }
        }
    }
    pushMessage4At(params);
}

function submitClickFunc() {
    if (!_hasExecuteContentLoad) {
        return;
    }


    var trackMembersObj = document.getElementById("trackRange_members");
    if (trackMembersObj && trackMembersObj.checked) {
        if (document.getElementById("zdgzry").value == "") {
            $.alert(_trackTitle);
            mainbody_callBack_failed();
            return;
        }
    }
    comDealSubmit();
}


function dealDoZcdbFunc() {
    if (!_hasExecuteContentLoad) {
        return;
    }
    //js事件接口
    var idMap = {
        "summaryID": affairId,
        "affairID": summaryId
    }
    var sendDevelop = $.ctp.trigger('beforeDealSaveWait', idMap);
    if (!sendDevelop) {
        //$.alert($.i18n('collaboration.page.js.third.error.alert.js'));
        return;
    }
    //将'暂存待办'按钮置为不可用
    disableOperation();
    var canTempPendingResult = canTemporaryPending(workItemId);
    if (canTempPendingResult[0] == "false") {
        $.alert(canTempPendingResult[1]);
        mainbody_callBack_failed();
        return;
    }
    var lockWorkflowRe = checkWorkflowLock(wfProcessId, currUserId, 14);
    if (lockWorkflowRe[0] == "false") {
        //$.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + wfProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        mainbody_callBack_failed();
        return;
    }
    if ($.content.callback.dealSaveWait) {
        var hasLoad = $("#zwOfficeIframe").attr("hasLoad"); // 获取frame中的hasLoad值
        if (hasLoad == "true") {// 已套红直接提交
            //保存office
            var issave = $("#zwOfficeIframe")[0].contentWindow.OfficeAPI.saveOffice();
            if (!issave) {
                return;
            }
        }
        $.content.callback.dealSaveWait();
    }
}


function dealDoSaveDraft() {
    if ($.content.callback.dealSaveDraft) {
        $.content.callback.dealSaveDraft();
    }
}

function dealDoVochPass() {
    var lockWorkflowRe = checkWorkflowLock(wfProcessId, currUserId, 14);
    if (lockWorkflowRe[0] == "false") {
        //$.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + wfProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        return;
    }

    if (!dealCommentTrue("vouchPass")) {
        return;
    }
    if ($("#pigeonhole").size() > 0 && $("#pigeonhole")[0].checked) {
        var result = pigeonhole(null, null, null, null, null, "vouchPassPigeonCallback");
    } else {
        vouchPassAffterPigeon();
    }
}


function dealDoVochNotPass() {
    var lockWorkflowRe = checkWorkflowLock(wfProcessId, currUserId, 9);
    if (lockWorkflowRe[0] == "false") {
        $.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + wfProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        return;
    }

    if (!dealCommentTrue("vouchNotPass")) {
        return;
    }
    if ($.content.callback.vouchNotPass) {
        $.content.callback.vouchNotPass();
    }
}

function dealDoAuditPass() {
    var lockWorkflowRe = checkWorkflowLock(wfProcessId, currUserId, 14);
    if (lockWorkflowRe[0] == "false") {
        //$.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + wfProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        return;
    }

    if (!dealCommentTrue("auditPass")) {
        return;
    }
    if ($("#pigeonhole").size() > 0 && $("#pigeonhole")[0].checked) {
        var result = pigeonhole(null, null, null, null, null, "auditPassPigeonCallback");
    } else {
        auditPassAffterPigeon();
    }

}


function dealDoAuditNotPass() {
    var lockWorkflowRe = checkWorkflowLock(wfProcessId, currUserId, 9);
    if (lockWorkflowRe[0] == "false") {
        //$.alert(lockWorkflowRe[1]);
        var dialog = $.dialog({
            html: '<div class="error_msg">' + lockWorkflowRe[1] + '</div>',
            bottomHTML: '<a href="#" onclick="reportProblem(\'' + wfProcessId + '\',\'' + _summaryItemId + '\',\'collaboration\',\'235\')">' + $.i18n('workflow.bug.encounter.problems.js') + '</a>',
            width: 400,
            height: 100,
            title: $.i18n("workflow.bug.alert.js"),//错误提示
            targetWindow: getCtpTop(),
            buttons: [{
                text: $.i18n('common.button.close.label'),//取消按钮
                handler: function () {
                    dialog.close();
                }
            }]
        });
        return;
    }

    if (!dealCommentTrue("auditNotPass")) {
        return;
    }
    if ($.content.callback.auditNotPass) {
        $.content.callback.auditNotPass();
    }
}


function trackPart() {
    $("#trackRange_members_textbox").show();
    $.selectPeople({
        type: 'selectPeople'
        , panels: 'Department,Team,Post,Outworker,RelatePeople,JoinOrganization,BusinessDepartment'
        , selectType: 'Member,OrgMetadataTag'
        , text: $.i18n('common.default.selectPeople.value')
        , hiddenPostOfDepartment: true
        , hiddenRoleOfDepartment: true
        , showFlowTypeRadio: false
        , returnValueNeedType: false
        , params: {
            value: trackMember
        }
        , targetWindow: window.top
        , callback: function (res) {
            if (res && res.obj && res.obj.length > 0) {
                var _val = "";
                for (var i = 0; i < res.obj.length; i++) {
                    if (res.obj[i].type == "OrgMetadataTag") {
                        _val += "OrgMetadataTag|" + res.obj[i].id + ",";
                    } else {
                        _val += res.obj[i].id + ",";
                    }
                }
                $("#zdgzry").val(_val);
                $("#trackRange_members_textbox").show().val(res.text).attr("title", res.text);
                var memberArray = res.value.split(',');
                var memStr = "";
                for (var i = 0; i < memberArray.length; i++) {
                    memStr += "Member|" + memberArray[i] + ","
                }
                if (memStr.length > 0) {
                    memStr = memStr.substring(0, memStr.length - 1);
                    trackMember = memStr;
                }
                trackName(res);
            } else {

            }
        }
    });
}


function showHideFunc() {
    if ($(".default_handle").css("display") == "block") {
        $(".default_handle").hide();
        $(".showHide").find(".ico16").removeClass("arrow_2_t").addClass("arrow_2_b");
        $(".showHide").find(".color_blue").text($.i18n("common.relate.open.label"));
    } else {
        $(".default_handle").show();
        $(".showHide").find(".ico16").removeClass("arrow_2_b").addClass("arrow_2_t");
        $(".showHide").find(".color_blue").text($.i18n("common.retract.label"));
    }
}

var textAreaplaceHolder = '';

function onBlurPlaceHolder(id) {
    var value = textAreaplaceHolder;
    if (value) {
        value = value.replace(/\r\n/g, "&#10");
    }
    $("#" + id).attr("placeholder", value);
}

function onFocusPlaceHolder(id) {
    textAreaplaceHolder = $("#" + id).attr("placeholder");
    $("#" + id).attr("placeholder", '');
}

//初始化态度的tab页
function initAttitudeTabDiv() {

    var radioAry = [];
    $("#attitudeInfo").find("input[type='radio']").each(function (index, item) {
        radioAry.push({
            id: $(item).attr("id"),
            code: $(item).attr("code"),
            text: $(item).parent().text(),
            checked: $(item).prop("checked")
        });
    })
    if (radioAry.length === 0) {
        $("#attitudeTabDiv").hide();
    } else {
        $("#attitudeTabDiv").show();
        $("#attitudeInfo").hide();
    }
    var htmls = [];
    $.each(radioAry, function (index, item) {
        var activeHtml = item["checked"] ? 'active' : '';
        var getActiveState = item["checked"] ? 'Active' : '';
        htmls.push(" <div class=\"tab " + activeHtml + "\" tabId='" + item["code"] + "'>\n" +
            "                <div class=\"content\">\n" +
            "                    <span class=\"syIcon " + getAttitudeImg(item["code"] + getActiveState) + "\"></span>\n" +
            "                    <span class=\"label\">" + item["text"] + "</span>\n" +
            "                </div>\n" +
            "            </div>");
    })
    $("#attitudeTabDiv").html(htmls.join("\n"));
    $("#attitudeTabDiv").find(".tab").css("width", Math.floor(100 / radioAry.length) + "%");
    //点击相应的tab 实现radiobox的选中操作
    $("#attitudeTabDiv").find(".tab").click(function () {
        $("#attitudeInfo").find("input[type='radio']").prop("checked", false);
        $("#attitudeTabDiv").find(".active").each(function () {
            $(this).find(".syIcon").attr("class", "syIcon " + getAttitudeImg($(this).attr("tabId")));
        })
        $("#attitudeTabDiv").find(".active").removeClass("active");
        $(this).addClass("active");
        $(this).find(".syIcon").attr("class", "syIcon " + getAttitudeImg($(this).attr("tabId") + "Active"));
        //选中态度
        $("#attitudeInfo").find("input[code='" + $(this).attr("tabId") + "']").prop("checked", true);
    })
}

//获取态度的图片
function getAttitudeImg(code) {
    var imgMap = {
        "haveReadActive": "sy-read",
        "disagreeActive": "sy-delete-x",
        "agreeActive": "sy-hook-plane",
        "haveRead": "sy-read-line",
        "disagree": "sy-disagree-line",
        "agree": "sy-agree-line"
    };
    if (imgMap[code] != null) {
        return imgMap[code];
    } else {
        return "sy-disagree-line";
    }
}

$(document).ready(function () {
    initAttitudeTabDiv();
})