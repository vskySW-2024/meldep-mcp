# Example Tool Document: Get Weekly Plan Tool

This document provides a detailed example of tool documentation using the `getWeeklyPlanTool` as a reference, with a focus on development considerations for the MCP server.

## 1. Tool Overview: What and Why

### 1.1. Tool Name
`get_weekly_plan`

### 1.2. Purpose and Necessity
**What:** The `get_weekly_plan` tool is designed to fetch structured weekly plan data from the Meldep ERP system.
**Why:** In the MCP server environment, there's a need for AI agents to access and understand recurring weekly commitments and progress. This tool fulfills that requirement by providing a standardized interface to retrieve such data, including pagination and optional filtering by a `weekEndDate`. Without this tool, AI agents would lack direct access to this critical business information, limiting their ability to answer user queries about weekly planning, track project progress, or assist with resource allocation based on weekly schedules.

### 1.3. High-Level Description
The tool retrieves weekly plan details, transforms the raw ERP response into an AI-friendly format, and supports pagination and date-based filtering. It ensures data consistency and handles common error scenarios.

## 2. Development Artifacts: Files and Code

This section outlines the specific files involved in developing and integrating the `get_weekly_plan` tool.

### 2.1. Files to Develop and Code
- **`src/server/tools/weekly-plan/get-weekly-plans.tool.ts`**: This is the primary tool definition file. It contains:
    - The Zod schema (`GetWeeklyPlanInputSchema`) for input validation.
    - The `executeGetWeeklyPlanTool` function, which encapsulates the core business logic (fetching data, validation, error handling, mapping).
    - The tool's public interface (`getWeeklyPlanTool.name`, `getWeeklyPlanTool.description`, `getWeeklyPlanTool.inputSchema`).
    - The `executeGetWeeklyPlanToolHandler` to expose the execution logic.
    - The `formatWeekEndDate` helper function for date manipulation.
- **`src/server/tools/weekly-plan/mappers/weekly-plan.mapper.ts`**: This file contains mapping logic (e.g., `mapWeeklyPlanResponse`) to transform raw data received from the Meldep ERP API into a more AI-friendly and standardized format suitable for the MCP server.
- **`src/server/tools/index.ts`** (or similar tool registration file): This existing file would need an import and export statement to register `getWeeklyPlanTool` with the MCP server's tool registry, making it discoverable by Claude Code.

## 3. Development Sequence and Changes

Developing this tool generally follows a sequential process to ensure proper integration and functionality:

1.  **Define Input Schema:** Start by defining the `GetWeeklyPlanInputSchema` in `get-weekly-plans.tool.ts` using Zod. This establishes the expected input parameters and their validation rules.
2.  **Implement Data Mappers:** Create or update `weekly-plan.mapper.ts` with the `mapWeeklyPlanResponse` function. This step is crucial for transforming ERP-specific data structures into a consistent, AI-friendly format that aligns with the MCP server's data expectations.
3.  **Implement Core Execution Logic (`executeGetWeeklyPlanTool`):** In `get-weekly-plans.tool.ts`:
    a.  Implement input validation checks based on the Zod schema.
    b.  Integrate with `sessionStore` to retrieve `projectId`.
    c.  Implement any necessary data preprocessing, such as the `formatWeekEndDate` helper.
    d.  Call `meldepClient.getWeeklyPlanDetails` to fetch data from the ERP system.
    e.  Apply the `mapWeeklyPlanResponse` to the raw data.
    f.  Implement comprehensive error handling for API failures, missing session data, and invalid inputs.
4.  **Define Tool Metadata (`getWeeklyPlanTool`):** Define the `name`, `description`, and `inputSchema` for the tool in `get-weekly-plans.tool.ts`. This metadata is essential for Claude Code to understand and invoke the tool correctly.
5.  **Expose Tool Handler (`executeGetWeeklyPlanToolHandler`):** Create the `executeGetWeeklyPlanToolHandler` in `get-weekly-plans.tool.ts` to provide the entry point for tool execution.
6.  **Register the Tool:** Add an import and export statement for `getWeeklyPlanTool` in the main `src/server/tools/index.ts` (or equivalent) file to register it with the MCP server's runtime.
7.  **Testing:** Develop unit and integration tests (as described in Section 5) to verify functionality, error handling, and data transformations.

## 4. Development Considerations

### 4.1. Input Parameters
- **Parameter Name:** `skipIndex`
- **Type:** `number` (integer)
- **Description:** The number of records to skip for pagination. Must be an integer and cannot be less than 0.
- **Required/Optional:** Required
- **Example Value:** `0`, `10`

- **Parameter Name:** `takeCount`
- **Type:** `number` (integer)
- **Description:** The number of records to take for pagination. Must be an integer, with a minimum of 1 and a maximum of 4.
- **Required/Optional:** Required
- **Example Value:** `1`, `4`

- **Parameter Name:** `weekEndDate`
- **Type:** `string`
- **Description:** Optional: The week end date (mm/dd/yyyy HH:mm:ss) to filter the weekly plan. (Week End day is Saturday/Sunday of each week.)
- **Required/Optional:** Optional
- **Example Value:** `05/24/2026 23:59:59`

### 4.2. Output
- **Output Structure/Fields:**
  - `isError`: `boolean` - Indicates if an error occurred during tool execution.
  - `message`: `string` - A descriptive message about the outcome (success or error).
  - `data`: `array` - An array of AI-friendly weekly plan objects, or an empty array in case of an error.
- **Description of each field:**
  - `isError`: `true` if an error, `false` otherwise.
  - `message`: Provides context on the operation's result.
  - `data`: Contains the processed weekly plan information.

### 4.3. Error Handling and Robustness
- Implement explicit checks for all input parameters (`skipIndex`, `takeCount`) at the beginning of `executeGetWeeklyPlanTool` to ensure valid ranges. This prevents unnecessary API calls and provides immediate feedback.
- Centralize `projectId` retrieval and handle its absence gracefully, returning an informative error if not found in `sessionStore`.
- Wrap external API calls (`meldepClient.getWeeklyPlanDetails`) in `try-catch` blocks to handle network issues, server errors, or unexpected responses. Log detailed errors for debugging but return user-friendly messages.

### 4.4. Security Considerations
- **Input Validation:** Leverage Zod for robust input validation on `skipIndex`, `takeCount`, and `weekEndDate` to prevent injection attacks or unexpected data processing.
- **Access Control:** Ensure the `projectId` mechanism correctly enforces multi-tenancy and prevents unauthorized access to other projects' data.
- **Data Sanitization/Mapping:** The mapping layer (`mapWeeklyPlanResponse`) should be designed to sanitize or filter out any potentially sensitive or irrelevant internal ERP data before it's exposed to the AI agent.
- **Logging:** Implement secure logging practices, avoiding the logging of sensitive user or project data directly.

## 5. Zod Schema Definition

The input validation for `get_weekly_plan` is defined using the following Zod schema:

```typescript
const GetWeeklyPlanInputSchema = z.object({
  skipIndex: z
    .number()
    .int()
    .min(0)
    .describe(
      'The number of records to skip for pagination.'
    ),

  takeCount: z
    .number()
    .int()
    .min(1)
    .max(4)
    .describe(
      'The number of records to take for pagination.'
    ),
  weekEndDate: z
    .string()
    .optional()
    .describe(
      'Optional: The week end date (mm/dd/yyyy HH:mm:ss) to filter the weekly plan.(Week End day is Saturday/Sunday of each week.)',
    ),
});
```

## 6. Usage Examples

### 6.1. Usage in Claude Code (Prompt)
- "Get the first two weekly plans."
- "Retrieve weekly plans, skipping 5 records and taking 3."
- "Can you fetch the weekly plan data for the week ending 05/24/2026?"

### 6.2. Example Tool Call (Internal)
```python
default_api.get_weekly_plan(skipIndex=0, takeCount=2, weekEndDate="05/24/2026 23:59:59")
```

## 7. Testing Strategy

### 7.1. Unit Tests
- Test `GetWeeklyPlanInputSchema` for valid and invalid inputs.
- Test `executeGetWeeklyPlanTool` with various `skipIndex` and `takeCount` values, including edge cases (e.g., `skipIndex = -1`, `takeCount = 0`, `takeCount = 5`).
- Test with and without `weekEndDate` provided, including invalid date formats to ensure `formatWeekEndDate` handles them gracefully or the tool returns an error.
- Mock `meldepClient.getWeeklyPlanDetails` to simulate successful API responses and API errors.
- Mock `sessionStore.getProjectId` to test scenarios where `projectId` is missing.
- Test `mapWeeklyPlanResponse` with different raw data structures.
- Test `formatWeekEndDate` for correct date formatting.

### 7.2. Integration Tests
- Verify end-to-end flow by calling the tool with actual `meldepClient` and `sessionStore` (in a test environment).
- Ensure correct interaction with the Meldep ERP API and accurate data retrieval and mapping.
- Test date filtering functionality with various valid and invalid `weekEndDate` inputs.

### 7.3. Acceptance Criteria
- The tool successfully retrieves weekly plan data for valid `skipIndex` and `takeCount` values.
- The tool correctly filters weekly plan data by `weekEndDate` when provided.
- The tool correctly handles invalid `skipIndex` and `takeCount` inputs, returning appropriate error messages.
- The tool gracefully handles cases where `projectId` is missing from the session.
- The tool provides clear error messages when the Meldep ERP API call fails.
- The returned data is in the expected AI-friendly format.

## 8. Deployment and Integration

### 8.1. Deployment Steps
- Build the TypeScript project to generate JavaScript output.
- Ensure the `get-weekly-plans.tool.js` file (and its dependencies) are deployed to the appropriate `dist/server/tools/weekly-plan` directory.

### 8.2. Integration with MCP Server
- The tool needs to be registered with the MCP server's tool registry, typically by being included in an `index.ts` file that exports all available tools. This allows Claude Code to discover and invoke `get_weekly_plan`.

## 9. Future Considerations (Optional)
- Add support for filtering weekly plans by status or other criteria.
- Implement caching for frequently accessed weekly plan data to improve performance.

## 10. Revisions

| Version | Date       | Author      | Description          |
|---------|------------|-------------|----------------------|
| 1.0     | 2026-05-19 | Claude Code | Initial Example Document |
