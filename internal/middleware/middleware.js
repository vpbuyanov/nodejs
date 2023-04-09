export const AuthorizationRequest = (req, res, next) => {
    if (req.headers["api-key"] !== "key" && req.method !== "GET"){
        console.log(req.headers)
        console.log(req.method)
        res.send(403, "Access Denied!")
    }
    next()
}
