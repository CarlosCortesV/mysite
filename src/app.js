var express = require("express");
const app = express();
const path = require("path");
//primero declaramos las contates para llamar express y la app
//configuraciones
app.set("puerto",3000);
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//
app.get("/",(req,res) =>{
    res.render("index.ejs",{titulo:"Inicio"});
});
app.get("/proyectos",(req,res) =>{
    res.render("proyectos.ejs",{titulo:"Proyectos"});
});
app.get("/blog",(req,res) =>{
    res.render("blog.ejs",{titulo:"Blog"});
});
app.get("/contacto",(req,res) =>{
    res.render("contacto.ejs",{titulo:"Contacto"});
});


app.use(express.static("C:/Users/carlo/OneDrive/Escritorio/paginaweb/src/public"));

app.listen(process.env.PORT || app.get("puerto"), ()=>{
    console.log("Servidor web trabajando en el puerto", app.get("puerto"));  
})