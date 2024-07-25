<template>
    <div>

    </div>
</template>

<script>
const url2 = require("../../../../assets/宽.png");
const url1 = require("../../../../assets/高.png");
export default {
    components: {

    },
    props: {

    },
    created() {

    },
    data() {
        return {
            movieList: [
                {
                    name: '孤注一掷',
                    eName: '',
                    imgUrl: "url(" + url1 + ")",
                }, {
                    name: '奥本海默',
                    eName: '',
                    imgUrl: "url(" + url2 + ")",
                }, {
                    name: '敢死队',
                    eName: '',
                    imgUrl: "url(" + url2 + ")",
                }, {
                    name: '与玛格丽特的下午',
                    eName: '',
                    imgUrl: "url(" + url2 + ")",
                }, {
                    name: '心灵捕手',
                    eName: '',
                    imgUrl: "url(" + url2 + ")",
                }
            ]
        }
    },
    methods: {

    },
}
</script>

<style scoped></style>