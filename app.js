const app = require('express')();
const bodyparser = require('body-parser');
const admin= require('./routes/admin/ownerServices')
const users=require('./routes/users/userServices');
const auth=require('./routes/auth/authServices')
const db=require('./db/db');
const morgan = require('morgan')
app.use(morgan('dev'))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use("/api/admin",admin);
app.use("/api/users",users);
app.use("/api/auth",auth);
app.get("/", (req, res) => {
    res.send("Rest APIs for B2B Ecommerce  are up and running!!");
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});