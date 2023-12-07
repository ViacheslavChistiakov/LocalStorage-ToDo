const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

let tasks = [];

// 1.1 Идем в LocalStorage и получаем оттуда задачи
if (localStorage.getItem("tasks")){
   tasks = JSON.parse(localStorage.getItem("tasks"));
}

// 1.4 На основе массива tasks мы рендерим эти задачи на странице
tasks.forEach(function(item){
   renderTasks(item);

});



form.addEventListener("submit", addItem);


itemsList.addEventListener("click", removeItem);


filter.addEventListener("keyup", filterItems);

function renderTasks (TasksText){
    // Создаем элемент для новой задачи
    const  newElement = document.createElement("li");
    newElement.className = "list-group-item";

    // Добавим текст в новый элемент
    const  newTextNode = document.createTextNode(TasksText);
    newElement.appendChild(newTextNode);

    // Создаем кнопку
    const deleteBtn = document.createElement("button");
    // Добавляем текст
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // Добавляем CSS class
    deleteBtn.className = "btn btn-light btn-sm float-right";
    // Добавляем data атрибут
    deleteBtn.dataset.action = "delete";

    // Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    console.log("addItem -> newElement", newElement);

    // Добавляем новую задачу в список со всеми задачами
    itemsList.prepend(newElement);
}

function addItem(e) {
    // Отменяем отправку формы
    e.preventDefault();

    // Находим инпут с текстом для новой задачи
    const newItemInput = document.getElementById("newItemText");
    // Получаем текст из инпута
    const newItemText = newItemInput.value;

    renderTasks(newItemText);

    //Добавляем задачу в массив с задачами
    tasks.push(newItemText);
    console.log(tasks);

    // Обновляем список задач в LocalStorage
    const jsonTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonTasks);

    // Очистим поле добавления новой задачи
    newItemInput.value = "";
}
/*
1. Открываем приложение
    1.1 Идем в LocalStorage и проверяем есть ли в нем данные по ключу tasks
    1.2 Если данные есть, тогда забираем их, парсим из JSON в массив и записываем в массив tasks
    1.3 Если данных нет, тогда мы оставляем tasks с пустым массивом
    1.4 На основе массива tasks мы рендерим эти задачи на странице


2. Добавляем задачу в список дел
    2.1 Отображаем задачу в HTML разметке
    2.2 Добавляем задачу в массив с задачами
    2.3 Обновить список задач в LocalStorage

3. Удаление задачи
    3.1 Удаляем из HTML разметки
    3.2 Удаляем из массива tasks
    3.2 Обновить список задач в LocalStorage

    
*/


function removeItem(e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {
            e.target.parentNode.remove();
        }
    }
        // Удаляем из массива tasks
        // Получаем текст задачи которую надо удалить
        const taskText = e.target.closest(`.list-group-item`).firstChild.textContent;
        // Находим индекс этой задачи в массиве tasks
        const index = tasks.findIndex(function(item){
            if (taskText === item){
                return true
            }
        })
        // Удаляем задачу из массива tasks
        if (index !== -1){
            tasks.splice(index, 1)
        }
        // Обновляем LocalStorage
        localStorage.setItem(`tasks`, JSON.stringify(tasks));

        

}


function filterItems(e) {
    // Получаем фразу для поиска и переводим ее в нижний регистр
    var searchedText = e.target.value.toLowerCase();

    // 1. Получаем списко всех задач
    var items = itemsList.querySelectorAll("li");

    // 2. Перебираем циклом все найденные теги li с задачами
    items.forEach(function(item) {
        // Получаем текст задачи из списка и переводим его в нижний регистр
        var itemText = item.firstChild.textContent.toLowerCase();

        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если вхождение есть - показываем элемент с задачей
            item.style.display = "block";
        } else {
            // Если вхождения нет - скрываем элемент с задачей
            item.style.display = "none";
        }
    });
}

/*
1. Открываем задачу
2. Добавляем задачу в список дел
    2.1 Отображаем задачу в HTML разметке
    2.2 Добавляем задачу в массив с задачами
    2.3 Обновить список задач в LocalStorage
3. Удаляем задачу
*/
