    // Main - nur start
    
let confettiShown = false;

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById
    ('task_input');
    const addTaskBtn = document.getElementById
    ('add_task_btn');

    // start dragover in taskList
    initDragAndDrop();
    
    
    // knoprf '+'
    addTaskBtn.addEventListener('click', () => addTask());


    // 'Enter'
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
          e.preventDefault();
          addTask();
        }

    });

    // uafladen scpeichende Daten
    loadTasksFromLocalStorage();
});