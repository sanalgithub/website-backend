import mongoose from "mongoose";
import Service, { ServiceDocument } from "../../models/serviceModel";

export const createService = async (
  serviceData: Partial<ServiceDocument>,
): Promise<ServiceDocument> => {
  const service = new Service(serviceData);
  return service.save();
};

export const uniqueService = async (
  serviceUrl?: string,
  name?: string,
): Promise<boolean> => {
  const existingService = await Service.findOne({
    $or: [{ serviceUrl: serviceUrl }, { name }],
  });

  return !!existingService;
};

export const findServiceById = async (
  serviceId: string,
): Promise<ServiceDocument | null> => {
  return Service.findById(serviceId);
};

export const updateService = async (
  serviceId: string,
  serviceData: Partial<ServiceDocument>,
): Promise<ServiceDocument | null> => {
  return Service.findByIdAndUpdate(
    serviceId,
    { $set: serviceData },
    { new: true, runValidators: true },
  );
};

export const deleteService = async (
  serviceId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<ServiceDocument | null> => {
  return Service.findByIdAndUpdate(
    serviceId,
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

export const getAllServices = async (): Promise<ServiceDocument[]> => {
  return Service.find({ isDeleted: false });
};

export const changeServiceStatus = async (
  serviceId: string,
  status: boolean,
): Promise<ServiceDocument | null> => {
  return Service.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
