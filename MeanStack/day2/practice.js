const p = function(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (typeof num == "number") {
                resolve(num * 2)
            } else {
                reject(new Error('that is not a number'))
            }
        }, 3000)

    })
}
p('sasad').then(
    function(result) {
        console.log(result)
    },
    function(error) {
        console.log(error.message)
    }

);
const call = async() => {
    data = await p(23)
    console.log(data)

}
call()
    //request on api
    // getdata = async(cb) => {
    //     data = await fetch("https://jsonplaceholder.typicode.com/albums")
    //     data = await data.json()
    //     cb(data)
    // };
    // getdata(d => {
    //     console.log(d)
    // })



//filesystem package
const fs = require('fs')
    // data = [{
    //     name: "laila",
    //     age: 24
    // }]
    // fs.writeFileSync('data.json', JSON.stringify(data))
    // x = JSON.parse(fs.readFileSync('data.json').toString())
    // console.log(x)

const f = require('./d')
f.hello()
    //chalk package
const chalk = require('chalk')
console.log(chalk.blue('laila'))
    //add data to jsonfile
addUser = (name, age) => {
    user = {
        name: name,
        age: age
    }
    txt = JSON.parse(fs.readFileSync('data.json').toString())
    txt.push(user)
    fs.writeFileSync('data.json', JSON.stringify(txt))

}
addUser('marwa', 33)