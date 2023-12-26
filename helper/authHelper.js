const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password,12);
        return hash
    } catch (error) {
        console.log(error);
    }
}

const  comparePassword = async (pass1,pass2) => {
    try {
        const compare = await bcrypt.compare(pass1,pass2)
        return compare
    } catch (error) {
        console.log(error);
    }
}

module.exports = {hashPassword,comparePassword}
