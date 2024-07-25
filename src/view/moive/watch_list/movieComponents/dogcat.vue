<template>
    <div>
        <iframe :src="src" frameborder="0" style="height: 100%;width: 100%;"></iframe>
        123
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    created() {

    },
    mounted() {
        this.showSessionId = window.location.search;
        this.src = '../../../../assets/html/index.html' + this.showSessionId;
    },
    data() {
        return {
            showSessionId: '',
            src: '',
        }
    },
    methods: {

    },
}
</script>

<style scoped></style>