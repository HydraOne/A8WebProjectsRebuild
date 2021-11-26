package com.seeyon.apps.work.work03.config;

import com.seeyon.ctp.common.i18n.ResourceUtil;
import com.seeyon.ctp.portal.section.BaseSectionImpl;
import com.seeyon.ctp.portal.section.templete.BaseSectionTemplete;
import com.seeyon.ctp.portal.section.templete.HtmlTemplete;
import com.seeyon.ctp.util.Strings;

import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/27 - 15:59
 * @Description 监管合同栏目的配置文件
 */
public class ContractSupervisionColumnConfiguration extends BaseSectionImpl {
    @Override
    public String getId() {
        //栏目id，必须与spring配置文件中的ID相同，如果是原栏目改造，尽量与原栏目保持一致
        return "ContractSupervisionColumnConfiguration";
    }
    //栏目名称配置，必须实现国际化，在栏目属性columnsName中储存
    @Override
    public String getName(Map<String, String> map) {
        String name = map.get("columnsName");
        if (Strings.isBlank(name)) {
            return ResourceUtil.getString("common.button.htjg.label");
        }else {
            return name;
        }
    }
    //需要展现栏目条数时填写
    @Override
    public Integer getTotal(Map<String, String> map) {
        return null;
    }
    //合同图标不需要实现
    @Override
    public String getIcon() {
        return null;
    }

    @Override
    public BaseSectionTemplete projection(Map<String, String> map) {

        String sectionCount = "5";
        if (map.get("sectionCount") != null) {
            sectionCount = map.get("sectionCount");
        }
        String sectionHeight = "200";
        if (map.get("sectionHeight") != null) {
            sectionHeight = map.get("sectionHeight");
        }
        HtmlTemplete ht = new HtmlTemplete();

        //访问controller的url 和相关的方法
        //内嵌框架请求跳转到写好的jsp中
        String sb = "<div style='width:100%;overflow-x:scroll;'>"
                + "<iframe style='width:100%;height:" +
                sectionHeight + "px;' frameborder='no' border='0' " +
                "src='/seeyon/ContractSupervisionColumnController.do?" +
                "method=loadPage&" +
                "sectionCount=" +
                sectionCount +
                "'>" +
                "</iframe></div>";
        ht.setHeight(sectionHeight);
        ht.setHtml(sb);
        ht.setModel(HtmlTemplete.ModelType.inner);
        ht.setShowBottomButton(true);
        return ht;
    }
}
