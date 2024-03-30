import { useQueryClient } from "@tanstack/react-query";
import { ToastService } from "frontend/lib/toast";
import { getQueryCachekey } from "../constants/getQueryCacheKey";
import { ToastMessageInput } from "./types";

export interface IWaitForResponseMutationOptions<T> {
  endpoints: string[];
  redirect?: string;
  onSuccessActionWithFormData?: (formData: T) => void;
  successMessage?: ToastMessageInput;
  smartSuccessMessage?: (formData: T) => ToastMessageInput;
}

const PASS_DATA_FROM_HANDLER_ERROR_MESSAGE =
  "Please return in the mutation what data you want to pass to the success handlers";

export function useWaitForResponseMutationOptions<T>(
  options: IWaitForResponseMutationOptions<T>
) {
  const queryClient = useQueryClient();

  return {
    onSuccess: async (formData: T | undefined) => {
      options.endpoints.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: getQueryCachekey(queryKey) });
      });

      if (options.smartSuccessMessage) {
        if (formData === undefined) {
          throw new Error(PASS_DATA_FROM_HANDLER_ERROR_MESSAGE);
        }
        ToastService.success(options.smartSuccessMessage(formData));
      } else if (options.successMessage) {
        ToastService.success(options.successMessage);
      }

      if (options.onSuccessActionWithFormData) {
        if (formData === undefined) {
          throw new Error(PASS_DATA_FROM_HANDLER_ERROR_MESSAGE);
        }
        options.onSuccessActionWithFormData(formData);
      }
    },
    onError: (error: { message: string }) => {
      ToastService.error(
        error.message || "Something went wrong. Please try again"
      );
    },
  };
}
