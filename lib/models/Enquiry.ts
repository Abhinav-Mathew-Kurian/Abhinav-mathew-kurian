import { Schema, model, models, type InferSchemaType } from "mongoose";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    projectType: { type: String },
    budgetRange: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "responded"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type Enquiry = InferSchemaType<typeof enquirySchema> & {
  _id: string;
};

export const EnquiryModel =
  models.Enquiry || model("Enquiry", enquirySchema);
