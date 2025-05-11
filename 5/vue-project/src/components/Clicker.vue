<template>
    <div style="border: 1px solid gray; padding: 10px; margin: 5px; text-align: center">
        <div>Points: {{ points }}</div>
        <div @click="handleClick">
            <slot>
                <button>Click</button>
                <!-- fallback -->
            </slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    amount: {
        type: Number,
        default: 1,
    },
});

const emit = defineEmits(["button-clicked"]);

const points = ref(0);

function handleClick() {
    points.value += props.amount;
    emit("button-clicked");
}
</script>
