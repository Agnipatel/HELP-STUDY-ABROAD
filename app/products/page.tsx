// app/products/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "@/lib/store/useStore";
import {
  Grid, Card, CardMedia, CardContent, Typography, TextField, Select, MenuItem, Button, Box, Pagination
} from "@mui/material";
import Link from "next/link";

export default function ProductsPage() {
  const fetchProducts = useStore((s) => s.fetchProducts);
  const [data, setData] = useState<any>(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const load = useCallback(async () => {
    const skip = (page - 1) * limit;
    const res = await fetchProducts({ limit, skip, q, category: category || undefined });
    setData(res);
  }, [fetchProducts, page, q, category]);

  useEffect(() => { load(); }, [load]);

  return (
    <Box className="p-6">
      <Box className="flex gap-3 mb-4 items-center">
        <TextField label="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
        <Select value={category} onChange={(e)=>setCategory(String(e.target.value))} displayEmpty>
          <MenuItem value="">All categories</MenuItem>
          <MenuItem value="smartphones">smartphones</MenuItem>
          <MenuItem value="laptops">laptops</MenuItem>
          <MenuItem value="fragrances">fragrances</MenuItem>
          <MenuItem value="skincare">skincare</MenuItem>
        </Select>
        <Button onClick={()=>setPage(1)} variant="contained">Search</Button>
      </Box>

      <Grid container spacing={3}>
        {data?.products?.map((p:any)=>(
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia component="img" height="160" image={p.thumbnail} alt={p.title} />
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>₹{p.price}</Typography>
                <Typography>Category: {p.category}</Typography>
                <Typography>Rating: {p.rating}</Typography>
                <Link href={`/products/${p.id}`}>View</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box className="flex justify-center mt-4">
        <Pagination count={Math.ceil((data?.total || 0) / limit)} page={page} onChange={(_, p)=>setPage(p)} />
      </Box>
    </Box>
  );
}
