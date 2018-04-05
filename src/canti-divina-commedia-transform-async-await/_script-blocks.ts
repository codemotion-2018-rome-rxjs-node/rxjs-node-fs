

import {readTransformWriteCantiBlocks} from './read-transform-write-canti-blocks';

const dirWith100Files = 'canti-divina-commedia';
const dirWith10000Files = 'canti-divina-commedia-many';
const dirS3 = '/Users/penrico/s3-drive';
const dirGoogleStream = '/Users/penrico/Google Drive File Stream/My Drive/canti-divina-commedia-many';

const start = Date.now();
readTransformWriteCantiBlocks(20, dirWith10000Files)
.then(data => {
            console.log('data', data);
            const end = Date.now();
            console.log('done');
            console.log('elapsed ' + (end - start));
        }
)
.catch(err => console.error(err))










console.log(dirWith100Files, dirWith10000Files, dirS3, dirGoogleStream);