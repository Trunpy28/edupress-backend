import mongoose from "mongoose";

const RegisterCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    coureseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending"
    },
  },
  {
    timestamps: true,
  }
);

const RegisterCourseModel = mongoose.model(
  "RegisterCourse",
  RegisterCourseSchema
);
export default RegisterCourseModel;
