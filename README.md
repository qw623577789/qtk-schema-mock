# qtk-schema-mock

此库为[@qtk/schema](https://www.npmjs.com/package/@qtk/schema)体系中的一环,能够根据数据的schema定义自动生成模拟数据．例如：
```js
const QtkSchema = require('@qtk/schema');
const {object, string, integer} = QtkSchema.schema;
const {faker, executer} = require('@qtk/schema-mock');

//schema定义，描述一个对象，里面含有foo、bar两个字段，foo字段类型为string, bar字段类型为integer
const schema = object().properties({
    foo: string().example(faker.string()),
    bar: integer().example(faker.integer())
})

//根据schema生成mock数据
const mockData = executer.exec(schema);
console.log(mockData)
```
输出结果
```bash
{ foo: '11A3S', bar: 1101816453870425 }
```

## 特性

- 支持string、boolean、null、integer、number、object、array数据类型
- **支持oneOf、if...elseif...else...endif语法**
- 内置常用数据生成器，基本能覆盖日常模拟数据的生成需求。若不满足，可**自定义数据生成器**
- **支持节点之间数据的依赖关系**
- **支持schema存在分支情况下(`oneOf`、`if`)，控制生成数据使用的分支**

## 文档

### 语法
此库需要配合@qtk/schema一起使用，每个数据类型（string、number、integer、boolean、empty）都有一个``example``方法，可以通过参数形式指定生成数据情况.参数有如下四种情况:

- **常量**

    直接取该值作为该节点的假数据。*注意：开发者要自行保证该数据符合该节点schema定义,否则生成的数据将无法通过schema校验*.

    ```js
    const schema = object().properties({
        foo: string().example("abc"),
        bar: integer().example(123)
    })
    ```
    ```bash
    { foo: 'abc', bar: 123 }
    ```

- **Faker对象**

    使用内置或者自行开发的Faker,由框架执行后生成的值作为该节点的模拟数据．

    ```js
    const schema = object().properties({
        foo: string().example(faker.string()),
        bar: integer().example(faker.integer())
    })
    ```
    ```bash
    { foo: '11A3S', bar: 1101816453870425 }
    ```

- **Function**

    自定义方法，可进行一段逻辑运算或者引用其他节点的数据，由框架执行，将函数执行结果作为该节点的模拟数据.

    ```js
    let schema1 = object().properties({
        foo: string(),
        timeNow: integer().example(function() {
            return Date.now();
        })
    });
    ```
    ```bash
    { foo: '22DFG', bar: 1555554889000 }
    ```

    ```js
    let schema2 = object().properties({
        foo: string(),
        bar: integer(),
        foobar: string().example(function() {
            return this.foo + this.bar;
        })
    });
    ```
    ```bash
    { foo: '11A3S', bar: 1101816453870425, foobar: '11A3S1101816453870425'}
    ```

- **不传参数/不定义example**

    此情况会根据当前该节点的数据类型，自动调用该数据类型的基础faker生成模拟数据.

    数据类型|基础faker
    --|--
    number|faker.number
    integer|faker.integer
    boolean|faker.boolean
    string|faker.string
    null/empty|faker.null
    object|根据对象里每个节点数据类型，调用对应faker,最终组成对象
    array|根据数组元素结构描述(schema)，调用对应faker,生成数组元素，最终组成数组

### 影响Mock结果的schema关键字

数据类型|关键字|例子
--|--|--
number|enum、min、max、exclusiveMin、exclusiveMax|[样例](test/mock/number.js)
integer|enum、min、max、exclusiveMin、exclusiveMax|[样例](test/mock/integer.js)
boolean|enum|[样例](test/mock/boolean.js)
string|enum、pattern、minLength、maxLength、length、title、desc|[样例](test/mock/string.js)
null/empty|enum(只有null一个值)|[样例](test/mock/null.js)
object|properties、patternProperties、if...then...elseif...then...else...endif、require、requireAll|[样例](test/mock/object.js)
array|item、minItems、maxItems、length|[样例](test/mock/array.js)
oneOf|其无关键字|[样例](test/mock/oneOf.js)

### 内置Faker
内置``基础类``、``时间日期类``、``名字类``、``网络通讯类``、``地址类``、``其他类``几大类数据生成器.
#### 基础类
- **integer**
    - 描述: 生成Number.MIN_SAFE_INTEGER～Number.MAX_SAFE_INTEGER一个整型数字
    - 参数: 无
    - 示例: 12345678
    - [测试样例](test/mock/integer.js)

- **number**
    - 描述: 生成-10000000~1000000一个浮点数
    - 参数: {precision = -1}

        参数名|描述|默认值|示例|示例值
        --|--|--|--|--
        precision|精度|-1|faker.number({precision: 2})|5789879.72

    - 示例: 5789879.724531336 
    - [测试样例](test/mock/number.js)

- **string**
    - 描述: 生成a-zA-Z0-9随机组成的字符串
    - 参数: 无
    - 示例: Az012
    - 备注: 
        - 在无指定``length``或``minLength``情况下，默认生成5位字符串
        - 在无指定``enum``情况下，若有指定``title``,则用title内容作为模拟数据，若有指定``desc``,则用desc内容。生成的数据受``length``、``minLength``、``maxLength``限制，多出的长度会被截取，缺少的长度会用*空格*补位
    - [测试样例](test/mock/string.js)

- **chinese**
    - 描述: 生成随机中文的字符串
    - 参数: 无
    - 示例: 让窽段靅湀
    - 备注: 默认是5位字符串
    - [测试样例](test/fake/chinese.js)

- **null**
    - 描述: 生成null值
    - 参数: 无
    - 示例: null
    - [测试样例](test/mock/null.js)

- **boolean**
    - 描述: 生成boolean值
    - 参数: 无
    - 示例: true
    - [测试样例](test/mock/boolean.js)

#### 时间日期类
- **date**
    - 描述: 生成一个日期
    - 参数: {format = 'YYYY-MM-DD', at, offset = {
                years: 0, quarters: 0, months: 0, weeks: 0,
                days: 0, hours: 0, minutes: 0, seconds: 0
            }

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            format|日期格式|YYYY-MM-DD|faker.date({format: 'YYYYMMDD'})|20190606
            at|指定日期，使用YYYY-MM-DD格式|now|faker.date({at: '2019-01-01'})|2019-01-01
            offset.years|在指定日期上加减年数，正数为加，负数减|0|faker.date({at: '2019-01-01', offset: {years: 1}})|2020-01-01
            offset.quarters|在指定日期上加减季度数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {quarters: 1}})|2019-04-01
            offset.months|在指定日期上加减月份数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {months: 1}})|2019-02-01
            offset.weeks|在指定日期上加减周数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {weeks: 1}})|2019-01-08
            offset.days|在指定日期上加减天数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {days: 1}})|2019-01-02
            offset.hours|在指定日期上加减小时数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {hours: 1}})|2019-01-01
            offset.minutes|在指定日期上加减分钟数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {minutes: 1}})|2019-01-01
            offset.seconds|在指定日期上加减秒数，正负数规则同上|0|faker.date({at: '2019-01-01', offset: {seconds: 1}})|2019-01-01

    - 示例: 2015-03-28
    - [测试样例](test/fake/date.js)

- **time**
    - 描述: 生成一个时间
    - 参数: {format = 'HH:mm:ss', at, offset = {
                hours: 0, minutes: 0, seconds: 0
            }}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            format|时间格式|HH:mm:ss|faker.time({format: 'HHmmss'})|040513
            at|指定时间，使用HH:mm:ss格式|now|faker.time({at: '12:00:00'})|12:00:00
            offset|同``date``|||
    - 示例: 22:43:02
    - [测试样例](test/fake/time.js)

- **dateTime**
    - 描述: 生成一个日期时间
    - 参数: {format = 'YYYY-MM-DD HH:mm:ss', at, offset = {
                years: 0, quarters: 0, months: 0, weeks: 0,
                days: 0, hours: 0, minutes: 0, seconds: 0
            }}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            format|日期时间格式|YYYY-MM-DD HH:mm:ss|faker.dateTime({format: 'YYYYMMDDHHmmss'})|20171022004111
            at|指定时间，使用YYYY-MM-DD HH:mm:ss格式|now|faker.dateTime({at: '2019-01-01 00:00:00'})|2019-01-01 00:00:00
            offset|同``date``|||
    - 示例: 2023-05-06 00:41:11
    - [测试样例](test/fake/dateTime.js)

- **birthday**
    - 描述: 生成一个生日
    - 参数: {age = 18, format = 'YYYY-MM-DD'}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            age|指定当前岁数|18|faker.birthday({age: 20})|1999-03-11
            format|日期格式|YYYY-MM-DD|faker.birthday({format: 'YYYYMMDD'})|20171022
        
    - 示例: 2001-02-07
    - [测试样例](test/fake/birthday.js)

- **timestamp**
    - 描述: 生成一个时间戳
    - 参数: {at, offset = {
                years: 0, quarters: 0, months: 0, weeks: 0,
                days: 0, hours: 0, minutes: 0, seconds: 0
            }, milli = false}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            at|指定时间，使用YYYY-MM-DD HH:mm:ss格式|now|faker.timestamp({at: '2019-01-01 00:00:00'})|1554091200
            offset|同``date``|||
            milli|毫秒级|now|faker.timestamp({milli: true})|1554091200123||
    - 示例: 1554757895
    - [测试样例](test/fake/timestamp.js)


#### 名字类
- **firstName**
    - 描述: 生成一个英文名
    - 参数: 无
    - 示例: Alexander
    - [测试用例](test/fake/firstName.js)

- **lastName**
    - 描述: 生成一个英文姓
    - 参数: 无
    - 示例: Hernandez
    - [测试用例](test/fake/lastName.js)

- **name**
    - 描述: 生成英文名字
    - 参数: {lastName}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            lastName|指定英文姓|undefined|faker.name({lastName: 'Smith'})|Morgan Smith
    - 示例: Susan Ruiz
    - [测试用例](test/fake/name.js)

- **chineseFirstName**
    - 描述: 生成一个中文名
    - 参数: 无
    - 示例: 昊瀚
    - [测试用例]()

- **chineseLastName**
    - 描述: 生成一个中文姓
    - 参数: 无
    - 示例: 董
    - [测试用例](test/fake/chineseLastName.js)

- **chineseName**
    - 描述: 生成一个中文姓名
    - 参数: {lastName}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            firstName|指定姓|undefined|faker.chineseName({lastName: '郑'})|郑肖昰
    - 示例: 郑肖昰
    - [测试用例](test/fake/chineseName.js)


#### 网络通讯类
- **ip**
    - 描述: 生成一个ip
    - 参数: 无
    - 示例: 128.5.52.251
    - [测试用例](test/fake/ip.js)

- **email**
    - 描述: 生成一个电子邮箱
    - 参数: {suffix}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            suffix|指定邮箱后缀|undefined|faker.email({suffix: 'vanchu.net'})|c5ZBu4BsnlpME9tEv4Y@vanchu.net
    - 示例: 1AHtxnK5NLNk5GLbe64@live.com
    - [测试用例](test/fake/email.js)

- **url**
    - 描述: 生成一个url
    - 参数: {withDomain = true, domain}
        
            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            withDomain|携带域名|true|faker.url({withDomain: false})|/loHLX.html
            domain|指定url域名|undefined|faker.url({domain: 'http://www.baidu.com'})|http://www.baidu.com/9FP.gif
    - 示例: http://tezmyz.qemimdhq.com/7YTG.png
    - [测试用例](test/fake/url.js)

- **telephone**
    - 描述: 生成一个固话号码
    - 参数: {province, city, country}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.telephone({province: '广东省'})|0750-9015768
            city|指定省市|undefined|faker.telephone({province: '广东省', city: '汕头市'})|0754-4266370
            country|指定省市区|undefined|faker.telephone({province: '广东省', city: '汕头市', country: '濠江区'})|0754-63703385
    - 示例: 0456-96888714
    - [测试用例](test/fake/telephone.js)

- **mobile**
    - 描述: 生成一个移动电话号码
    - 参数: {prefix}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            prefix|指定号段|undefined|faker.mobile({prefix: '135'})|13516330565
    - 示例: 16664872095
    - [测试用例](test/fake/mobile.js)


#### 地址类
- **province**
    - 描述: 生成省份名
    - 参数: 无
    - 示例: 江西省
    - [测试用例](test/fake/province.js)

- **city**
    - 描述: 生成城市名
    - 参数: {province}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.city({province: '广东省'})|东莞市
    - 示例: 开封市
    - [测试用例](test/fake/city.js)

- **country**
    - 描述: 生成区名
    - 参数: {province, city}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.country({province: '广东省'})|余杭区
            city|指定省市|undefined|faker.country({province: '广东省', city: '汕头市'})|濠江区
    - 示例:
    - [测试用例](test/fake/country.js)

- **street**
    - 描述: 生成一个带省市区街道地址
    - 参数: 无
    - 示例: 利津路171号
    - [测试用例](test/fake/street.js)

- **address**
    - 描述: 生成一个带省市区街道地址
    - 参数: {province, city, country}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.address({province: '广东省'})|广东省新界惠东县北京街84号
            city|指定省市|undefined|faker.address({province: '广东省', city: '汕头市'})|广东省汕头市殷都区上杭路457号
            country|指定省市区|undefined|faker.address({province: '广东省', city: '汕头市', country: '濠江区'})|广东省汕头市濠江区山海关路816号
        - 示例: 海南省保山市调兵山市西陵峡街499号
    - [测试用例](test/fake/address.js)

- **areaCode**
    - 描述: 生成一个地区编码
    - 参数: {province, city, country}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.areaCode({province: '广东省'})|441481
            city|指定省市|undefined|faker.areaCode({province: '广东省', city: '汕头市'})|440523
            country|指定省市区|undefined|faker.areaCode({province: '广东省', city: '汕头市', country: '濠江区'})|440512
    - 示例: 320211
    - [测试用例](test/fake/areaCode.js)

- **zipCode**
    - 描述: 生成一个邮政编码
    - 参数: {province, city, country}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            province|指定省份|undefined|faker.zipCode({province: '广东省'})|510665
            city|指定省市|undefined|faker.zipCode({province: '广东省', city: '汕头市'})|515041
            country|指定省市区|undefined|faker.zipCode({province: '广东省', city: '汕头市', country: '濠江区'})|515071
    - 示例: 411300
    - [测试用例](test/fake/zipCode.js)


#### 其他类
- **idCard**
    - 描述: 生成一个身份证号
    - 参数: {birth, age, isMale = true, province, city, country}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            birth|生日(与age二选一)|undefined|faker.idCard({birth: '1993-05-06'})|433123199305062995
            age|岁数(与birth二选一)|undefined|faker.idCard({age: 25})|371403199404081350
            isMale|是否为男性|true|faker.idCard({isMale: true})|340181195004088578
            province|指定省份|undefined|faker.idCard({province: '广东省'})|44530219440408265X
            city|指定省市|undefined|faker.idCard({province: '广东省', city: '汕头市'})|44051319920408566X
            country|指定省市区|undefined|faker.idCard({province: '广东省', city: '汕头市', country: '濠江区'})|44051319920408566X
    - 示例: 61082119740408277X
    - [测试用例](test/fake/idCard.js)

- **uuid**
    - 描述: 生成一个uuid
    - 参数: {withThrough = false, upperCase = false}

            参数名|描述|默认值|示例|示例值
            --|--|--|--|--
            withThrough|是否带有"-"|false|faker.uuid({withThrough: false})|31c0ff1eaec14a28b1b3d0bc693c5fb7
            upperCase|是否大写|false|faker.uuid({upperCase: true})|080FF48A0D45444EBAEA85D2B6EE7D0A
    - 示例: d56a70799bc44982b659d3a44f21ba3f
    - [测试用例](test/fake/uuid.js)


### 节点值引用
有时候在生成数据时，节点的值可能依赖于其他节点，此时可以使用函数对其他节点进行引用运算。框架正常情况会按照**从上往下**的顺序，依次生成节点值。万一遇到有节点值依赖，框架会处理好节点之间的依赖关系，调整生成顺序，故使用者无需担心引用某个节点时，对应节点值未生成问题.

在函数内有两个关键字：**``this``**、**``parent``**

**``this``**: 代表当前object对象,可以使用this.xxx(某个属性名)来访问该属性值。***注意:这里函数不能使用箭头函数，因为箭头函数的this指向问题***

**``parent``**: 其为一个**方法**，可访问当前object的父对象．例如parent()/parent(0)访问的是当前object的父对象，使用parent().xxx(某个属性名)来访问父对象属性值。使用parent(1).xxx(某个属性名)来访问当前对象的爷爷对象属性值，以此类推。

#### 同个对象内对已生成的节点值依赖
```js
let schema = object().properties({
    foo: string(),
    bar: integer(),
    foobar: string().example(function() {
        return this.foo + this.bar
    })
});
```
```bash
{ 
    foo: 'vjCyM',
    bar: -6999967499174491,
    foobar: 'vjCyM-6999967499174491' 
}
```
#### 同个对象内对未生成的节点值依赖
```js
let schema = object().properties({
    foobar: string().example(function() {
        return this.foo + this.bar
    })
    foo: string(),
    bar: integer(),
});
```
```bash
{ 
    foo: 'BxG6O',
    bar: 5633265426115917,
    foobar: 'BxG6O5633265426115917' 
}
```
#### 对象父节点值依赖
```js
let schema = object().properties({
    foo: string(),
    bar: integer(),
    child: {
        foobar: string().example(function(parent) {
            return parent(0).foo + parent().bar; //传0或者不传，都是取父对象
        }),
    }
});
```
```bash
{
    "foo": "RnyNu",
    "bar": 1331231369744609,
    "child": {
        "foobar":"RnyNu1331231369744609"
    }
}
```
#### 对象值连环依赖
```js
let schema = object().properties({
    foo: string().example(function() {
        return `${this.bar}|`;
    }),
    bar: integer(),
    child: {
        child: {
            foobar: string().example(function(parent) {
                let grandfather = parent(1);
                return grandfather.foo + grandfather.bar;
            }),
        }
    },
});
```
```bash
{
    "bar": 2941360256674949,
    "foo": "2941360256674949|",
    "child": {
        "child": {
            "foobar": "2941360256674949|2941360256674949"
        }
    }
}
```
----

当数组元素为object对象时，同个数组元素内值引用跟上述使用方法一致，下面只举例``数组元素对象内对未生成的节点值依赖``
#### 数组元素对象内对未生成的节点值依赖
```js
let schema = array({
    foo: string(),
    bar: integer(),
    foobar: string().example(function() {
        return this.foo + this.bar;
    })
}).length(1);
```
```bash
[
    {
        "foo": "mt6SX",
        "bar": -2537253851598731,
        "foobar": "mt6SX-2537253851598731"
    }
]
```
#### 数组元素对象对已生成的同级数组元素的值依赖
数组元素是按顺序生成的，在日常使用中，一般只有后一个数组元素对前一个数组元素的依赖，不会对还未生成的数组元素有依赖，故目前只支持 ***数组元素对象对已生成的同级数组元素的值依赖***
```js
let schema = {
    foo: string(),
    bar: integer(),
    array: array({
        child: {
            foobar: string().example(function(parent) {
                let parentArray = parent(1);
                if (parentArray.length == 0) { //生成第一个数组元素时
                    return parent(2).foo + parent(2).bar;
                }
                else {　//之后的元素值都引用第一个的
                    return `引用数组一个元素内的foobar:${parentArray[0].child.foobar}`;
                };
            }),
        }
    }).length(2)
};
```
```bash
{
    "foo": "bD534",
    "bar": 8309194239957437,
    "array": [
        {
            "child": {
                "foobar": "bD5348309194239957437"
            }
        },
        {
            "child": {
                "foobar": "引用数组一个元素内的foobar:bD5348309194239957437"
            }
        }
    ]
}
```

### String/If/OneOf关键字特殊说明
#### String
若string有定义``title``、``desc``时，且没有指明要生成的字符串内容的话(例如没设置enum, pattern),优先使用``title``或``desc``的值作为模拟出来的值。优先级``title``>``desc``

#### If
在模拟数据时，在未指定采用分支情况下，库会随机选择一个分支进行模拟数据
```js
let schema = object()
    .if.properties({type: string().enum('student')})
    .then.properties({
        type: string().enum('student'),
        grade: integer(),
    }).requireAll()
    .elseIf.properties({type: string().enum('staff')})
    .then.properties({
        type: string().enum('staff'),
        salary: integer(),
    }).requireAll()
    .else.invalid()
    .endIf;
```
```bash
#随机情况之一
{ 
    type: 'student',
    grade: -8587181581065479,
    salary: -5665905248138731 
}
#随机情况之二
{ 
    type: 'staff',
    grade: -6737966537350263,
    salary: -7440343277696143 
}
```
#### OneOf
在mock数据时，会随机挑选一种情况作为mock模板来渲染数据
```js
let schema = {
    a: string(),
    b: integer(),
    c: oneOf(
        string().example(function(parent) {
            return this.a
        }),
        integer().example(function(parent) {
            return this.b
        }),
        object({
            a: string().example(function(parent) {
                return parent().a
            }),
            b: integer().example(function(parent) {
                return parent().b
            }),
        })
    )
};
```
```bash
#随机情况之一
{ 
    a: 'IKl2y', 
    b: 8936905039881469, 
    c: 'IKl2y' 
}
#随机情况之二
{ 
    a: 'I6Vnq', 
    b: -2572968458315703, 
    c: -2572968458315703 
}
#随机情况之三
{ 
    a: 'NUVyI',
    b: 5492851830340677,
    c: { 
        a: 'NUVyI', 
        b: 5492851830340677 
    } 
}
```
### 分支控制
``object``、``array``、``oneOf``三种关键字都可能存在条件分支情况，

**object**: 若使用了``if``关键字，即存在分支情况

**array**: array的数组元素若是object的话，且``object``使用了``if``关键字，即存在分支情况

**oneOf**: oneOf本身就是描述分支情况

若schema存在分支情况，有时候在生成随机数据时，可能想要控制生成的数据是某个分支的情况的话，可以在``exec``执行时传入分支控制参数，具体如下:
```js
{
    路径:　分支序号 
}
```

#### Object
```js
let schema = object()
    .if.properties({type: 'student', student: 111111}) //分支序号0
    .then.properties({
        type: string().enum('student'),
        student: integer(),
        staff: integer(),
    }).requireAll()
    .elseIf.properties({type: string().enum('staff')}) //分支序号1
    .then.properties({
        type: string().enum('staff'),
        staff: integer(),
    }).requireAll()
    .else.properties({ //分支序号2
        type: string(),
        staff1: integer(),
    }).requireAll()
    .endIf;
let mockData = executer.exec(schema, {
    ".": 0 //控制模拟器模拟分支序号0情况的数据
});
console.log(mockData)
```
```shell
{ type: 'student', student: 111111, staff: 3521726166632093 }
```
[【更多查看测试样例】](./test/branch/object.js)

#### Array
```js
let schema = array().item(
    oneOf(
        string(), //分支序号0
        integer(), //分支序号1
        boolean(), //分支序号2
        object({ //分支序号3
            a: string(),
            b: integer(),
            c: boolean(),
            d: oneOf(
                integer(), //分支序号0
                {          //分支序号1
                    da: string()
                }
            )
        })
    )
);
let mockData = executer.exec(schema, {
    ".[]": 3, //控制生成的数组元素采用分支序号为3的情况
    ".[].d": 1 //上面采用分支序号为3情况后，控制d采用分支序号为1的情况
});
let validator = Validator.from(schema);
console.log(mockData);
```
```shell
[ { a: 'odaaL', b: 2452900460710301, c: true, d: -2508172442902311 } ]
```

#### OneOf
```js
let schema = oneOf(
    string(), //分支序号0
    integer(), //分支序号1
    boolean(), //分支序号2
    object({ //分支序号3
        a: string(),
        b: integer(),
        c: boolean(),
        d: oneOf(
            integer(), //分支序号0
            {          //分支序号1
                da: string()
            }
        )
    })
);
let mockData = executer.exec(schema, {
    ".": 3, //控制生成的第一个数组元素采用分支序号为3的情况
    ".d": 1 //上面采用分支序号为3情况后，控制d采用分支序号为1的情况
});
let validator = Validator.from(schema);
console.log(mockData)
```
```shell
{ a: 'gMl6J', b: -5345124037619231, c: false, d: { da: 't4FFS' } }
```
[【更多查看测试样例】](./test/branch/one_of.js)

### 自定义Faker
当发现库提供的faker不满足您的需求时，可以自行开发符合您需求的faker,向框架注册后即可使用。具体步骤如下:
1. 新建一个类继承BaseFaker
2. 实现自定义Faker类
- 实现**fake**方法，**输入参数为该字段的schema定义**,**输出为模拟出来的数据**。各种数据类型可使用的关键字如下(**enum关键字已由库统一处理,开发者无需关注**):

    数据类型|关键字
    --|--
    string|pattern、title、description、maxLength、minLength
    integer|maximum、minimum、exclusiveMaximum、exclusiveMinimum
    number|maximum、minimum、exclusiveMaximum、exclusiveMinimum

- Faker类构造函数输入参数为**Faker使用时传入**的参数，例如faker.mobile支持传入的参数为：
faker.mobile({prefix})
那么mobile类在构造函数被执行时可以获得如下参数:
    ```js
    constructor({prefix = undefined}) {
        super();
        this._prefix = prefix;
    }
    ```
- BaseFaker内置提供两个常用的随机数产生函数:
    函数名|描述|参数
    --|--|--
    randomIntegerInRange|随机生成指定范围内的一个整数|(min, max)
    randomFloatInRange|随机生成指定范围内的一个浮点数|(min, max, precision = -1)

3. 注册自定义Faker

    使用``registerFaker``函数，传入faker的名字及faker类，函数将返回一个新的@qtk/schema-mock对象。***registerFaker支持一次性传入多个自定义faker对象，以逗号隔开就行***
    ```js
    const qtkSchemaMock = require('@qtk/schema-mock').registerFaker({
        fakerName: "animal",
        faker: CustomAnimalFaker
    }，
    {
        fakerName: "animal2",
        faker: CustomAnimalFaker2
    });
    ```

#### 完整样例
```js
const AnimalFaker = class extends require("@qtk/schema-mock").BaseFaker {
    constructor(params) {
        super();
        this._animals = ["mouse", "rabbit", "cat", "bird"];
    }

    fake(schema) {
        let randomIndex = this.randomIntegerInRange(0, this._animals.length - 1);
        return this._animals[randomIndex];
    }
}

const {string} = require('@qtk/schema').schema;
const {executer, faker} = require('@qtk/schema-mock').registerFaker({
    fakerName: "animal",
    faker: AnimalFaker
});

const schema = string().example(faker.animal());
const mockData = executer.exec(schema);
console.log(mockData)
```

```bash
rabbit
```

## 遗留问题
**1. 不支持含有if.patternProperties的schema在生成数据时控制分支情况**

## 许可
MIT