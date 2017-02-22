/**
 * Created by thespidy on 03/12/16.
 */

/**
 * API keys and Passport configuration.
 */
const errorHandler = require('errorhandler');
const passportConfig = require('config/passport');
const passport = require('passport');
const userController = require('controllers/user');


/**
 * Primary app routes.
 */
module.exports = function (app) {
    app.put('/google-signin', userController.googleSignin);
    app.get('/dummy', userController.dummy);

    /**
     * OAuth authentication routes. (Sign in)
     */
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_location']}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/linkedin', passport.authenticate('linkedin', {state: 'SOME STATE'}));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });

    /**
     * Error Handler.
     */
    app.use(errorHandler());
};