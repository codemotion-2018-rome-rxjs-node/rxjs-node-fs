import 'mocha';

import {config} from '../config';
import {deleteDirPromise, filesPromise} from '../fs-async-await/fs-promise';
import {readTransformWriteCantiBlocks} from './read-transform-write-canti-blocks';

describe('readTransformWriteCanti function with blocks of 10 files at the time', () => {

    let expectedWrittenFiles: number;
    const targetDir = config.divinaCommediaCantiTransformedDirAsyncAwaitBlock;
    const sourceDir = config.divinaCommediaCantiDir;

    async function readTransformWriteCantiBlocksAsyncAwaitTest() {
        await deleteDirPromise(targetDir);
        const sourceFiles = await filesPromise(config.divinaCommediaCantiDir);
        // adds the log file to the number of expected files
        expectedWrittenFiles = sourceFiles.length  + 1;
        return readTransformWriteCantiBlocks(10, sourceDir);
    }
    
    it('transforms the Canti and writes them in a new directory - checks if the number of transformed files is correct', done => {
        readTransformWriteCantiBlocksAsyncAwaitTest()
        .then(() => {
            filesPromise(targetDir)
            .then(files => {
                if (files.length !== expectedWrittenFiles) {
                    console.error('number of transformed files ' + files.length + ' not equal to the expected number files '+ expectedWrittenFiles);
                    return done(new Error('readTransformWriteCanti failed'));
                }
                done();
            })
        })
    });

    it('transforms 10000 canti to check it does not fail for too many files open - checks that reading files in blocks actually works', done => {
        readTransformWriteCantiBlocks(20, config.divinaCommediaCantiDirMany)
        .then(_ => {
            done();
        });
    }).timeout(30000);

});
