const { getUserByEmail } = require("../services/user.services") ;
const {  comparePassword } = require('../utils/crypto') ;

const loginUser = async (email, password) => {
    try {
       const user = await getUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
            
        }
        return false
    } catch {
        /* handle error */
        return false
    }
    
}

module.exports = {
    loginUser
}