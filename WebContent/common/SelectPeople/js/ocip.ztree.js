/**
 * 发版的代码做了修改,OCIP使用第三方的源码
 */
$.fn.zTree._z.view.asyncNode=function(setting, node, isSilent, callback) {
  
  var tools = $.fn.zTree._z.tools;
  var consts = $.fn.zTree.consts;
  var view = $.fn.zTree._z.view;
  
  var i, l;
  if (node && !node.isParent) {
    tools.apply(callback);
    return false;
  } else if (node && node.isAjaxing) {
    return false;
  } else if (tools.apply(setting.callback.beforeAsync, [setting.treeId, node], true) == false) {
    tools.apply(callback);
    return false;
  }
  if (node) {
    node.isAjaxing = true;
    var icoObj = $("#" + node.tId + consts.id.ICON);
    icoObj.attr({"style":"", "class":"ico_loading"});
  }

  var isJson = (setting.async.contentType == "application/json"), tmpParam = isJson ? "{" : "", jTemp="";
  for (i = 0, l = setting.async.autoParam.length; node && i < l; i++) {
    var pKey = setting.async.autoParam[i].split("="), spKey = pKey;
    if (pKey.length>1) {
      spKey = pKey[1];
      pKey = pKey[0];
    }
    if (isJson) {
      jTemp = (typeof node[pKey] == "string") ? '"' : '';
      tmpParam += '"' + spKey + ('":' + jTemp + node[pKey]).replace(/'/g,'\\\'') + jTemp + ',';
    } else {
      tmpParam += spKey + ("=" + node[pKey]).replace(/&/g,'%26') + "&";
    }
  }
  if (tools.isArray(setting.async.otherParam)) {
    for (i = 0, l = setting.async.otherParam.length; i < l; i += 2) {
      if (isJson) {
        jTemp = (typeof setting.async.otherParam[i + 1] == "string") ? '"' : '';
        tmpParam += '"' + setting.async.otherParam[i] + ('":' + jTemp + setting.async.otherParam[i + 1]).replace(/'/g,'\\\'') + jTemp + ",";
      } else {
        tmpParam += setting.async.otherParam[i] + ("=" + setting.async.otherParam[i + 1]).replace(/&/g,'%26') + "&";
      }
    }
  } else {
    for (var p in setting.async.otherParam) {
      if (isJson) {
        jTemp = (typeof setting.async.otherParam[p] == "string") ? '"' : '';
        tmpParam += '"' + p + ('":' + jTemp + setting.async.otherParam[p]).replace(/'/g,'\\\'') + jTemp + ",";
      } else {
        tmpParam += p + ("=" + setting.async.otherParam[p]).replace(/&/g,'%26') + "&";
      }
    }
  }
  if (tmpParam.length > 1) tmpParam = tmpParam.substring(0, tmpParam.length-1);
  if (isJson) tmpParam += "}";
  

	  var success = function(msg) {
		var newNodes = [];
		try {
			if (!msg || msg.length == 0) {
				newNodes = [];
			} else if (typeof msg == "string") {
				newNodes = eval("(" + msg + ")");
			} else {
				newNodes = msg;
			}
		} catch (err) {
		}

		if (node) {
			node.isAjaxing = null;
			node.zAsync = true;
		}
		view.setNodeLineIcos(setting, node);
		if (newNodes && newNodes != "") {
			newNodes = tools.apply(setting.async.dataFilter, [ setting.treeId,
					node, newNodes ], newNodes);
			view.addNodes(setting, node, tools.clone(newNodes), !!isSilent);
		} else {
			view.addNodes(setting, node, [], !!isSilent);
		}
		setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [ setting.treeId,
				node, msg ]);
		tools.apply(callback);
	};
  
	if (typeof setting.async.seeyonAjax == 'function') {
		setting.async.seeyonAjax(setting.treeId, node, {success : success, complete:function(){node.isAjaxing = null;} });
	}else{
		 $.ajax({
			    contentType: setting.async.contentType,
			    type: setting.async.type,
			    url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url),
			    data: tmpParam,
			    dataType: setting.async.dataType,
			    success: success,
			    error: function(XMLHttpRequest, textStatus, errorThrown) {
			      view.setNodeLineIcos(setting, node);
			      if (node) node.isAjaxing = null;
			      setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, XMLHttpRequest, textStatus, errorThrown]);
			    }
			  });
	}
  return true;
};