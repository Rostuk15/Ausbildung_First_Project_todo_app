// die Logick Drag-And-Drop func

const enableDragAndDrop = (li) => {
      li.addEventListener('dragstart', () => {
        li.classList.add('dragging')
      });

      li.addEventListener('dragend', () => {
        li.classList.remove('dragging')
        saveTaskLocalStorage();
      });

    // handy drag and drop
   li.addEventListener('touchstart', (e) => {
    li.classList.add('dragging');
   
    li._touchStartY = e.touches[0].clientY;
    li._touchStartX = e.touches[0].clientX;
   }, {passive: true});


    li.addEventListener('touchemove', (e) => {
      e.preventDefault(); // stop scroll während drag
    
    const touch = e.touches[0];
    const taskList = document.getElementById('task_list');
    const afterDragElement = getDragAfterElement(taskList, touch.clientY);

    if (afterDragElement === null) {
      taskList.appendChild(li);
    } else {
      taskList.insertBefore(li, afterEl);
    }
    }, {passive: false}); // false weil preventDefault brauchen

    li.addEventListener('touchend', () => {
      li.classList.remove('dragging');
      saveTaskLocalStorage();
    });
};




    const initDragAndDrop = () => {
        const taskList = document.getElementById('task_list');

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

};
    

const getDragAfterElement = (list, mouseY) => {
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
  