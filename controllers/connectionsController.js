const { Connection } = require("./../models/Connection");
const { User } = require("./../models/User");


module.exports.create = async (req,res) => {
    const {from, to} = req.body.connection;

    const connection = new Connection({
        pair: [from, to],
        status: "Pending"
    })

    const toUser = await User.findById(to)

    await connection.save();

    req.flash("success", `Connection request to '${toUser.username}' has been sent`)
    res.redirect(req.redirectTo);
}

module.exports.destroy = async (req,res) => {
    const {user1, user2} = req.body.connection;

    const deleteConnection = await Connection.findOneAndDelete({ pair: { $all: [user1, user2] } })
    console.log(deleteConnection)

    res.redirect(req.redirectTo);
}


