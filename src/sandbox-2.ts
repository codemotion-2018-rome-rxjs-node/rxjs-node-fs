

import { Observable } from 'rxjs';

import {readDirObs} from './fs-observables/fs-observables';
import {readLinesObs} from './fs-observables/fs-observables';

const sourceDir = 'canti-divina-commedia-100/';



readDirObs(sourceDir)
.switchMap(data => Observable.from(data))
.mergeMap(file => readLinesObs(file))
.take(1)
.subscribe(
    data => console.log(data),
    err => console.error(err),
    () => console.log('I AM DONE')
)














// fileListObs(sourceDir)
// .switchMap(data => Observable.from(data))
// .mergeMap(file => readLinesObs(file))
// .take(2)
// .subscribe(
//     data => console.log(data),
//     err => console.error(err),
//     () => console.log('DONE')
// )


// this line of code is just to avoid that Typescript complains because this imported things or constants are not used
console.log(sourceDir.substr(0, 0), Observable.toString().substr(0, 0), 
readLinesObs.toString().substr(0, 0), readDirObs.toString().substr(0, 0))