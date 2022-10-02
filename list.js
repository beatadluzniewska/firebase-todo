import { getDocs } from 'firebase/firestore';
// import { initAddForm } from './add.js';
import { handleDeleteButtons } from './delete.js';
import { handleDoneButtons } from './done.js';

export const initList = (db, tasksCollection) => {
  const tasksList = document.getElementById('tasksList');

  if (tasksList) {
    //jezeli znajdzie to dopiero renderujw
    getDocs(tasksCollection).then((snapshot) => {
      const documentsData = snapshot.docs;
      renderTasksList(documentsData);

      //zad 1/2. Stwórz nowy moduł (plik) delete.js + done.js
      //Wyodrebnij funkcjonalnosc do osobnej funkcji
      //Umieść nową funkcje w module delete.js

      handleDeleteButtons(db);
      handleDoneButtons(db);
    });
  }

  // initAddForm(tasksCollection);
};

const renderTasksList = (documentsData) => {
  // const tasksList = document.getElementById('tasksList');
  documentsData.forEach((doc) => {
    const task = doc.data();
    const taskId = doc.id;

    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );

    if (task.done) {
      li.classList.add('task-done');
    }

    const formattedDeadline = task.deadline.toDate().toLocaleDateString();

    const doneButton = `<button data-done="${taskId}" class="btn btn-primary btn-done">${
      task.done ? 'Undone' : 'Done'
    }</button>`;

    const deleteButton = `<button data-delete="${taskId}" class="btn btn-warning btn-delete">Delete</button>`;

    li.innerHTML = `<span><strong>${task.name}</strong> (${formattedDeadline})</span> <span class="btn-group">${doneButton}${deleteButton}</span>`;

    tasksList.appendChild(li);
  });
};
