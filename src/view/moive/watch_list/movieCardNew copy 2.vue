<template>
    <div>
        <div class="flex_container">
            <div v-for="(item, index) in list" :key="index" class="testBorder movie_card">
                <div class="testBorder" style="display: flex;">
                    <div class="testBorder" style="width: 60%;">
                        电影海报
                    </div>
                    <div class="testBorder" style="width: 40%;">
                        <div>
                            观看记录
                        </div>
                        <div v-for="(item_2, index_2) in item.total" :key="index_2" class="save">
                            {{ index }}
                        </div>
                    </div>
                </div>
                <div class="testBorder">
                    <div class="testBorder">
                        details
                    </div>
                    <div style="display: flex;">
                        <div class="testBorder">
                            1
                        </div>
                        <div class="testBorder">
                            2
                        </div>
                        <div class="testBorder">
                            3
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
export default {
    components: {

    },
    props: {

    },
    created() {

    },
    data() {
        return {
            list: [
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
                    movie: '',
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
                        },
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

    },
}
</script>

<style scoped>
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
    height: 300px;
}

.testBorder {
    border: 1px solid #cccccc;
    margin: 5px;
}

.flex_container {
    display: flex;
    background-color: #f1f1f1;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}

.flex_container>div {
    margin: 10px;
    flex: 1;
    min-width: 200px;
}

.empty_card {
    height: 0;
    margin-top: 0;
    /* 宽度和高度都设置为0，不占用空间 */
    margin-right: 18px;
    /* 不可以忘记margin，否则有可能对不齐 */
}
</style>