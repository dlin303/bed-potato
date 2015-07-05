if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.light_ui.helpers({

  });

  Template.light_ui.events({
    "click .light_switch" : function() {
        Meteor.call("toggleLight", Meteor.userId());
    } 
  });

  Template.body.helpers({
    loggedIn: function() {
      console.log(Meteor.userId());
      return Meteor.userId() !== null;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

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
