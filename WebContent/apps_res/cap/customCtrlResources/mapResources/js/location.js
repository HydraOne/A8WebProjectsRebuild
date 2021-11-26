/**
 * 闭包开发模式，不会污染产品本身，作用于当前命名空间
 * factory是vue的工厂函数
 * @param factory
 * @returns
 */
(function (factory) {
    var nameSpace = 'field_4793689415239855350';
    if (!window[nameSpace]) {
        var Builder = factory();	// 生产自定义控件-》调用构造函数
        window[nameSpace] = {
            instance: {}
        };
        window[nameSpace].test = function (options) {
            window[nameSpace].instance[options.privateId] = new Builder(options);
        };
        window[nameSpace].isNotNull = function (obj) {
            return true;
        };
    }
})(function () {
    /**
     * 构造函数
     * 代码完全自定义，渲染以及事件等由开发自己实现
     * @param options
     * @constructor
     */
    function App(options) {
        const self = this;
        // 初始化参数
        self.initParams(options);
        // 初始化dom
        self.initDom();
        // 事件
        self.events();
    }
    
    // 扩展当前对象的方法
    App.prototype = {
        initParams: function (options) {
            const self = this;
            self.adaptation = options.adaptation;	// adaptation 核心参数，自定义控件相关方法都需要使用
            self.adaptation.formMessage = options.formMessage;
            self.privateId = options.privateId;		// 当前自定义控件的id
            self.messageObj = options.getData;		// 当前自定义控件的值
            self.preUrl = options.url_prefix;		// 当前自定义控件的相对路径
        },
        initDom: function () {
            var self = this;
//            dynamicLoading.js("http://api.map.baidu.com/getscript?v=2.0&ak=59xkhaYrPrauvvubXjGWZKqGiZi5amKP&services=&t=20190123111209");
            self.appendChildDom();
            //dynamicLoading.js("http://api.map.baidu.com/api?v=2.0&ak=59xkhaYrPrauvvubXjGWZKqGiZi5amKP");
        },
        events: function () {
            var self = this;
            // 监听是否数据刷新
            self.adaptation.ObserverEvent.listen('Event' + self.privateId, function () {
                self.messageObj = self.adaptation.childrenGetData(self.privateId);
                self.appendChildDom();
            });
        },
        appendChildDom: function () {
            const self = this;
            let showHTML = '';
            const display = self.messageObj.display.escapeHTML();
            if (display !== "") {
            	showHTML += '<section class="cap4-people is-one ">'
            		+'<div class="cap4-people__left">'+display+'</div>'
            		+'<div class="cap4-people__right">';
            	console.log(display+"11111111111111");
            } else {
            	showHTML += '<div>';
            }
            showHTML += '<div class="cap4-people__cnt" id="editDiv_'+self.privateId+'" style="display:block;">'
            	+'<div class="cap4-people__text" id="show_'+self.privateId+'">'+self.messageObj.showValue+'</div>'
            	+'<div class="cap4-people__picker" id="click_'+self.privateId+'"';
            
            showHTML += '><input type=button value="查看"></div></div>';
            showHTML += "<div id='allmap'></div>";
            showHTML += "</div></section>";
            /*var div = document.getElementById(privateId);
            div.innerHTML = showHTML;*/
            
            document.querySelector('#' + self.privateId).innerHTML = showHTML;
            document.querySelector('#click_' + self.privateId).addEventListener('click', function() {
        		  self.location(self.privateId, self.messageObj, self.adaptation);
    	  	});
        },
        location: function (privateId, messageObj, adaptation) {
            const data = csdk.core.getFormData();
                //*********************自定义控件  李丹 start ***********************************
                //field0004合同名称，formmain_0057这是表名，field0064本次付款总额为
            const htNameValue = data.formmains.formmain_0057.field0004.value;
            const fkMoneyValue = data.formmains.formmain_0057.field0064.value;
            let message;
            if(htNameValue!=="" && fkMoneyValue!==""){
            	message = "<" + htNameValue + ">-本次付款总额为-<" + fkMoneyValue + "元>";
            }else{
            	alert("合同编号及付款金额不能为空！");
            }
            //*********************自定义控件  李丹 end ***********************************

                // 回填数据
                messageObj = adaptation.childrenGetData(privateId);
		    	messageObj.showValue = message;
		    	messageObj.value = message;
		    	messageObj.valueId = message;
		    	adaptation.childrenSetData(messageObj, privateId);
		    	
		    	// 回填其他字段数据
		    	var arr = address.split("|");
		    	address = arr[0];
		    	var jingwei = arr[1].split(",");
        		backFill(value, jingwei[0], jingwei[1], privateId, messageObj, adaptation)
//        	}else{
//        		alert("数据id为空")
//        	}
        }
    }
    
    function backFill(address, jingdu, weidu, privateId, messageObj, adaptation) {
    	var param = new Object();
    	param.masterId = messageObj.formdata.content.contentDataId;
    	param.address = address;
    	param.jingdu = jingdu;
    	param.weidu = weidu;
    	$.ajax({
            type: "POST",
            url : '/seeyon/rest/cap4/map',
            data : JSON.stringify(param),
            dataType: "json",
            contentType : 'application/json;charset=UTF-8',
            success: function (res) {
            	// 后台解析数据后  将数据填写到表单中
            	if(res.code == 0) {
            		var backfill = {};
            		backfill.tableName = adaptation.formMessage.tableName;
            		// 回填主表
            		backfill.tableCategory = 'formmain';
            		// 后台组装的data数据
            		backfill.updateData = res.data;
            		adaptation.backfillFormControlData(backfill, privateId);
            	} else {
            		// 报错
            		$.alert(res.message);
            	}
            },
            complete: function () {
            },
            error: function (e) {
                top.$.error(e.responseText);
            }
        });
    }

    var dynamicLoading = {
        css: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        }
    }
    return App;
});