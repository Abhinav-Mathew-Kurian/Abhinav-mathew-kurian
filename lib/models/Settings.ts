import { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * Singleton settings document — there's only ever one row. Currently just
 * holds the resume URL so it can be updated from /admin without a
 * redeploy, but kept generic in case other site-wide settings show up.
 */
const settingsSchema = new Schema(
  {
    resumeUrl: { type: String },
  },
  { timestamps: true }
);

export type Settings = InferSchemaType<typeof settingsSchema> & { _id: string };

export const SettingsModel = models.Settings || model("Settings", settingsSchema);
