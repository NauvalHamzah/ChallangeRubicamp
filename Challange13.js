//Import Library
const { readFileSync, writeFileSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//object construction
function taskList(title, complete = false, tags = []) {
    this.title = title;
    this.complete = complete;
    this.tags = tags;
    this.status = function() {
        return this.complete? "[x]":"[ ]"}
    this.checklist = this.status()
}

function handleHelp() {
    console.log(`
    >>> JS TODO <<<
    <command>
    list
    task <task_id>
    add <task_content>
    delete <task_id>
    complete <task_id>
    uncomplete <task_id>
    list:outstanding asc|dsc
    list:completed asc|dsc
    tag <task_id><tag_name_1><tag_name_2>...<tag_name_N>
    filter:<tag_name>
    `)
}

function handleList() {
    console.log("Daftar Pekerjaan")
    allTask.forEach((task, index) => {
        console.log(`${index + 1}. ${task["checklist"]} ${task["title"]}`)
    });
}

function handleTask(taskNo) {
    taskNo = taskNo - 1;
    if (typeof (taskNo) === 'number' && taskNo < allTask.length) {
        mainKeys = ["title", "complete", "tags","checklist"]
        mainKeys.forEach(key => {
            console.log(`${key}: ${allTask[taskNo][key]}`)
        });
    } else { handleError() }
}

function handleAdd(title) {
    let tugas = new taskList(title)
    allTask.push(tugas);
    console.log(`"${title}" telah ditambahkan.`);
}

function handleDelete(taskNo) {
    taskNo = taskNo - 1;
    if (typeof (taskNo) === 'number' && taskNo < allTask.length) {
        console.log(`"${allTask[taskNo]["title"]}" telah dihapus dari daftar`)
        allTask.splice(taskNo, 1);
    } else { handleError() }
}

function handleComplete(taskNo) {
    taskNo = taskNo - 1;
    if (typeof (taskNo) === 'number' && taskNo < allTask.length) {
        allTask[taskNo].complete = true;
        allTask[taskNo].checklist = "[x]"
        console.log(`"${allTask[taskNo]["title"]}" telah selesai`)
    } else { handleError() }
}

function handleUncomplete(taskNo) {
    taskNo = taskNo - 1;
    if (typeof (taskNo) === 'number' && taskNo < allTask.length) {
        allTask[taskNo].complete = false;
        allTask[taskNo].checklist = "[ ]";
        console.log(`"${allTask[taskNo]["title"]}" status selesai dibatalkan`)
    } else { handleError() }
}

function handleListOutstanding(arguments) {
    if (arguments === "asc") {
        console.log("Daftar Pekerjaan")
        for (let i = 0; i < allTask.length; i++) {
            if (allTask[i]["complete"] === false) {
                console.log(`${i+1}. ${allTask[i]["checklist"]} ${allTask[i]["title"]}`);
            }
        };
    } else if (arguments === "desc") {
        console.log("Daftar Pekerjaan")
        for (let i = allTask.length - 1; i >= 0; i--) {
            if (allTask[i]["complete"] === false) {
                console.log(`${i+1}. ${allTask[i]["checklist"]} ${allTask[i]["title"]}`);
            }
        }
    } else (handleError())
}

function handleListCompleted(arguments) {
    if (arguments === "asc") {
        console.log("Daftar Pekerjaan")
        for (let i = 0; i < allTask.length; i++) {
            if (allTask[i]["complete"] === true) {
                console.log(`${i+1}. ${allTask[i]["checklist"]} ${allTask[i]["title"]}`);
            }
        };
    } else if (arguments === "desc") {
        console.log("Daftar Pekerjaan")
        for (let i = allTask.length - 1; i >= 0; i--) {
            if (allTask[i]["complete"] === true) {
                console.log(`${i+1}. ${allTask[i]["checklist"]} ${allTask[i]["title"]}`);
            }
        }
    } else (handleError())
}

function handleTag(argument) {
    const parts = argument.trim().split(' ');
    const taskNo = parts[0] * 1;
    const tags = parts.slice(1)
    if (typeof (taskNo) === 'number' && taskNo - 1 < allTask.length) {
        allTask[taskNo - 1]["tags"] = tags;
        console.log(`Tag '${tags}' telah ditambahkan ke daftar '${allTask[taskNo - 1]["title"]}'`)
    } else { handleError() }
}

function handleFilter(argument) {
    console.log("Daftar Pekerjaan")
    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i]["tags"].includes(argument)) {
            console.log(`${i+1}. ${allTask[i]["checklist"]} ${allTask[i]["title"]}`);
        }
    };
}

function handleError() {
    console.log("Perintah tidak tepat, masukkan perintah lain");
}

function parseCommand(input) {
    if (input.includes("filter:")) {
        const parts = input.trim().split(':');
        const command = parts[0].toLowerCase();
        const argument = parts.slice(1).join(' ');
        return { command, argument };
    } else {
        const parts = input.trim().split(' ');
        const command = parts[0].toLowerCase();
        const argument = parts.slice(1).join(' ');
        return { command, argument };
    }
}

function executeCommand(command, argument) {
    switch (command) {
        case 'help':
            handleHelp();
            promptCommand();
            break;
        case 'list':
            handleList();
            promptCommand();
            break;
        case 'task':
            handleTask(argument);
            promptCommand();
            break;
        case 'add':
            handleAdd(argument);
            promptCommand();
            break;
        case 'delete':
            handleDelete(argument);
            promptCommand();
            break;
        case 'complete':
            handleComplete(argument);
            promptCommand();
            break;
        case 'uncomplete':
            handleUncomplete(argument);
            promptCommand();
            break;
        case 'list:outstanding':
            handleListOutstanding(argument);
            promptCommand();
            break;
        case 'list:completed':
            handleListCompleted(argument);
            promptCommand();
            break;
        case 'tag':
            handleTag(argument);
            promptCommand();
            break;
        case 'filter':
            handleFilter(argument);
            promptCommand();
            break;
        default:
            handleError();
            promptCommand();
            break;
    }
}

function promptCommand() {
    rl.question("Tulis perintah! ketik 'help' untuk melihat daftar perintah\n", (input) => {
        const { command, argument } = parseCommand(input);
        executeCommand(command, argument);
    });

    rl.on('close', () => {
        console.log('good bye!');
        writeFileSync('dataC13.json', JSON.stringify(allTask), 'utf8')
        process.exit(0);
    });
}

try {
    allTask = JSON.parse(readFileSync("dataC13.json", 'utf8'));
  } catch (err) {
    allTask = [];
}
// Start the command prompt
promptCommand();