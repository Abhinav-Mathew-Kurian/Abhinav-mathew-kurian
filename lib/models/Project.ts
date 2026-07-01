import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    /** Higher-level competencies demonstrated (vs. concrete tools in techStack). */
    keySkills: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["full-time", "personal"],
      default: "personal",
    },
    role: { type: String },
    /** Free-text real date range, e.g. "05/2026 – 06/2026" — shown on the card. */
    period: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    coverImage: { type: String },
    gallery: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["live", "in-progress", "archived"],
      default: "live",
    },
  },
  { timestamps: true }
);

export type Project = InferSchemaType<typeof projectSchema> & {
  _id: string;
};

export const ProjectModel =
  models.Project || model("Project", projectSchema);
