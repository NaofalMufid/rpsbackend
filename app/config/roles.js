const AccessControl = require('accesscontrol')
const ac = new AccessControl()

module.exports = (function() {
    ac.grant("PlayerUser")
    .readOwn("user")
    .updateOwn("user")

    ac.grant("SuperAdmin")
    .extend("PlayerUser")
    .updateAny("user")
    .deleteAny("user")

    return ac
})()