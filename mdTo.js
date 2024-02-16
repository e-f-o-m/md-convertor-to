'use strict';

const mdToObj = (text) => {
    let arH1 = text.split(/\r\n#\s|\n#\s/g);
    let data = []
    arH1.forEach(cH1 => {
        let lines = cH1.split(/[\r\n]/);
        data.push(buildByLines(lines, 1, 0).value)
    });
    return data
}

function buildByLines(lines, level, index) {
    let result = {
        title: lines[index],
        level: level,
        content: [/* { type, value } */],
        subcontent: []
    }
    for (let i = index + 1; i < lines.length; i++) {
        let titleValidator = lines[i].match(/^#+/g)
        if (titleValidator) {
            //si el padre es h1
            if (result.level < titleValidator[0].length) {
                let subRes = buildByLines(lines, titleValidator[0].length, i)
                result.subcontent.push(subRes.value)
                i = subRes.index
            } else {
                //si el padre es h2 (igual)
                return { value: result, index: i - 1 }
            }
        } else if (/^-\s|^\*\s/.test(lines[i])) {
            result.content.push({ type: 'list', value: lines[i] })
        } else if (lines[i].trim()) {
            result.content.push({ type: 'text', value: lines[i] })
        }
    }
    return { value: result, index: lines.length }
}


export { mdToObj };