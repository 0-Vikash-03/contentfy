import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";

import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import ContactRouter from "./routes/ContactRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";



const app = express();

app.set("trust proxy", 1);

// ✅ CORS (ONLY ONCE)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-saas-project-jade.vercel.app",
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((url) => url.trim()) : []),
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS origin:", origin);
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is Live 🚀"));

app.use("/api/auth", AuthRouter);
app.use("/api/thumbnail", ThumbnailRouter);
app.use("/api/user", UserRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/script", scriptRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ 404 handler (safe, no "*")
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server Error" });
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Server startup failed: database connection could not be established.", error);
    process.exit(1);
  }

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();