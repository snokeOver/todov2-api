const express = require("express");
const router = express.Router();
const ToDo = require("../schemas/todoSchema");

//Insert One Todo into MongoDB
router.post("/create-post", async (req, res) => {
  try {
    const todo = new ToDo(req.body);
    const savedTodo = await todo.save();
    console.log(savedTodo);
    res.send({
      Message: "Todo Saved Successfully!",
    });
  } catch (err) {
    console.log("Failed to save Todo", err.message);
    res.status(500).send({ Message: "There is a server side error" });
  }
});

//Fetch One Todo from MongoDB
router.get("/", async (req, res) => {
  try {
    const fetchedTodo = await ToDo.find();
    res.json(fetchedTodo);
  } catch (err) {
    console.log("Error fetching data from DB", err.message);
    res.status(500).json({
      Message: "Server side error.",
    });
  }
});

//Delete One Todo from MongoDB
router.delete("/:ID", async (req, res) => {
  try {
    const response = await ToDo.deleteOne({ _id: req.params.ID });
    console.log("Todo deleted successfully!", response);
    res.json({
      Message: "Todo Deleted Successfully!",
    });
  } catch (err) {
    console.log("Failed to delete", err.message);
    res.status(500).json({
      Message: "Failed to delete Todo",
    });
  }
});

module.exports = router;
