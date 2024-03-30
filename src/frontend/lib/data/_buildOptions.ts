import { UseQueryOptions } from "@tanstack/react-query";
import { IUseApiOptions } from "./types";

export function buildApiOptions<T>(
  options: IUseApiOptions<T>
): Partial<UseQueryOptions<T>> {
  return {
    ...options,
    select: (data: T) => {
      if (options.selector) {
        return options.selector(data);
      }
      return data;
    },
  };
}
