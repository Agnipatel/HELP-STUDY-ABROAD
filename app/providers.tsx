// app/providers.tsx
"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react"; // only if using next-auth
import {theme} from "@/lib/theme"; // import theme inside client file

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
