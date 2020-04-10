const ruleTitle = () => {
    return function (val, searchVal) {
        let content = val;
        let rep = new RegExp(searchVal, 'g');
        if (!rep.test(content)) return content;
        if (!searchVal) return content;
        let resDtring = `<span style='color:red;'>${searchVal}</span>`;
        return content.replace(rep, resDtring);
    };
};

export {
    ruleTitle
};
