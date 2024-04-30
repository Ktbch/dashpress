import { ConfigDomain } from "backend/lib/config-persistence/types";
import { KeyValueDomain } from "backend/lib/key-value/types";
import { createCacheService } from "backend/lib/cache";
import { setupAppConfigTestData } from "./_app-config";
import { setupIntegrationsConstantsTestData } from "./_integrations-constants";
import { setupCredentialsTestData } from "./_credentials";
import { setupDashboardTestData } from "./_dashboard";
import { setupRolesTestData } from "./_roles";
import { setupSchemaTestData } from "./_schema";
import { setupUsersTestData } from "./_users";
import { setupIntegrationsEnvTestData } from "./_integrations-env";
import { setupActivatedIntegrationsTestData } from "./_activated-integrations";
import { setupFormActionsTestData } from "./_form-actions";
import { setupTestDatabaseData } from "./_data";
import { portalTestData } from "./portal";
import { setupUserPreferencesTestData } from "./_user-preferences";

type DomainTypes = ConfigDomain | KeyValueDomain | "data";

export const setupAllTestData = async (domains: DomainTypes[]) => {
  const allTestData: [DomainTypes, () => Promise<void>][] = [
    ["roles", setupRolesTestData],
    ["app-config", setupAppConfigTestData],
    ["users", setupUsersTestData],
    ["dashboard-widgets", setupDashboardTestData],
    ["schema", setupSchemaTestData],
    ["data", setupTestDatabaseData],
    ["activated-integrations", setupActivatedIntegrationsTestData],
    ["form-actions", setupFormActionsTestData],
    ["constants", setupIntegrationsConstantsTestData],
    ["environment-variables", setupIntegrationsEnvTestData],
    ["credentials", setupCredentialsTestData],
    ["users-preferences", setupUserPreferencesTestData],
    ...portalTestData,
  ];

  createCacheService().purge();

  await Promise.all(
    allTestData
      .filter(([domain]) => {
        return domains.includes(domain);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, testDataImpl]) => {
        return testDataImpl();
      })
  );
};

// TEST: test all custom script logic
