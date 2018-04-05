import 'mocha';

// import {config} from '../config';
import {fileListObs} from '../fs-observables/fs-observables';
import {deleteDirObs} from '../fs-observables/fs-observables';
import {duplicateCanti} from './create-many-files';

describe('duplicateCanti function', () => {
    
    it('creates many copies of the divina commedia canti files', done => {
        const iterations = 2;
        const targetDir = 'canti-divina-commedia-many-test/';
        deleteDirObs(targetDir)
        .switchMap(_dirDeleted => duplicateCanti(iterations, 10, targetDir))
        .subscribe(
            undefined,
            err => done(err),
            () => {
                let numberOfWrittenFiles: number;
                fileListObs(targetDir)
                .subscribe (
                    files => numberOfWrittenFiles = files.length,
                    err => done(err),
                    () => {
                        if (numberOfWrittenFiles !== 100 * iterations) {
                            console.error('number of transformed files ' + numberOfWrittenFiles + ' not as expected');
                            done(new Error('duplicateCanti failed'));
                        } else {
                            done();
                        }
                    }
                )
            }
        )
    });

});
