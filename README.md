# redis-task-scheduler-rest-api
Redis-based task scheduler with RESTful API.

API has one route: 

POST /api/schedule

parameters: { time: datetime (int), message: text that will be printed to console (string) }


Also exposed '/' which contains simple instructions.

Alternatively, I could've used RedisSQM (redis simple message queue) which has identical functionality (and more functions), but then I wouldn't get a chance to try working with Redis myself.
