
import 'rxjs/add/operator/do';
import {readTransformWriteCanti} from './read-transform-write-canti';

const dirWith100Files = 'canti-divina-commedia';
const dirWith10000Files = 'canti-divina-commedia-many';
const dirS3 = '/Users/penrico/s3-drive';

const start = Date.now();
readTransformWriteCanti(dirS3)
.subscribe(
    undefined,
    err => console.error(err),
    () => {
        const end = Date.now();
        console.log('done');
        console.log('elapsed ' + (end - start));
    }
)




console.log(dirWith100Files, dirWith10000Files, dirS3);