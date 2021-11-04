//validator chalk fs
// fs is already built in node
const fs = require('fs')
const { resourceLimits } = require('worker_threads')
readDataFromJsonFile = () => {
    let data
    try {
        data = JSON.parse(fs.readFileSync('./tasks.json').toString())
        if (!Array.isArray(data)) { throw new Error('data is not defined') }
    } catch (e) {
        data = []
    }
    return data
}
writeDataToJsonFile = (data) => {
    try {
        fs.writeFileSync('tasks.json', JSON.stringify(data))
    } catch (e) {
        console.log(e)
    }

}
addTask = (data) => {
    tasks = readDataFromJsonFile()
    data = {

        id: Date.now() * Math.random(),
        status: false,
        ...data
    }

    tasks.push(data)
    writeDataToJsonFile(tasks)

}
showall = () => {
    tasks = readDataFromJsonFile()
    tasks.forEach(task => {
        console.table(task)
    })
}
searchTask = (taskId) => {
    tasks = readDataFromJsonFile()
    task = tasks.find(d => {
        return taskId == d.id
    })
    console.log(task)
}
deleteTask = (taskId) => {
    tasks = readDataFromJsonFile()
    task = tasks.findIndex(d => {
            return taskId == d.id
        })
        // console.log(task)
    tasks.splice(task, 1)
    writeDataToJsonFile(tasks)

}
changeStatus = (taskId) => {
    tasks = readDataFromJsonFile()
    task = tasks.find(d => {
        if (taskId == d.id) {
            d.status = true
        }
    })
    writeDataToJsonFile(tasks)

}
editTask = (taskId, data) => {
    tasks = readDataFromJsonFile()
    task = tasks.find(d => {
        if (taskId == d.id) {
            d.title = data.title
            d.content = data.content
            d.duedate = data.duedate
        }
    })
    writeDataToJsonFile(tasks)

}
getdate = () => {
    tasks = readDataFromJsonFile()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    console.log(month)
    m = monthNames.findIndex(r => {
        return month == r
    })
    console.log(m)
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    const date = day + '/' + (m + 1) + '/' + year;
    let result = []
    newdate = date.split('/')
    console.log(newdate)
    tasks.filter(t => {
        t.duedate = t.duedate.split('/')
        console.log(t.duedate)
        if ((newdate[0] <= t.duedate[0]) && (newdate[1] <= t.duedate[1]) && (newdate[2] <= t.duedate[2])) {
            result.push(t)
        }

    })
    console.log(result)
}
module.exports = {
    addTask,
    showall,
    searchTask,
    deleteTask,
    changeStatus,
    editTask,
    getdate
}