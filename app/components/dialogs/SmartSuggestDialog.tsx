//path-->app/components/dialogs/SmartSuggestDialog.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { ChatMessage, Project } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (project: Project) => void;
}

const SmartSuggestDialog = ({ open, onClose, onSelect }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSupportedOption, setShowSupportedOption] = useState(true);

  useEffect(() => {
    if (open) {
      setMessages([]);
      setInput("");
      setLoading(false);
      setShowSupportedOption(true);
    }
  }, [open]);

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    const newUserMsg: ChatMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);
    setShowSupportedOption(false);

    try {
      const res = await fetch("/api/smart-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();
      const newBotMsg: ChatMessage = { role: "bot", content: data.reply || "" };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "حدث خطأ أثناء الاتصال بالخادم." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderBotContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) return content;

      return parsed.map((p: Project, i: number) => (
        <Box
          key={i}
          sx={{
            background: "#424242",
            p: 1.5,
            borderRadius: 2,
            my: 0.5,
            textAlign: "right",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="white">
            {p.name}
          </Typography>
          <Typography color="primary.light" variant="body2">
            {p.type}
          </Typography>
          <Typography variant="body2" color="grey.300">
            {p.description}
          </Typography>
          <Typography variant="body2" mt={0.5} color="grey.300">
            الميزانية: {p.budget}$
          </Typography>
          {/* <Box textAlign="left" mt={1}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => onSelect(p)}
              sx={{
                background: "#1976d2",
                color: "white",
                "&:hover": { background: "#115293" },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box> */}
        </Box>
      ));
    } catch {
      return (
        <Typography sx={{ whiteSpace: "pre-line" }} color="white">
          {content}
        </Typography>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          bgcolor: "#121212", // dark mode
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#1f1f1f",
          color: "white",
          textAlign: "center",
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        اقتراح مشاريع عبر الذكاء الاصطناعي
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", left: 8, top: 8, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {loading && (
          <Box textAlign="center" my={1}>
            <CircularProgress size={20} color="primary" />
          </Box>
        )}

        {messages
          .slice()
          .reverse()
          .map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  bgcolor: msg.role === "user" ? "#1976d2" : "#333",
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  maxWidth: "70%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  wordBreak: "break-word",
                }}
              >
                {msg.role === "bot"
                  ? renderBotContent(msg.content)
                  : msg.content}
              </Box>
            </Box>
          ))}

        {showSupportedOption && (
          <Box
            sx={{
              bgcolor: "#333",
              p: 1.5,
              borderRadius: 2,
              textAlign: "center",
              mb: 1,
              color: "white",
            }}
          >
            <Typography variant="body2" mb={1}>
              معلومات يجب عليك معرفتها.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleSend("مشاريع تم التواصل معها")}
            >
              هل ترغب برؤية مشاريع لرياديين,تم التواصل معها؟
            </Button>
            <Box textAlign="center" my={1}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => handleSend("كيف أبدأ")}
              >
                كيف أبدأ؟
              </Button>
              <Box textAlign="center" my={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() =>
                    handleSend("النقاط التي يجب التركيز عليها قبل نشر المشروع")
                  }
                >
                  النقاط التي يجب التركيز عليها
                </Button>
              </Box>
              <Box textAlign="center" my={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() =>
                    handleSend("مثال لكيفية اضافة مشروع بشكل كامل.")
                  }
                >
                  مثال لكيفية اضافة مشروع بشكل كامل.
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          py: 1,
          bgcolor: "#1f1f1f",
          borderTop: "1px solid #444",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            borderRadius: 3,
            bgcolor: "#333",
            px: 1,
          }}
        >
          <TextField
            variant="standard"
            placeholder="اكتب رسالتك..."
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: { color: "white" }, // white text
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            sx={{
              flex: 1,
              px: 1,
            }}
          />
          <IconButton
            color="primary"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
        <IconButton
          color="error"
          onClick={() => setMessages([])}
          sx={{ ml: 1, color: "#f44336" }}
        >
          <RestartAltIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default SmartSuggestDialog;
