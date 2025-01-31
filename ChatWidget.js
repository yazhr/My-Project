import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/chat", formData);
      alert("Your query has been submitted!");
      setOpen(false);
      setFormData({ name: "", email: "", question: "" });
    } catch (error) {
      console.error("Error submitting chat:", error);
      alert("Failed to submit your query.");
    }
  };

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
        <IconButton
          color="primary"
          sx={{
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
          onClick={() => setOpen(true)}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ask a Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Your Question"
            name="question"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={formData.question}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatWidget;