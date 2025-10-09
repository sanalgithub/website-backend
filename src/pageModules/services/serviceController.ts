import { Response } from "express";
import * as serviceService from "./serviceServices";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";
import { generateRandomServiceCode } from "../../utils/generateUniqueCode";
export const createService = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const serviceData = {
      ...req.body,
      createdBy: req.userId,
    };

    const exists = await serviceService.uniqueService(
      serviceData.serviceUrl,
      serviceData.name,
    );
    if (exists) {
      return res
        .status(403)
        .json({ success: false, message: message.UNIQUE_SERVICE });
    }

    const serviceCode = generateRandomServiceCode();
    serviceData.pageCode = serviceCode;

    const imageUrl: string = req.file
      ? `/uploads/services/${req.file.filename}`
      : "";
    serviceData.imageUrl = imageUrl;

    const createdService = await serviceService.createService(serviceData);

    res.status(201).json({
      success: true,
      message: message.PAGE_CREATED,
      service: createdService,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const editService = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;

  const serviceData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const existingService = await serviceService.findServiceById(id);
    if (!existingService || existingService.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }

    if (req.file) {
      serviceData.imageUrl = `/uploads/services/${req.file.filename}`;
    } else {
      serviceData.imageUrl = existingService.imageUrl;
    }

    const updatedService = await serviceService.updateService(id, serviceData);

    if (!updatedService) {
      return res
        .status(204)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }
    res.status(200).json({
      success: true,
      message: message.PAGE_UPDATED,
      service: updatedService,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteService = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const deletedService = await serviceService.deleteService(id, req.userId);
    if (!deletedService) {
      return res
        .status(204)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }
    res.status(200).json({ success: true, message: message.SERVICE_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getServiceById = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const service = await serviceService.findServiceById(id);
    if (!service || service.isDeleted) {
      return res
        .status(204)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }
    res.status(200).json({ success: true, service });
  } catch (error: any) {
    res.status(500).json({ success: true, error: error.message });
  }
};

export const getAllServices = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    const services = await serviceService.findAllServices();
    if (services) {
      res.status(200).json({ success: true, services });
    } else {
      res
        .status(204)
        .json({ success: false, message: message.FAILED_TO_RETRIEVE_SERVICE });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateServiceStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedService = await serviceService.updateServiceStatus(id, status);

    if (!updatedService) {
      return res
        .status(204)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.SERVICE_STATUS_UPDATED,
      service: updatedService,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
