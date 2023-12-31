const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {

    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      cart: {
        type: Array,
        default: [],
      },
      address: {
        type: String,
      },

      role: {
        type: String,
        default: 'user'
      },
      isBlocked: {
        type:Boolean,
        default: false,
      },
      wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      refreshToken: {
        type: String,
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    //hash the password and store in DB
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);    
})

//check if entered password is correct
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model("User", userSchema);