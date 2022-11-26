import {
  makeDeleteRequest,
  makePatchRequest,
  makePostRequest,
  MutationsLang,
  useWaitForResponseMutationOptions,
} from "@hadmean/protozoa";
import { useMutation } from "react-query";
import { IActionInstance } from "shared/types/actions";

const BASE_ACTIONS_ENDPOINT = `/api/actions`;

const SINGULAR = `Action Integration`;

export const LIST_ACTION_INSTANCES = ({
  entity,
  integrationKey,
}: {
  entity?: string;
  integrationKey?: string;
}) => {
  if (entity) {
    return `${BASE_ACTIONS_ENDPOINT}/instances/${entity}`;
  }
  return `${BASE_ACTIONS_ENDPOINT}/${integrationKey}`;
};

export function useDeleteActionInstanceMutation() {
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [BASE_ACTIONS_ENDPOINT],
    successMessage: MutationsLang.delete(SINGULAR),
  });

  return useMutation(
    async (instanceId: string) =>
      await makeDeleteRequest(`/api/actions/instances/${instanceId}`),
    apiMutateOptions
  );
}

export function useCreateActionInstanceMutation() {
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [BASE_ACTIONS_ENDPOINT],
    successMessage: MutationsLang.create(SINGULAR),
  });

  return useMutation(
    async (configuration: IActionInstance) =>
      await makePostRequest(`/api/actions/instances`, configuration),
    apiMutateOptions
  );
}

export function useUpdateActionInstanceMutation() {
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [BASE_ACTIONS_ENDPOINT],
    successMessage: MutationsLang.saved(SINGULAR),
  });

  return useMutation(
    async (configuration: IActionInstance) =>
      await makePatchRequest(
        `/api/actions/instances/${configuration.instanceId}`,
        configuration
      ),
    apiMutateOptions
  );
}