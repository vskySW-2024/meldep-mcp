# Get Monthly Plan Tool Refactoring Requirements

## Document Information

| Field | Value |
|---|---|
| Module | Monthly Plan |
| Tool Name | `get_monthly_plan` |
| MCP Server | Meldep MCP Server |
| Type | Refactoring Requirement |
| Priority | High |
| Status | Pending |
| Version | 1.0 |

---

# Objective

Refactor the existing `get_monthly_plan` MCP tool to:

- enforce strict pagination validation
- optimize payload size
- remove unnecessary ERP nested objects
- clean HTML content
- return AI-friendly structured responses
- improve MCP performance and token efficiency

---

# Existing File

```txt
src/server/tools/monthly-plan/get-monthly-plan.tool.ts
```

---

# New Functional Requirements

## 1. Pagination Validation

### skipIndex

| Property | Value |
|---|---|
| Type | Integer |
| Minimum | 0 |
| Default | 0 |

---

### takeCount

| Property | Value |
|---|---|
| Type | Integer |
| Minimum | 1 |
| Maximum | 4 |
| Default | 4 |

---

## Validation Rules

The tool must reject:

```txt
takeCount < 1
takeCount > 4
skipIndex < 0
```

---

# Updated Validation Schema

## Existing

```ts
takeCount: z
  .number()
  .int()
  .min(1)
  .default(4)
```

---

## Updated

```ts
takeCount: z
  .number()
  .int()
  .min(1)
  .max(4)
  .default(4)
```

---

# Response Transformation Requirement

## Important

The tool MUST NOT return the raw ERP response.

Instead return ONLY the required AI-friendly structure.

---

# Required Final Response Structure

```ts
[
  {
    projectWeeklyPlanId: string;

    weekDate: string;

    createdOnUtc: string;

    projectWeeklyPlanDatesLines: [
      {
        expectedDescription: string;

        actualDescription: string;

        expectedDescriptionCreatedBy: {
          firstName: string;

          lastName: string;
        };

        employeeEstimateHoursForWeekSummaryList: [
          {
            employeeId: string;

            employeeName: string;

            totalEstimatedHours: number;
          }
        ];
      }
    ];
  }
]
```

---

# Required Fields

## Root Level

| Field | Required |
|---|---|
| projectWeeklyPlanId | Yes |
| weekDate | Yes |
| createdOnUtc | Yes |
| projectWeeklyPlanDatesLines | Yes |

---

## projectWeeklyPlanDatesLines

| Field | Required |
|---|---|
| expectedDescription | Yes |
| actualDescription | Yes |
| expectedDescriptionCreatedBy | Yes |
| employeeEstimateHoursForWeekSummaryList | Yes |

---

## expectedDescriptionCreatedBy

| Field | Required |
|---|---|
| firstName | Yes |
| lastName | Yes |

---

## employeeEstimateHoursForWeekSummaryList

| Field | Required |
|---|---|
| employeeId | Yes |
| employeeName | Yes |
| totalEstimatedHours | Yes |

---

# Data Cleanup Requirements

The following ERP fields MUST NOT be returned:

```txt
deleted
active
securityStamp
concurrencyStamp
phoneNumberConfirmed
twoFactorEnabled
lockoutEnabled
accessFailedCount
employeeDepartment
employeeDesignation
employeeStatuses
employeeType
employeeOrgLocation
personSitesMapping
projectActivities
createdById
updatedById
nested employee objects
nested person objects
audit metadata
unused IDs
```

---

# HTML Cleanup Requirement

## Affected Fields

The following fields currently contain HTML:

```txt
expectedDescription
actualDescription
```

---

# Required Cleanup

The tool must:

- remove HTML tags
- preserve readable formatting
- preserve bullet points if possible
- preserve headings if possible
- return plain readable text

---

# Required Refactoring Tasks

## Task 1 — Update Validation Schema

```ts
takeCount: z
  .number()
  .int()
  .min(1)
  .max(4)
  .default(4)
```

---

## Task 2 — Create Mapper Layer

Create:

```txt
src/server/tools/monthly-plan/mappers/monthly-plan.mapper.ts
```

---

## Task 3 — Create HTML Cleanup Utility

Create utility:

```txt
src/server/utils/html-to-text.ts
```

Suggested function:

```ts
export function cleanHtml(
  html: string
): string
```

---

# Recommended NPM Package

```bash
npm install html-to-text
```

OR

```bash
npm install sanitize-html
```

---

# Recommended Internal Flow

```txt
MCP Tool
    ↓
Validation
    ↓
ERP API Call
    ↓
Response Mapper
    ↓
HTML Cleanup
    ↓
AI-Friendly Response
```

---

# Performance Optimization Goals

This refactor aims to:

- reduce MCP payload size
- reduce token usage
- improve AI readability
- improve MCP performance
- improve Claude/Desktop response quality
- improve Cursor AI analysis quality

---

# Important Architecture Principle

The MCP server should behave as:

```txt
ERP → AI Context Transformer
```

NOT as:

```txt
ERP Raw Data Proxy
```

---

# Expected Final Result

The final `get_monthly_plan` tool should:

- return lightweight structured data
- support AI analysis workflows
- support planning workflows
- support reporting workflows
- support project intelligence workflows
- avoid exposing unnecessary ERP internals
