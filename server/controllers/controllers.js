var mongoose = require('mongoose');
require('../models/models.js');

var Pet = mongoose.model('Pet'); //Any name is okay

module.exports={
    allPets: function(req,res){
        console.log('All Pets')
        Pet.find({}, function(err, pets){
            if(err){
                console.log("Error:", err);
            } else{
                return res.json({message: "Success", pets:pets})
            }
        
        }).sort({'type':1});
    },
    add_pet: function(req,res){
        name = req.body.name
        type = req.body.type
        description = req.body.description
        skillOne = req.body.skillOne
        skillTwo = req.body.skillTwo
        skillThree = req.body.skillThree
        likes = req.body.likes

        var new_pet = new Pet ({
            name: name,
            type: type,
            description: description,
            skillOne: skillOne,
            skillTwo: skillTwo,
            skillThree: skillThree,
            likes: likes
        });
        // console.log(new_task)
        new_pet.save(function(err, pet){
            if(err){
                res.json({message: "error", errors:err})
            } else{
                res.json({message: 'success', data: pet})
                // res.redirect('/')
            }
        });
    },
    update_pet: function(req,res){
        Pet.findOne({_id:req.params._id}, function(err, pet){
            pet.name=req.body.name, 
            pet.type=req.body.type, 
            pet.description=req.body.description, 
            pet.skillOne=req.body.skillOne,
            pet.skillTwo=req.body.skillTwo, 
            pet.skillThree=req.body.skillThree,
            pet.likes=req.body.likes

            pet.save(function(err, pet){
                if(err){
                    res.json({message: "error", errors:err})
                } else{
                    res.json({message: 'success', data: pet})
                }
            })
        })
    },
    find_pet: function(req,res){
        Pet.findOne({_id:req.params._id}, 
            function(err, pet){
            if(err){
                res.json({message:"Error", error:err});
            } else{
                res.json({message:"Success", data:pet});
            }
        });
    },
    info_pet: function(req,res){
        Pet.findOne({_id:req.params._id}, 
            function(err, pet){
            if(err){
                res.json({message:"Error", error:err});
            } else{
                res.json({message:"Success", data:pet});
            }
        });
    },
    delete_pet: function(req,res) {
        Pet.findOneAndDelete({_id:req.params._id}, function(err, pet){
            if(err){
                res.json({message: "error", data: pet})
            } else{
                res.json({message: "success", data: pet});
            }
        })
    },
    like_pet: function(req,res){
        Pet.findOneAndUpdate({_id:req.params._id}, 
            {$inc: { likes: 1 }},  {new: true },
            function(err, pet){
            if(err){
                res.json({message:"Error", error:err});
            } else{
                res.json({message:"Success", data:pet});
            }
        });
    },

}