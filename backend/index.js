import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import eventRoute from "./routes/event-routes.js";
import eventParticipantRoute from "./routes/participants-routes.js";
import bookingEmail from "./routes/booking-email.js";
import adminRoute from "./routes/admin-routes.js";
import faqRouter from "./routes/faq-routes.js";
import ticketRouter from "./routes/ticket-routes.js";
import productRoute from "./routes/product-routes.js";
import purchaseRoute from "./routes/purchase-routes.js";
import refundRoute from "./routes/refund-routes.js";
import ReturnRouter from "./routes/return-routes.js";
import donationsRoute from "./routes/donation-routes.js";
import purchaseEmail from "./routes/purchase-email.js";
import donationEmail from "./routes/donation-email.js";
import saveMeRouter from "./routes/save-me-routes.js";
import returnProductEmail from "./routes/return-email.js";
import MembershipRouter from "./routes/membership-routes.js";
import SubscriptionRouter from "./routes/subscription-routes-alt.js";
import subEmailRouter from "./routes/subscription-routes.js";
import refundEmail from "./routes/refund-email.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

// Setup for ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(
  "/uploads/eventPayment",
  express.static(path.join(__dirname, "uploads/eventPayment"))
);

app.use(
  "/uploads/productImage",
  express.static(path.join(__dirname, "uploads/productImage"))
);

app.use(
  "/uploads/purchasePayment",
  express.static(path.join(__dirname, "uploads/purchasePayment"))
);

app.use(
  "/uploads/receipts",
  express.static(path.join(__dirname, "uploads/receipts"))
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("MERN Testing");
});

// Event Routes
app.use("/events", eventRoute);
app.use("/eventViews", eventRoute);
app.use("/eventViews/eventParticipants", eventParticipantRoute);
app.use("/eventBookingList", eventParticipantRoute);
app.use("/sendEmail", bookingEmail);
app.use("/faq", faqRouter);
app.use("/tickets", ticketRouter);
app.use("/returns", ReturnRouter);

// Product Routes
app.use("/products", productRoute);
app.use("/productViews", productRoute);
app.use("/productViews/purchaseForm", purchaseRoute);
app.use("/purchaseList", purchaseRoute);
app.use("/sendPurchaseEmail", purchaseEmail);

// Refund Routes
app.use("/refunds", refundRoute);
app.use("/userRefunds", refundRoute);
app.use("/sendRefundEmail", refundEmail);

// donations Route
app.use("/donations", donationsRoute);
app.use("/sendDonationEmail", donationEmail);

//login
app.use("/admin", adminRoute);
app.use("/admin/register", adminRoute);

// Product Routes
app.use("/products", productRoute);
app.use("/productViews", productRoute);
app.use("/productViews/purchaseForm", purchaseRoute);
app.use("/purchaseList", purchaseRoute);

//SaveMe Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("api/saveMe", saveMeRouter);

app.use("/returnProductsendEmail", returnProductEmail);

//Membership route
app.use("/memberships", MembershipRouter);
app.use("/subscriptions", SubscriptionRouter);
app.use("/sendSubEmail", subEmailRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
