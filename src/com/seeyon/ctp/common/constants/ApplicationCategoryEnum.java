package com.seeyon.ctp.common.constants;

/**
 * <pre>
 * 定义系统中所包含的应用下的子应用
 *
 * 一、枚举定义规范
 * 1、名称纯字母，不允许出现下划线
 * 2、key必须全局唯一
 *
 * 二、国际化要求：需要显示他对应的名称，这样来做：
 * 1、在com.seeyon.v3x.common.resources.i18n.SeeyonCommonResources定义显示名称
 *    key的命名规范是 application.${key}.label; 如：application.26.label 表示"综合办公"
 * 2、在common\js\i18n\zh-cn.js定义显示名称<br>
 *    key的命名规范是 application_${key}_label; 如：application_26_label 表示"综合办公"
 *
 * 三、无序，禁止使用 {@link #ordinal()}
 * </pre>
 *
 * @author <a href="mailto:tanmf@seeyon.com">Tanmf</a>
 * @version 1.0 2006-11-3
 */
public enum ApplicationCategoryEnum {

    global(0), // 全局
    collaboration(1), // 协同应用
    form(2), // 表单
    doc(3), // 知识管理
    edoc(4), // 公文
    plan(5), // 计划
    meeting(6), // 会议
    bulletin(7), // 公告
    news(8), // 新闻
    bbs(9), // 讨论
    inquiry(10), // 调查
    calendar(11), // 日程事件
    mail(12), // 邮件
    organization(13), // 组织模型
    project(14), // 项目
    relateMember(15), // 关联人员
    exchange(16), // 交换
    hr(17), // 人力资源
    blog(18), // 博客
    edocSend(19), // 发文
    edocRec(20), // 收文
    edocSign(21), // 签报
    exSend(22), // 待发送公文
    exSign(23), // 待签收公文
    edocRegister(24), // 待登记公文
    communication(25), // 在线交流
    office(26), // 综合办公
    agent(27), // 代理设置
    modifyPassword(28), // 密码修改
    meetingroom(29), // 会议室
    taskManage(30), // 任务管理
    guestbook(31), // 留言板
    info(32), // 信息报 送
    infoStat(33), // 信息报送统计
    edocRecDistribute(34), // 收文分发
    notice(35), // 公示板
    attendance(36), // 签到
    mobileAppMgrForHTML5(37), // 移动应用接入-html5应用包
    sapPlugin(38), // sap插件
    ThirdPartyIntegration(39), // 第三方整合
    show(40), // 大秀
    wfanalysis(41), // 流程绩效
    behavioranalysis(42), // 行为绩效，足迹(cmp)
    biz(43), // 业务生成器(cmp)
    commons(44), // 公共资源(cmp)
    workflow(45), // 工作流(cmp)
    // footprint(46)足迹(cmp)已合并到行为绩效中
    unflowform(47), // 无流程表单(cmp)
    formqueyreport(48), // 表单查询统计(cmp)
    cmp(49), // cmp
    dee(51), // dee模块(cmp)
    application(52), // 应用模块(m3)
    m3commons(53), // 公共资源(m3)
    login(54), // 登陆(m3)
    message(55), // 消息模块(m3)
    my(56), // 我的模块(m3)
    search(57), // 搜索模块(m3)
    todo(58), // 待办模块(m3)
    fullsearch(59), // 全文检索(m3)
    mycollection(60), // 我的收藏(m3)
    uc(61), // UC(m3)
    addressbook(62), // 通讯录(m3)
    seeyonreport(63), // 帆软报表
    statusRemind(64), // 状态提醒
    portal(65), // H5门户(m3)
    cap4Form(66), // cap4表单
    cap4biz(67), // 应用管理
    fileReport(68), // 文件报表
    excelreport(69), // excel报表
    vreport(70), // 报表中心(m3)
    memorabilia(71), // 大事记
    ai(72), // AI智能插件
    querybtn(73), // cap4自定义控件-查询统计按钮
    invoice(74), // cap4自定义控件电子发票
    formcreditqueryctrl(75), // cap4自定义控件-企业征信查询
    ocrbtn(76), // cap4自定义控件-ocr图像识别（身份证、银行卡、名片、营业执照、组织机构代码证、税务登记证）
    formwordinjectionctrl(77), // 表单自定义控件-word套红控件
    formhandwritectrl(78), xiaoz(79), // 小智(m3)
    capqrcode(80), // 二维码(cap)

    templateApprove(81), // 模板审批
    cap4report(82), // cap4统计
    cap4business(83), // cap4业务包门户
    cap4query(84), // cap4查询
    cap4unflow(85), // cap4无流程列表
    cwidgetnewform(86), // cap4自定义控件 custom widget new form 新建表单
    cwidgetviewform(87), // cap4自定义控件 custom widget view form 查看表单
    capextend(88), // cap4扩展控件
    ctripcityform(89), // 携程控件
    inspect(90), // cmp 体检
    cap4todolist(91), // cap4待办
    trustdo(92), // 信任度
    filemanage(93), // M3文件管理
    leaderagenda(94), // 目标管理-领导行程
    wea(95), // Work efficiency analysis工作效率分析【业务效能】
    meetingsummary(96), // 会议纪要
    nlpbtn(97), // cap4自定义控件-nlp文本提取
    customCtrlResources(98), // 移动端自定义控件的资源文件
    menu(99), // 系统菜单
    template(101), // 系统模板
    workchangectrl(102), // 表单自定义控件-工作交接 移动端展示
    meetingComponent(103), // 快速会议
    formrichtextctrl(104), // 表单自定义控件-富文本

    // G6-V5.7--表单公文分类 400-499预留
    govdoc(400), // 新公文枚举，专用于新公文的全文检索，其他地方请用edoc和subApp
    govdocSend(401), // 表单公文-发文
    govdocRec(402), // 表单公文-收文
    govdocExchange(403), // 表单公文-交换公文
    govdocSign(404), // 表单公文-签报
    groupSpace(100), // 群空间(致信)
    simulation(998), // 流程仿真
    stepBackData(999), // 回退数据虚拟类型
    ctripIntegratedPlugin(105), // 携程集成插件
    econtract(106), // 电子合同
    //error
    register(55);

    // 标识 用于数据库存储
    private int key;

    ApplicationCategoryEnum(int key) {
        this.key = key;
    }

    public int getKey() {
        return this.key;
    }

    public int key() {
        return this.key;
    }

    /**
     * 根据key得到枚举类型
     *
     * @param key
     * @return
     */
    public static ApplicationCategoryEnum valueOf(int key) {
        ApplicationCategoryEnum[] enums = ApplicationCategoryEnum.values();

        if (enums != null) {
            for (ApplicationCategoryEnum enum1 : enums) {
                if (enum1.key() == key) {
                    return enum1;
                }
            }
        }

        return null;
    }

    /**
     * xiesw add 根据name获取Enum
     *
     * @param name
     * @return
     */
    public static ApplicationCategoryEnum getEnumByName(String name) {
        ApplicationCategoryEnum[] enums = ApplicationCategoryEnum.values();

        if (enums != null) {
            for (ApplicationCategoryEnum result : enums) {
                if (result.name().equals(name)) {
                    return result;
                }
            }
        }

        return null;
    }

}