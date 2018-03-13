
// launch the read-transform-write-log logic reading the block size from command line
//
// First of all COMPILE
// npm run tsc
//
// Run with block of size 1 (i.e. sequentialy)
// node dist/canti-divina-commedia-transform/_transform.js 1

import {readTransformWriteCantiBlocks} from './read-transform-write-canti-blocks';
import {config} from '../config';

const blockSize = process.argv[2] ? parseInt(process.argv[2]) : 100;
const sourceDir = process.argv[3] ? process.argv[3] : config.divinaCommediaCantiDir;

const start = Date.now();
readTransformWriteCantiBlocks(blockSize, sourceDir)
.subscribe(
    undefined,
    err => console.error(err),
    () => {
        const end = Date.now();
        console.log('done');
        console.log('elapsed ' + (end - start));
    }
)
