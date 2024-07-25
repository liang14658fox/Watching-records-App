<template>
    <div>
        <div class="MovieCard1" v-for="(item, index) in list" :key="index">
            <div style="display: flex;margin-bottom: 5px;">
                <div class="father key box" :id="'myId' + index" @click="getXYZ(index, item)">
                    <!-- <div class="zoomImage" style="background-image:url(../../assets/宽.png)">
                        </div> -->
                    <div class="zoomImage" :style="bgImg"></div>
                    <!-- <img src="../../assets/宽.png" width="150px" /> -->
                    <span class="info">
                        信息
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const url2 = require("../../../assets/宽.png");
const url1 = require("../../../assets/高.png");
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
                    EnglishName: '', // 英文名
                    type: '剧情/科幻/爱情/动画/动漫/恐怖/记录/悬疑/警匪/第一人称',
                    imgUrl: "url(" + url1 + ")", // 海报 封面 
                    s: '电影平均评分',
                    q: '主演',
                    q1: '其他演员',
                    w: '上映日期',
                    e: '发行方',
                    r: '导演',
                    t: '编剧',
                    y: '全球总票房',
                    u: '是否引进国内',
                    i: '产地',
                    id: '电影唯一标识符ID',
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