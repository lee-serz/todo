document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".todo__input");
  let input = document.querySelector(".todo__task");
  let taskBox = document.querySelector(".todo__output");

  // Загрузка задач из localStorage при загрузке страницы
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Функция для отображения задач в интерфейсе
  function renderTasks() {
    taskBox.innerHTML = "";
    tasks.forEach(function (task) {
      let taskElement = document.createElement("div");
      taskElement.classList.add("todo__item");

      // Создание чекбокса
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      // Добавление обработчика события для обновления состояния задачи
      checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        // Сохранение данных в localStorage при изменении состояния чекбокса
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });

      taskElement.appendChild(checkbox);

      // Добавление текста задачи
      let taskText = document.createElement("span");
      taskText.textContent = task.value;
      taskElement.appendChild(taskText);

      taskBox.appendChild(taskElement);
    });
  }

  // Отображение задач при загрузке страницы
  renderTasks();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskValue = input.value;

    let task = {
      value: taskValue,
      completed: false,
    };

    tasks.push(task);

    // Обновление интерфейса
    renderTasks();

    // Сохранение данных в localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Очистка поля ввода
    input.value = "";
  });
});
