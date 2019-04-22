var Pet = require('../controllers/controllers');

module.exports = function(app){
    console.log("`````````````")
    app.get('/pets', function (req, res) {
        Pet.allPets(req,res);
    });
    app.post('/create', function (req, res) {
        Pet.add_pet(req,res);
    });
    app.route('/pets/:_id')
      .get(function(req,res){
          Pet.find_pet(req,res);
      })
      .put(function(req,res){
          Pet.update_pet(req,res);
      })
      
    app.route('/info/:_id')
      .get(function(req,res){
          Pet.info_pet(req,res);
      })
      .delete(function(req,res){
          Pet.delete_pet(req,res);
      })
    app.route('/like/:_id')
      .put(function(req,res){
          Pet.like_pet(req,res);
      })
}