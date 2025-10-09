import { Request, Response } from "express";
import * as websiteSettingsService from "./websiteSettingsService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createWebsiteSettings = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const settingsData = {
      ...req.body,
      createdBy: req.userId,
    };

    const headerLogo: string = req.file
      ? `/uploads/websiteSettings/${req.file.filename}`
      : "";
    settingsData.headerLogo = headerLogo;

    const footerLogo: string = req.file
      ? `/uploads/websiteSettings/${req.file.filename}`
      : "";
    settingsData.footerLogo = footerLogo;
    const IsExistingWebsiteSettings =
      await websiteSettingsService.checkAlreadyExistWebsiteSettings();
    if (IsExistingWebsiteSettings) {
      return res.status(409).json({
        success: false,
        message: message.ALREADY_WEBSITE_SETTINGS_EXISTS,
      });
    }

    const createdSettings =
      await websiteSettingsService.createWebsiteSettings(settingsData);

    return res.status(201).json({
      success: true,
      message: message.WEBSITE_SETTINGS_CREATED_SUCCESS,
      settings: createdSettings,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const editWebsiteSettings = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const settingsData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }
    const existingSettings =
      await websiteSettingsService.getWebsiteSettingsById(id);
    if (!existingSettings) {
      return res
        .status(404)
        .json({ success: false, message: message.WEBSITE_SETTINGS_NOT_FOUND });
    }

    if (req.file) {
      settingsData.headerLogo = `/uploads/websiteSettings/${req.file.filename}`;
    } else {
      settingsData.headerLogo = existingSettings.headerLogo;
    }

    if (req.file) {
      settingsData.footerLogo = `/uploads/websiteSettings/${req.file.filename}`;
    } else {
      settingsData.footerLogo = existingSettings.footerLogo;
    }

    const updatedSettings = await websiteSettingsService.editWebsiteSettings(
      id,
      settingsData,
    );

    return res.status(200).json({
      success: true,
      message: message.WEBSITE_SETTINGS_UPDATED_SUCCESS,
      settings: updatedSettings,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteWebsiteSettings = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: message.UNAUTHORIZED });
      return;
    }

    const deletedSettings = await websiteSettingsService.deleteWebsiteSettings(
      id,
      req.userId,
    );
    if (!deletedSettings) {
      return res
        .status(204)
        .json({ success: false, message: message.WEBSITE_SETTINGS_NOT_FOUND });
    }
    res
      .status(200)
      .json({ success: true, message: message.WEBSITE_SETTINGS_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getWebsiteSettingsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const settings = await websiteSettingsService.getWebsiteSettingsById(id);
    if (!settings) {
      return res
        .status(204)
        .json({ success: false, message: message.WEBSITE_SETTINGS_NOT_FOUND });
    }
    res.status(200).json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllWebsiteSettings = async (req: Request, res: Response) => {
  try {
    const settings = await websiteSettingsService.getAllWebsiteSettings();
    if (settings) {
      res.status(200).json({ success: true, settings });
    } else {
      res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_WEBSITE_SETTINGS,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error });
  }
};

export const updateWebsiteSettingsStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedSettings = await websiteSettingsService.updateStatus(
      id,
      status,
    );

    if (!updatedSettings) {
      return res
        .status(204)
        .json({ success: false, message: message.WEBSITE_SETTINGS_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.WEBSITE_SETTINGS_STATUS_UPDATED,
      settings: updatedSettings,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
