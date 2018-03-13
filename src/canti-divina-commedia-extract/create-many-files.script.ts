
import {duplicateCanti} from './create-many-files';

let counter = 0;
const iterations = 100;
const concurrencylevel = 1000;

const start = Date.now();
duplicateCanti(iterations, concurrencylevel)
.subscribe(
    data => console.log(data, counter++),
    console.error,
    () => {
        const end = Date.now(); 
        console.log('DONE', end - start)
    }
)
