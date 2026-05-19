# `get_tasks_by_task_number` Tool Documentation

## 1. Tool Overview: What and Why

### 1.1. Tool Name

`get_tasks_by_task_number`

---

## 1.2. Purpose and Necessity

### What

The `get_tasks_by_task_number` tool retrieves project tasks from the Meldep ERP system using the Project Tasks List API and filters them primarily using the task number.

### Why

Within the MCP server environment, AI agents frequently need to retrieve exact task details using a known task number provided by users.

This tool enables AI agents to:

* Fetch specific project tasks by task number
* Retrieve task details assigned to the logged-in user
* Retrieve all matching project tasks
* Search and validate task existence
* Support task-level workflows and automation

Without this tool, AI agents would lack a reliable mechanism for precise task retrieval.

---

## 1.3. High-Level Description

The tool performs the following operations:

1. Validates input using Zod
2. Retrieves:

   * `userId`
   * `projectId`
   * `accessToken`
     from MCP session storage
3. Dynamically constructs the Meldep API payload
4. Filters tasks using:

   * `projectTaskNumber`
5. Applies task ownership filtering based on:

   * Logged-in user tasks
   * All tasks
6. Calls:
   `POST https://api.meldep.com/project-tasks/list`
7. Maps the ERP response into an AI-friendly lightweight structure
8. Returns only required task information

---

# 2. Development Artifacts: Files and Code

## 2.1. Files to Develop and Code

### `src/server/tools/project-tasks/get-tasks-by-task-number.tool.ts`

Primary tool implementation file containing:

* Zod schema
* Tool metadata
* Core execution logic
* API integration
* Error handling
* Session/user retrieval
* Tool handler export

---

### `src/server/tools/project-tasks/mappers/project-task.mapper.ts`

Contains mapper logic:

* `mapProjectTaskResponse`

Used to convert ERP task objects into AI-friendly structures.

---

### `src/server/storage/session-store.ts`

Used to retrieve:

* Logged-in `userId`
* Active `projectId`
* Access token

---

### `src/server/tools/index.ts`

Registers the tool within MCP runtime.

---

# 3. Development Sequence and Changes

## Step 1 — Define Input Schema

Create:

```ts id="bchh7f"
GetTasksByTaskNumberInputSchema
```

using Zod.

---

## Step 2 — Retrieve Session Information

Retrieve:

* `userId`
* `projectId`
* `accessToken`

from session storage.

---

## Step 3 — Construct API Payload

### Important Logic

If:

```ts id="cy9h6g"
taskForAll === true
```

Then:

```json id="7huy6x"
"activityOwners": []
```

Else:

```json id="j1lk4y"
"activityOwners": ["<loggedInUserId>"]
```

---

## Step 4 — Apply Task Number Filtering

The API payload MUST include:

```json id="tkv0l2"
"projectTaskNumber": "13763"
```

This is the primary filtering mechanism.

---

## Step 5 — Call Meldep API

Endpoint:

```http id="xvymcm"
POST https://api.meldep.com/project-tasks/list
```

Headers:

```http id="e2i87u"
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Step 6 — Map Response

Return only AI-required task fields.

---

## Step 7 — Register Tool

Export tool inside:

```ts id="dd0e0n"
src/server/tools/index.ts
```

---

# 4. Development Considerations

## 4.1. Input Parameters

### Parameter: `taskNumber`

* Type: `string`
* Required: Yes
* Description:
  Task number used to retrieve a specific task

Example:

```json id="k7s4zj"
"13763"
```

---

### Parameter: `taskForAll`

* Type: `boolean`
* Required: Yes
* Description:

  * `true` → search tasks across all users
  * `false` → search only logged-in user tasks

Example:

```json id="f8t2ys"
false
```

---

### Parameter: `page`

* Type: `number`
* Required: No
* Default: `1`

---

### Parameter: `pageSize`

* Type: `number`
* Required: No
* Default: `20`

---

# 5. Zod Schema Definition

```typescript id="8l0ee5"
const GetTasksByTaskNumberInputSchema = z.object({
  taskNumber: z
    .string()
    .min(1)
    .describe(
      'Project task number used to retrieve task details'
    ),

  taskForAll: z
    .boolean()
    .describe(
      'true = fetch tasks for all users, false = fetch only logged-in user tasks'
    ),

  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .default(1),

  pageSize: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .default(20),
});
```

---

# 6. API Payload Structure

```json id="q9m6w4"
{
  "page": 1,
  "pageSize": 20,
  "sortBy": "createdOnUtc",
  "descending": true,
  "sorts": {},
  "searchText": "",
  "projectTaskNumber": "13763",
  "customerIds": [],
  "companyContactIds": [],
  "projectIds": [
    "<projectId>"
  ],
  "projectModuleIds": [],
  "projectTaskIds": [],
  "projectLeadsIds": [],
  "activityOwners": [],
  "statusIds": [],
  "priorityIds": [],
  "taskTagsIds": [],
  "isTemplate": false
}
```

---

# 7. Core Business Logic

## Task Filtering Logic

```typescript id="7tttzh"
if (taskForAll) {
  payload.activityOwners = [];
} else {
  payload.activityOwners = [loggedInUserId];
}
```

---

## Task Number Mapping

```typescript id="w41rqv"
payload.projectTaskNumber = taskNumber;
```

---

# 8. AI-Friendly Output Structure

```typescript id="g5n1t0"
{
  isError: boolean;
  message: string;
  data: TaskDetails[];
}
```

---

# 9. Simplified Task Response Model

```typescript id="4c4ftn"
{
  taskId: string;
  taskNumber: number;
  taskName: string;
  description: string;
  projectName: string;
  moduleName: string;
  status: string;
  priority: string;
  assignedTo: string;
  estimateHours: number;
  totalLoggedHours: number;
  startDate: string;
  endDate: string;
  createdOn: string;
}
```

---

# 10. Response Mapping Rules

| ERP Response Field           | Returned Field     |
| ---------------------------- | ------------------ |
| `id`                         | `taskId`           |
| `projectTaskNumber`          | `taskNumber`       |
| `name`                       | `taskName`         |
| `description`                | `description`      |
| `project.name`               | `projectName`      |
| `projectModule.name`         | `moduleName`       |
| `status.dropDownValue`       | `status`           |
| `priority.dropDownValue`     | `priority`         |
| `assignedTo.person.fullName` | `assignedTo`       |
| `estimateTime`               | `estimateHours`    |
| `totalTimesheetEstHours`     | `totalLoggedHours` |
| `startDate`                  | `startDate`        |
| `endDate`                    | `endDate`          |
| `createdOnUtc`               | `createdOn`        |

---

# 11. Example Internal Tool Call

## Logged-in User Task Search

```python id="4vx7p6"
default_api.get_tasks_by_task_number(
    taskNumber="13763",
    taskForAll=False
)
```

---

## Search Across All Users

```python id="j7r7mk"
default_api.get_tasks_by_task_number(
    taskNumber="13763",
    taskForAll=True
)
```

---

# 12. Example AI-Friendly Response

```json id="3gz6l9"
{
  "isError": false,
  "message": "Task fetched successfully.",
  "data": [
    {
      "taskId": "cad486bd-23f3-4a64-bd43-91fcd3823d19",
      "taskNumber": 13763,
      "taskName": "Authentication API changes to the backend side",
      "description": "Authentication API changes to the backend side.",
      "projectName": "Falcon - Maconomy Transaction Entry Automation",
      "moduleName": "Job Header Process Development",
      "status": "Open",
      "priority": "High",
      "assignedTo": "Prasad Sawant",
      "estimateHours": 20,
      "totalLoggedHours": 10,
      "startDate": "05/08/2026",
      "endDate": "05/09/2026",
      "createdOn": "05/08/2026 04:03 PM"
    }
  ]
}
```

---

# 13. Error Handling and Robustness

## Input Validation

Validate:

* `taskNumber` is not empty
* `page >= 1`
* `pageSize <= 100`

---

## Session Validation

Return errors if:

* `userId` missing
* `projectId` missing
* `token` missing

---

## API Error Handling

Wrap API calls inside:

```typescript id="56h1ho"
try-catch
```

Return user-friendly errors.

---

# 14. Security Considerations

## Authentication

Always use:

```http id="drsmpm"
Authorization: Bearer <token>
```

---

## Access Control

Use session-level:

* `projectId`
* `userId`

to avoid unauthorized access.

---

## Data Sanitization

Return only required fields from ERP response.

Do not expose:

* Internal metadata
* Security information
* Unused nested structures

---

# 15. Testing Strategy

## 15.1. Unit Tests

Test:

* Zod validation
* Task number filtering
* `taskForAll` logic
* Payload generation
* Response mapper
* Empty responses
* Missing session values

---

## 15.2. Integration Tests

Verify:

* API integration
* Authentication
* Task retrieval accuracy
* Logged-in user filtering
* Pagination behavior

---

## 15.3. Acceptance Criteria

* Tool successfully filters by task number
* Logged-in user filtering works correctly
* All-user task retrieval works correctly
* Proper error messages are returned
* AI-friendly response structure is returned

---

# 16. Deployment and Integration

## 16.1. Deployment Steps

* Build TypeScript project
* Deploy generated JS output
* Ensure mapper files are included

---

## 16.2. MCP Registration

Register inside:

```ts id="wzsjqn"
src/server/tools/index.ts
```

Example:

```ts id="oj48hk"
export * from './project-tasks/get-tasks-by-task-number.tool';
```

---

# 17. Future Enhancements

Possible future improvements:

* Multiple task number search
* Status filtering
* Priority filtering
* Module filtering
* Date range filtering
* Task activity summaries

---

# 18. Revisions

| Version | Date       | Author      | Description                                            |
| ------- | ---------- | ----------- | ------------------------------------------------------ |
| 1.0     | 2026-05-19 | Claude Code | Initial Documentation and Added mandatory task number filtering and renamed tool |
