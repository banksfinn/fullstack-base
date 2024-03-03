import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../../gateway/api/generated/openapi.json",
  apiFile: "../../../frontend/src/clients/baseGatewayClient.ts",
  apiImport: "baseGatewayClient",
  outputFile: "../../../frontend/src/clients/generatedGatewayClient.ts",
  exportName: "gatewayClientEndpoints",
  hooks: true,
  tag: true,
  useEnumType: true,
};

export default config;
