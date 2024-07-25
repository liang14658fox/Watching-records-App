<template>
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
        <div class="flex_container">
            <div v-for="(item, index) in list" :key="index">
                <div style="display: flex;margin-bottom: 5px;">
                    <div class="father box" style="width: 60%;cursor: pointer;" :id="'myId' + index" @click="getXYZ(index, item)">
                        <div class="zoomImage" :style="bgImg">

                        </div>
                        <span class="info">
                            123
                        </span>
                    </div>
                    <div style="border: 1px solid #cccccc;box-sizing: border-box;width: 40%;">
                        <div style="margin-bottom: 5px;display: flex;">
                            <i @click="activeSetting(index, 'active')" v-show="!item.setting" class="el-icon-s-tools"
                                style="margin-left: auto;margin-right: 5px;cursor: pointer; "></i>
                            <i @click="activeSetting(index, 'shutdown')" v-show="item.setting" class="el-icon-setting"
                                style="margin-right: 5px;margin-left: auto;cursor: pointer; "></i>
                        </div>
                        <div style="font-size: 12px;margin: 5px;margin-bottom: 0;">
                            Viewing Count
                        </div>
                        <div style="display: flex;flex-wrap: wrap;">
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
                        <!-- <el-progress :percentage="countPercentage(item.total.length + 1)"
                            :color="customColor"></el-progress> -->
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
            <!-- 添加空元素，防止最后一行元素拉伸 -->
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
        </div>
    </div>
</template>

<script>
import accompany from './movieComponents/accompany.vue'
import movieDetail from './movieComponents/movieDetail.vue'

import Vue from 'vue'
const url = require("../../../../assets/宽.png");
export default {
    components: {
        accompany,
        movieDetail,
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
            originPosztion: {}, // 用于定位
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
                    ],
                }, {
                    name: '测试用例',
                    persionScore: 9,
                    collect: '实体铁盒',
                    total: [
                        {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        },
                    ],
                }, {
                    name: '测试用例',
                    persionScore: 9,
                    collect: '实体铁盒',
                    total: [
                        {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        },
                    ],
                }, {
                    name: '测试用例',
                    persionScore: 9,
                    collect: '实体铁盒',
                    total: [
                        {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        }, {
                            time: '2023-01-01',
                            address: '青岛万象城',
                            accompany: ['测试1', '测试2'],
                        },
                    ],
                },
            ]
        }
    },
    methods: {
        activeSetting(index, target) {
            var arr = this.list
            if (target == 'active') {
                arr[index].setting = true
            } else {
                arr[index].setting = false
            }
            Vue.set(this.list, index, arr[index]) // vue无法监听并刷新，需要引入vue的set方法配合
        },
        _stopPropagation(ev) {
            var _this = this;
            ev.stopPropagation();
        },
        close: async function () {
            // 优化：关闭dialog之前，如果浏览器视图发生了变化，那么返回的地方的坐标需要重新定位
            let node = document.getElementById("myId" + this.originPosztion.index) // 得到节点
            let xy = node.getBoundingClientRect() // 得到节点坐标
            this.originPosztion = { // 用于关闭返回动画
                left: xy.x + 'px',
                top: xy.y + 'px'
            }
            await this.move_to_origin_close()
        },
        getXYZ: async function (index, item) {
            this.myStyle.inner = item // 赋值
            let node = document.getElementById("myId" + index) // 得到节点
            let xy = node.getBoundingClientRect() // 得到节点坐标
            this.myStyle.left = xy.x + 'px'
            this.myStyle.top = xy.y + 'px'
            this.originPosztion = { // 用于关闭返回动画
                index:index,
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

.flex_container {
    display: flex;
    background-color: #f1f1f1;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}

.flex_container>div {
    margin: 4px;
    border: 1px solid black;
    box-sizing: border-box;
    padding-right: 0px;
    flex: 1;
    min-width: 240px;
    padding: 7px;
}

.empty_card {
    height: 0;
    margin-top: 0;
    /* 宽度和高度都设置为0，不占用空间 */
    margin-right: 18px;
    /* 不可以忘记margin，否则有可能对不齐 */
    border-style: none !important;
}
</style>