package com.seeyon.apps.work.work03.config;


import java.util.Map;




import com.seeyon.ctp.common.i18n.ResourceUtil;
import com.seeyon.ctp.portal.section.BaseSectionImpl;

import com.seeyon.ctp.portal.section.templete.BaseSectionTemplete;
import com.seeyon.ctp.portal.section.templete.HtmlTemplete;

import com.seeyon.ctp.util.Strings;


/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 合同栏目控件类
 */
public class ContractSection extends BaseSectionImpl {


	@Override
	public String getIcon() {
		// 栏目图标，暂时不需要实现
		return null;
	}

	@Override
	public String getId() {
		// 栏目id，必须与spring配置文件中的id相同；如果是原栏目改造，请尽量保持与原栏目ID一致
		return "contractSection";
	}

	@Override
	public String getName(Map<String, String> map) {
		// 栏目显示的名字，必须实现国际化，在栏目属性的“columnsName”中存储
		String name = map.get("columnsName");
		if(Strings.isBlank(name)){
            return ResourceUtil.getString("common.button.htjg.label");
        }else{
            return name;
        }
	}

	@Override
	public Integer getTotal(Map<String, String> arg0) {
		// 栏目需要展示总数据条数时重写
		return null;
	}

	@Override
	public BaseSectionTemplete projection(Map<String, String> map) {
		// 栏目解析主方法
		String sectionCount="5";
		if(map.get("sectionCount") != null){
			sectionCount = map.get("sectionCount");
		}
		
		String sectionHeight="265";
		if(map.get("sectionHeight") != null){
			sectionHeight = map.get("sectionHeight");
		}
		HtmlTemplete ht = new HtmlTemplete();
		String sb = "<div style='width:100%;overflow-x:scroll;'>"
                + "<iframe style='width:100%;height:" +
                sectionHeight + "px;' frameborder='no' border='0' " +
                "src='/seeyon/regulatoryContractController.do?" +
                "method=showPage&" +
                "sectionCount=" +
                sectionCount +
                "'>" +
                "</iframe></div>";
		//设置栏目高度
		ht.setHeight(sectionHeight);
		//设置栏目内容
		ht.setHtml(sb);
		ht.setModel(HtmlTemplete.ModelType.inner);
		ht.setShowBottomButton(true);
		
		return ht;
	}
}