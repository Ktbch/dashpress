import { rolesController } from "backend/roles/roles.controller";
import { UPDATE_ROLE_FORM_SCHEMA } from "shared/form-schemas/roles/update";
import { requestHandler } from "../../../../backend/lib/request";

const REQUEST_QUERY_FIELD = "roleId";

export default requestHandler(
  {
    DELETE: async (getValidatedRequest) => {
      const validatedRequest = await getValidatedRequest([
        {
          _type: "requestQuery",
          options: REQUEST_QUERY_FIELD,
        },
      ]);
      return await rolesController.removeRole(validatedRequest.requestQuery);
    },

    PATCH: async (getValidatedRequest) => {
      const validatedRequest = await getValidatedRequest([
        {
          _type: "requestBody",
          options: UPDATE_ROLE_FORM_SCHEMA,
        },
        {
          _type: "requestQuery",
          options: REQUEST_QUERY_FIELD,
        },
      ]);
      return await rolesController.updateRoleDetails(
        validatedRequest.requestQuery,
        validatedRequest.requestBody
      );
    },
  },
  [
    {
      _type: "isCreator",
    },
  ]
);
