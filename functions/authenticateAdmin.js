function authenticateAdmin(username, password) {
    
    const storedUsername = "Admin";
    const storedPassword = "Admin"; 

    if (username === storedUsername && password=== storedPassword) {
        return true;
    }
    return false;
};

module.exports = authenticateAdmin;
