import { Box, Container, TextField, Typography } from "@mui/material";
import { login } from "./actions";
import SubmitButton from "@/components/buttons/SubmitButton";

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <SubmitButton
            type="submit"
            formAction={login}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            text="Sign In"
          />
        </Box>
      </Box>
    </Container>
  );
}
