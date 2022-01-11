const { request, response } = require('express');
const User = require('../model/user');

module.exports.profile = (request, response) => {
   
   if(request.cookies.user_id == undefined) {
      return response.redirect('/users/sign-in');
   }

   User.findById(request.cookies.user_id, (err, user) => {
        return response.render('user_profile', {
            title: 'User Profile',
            name: user.name
        });
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
    response.clearCookie('user_id');
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

    User.findOne({ email: request.body.email }, (err, user) => {
        if (user) {
            if (request.body.password == user.password) {
                response.cookie('user_id', user.id);
                return response.redirect('/users/profile');
            }
        }

        return response.redirect('/users/sign-in');
    })


}