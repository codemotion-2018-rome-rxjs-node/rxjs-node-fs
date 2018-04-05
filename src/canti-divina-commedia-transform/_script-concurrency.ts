
import 'rxjs/add/operator/do';
import {readTransformWriteCantiConcurrency} from './read-transform-write-canti-concurrency';

const dirWith100Files = 'canti-divina-commedia';
const dirWith10000Files = 'canti-divina-commedia-many';
const dirS3 = '/Users/penrico/s3-drive';
const dirGoogleStream = '/Users/penrico/Google Drive File Stream/My Drive/canti-divina-commedia-many';

const start = Date.now();
readTransformWriteCantiConcurrency(20, dirWith10000Files)
.subscribe(
    null,
    err => console.error(err),
    () => {
        const end = Date.now();
        console.log('done');
        console.log('elapsed ' + (end - start));
    }
)










console.log(dirWith100Files, dirWith10000Files, dirS3, dirGoogleStream);