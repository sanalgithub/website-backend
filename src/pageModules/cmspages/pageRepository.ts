import mongoose from "mongoose";
import Page, { PageDocument } from "../../models/pageModel";

export const createPage = async (
  pageData: Partial<PageDocument>,
): Promise<PageDocument> => {
  const page = new Page(pageData);
  return page.save();
};

export const uniquePages = async (
  pageUrl?: string,
  name?: string,
): Promise<boolean> => {
  const existingPage = await Page.findOne({
    $or: [{ pageUrl: pageUrl }, { name }],
  });

  return !!existingPage;
};

export const findPageById = async (
  pageId: string,
): Promise<PageDocument | null> => {
  return Page.findById(pageId);
};

export const updatePage = async (
  pageId: string,
  pageData: Partial<PageDocument>,
): Promise<PageDocument | null> => {
  return Page.findByIdAndUpdate(
    pageId,
    { $set: pageData },
    { new: true, runValidators: true },
  );
};

export const deletePage = async (
  pageId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<PageDocument | null> => {
  return Page.findByIdAndUpdate(
    pageId,
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

export const getAllPages = async (): Promise<PageDocument[]> => {
  return Page.find({ isDeleted: false });
};

export const changePageStatus = async (
  pageId: string,
  status: boolean,
): Promise<PageDocument | null> => {
  return Page.findByIdAndUpdate(
    pageId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
