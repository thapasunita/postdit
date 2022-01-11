const express = require('express');
const db  = require('./config/mongoose');
const expressLyauouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const app = express();
const port = 1000;

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(expressLyauouts);
app.use(cookieParser());
app.use(express.static('assets'));
app.use(express.urlencoded({extended:true}));
app.use('/users', require('./routes/users'));


app.get('/', (request, response ) => {
    return  response.render("home", {title: "Home"});
 });
 



app.listen(port, (err)=>{
    if (err) {
        console.log(`Failed to start app at port: ${port}`);
        return;
    }
    console.log(`App started at port: http://localhost:${port}`);
});