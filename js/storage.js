// save und load datei 

const saveTaskLocalStorage = () => {
    const taskList = document.getElementById('task_list');

    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}; 



const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({text, completed}) => addTask(text, completed, false));
    toggleEmptyState();
    updateProgress();
};