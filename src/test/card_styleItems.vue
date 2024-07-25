<template>
    <div>
        <div class="container">
            <div class="card">
                <div style="" class="topBox">
                    123
                </div>
                <div style="" class="bottomBox">
                    123
                </div>
            </div>
            <div class="card">
                <div style="" class="topBox">
                    123
                </div>
                <div style="" class="bottomBox">
                    123
                </div>
            </div>
        </div>
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
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style scoped>
.container {
    height: auto;
    width: 500px;
    margin: auto;
    background: linear-gradient(to bottom right, #50EAE6, #6F8FEE);
    padding: 10px 0 0 10px;
}

.card {

    height: 200px;
    width: 150px;
    border-radius: 10px;
    margin: 0 10px 10px 0;
}

.card .topBox {
    border-radius: 10px 10px 0 0;
    background: linear-gradient(to bottom right, #B8F1F7, #BCDFF7);
    height: 70%;
    width: 100%;
}

.card .bottomBox {
    border-radius: 0px 0px 10px 10px;
    background: linear-gradient(to bottom right, #D3E5F8, #D0DDF6);
    height: 30%;
    width: 100%;
}
</style>