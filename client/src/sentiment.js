import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export function getTweetScore(tweet) {
    const analysis = sentiment.analyze(tweet.text);
    return analysis.score;
}