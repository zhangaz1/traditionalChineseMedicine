/** 2020-4-11 0011
 *作者:王青高
 *功能: 正则匹配高亮关键字
 *参数: {String} val: 字源; searchVal: 关键字
 */
const ruleTitle = () => {
    return function (val, searchVal) {
        let content = val;
        let rep = new RegExp(searchVal, 'g');
        if (!rep.test(content)) return content;
        if (!searchVal) return content;
        let resDtring = `<span style='color:#de181b;'>${searchVal}</span>`;
        return content.replace(rep, resDtring);
    };
};

export {
    ruleTitle
};
