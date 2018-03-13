
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/concatMap';

import {fileListObs} from '../fs-observables/fs-observables';
import {readLinesObs} from '../fs-observables/fs-observables';
import {writeFileObs} from '../fs-observables/fs-observables';
import {appendFileObs} from '../fs-observables/fs-observables';

import {transformCanto} from './transform-canto';
import {config} from '../config';

export function readTransformWriteCantiConcurrency(concurrencyLevel?: number, inputDir?: string) {
    const sourceDir = inputDir ? inputDir : config.divinaCommediaCantiDir;
    const logFile = config.divinaCommediaCantiTransformedDirConcurrency + 'log.txt';
    return fileListObs(sourceDir)
            .switchMap(cantiFileNames => Observable.from(cantiFileNames))
            .mergeMap(fileName => readTransformWriteCantoFromFile(fileName), concurrencyLevel)
            .mergeMap(fileWritten => appendFileObs(logFile, fileWritten + '\n'));
}

function readTransformWriteCantoFromFile(cantoFileName: string) {
    return readLinesObs(cantoFileName)
            .map(cantoLines => {
                return {name: cantoFileName, content: cantoLines};
            })
            .map(canto => transformCanto(canto, config.divinaCommediaCantiTransformedDirConcurrency))
            .mergeMap(cantoTranformed => writeFileObs(cantoTranformed.name, cantoTranformed.content));
}
