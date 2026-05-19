# Meldep MCP Server Requirements Document

## Project Overview

### Project Name
Meldep MCP Server

### Purpose
Develop a production-grade MCP (Model Context Protocol) server using Node.js and the official MCP TypeScript SDK.

The MCP server will act as an AI-native integration layer between:

- AI Assistants (Claude, Cursor, ChatGPT)
- Meldep ERP System
- Project Management Processes

The server will expose Meldep ERP APIs as MCP tools over stdio transport.

This enables PM teams to:

- Analyze client call discussions
- Understand new requirements
- Generate project plans
- Analyze project progress
- Generate monthly/weekly plans
- Generate meeting agendas
- Analyze risks and blockers
- Review task and timesheet progress
- Generate AI-powered summaries and insights

---

# Technical Stack

## Backend

- Node.js 20+
- TypeScript
- MCP TypeScript SDK
- Zod Validation
- Axios
- Pino Logger

## MCP Transport

- stdio transport

## ERP System

- Meldep ERP
- Base URL:
  https://api.meldep.com

---

# Authentication Requirements

## Authentication API

### Endpoint
POST https://api.meldep.com/auth/login

### Request Body

```json
{
  "username": "string",
  "password": "string",
  "isRememberMeChecked": true
}
```

### Response

```json
[
  {
    "token": "jwt-token",
    "expiresIn": 2592000,
    "createdAt": "05/15/2026 02:49 PM",
    "username": "Prasad",
    "personId": "GUID",
    "firstName": "Prasad",
    "lastName": "Sawant",
    "email": "user@email.com",
    "employeeId": "GUID",
    "roles": ["employee"],
    "rolesName": ["Employee"],
    "siteId": "GUID",
    "userId": "GUID",
    "siteName": "Vsky Solutions",
    "globalSiteId": "GUID"
  }
]
```

---

# MCP Connection Requirements

The MCP server should accept:

- username
- password
- projectId

These credentials should:

- Authenticate user with Meldep
- Store session securely in memory
- Reuse token for future tool calls
- Auto refresh/re-login on token expiration

---

# High-Level MCP Features

## 1. ERP Integration Layer

The MCP server must:

- Authenticate with Meldep
- Manage tokens
- Handle retries/errors
- Standardize API responses
- Convert ERP APIs into AI-friendly tool responses

---

## 2. AI-Powered PM Intelligence

The MCP server should support:

### Requirement Analysis

- Analyze client call transcripts
- Extract requirements
- Detect action items
- Identify risks
- Generate implementation tasks

### Planning

- Generate monthly plans
- Generate weekly plans
- Sprint planning
- Capacity planning
- Resource allocation suggestions

### Progress Analysis

- Analyze task progress
- Analyze delays
- Compare expected vs actual work
- Detect blockers
- Generate project health reports

### Meeting Assistance

- Generate agendas
- Generate MOM summaries
- Generate follow-up tasks
- Generate status reports

---

# Important ERP Modules

The following Meldep modules are critical:

1. Monthly Plan
2. Weekly Plan
3. Projects
4. Project Modules
5. Requirements
6. Tasks
7. Activities
8. Timesheets

---

# MCP Tool Design

Each ERP module should expose:

- Raw retrieval tools
- AI analysis tools
- Summary tools
- Reporting tools
- Planning tools

---

# Recommended MCP Directory Structure

```txt
meldep-mcp/
│
├── src/
│
├── server/
│   ├── index.ts
│   ├── transport/
│   │   └── stdio.ts
│   │
│   ├── auth/
│   │   ├── login.ts
│   │   ├── token-manager.ts
│   │   └── session-store.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── constants.ts
│   │   └── meldep.config.ts
│   │
│   ├── client/
│   │   ├── meldep-client.ts
│   │   ├── http-client.ts
│   │   └── endpoints.ts
│   │
│   ├── tools/
│   │
│   │   ├── auth/
│   │   │   └── connect-meldep.tool.ts
│   │   │
│   │   ├── project/
│   │   │   ├── get-project.tool.ts
│   │   │   ├── get-project-modules.tool.ts
│   │   │   ├── get-project-health.tool.ts
│   │   │   └── analyze-project-risk.tool.ts
│   │   │
│   │   ├── monthly-plan/
│   │   │   ├── get-monthly-plans.tool.ts
│   │   │   ├── summarize-monthly-plan.tool.ts
│   │   │   ├── compare-monthly-progress.tool.ts
│   │   │   └── generate-next-month-plan.tool.ts
│   │   │
│   │   ├── weekly-plan/
│   │   │   ├── get-weekly-plans.tool.ts
│   │   │   ├── analyze-weekly-progress.tool.ts
│   │   │   ├── sprint-summary.tool.ts
│   │   │   └── generate-next-week-plan.tool.ts
│   │   │
│   │   ├── requirements/
│   │   │   ├── get-requirements.tool.ts
│   │   │   ├── analyze-requirements.tool.ts
│   │   │   ├── extract-requirements.tool.ts
│   │   │   └── generate-requirement-breakdown.tool.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── get-tasks.tool.ts
│   │   │   ├── get-task-progress.tool.ts
│   │   │   ├── analyze-task-delays.tool.ts
│   │   │   └── generate-task-summary.tool.ts
│   │   │
│   │   ├── activity/
│   │   │   ├── get-activities.tool.ts
│   │   │   └── analyze-activity-productivity.tool.ts
│   │   │
│   │   ├── timesheets/
│   │   │   ├── get-timesheets.tool.ts
│   │   │   ├── analyze-utilization.tool.ts
│   │   │   └── generate-capacity-report.tool.ts
│   │   │
│   │   ├── meetings/
│   │   │   ├── generate-agenda.tool.ts
│   │   │   ├── summarize-client-call.tool.ts
│   │   │   ├── extract-action-items.tool.ts
│   │   │   └── generate-followups.tool.ts
│   │   │
│   │   └── reports/
│   │       ├── project-health-report.tool.ts
│   │       ├── project-status-report.tool.ts
│   │       ├── risk-analysis.tool.ts
│   │       └── blocker-analysis.tool.ts
│   │
│   ├── services/
│   │   ├── ai/
│   │   ├── project/
│   │   ├── planning/
│   │   ├── reporting/
│   │   └── analytics/
│   │
│   ├── schemas/
│   ├── middleware/
│   ├── utils/
│   └── types/
│
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

---

# Monthly Plan API

## Endpoint

POST

```txt
https://api.meldep.com/projects/get-project-weekly-plan-details
```

## Query Parameters

```txt
projectId=<ProjectID>
planTypeId=A2F7DA83-A804-4ACE-914D-F0B6E9F63A39
skipIndex=0
takeCount=4
weekEndDate=
```

## Authentication

```txt
Authorization: Bearer <token>
```

---

# Monthly Plan Tool Requirements

## MCP Tool Name

```txt
get_monthly_plan
```

## Tool Inputs

```json
{
  "projectId": "string",
  "skipIndex": 0,
  "takeCount": 4
}
```

## Tool Responsibilities

The tool should:

- Fetch monthly plan data
- Clean HTML content
- Convert ERP structure into AI-friendly format
- Return summarized information
- Extract:
  - goals
  - deliverables
  - expected progress
  - actual progress
  - employee allocation
  - blockers
  - carry-forward items

---

# Monthly Plan Response Optimization

The raw API response is extremely large and nested.

The MCP tool should transform the response into:

```json
{
  "month": "May 2026",
  "completionPercentage": 45,
  "expectedGoals": [],
  "actualAchievements": [],
  "carryForwardItems": [],
  "assignedEmployees": [],
  "estimatedHours": 80,
  "riskItems": [],
  "summary": "AI generated summary"
}
```

---

# AI Processing Requirements

## Requirement Extraction

Input:

- Client meeting transcript
- MOM
- Requirement notes

Output:

- Functional requirements
- Technical requirements
- Risks
- Dependencies
- Suggested tasks
- Estimated effort

---

# AI Planning Features

## Weekly Plan Generation

AI should:

- Analyze pending tasks
- Analyze previous week progress
- Analyze blockers
- Generate optimized weekly plan
- Estimate realistic completion targets

---

## Monthly Plan Generation

AI should:

- Analyze project velocity
- Analyze delivery deadlines
- Analyze resource allocation
- Generate optimized monthly roadmap

---

# Meeting Intelligence Features

## Generate Meeting Agenda

Inputs:

- Project status
- Pending blockers
- Requirements
- Sprint progress

Output:

- Structured meeting agenda
- Priority discussion points
- Risk items
- Required decisions

---

## Client Call Analysis

Inputs:

- Call transcript
- Meeting notes

Output:

- Requirement summary
- Action items
- New tasks
- Risks
- Dependencies
- Suggested next steps

---

# Security Requirements

## Authentication Security

- Never expose tokens in logs
- Store tokens in memory only
- Auto expire sessions
- Mask sensitive information

---

## Logging

Use stderr only.

Never log using stdout because MCP protocol uses stdout.

---

# Error Handling Requirements

The server should handle:

- Expired tokens
- Invalid credentials
- ERP downtime
- Rate limiting
- Invalid project IDs
- Missing permissions
- Network failures

---

# Performance Requirements

## Caching

Cache:

- project metadata
- plans
- employee mappings
- requirement summaries

---

## Retry Strategy

Implement:

- exponential backoff
- retry middleware
- timeout handling

---

# Recommended NPM Packages

## Core

```bash
npm install @modelcontextprotocol/sdk
npm install axios
npm install zod
npm install dotenv
npm install pino
npm install pino-pretty
```

## Development

```bash
npm install -D typescript
npm install -D tsx
npm install -D @types/node
npm install -D eslint
npm install -D prettier
```

---

# Suggested Future Enhancements

## Phase 2

- SSE transport
- WebSocket transport
- Multi-tenant support
- AI embeddings
- Vector search
- Requirement semantic search
- RAG support

---

## Phase 3

- Jira integration
- Azure DevOps integration
- Slack integration
- Teams integration
- Email summarization
- Auto sprint generation

---

# MCP Server Workflow

```txt
AI Assistant
    ↓
MCP Tool Call
    ↓
Meldep MCP Server
    ↓
Authentication Layer
    ↓
Meldep ERP APIs
    ↓
AI Analysis Layer
    ↓
Structured AI Response
```

---

# Example AI Use Cases

## Example 1

```txt
Analyze current project delays and identify blockers.
```

## Example 2

```txt
Generate weekly plan for next sprint.
```

## Example 3

```txt
Analyze client call transcript and generate requirements.
```

## Example 4

```txt
Generate project health report.
```

---

# Important Notes

- MCP tools should return AI-friendly structured responses
- Avoid returning large nested ERP objects directly
- Convert HTML responses into clean markdown/text
- Keep business logic separated from MCP layer
- Maintain modular architecture for future ERP expansion

---

# Sample Monthly Plan Data Reference

The provided Monthly Plan API response contains:

- expectedDescription
- actualDescription
- employee assignments
- estimated hours
- completion percentages
- carry-forward items
- task mappings
- progress summaries

This data should be transformed into concise AI-consumable summaries instead of raw ERP payloads.

Reference source:
fileciteturn0file0L1-L40

