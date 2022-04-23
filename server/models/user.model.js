const { model, Schema } = require("mongoose");
const {
  isEmail,
  isMobilePhone,
  isStrongPassword,
  isCreditCard,
} = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) throw new Error("email format is invalid");
      },
    },
    phone: {
      type: String,
      validate(value) {
        if (!isMobilePhone(value)) throw new Error("phone format is invalid");
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate(value) {
        if (!isStrongPassword(value))
          throw new Error("Use a strong password instead");
      },
    },
    security: {
      securityQuestion: String,
      securityAnswer: String,
    },
    profilePic: {
      type: String,
      default: "uploads/noAvatar.png",
    },
    adress: {
      country: String,
      city: String,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      enum: ["Admin", "User"],
      required: true,
      default: "User",
    },
    position: {
      type: String,
      enum: ["Manger", "Assistant"],
      required: function () {
        return this.role != "User";
      },
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  const { password, __v, ...others } = user;
  return others;
};
userSchema.statics.loginUser = async function (email, password) {
  let user = await this.findOne({ email });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect E-mail");
};
userSchema.methods.generateToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.TOKEN);
  this.tokens = this.tokens.concat({ token });
};

const User = model("User", userSchema);
module.exports = User;
