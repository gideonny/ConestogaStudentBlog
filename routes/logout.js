function logout (req,res) {
    req.session.destroy();
    res.redirect('/main');
}

module.exports = logout;