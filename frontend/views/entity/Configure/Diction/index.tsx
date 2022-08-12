import {
  FormSkeleton,
  FormSkeletonSchema,
  SectionBox,
} from "@gothicgeeks/design-system";
import { SLUG_LOADING_VALUE } from "@gothicgeeks/shared";
import { useSetPageDetails } from "frontend/lib/routing";
import { createViewStateMachine } from "frontend/lib/create-view-state-machine";
import { USER_PERMISSIONS } from "shared/types";
import {
  useEntityDiction,
  useEntitySlug,
} from "../../../../hooks/entity/entity.config";
import { BaseEntitySettingsLayout } from "../_Base";
import { useUpsertConfigurationMutation } from "../../../../hooks/configuration/configration.store";
import { EntityDictionForm } from "./Form";
import { ENTITY_CONFIGURATION_VIEW } from "../constants";

// TODO validate plurals are unique
export function EntityDictionSettings() {
  const entity = useEntitySlug();
  const entityDiction = useEntityDiction();
  const upsertConfigurationMutation = useUpsertConfigurationMutation(
    "entity_diction",
    entity
  );
  const viewStateMachine = createViewStateMachine(
    entity === SLUG_LOADING_VALUE,
    false
  );
  useSetPageDetails({
    pageTitle: "Diction Settings",
    viewKey: ENTITY_CONFIGURATION_VIEW,
    permission: USER_PERMISSIONS.CAN_CONFIGURE_APP,
  });
  return (
    <BaseEntitySettingsLayout>
      <SectionBox title="Diction Settings">
        {viewStateMachine.type === "loading" && (
          <FormSkeleton
            schema={[FormSkeletonSchema.Input, FormSkeletonSchema.Input]}
          />
        )}
        {viewStateMachine.type === "render" && (
          <EntityDictionForm
            onSubmit={async (values) => {
              await upsertConfigurationMutation.mutateAsync(
                values as unknown as Record<string, string>
              );
            }}
            initialValues={entityDiction}
          />
        )}
      </SectionBox>
    </BaseEntitySettingsLayout>
  );
}
