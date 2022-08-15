import {
  AuthService,
  makePostRequest,
  MutationsLang,
  useWaitForResponseMutationOptions,
} from "@adminator/protozoa";
import { SETUP_CHECK_URL } from "frontend/hooks/setup/setup.store";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ISetupUserForm } from "shared/form-schemas/setup/user";
import {
  IDBCrendentials,
  ISuccessfullAuthenticationResponse,
} from "shared/types";
import { NAVIGATION_LINKS } from "../../lib/routing/links";

export function useSetupCredentialsMutation() {
  const router = useRouter();
  const apiMutateOptions = useWaitForResponseMutationOptions<
    Record<string, string>
  >({
    endpoints: [SETUP_CHECK_URL],
    successMessage: MutationsLang.create("Setup Credentials"),
    onSuccessActionWithFormData: () => {
      router.push(NAVIGATION_LINKS.SETUP.USER);
    },
  });

  return useMutation(
    async (data: IDBCrendentials) =>
      await makePostRequest(`/api/setup/credentials`, data),
    apiMutateOptions
  );
}

export function useSetupUserMutation() {
  const router = useRouter();
  const apiMutateOptions =
    useWaitForResponseMutationOptions<ISuccessfullAuthenticationResponse>({
      endpoints: [SETUP_CHECK_URL],
      successMessage: MutationsLang.create("User"),
      onSuccessActionWithFormData: (response) => {
        AuthService.setAuthToken(response.token, true);

        router.push(NAVIGATION_LINKS.DASHBOARD);
      },
    });

  return useMutation(
    async (data: ISetupUserForm) =>
      await makePostRequest(`/api/setup/user`, data),
    apiMutateOptions
  );
}
