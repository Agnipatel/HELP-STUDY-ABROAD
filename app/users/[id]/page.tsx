// app/users/[id]/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { Box, Typography, Paper, Button } from "@mui/material";

export default function UserDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const fetchUserById = useStore((s) => s.fetchUserById);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserById(Number(id)).then(setUser);
  }, [id, fetchUserById]);

  if (!user) return <div>Loading...</div>;

  return (
    <Box className="p-6">
      <Button variant="outlined" href="/users">Back to Users</Button>
      <Paper className="p-6 mt-4">
        <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Typography>Address: {user.address?.address}, {user.address?.city}</Typography>
      </Paper>
    </Box>
  );
}
