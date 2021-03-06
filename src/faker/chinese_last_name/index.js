module.exports = class extends require('../base') {
    constructor({lastName = undefined}) {
        super();
        this._collection = [
            '李', '张', '冯', '王', '刘', '杨', '陈', '赵', '黄', 
            '周', '吴', '徐', '郑', '马', '朱', '胡', '郭', '何', 
            '高', '林', '罗', '孙', '梁', '谢', '宋', '唐', '许', 
            '韩', '邓', '曹', '彭', '曾', '萧', '田', '董', '潘', 
            '袁', '于', '蒋', '蔡', '余', '杜', '叶', '程', '苏', 
            '魏', '吕', '丁', '任', '沈', '姚', '卢', '姜', '崔', 
            '钟', '谭', '陆', '汪', '范', '金', '石', '廖', '贾', 
            '夏', '韦', '傅', '方', '白', '邹', '孟', '熊', '秦', 
            '邱', '江', '尹', '薛', '阎', '段', '雷', '侯', '龙', 
            '史', '陶', '黎', '贺', '顾', '毛', '郝', '龚', '邵', 
            '万', '钱', '严', '覃', '河', '戴', '莫', '孔', '向', 
            '汤'        
        ];
        this._lastName = lastName;
    }
    
    fake(schema) {
        return this._lastName || this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};