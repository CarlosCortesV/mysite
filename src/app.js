var express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const path = require("path");
//primero declaramos las contates para llamar express y la app
//configuraciones

app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/enviar",(req,res) =>{
    
}); 
app.post("/enviar",(req,res) =>{
    const { nombre, correo, mensaje } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: 'carloscortesvera11@gmail.com', // Reemplaza con tu usuario de Sendinblue
          pass: 'yKIqPhBvRtHdCOVG' // Reemplaza con tu contraseña de Sendinblue
        }
      });
    
      // Configura el correo electrónico que se enviará
      const mailOptions = {
        from: 'carloscortesvera11@gmail.com', // Reemplaza con tu dirección de correo
        to: 'carloscortesvera@hotmail.com', // Coloca la dirección de correo del destinatario aquí
        subject: 'Formulario de contacto',
        text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
      };
    
      // Envía el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error al enviar el correo electrónico.');
        } else {
          console.log('Correo enviado: ' + info.response);
          res.redirect('/confirmacion')
        }
      });

});
app.get('/confirmacion', (req, res) => {
  res.render("confirmacion.ejs",{titulo:"Confirmación"})
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || app.get("puerto"), ()=>{
    console.log("Servidor web trabajando en el puerto", app.get("puerto"));  
})