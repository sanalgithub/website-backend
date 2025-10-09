import mongoose from "mongoose";
import * as serviceRepo from "./serviceRepository";
import { ServiceDocument } from "../../models/serviceModel";

export const createService = async (
  serviceData: Partial<ServiceDocument>,
): Promise<ServiceDocument> => {
  return serviceRepo.createService(serviceData);
};

export const uniqueService = async (pageUrl: string, name: string) => {
  const service = await serviceRepo.uniqueService(pageUrl, name);
  return service;
};

export const findServiceById = async (
  serviceId: string,
): Promise<ServiceDocument | null> => {
  return serviceRepo.findServiceById(serviceId);
};

export const findAllServices = async (): Promise<ServiceDocument[]> => {
  return serviceRepo.getAllServices();
};

export const updateService = async (
  serviceId: string,
  serviceData: Partial<ServiceDocument>,
): Promise<ServiceDocument | null> => {
  return serviceRepo.updateService(serviceId, serviceData);
};

export const deleteService = async (
  serviceId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<ServiceDocument | null> => {
  return serviceRepo.deleteService(serviceId, deletedBy);
};

export const updateServiceStatus = async (
  serviceId: string,
  status: boolean,
): Promise<ServiceDocument | null> => {
  return serviceRepo.changeServiceStatus(serviceId, status);
};
