import mongoose from "mongoose";
import WebsiteSettings, {
  WebsiteSettingsDocument,
} from "../../models/websiteSettingsModel";

export const createWebsiteSettings = async (
  settingsData: Partial<WebsiteSettingsDocument>,
): Promise<WebsiteSettingsDocument> => {
  const settings = new WebsiteSettings(settingsData);
  return settings.save();
};
export const checkAlreadyExistWebsiteSettings = async () => {
  return WebsiteSettings.findOne({ isDeleted: false });
};
export const findWebsiteSettingsById = async (
  settingsId: string,
): Promise<WebsiteSettingsDocument | null> => {
  return WebsiteSettings.findById(settingsId);
};

export const updateWebsiteSettings = async (
  settingsId: string,
  settingsData?: Partial<WebsiteSettingsDocument>,
): Promise<WebsiteSettingsDocument | null> => {
  return WebsiteSettings.findByIdAndUpdate(
    settingsId,
    { $set: settingsData },
    { new: true, runValidators: true },
  );
};

export const deleteWebsiteSettings = async (
  settingsId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<WebsiteSettingsDocument | null> => {
  return WebsiteSettings.findByIdAndUpdate(
    settingsId,
    {
      $set: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  );
};

export const getAllWebsiteSettings = async (): Promise<
  WebsiteSettingsDocument[]
> => {
  return WebsiteSettings.find({ isDeleted: false });
};

export const changeWebsiteStatus = async (
  settingsId: string,
  status: boolean,
): Promise<WebsiteSettingsDocument | null> => {
  return WebsiteSettings.findByIdAndUpdate(
    settingsId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
