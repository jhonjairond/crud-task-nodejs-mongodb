const express=require('express');
const router=express.Router();

/*router.get('/',(req,res)=>{                   //cuando hago peticion a ruta inicial de mi servidor escribo hello world
    res.send('hello world')
});*/

const Televisor = require('../models/televisor');         //importo modelos para poder utilizar mi esquema de objeto

router.get('/',async(req,res)=>{ 
    const televisores = await Televisor.find();            //task es manera de pedir datos a mi coleccion task, con task.find nos traemos datos desde base de datos y es asincrono
    console.log(televisores);
    res.render('index',{
        televisores   //task:task
    });                        //cuando hago peticion a ruta inicial de mi servidor renderizo una vista ejs de views (html), le paso a esa vista las tareas
});

router.post('/add',async (req,res)=>{
    //console.log(new Televisor(req.body));           //muestro objeto
    //console.log(req.body);                     //muestro respuesta
    const televisor=new Televisor(req.body);              //cuando me contesta hago un nuevo objeto de modelo task con datos del body
    await televisor.save();                            //guardo en mi base de datos lo guardado en task
    //res.send('received');                         // mando un received si todo sale bien
    res.redirect('/');                             //me redirecciona a ruta principal del servidor
});


router.get('/turn/:id',async (req,res)=>{
    const{id}=req.params;                    //id que viene de objeto req.params, id q me envia navegador
    const televisor=await Televisor.findById(id);         //busco id enviado por navegador
    televisor.status=!televisor.status;
    await televisor.save();
    //console.log(task);
    //res.send('received'); 
    res.redirect('/'); 
});

router.get('/edit/:id', async(req,res)=>{       //a servidor cuando me pidan edit con id cualquiera:
    const{id}=req.params;
    const task=await Task.findById(id);
    res.render('edit',{
        task
    });
});


router.post('/edit/:id', async(req,res)=>{
    const{id}=req.params;
    await Task.updateOne({_id:id},req.body);
    res.redirect('/'); 
});

router.get('/delete/:id',async (req,res)=>{  //cuando el navegador me pida id es una variable o indice de mi elemento
   //console.log(req.params);
   const{id}=req.params;                    //id que viene de objeto req.params
   //res.send('received');
    await Televisor.remove({_id:id});                 //de mi modelo task remuevo _id con el idde req.params
    res.redirect('/');

});            

module.exports=router;