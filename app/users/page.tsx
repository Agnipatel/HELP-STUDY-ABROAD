// app/users/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "@/lib/store/useStore";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Box, Pagination
} from "@mui/material";
import Link from "next/link";

export default function UsersPage() {
  const fetchUsers = useStore((s) => s.fetchUsers);
  const [data, setData] = useState<any>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const load = useCallback(async () => {
    const skip = (page - 1) * limit;
    const res = await fetchUsers({ limit, skip, q });
    setData(res);
  }, [fetchUsers, page, q]);

  useEffect(() => { load(); }, [load]);

  return (
    <Box className="p-6">
      <Box className="flex items-center gap-3 mb-4">
        <TextField label="Search users" value={q} onChange={(e)=>setQ(e.target.value)} />
        <Button variant="contained" onClick={()=>setPage(1)}>Search</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((u:any) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link href={`/users/${u.id}`}>{u.firstName} {u.lastName}</Link>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.gender}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.company?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil((data?.total || 0) / limit)}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
      </Box>
    </Box>
  );
}
