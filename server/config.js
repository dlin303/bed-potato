Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  toggleLight: function(userId) {
    authorizeOrError();
    console.log("light toggled for: " + userId);
  }
});

var authorizeOrError = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
    }
};
