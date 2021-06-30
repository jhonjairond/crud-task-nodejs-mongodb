const path=require('path');
const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose')


const app=express();                                              //importo y uso express

//connecting to data base
mongoose.connect('mongodb+srv://admin:1234567890_@cluster0.foawe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true})                //me conecto a la base de datos usando moongose y los datos del segundo parametro son para eliminar warnings de moongose
.then(db=>console.log('Db conected'))                            //si se conecto
.catch(err=>console.log('err'));                                  //si hubo error


//importing routes
const indexRoutes=require('./routes/index');                      //requiero importo archivo de routes

//settings
app.set('port', process.env.PORT || 3000);                           //asigno puerto del SO o 3000 si no existe
app.set('views',path.join(__dirname,'views'));                      //uso nodejs path.join para direccionar directorios (para que funcione envarios sistemas operativos la direccion)
app.set('view engine','ejs');                                       //motor de plantilla ejs

//middlewares  (procesar datos anytes que lleguen a mis rutas)
app.use(morgan('dev'));                                                //ejecuto morgan 
app.use(express.urlencoded({extended:false}));                        //metodo para entender los datos que me envia el formulario, extended false por que solo es texto

//routes
app.use('/',indexRoutes);                                           //cada q un usuario entre a mi ruta inicial de servidor usara las rutas de index.js

//starting the server
app.listen(app.get('port'),() => {                                  //cojo el puerto de mi servidor de settings
  console.log(`Server on port ${app.get('port')}`);

});