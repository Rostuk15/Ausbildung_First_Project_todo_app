    // prüfung ob Browser funktioniert mit "service worker" sonst bescreibene Fehler 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(() => console.log('Service Worker registriert'))
  .catch((err) => console.log('Error:', err));
}


    // verknüpfung html und Javascript
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById
    ('task_input');
    const addTaskBtn = document.getElementById
    ('add_task_btn');
    const taskList = document.getElementById
    ('task_list');
    const emptyIMAGE =  document.querySelector
    ('.empty_img');
    const todosContainer = document.querySelector
    ('.todos-container');
    const progressBar = document.getElementById
    ('progress');
    const progressNumbers = document.getElementById
    ('numbers');

    


    let confettiShown = false;


    // prüft wieviel afugaben in list und dynamsiche foto und container
    const toggleEmptyState = () => { 
      emptyIMAGE.style.display = taskList.children.length === 0 ? 'block' : 'none';
      todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };



    // ProgressBar 
    const updateProgress = (checkCompletion = true) => 
    {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length

        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        if (completedTasks < totalTasks) {
          confettiShown = false;
      }
  
      // Nur 1 confetiShow wenn alle aufgaben fertig sind 
      if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks && !confettiShown) {
          confettiShown = true;
          launchConfetti();
      }
    };




    //DragandDropfunc(Blur)
    function enableDragAndDrop(li) {
      li.addEventListener('dragstart', () => {
        li.classList.add('dragging')
      });

      li.addEventListener('dragend', () => {
        li.classList.remove('dragging')
        saveTaskLocalStorage();
      });
    };


    taskList.addEventListener('dragover', (e) => {
      e.preventDefault();

      const draggingElement = document.querySelector('.dragging');
      const afterDragElement = getDragAfterElement(taskList, e.clientY);

      if (afterDragElement === null) {
        taskList.appendChild(draggingElement);
      } else {
        taskList.insertBefore(draggingElement, afterDragElement)
      }
    });


    function getDragAfterElement(list, mouseY) {
      const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return {offset, element: child };
        } else {
          return closest;
        }
      }, {offset: Number.NEGATIVE_INFINITY}).element;
    };





    // speicher aufgaben in speicher browser  
    const saveTaskLocalStorage = () => {
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




      // Haupt-functions add-edit-delete und checkbox task 
    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim()
        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
      
      
      // drag and drop für 'li'
        li.draggable = true;


      //dynamische btn edit and delete und checkbox
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>`;
        
        const checkbox = li.querySelector('.checkbox'); 
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }
        

      // checbox für fertige aufgabe 
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTaskLocalStorage();
        });


      //  edit btn für li 
        editBtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
                saveTaskLocalStorage();
            }
        });




      // löschen btn 
        li.querySelector('.delete-btn').addEventListener('click', () => {li.remove();
            toggleEmptyState();    
            updateProgress();
            saveTaskLocalStorage();
        });    

        taskList.appendChild(li);
        enableDragAndDrop(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTaskLocalStorage();
    };



    // zwei möglichkeit tasks eingeben 'Enter' und Plus
    addTaskBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
          e.preventDefault();
          addTask();
        }

    });

    loadTasksFromLocalStorage(); 
});



    // confeti wenn alle tasks fertig sind 

const launchConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}





