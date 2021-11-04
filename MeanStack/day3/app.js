const yargs = require('yargs')
const student = require('./modules/student')
    // student.addStudent({ name: "Mohamed", class: "b" })
    // student.addSubject(224100375848.4284, { subName: "biology", subGrade: 80 })
    // student.showAllStudents()
    // student.getStudent(773260988030.4885)
    // student.getStudentsTotalDegrees()
    // student.addSubject(224100375848.4284, { subName: "biology", subGrade: 80 })
student.getStudentTotalDegrees(773260988030.4885)
yargs.command({
    command: "addStu",
    describe: "add student",
    builder: {
        name: {
            type: String,
            demandOption: true
        },
        class: {
            type: String,
                demandOption: true
        }
    },
    handler: function(argv) {
        // console.log('hello from there')
        Stu = { name: argv.name, class: argv.class }
        student.addStudent(Stu)

    }

})
yargs.command({
    command: "addSubject",
    describe: "add Subject To student",
    builder: {
        Id: {
            type: Number,
            demandOption: true
        },
        Name: {
            type: String,
            demandOption: true

        },
        Grade: {
            type: Number,
            demandOption: true
        }
    },
    handler: function(argv) {

        suj = { subName: argv.Name, subGrade: argv.Grade }

        student.addSubject(argv.Id, suj)
    }
})
yargs.command({
    command: "showAll",
    describe: "show All Students",
    handler: function() {
        student.showAllStudents()
    }
})
yargs.command({
    command: "showsingleStudent",
    describe: "show one Student",
    builder: {
        ID: {
            type: Number,
            demandOption: true
        }
    },
    handler: function(argv) {
        student.getStudent(argv.ID)
    }
})
yargs.command({
    command: "getTotalDegrees",
    describe: "get TOTAL DEGREES of students",
    builder: {
        ID: {
            type: Number,
            demandOption: true
        }
    },
    handler: function(argv) {
        student.getStudentTotalDegrees(argv.ID)
    }
})
yargs.argv