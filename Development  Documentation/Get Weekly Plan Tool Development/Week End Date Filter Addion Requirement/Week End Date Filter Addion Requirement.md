Week End Date Filter Addition Requirement
Meldep MCP Server – Weekly Plan Module
Objective
Addition of the weekEndDate parameter to filter the data. To get the Weekly plan for particular weekenddate only, keeping that optional, if its not provided then the top skip and take based list will be returned and if provided the list of the requested weekly plan only.

API Information:
URL: https://api.meldep.com/projects/get-project-weekly-plan-details?projectId=<ProjectID> &planTypeId=1CFDEC9F-9C68-4E75-BC4E-E408C5918B1A&skipIndex=<skipIndex>&takeCount=<takeCount>&weekEndDate=[Add weekend date here as mm-dd-yyyy]
METHOD: POST
HEADER:
Authorization: Bearer <Token>
API Response Format: No need to change anything in the return format of the tool
Pagination Validation Rules: Keep Existing
Required Response Structure [NO CHANGE]
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
HTML Cleanup Requirements: [NO CHANGE]
Expected Final Result
The final get_weekly_plan tool should be able to send the weekDateParameter to the api to filter the data.
