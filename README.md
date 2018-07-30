
1 basic tweets

2 manual unsubscribe after 20 tweets
add take
show takeUntil using a button click
show takeWhile using a bad word in a tweet

3 count ui
show two connections
add share
show one connection

4 sentiment per tweet
add sampleTime(200) to slow everything down
demonstrate server restarts add repeat&retry
i wanna stop after 3 bad tweets -> two subscriptions is bad, add them to one with merge
add takeuntil
.takeUntil(tweet$.bufferCount(3).filter(tweets => tweets.every(tweet => !tweet.score)))
