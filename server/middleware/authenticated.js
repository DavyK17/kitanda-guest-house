export const loggedIn = (req, res, next) => (req.isAuthenticated() ? next() : res.status(401).send("Error: You are not logged in."));
export const loggedOut = (req, res, next) => (!req.isAuthenticated() ? next() : res.status(403).send("Error: You are not logged out."));
