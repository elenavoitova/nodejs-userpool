let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//user schema definition
let UserSchema = new Schema(
    {
        _id: { type: Number },
        username: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        _id: false,
        versionKey: false
    }
);
//add autoincrement for id field
UserSchema.plugin(AutoIncrement);

UserSchema.query.byUsername = function (username) {
    return this.find({ username : new RegExp(username, 'i')});
};

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);