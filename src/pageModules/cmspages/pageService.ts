import mongoose from "mongoose";
import * as pageRepo from "./pageRepository";
import { PageDocument } from "../../models/pageModel";
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

export const createPage = async (
  pageData: Partial<PageDocument>,
): Promise<PageDocument> => {
  logger.info("Creating a new page", { pageData });

  return pageRepo.createPage(pageData);
};

export const uniquePage = async (pageUrl: string, name: string) => {
  const page = await pageRepo.uniquePages(pageUrl, name);

  return page;
};

export const findPageById = async (
  pageId: string,
): Promise<PageDocument | null> => {
  return pageRepo.findPageById(pageId);
};

export const findAllPage = async (): Promise<PageDocument[]> => {
  logger.info("Fetching all pages");

  return pageRepo.getAllPages();
};

export const updatePage = async (
  pageId: string,
  pageData: Partial<PageDocument>,
): Promise<PageDocument | null> => {
  return pageRepo.updatePage(pageId, pageData);
};

export const deletePage = async (
  pageId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<PageDocument | null> => {
  logger.info(`Deleting page with ID ${pageId} by user ${deletedBy}`);

  return pageRepo.deletePage(pageId, deletedBy);
};

export const updateStatus = async (
  pageId: string,
  status: boolean,
): Promise<PageDocument | null> => {
  logger.info(`Updating status of page with ID ${pageId} to ${status}`);

  return pageRepo.changePageStatus(pageId, status);
};
