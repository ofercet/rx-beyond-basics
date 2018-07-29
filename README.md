Get stream of twitter tweets
Display it in three different places (tweets, count, and map)
Show three connections
Insert .share and show the magic

Or buffer them by some crazy metric I decide on like only display negative tweets after 3 positive ones or something?
Use takeWhile to stop taking tweets after 5 negative tweets show up 


Use expand to crawl a tweet tree and analyze if it's positive or negative generally
use groupBy to display by-country statistics



DEPRECATED:
It's hard to follow the map, use interval or buffer to display each 10 seconds the tweets from the last 10 seconds "hot" and then normal after a second




1
2 count + unsubscribe
2 add take
3 count ui
3 show two connections
3 add share
3 show one connection
4 sentiment per tweet
4 add sampleTime(200) to slow everything down
4 demonstrate server restarts add repeat&retry