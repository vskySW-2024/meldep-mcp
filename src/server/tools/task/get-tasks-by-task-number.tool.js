// src/server/tools/task/get-tasks-by-task-number.tool.ts
import { httpClient } from '../../client/http-client.js';
import { ERP_ENDPOINTS } from '../../constants.js';
import { logger } from '../../utils/logger.js';
import { sessionStore } from '../../stores/session-store.js';
export async function getTasksByTaskNumberTool(page = 1, pageSize = 20, sortBy = 'createdOnUtc', descending = true, searchText = '', taskNumber = null, projectIds = [], activityOwners = [], serachForLoggedInUserTasks = false, customerIds = [], companyContactIds = [], projectModuleIds = [], projectTaskIds = [], projectLeadsIds = [], statusIds = [], priorityIds = [], taskTagsIds = [], isTemplate = false, sorts = {}) {
    const finalActivityOwners = new Set(activityOwners);
    if (serachForLoggedInUserTasks) {
        const userId = sessionStore.get('userId');
        if (userId) {
            finalActivityOwners.add(userId);
        }
    }
    const payload = {
        page,
        pageSize,
        sortBy,
        descending,
        sorts,
        searchText,
        projectTaskNumber: taskNumber,
        customerIds,
        companyContactIds,
        projectIds,
        projectModuleIds,
        projectTaskIds,
        projectLeadsIds,
        activityOwners: Array.from(finalActivityOwners),
        statusIds,
        priorityIds,
        taskTagsIds,
        isTemplate,
    };
    try {
        const response = await httpClient.post(ERP_ENDPOINTS.TASK.GET_BY_TASK_NUMBER, payload);
        logger.info('Successfully fetched tasks by task number using the tool.');
        return response.data;
    }
    catch (error) {
        logger.error({ error }, 'Failed to fetch tasks by task number using the tool.');
        throw error;
    }
}
