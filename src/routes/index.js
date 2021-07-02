const express=require('express');
const router=express.Router();

/*router.get('/',(req,res)=>{                   //cuando hago peticion a ruta inicial de mi servidor escribo hello world
    res.send('hello world')
});*/

const Televisor = require('../models/televisor');         //importo modelos para poder utilizar mi esquema de objeto

router.get('/',(req,res)=>{           
    res.render('index')
})

router.get('/inventario',async(req,res)=>{ 
    const televisores = await Televisor.find();           
    res.render('inventario',{
        televisores   //task:task
    });                       
});

router.get('/usuario',async(req,res)=>{   
    const televisores = await Televisor.find();
    televisor=new Televisor(req.body)                   
    res.render('usuario',{
        televisores   //task:task
    });                       
});

router.post('/compra',async(req,res)=>{ 
    const resultado= req.body.buscar;
    televisores=await Televisor.find({$text: {$search: resultado}})
    res.render('compra',{
       televisores   //task:task
    });                       
});

router.get('/comprado/:id/:cantidad',async (req,res)=>{  //cuando el navegador me pida id es una variable o indice de mi elemento lo mismo cantidad, los uso para extraer una variable
    const{id}=req.params;                
    const{cantidad}=req.params;    
    if (cantidad>0){                         //extraigo la variable de los req.params de mi url
        await Televisor.findOneAndUpdate({_id:id},{$set:{cantidad:cantidad-1}});
    }
    console.log( cantidad,id);
    res.redirect('/usuario');
 }); 

router.post('/add',async (req,res)=>{                      
    const televisor=new Televisor(req.body);              
    await televisor.save();                            
    res.redirect('/inventario');                             
});

router.get('/edit/:id', async(req,res)=>{       //a servidor cuando me pidan edit con id cualquiera:
    const{id}=req.params;
    const televisor=await Televisor.findById(id);
    res.render('edit',{
        televisor
    });
});

router.post('/edit/:id', async(req,res)=>{   //ACTUALIZAR
    const{id}=req.params;
    await Televisor.updateOne({_id:id},req.body);
    res.redirect('/inventario'); 
});

router.get('/delete/:id',async (req,res)=>{  //cuando el navegador me pida id es una variable o indice de mi elemento
   const{id}=req.params;                    //id que viene de objeto req.params
    await Televisor.remove({_id:id});                 //de mi modelo task remuevo _id con el id de req.params
    res.redirect('/inventario');

});            

module.exports=router;