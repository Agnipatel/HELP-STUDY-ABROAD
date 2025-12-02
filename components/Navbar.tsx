// components/NavBar.tsx
"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";

export default function NavBar() {
  const { data: session } = useSession();
  const setToken = useStore((s) => s.setToken);

  // Mirror token from NextAuth session into Zustand
  useEffect(() => {
    if ((session as any)?.accessToken) {
      setToken((session as any).accessToken);
    } else {
      setToken(null);
    }
  }, [session, setToken]);

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar className="max-w-7xl mx-auto flex justify-between">
        <Typography variant="h6">Agni_Tech</Typography>

        <div className="flex gap-3">
          <Link href="/users"><Button>Users</Button></Link>
          <Link href="/products"><Button>Products</Button></Link>

          {!session ? (
            <Button variant="contained" color="primary" onClick={() => signIn()}>
              Login
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
