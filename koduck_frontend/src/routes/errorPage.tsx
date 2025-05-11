import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "60vh", display: "flex", justifyContent: "center" }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Oops, something went wrong!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
              },
              mt: 2,
            }}
          >
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
