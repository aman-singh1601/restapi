const User = require('../models/user.js');

async function getAllUsers (req, res) {
    const allUsers = await User.find({});

    return res.status(200).json(allUsers);
}
async function getUserById (req, res) {
    const result = await User.findById({_id: req.params.id});
    return res.status(200).json(result);
}
async function patchUser (req, res) {
    const body = req.query;
    console.log(body);
    const result = await User.findOneAndUpdate({_id: req.params.id }, body);

    return res.status(200).json(result);
}
async function deleteUser (req, res) {
    const result =  await User.findOneAndDelete({_id: req.params.id});
    return res.status(200).json(result);
}
async function createUser (req, res) {
    const body = req.query;

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender
    })
    return res.status(200).json(result);
}

module.exports = {getAllUsers, patchUser, deleteUser, createUser, getUserById};