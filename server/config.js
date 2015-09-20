ParticleInfo = new Mongo.Collection("particleInfo");
Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  toggleLight: function(userId) {
    authorizeOrError();
    //get device_id from db just to be safe
    var user = Meteor.users.find({_id: userId});
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
