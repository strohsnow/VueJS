<template>
    <div class="todo-app">
        <h1>ToDo List</h1>

        <input v-model="newTask" @keyup.enter="addTask" placeholder="Новая задача..." />
        <button @click="addTask">Добавить</button>

        <ul>
            <TodoItem
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @toggle-completed="toggleCompleted"
                @delete-task="askDeleteTask"
            />
        </ul>

        <Popup :show="popupVisible" @confirm="confirmDelete" @cancel="popupVisible = false">
            <p>Вы уверены, что хотите удалить задачу?</p>
        </Popup>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import TodoItem from "../components/TodoItem.vue";
import Popup from "../components/Popup.vue";

const newTask = ref("");
const tasks = ref([]);
const popupVisible = ref(false);
const taskToDelete = ref(null);

const fetchTasks = async () => {
    const local = localStorage.getItem("tasks");
    if (local) {
        tasks.value = JSON.parse(local);
    } else {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5");
        tasks.value = response.data.map((t) => ({ id: t.id, title: t.title, completed: t.completed }));
        localStorage.setItem("tasks", JSON.stringify(tasks.value));
    }
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const addTask = async () => {
    if (!newTask.value.trim()) return;
    const taskData = {
        title: newTask.value,
        completed: false,
        userId: 1,
    };
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos", taskData);
    tasks.value.push({ id: response.data.id, title: newTask.value, completed: false });
    newTask.value = "";
};

const toggleCompleted = async (task) => {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        completed: !task.completed,
    });
    task.completed = !task.completed;
};

const askDeleteTask = (id) => {
    taskToDelete.value = id;
    popupVisible.value = true;
};

const confirmDelete = async () => {
    const id = taskToDelete.value;
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    tasks.value = tasks.value.filter((t) => t.id !== id);
    popupVisible.value = false;
    taskToDelete.value = null;
};

onMounted(fetchTasks);
watch(tasks, saveTasks, { deep: true });
</script>

<style scoped>
.todo-app {
    padding: 20px;
}
input {
    padding: 8px;
    width: 250px;
}
button {
    padding: 8px;
    margin-left: 8px;
}
ul {
    list-style: none;
    padding: 0;
}
</style>
