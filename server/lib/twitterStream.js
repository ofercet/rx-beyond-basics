const Twitter = require('twitter-stream-api');
const {Observable} = require('rxjs');
const fromStream = require('./fromStream');

module.exports = function getTwitterStream(track) {
    return Observable.create(observer => {
        const twitter = new Twitter({
            consumer_key: 'VvhR3HpB1fZJHs9KkSK2Ni5ac',
            consumer_secret: 'iwyH49Xu9uFPyDz5NLz5Y0RPfey5HTPiSOSjrQ1F4kAFHYh4Bn',
            token: '40696786-p6iD5LClADQfjTreRWzlPrO9A1bhBeWGjSrv5E9Tq',
            token_secret: 'FtjQr8Sp8rHYM3FOj00JyKOmiTucmkv1TzUpAQhqyz0wT',
        });

        twitter.stream('statuses/filter', {
            track,
        });

        const subscription = fromStream(twitter, {
            data: 'data',
            close: 'connection aborted',
            error: 'connection error http',
        }).subscribe(observer);
        subscription.add(() => twitter.close());
        return subscription;
    });
};
