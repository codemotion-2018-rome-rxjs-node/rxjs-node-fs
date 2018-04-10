
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';

import {readDirObs} from '../fs-observables/fs-observables';
import {readLinesObs} from '../fs-observables/fs-observables';
import {writeFileObs} from '../fs-observables/fs-observables';
import {writeLogObs} from '../fs-observables/fs-observables';

import {transformCanto} from './transform-canto';
import {config} from '../config';


const targetDir = config.divinaCommediaCantiTransformedDirConcurrency;
const logFile = targetDir + 'log.txt';

export function transformAllFiles(sourceDir: string, concurrencyLevel: number) {
    return readDirObs(sourceDir)
            .switchMap(cantiFileNames => Observable.from(cantiFileNames))
            .mergeMap(fileName => transformFile(fileName), concurrencyLevel);
}

function transformFile(cantoFileName: string) {
    return readLinesObs(cantoFileName)
            .map(cantoLines => transformCanto({name: cantoFileName, content: cantoLines}, targetDir))
            .switchMap(cantoTranformed => writeFileObs(cantoTranformed.name, cantoTranformed.content))
            .switchMap(fileWritten => writeLogObs(logFile, fileWritten + '\n'));
}
















// check the number of concurrent processing
// export var filesOpen = 0;
// function transformFile(cantoFileName: string) {
//     filesOpen++
//     console.log(filesOpen)
// return readLinesObs(cantoFileName)
//         .map(cantoLines => transformCanto({name: cantoFileName, content: cantoLines}, targetDir))
//         .switchMap(cantoTranformed => writeFileObs(cantoTranformed.name, cantoTranformed.content))
//         .switchMap(fileWritten => writeLogObs(logFile, fileWritten + '\n'))
//             .do(_ => filesOpen--)
//             .do(_ => console.log(filesOpen))
// }
