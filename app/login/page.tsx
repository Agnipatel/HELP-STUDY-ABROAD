// app/login/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username: form.username,
      password: form.password
    });

    setLoading(false);
    if (res?.ok) {
      // redirect to dashboard
      router.push("/dashboard");
    } else {
      alert("Login failed. Use: 'kminchelle' / '0lelplR' (dummyjson sample) or check credentials.");
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-12">
      <Typography variant="h4" gutterBottom>Admin Login </Typography>
      <form onSubmit={submit} className="space-y-4">
        <TextField fullWidth label="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        <TextField fullWidth label="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
      </form>
    </Box>
  );
}
