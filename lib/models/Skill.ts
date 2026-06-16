import { Schema, model, models, type InferSchemaType } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Frontend Development",
        "Backend Development",
        "Real-Time Systems",
        "Security & Cryptography",
        "Databases",
        "Cloud & DevOps",
        "AI & Agents",
        "Blockchain",
      ],
      required: true,
    },
    icon: { type: String },
    proficiency: { type: Number, min: 1, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Skill = InferSchemaType<typeof skillSchema> & { _id: string };

export const SkillModel = models.Skill || model("Skill", skillSchema);
