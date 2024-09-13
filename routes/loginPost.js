function loginPost (req, res) {
    const authenticateAdmin = require('../functions/authenticateAdmin');
        
    const { username, password } = req.body;
    
    // Replace with your authentication logic
    if (authenticateAdmin(username, password)) {
        req.session.username = username;
        req.session.userLoggedIn = true;
        res.redirect('/adminReviewPage');
    } else {
        res.redirect('/login');
    }
};

module.exports = loginPost;