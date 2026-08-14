import express from "express";
import cors from "cors"
import {v2 as cloudinary } from "cloudinary";
const app = express();
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json())
app.use(cors())

app.post("/get-url", async (req, res) => {
  try {
    // Generate a secure timestamp (in seconds)
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Optional: Define upload parameters you want to lock down (like a folder name)
    const folder = "user_uploads";

    // Create the cryptographic signature using your hidden API secret
    const signature = cloudinary.utils.api_sign_request(
      {
        folder: folder,
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    // Return the parameters back to the browser securely
    res.json({
      timestamp,
      signature,
      folder,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        ? process.env.CLOUDINARY_API_KEY
        : undefined,
    });
  } catch (error) {
    return res.json(
      { error: "Failed to generate upload signature" },
      { status: 500 },
    );
  }
});


app.listen(3000,()=>console.log("jhjh"))