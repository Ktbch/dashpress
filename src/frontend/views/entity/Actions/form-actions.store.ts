import { CRUD_CONFIG_NOT_FOUND } from "frontend/lib/crud-config";
import { useMutation } from "@tanstack/react-query";
import {
  IFormAction,
  IIntegrationImplementationList,
} from "shared/types/actions";
import { useApiMutateOptimisticOptions } from "frontend/lib/data/useMutate/useApiMutateOptimisticOptions";
import { MutationHelpers } from "frontend/lib/data/useMutate/mutation-helpers";
import { makeActionRequest } from "frontend/lib/data/makeRequest";
import { useWaitForResponseMutationOptions } from "frontend/lib/data/useMutate/useWaitForResponseMutationOptions";
import { useApi } from "frontend/lib/data/useApi";
import { FORM_ACTION_CRUD_CONFIG } from "./constants";

const BASE_ACTIONS_ENDPOINT = `/api/integrations/actions`;

export const LIST_ENTITY_FORM_ACTIONS = (entity: string) => {
  return `${FORM_ACTION_CRUD_CONFIG.ENDPOINTS.LIST}/${entity}`;
};

export const useIntegrationImplementationsList = (integration: string) =>
  useApi<IIntegrationImplementationList[]>(
    `${BASE_ACTIONS_ENDPOINT}/${integration}/implementations`,
    {
      errorMessage: CRUD_CONFIG_NOT_FOUND("Integration Implementations"),
      enabled: !!integration,
      defaultData: [],
    }
  );

export function useDeleteFormActionMutation(entity: string) {
  const apiMutateOptions = useApiMutateOptimisticOptions<IFormAction[], string>(
    {
      dataQueryPath: LIST_ENTITY_FORM_ACTIONS(entity),
      successMessage: FORM_ACTION_CRUD_CONFIG.MUTATION_LANG.DELETE,
      onMutate: MutationHelpers.deleteByKey("id") as unknown as (
        oldData: IFormAction[],
        form: string
      ) => IFormAction[],
    }
  );

  return useMutation({
    mutationFn: async (formActionId: string) =>
      await makeActionRequest(
        "DELETE",
        FORM_ACTION_CRUD_CONFIG.ENDPOINTS.DELETE(formActionId)
      ),
    ...apiMutateOptions,
  });
}

export function useCreateFormActionMutation(entity: string) {
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [LIST_ENTITY_FORM_ACTIONS(entity)],
    successMessage: FORM_ACTION_CRUD_CONFIG.MUTATION_LANG.CREATE,
  });

  return useMutation({
    mutationFn: async (configuration: IFormAction) => {
      return await makeActionRequest(
        "POST",
        FORM_ACTION_CRUD_CONFIG.ENDPOINTS.CREATE,
        configuration
      );
    },
    ...apiMutateOptions,
  });
}

export function useUpdateFormActionMutation(entity: string) {
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [LIST_ENTITY_FORM_ACTIONS(entity)],
    successMessage: FORM_ACTION_CRUD_CONFIG.MUTATION_LANG.EDIT,
  });

  return useMutation({
    mutationFn: async (formAction: IFormAction) =>
      await makeActionRequest(
        "PATCH",
        FORM_ACTION_CRUD_CONFIG.ENDPOINTS.UPDATE(formAction.id),
        formAction
      ),
    ...apiMutateOptions,
  });
}
