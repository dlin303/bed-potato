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
    return Meteor.userId() !== null;
  }
});
