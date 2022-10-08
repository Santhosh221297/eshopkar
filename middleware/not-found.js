const motFound = (res, req) => {
    res.status(404).send("Route doesn't exists...")
}

module.exports = notFound