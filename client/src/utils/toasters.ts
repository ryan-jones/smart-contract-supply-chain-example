import { toast } from "react-toastify";

const options = {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
};

export const toastSuccess = (
  message: string,
  id: string,
  customOptions?: any
) => {
  if (!toast.isActive(id)) {
    toast.success(message, {
      ...options,
      ...customOptions,
      toastId: id,
    });
  }
};

export const toastError = (message: string, id: string) => {
  if (!toast.isActive(id)) {
    toast.error(message, {
      ...options,
      toastId: id,
    });
  }
};

export const toastWarning = (message: string, id: string) => {
  if (!toast.isActive(id)) {
    toast.warning(message, {
      ...options,
      toastId: id,
    });
  }
};
