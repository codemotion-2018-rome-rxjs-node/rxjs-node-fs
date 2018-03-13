
import {readTransformWriteCantiConcurrency} from './read-transform-write-canti-concurrency';
import {config} from '../config';

const start = Date.now();
readTransformWriteCantiConcurrency(1000, config.divinaCommediaCantiDirMany)
.subscribe(
    undefined,
    err => console.error(err),
    () => {
        const end = Date.now();
        console.log('done');
        console.log('elapsed ' + (end - start));
    }
)
