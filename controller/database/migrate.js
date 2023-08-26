const { dbConnect, sequelize, DataTypes } = require('./index')
const usersModel = require('./model/users')
const roleModel = require('./model/role')
const logsModel = require('./model/logs')

dbConnect()

console.log('Initiating migration script');




sequelize.sync().then(() => {
    console.log('users table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


// const grade_data = [{ grade: 9 }, { grade: 10 }, { grade: 11 }]

// const student_data = [
//     { name: "John Baker", gradeId: 2 },
//     { name: "Max Butler", gradeId: 1 },
//     { name: "Ryan Fisher", gradeId: 3 },
//     { name: "Robert Gray", gradeId: 2 },
//     { name: "Sam Lewis", gradeId: 1 }
// ]

// sequelize.sync({ force: true }).then(() => {
//     Grade.bulkCreate(grade_data, { validate: true }).then(() => {
//         Student.bulkCreate(student_data, { validate: true }).then(() => {
//            …
//         }).catch((err) => { console.log(err); });
//     }).catch((err) => { console.log(err); });
// }).catch((error) => {
//     console.error('Unable to create the table : ', error);
// });