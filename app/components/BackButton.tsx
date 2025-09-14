"use client";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={() => router.back()}
      startIcon={<ArrowBackIcon />}
      sx={{
        direction: "ltr",
        color: "white",
        borderColor: "white",
        mt: 2,
      }}
    >
      رجوع
    </Button>
  );
};

export default BackButton;
