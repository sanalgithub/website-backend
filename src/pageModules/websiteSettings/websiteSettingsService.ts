import mongoose from "mongoose";
import { WebsiteSettingsDocument } from "../../models/websiteSettingsModel";
import * as websiteRepository from "./websiteSettingsRepository";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;

export const checkAlreadyExistWebsiteSettings = async () => {
  return websiteRepository.checkAlreadyExistWebsiteSettings();
};

export const createWebsiteSettings = async (
  settingsData: Partial<WebsiteSettingsDocument>,
): Promise<WebsiteSettingsDocument> => {
  try {
    logger.info("Creating new website settings", { settingsData });

    return await websiteRepository.createWebsiteSettings(settingsData);
  } catch (error: any) {
    throw new Error(`Error creating website settings: ${error.message}`);
  }
};

export const editWebsiteSettings = async (
  settingsId: string,
  settingsData: Partial<WebsiteSettingsDocument>,
): Promise<WebsiteSettingsDocument | null> => {
  try {
    logger.info(`Editing website settings with ID ${settingsId}`, {
      settingsData,
    });

    const updatedSettings = await websiteRepository.updateWebsiteSettings(
      settingsId,
      settingsData,
    );
    if (!updatedSettings) {
      throw new Error(`Website settings with ID ${settingsId} not found`);
    }
    return updatedSettings;
  } catch (error: any) {
    throw new Error(`Error updating website settings: ${error.message}`);
  }
};

export const deleteWebsiteSettings = async (
  settingsId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<WebsiteSettingsDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting website settings with ID ${settingsId} by user ${deletedById}`,
    );

    const deletedSettings = await websiteRepository.deleteWebsiteSettings(
      settingsId,
      deletedById,
    );
    if (!deletedSettings) {
      throw new Error(`Website settings with ID ${settingsId} not found`);
    }
    return deletedSettings;
  } catch (error: any) {
    throw new Error(`Error deleting website settings: ${error.message}`);
  }
};

export const getWebsiteSettingsById = async (
  settingsId: string,
): Promise<WebsiteSettingsDocument | null> => {
  try {
    logger.info(`Fetching website settings with ID ${settingsId}`);

    const settings =
      await websiteRepository.findWebsiteSettingsById(settingsId);
    if (!settings) {
      throw new Error(`Website settings with ID ${settingsId} not found`);
    }
    return settings;
  } catch (error: any) {
    throw new Error(`Error fetching website settings: ${error.message}`);
  }
};

export const getAllWebsiteSettings = async (): Promise<
  WebsiteSettingsDocument[]
> => {
  try {
    logger.info("Fetching all website settings");

    return await websiteRepository.getAllWebsiteSettings();
  } catch (error: any) {
    throw new Error(`Error fetching website settings: ${error.message}`);
  }
};

export const updateStatus = async (
  settingsId: string,
  status: boolean,
): Promise<WebsiteSettingsDocument | null> => {
  try {
    logger.info(`Updating status for website settings with ID ${settingsId}`, {
      status,
    });

    return await websiteRepository.changeWebsiteStatus(settingsId, status);
  } catch (error: any) {
    throw new Error(
      `Error updating status for website settings: ${error.message}`,
    );
  }
};
