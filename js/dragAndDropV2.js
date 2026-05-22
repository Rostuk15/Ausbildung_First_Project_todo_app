// ============================================
// dragAndDrop.js — drag and drop для ПК і телефону
// ============================================

let dragSrcEl = null; // який елемент тягнемо

const enableDragAndDrop = (li) => {

    // ======= ПК =======
    li.addEventListener('dragstart', () => {
        dragSrcEl = li;
        li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
        saveTaskLocalStorage();
    });


    // ======= ТЕЛЕФОН =======
    li.addEventListener('touchstart', (e) => {
        dragSrcEl = li;
        li.classList.add('dragging');
    }, { passive: true });


    li.addEventListener('touchmove', (e) => {
        e.preventDefault();

        // знаходимо елемент під пальцем
        const touch = e.touches[0];

        // ховаємо елемент що тягнемо щоб знайти що під ним
        dragSrcEl.style.display = 'none';
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        dragSrcEl.style.display = '';

        // якщо під пальцем є li — переставляємо
        if (elementBelow) {
            const targetLi = elementBelow.closest('li');
            const taskList = document.getElementById('task_list');

            if (targetLi && targetLi !== dragSrcEl) {
                const allLi = [...taskList.querySelectorAll('li')];
                const dragIndex = allLi.indexOf(dragSrcEl);
                const targetIndex = allLi.indexOf(targetLi);

                if (dragIndex < targetIndex) {
                    taskList.insertBefore(dragSrcEl, targetLi.nextSibling);
                } else {
                    taskList.insertBefore(dragSrcEl, targetLi);
                }
            }
        }
    }, { passive: false });


    li.addEventListener('touchend', () => {
        dragSrcEl.classList.remove('dragging');
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