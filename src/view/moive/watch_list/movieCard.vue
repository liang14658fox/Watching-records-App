<template>
    <!-- 观影次数Viewing Count
    个人评分Personal Rating
    首次观影First Viewing
    最后观影Last Viewing
    最后观影距今Time Since Last Viewing
    收藏 collect -->
    <div>
        <div id="mask" class="fade" v-if="myStyle.show" @click="close()">
            <div class="mask_img NewDetails" v-show="myStyle.show" :style="myStyle" @click="_stopPropagation($event)">
                <div style="position: relative;">
                    <div class="father" style="width: 100%;">
                        <div class="zoomImage" :style="bgImg" style="padding-bottom: 56.25%;"></div>
                    </div>
                    <i class="el-icon-close"
                        style="position: absolute;top: 10px;right: 10px;color: white; cursor: pointer; "
                        @click="close()"></i>
                </div>
                <div>
                    {{ myStyle.inner.name }}
                </div>
                <div>
                    details
                </div>
            </div>
        </div>
        <div style="background-color: antiquewhite;border: 1px solid #cccccc;padding: 5px;">
            <div style="display: flex;">
                阅片量：{{ list.length }}
                <span style="margin-left: auto;">
                    <el-switch v-model="value" active-text="卡片" inactive-text="日历">
                    </el-switch>
                    <el-switch v-model="changer" active-text="编辑模式" inactive-text="只读">
                    </el-switch>
                </span>
            </div>
        </div>
        <movieDate v-if="!value"></movieDate>
        <div style="display: flex;" v-if="value">
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
                    <div>
                        <div style="margin-bottom: 5px;display: flex;">
                            <i @click="activeSetting(index, 'active')" v-show="!item.setting" class="el-icon-s-tools"
                                style="margin-left: auto;margin-right: 5px;cursor: pointer; "></i>
                            <i @click="activeSetting(index, 'shutdown')" v-show="item.setting" class="el-icon-setting"
                                style="margin-right: 5px;margin-left: auto;cursor: pointer; "></i>
                        </div>
                        <div style="font-size: 12px;margin: 5px;margin-bottom: 0;">
                            Viewing Count
                        </div>
                        <div style="display: flex;width:95px;flex-wrap: wrap;">
                            <div v-for="(item_2, index_2) in item.total.slice(0, 7)" :key="index_2"
                                style="margin-top: 5px;">
                                <el-popover placement="bottom" width="200" trigger="click">
                                    <div class="save" slot="reference">
                                        {{ index_2 + 1 }}
                                    </div>
                                    <div>
                                        日期：{{ item_2.time }}
                                    </div>
                                    <div>
                                        地址：{{ item_2.address }}
                                    </div>
                                    <div style="margin-top: 5px;">
                                        <el-popover v-for="(item_3, index_3) in item_2.accompany" :key="index_3"
                                            placement="top-start" :title="item_3" width="200" trigger="hover">
                                            <el-avatar slot="reference" shape="square" size="small"
                                                style="margin-right: 8px;"
                                                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
                                            </el-avatar>
                                            <div>
                                                {{ item_3 }}
                                            </div>
                                        </el-popover>
                                    </div>
                                </el-popover>
                            </div>
                            <div v-if="item.total.length > 7">
                                <div class="save" style="margin-top: 5px;">
                                    ...
                                </div>
                            </div>
                            <div v-if="item.total.length > 7">
                                <div class="save" style="margin-top: 5px;">
                                    {{ item.total.length - 1 }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="font-size: 12px;">
                    <div style="font-weight: 700;font-size: 14px;">
                        {{ item.name }}
                    </div>
                    <div style="margin-bottom: 10px;">
                        Kongfu Panda 2
                    </div>
                    <div style="height: ;margin-bottom: 8px;">
                        <div class="information">
                            <span>
                                Time Since Last Viewing:
                            </span>
                            <span class="number">
                                {{ contDays(item.total[item.total.length - 1].time) }}
                            </span>
                        </div>
                    </div>
                    <div style="margin-bottom: 5px;">
                        <i class="el-icon-s-opportunity"></i>
                        Detail mining degree
                    </div>
                    <div style="margin-bottom: 8px;">
                        <el-progress :percentage="countPercentage(item.total.length + 1)"
                            :color="customColor"></el-progress>
                    </div>
                    <div style="display: flex;">
                        <div style="margin-right: 13px;">
                            <div style="font-weight: 600;">
                                {{ item.total[0].time || '-' }}
                            </div>
                            <div>
                                {{ !(item.total.length > 1) ? 'View Date' : 'First View' }}
                            </div>
                        </div>
                        <div v-show="item.total.length > 1" style="margin-right: 13px;">
                            <div style="font-weight: 600;">
                                {{ item.total[item.total.length - 1].time || '-' }}
                            </div>
                            <div>
                                Last View
                            </div>
                        </div>
                        <div style="margin-left: auto;margin-right: 10px;">
                            <div style="font-weight: 600;">
                                {{ item.collect }}
                            </div>
                            <div>
                                Collect
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

const url = require("../../assets/宽.png");
import movieDate from './moive/movieDate.vue'
export default {
    components: {
        movieDate
    },
    props: {

    },
    created() {
        for (let i = 0; i < this.list.length; i++) { // 对观影记录根据日期进行排序
            for (let x = 0; x < this.list[i].total.length; x++) {
                this.list[i].total.sort((a, b) => a.time.localeCompare(b.time) || a.time.localeCompare(b.time));
            }
        }
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].setting = false
        }
    },
    data() {
        return {

            volumeNum: 1,
            originPosztion: {},
            myStyle: {
                show: false,
                position: "absolute",
                left: 100 + 'px',
                top: 100 + 'px',
                width: 100 + 'px',
                height: 100 + 'px',
                transform: 'none',
                inner: {}, // 内容
            },
            bgImg: { // vue2 Bug，图片不显示
                backgroundImage: "url(" + url + ")"
            },
            // 进度条控制
            percentage: 20,
            customColor: '#409eff',
            value: true,// 控制显示日历/卡片
            changer: false,
            list: [
                {
                    name: '孤注一掷',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                        },
                    ],
                },
                {
                    name: '奥本海默',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-31',
                            address: '青岛万象城IMAX',
                            accompany: ['璨璨'],
                        },
                    ],
                },
                {
                    name: '敢死队',
                    persionScore: 4.6,
                    collect: '1080p',
                    total: [
                        {
                            time: '2000-01-01',
                            address: '',
                            accompany: [],
                        },
                        {
                            time: '2023-09-18',
                            address: '',
                            accompany: ['璨璨'],
                        },
                    ],
                },
                {
                    name: '与玛格丽特的下午',
                    persionScore: 4.5,
                    collect: '4K',
                    total: [
                        {
                            time: '2023-10-08',
                            address: '家',
                            accompany: ['璨璨'],
                        },
                    ],
                },
                {
                    name: '测试用例',
                    persionScore: 9,
                    collect: '实体铁盒',
                    total: [
                        {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        },
                        {
                            time: '2010-01-01',
                            address: '苍山公园',
                            accompany: ['测试1'],
                        },
                        {
                            time: '2013-01-01',
                            address: '苍山公园',
                            accompany: [],
                        },
                        {
                            time: '2000-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2018-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2016-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2014-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2019-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2012-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2015-01-01',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2015-01-08',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        },
                        {
                            time: '2015-01-05',
                            address: '苍山公园',
                            accompany: ['测试1', '测试2', '测试3', '测试4'],
                        }
                    ],
                },
            ]
        }
    },
    methods: {
        _stopPropagation(ev) {
            var _this = this;
            ev.stopPropagation();
        },
        close: async function () {
            await this.move_to_origin_close()
        },
        getXYZ: async function (index, item) {
            this.myStyle.inner = item // 赋值
            let node = document.getElementById("myId" + index) // 得到节点
            let xy = node.getBoundingClientRect() // 得到节点坐标
            this.myStyle.left = xy.x + 'px'
            this.myStyle.top = xy.y + 'px'
            this.originPosztion = { // 用于关闭返回动画
                left: xy.x + 'px',
                top: xy.y + 'px'
            }
            await this.move_to_final()
        },
        move_to_final: async function () {
            this.myStyle.show = true
            setTimeout(() => { // 1s后执行
                this.myStyle.left = '50%'
                this.myStyle.top = '50%'
                this.myStyle.height = '530px'
                this.myStyle.width = '400px'
                this.myStyle.transform = 'translate(-50%, -50%)'
            }, 0)
        },
        move_to_origin_close: async function () {
            this.myStyle.left = this.originPosztion.left
            this.myStyle.top = this.originPosztion.top
            this.myStyle.height = '186px'
            this.myStyle.width = '140px'
            this.myStyle.transform = 'none'
            setTimeout(() => { // 0.5s后执行（等待卡片返回原来位置后执行）
                this.myStyle.show = false
            }, 500)
        },
        activeSetting(index, target) {
            var arr = this.list
            if (target == 'active') {
                arr[index].setting = true
            } else {
                arr[index].setting = false
            }
            Vue.set(this.list, index, arr[index]) // vue无法监听并刷新，需要引入vue的set方法配合
        },
        beOneWithYouRi() {
            console.log(
                '%c打印➜:', 'background:green;color:#fff;padding:4px;', this.intoDayDraw())
            this.intoDayDraw()
            let dayDrawArr = []
            let origin = this.intoDayDraw()
            // 将所有日期相同的对象，提取这个日期作为键名，将这些相同日期的对象push进一个数组作为键值
            for (let i = 0; i < origin.length; i++) {

            }
        },
        intoDayDraw() { // 渲染到日历算法
            function objArrDeepCopy(obj) {
                var newobj = obj.constructor === Array ? [] : {};
                if (typeof obj !== 'object') {
                    return;
                }
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ? objArrDeepCopy(obj[i]) : obj[i];
                }
                return newobj
            }

            let emptyArr = []
            for (let i = 0; i < this.list.length; i++) {
                // 深拷贝
                var copyedArray = objArrDeepCopy(this.list[i].total)
                // 根据时间排序
                for (let x = 0; x < copyedArray.length; x++) {
                    copyedArray.sort((a, b) => a.time.localeCompare(b.time) || a.time.localeCompare(b.time));
                }
                for (let k = 0; k < copyedArray.length; k++) {
                    emptyArr.push({
                        count: k + 1,
                        time: copyedArray[k].time,
                        name: this.list[i].name,
                        persionScore: this.list[i].persionScore,
                        collect: this.list[i].collect,
                    })
                }
            }
            return emptyArr
        },
        countPercentage(length) {
            // Good 😄
            let rainbowColor = n => {
                let obj = {
                    1: 50,
                    2: 70,
                    3: 80,
                    4: 90,
                    5: 95,
                    6: 96,
                    7: 97,
                    8: 98,
                    9: 99,
                    10: 100
                }
                return obj[n] ? obj[n] : 100
            }
            return rainbowColor(length)
        },
        customColorMethod(percentage) { // 进度条颜色控制
            if (percentage < 30) {
                return '#909399';
            } else if (percentage < 70) {
                return '#e6a23c';
            } else {
                return '#67c23a';
            }
        },
        getToday() {
            let date = new Date(),
                year = date.getFullYear(), // 获取完整的年份(4位)
                month = date.getMonth() + 1, // 获取当前月份(0-11,0代表1月)
                strDate = date.getDate() // 获取当前日(1-31)
            if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
            if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
            let thisDay = `${year}-${month}-${strDate}`
            return thisDay
        },
        contDays(lastWatchDay) {
            /**
            * 计算两个日期之间的天数
            *  date1  开始日期 yyyy-MM-dd
            *  date2  结束日期 yyyy-MM-dd
            *  如果日期相同 返回一天 开始日期大于结束日期，返回0
            */
            function getDaysBetween(date1, date2) { // 计算两个日期之间的天数
                var startDate = Date.parse(date1);
                var endDate = Date.parse(date2);
                if (startDate > endDate) {
                    return 0;
                }
                if (startDate == endDate) {
                    return 1;
                }
                var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
                return days;
            }
            function getFormatedStringFromDays(numberOfDays) { // 将天数转换为X年X月X日
                var years = Math.floor(numberOfDays / 365);
                var months = Math.floor(numberOfDays % 365 / 30);
                var days = Math.floor(numberOfDays % 365 % 30);
                // return [years, months, days].join(':');
                if (years) {
                    return years + '年' + months + '月' + days + '天'
                } else if (months) {
                    return months + '月' + days + '天'
                } else {
                    return days + '天'
                }
            }
            return getFormatedStringFromDays(getDaysBetween(lastWatchDay, this.getToday()))
        }
    },
}
</script>

<style scoped>
.save {
    transition: 0.2s ease-in-out;
    border-radius: 8px;
    /* margin: 20px; */
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px double #cccccc;
    margin: 0 5px 5px 0;
}

.save:hover {
    transform: scale(1.1) rotate(10deg);
    cursor: pointer;
}

.save:hover .svg {
    fill: #ced8de;
}

.number {
    color: rgb(0, 34, 255);
}

.information {}

.movieCard {
    background-color: aliceblue;
    border: 1px solid #cccccc;
    width: 300px;
    height: 400px;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
}

.zoomImage {
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    width: 100%;
    height: 0;
    padding-bottom: 133.33%;
    border: 1px solid #cccccc;
}

.father {
    width: 150px;
    margin-right: 8px;
}

.key:hover {
    /* filter: blur(2px); */
    cursor: pointer;
}

.MovieCard1 {
    width: 250px;
    margin: 20px;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 7px;
    padding-right: 0px;
}

/* 卡片位移元素共享 */


.NewDetails {
    background-color: skyblue;
    transition: all 0.5s ease-in-out;
    /* 贝塞尔曲线 */
}


#mask {
    /* 遮罩层 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background: rgba(0, 0, 0, 0.3); */
    z-index: 998;
}


.fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 0.5s;
    animation-name: fade;
    animation-duration: 0.5s;
}

@-webkit-keyframes fade {
    from {
        opacity: .4
    }

    to {
        opacity: 1
    }
}

@keyframes fade {
    from {
        opacity: .4
    }

    to {
        opacity: 1
    }
}

.mask_img {
    z-index: 999;
}

/* 图片悬停模糊 */
.box {
    position: relative;
    float: left;
    margin-right: 10px;
    overflow: hidden;
}

.box div {
    transition: all .5s;
}

.box:hover div {
    transform: scale(1.1);
}

/* 遮罩 */
.box::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, .5));
    opacity: 0;
}

.box:hover::after {
    opacity: 1;
}

.info {
    position: absolute;
    width: 100%;
    height: auto;
    bottom: -50px;
    /* padding: 25px 30px; */
    z-index: 999;
    font-size: 18px;
    color: #fff;
    transition: all .5s;

}

.box:hover .info {
    transform: translateY(-50px);
}

</style>