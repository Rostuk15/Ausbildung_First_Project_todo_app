
//drag and drop function Computer und Handy


let dragSrcEl = null; // das element welche wir ziehen

const enableDragAndDrop = (li) => {

    // Für Computer
    li.addEventListener('dragstart', () => {
        dragSrcEl = li;
        li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
        saveTaskLocalStorage();
    });


    // Für Handy
    li.addEventListener('touchstart', (e) => {
        dragSrcEl = li;
        li.classList.add('draggingPhone');
    }, { passive: true });


    li.addEventListener('touchmove', (e) => {
        e.preventDefault(); // stop scroll während drag

        // finden element unter finger
        const touch = e.touches[0];
   
        dragSrcEl.style.display = 'none'; // ховаємо елемент що тягнемо щоб знайти що під ним -- verstecken ziehende element dass was unter finden     // НАВІЩО? бо якщо він видимий — він сам буде // "під пальцем" і ми не побачимо що за ним
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY); // elementFromPoint — fragt browser: welche element sit in koordinate X, Y- browser schaut auf Display und gibt zurück elemnt unter finger
        dragSrcEl.style.display = ''; // zurückgeben das Element 

        // when unter finger ist li - transportieren
        if (elementBelow) {
            const targetLi = elementBelow.closest('li'); // closest('li') - geht oben in DOM und sucht in der hähe li -- sucht genau li element 
            const taskList = document.getElementById('task_list');
            if (targetLi && targetLi !== dragSrcEl) {  // tagetLi das ist nicht desellber li dass wir ziehen
                const allLi = [...taskList.querySelectorAll('li')]; // massiv Li
                const dragIndex = allLi.indexOf(dragSrcEl); // finden die zihende position 
                const targetIndex = allLi.indexOf(targetLi); // finden die untere finger position 

                if (dragIndex < targetIndex) {
                    taskList.insertBefore(dragSrcEl, targetLi.nextSibling); // unter ziehen stellen nach targetLi -- .nextSibling nächste elemnt nach targetli 
                } else {
                    taskList.insertBefore(dragSrcEl, targetLi); // oben ziehen -> stellen vor targetLi
                }
            }
        }
    }, { passive: false }); // false weil preventDefault brauchen


    li.addEventListener('touchend', () => {
        dragSrcEl.classList.remove('draggingPhone');
        saveTaskLocalStorage();
    });
};


const initDragAndDrop = () => {
    const taskList = document.getElementById('task_list');

    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingEl = document.querySelector('.dragging');
        if (!draggingEl) return;

        const afterEl = getDragAfterElement(taskList, e.clientY);

        if (afterEl === null) {
            taskList.appendChild(draggingEl);
        } else {
            taskList.insertBefore(draggingEl, afterEl);
        }
    });
};


const getDragAfterElement = (list, mouseY) => {
    const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};