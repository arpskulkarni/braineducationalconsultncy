'use strict';

function roleCheck(roles) {
    return function(req, res, next) {
        const userRole = req.user.role; // assuming user role is stored in req.user
        
        if (!userRole) {
            return res.status(403).send('Access denied. No role assigned.');
        }
        
        if (roles.includes(userRole)) {
            next(); // user role is authorized
        } else {
            return res.status(403).send('Access denied. Insufficient permissions.');
        }
    };
}

// Export the middleware function
module.exports = roleCheck;
