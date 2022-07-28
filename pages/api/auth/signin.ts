import { IRequestValidation } from "shared/validations/makeRequestValidationRunnable";
import { usersController } from "../../../backend/users/users.controller";
import { requestHandler } from "../../../backend/lib/request";

const signinRequestSchema: IRequestValidation = {
  username: {
    validations: [
      {
        validationType: "required",
      },
    ],
  },
  password: {
    validations: [
      {
        validationType: "required",
      },
    ],
  },
};

export default requestHandler(
  {
    POST: async (getValidatedRequest) => {
      const validatedRequest = await getValidatedRequest([
        {
          _type: "requestBody",
          options: signinRequestSchema,
        },
      ]);
      return await usersController.login(validatedRequest.requestBody);
    },
  },
  [
    {
      _type: "guest",
    },
  ]
);