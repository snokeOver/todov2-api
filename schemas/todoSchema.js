const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
  todoName: {
    type: String,
    required: true,
  },

  dueDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo2", TodoSchema);
