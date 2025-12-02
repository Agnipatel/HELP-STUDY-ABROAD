// app/products/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { Box, Typography, Paper, Button } from "@mui/material";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const fetchProductById = useStore((s) => s.fetchProductById);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProductById(Number(params.id)).then(setProduct);
  }, [params.id, fetchProductById]);

  if (!product) return <div>Loading...</div>;

  return (
    <Box className="p-6">
      <Button href="/products" variant="outlined">Back to Products</Button>

      <Paper className="p-6 mt-4">
        <Typography variant="h4">{product.title}</Typography>
        <Box className="flex gap-4 mt-4">
          <Box>
            <img src={product.thumbnail} alt={product.title} width={320} />
            {/* images carousel: product.images */}
            <div className="flex gap-2 mt-2">
              {product.images?.map((src:string, i:number) => (
                <img key={i} src={src} width={80} alt={`${product.title}-${i}`} />
              ))}
            </div>
          </Box>

          <Box>
            <Typography>Price: ₹{product.price}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography className="mt-2">{product.description}</Typography>
            {/* specs */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
