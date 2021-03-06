const RandExp = require('randexp');

module.exports = class extends require('../base') {
    constructor() {
        super();
        this._collection = [
            "黑龙江路", "十梅庵街", "遵义路", "湘潭街", "仙山街", "仙山东路", "白沙河路", 
            "机场路", "民航街", "长城南路", "礼阳路", "风岗街", "中川路", "兴阳路", "文阳街", 
            "绣城路", "崇阳街", "华城路", "康城街", "正阳路", "中城路", "顺城路", "安城街", 
            "春城街", "国城路", "泰城街", "德阳路", "春阳路", "艳阳街", "秋阳路", "硕阳街", 
            "瑞阳街", "丰海路", "惜福镇街道", "夏庄街道", "中山街", "太平路", "广西街", "湖南路", 
            "济宁街", "芝罘路", "荷泽四路", "荷泽二街", "荷泽一路", "广西支街", "观海一路", 
            "济宁支街", "莒县路", "明水路", "青岛路", "湖北街", "郯城街", "天津路", "保定街", 
            "安徽路", "黄岛路", "北京街", "莘县路", "济南街", "日照街", "德县路", "荷泽路", 
            "沂水路", "肥城街", "兰山路", "四方街", "浙江路", "曲阜街", "寿康路", "泰安路", 
            "大沽街", "红山峡支路", "台西纬四街", "台西纬二路", "西陵峡二街", "西陵峡三路", 
            "台西纬五路", "青铜峡路", "台西二街", "瞿塘峡街", "团岛二路", "团岛一街", 
            "台西三路", "郓城南路", "团岛三街", "刘家峡路", "西藏二街", "台西四街", "三门峡路", 
            "红山峡路", "龙羊峡路", "西陵峡街", "台西五路", "团岛四街", "四川路", "寿张街", 
            "嘉祥路", "范县路", "西康街", "云南路", "鱼台街", "单县路", "定陶街", "滕县路", 
            "观城路", "朝城路", "滋阳街", "濮县街", "磁山路", "汶水街", "西藏路", "团岛路", 
            "南阳街", "广州路", "东平街", "贵州街", "费县路", "登州路", "信号山支路", "延安一街", 
            "信号山路", "兴安支街", "莱芜二路", "吴县一街", "金口三路", "伏龙山路", "鱼山支街", 
            "观象二路", "金口二街", "海阳路", "龙口街", "恒山路", "掖县路", "红岛路", "常州街", 
            "龙华街", "齐河路", "莱阳街", "黄县路", "祚山路", "苏州街", "华山路", "伏龙街", "龙江街", 
            "王村路", "齐东路", "龙山路", "牟平街", "延安三路", "延吉街", "银川西路", "海口街", "山东路", 
            "芝泉路", "东海中街", "宁夏路", "扬州街", "郧阳路", "太平角一街", "宁国二支路", "天台东一路", 
            "漳州路一路", "漳州街二街", "太平角六街", "太平角四路", "天台东二街", "太平角五路", "澳门三路", 
            "江西支街", "澳门二路", "宁国四街", "咸阳支街", "洪泽湖路", "澄海三路", "新湛二路", "三明北街",
             "新湛支路", "湛山五街", "闽江三路", "澳门四街", "南海支路", "三明南路", "湛山二街", "珠海二街", 
             "嘉峪关路", "高邮湖街", "湛山三路", "泰州二路", "天台二路", "微山湖街", "珠海支街", "福州南路", 
             "澄海二街", "泰州四路", "澳门五路", "新湛三街", "澳门一路", "正阳关街", "闽江四街", "新湛一路", 
             "泰州一路", "泰州六街", "大尧二路", "青大一街", "屏东支路", "湛山一街", "东海西路", "大尧三路", 
             "晓望支街", "秀湛二路", "泰州五街", "澄海一路", "澳门八街", "福州北路", "宁国二路", "燕儿岛路", 
             "紫荆关街", "逍遥一街", "秀湛四路", "居庸关街", "山海关路", "新湛路", "漳州街", "仙游路", 
             "花莲街", "巢湖街", "台南路", "新田路", "澄海路", "莆田街", "海游路", "镇江街", "三明路", 
             "仰口街", "沛县路", "台湾街", "天台路", "海江街", "岳阳路", "善化街", "荣成路", "武昌路", 
             "台北路", "龙岩街", "宁德街", "龙泉路", "丽水街", "海川路", "金田路", "泰州街", "太湖路", 
             "江西街", "青大街", "金门路", "旌德路", "宁国路", "泉州街", "如东路", "奉化街", "华严路", 
             "嘉义街", "古田路", "秀湛路", "长汀街", "湛山路", "汕头街", "新竹路", "黄海街", "安庆路", 
             "韶关路", "新安路", "仙居街", "晓望街", "海门路", "珠海街", "上杭路", "漳平路", "盐城街", 
             "新浦路", "新昌街", "市场三街", "金乡东路", "上海支路", "惠民南路", "市场纬街", "长安南路", 
             "陵县支街", "市场一路", "小港二街", "清平路", "新疆路", "博平街", "港通路", "高唐街", "茌平路", 
             "港青街", "高密路", "平阴路", "邱县路", "渤海街", "旅顺街", "堂邑路", "李村街", "即墨路", 
             "港环路", "馆陶街", "普集路", "朝阳街", "港夏街", "港联路", "上海路", "武定路", "长清街", 
             "长安路", "惠民街", "海泊路", "沧口街", "宁波路", "莱州路", "招远街", "冠县路", "禹城街", 
             "临清路", "东阿街", "吴淞路", "辽宁路", "大港纬一路", "贮水山支街", "大港纬三街", "大港纬五路", 
             "大港纬四街", "大港纬二路", "吉林支路", "大港四街", "普集支路", "无棣三街", "大港三街", "无棣一路", 
             "泰山支路", "无棣四路", "大连支街", "大港二路", "锦州支街", "长山路", "乐陵街", "临邑路", "合江路", 
             "大连街", "博兴路", "城阳街", "临淄路", "安邱街", "临朐路", "商河路", "济阳路", "承德街", "辽北街", 
             "阳信路", "益都街", "松江路", "吉林路", "恒台街", "包头路", "无棣街", "锦州街", "桓台路", "邹平路", 
             "章丘路", "丹东街", "华阳路", "青海街", "四平路", "台东西七街", "台东东二路", "台东西二路", "东五街", 
             "云门二路", "云门一街", "台东四路", "台东一街", "台东二路", "内蒙古路", "台东六路", "广饶支街", 
             "台东三街", "四平支路", "郭口东街", "青海支路", "菜市二路", "菜市一街", "北仲三路", "瑞云街", 
             "庆祥街", "万寿路", "芙蓉路", "大名路", "昌平街", "平定路", "长兴街", "和兴路", "德盛街", 
             "宁海路", "东山路", "清和街", "姜沟路", "长春街", "昆明路", "顺兴街", "利津路", "人和路", 
             "营口路", "昌邑街", "丰盛街", "埕口路", "丹阳街", "汉口路", "桑梓路", "沾化街", "山口路", 
             "沈阳街", "振兴街", "通化路", "峄县路", "曹县路", "昌乐街", "道口路", "南九水街", "驼峰路", "标山路", "太清路"           
        ]
    }
    
    fake(schema) {
        return `${this._collection[this.randomIntegerInRange(0, this._collection.length - 1)]}${new RandExp(/[1-9][0-9]{1,2}/).gen()}号`;
    }
};