import {observable, decorate} from 'mobx';

class Tweets {
    tweets = [];

    printTweet(tweet_raw) {
        try {
            const tweet = typeof tweet_raw === 'string' ? JSON.parse(tweet_raw) : tweet_raw;

            this.tweets = [tweet, ...this.tweets].slice(0, 50);
        } catch (err) {
            console.error('printTweet error', err);
        }
    }
}

decorate(Tweets, {
    tweets: observable,
});

export default new Tweets();
