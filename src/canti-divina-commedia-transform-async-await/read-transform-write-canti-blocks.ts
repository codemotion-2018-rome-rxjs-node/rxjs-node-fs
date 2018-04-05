
// https://stackoverflow.com/questions/47052929/how-to-execute-multiple-asynchronous-functions-sequentially-multiple-times

import * as _ from 'lodash';

import {filesPromise} from '../fs-async-await/fs-promise';
import {readLinesPromise} from '../fs-async-await/fs-promise';
import {writeFilePromise} from '../fs-async-await/fs-promise';
import {appendFilePromise} from '../fs-async-await/fs-promise';

import {transformCanto} from './transform-canto';
import {config} from '../config';

const targetDir = config.divinaCommediaCantiTransformedDirAsyncAwaitBlock;
const logFile = targetDir + 'log.txt';

export async function readTransformWriteCantiBlocks(blockSize: number, sourceDir: string) {
    const files = await filesPromise(sourceDir);
    const fileBlocks = _.chunk(files, blockSize)    
    let chainOfPromises = Promise.resolve(new Array<string>());
    for (const fileBlock of fileBlocks) {
        chainOfPromises = chainOfPromises.then(_ => {
            const parallelPromises = new Array<Promise<string>>();
            for (const file of fileBlock) {
                parallelPromises.push(readTransformWriteCanto(file));
            }
            return Promise.all(parallelPromises)
        });
    }
    return chainOfPromises;
}

export async function readTransformWriteCanto(filePath: string) {
    const cantoLines = await readLinesPromise(filePath);
    const transformedCanto = transformCanto({name: filePath, content: cantoLines.lines}, targetDir);
    const fileTransformed = await writeFilePromise(transformedCanto.name, transformedCanto.content);
    return appendFilePromise(logFile, fileTransformed);
}
