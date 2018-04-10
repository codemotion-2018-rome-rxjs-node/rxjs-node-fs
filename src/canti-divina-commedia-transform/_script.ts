
import 'rxjs/add/operator/do';
import {transformAllFiles} from './read-transform-write-canti';

const dirWith100Files = 'canti-divina-commedia-100';
const dirWith10000Files = 'canti-divina-commedia-10000';
const dirS3 = '/Users/penrico/s3-drive';

const start = Date.now();
transformAllFiles(dirWith10000Files)
.subscribe(
    undefined,
    err => console.error(err),
    () => {
        const end = Date.now();
        console.log('done');
        console.log('elapsed ' + (end - start));
    }
)




console.log(dirWith100Files.substr(0, 0), dirWith10000Files.substr(0, 0), dirS3.substr(0, 0));