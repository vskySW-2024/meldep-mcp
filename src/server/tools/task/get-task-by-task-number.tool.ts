// @ts-nocheck
import { z } from 'zod';
import { meldepClient } from '../../client/meldep-client.js';
import { sessionStore } from '../../auth/session-store.js';
import { mapTaskListResponse } from './mappers/task.mapper.js';
const logger = {
    info: (...args) => console.error(...args),
    warn: (...args) => console.error(...args),
    error: (...args) => console.error(...args),
    debug: (...args) => console.error(...args),
};
const GetTaskByTaskNumberInputSchema = z.object({
    taskNumber: z
        .string()
        .optional()
        .describe('Task number to search'),
    page: z
        .number()
        .int()
        .min(1)
        .default(1)
        .describe('Page number'),
    pageSize: z
        .number()
        .int()
        .min(2)
        .max(20)
        .default(20)
        .describe('Number of records per page'),
    searchForLoggedInUserTasks: z
        .boolean()
        .optional()
        .default(false)
        .describe('Whether to fetch tasks only for logged-in user'),
});
async function executeGetTaskByTaskNumberTool(input) {
    const { taskNumber, page, pageSize, searchForLoggedInUserTasks } = input;
    const projectId = sessionStore.getProjectId();
    if (!projectId) {
        return {
            isError: true,
            message: 'Project ID not found in session.',
            data: [],
        };
    }
    if (pageSize > 20 || pageSize < 2) {
        return {
            isError: true,
            message: 'Page size must be between 2 and 20.',
            data: [],
        };
    }
    if (page < 1) {
        return {
            isError: true,
            message: 'Page number cannot be less than 1.',
            data: [],
        };
    }
    const employeeId = sessionStore.getEmployeeId();
    try {
        const rawTaskData = await meldepClient.getTaskByTaskNumber({
            page,
            pageSize,
            sortBy: 'createdOnUtc',
            descending: true,
            sorts: {},
            searchText: '',
            projectTaskNumber: taskNumber || '0',
            customerIds: [],
            companyContactIds: [],
            projectIds: [projectId],
            projectModuleIds: [],
            projectTaskIds: [],
            projectLeadsIds: [],
            activityOwners: searchForLoggedInUserTasks ? employeeId
                ? [employeeId]
                : []
                : [],
            statusIds: [],
            priorityIds: [],
            taskTagsIds: [],
            isTemplate: false,
        });
        const aiFriendlyTask = mapTaskListResponse(rawTaskData);
        return {
            isError: false,
            message: aiFriendlyTask.length > 0
                ? 'Successfully retrieved task details.'
                : 'No tasks found.',
            data: aiFriendlyTask,
        };
    }
    catch (error) {
        logger.error({ error }, 'Error fetching task details.');
        return {
            isError: true,
            message: error?.message ||
                'Failed to retrieve task details.',
            data: [],
        };
    }
}
export const getTaskByTaskNumberTool = {
    name: 'get_task_by_task_number',
    description: 'Retrieves task details from Meldep ERP using task number and returns AI-friendly task data.',
    inputSchema: {
        type: 'object',
        properties: {
            taskNumber: {
                type: 'string',
                description: 'Task number to search',
            },
            page: {
                type: 'number',
                description: 'Page number for pagination',
            },
            pageSize: {
                type: 'number',
                description: 'Number of records per page',
            },
            searchForLoggedInUserTasks: {
                type: 'boolean',
                description: 'Whether to search tasks only assigned to logged-in user',
            },
        },
        required: [],
    },
};
export async function executeGetTaskByTaskNumberToolHandler(input) {
    return executeGetTaskByTaskNumberTool(input);
}
