import { FormInput, FormTextArea } from "@gothicgeeks/design-system";
import { ISharedFormInput } from "@gothicgeeks/design-system/dist/components/Form/_types";
import { IEntityField } from "../../../backend/entities/types";
import { ENTITY_TYPES_SELECTION_BAG } from "../../../shared/validations.constants";

export interface IBaseEntityForm {
  fields: IEntityField[];
  getEntityFieldLabels: (name: string) => string;
  onSubmit: (data: Record<string, unknown>) => void;
  entityFieldTypes: Record<string, keyof typeof ENTITY_TYPES_SELECTION_BAG>;
}

export const RenderFormInput = ({
  renderProps,
  label,
  type,
}: {
  type: keyof typeof ENTITY_TYPES_SELECTION_BAG;
  renderProps: ISharedFormInput;
  label: string;
}) => {
  const required = true;

  switch (type) {
    case "email":
    case "password":
      return (
        <FormInput
          label={label}
          type={type}
          required={required}
          {...renderProps}
        />
      );

    case "textarea":
      return <FormTextArea {...renderProps} required={required} />;
  }

  // if(type === "number"){
  //   return <FormNumberInput label={label} type={type} required={required} {...renderProps} />;
  // }

  return (
    <FormInput
      label={label}
      type={type as any}
      required={required}
      {...renderProps}
    />
  );
};