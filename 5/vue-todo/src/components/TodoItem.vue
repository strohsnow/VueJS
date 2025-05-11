<template>
    <li>
        <label>
            <input type="checkbox" :checked="task.completed" @change="$emit('toggle-completed', task)" />
            <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
                {{ task.title }}
            </span>
        </label>
        <button @click="$emit('delete-task', task.id)">Удалить</button>
    </li>
</template>

<script setup>
defineProps(["task"]);
defineEmits(["toggle-completed", "delete-task"]);
</script>

<style scoped>
li {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}
button {
    margin-left: auto;
}
</style>
