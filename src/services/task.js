const redis = require('redis');
const client = redis.createClient();
const clientBlocking = client.duplicate();

function moveTasksToList() {
    // check if there are tasks in sorted task list, which are due (exec time < date.now + 1ms, max 1 item)
    let args = ['sortedTaskList', -1, Date.now() + 1, 'LIMIT', 0, 1];
    client.zrangebyscore(args, function (err, response) {
        if (err) {
            throw err;
        }
        if (response.length > 0) {
            // there is a due task - remove it from waiting list, add it to tasks to be executed
            client.multi([
                ["zrem", "sortedTaskList", response[0]],
                ["rpush", "taskList", response[0]]
            ]).exec(function(err) {
                if (err) {
                    throw err;
                }
                // we work with one task at a time, so there may be more due tasks - check immediately
                setImmediate(moveTasksToList);
            });
        } else {
            // no new tasks - sleep 1s
            setTimeout(moveTasksToList, 1000);
        }
    });
}

function addTask({time, message} = params) {
    // add new task to sorted task list (zadd), score - execution time, value - message
    let args = ['sortedTaskList', time, message];
    client.zadd(args, function (err) {
        if (err) {
            throw err;
        }
    });
}

function execTaskAsap() {
    // wait forever till a new task appears
    clientBlocking.blpop(['taskList', 0], (err, result) => {
        if (err) {
            throw err;
        }
        // execute task - console.log message
        console.log(result[1]);
        // immediately go back to waiting for the next task
        setImmediate(execTaskAsap);
    });
}


module.exports = {
    moveTasksToList,
    addTask,
    execTaskAsap,
};
