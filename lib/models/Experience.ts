import { Schema, model, models, type InferSchemaType } from "mongoose";

const experienceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    /** Short 1-2 sentence version shown on the homepage timeline. */
    summary: { type: String, required: true },
    /** Full bullet-point detail shown on the About page's CV section. */
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Experience = InferSchemaType<typeof experienceSchema> & {
  _id: string;
};

export const ExperienceModel =
  models.Experience || model("Experience", experienceSchema);
