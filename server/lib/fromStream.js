import {Observable} from 'rxjs';

export function fromStream(stream, {data, close, error}) {
    return Observable.merge(
        Observable.fromEvent(stream, data),
        Observable.fromEvent(stream, close).switchMapTo(Observable.empty()),
        Observable.fromEvent(stream, error).switchMap(err => Observable.throw(err))
    );
};
