Get Monthly Plan Tool Refactoring Requirements
Meldep MCP Server - Monthly Plan Module
Objective
Refactor the existing get_monthly_plan MCP tool to enforce strict pagination validation, optimize payload size, clean HTML content, remove unnecessary ERP metadata, and return AI-friendly structured responses.
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
Updated Validation Schema
takeCount: z
  .number()
  .int()
  .min(1)
  .max(4)

skipIndex: z
  .number()
  .int()
  .min(0)

Error Handling
1.	Validation error:
a.	Apply the minimum and maximum validation rule for Skip and Take parameters. If not in rule, then throw proper error message
2.	Tool Description:
a.	Make the Tool description proper, professional
b.	Keep args, return and description in proper format
3.	Keep response format of the tool as
a.	{
    isError:True/false,
    message:”Proper message or note”, (keep notes like ok, error message or any other relevant information to data)
    data:{}/[]    //data return for llm, 
}
