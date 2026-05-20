// add-edit-delete (AED)

    const addTask = (text, completed = false, checkCompletion = true) => {
            const taskInput = document.getElementById('task_input');

        const taskText = text || taskInput.value.trim()
        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
        const taskList = document.getElementById('task_list');
      
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