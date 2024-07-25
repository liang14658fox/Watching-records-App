<template>
    <div>
        <div class="flex_container">
            <div v-for="(item, index) in list" :key="index" class="testBorder movie_card">
                <div class="testBorder" style="display: flex;">
                    <div class="father box testBorder" style="cursor: pointer;" :id="'myId' + index"
                        @click="getXYZ(index, item)">
                        <div class="zoomImage" :style="bgImg">

                        </div>
                        <span class="info">
                            {{ getDetail(item.movie).EnglishName }}
                        </span>
                    </div>
                    <div class="testBorder">
                        <div style="display: flex;">
                            <div>
                                Record
                            </div>
                            <i @click="activeSetting(index, 'active')" v-show="!item.setting" class="el-icon-s-tools"
                                style="margin-left: auto;margin-right: 5px;cursor: pointer;color: skyblue;margin-left: auto;"></i>
                            <i @click="activeSetting(index, 'shutdown')" v-show="item.setting" class="el-icon-setting"
                                style="margin-right: 5px;margin-left: auto;cursor: pointer;margin-left: auto"></i>
                        </div>
                        <div style="display: flex;flex-direction: row;flex-wrap: wrap;width: 95px;margin-right: -6px;">
                            <div v-for="(item_2, index_2) in item.total.slice(0, 7)" :key="index_2">
                                <el-popover placement="bottom" width="200" trigger="click">
                                    <accompanyAdd :setting="item.setting" :add="false" :watch_Number_Details="item_2">
                                    </accompanyAdd>
                                    <div slot="reference" class="save" style="position: relative;">
                                        {{ index_2 + 1 }}
                                        <el-popconfirm v-if="item.setting" confirm-button-text='好的' cancel-button-text='不用了'
                                            icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？">
                                            <i slot="reference"
                                                style="position: absolute;top: -5px;right: -5px;color: #f56c6c;"
                                                class="el-icon-error"
                                                @click="_stopPropagation_delete($event, item_2, index_2)">
                                            </i>
                                        </el-popconfirm>
                                    </div>
                                </el-popover>
                            </div>
                            <div v-if="item.total.length > 7">
                                <div class="save" @click="watchList()">
                                    ...
                                </div>
                            </div>
                            <div v-if="item.total.length > 7">
                                <el-popover placement="bottom" width="200" trigger="click">
                                    <accompanyAdd :setting="item.setting" :add="false"
                                        :watch_Number_Details="item.total[item.total.length - 1]"></accompanyAdd>
                                    <div class="save" slot="reference">
                                        {{ item.total.length }}
                                    </div>
                                </el-popover>
                            </div>
                            <div v-if="item.setting">
                                <el-popover placement="bottom" width="200" trigger="click">
                                    <accompanyAdd :add="true" :watch_Number_Details="{}"></accompanyAdd>
                                    <div class="save" slot="reference">
                                        <i class="el-icon-plus" style="font-weight: 600;"></i>
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="testBorder">
                    <div class="testBorder">
                        details
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
import accompanyAdd from './movieComponents/accompanyAdd.vue'
import movieDetail from './movieComponents/movieDetail.vue'
import Vue from 'vue'
export default {
    components: {
        accompanyAdd,
        movieDetail,
    },
    props: {

    },
    created() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].setting = false
        }
    },
    data() {
        return {
            list: [
                {
                    movie: '孤注一掷',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        },
                    ],
                },
                {
                    movie: '奥本海默',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }, {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        },
                    ],
                },
                {
                    movie: '敢死队',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                },
                {
                    movie: '与玛格丽特的下午',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                },
                {
                    movie: '心灵捕手',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                },
                {
                    movie: '预见未来',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                },
                {
                    movie: '',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                },
                {
                    movie: '',
                    persionScore: 4.6,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 10, // 观看进度
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        _stopPropagation_delete(ev, item, index) {
            console.log(
                '%c打印➜:', 'background:green;color:#fff;padding:4px;', item, index)
            var _this = this;
            ev.stopPropagation();
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
        getDetail(name) {
            let rainbowColor = n => {
                let obj = {
                    '功夫熊猫2': {
                        name: '功夫熊猫2',
                        EnglishName: 'KongFu Panda 2',
                    },
                }
                return obj[n] ? obj[n] : {
                    name: 'Not Founded',
                    EnglishName: 'Not Founded',
                }
            }
            return rainbowColor(name)
        },
        watchList() {
            this.$message('打开观看记录listDialog')
        }
    },
}
</script>

<style scoped>
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
    width: 100%;
    margin-right: 8px;
}

.save {
    transition: 0.2s ease-in-out;
    border-radius: 8px;
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    border: 1px double #cccccc;
    margin: 0 5px 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.save:hover {
    transform: scale(1.1) rotate(10deg);
    cursor: pointer;
}

.save:hover .svg {
    fill: #ced8de;
}

.movie_card {
    /* height: 300px; */
}

.testBorder {
    border: 1px solid #cccccc;
    margin: 2px;
}

.flex_container {
    display: flex;
    background-color: #f1f1f1;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 12px;
}

.flex_container>div {
    margin: 10px;
    flex: 1;
    min-width: 223px;
}

.empty_card {
    height: 0;
    margin-top: 0;
    /* 宽度和高度都设置为0，不占用空间 */
    margin-right: 18px;
    /* 不可以忘记margin，否则有可能对不齐 */
}
</style>