<template>
    <teleport to="body">
        <div class="popup-overlay" v-if="show">
            <div class="popup-content">
                <slot />
                <div class="actions">
                    <button @click="confirm">Подтвердить</button>
                    <button @click="cancel">Отмена</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({ show: Boolean });
const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
}
.actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>
