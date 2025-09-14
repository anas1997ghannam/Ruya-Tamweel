//path->app/blog/blog.tsx
"use client";

import {
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Articles from "../../article/Articles";
import MyArticles from "../../article/[id]/Articles";
import ArticleDialog from "../../dialogs/ArticleDialog";
interface BlogPageProps {
  userId?: string;
}
const BlogPage = ({ userId }: BlogPageProps) => {
  const theme = useTheme();
  const [tab, setTab] = useState<"all" | "mine" | "add">("all"); // الافتراضي هو "كل المدونات"
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newTab: "all" | "mine" | "add"
  ) => {
    if (newTab === "add") {
      setOpenDialog(true);
    } else if (newTab !== null) {
      setTab(newTab);
    }
  };

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: theme.palette.background.default,
        pt: "68px",
        height: "100vh",
        direction: "ltr",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color={theme.palette.primary.main}
      >
        المدونة
      </Typography>

      <Divider sx={{ my: 3, backgroundColor: theme.customColors.accent }} />

      <Stack alignItems="center" mb={4}>
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={handleChange}
          aria-label="blog tabs"
        >
          <ToggleButton value="mine">مدوناتي</ToggleButton>
          <ToggleButton value="all">كل المدونات</ToggleButton>
          <ToggleButton value="add">
            <AddIcon sx={{ color: "green" }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {tab === "all" && <Articles />}
      {tab === "mine" && userId && <MyArticles userId={userId} />}

      <ArticleDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};

export default BlogPage;
