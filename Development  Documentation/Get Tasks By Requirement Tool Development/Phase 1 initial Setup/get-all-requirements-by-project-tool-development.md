Get Tasks by Requirements Tool development
Meldep MCP Server – Task List by Requirement Module
Objective
Develop the ‘get_all_requirement_by_project` MCP tool with strict pagination validation, optimize payload size, clean HTML content, remove unnecessary ERP metadata, and return AI-friendly structured responses.

## API Information

URL: https://api.meldep.com/requirement/list
METHOD: POST
PAYLOAD: {
    "page": <PageNo>,
    "pageSize":<PageSize>[20],
    "sortBy": "status.dropDownValue",
    "descending": false,
    "sorts": {},
    "searchText": "",
    "requirementNumber": "0",
    "projectIds": [
        <ProjectId>
    ],
    "projectModuleIds": [],
    "requirementGroupIds": [],
    "name": "",
    "requirementType": null,
    "statusIds": [],
    "identifiedByIds": [],
    "fromDate": null,
    "toDate": null,
    "requirementTagIds": []
}
HEADER: Authorization: Bearer <Token>
API Response Format:
{
“editing”:false,
“date”:[
	{
            "projectId": "c42906da-bcf9-4d00-ba41-65e1c03afd12",
            "projectModuleId": "22ef6ff1-9657-43a0-87e9-0dbffa7a8fde",
            "statusId": "32c0932b-8aa1-4c5c-9df9-745226070b53",
            "identifiedUserType": "DA992EDD-E928-4E21-AF70-8CD2441EF644",
            "priorityId": "2A1B924B-9041-4F1A-B153-D14FA41845FE",
            "title": "Add Parent Client Filter to All Client-Related Screens",
            "identifiedDate": "09/09/2025",
            "editingStatus": 2,
            "requirementNumber": 572,
            "createdOnUtc": "09/12/2025 04:50 PM",
            "updatedOnUtc": "01/22/2026 05:50 PM",
            "deleted": false,
            "requirementNotesCount": 2,
            "lastNote": "No longer Required!",
            "isPinned": false,
            "project": {
                "name": "Bader Rutter - Maconomy Implementation",
                "year": 0,
                "isPinned": false,
                "isTemplate": false,
                "active": false,
                "sortOrder": 0,
                "createdOnUtc": "01/01/0001",
                "deleted": false,
                "projectNotesCount": 0,
                "projectMessageCount": 0,
                "completedTaskCount": 0,
                "totalTaskCount": 0,
                "totalIssueCount": 0,
                "completedIssueCount": 0,
                "completedRequirementCount": 0,
                "totalRequirementCount": 0,
                "totalTaskEstimateHours": 0,
                "totalActivityHours": 0,
                "totalModuleCount": 0,
                "totalTasksCount": 0,
                "projectEmployeeMappings": [],
                "projectUserMappings": [
                    {
                        "fullAccess": false,
                        "viewOnly": true,
                        "notes": true,
                        "deleted": false,
                        "id": "23d2ee62-e654-4a63-ba15-b552f23f084d"
                    }
                ],
                "projectTags": [],
                "projectPinned": [],
                "projectColors": [],
                "projectFileList": [],
                "projectsMessages": [],
                "projectModules": [],
                "projectTasks": [],
                "projectActivities": [],
                "issue": [],
                "requirement": [],
                "testPlans": [],
                "timesheetLine": [],
                "projectWeeklyPlans": [],
                "projectSwimLanes": [],
                "projectCharterGroupByList": [],
                "id": "c42906da-bcf9-4d00-ba41-65e1c03afd12"
            },
            "projectModule": {
                "projectModuleNumber": 0,
                "name": "Extensions & Integrations",
                "isDuplicate": false,
                "isMoved": false,
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001",
                "projectTasksCount": 0,
                "projectModuleNotesCount": 0,
                "projectTasks": [],
                "projectActivities": [],
                "projectModuleFilesList": [],
                "projectModulesUserMappings": [],
                "id": "22ef6ff1-9657-43a0-87e9-0dbffa7a8fde"
            },
            "area": {
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001"
            },
            "workspace": {
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001"
            },
            "approvalStatusDropDown": {
                "dropDownValue": "Approved",
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001",
                "id": "B0FEB908-0E31-4563-8A11-6FEDC6D8436E"
            },
            "requirementEntered": {
                "createdOnUtc": "01/01/0001",
                "active": false,
                "deleted": false,
                "estimateHrs": 0,
                "yearsCompleted": 0,
                "person": {
                    "deleted": false,
                    "isCustomer": false,
                    "fullName": "Sitaram Chari",
                    "isSharedUser": false,
                    "personSitesMapping": [],
                    "id": "661408CA-C444-48E9-96E8-6D1B17BCF383"
                },
                "employeeDepartment": [],
                "employeeDesignation": [],
                "employeeStatuses": [],
                "employeeType": [],
                "employeeOrgLocation": [],
                "employeeClientLocation": [],
                "projectEmployeeMappings": [],
                "projectActivities": []
            },
            "status": {
                "dropDownValue": "Cancelled",
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001",
                "id": "32c0932b-8aa1-4c5c-9df9-745226070b53"
            },
            "userType": {
                "dropDownValue": "Customer",
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001",
                "id": "DA992EDD-E928-4E21-AF70-8CD2441EF644"
            },
            "employee": {
                "createdOnUtc": "01/01/0001",
                "active": false,
                "deleted": false,
                "estimateHrs": 0,
                "yearsCompleted": 0,
                "person": {
                    "deleted": false,
                    "isCustomer": false,
                    "fullName": " ",
                    "isSharedUser": false,
                    "personSitesMapping": []
                },
                "employeeDepartment": [],
                "employeeDesignation": [],
                "employeeStatuses": [],
                "employeeType": [],
                "employeeOrgLocation": [],
                "employeeClientLocation": [],
                "projectEmployeeMappings": [],
                "projectActivities": []
            },
            "customer": {
                "deleted": false,
                "isCustomer": false,
                "fullName": "David Curran",
                "isSharedUser": false,
                "personSitesMapping": [],
                "id": "1634BC75-0C08-4F62-963F-682F623F5833"
            },
            "priority": {
                "dropDownValue": "1st",
                "sortOrder": 0,
                "active": false,
                "deleted": false,
                "createdOnUtc": "01/01/0001",
                "id": "2A1B924B-9041-4F1A-B153-D14FA41845FE"
            },
            "createdBy": {
                "active": false,
                "deleted": false,
                "person": {
                    "deleted": false,
                    "isCustomer": false,
                    "fullName": "Sitaram Chari",
                    "isSharedUser": false,
                    "personSitesMapping": [],
                    "id": "661408CA-C444-48E9-96E8-6D1B17BCF383"
                },
                "id": "bbbc6859-6cc1-4325-b71d-9a8ad77ae6f0",
                "emailConfirmed": false,
                "securityStamp": "28bb7d66-0ba6-479d-bb70-cc18dd0a3d27",
                "concurrencyStamp": "50b99417-2353-43e0-ba9d-72996986a720",
                "phoneNumberConfirmed": false,
                "twoFactorEnabled": false,
                "lockoutEnabled": false,
                "accessFailedCount": 0
            },
            "updatedBy": {
                "active": false,
                "deleted": false,
                "person": {
                    "deleted": false,
                    "isCustomer": false,
                    "fullName": "Sitaram Chari",
                    "isSharedUser": false,
                    "personSitesMapping": [],
                    "id": "661408CA-C444-48E9-96E8-6D1B17BCF383"
                },
                "id": "2e4a98a0-dae6-43e6-aa1b-3b102302a16f",
                "emailConfirmed": false,
                "securityStamp": "b957bbbd-f69b-4102-8d4b-63bd9b42a3c7",
                "concurrencyStamp": "746d55e5-976e-41a2-9595-9aad885897d1",
                "phoneNumberConfirmed": false,
                "twoFactorEnabled": false,
                "lockoutEnabled": false,
                "accessFailedCount": 0
            },
            "filePathDetailsModel": [],
            "filePathDetails": [],
            "requirementChangeLogModel": [],
            "requirementChangeLog": [],
            "projectTaskRelatedMappings": [
                {
                    "taskId": "062f10cd-0bd6-47cc-9fd9-99a895940b74",
                    "createdOnUtc": "01/01/0001",
                    "deleted": false,
                    "projectTask": {
                        "projectTaskNumber": 11484,
                        "estimateTime": 0,
                        "isDuplicate": false,
                        "isMoved": false,
                        "active": false,
                        "sortOrder": 0,
                        "deleted": false,
                        "activitiesCount": 0,
                        "projectTaskNotesCount": 0,
                        "totalTimesheetEstHours": 0,
                        "createdOnUtc": "01/01/0001",
                        "status": {
                            "dropDownValue": "Completed",
                            "sortOrder": 0,
                            "active": false,
                            "deleted": false,
                            "createdOnUtc": "01/01/0001",
                            "id": "7E220101-BF2F-4614-B315-2539CBE3F3AD"
                        },
                        "projectActivities": [],
                        "projectTaskStatusLog": [],
                        "projectTaskFilesList": [],
                        "projectTask_Tags": [],
                        "projectTaskRelatedMappings": [],
                        "projectWeeklyPlanDatesReqTaskIssueMappingList": []
                    },
                    "id": "e21a8fb6-a2c0-495c-8663-30d56359c802"
                }
            ],
            "requirementTags": [],
            "id": "3e3e9e2b-0d3a-4370-84de-364bb89da818",
            "customProperties": {}
        }
]
}

## Pagination Validation Rules

pageNo:
- Minimum: 1
(if less than 1 then throw strict error)

pageSize:
- Minimum: 1
- Maximum: 20
(if not between 0<=size<=20 then strictly throw error)


## Required Response Structure

{
  	"isError": false,
  	"message": "string",
  	"data": [
    		{
      			"requirementId": "data[i].id",
     			“requirementNo”:” data[i]. requirementNumber”,
      			“requirementTitle”: “data[i].title”,
     			“reqiuirementModule”:” data[i]. projectModule.name” ,
     			“requirementEnteredBy”:” data[i]. requirementEntered. Person.firstName+’ ‘ + data[i]. requirementEntered. Person.lastName”,
      			“requirementIdentifiedBy”:” data[i]. employee.person.firstname+’ ‘+data[i]. employee.person.lastName”,
     			“requirementStatus”:”data[i].status.dropDownValue”
     			“requirementPriority”:”data[i].priority. dropDownValue”,
     			“tasks”:[{
				taskId:data[i]. projectTaskRelatedMappings[j].taskId
				taskNumber: data[i]. projectTaskRelatedMappings[j].projecttask.projecttaskNumber
				taskStatus: data[i]. projectTaskRelatedMappings[j].projecttask.status.dropDownValue
}] 
}
]
}

## Expected Final Result

The final “get_all_tasks_by_requirement” tool should behave as an ERP → AI Context Transformer instead of exposing raw ERP payloads.