const { checkToken } = require('./token_validation');


function middleware(req, res, next) {
    const token = req.get("authorization").slice(7);
    checkToken(token, (results, err) => {
        if (err) {
            console.log(err);
        }
        if (results['success'] === 0) {
            res.json(results);


        }
        if (results['success'] !== 0) {
            req.authorization = results
            next()

        }
    });
}

module.exports = {
    middleware
}