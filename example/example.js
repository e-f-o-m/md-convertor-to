import { writeFile, readFile } from 'node:fs';
import { mdToObj } from '../mdTo.js';

readFile('example/markdown.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let parseMD = mdToObj(data);

    writeFile('example/result.json', JSON.stringify(parseMD, null, 2), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("completed!");
        }
    });
});