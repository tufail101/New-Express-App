const express =require('express');
const path =require('path');
const exphbs = require('express-handlebars');
const router = require('./Routs/router');
const app =express();
const port =3000;

const hbs =exphbs.create({
    extname:'.hbs',
    defaultLayout: 'main',
    layoutsDir:'views/layouts',
    partialsDir:'views/partials'

})
app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,"views"))

app.use('/',router)
app.use(express.static(path.join(__dirname,'static')))
// app.use('/',require(path.join(__dirname,'Routs/router')))


app.listen(port,()=>{
    console.log(`Site Runing On http://localhost:${port}`);
    
})