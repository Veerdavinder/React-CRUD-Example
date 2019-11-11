const express = require('express');
const businessRoutes = express.Router();

let Business = require('./business.model');

businessRoutes.route('/add').post(function(req,res){
    let business = new Business(req.body);
    business.save()
        .then(business =>{
            res.status(200).json({'business':'business in added successfully'});
        })
        .catch(err=>{
            res.status(400).send("Unable to save to database");
        });
})

businessRoutes.route('/').get(function(req,res){
    Business.find(function(err,busNess){
        if(err){
            console.log(err);
        }
        else{
            res.json(busNess);
        }
    });
});

businessRoutes.route('/edit/:id').get(function(req,res){
    let id= req.params.id;
    Business.findById(id,function(err,business){
        res.json(business);
    })
})

businessRoutes.route('/update/:id').post(function(req,res){
    Business.findById(req.params.id,function(err,business){
        if(!business)
        res.status(404).send("data is not found");
        else{
        business.personName = req.body.personName;
        business.businessName=req.body.businessName;
        business.businessGstNumber = req.body.businessGstNumber;

        business.save().then(business =>{
            res.json('Update Complete');
        })
        .catch(err=>{
            res.status(400).send("Unable to update the database");
        });
    }
    });
});

businessRoutes.route('/delete/:id').get(function(req,res){
    Business.findByIdAndRemove({_id:req.params.id},function(err,business){
        if(err) res.json(err);
        else res.json('Successfully Removed');
    });
});

module.exports = businessRoutes;