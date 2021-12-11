package com.seeyon.ctp.rest.resources;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.content.mainbody.MainbodyManager;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.common.po.content.CtpContentAll;
import com.seeyon.ctp.form.modules.engin.base.formData.FormDataDAO;
import org.apache.commons.logging.Log;
import www.seeyon.com.utils.UUIDUtil;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.*;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/29 - 13:12
 * @Description 合同监管的rest类
 */
@Path("ContractFormResource")
@Consumes("application/json")
@Produces("application/json")
public class ContractFormResource extends BaseResource {
    //日志
    private static final Log log = CtpLogFactory.getLog(ContractFormResource.class);
    //注入cap4
    private final CAP4FormManager cap4FormManager = (CAP4FormManager) AppContext.getBean("cap4FormManager");
    //注入formDateDao
    private final FormDataDAO formDataDAO = (FormDataDAO) AppContext.getBean("formDataDAO");
    //注入主表manager
    private final MainbodyManager mainbodyManager = (MainbodyManager) AppContext.getBean("ctpMainbodyManager");

    //自定义的每个方法接口路径
    @POST
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    public void insert(Map<String, Object> formJsonString) throws BusinessException {

        //UUID作为关联主键
        long uuid = UUIDUtil.getUUIDLong();

        //存到数据库底表（合同底表）
        String formCode = CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile;

        //获取FormBean
        FormBean formByFormCode = cap4FormManager.getFormByFormCode(formCode);

        //初始化数据库表名
        String tableName = null;

        if (formByFormCode != null) {

            //主表
            FormTableBean masterTableBean = formByFormCode.getMasterTableBean();

            if (masterTableBean != null) {
                //表名
                tableName = masterTableBean.getTableName();
            /**formmain_0029  **/
                List<Map<String, Object>> listMap = new ArrayList<>();

                //将数据库字段和值存入map
                Map<String, Object> sqlMap = new HashMap<>();
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("经办人").getName(), formJsonString.get("经办人"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("经办部门").getName(), formJsonString.get("经办部门"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("申请日期").getName(), formJsonString.get("申请日期"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("合同编号").getName(), formJsonString.get("合同编号"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("合同名称").getName(), formJsonString.get("合同名称"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("合同金额").getName(), formJsonString.get("合同金额"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("累计已付金额").getName(), formJsonString.get("累计已付金额"));
                sqlMap.put(masterTableBean.getFieldBeanByDisplay("单点登录").getName(), formJsonString.get("单点登录"));
                sqlMap.put("id", uuid);
                sqlMap.put("state", "1");
                sqlMap.put("start_member_id", formJsonString.get("经办人"));
                sqlMap.put("start_date", new Date());
                sqlMap.put("approve_member_id", formJsonString.get("经办人"));
                sqlMap.put("approve_date", new Date());
                sqlMap.put("sort", 2);
                sqlMap.put("modify_date", new Date());
                listMap.add(sqlMap);

                //设置CtpContentAll表关系（关联）固定写法不可修改
                CtpContentAll contentAll = new CtpContentAll();

                contentAll.setContentDataId(uuid);
                contentAll.setModuleId(uuid);
                contentAll.setModuleTemplateId(formByFormCode.getMasterTableBean().getId());
                contentAll.setNewId();
                contentAll.setModuleType(42);
                contentAll.setContentType(20);
                contentAll.setSort(0);
                contentAll.setModifyId(-1L);
                contentAll.setCreateDate(new Date());
                contentAll.setModifyDate(new Date());
                contentAll.setContentTemplateId(formByFormCode.getMasterTableBean().getFormId());
                contentAll.setTitle("保存合同至底单");
                //存入表关系
                mainbodyManager.saveOrUpdateContentAll(contentAll);
                //存入数据库
                try {
                    //表名，listMap的数据集
                    formDataDAO.insertData(tableName, listMap, false);
                    log.info(listMap);
                } catch (BusinessException | SQLException e) {
                    log.error(e);//error
                }
            }
        }
    }
}
