const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Task
router.post("/", protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to create task" });
  }
});

// Get all Tasks for a User
router.get("/", protect, async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default: page 1, 10 tasks per page
    try {
      const tasks = await Task.find({ user: req.user.id })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const totalTasks = await Task.countDocuments({ user: req.user.id });
  
      res.status(200).json({
        tasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch tasks" });
    }
  });
  

// Update a Task
router.put("/:id", protect, async (req, res) => {
    console.log("Received request to update task with ID:", req.params.id);
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task || task.user.toString() !== req.user.id) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: "Unable to update task" });
    }
  });
  

// Delete a Task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete task" });
  }
});


router.patch("/:id/status", protect, async (req, res) => {
    try {
      const { status } = req.body;
      const validStatuses = ["Pending", "In Progress", "Completed"];
  
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
  
      const task = await Task.findById(req.params.id);
  
      if (!task || task.user.toString() !== req.user.id) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      task.status = status;
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Unable to update status" });
    }
});


// Endpoint to get task statistics
router.get('/stats', async (req, res) => {
    try {
      const completed = await Task.countDocuments({ status: 'Completed' });
      const pending = await Task.countDocuments({ status: 'Pending' });
      const inProgress = await Task.countDocuments({ status: 'In Progress' });
      
      res.json({
        completed,
        pending,
        inProgress,
      });
    } catch (err) {
      console.error("Error fetching task stats:", err);
      res.status(500).send("Error fetching stats");
    }
});

  
module.exports = router;
