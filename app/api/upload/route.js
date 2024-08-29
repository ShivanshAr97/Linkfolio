import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req, res, next) {
  try {
    if (!folder) {
      res.status(400).json({ error: "Folder name is required" });
      return;
    }
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ timestamp, signature });
    return;
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
    return;
  }
}
