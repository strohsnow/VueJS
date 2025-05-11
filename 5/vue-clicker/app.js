new Vue({
    el: "#app",
    data: {
        score: 0,
    },
    methods: {
        increment() {
            this.score += 1;
        },
    },
});
