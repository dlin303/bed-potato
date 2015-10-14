ParticleInfo = new Mongo.Collection("particleInfo");

const particleApi = "https://api.particle.io/v1/devices/"
const particleFunc = "toggleLight"

const testEndpoint = "http://requestb.in/1m9lnx61"
const apiKey = Meteor.settings.particle_api_token

Meteor.startup(function () {
  // code to run on server at startup

});

Meteor.methods({
  toggleLight: function(userId) {
    authorizeOrError();
    //get device_id from db just to be safe
    var user = Meteor.users.findOne({_id: userId}); //TODO KILL
    var particleInfo = ParticleInfo.findOne({"userId": userId});
    var deviceId = particleInfo['device_id'];

    if (deviceId) {
      var endpoint = particleApi + deviceId + "/" + particleFunc;            
      var options = {'params' : { 'access_token' : apiKey }}

      HTTP.post(endpoint, options, function(error, result){
        if(error) {
          //TODO report when device is not connected
          console.log("Error: ", error);
        } else {
          console.log("Result: ", result);
        }
      });

    } else {
      console.log("Error: device_id is null");
    }
  },

  createParticleInfo: function() {
     authorizeOrError();
     ParticleInfo.insert({"userId": Meteor.userId(), "device_id": "dummyId"}); 
  }
});

var authorizeOrError = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
    }
};
