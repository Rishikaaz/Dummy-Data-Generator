import mongoose from "mongoose";
import express from "express";
import { Employee } from './Db.js';

let conn = await mongoose.connect("mongodb://localhost:27017/Employee")
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {

    let random = Math.floor(Math.random() * 5);
    const names = ["john", "alice", "bob", "elene", "Tom"];
    const randomsalary = Math.floor((Math.random() * 100000 + 1));
    const languages = ["java", "python", "c++", "javascript", "ruby"];
    const city = ["New york", "los angeles", "chicago", "houston", "philadelphia"];
    const isManage = [true, false];

    const newemployee = new Employee({
        name: names[random],
        salary: randomsalary,
        language: languages[random],
        city: city[random],
        isManager: Math.random() > 0.5
    })
    newemployee.save()
    res.render("index");
})


app.delete('/clear', async (req, res) => {
    try {
        await Employee.deleteMany({});
        console.log("All employees cleared");
        res.status(200).send('All data cleared');
    } catch (error) {
        console.error("Error clearing data:", error);
        res.status(500).send('Error clearing data');
    }
});

app.listen(port)
console.log(`Server is running on port ${port}`)