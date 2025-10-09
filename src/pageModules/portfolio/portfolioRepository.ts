import mongoose from "mongoose";
import Portfolio, { PortfolioDocument } from "../../models/portfolioModel";

export const createPortfolio = async (
  portfolioData: Partial<PortfolioDocument>,
): Promise<PortfolioDocument> => {
  const portfolio = new Portfolio(portfolioData);
  return portfolio.save();
};

export const findPortfolioById = async (
  portfolioId: string,
): Promise<PortfolioDocument | null> => {
  return Portfolio.findById(portfolioId);
};

export const updatePortfolio = async (
  portfolioId: string,
  portfolioData: Partial<PortfolioDocument>,
): Promise<PortfolioDocument | null> => {
  return Portfolio.findByIdAndUpdate(
    portfolioId,
    { $set: portfolioData },
    { new: true, runValidators: true },
  );
};

export const deletePortfolio = async (
  portfolioId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<PortfolioDocument | null> => {
  return Portfolio.findByIdAndUpdate(
    portfolioId,
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

export const getAllPortfolios = async (): Promise<PortfolioDocument[]> => {
  return Portfolio.find({ isDeleted: false });
};

export const changePortfolioStatus = async (
  portfolioId: string,
  status: boolean,
): Promise<PortfolioDocument | null> => {
  return Portfolio.findByIdAndUpdate(
    portfolioId,
    {
      $set: { status },
    },
    { new: true, runValidators: true },
  );
};
