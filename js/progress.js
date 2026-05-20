// progressBar and IMG

// prüft wieviel afugaben in list und dynamsiche foto und container
const toggleEmptyState = () => { 
    const taskList = document.getElementById('task_list');
    const emptyIMAGE =  document.querySelector('.empty_img');
    const todosContainer = document.querySelector('.todos-container');


    emptyIMAGE.style.display = taskList.children.length === 0 ? 'block' : 'none';
    todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
};


// ProgressBar 
const updateProgress = (checkCompletion = true) => 
{
    const taskList = document.getElementById('task_list');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');


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
};