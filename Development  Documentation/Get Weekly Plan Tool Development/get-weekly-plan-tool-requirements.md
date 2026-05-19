Get Weekly Plan Tool development Requirements
Meldep MCP Server – Weekly Plan Module
Objective
Develop the get_weekly_plan MCP tool with strict pagination validation, optimize payload size, clean HTML content, remove unnecessary ERP metadata, and return AI-friendly structured responses.

API Information:
URL: https://api.meldep.com/projects/get-project-weekly-plan-details?projectId=<ProjectID> &planTypeId=1CFDEC9F-9C68-4E75-BC4E-E408C5918B1A&skipIndex=<skipIndex>&takeCount=<takeCount>&weekEndDate=
METHOD: POST
HEADER:
Authorization: Bearer <Token>
API Response Format:
[
	{
        "projectWeeklyPlanId": "C494D5DA-0E82-43B5-8CC2-D06253BD1724",
        "planTypeId": "1CFDEC9F-9C68-4E75-BC4E-E408C5918B1A",
        "weekDate": "05/17/2026",
        "isApproved": false,
        "isCompleted": false,
        "completionPercentage": 0,
        "createdOnUtc": "01/01/0001",
        "updatedOnUtc": "01/01/0001",
        "deleted": false,
        "projectWeeklyPlanDatesLines": [
            {
                "projectWeeklyPlanDatesId": "6ed55b99-1c03-42d9-bc06-d49177333faf",
                "expectedDescription": "<ol><li>Advance encryption implementation for SOW Buddy Session History, applying and validating the encryption strategy established in the previous week across the Analyzer Agent session pipeline</li><li>Continue Chatbot Section UI Development, building and refining the conversational interface components within the Outlook add-in frontend</li><li>Advance Tool Docstring Standardization and Prompt Optimization, reviewing and updating agent tool definitions to improve AI decision accuracy</li><li>Ongoing project planning, scope discussions, and team update calls</li></ol>",
                "actualDescription": "",
                "expectedHours": 0.00,
                "expectedDescriptionCreatedById": "4B73E0C2-B9DE-413D-A76C-6527065F5CF5",
                "expectedDescriptionCreatedOnUtc": "05/15/2026 09:07 PM",
                "expectedDescriptionUpdatedById": "4B73E0C2-B9DE-413D-A76C-6527065F5CF5",
                "expectedDescriptionUpdatedOnUtc": "05/15/2026 09:07 PM",
                "isEditExpectedDescription": false,
                "isEditActualDescription": false,
                "deleted": false,
                "expectedDescriptionCreatedBy": {
                    "personId": "A9951B06-B9C5-4E3C-BCEC-627C4591EF40",
                    "active": false,
                    "deleted": false,
                    "person": {
                        "firstName": "Prasad",
                        "lastName": "Sawant",
                        "deleted": false,
                        "isCustomer": false,
                        "isSharedUser": false,
                        "personSitesMapping": [],
                        "id": "A9951B06-B9C5-4E3C-BCEC-627C4591EF40"
                    },
                    "id": "4B73E0C2-B9DE-413D-A76C-6527065F5CF5",
                    "emailConfirmed": false,
                    "securityStamp": "6fdf9d9b-a920-4b5b-ae8b-14f647546ffa",
                    "concurrencyStamp": "f2156133-1097-4c3f-86e6-53e614e7d1ef",
                    "phoneNumberConfirmed": false,
                    "twoFactorEnabled": false,
                    "lockoutEnabled": false,
                    "accessFailedCount": 0
                },
                "expectedDescriptionUpdatedBy": {
                    "personId": "A9951B06-B9C5-4E3C-BCEC-627C4591EF40",
                    "active": false,
                    "deleted": false,
                    "person": {
                        "firstName": "Prasad",
                        "lastName": "Sawant",
                        "deleted": false,
                        "isCustomer": false,
                        "isSharedUser": false,
                        "personSitesMapping": [],
                        "id": "A9951B06-B9C5-4E3C-BCEC-627C4591EF40"
                    },
                    "id": "4B73E0C2-B9DE-413D-A76C-6527065F5CF5",
                    "emailConfirmed": false,
                    "securityStamp": "dd948317-1659-426c-ad17-730a989eda7a",
                    "concurrencyStamp": "0b60dfa4-1748-4895-bda9-dee6f936216d",
                    "phoneNumberConfirmed": false,
                    "twoFactorEnabled": false,
                    "lockoutEnabled": false,
                    "accessFailedCount": 0
                },
                "projectWeeklyPlanDatesLinesAssignedTo": [],
                "id": "1c647092-f4cb-4e04-943b-0bda8662ec26"
            }
        ],
        "projectWeeklyPlanDatesReqTaskIssueMapping": [],
        "employeeEstimateHoursForWeekSummaryList": [],
        "id": "6ed55b99-1c03-42d9-bc06-d49177333faf"
    },
]
Pagination Validation Rules
skipIndex:
- Minimum: 0

takeCount:
- Minimum: 1
- Maximum: 4

Validation must reject:
- takeCount < 1
- takeCount > 4
- skipIndex < 0
Note: If Above rules are satisfied then throw error in tool response
Required Response Structure
{
  "isError": false,
  "message": "string",
  "data": [
    {
      "id": "string",
      "weekDate": "YYYY-MM-DD",
      "projectWeeklyPlanDatesLines": [
        {
          "expectedDescription": "string",
          "actualDescription": "string",
          "expectedDescriptionCreatedBy": "string",
          "projectWeeklyPlanDatesLinesAssignedTo": [
            {
              "name": "string",
              "estimateHrs": 0
            }
          ],
          "employeeEstimateHoursForWeekSummaryList": [
            {
              "employeeName": "string",
              "totalEstimatedHours": 0
            }
          ]
        }
      ]
    }
  ]
}
HTML Cleanup Requirements
The tool must clean HTML from expectedDescription and actualDescription fields while preserving readability, bullet points, and headings where possible.
Required Refactoring Tasks
1. Update Zod validation schema
2. Create response mapper
3. Create HTML cleanup utility
4. Optimize ERP payload
5. Return AI-friendly response structure
Suggested New Files
src/server/tools/weekly-plan/mappers/weekly-plan.mapper.ts
src/server/utils/html-to-text.ts
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
Expected Final Result
The final get_weekly_plan tool should behave as an ERP → AI Context Transformer instead of exposing raw ERP payloads.
