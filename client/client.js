// counter starts at 0
Session.setDefault('counter', 0);

Template.light_ui.helpers({

});

Template.register.events({
  "submit .register-form": function(event) {
    event.preventDefault();
    const regEmail = event.target.registerEmail.value 
    const regPassword = event.target.registerPassword.value
    if (regEmail && regPassword) {
      Accounts.createUser({
        email: regEmail,
        password: regPassword 
      }, function(err) {
        console.log(err);
      });
    } else {
      //LOL TODO
      alert('you suck!');
    }
  }
});

Template.login.events({
  "submit .login-form": function(event) {
    event.preventDefault(); 
    const email = event.target.loginEmail.value
    const password = event.target.loginPassword.value
    Meteor.loginWithPassword(email, password, function(err) {
      //TODO error for User not found or incorrect password. 
      console.log("error" + err);
    });
  }
});

Template.logout.events({
  "click .logout": function(event) {
    event.preventDefault();
    Meteor.logout();
  }
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
