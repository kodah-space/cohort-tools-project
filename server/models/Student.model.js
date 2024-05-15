const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    default: "",
  },
  languages: [
    {
      type: String,
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
      required: true,
    },
  ],
  program: {
    type: String,
    required: true,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "https://i.imgur.com/r8bo8u7.png",
  },
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort",
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = model("Student", studentSchema);
