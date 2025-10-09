import mongoose from "mongoose";
import { PortfolioDocument } from "../../models/portfolioModel";
import * as portfolioRepository from "./portfolioRepository";
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

export const createPortfolio = async (
  portfolioData: Partial<PortfolioDocument>,
): Promise<PortfolioDocument> => {
  try {
    logger.info("Creating a new portfolio", { portfolioData });

    return await portfolioRepository.createPortfolio(portfolioData);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error creating portfolio: ${error.message}`);
  }
};

export const editPortfolio = async (
  portfolioId: string,
  portfolioData: Partial<PortfolioDocument>,
): Promise<PortfolioDocument | null> => {
  try {
    logger.info(`Editing portfolio with ID ${portfolioId}`, {
      portfolioData,
    });

    const updatedPortfolio = await portfolioRepository.updatePortfolio(
      portfolioId,
      portfolioData,
    );
    if (!updatedPortfolio) {
      throw new Error(`Portfolio with ID ${portfolioId} not found`);
    }
    return updatedPortfolio;
  } catch (error: any) {
    throw new Error(`Error updating portfolio: ${error.message}`);
  }
};

export const deletePortfolio = async (
  portfolioId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<PortfolioDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting portfolio with ID ${portfolioId} by user ${deletedById}`,
    );

    const deletedPortfolio = await portfolioRepository.deletePortfolio(
      portfolioId,
      deletedById,
    );
    if (!deletedPortfolio) {
      throw new Error(`Portfolio with ID ${portfolioId} not found`);
    }
    return deletedPortfolio;
  } catch (error: any) {
    throw new Error(`Error deleting portfolio: ${error.message}`);
  }
};

export const getPortfolioById = async (
  portfolioId: string,
): Promise<PortfolioDocument | null> => {
  try {
    logger.info(`Fetching portfolio with ID ${portfolioId}`);

    const portfolio = await portfolioRepository.findPortfolioById(portfolioId);
    if (!portfolio) {
      throw new Error(`Portfolio with ID ${portfolioId} not found`);
    }
    return portfolio;
  } catch (error: any) {
    throw new Error(`Error fetching portfolio: ${error.message}`);
  }
};

export const getAllPortfolios = async (): Promise<PortfolioDocument[]> => {
  try {
    logger.info("Fetching all portfolios");

    return await portfolioRepository.getAllPortfolios();
  } catch (error: any) {
    throw new Error(`Error fetching portfolios: ${error.message}`);
  }
};

export const updatePortfolioStatus = async (
  portfolioId: string,
  status: boolean,
): Promise<PortfolioDocument | null> => {
  return portfolioRepository.changePortfolioStatus(portfolioId, status);
};
