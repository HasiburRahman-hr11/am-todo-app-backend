const { Schema, model, Types } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tasks: [
      {
        id: Types.ObjectId,
        title: {
          type: String,
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);
module.exports = Todo;
