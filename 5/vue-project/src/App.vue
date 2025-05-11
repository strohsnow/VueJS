<template>
    <h1>100 Кликеров</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 10px">
        <Clicker v-for="n in 100" :key="n" :amount="1" @button-clicked="() => handleClick(n)">
            <button style="background-color: lightblue">Кликер {{ n }}</button>
        </Clicker>
    </div>
</template>

<script setup>
import Clicker from "./components/Clicker.vue";

function handleClick(n) {
    alert(`Clicker ${n} clicked!`);
}
</script>
