const Follow = require("../models/follow");

const followUserIds = async (identityUserId) => {

    // Sacar info seguimiento
    let following = await Follow.find({ "user": identityUserId })
        .select({ "_id": 0, "followed": 1 })
        .then((follows) => follows)
        .catch((error) => {

        })

    let followers = await Follow.find({ "followed": identityUserId })
        .select({ "_id": 0, "user": 1 })
        .then((follows) => follows)
        .catch((error) => {

        });

    // procesar array de identificadores
    let following_clean = [];

    following.forEach(follow => {
        following_clean.push(follow.followed);
    });

    let followers_clean = [];

    followers.forEach(follow => {
        followers_clean.push(follow.followed);
    });

    return {
        following: following_clean,
        followers: followers_clean
    }
}

// Saber si un usuario me sigue o no me sigue
const followThisUser = async (identityUserId, profileUserId) => {

    // Sacar info seguimiento
    let following = await Follow.findOne({ "user": identityUserId, "followed": profileUserId })

    let followers = await Follow.findOne({ "followed": identityUserId, "user": profileUserId })

        return {
            following,
            followers
        }

}

module.exports = {
    followUserIds,
    followThisUser
}