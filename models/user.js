const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

<<<<<<< HEAD
const workoutSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    muscle: {
      type: String,
    },
    equipment: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    instructions: {
      type: String
    }
}, { timestamps: true });

=======
>>>>>>> 87187b775c8a8b070779faf5f73d5a36507eb0f2
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
