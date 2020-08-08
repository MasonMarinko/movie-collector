// if someone isn't logged in and tries to put in path only for users with
// created accounts, if they don't have one they get sent to login page
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;