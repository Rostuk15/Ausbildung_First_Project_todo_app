// tasks.js — виносимо логіку окремо
export const filterTasks = (tasks) => {
    return tasks.filter(task => task.text.trim() !== '');
};

export const countCompleted = (tasks) => {
    return tasks.filter(task => task.completed).length;
};