import { Request, Response } from "express";
import * as pageService from "./pageService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";
import { generateRandomPageCode } from "../../utils/generateUniqueCode";

export const createPage = async (req: RequestWithAuthData, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const pageData = {
      ...req.body,
      createdBy: req.userId,
    };

    const exists = await pageService.uniquePage(
      pageData.pageUrl,
      pageData.name,
    );
    if (exists) {
      return res
        .status(403)
        .json({ success: false, message: message.UNIQUE_PAGE });
    }

    const pageCode = generateRandomPageCode();
    pageData.pageCode = pageCode;
    const imageUrl: string = req.file
      ? `/uploads/page/${req.file.filename}`
      : "";
    pageData.imageUrl = imageUrl;

    const createdPage = await pageService.createPage(pageData);

    res.status(201).json({
      success: true,
      message: message.PAGE_CREATED,
      page: createdPage,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
export const editPage = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;

  const pageData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const existingPage = await pageService.findPageById(id);
    if (!existingPage || existingPage.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: message.PAGE_NOT_FOUND });
    }

    if (req.file) {
      pageData.imageUrl = `/uploads/page/${req.file.filename}`;
    } else {
      pageData.imageUrl = existingPage.imageUrl;
    }

    const updatedPage = await pageService.updatePage(id, pageData);

    if (!updatedPage) {
      return res
        .status(404)
        .json({ success: false, message: message.PAGE_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.PAGE_UPDATED,
      page: updatedPage,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePage = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const deletedPage = await pageService.deletePage(id, req.userId);
    if (!deletedPage) {
      return res
        .status(204)
        .json({ success: false, message: message.PAGE_NOT_FOUND });
    }
    res.status(200).json({ success: true, message: message.PAGE_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPageById = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;

  try {
    const page = await pageService.findPageById(id);
    if (!page || page.isDeleted) {
      return res
        .status(204)
        .json({ success: false, message: message.PAGE_NOT_FOUND });
    }
    res.status(200).json({ success: true, page });
  } catch (error: any) {
    res.status(500).json({ success: true, error: error.message });
  }
};

export const getAllPages = async (req: RequestWithAuthData, res: Response) => {
  try {
    const pages = await pageService.findAllPage();
    if (pages) {
      res.status(200).json({ success: true, pages });
    } else {
      res
        .status(204)
        .json({ success: false, message: message.FAILED_TO_RETRIEVE_PAGE });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePageStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedPage = await pageService.updateStatus(id, status);

    if (!updatedPage) {
      return res
        .status(204)
        .json({ success: false, message: message.PAGE_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.PAGE_STATUS_UPDATED,
      page: updatedPage,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
