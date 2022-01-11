const { request, response } = require('express');
const User = require('../model/user');

module.exports.profile = (request, response) => {
    
    console.log("In profile");
    console.log(request.session);

   if(request.session.user == undefined) {
      return response.redirect('/users/sign-in');
   }

   return response.render('user_profile', {
    title: 'User Profile',
    name: request.session.user.name
});
    
}


//render  the sign up page
module.exports.signUp = (request, response) => {
    return response.render('user_sign_up', {
        title: 'codeial | Sign Up'
    });

}

//render the sign In page
module.exports.signIn = (request, response) => {
    return response.render('user_sign_in', {
        title: 'codeial | Sign In'
    });
}


module.exports.logout = (request, response) => {
    console.log(request.session);
    
    request.session.destroy();
    console.log('------------------');
    console.log(request.session);
    return response.render('home');

}



//get the sign up data
module.exports.create = (request, response) => {
    console.log(request.body);
    if (request.body.password != request.body.confirm_password) {
        return response.redirect('back');
    }
    User.findOne({ email: request.body.email }, (err, user) => {
        if (err) { console.log("error in finding user in signing up"); return }

        if (!user) {
            User.create(request.body, (err, user) => {
                if (err) { console.log("error in creating user while signing up "); return }

                return response.redirect('/users/sign-in');
            })
        } else {

            return response.redirect('back');
        }
    })
}

//sign in  and create a session for the user
module.exports.createSession = (request, response) => {
    //Todo later
    console.log(request.session);

    User.findOne({ email: request.body.email }, (err, user) => {
       
        if (user) {
            if (request.body.password == user.password) {
                request.session['user'] = user;
                return response.redirect('/users/profile');
            }
        }

        return response.redirect('/users/sign-in');
    })


}