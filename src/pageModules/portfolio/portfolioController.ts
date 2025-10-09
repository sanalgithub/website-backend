import { Request, Response } from "express";
import * as portfolioService from "./portfolioService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createPortfolio = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const portfolioData = {
      ...req.body,
      createdBy: req.userId,
    };

    const imageUrl: string = req.file
      ? `/uploads/portfolio/${req.file.filename}`
      : "";
    portfolioData.imageUrl = imageUrl;

    const createdPortfolio =
      await portfolioService.createPortfolio(portfolioData);

    return res.status(201).json({
      success: true,
      message: message.PORTFOLIO_CREATED_SUCCESS,
      portfolio: createdPortfolio,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const editPortfolio = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const portfolioData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }
    const existingPortfolio = await portfolioService.getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: message.PORTFOLIO_NOT_FOUND });
    }

    if (req.file) {
      portfolioData.imageUrl = `/uploads/portfolio/${req.file.filename}`;
    } else {
      portfolioData.imageUrl = existingPortfolio.imageUrl;
    }

    const updatedPortfolio = await portfolioService.editPortfolio(
      id,
      portfolioData,
    );

    return res.status(200).json({
      success: true,
      message: message.PORTFOLIO_UPDATED_SUCCESS,
      portfolio: updatedPortfolio,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePortfolio = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const deletedPortfolio = await portfolioService.deletePortfolio(
      id,
      req.userId,
    );
    if (!deletedPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: message.PORTFOLIO_NOT_FOUND });
    }
    return res
      .status(200)
      .json({ success: true, message: message.PORTFOLIO_DELETED });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getPortfolioById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const portfolio = await portfolioService.getPortfolioById(id);
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: message.PORTFOLIO_NOT_FOUND });
    }
    return res.status(200).json({ success: true, portfolio });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await portfolioService.getAllPortfolios();
    if (portfolios) {
      return res.status(200).json({ success: true, portfolios });
    } else {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_PORTFOLIOS,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePortfolioStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const updatedPortfolio = await portfolioService.updatePortfolioStatus(
      id,
      status,
    );

    if (!updatedPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: message.PORTFOLIO_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      message: message.PORTFOLIO_STATUS_UPDATED,
      portfolio: updatedPortfolio,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
