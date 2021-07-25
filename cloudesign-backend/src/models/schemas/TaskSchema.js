import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discription: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "In-progress", "Complete"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("task", TaskSchema);
