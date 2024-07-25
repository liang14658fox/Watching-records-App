<template>
    <div style="background-color: #f1f1f1;padding-top: 10px;">
        <!--<div style="position: absolute;top: 100px;left: 50px;background-color: #000000;color: white;z-index: 1000;padding: 10px;">
            <titleDiv></titleDiv>
        </div> -->
       <form_></form_>
        <!-- <formDiv></formDiv> -->
        <div id="mask" class="fade" v-if="myStyle.show" @click="close()">
            <div class="mask_img NewDetails" v-show="myStyle.show" :style="myStyle" @click="_stopPropagation($event)">
                <div style="position: relative;">
                    <div class="father" style="width: 100%;">
                        <!-- <dogcat></dogcat> -->
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
        <div style="display: flex;">
            <div>
                观影作品数量：{{ list.length }}
            </div>
            <div style="margin-left:10px">
                观影作品总次数和：{{ sumWatch() }}
            </div>
            <el-button size="mini" style="margin-left: auto;margin-right: 10px;" type="success">新增</el-button>
            <el-switch style="display: block" v-model="switch_value" active-color="#108ee9" active-text="卡片"
                inactive-text="日历">
            </el-switch>
        </div>
        <!-- <calenda :list="list" v-if="!switch_value"></calenda> -->
        <div v-if="switch_value" class="flex_container">
            <div v-for="(item, index) in list.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="index"
                class="testBorder movie_card">
                <div class="" style="display: flex;">
                    <div class="father box testBorder" style="cursor: pointer;" :id="'myId' + index"
                        @click="getXYZ(index, item)">
                        <div class="zoomImage" :style="{ 'background-color': test() }">

                        </div>
                        <!-- <div class="zoomImage" :style="bgImg">

                        </div> -->
                        <!-- <dogcat class="zoomImage" ></dogcat> -->
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
                                    <accompany :watch_Number_Details="item_2"></accompany>
                                    <div class="save" slot="reference"
                                        :style="{ 'background-color': (item_2.time ? 'green' : '') }">
                                        {{ index_2 + 1 }}
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
                                    <accompany :watch_Number_Details="item.total[item.total.length - 1]"></accompany>
                                    <div class="save" slot="reference">
                                        {{ item.total.length }}
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="testBorder">
                    <div>
                        <div style="font-weight: 700;font-size: 14px;">
                            {{ item.movie }}
                        </div>
                        <div class="information">
                            <span>
                                Time Since Last Viewing:
                            </span>
                            <span style="color: rgb(0, 34, 255,0.8);">
                                {{ contDays(item.total[item.total.length - 1].time) }}
                            </span>
                        </div>
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
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
            <div class="empty_card"></div>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[25, 50, 75, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="list.length" style="float:right;margin-top:15px;"></el-pagination>
    </div>
</template>

<script>

import calenda from './movieComponents/calenda.vue'

import titleDiv from './movieComponents/titleDiv.vue'
import accompany from './movieComponents/accompany.vue'
import movieDetail from './movieComponents/movieDetail.vue'
import formDiv from './movieComponents/formDiv.vue'


import form_ from './componentNew/form_.vue'
// import dogcat from './movieComponents/dogcat.vue'


import Vue from 'vue'

const url = require("../../../assets/AA1ip5wC.jpg");

export default {
    components: {form_,
        formDiv,
        accompany,
        movieDetail,
        titleDiv,
        calenda,
        // dogcat
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
            currentPage: 1,
            pageSize: 25,
            switch_value: true, // 卡片日历渲染
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
                    movie: '流浪地球',
                    persionScore: 7.9,
                    collect: '4k',
                    total: [
                        {
                            time: '',
                            address: '电影院',
                            accompany: ['爸爸'],
                            progress: 100,
                        }, {
                            time: '',
                            address: '家',
                            accompany: ['爸爸'],
                            progress: 100,
                        }, {
                            time: '2023-01-22',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        }, {
                            time: '2019-02',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '曼达洛人第三季',
                    persionScore: 9.1,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-03',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '保你平安',
                    persionScore: 7.0,
                    collect: '',
                    total: [
                        {
                            time: '2023-03-10',
                            address: '青岛万达CBD',
                            accompany: ['吕荣钊'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '最后的生还者第一季',
                    persionScore: 9.0,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-04-02',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '铃芽之旅',
                    persionScore: 7.6,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023-04-14',
                            address: '青岛万达CBD',
                            accompany: ['吕荣钊'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '超级马里奥大电影',
                    persionScore: 7.9,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023-04-15',
                            address: '万达影城(CBD万达广场IMAX店)',
                            accompany: ['吕荣钊'],
                            progress: 100,
                        }, {
                            time: '2023-04-15',
                            address: '家',
                            accompany: ['小米'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '银河护卫队3',
                    persionScore: 7.5,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-05-05',
                            address: '青岛万达CBD',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '速度与激情10',
                    persionScore: 6.9,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-05-19',
                            address: '青岛万达CBD',
                            accompany: ['吕荣钊'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '蜘蛛侠：平行宇宙',
                    persionScore: 7.8,
                    collect: '4k',
                    total: [
                        {
                            time: '2019-04',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                        {
                            time: '2023-06-06',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '闪电侠',
                    persionScore: 9.0,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-06-17',
                            address: '青岛万达CBD',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '蜘蛛侠：平行宇宙2',
                    persionScore: 7.9,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-06-18',
                            address: '青岛万达CBD',
                            accompany: ['吕荣钊'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '正义联盟导演剪辑版',
                    persionScore: 9.5,
                    collect: '4K',
                    total: [
                        {
                            time: '',
                            address: '青岛理工大学',
                            accompany: [],
                            progress: 100,
                        }, {
                            time: '',
                            address: '家',
                            accompany: ['爸爸'],
                            progress: 100,
                        },
                        {
                            time: '2021-03-15',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                        {
                            time: '2021-04',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                        {
                            time: '2023-06-27',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '蚁人3',
                    persionScore: 8.2,
                    collect: '4K',
                    total: [
                        // {
                        //     time: '2023-07-28',
                        //     address: '',
                        //     accompany: [],
                        //     progress: 100,
                        // },
                        {
                            time: '2023-02-18',
                            address: '青岛万象城',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '生化危机：死亡岛',
                    persionScore: 8.2,
                    collect: '4K',
                    total: [
                        {
                            time: '',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '巨齿鲨2',
                    persionScore: 8.5,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-08-05',
                            address: '青岛万象城',
                            accompany: ['谈畅'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '热烈',
                    persionScore: 8.6,
                    collect: '',
                    total: [
                        {
                            time: '2023-08-06',
                            address: '青岛万象城',
                            accompany: ['谈畅', '海信'],
                            progress: 100,
                        },
                    ],
                },
                {
                    movie: '孤注一掷',
                    persionScore: 8.1,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-19',
                            address: '青岛万象城',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                },
                {
                    movie: '奥本海默',
                    persionScore: 8.2,
                    collect: '未发售',
                    total: [
                        {
                            time: '2023-08-31',
                            address: '青岛万象城IMAX',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '敢死队',
                    persionScore: 8.1,
                    collect: '1080p',
                    total: [
                        {
                            time: '2020-01',
                            address: '家',
                            accompany: [],
                            progress: 50,
                        }, {
                            time: '',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        }, {
                            time: '2023-09-18',
                            address: '家',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '时空恋旅人',
                    persionScore: 8.1,
                    collect: '4k',
                    total: [
                        {
                            time: '',
                            address: '家',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '与玛格丽特的下午',
                    persionScore: 8.4,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023-10-08',
                            address: '家',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '心灵捕手',
                    persionScore: 8.3,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023-10-14',
                            address: '家',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '疾速追杀4',
                    persionScore: 9.0,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '龙与地下城',
                    persionScore: 7.3,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023',
                            address: '家',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                }, {
                    movie: '小美人鱼1990',
                    persionScore: 9.0,
                    collect: '1080p',
                    total: [
                        {
                            time: '2023-10-16',
                            address: '家',
                            accompany: ['璨璨'],
                            progress: 100,
                        },
                    ],
                },
                {
                    movie: "007：大战皇家赌场",
                    engName: "Casino Royale",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "007：大破天幕杀机",
                    engName: "Skyfall",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "007：大破量子危机",
                    engName: "Quantum of Solace",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "007：幽灵党",
                    engName: "Spectre",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "007：无暇赴死",
                    engName: "No Time to Die",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-11-01",
                            address: "青岛西海岸影城(家佳源店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "2001太空漫游",
                    engName: "2001: A Space Odyssey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "2012",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "300勇士：帝国崛起",
                    engName: "300: Rise of an Empire",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "BJ单身日记",
                    engName: "Bridget Jones's Diary",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "BJ单身日记2",
                    engName: "Bridget Jones's Diary",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },
                {
                    movie: "DC萌宠特遣队",
                    engName: "DC League of Super-Pets",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-19",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "E.T.外星人",
                    engName: "E.T. the Extra-Terrestrial",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 20
                        }
                    ]
                },
                {
                    movie: "X战警",
                    engName: "X-Men",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警2",
                    engName: "X2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警3：背水一战",
                    engName: "X-Men: The Last Stand",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警：天启",
                    engName: "X-Men: Apocalypse",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警：第一战",
                    engName: "X-Men: First Class",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警：逆转未来",
                    engName: "X-Men: Days of Future Past",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X战警：黑凤凰",
                    engName: "Dark Phoenix",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06-07",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "X特遣队：全员集结",
                    engName: "The Suicide Squad",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "万万没想到",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "三个火枪手",
                    engName: "The Three Musketeers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "三傻大闹宝莱坞",
                    engName: "3 Idiots",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "不二神探",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "世界之战",
                    engName: "War of the Worlds",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "举起手来2：追击阿多丸号",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "举起手来！",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "五十度灰",
                    engName: "Fifty Shades of Grey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "五十度飞",
                    engName: "Fifty Shades Freed",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "五十度黑",
                    engName: "Fifty Shades of Black",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "五十度黑",
                    engName: "Fifty Shades Darker",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "亚当计划",
                    engName: "The Adam Project",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "亚瑟和他的迷你王国",
                    engName: "Arthur et les Minimoys",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "亚瑟王：斗兽争霸",
                    engName: "King Arthur: Legend of the Sword",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人兽杂交",
                    engName: "Splice",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人再囧途之泰囧",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人在囧途",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-03-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人潮汹涌",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-02-22",
                            address: "开元国际影城(开元国际商城南楼)",
                            accompany: ['岳诗茵'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人生遥控器",
                    engName: "Click",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人类清除计划",
                    engName: "The Purge",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "人类清除计划2：无政府状态",
                    engName: "The Purge: Anarchy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "他是龙",
                    engName: "Он - дракон",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "伦敦陷落",
                    engName: "London Has Fallen",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "伸冤人3",
                    engName: "The Equalizer 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "你丫闭嘴！",
                    engName: "Tais-toi!",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "你好，李焕英",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-02-27",
                            address: "大地影院(开元国际影城店)",
                            accompany: ['栋梁姐姐'],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "你的名字。",
                    engName: "君の名は。",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "侏罗纪世界",
                    engName: "Jurassic World",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "侏罗纪世界2",
                    engName: "Jurassic World: Fallen Kingdom",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "侏罗纪世界3",
                    engName: "Jurassic World: Dominion",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-06-10",
                            address: "万达影城(CBD万达广场IMAX店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "侏罗纪公园",
                    engName: "Jurassic Park",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "保你平安",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "信条",
                    engName: "Tenet",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "倩女幽魂",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "倩女幽魂2：人间道",
                    engName: "倩女幽魂II 人間道",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "倩女幽魂3：道道道",
                    engName: "倩女幽魂Ⅲ 道道道",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "偷听女人心",
                    engName: "What Women Want",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "傲慢与偏见",
                    engName: "Pride & Prejudice",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "像素大战",
                    engName: "Pixels",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "僵尸世界大战",
                    engName: "World War Z",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-10-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "僵尸新娘",
                    engName: "Corpse Bride",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "光年正传",
                    engName: "Lightyear",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "全城戒备",
                    engName: "全城戒備",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "全民超人汉考克",
                    engName: "Hancock",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "全球风暴",
                    engName: "Geostorm",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "八佰",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08-29",
                            address: "大地影院(开元国际商城店)",
                            accompany: ['海峰哥', '栋梁姐姐'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "公主与青蛙",
                    engName: "The Princess and the Frog",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "兰戈",
                    engName: "Rango",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冒牌天神",
                    engName: "Bruce Almighty",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冒牌天神2",
                    engName: "Evan Almighty",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冥界警局",
                    engName: "R.I.P.D.",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰封侠：时空行者",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰封：重生之门",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "冰川时代外传",
                    engName: "Ice Age",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-02-06",
                            address: "家",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },
                {
                    movie: "冰川时代",
                    engName: "Ice Age",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰川时代2",
                    engName: "Ice Age: The Meltdown",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰川时代3",
                    engName: "Ice Age: Dawn of the Dinosaurs",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰川时代4",
                    engName: "Ice Age: Continental Drift",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰川时代5：星际碰撞",
                    engName: "Ice Age: Collision Course",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰河世纪：猛犸象的圣诞",
                    engName: "Ice Age: A Mammoth Christmas",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰路营救",
                    engName: "The Ice Road",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰雪奇缘",
                    engName: "Frozen",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冰雪奇缘2",
                    engName: "Frozen II",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12-08",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['陈一凡', '宋顺'],
                            progress: 100
                        }, {
                            time: "2019-12-08",
                            address: "青岛红星电影世界",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "冰雪奇缘：生日惊喜",
                    engName: "Frozen Fever",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "刀锋战士",
                    engName: "Blade",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "分手大师",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "分歧者2：绝地反击",
                    engName: "Insurgent",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "分歧者3：忠诚世界",
                    engName: "The Divergent Series: Allegiant",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "分歧者：异类觉醒",
                    engName: "Divergent",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "创：战纪",
                    engName: "TRON: Legacy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "利刃出鞘",
                    engName: "Knives Out",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "刺客信条",
                    engName: "Assassin's Creed",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "刺杀小说家",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "刺猬索尼克",
                    engName: "Sonic the Hedgehog",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "刺猬索尼克2",
                    engName: "Sonic the Hedgehog 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫之王",
                    engName: "The Forbidden Kingdom",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-11-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫熊猫",
                    engName: "Kung Fu Panda",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2024-03-10",
                            address: "芙蓉路96号",
                            accompany: ['璨璨'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫熊猫2",
                    engName: "Kung Fu Panda 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2021-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "功夫熊猫3",
                    engName: "Kung Fu Panda 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-08",
                            address: "大学宿舍",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫熊猫之盖世五侠的秘密",
                    engName: "Kung Fu Panda: Secrets of the Furio...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫熊猫外传2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "功夫熊猫外传3",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加勒比海盗",
                    engName: "Pirates of the Caribbean: The Curse of the Black ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加勒比海盗2：亡灵的宝藏",
                    engName: "Pirates of the Caribbean: Dead Man's...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加勒比海盗3：世界的尽头",
                    engName: "Pirates of the Caribbean: At World's...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加勒比海盗4：惊涛怪浪",
                    engName: "Pirates of the Caribbean: On Stranger ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加勒比海盗5：死无对证",
                    engName: "Pirates of the Caribbean: Dead Men Tel...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "加菲猫",
                    engName: "Garfield",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢传说",
                    engName: "Brave",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢的心",
                    engName: "Braveheart",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢者游戏2：再战巅峰",
                    engName: "Jumanji: The Next Level",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢者游戏：决战丛林",
                    engName: "Jumanji: Welcome to the Jungle",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢者的游戏",
                    engName: "Jumanji",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇敢者的游戏2：太空飞行棋",
                    engName: "Zathura: A Space Adventure",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "勇闯夺命岛",
                    engName: "The Rock",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "十万个冷笑话",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "十万个冷笑话2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "十二生肖",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "千与千寻",
                    engName: "千と千尋の神隠し",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06-22",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "单身男女",
                    engName: "單身男女",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "单身男女2",
                    engName: "單身男女II",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "博物馆奇妙夜",
                    engName: "Night at the Museum",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "博物馆奇妙夜2",
                    engName: "Night at the Museum: Battle of the Smithsonian",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "博物馆奇妙夜3",
                    engName: "Night at the Museum: Secret of the Tomb",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "卡拉什尼科夫",
                    engName: "Калашников",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "厨子戏子痞子",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "双子杀手",
                    engName: "Gemini Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "反贪风暴4",
                    engName: "P風暴",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "反贪风暴5：最终章",
                    engName: "G風暴",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变形金刚",
                    engName: "Transformers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变形金刚2",
                    engName: "Transformers: Revenge of the Fallen",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变形金刚3",
                    engName: "Transformers: Dark of the Moon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变形金刚4：绝迹重生",
                    engName: "Transformers: Age of Extinction",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变形金刚5：最后的骑士",
                    engName: "Transformers: The Last Knight",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "变形金刚6：大黄蜂外传",
                    engName: "Transformers: The Last Knight",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01-07",
                            address: "青岛红星电影世界",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: '变形金刚7',
                    persionScore: 8.7,
                    collect: '4k',
                    total: [
                        {
                            time: '2023-06-09',
                            address: '万达影城(台东店)',
                            accompany: [],
                            progress: 100,
                        },
                    ],
                },
                {
                    movie: "变形金刚大电影",
                    engName: "The Transformers: The Movie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },
                {
                    movie: "变形金刚：赛博坦之战 第一季",
                    engName: "Transformers: War for Cybertron ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "变形金刚：赛博坦之战 第二季",
                    engName: "Transformers: War for Cybertron ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "变形金刚：赛博坦之战 第三季",
                    engName: "Transformers: War for Cybertron ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 80
                        }
                    ]
                },
                {
                    movie: "超能勇士 第一季",
                    engName: "Beast Wars: Transformers Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },
                {
                    movie: "变相怪杰",
                    engName: "The Mask",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "变脸",
                    engName: "Face/Off",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "古墓丽影",
                    engName: "Lara Croft: Tomb Raider",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "古墓丽影2",
                    engName: "Lara Croft Tomb Raider: The Cradle of Life",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "古墓丽影：源起之战",
                    engName: "Tomb Raider",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "史密斯夫妇",
                    engName: "Mr. & Mrs. Smith",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "叶问",
                    engName: "葉問",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "叶问2：宗师传奇",
                    engName: "葉問2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "叶问3",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "叶问4：完结篇",
                    engName: "葉問4：完結篇",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "名侦探柯南：绯色的子弹",
                    engName: "名探偵コナン 緋色の弾丸",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "后天",
                    engName: "The Day After Tomorrow",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哆啦A梦：大雄的金银岛",
                    engName: "ドラえもん のび太の宝島",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与凤凰社",
                    engName: "Harry Potter and the Order of the Phoenix",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与密室",
                    engName: "Harry Potter and the Chamber of Secrets",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与死亡圣器(上)",
                    engName: "Harry Potter and the Deathly Hallow...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-08-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与死亡圣器(下)",
                    engName: "Harry Potter and the Deathly Hallow...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-08-13",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与混血王子",
                    engName: "Harry Potter and the Half-Blood Prince",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与火焰杯",
                    engName: "Harry Potter and the Goblet of Fire",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与禁忌之旅",
                    engName: "Harry Potter and the Forbidden Journey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与阿兹卡班的囚徒",
                    engName: "Harry Potter and the Prisoner of ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈利·波特与魔法石",
                    engName: "Harry Potter and the Sorcerer's Stone",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-05-24",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哈尔的移动城堡",
                    engName: "ハウルの動く城",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哥斯拉",
                    engName: "Godzilla",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哥斯拉2：怪兽之王",
                    engName: "Godzilla: King of the Monsters",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05-25",
                            address: "红星电影世界(青岛城市传媒广场店)",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哥斯拉大战金刚",
                    engName: "Godzilla vs Kong",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-03-26",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "哪吒之魔童降世",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08-22",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "唐人街探案",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-01",
                            address: "电影院",
                            accompany: ['岳诗茵'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "唐人街探案2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "唐人街探案3",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-02-27",
                            address: "大地影城(开元国际商城店)",
                            accompany: ['岳诗茵'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "唐伯虎点秋香",
                    engName: "唐伯虎點秋香",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "喜剧之王",
                    engName: "喜劇之王",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "喜羊羊与灰太狼之牛气冲天",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "回到未来",
                    engName: "Back to the Future",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "回到未来3",
                    engName: "Back to the Future Part III",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "国产凌凌漆",
                    engName: "國產凌凌漆",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-20",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "国家宝藏",
                    engName: "National Treasure",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "国家宝藏：夺宝秘笈",
                    engName: "National Treasure: Book of Secrets",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "圆梦巨人",
                    engName: "The BFG",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "地心历险记",
                    engName: "Journey to the Center of the Earth",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "地心历险记2：神秘岛",
                    engName: "Journey 2: The Mysterious Island",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "地狱男爵",
                    engName: "Hellboy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "地狱男爵2：黄金军团",
                    engName: "Hellboy 2: The Golden Army",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "地狱男爵：血皇后崛起",
                    engName: "Hellboy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "壮志凌云2：独行侠",
                    engName: "Top Gun: Maverick",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "声之形",
                    engName: "聲の形",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "复仇者联盟",
                    engName: "The Avengers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "复仇者联盟2：奥创纪元",
                    engName: "Avengers: Age of Ultron",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2015-05-16",
                            address: "CVG星聚汇影城(万象城店)",
                            accompany: ['爸爸'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "复仇者联盟3：无限战争",
                    engName: "Avengers: Infinity War",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "复仇者联盟4：终局之战",
                    engName: "Avengers: Endgame",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-05-03",
                            address: "大地影院兰陵开元惠民广场店",
                            accompany: ['岳诗茵'],
                            progress: 100
                        }, {
                            time: "2019-05-01",
                            address: "大地影院兰陵开元惠民广场店",
                            accompany: ['爸爸', '妈妈'],
                            progress: 100
                        }, {
                            time: "2019-04-24",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夏洛特烦恼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-02-25",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大侦探皮卡丘",
                    engName: "Pokémon Detective Pikachu",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大侦探福尔摩斯",
                    engName: "Sherlock Holmes",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大内密探零零发",
                    engName: "大內密探零零發",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大白！",
                    engName: "Baymax!",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大话西游之大圣娶亲",
                    engName: "西遊記大結局之仙履奇緣",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大话西游之月光宝盒",
                    engName: "西遊記第壹佰零壹回之月光寶盒",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大闹天宫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大陆酒店",
                    engName: "The Continental: From the World of John Wick",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "大鱼海棠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "天才眼镜狗",
                    engName: "Mr. Peabody & Sherman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "天气之子",
                    engName: "天気の子",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11-04",
                            address: "青岛西海岸影城(家佳源店)",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "天空之城",
                    engName: "天空の城ラピュタ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "天降美食",
                    engName: "Cloudy with a Chance of Meatballs",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "天降美食2",
                    engName: "Cloudy with a Chance of Meatballs 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "太空旅客",
                    engName: "Passengers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "失控玩家",
                    engName: "Free Guy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "头号玩家",
                    engName: "Ready Player One",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝奇兵",
                    engName: "Raiders of the Lost Ark",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝奇兵2",
                    engName: "Indiana Jones and the Temple of Doom",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝奇兵3",
                    engName: "Indiana Jones and the Last Crusade",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝奇兵4",
                    engName: "Indiana Jones and the Kingdom of the Crystal Skull",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝奇兵5：命运转盘",
                    engName: "Indiana Jones and the Dial of Destiny",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "夺宝联盟",
                    engName: "도둑들",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "奇异博士",
                    engName: "Doctor Strange",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-06-24",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "奇异博士2：疯狂多元宇宙",
                    engName: "Doctor Strange in the Multiverse of ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "奇迹·笨小孩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "奥本海默",
                    engName: "Oppenheimer",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "女巫季节",
                    engName: "Season of the Witch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "姜子牙",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10-01",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: ['李准', '宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "孤注一掷",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "守护者联盟",
                    engName: "Rise of the Guardians",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "守望者",
                    engName: "Watchmen",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战：安多 第一季",
                    engName: "Andor Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },
                {
                    movie: "安德的游戏",
                    engName: "Ender's Game",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "宙斯之子：赫拉克勒斯",
                    engName: "Hercules",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "宝莱坞机器人2.0：重生归来",
                    engName: "2.0",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "宝莲灯电影版",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "宝莲灯剧场版",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-02-20",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "宝贝计划",
                    engName: "寶貝計劃",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "寄生兽",
                    engName: "寄生獣",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "寒战",
                    engName: "寒戰",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "寻龙传说",
                    engName: "Raya and The Last Dragon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "寻龙诀",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小丑",
                    engName: "Joker",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小叮当",
                    engName: "Tinker Bell",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小叮当：羽翼之谜",
                    engName: "Secret of the Wings",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小时代",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小王子",
                    engName: "Le Petit Prince",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小美人鱼",
                    engName: "The Little Mermaid",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小鬼当家",
                    engName: "Home Alone",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小鬼当家2",
                    engName: "Home Alone 2: Lost in New York",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小鸡快跑",
                    engName: "Chicken Run",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小鹿斑比2",
                    engName: "Bambi 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小黄人大眼萌",
                    engName: "Minions",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "小黄人大眼萌：神偷奶爸前传",
                    engName: "Minions: The Rise of Gru",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "少林寺",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "尖峰时刻",
                    engName: "Rush Hour",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "尖峰时刻2",
                    engName: "Rush Hour 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "尖峰时刻3",
                    engName: "Rush Hour 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "尚气与十环传奇",
                    engName: "Shang-Chi and the Legend of the Ten Rings",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-09-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "居家男人",
                    engName: "The Family Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "崖上的波妞",
                    engName: "崖の上のポニョ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "巨人捕手杰克",
                    engName: "Jack the Giant Slayer",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "巨齿鲨",
                    engName: "The Meg",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "巨齿鲨2：深渊",
                    engName: "Meg 2: The Trench",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "师父",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "幸福终点站",
                    engName: "The Terminal",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "幽灵公主",
                    engName: "もののけ姫",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "康斯坦丁",
                    engName: "Constantine",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-03-26",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形",
                    engName: "Alien",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形2",
                    engName: "Aliens",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形3",
                    engName: "Alien³",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形4",
                    engName: "Alien: Resurrection",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形大战铁血战士",
                    engName: "AVP: Alien vs. Predator",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形大战铁血战士2",
                    engName: "AVPR: Aliens vs Predator - Requiem",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异形：契约",
                    engName: "Alien: Covenant",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "异星战场",
                    engName: "John Carter",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "异星觉醒",
                    engName: "Life",
                    persionScore: 0,
                    collect: "",
                    total: [{
                        time: "2018-10",
                        address: "家",
                        accompany: [],
                        progress: 100
                    }
                    ]
                },
                {
                    movie: "当幸福来敲门",
                    engName: "The Pursuit of Happyness",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "心灵捕手",
                    engName: "Good Will Hunting",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "忍者神龟",
                    engName: "TMNT",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "忍者神龟2：破影而出",
                    engName: "Teenage Mutant Ninja Turtles: Out of the...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "忍者神龟：变种大乱斗",
                    engName: "Teenage Mutant Ninja Turtles: Mutant Ma...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "忍者神龟：变种时代",
                    engName: "Teenage Mutant Ninja Turtles",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "忠犬八公的故事",
                    engName: "Hachi: A Dog's Tale",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "快把我哥带走",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "急先锋",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怦然心动",
                    engName: "Flipped",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪兽大学",
                    engName: "Monsters University",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪兽电力公司",
                    engName: "Monsters, Inc.",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪物史瑞克",
                    engName: "Shrek",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪物史瑞克2",
                    engName: "Shrek 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪物史瑞克3",
                    engName: "Shrek the Third",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪物史瑞克4",
                    engName: "Shrek Forever After",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "恐龙当家",
                    engName: "The Good Dinosaur",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "情圣",
                    engName: "情聖",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "惊天营救2",
                    engName: "Extraction 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "惊奇队长",
                    engName: "Captain Marvel",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "愤怒的小鸟",
                    engName: "Angry Birds",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "愤怒的小鸟2",
                    engName: "The Angry Birds Movie 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "憨豆特工",
                    engName: "Johnny English",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "憨豆特工3",
                    engName: "Johnny English Strikes Again",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "憨豆的黄金周",
                    engName: "Mr. Bean's Holiday",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我不是药神",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我和我的家乡",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10-04",
                            address: "银河欢乐影城",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "我和我的父辈",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-09-27",
                            address: "青岛西海岸影城(家佳源店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我想吃掉你的胰脏",
                    engName: "君の膵臓をたべたい",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我是传奇",
                    engName: "I Am Legend",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我是谁",
                    engName: "我是誰",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我的女友是机器人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我的机器人女友",
                    engName: "僕の彼女はサイボーグ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我的野蛮女友",
                    engName: "엽기적인 그녀",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "我，机器人",
                    engName: "I, Robot",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "战狼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "战狼2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "拆弹专家",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "拆弹专家2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "拯救大兵瑞恩",
                    engName: "Saving Private Ryan",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "指环王1：护戒使者",
                    engName: "The Lord of the Rings: The Fellowship of t...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2021-04-17",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['陈一凡'],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "指环王2：双塔奇兵",
                    engName: "The Lord of the Rings: The Two Towers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2021-05",
                            address: "电影院",
                            accompany: ['陈一凡'],
                            progress: 100
                        }, {
                            time: "2021-04-23",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "指环王3：王者无敌",
                    engName: "The Lord of the Rings: The Return of the King",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2021-05-14",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['陈一凡'],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "指环王：力量之戒 第一季",
                    engName: "The Lord of the Rings: The Rings of ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-10-21",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "捉妖记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "掠食城市",
                    engName: "Mortal Engines",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "攻壳机动队",
                    engName: "攻殻機動隊",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "攻壳机动队",
                    engName: "Ghost in the Shell",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "敢死队",
                    engName: "The Expendables",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "敢死队2",
                    engName: "The Expendables 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "敢死队3",
                    engName: "The Expendables 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "敢死队4：最终章",
                    engName: "Expend4bles",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "敦刻尔克",
                    engName: "Dunkirk",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "整蛊专家",
                    engName: "整蠱專家",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "斯巴达300勇士：帝国崛起",
                    engName: "300",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "新变种人",
                    engName: "The New Mutants",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "新木乃伊",
                    engName: "The Mummy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "新蝙蝠侠",
                    engName: "The Batman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "新铁血战士",
                    engName: "Predators",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "无名",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "艾尚乐汀艺术影城",
                            address: "2023-01-28",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "无敌浩克",
                    engName: "The Incredible Hulk",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "无敌破坏王",
                    engName: "Wreck-It Ralph",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "无敌破坏王2：大闹互联网",
                    engName: "Ralph Breaks the Internet",
                    persionScore: 0,
                    collect: "2019-03",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "时空恋旅人",
                    engName: "About Time",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "时间旅行者的妻子",
                    engName: "The Time Traveler's Wife",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "昆虫总动员",
                    engName: "Minuscule: la Vallée des Fourmis Perdues",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "明日世界",
                    engName: "Tomorrowland",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "明日之战",
                    engName: "The Tomorrow War",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "明日战记",
                    engName: "明日戰記",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-08-11",
                            address: "CGV影城(万象城IMAX店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "明日边缘",
                    engName: "Edge of Tomorrow",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星河战队",
                    engName: "Starship Troopers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2023-03-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星河战队2：联邦英雄",
                    engName: "Starship Troopers 2: Hero of the Federation",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星河战队3：掠夺者",
                    engName: "Starship Troopers 3: Marauder",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星河战队：入侵",
                    engName: "Starship Troopers 3: Marauder",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战",
                    engName: "Star Wars",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战2：帝国反击战",
                    engName: "Star Wars: Episode V - The Empire Stri...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战3：绝地归来",
                    engName: "Star Wars: Episode VI - Return of the Jedi",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战7：原力觉醒",
                    engName: "Star Wars: The Force Awakens",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战8：最后的绝地武士",
                    engName: "Star Wars: The Last Jedi",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战9：天行者崛起",
                    engName: "Star Wars: The Rise of Skywalker",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "电影院",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战前传1：幽灵的威胁",
                    engName: "Star Wars: Episode I - The Phantom...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战前传2：克隆人的进攻",
                    engName: "Star Wars: Episode II - Attack o...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战前传3：西斯的反击",
                    engName: "Star Wars: Episode III - Revenge o...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战外传：侠盗一号",
                    engName: "Rogue One: A Star Wars Story",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星银岛",
                    engName: "Treasure Planet",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际传奇",
                    engName: "Pitch Black",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际传奇2",
                    engName: "The Chronicles of Riddick",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际传奇3",
                    engName: "Riddick",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "泰山归来：险战丛林",
                    engName: "Lilo & Stitch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "镜中人",
                    engName: "Lilo & Stitch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝",
                    engName: "Lilo & Stitch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝 第一季",
                    engName: "Lilo & Stitch: The Series Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝 第二季",
                    engName: "Lilo & Stitch: The Series Season 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝2：史迪奇有问题",
                    engName: "Lilo & Stitch 2: Stitch Has a Glitch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝史迪奇",
                    engName: "Stitch! The Movie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际宝贝：终极任务",
                    engName: "Leroy & Stitch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际特工：千星之城",
                    engName: "Valérian and the City of a Thousand Planets",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际穿越",
                    engName: "Interstellar",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-08-05",
                            address: "大地影院(兰陵开元国际影城店)",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "星际迷航",
                    engName: "Star Trek",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际迷航2：暗黑无界",
                    engName: "Star Trek Into Darkness",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际迷航3：超越星辰",
                    engName: "Star Trek Beyond",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星际迷航：皮卡德 第一季",
                    engName: "Star Trek: Picard Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "普罗米修斯",
                    engName: "Prometheus",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "智取威虎山",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暗夜博士：莫比亚斯",
                    engName: "Morbius",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暮光之城",
                    engName: "Twilight",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暮光之城2：新月",
                    engName: "The Twilight Saga: New Moon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暮光之城3：月食",
                    engName: "The Twilight Saga: Eclipse",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暮光之城4：破晓(上)",
                    engName: "The Twilight Saga: Breaking Dawn - Part 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "暮光之城5",
                    engName: "The Twilight Saga: Breaking Dawn - Part 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "暮光之城4：破晓(下)",
                    engName: "The Twilight Saga: Breaking Dawn - Part 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "曼达洛人 第一季",
                    engName: "The Mandalorian Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2023-03-19",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "曼达洛人 第二季",
                    engName: "The Mandalorian Season 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "月球陨落",
                    engName: "Moonfall",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "有希望的男人",
                    engName: "Muži v naději",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "地球停转之日",
                    engName: "Muži v naději",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },

                {
                    movie: "木乃伊",
                    engName: "The Mummy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "木乃伊3",
                    engName: "The Mummy: Tomb of the Dragon Emperor",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "木乃伊归来",
                    engName: "The Mummy Returns",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "木星上行",
                    engName: "Jupiter Ascending",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "未来水世界",
                    engName: "Waterworld",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "未来警察",
                    engName: "未來警察",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "末日崩塌",
                    engName: "San Andreas",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "末日逃生",
                    engName: "Greenland",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器人9号",
                    engName: "9",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器人历险记",
                    engName: "Robots",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器人总动员",
                    engName: "WALL·E",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器战警2",
                    engName: "Robocop 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器战警3",
                    engName: "RoboCop 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机器管家",
                    engName: "Bicentennial Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机械姬",
                    engName: "Ex Machina",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机械师",
                    engName: "The Mechanic",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机械师2：复活",
                    engName: "Mechanic: Resurrection",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "机械战警",
                    engName: "RoboCop",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "杀戮都市：O",
                    engName: "GANTZ:O",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "杀死比尔",
                    engName: "Kill Bill: Vol. 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "杀破狼",
                    engName: "殺破狼",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第一季",
                    engName: "Game of Thrones Season 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第二季",
                    engName: "Game of Thrones Season 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第三季",
                    engName: "Game of Thrones Season 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第四季",
                    engName: "Game of Thrones Season 4",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第五季",
                    engName: "Game of Thrones Season 5",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第六季",
                    engName: "Game of Thrones Season 6",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第七季",
                    engName: "Game of Thrones Season 7",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "权力的游戏 第八季",
                    engName: "Game of Thrones Season 8",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },


                {
                    movie: "极乐空间",
                    engName: "Elysium",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "极限特工",
                    engName: "xXx",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "极限特工2",
                    engName: "xXx: State of the Union",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "极限特工3：终极回归",
                    engName: "xXx: Return of Xander Cage",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "查理和巧克力工厂",
                    engName: "Charlie and the Chocolate Factory",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "楚门的世界",
                    engName: "The Truman Show",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "模仿游戏",
                    engName: "The Imitation Game",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "欧比旺",
                    engName: "Obi-Wan Kenobi",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-06-23",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "正义联盟",
                    engName: "Justice League",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "正义联盟：亚特兰蒂斯宝座",
                    engName: "Justice League",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "武状元苏乞儿",
                    engName: "武狀元蘇乞兒",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死亡飞车",
                    engName: "Death Race",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死侍",
                    engName: "Deadpool",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死侍2：我爱我家",
                    engName: "Deadpool 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死神来了",
                    engName: "Final Destination",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死神来了2",
                    engName: "Final Destination 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死神来了3",
                    engName: "Final Destination 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死神来了4",
                    engName: "The Final Destination",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "死神来了5",
                    engName: "Final Destination 5",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "毒液2",
                    engName: "Venom: Let There Be Carnage",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-09-24",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "毒液：致命守护者",
                    engName: "Venom",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "永恒族",
                    engName: "Eternals",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "汉江怪物",
                    engName: "괴물",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "汽车人总动员",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "沉睡魔咒",
                    engName: "Maleficent",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "沉睡魔咒2",
                    engName: "Maleficent: Mistress of Evil",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "沙丘",
                    engName: "Dune",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-10-23",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['宋顺'],
                            progress: 100
                        },{
                            time: "2024-03-01",
                            address: "芙蓉路96号",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "波巴·费特之书",
                    engName: "The Book of Boba Fett",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "波斯王子：时之刃",
                    engName: "Prince of Persia: The Sands of Time",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "波西·杰克逊与神火之盗",
                    engName: "Percy Jackson & the Olympians: The Li...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "波西·杰克逊与魔兽之海",
                    engName: "Percy Jackson: Sea of Monsters",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "泰坦尼克号",
                    engName: "Titanic",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "泰迪熊",
                    engName: "Ted",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "泰迪熊2",
                    engName: "Ted",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "洛杉矶之战",
                    engName: "Battle: Los Angeles",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "活死人军团",
                    engName: "Army of the Dead",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "流浪地球",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2023-02-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "流浪地球2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [{
                        time: "2023-01-22",
                        address: "电影院",
                        accompany: [],
                        progress: 100
                    }, {
                        time: "2023-01-24",
                        address: "万达影城",
                        accompany: ['爸爸'],
                        progress: 100
                    }
                    ]
                },
                {
                    movie: "济公",
                    engName: "濟公",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海底总动员",
                    engName: "Finding Nemo",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海底总动员2：多莉去哪儿",
                    engName: "Finding Dory",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海洋奇缘",
                    engName: "Moana",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海王",
                    engName: "Aquaman",
                    persionScore: 0,
                    collect: "",
                    total: [{
                        time: "2019-02",
                        address: "家",
                        accompany: [],
                        progress: 100
                    }, {
                        time: "2018-12-08",
                        address: "青岛红星电影世界",
                        accompany: ['宋顺'],
                        progress: 100
                    }
                    ]
                },
                {
                    movie: "海绵宝宝",
                    engName: "The SpongeBob Movie: Sponge Out of Water",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海绵宝宝：营救大冒险",
                    engName: "The SpongeBob Movie: Sponge on the Run",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "消失的她",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "深海",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "港囧",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "星球大战外传：游侠索罗",
                    engName: "Solo: A Star Wars Story",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "湄公河行动",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "源代码",
                    engName: "Source Code",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },{
                            time: "2024-06-27",
                            address: "芙蓉路96号",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "满城尽带黄金甲",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "澳门风云3",
                    engName: "賭城風雲III",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "火星救援",
                    engName: "The Martian",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-11-17",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "灰姑娘",
                    engName: "Cinderella",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "灵魂战车",
                    engName: "Ghost Rider",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "灵魂战车2：复仇时刻",
                    engName: "Ghost Rider: Spirit of Vengeance",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "热烈",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "煎饼侠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "燃情岁月",
                    engName: "Legends of the Fall",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "爱丽丝梦游仙境",
                    engName: "Alice in Wonderland",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "爱丽丝梦游仙境2：镜中奇遇记",
                    engName: "Alice Through the Looking Glass",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "爱宠大机密",
                    engName: "The Secret Life of Pets",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "爱宠大机密2",
                    engName: "The Secret Life of Pets 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "爱情与灵药",
                    engName: "Love & Other Drugs",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-12-14",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                
                {
                    movie: "特洛伊",
                    engName: "Troy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "特种部队2：全面反击",
                    engName: "G.I. Joe: Retaliation",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "特种部队：眼镜蛇的崛起",
                    engName: "G.I. Joe: The Rise of Cobra",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "特种部队：蛇眼起源",
                    engName: "Snake Eyes: G.I. Joe Origins",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "特警判官",
                    engName: "Dredd",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狂怒",
                    engName: "Fury",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狂暴巨兽",
                    engName: "Rampage",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狩猎",
                    engName: "Jagten",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狩猎",
                    engName: "The Hunt",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "独立日",
                    engName: "Independence Day",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "独立日2：卷土重来",
                    engName: "Independence Day: Resurgence",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "独行侠",
                    engName: "The Lone Ranger",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "独行月球",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-08-02",
                            address: "CGV影城(万象城IMAX店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狮子王",
                    engName: "The Lion King",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狮子王2：辛巴的荣耀",
                    engName: "The Lion King II: Simba's Pride",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狮子王3",
                    engName: "The Lion King 1½",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "狼图腾",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猎神：冬日之战",
                    engName: "The Huntsman: Winter's War",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猛禽小队 哈莉·奎茵",
                    engName: "Birds of Prey: And the Fantabulous Eman...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猩球崛起",
                    engName: "Rise of the Planet of the Apes",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猩球崛起2：黎明之战",
                    engName: "Dawn of the Planet of the Apes",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猩球崛起3：终极之战",
                    engName: "War for the Planet of the Apes",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猫和老鼠",
                    engName: "Tom and Jerry",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猫女",
                    engName: "Catwoman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "猫狗大战2：珍珠猫复仇",
                    engName: "Cats & Dogs: The Revenge of Kitty Galore",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "王牌特工2：黄金圈",
                    engName: "Kingsman: The Golden Circle",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "王牌特工：源起",
                    engName: "The King's Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "王牌特工：特工学院",
                    engName: "Kingsman: The Secret Service",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "玩具总动员",
                    engName: "Toy Story",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "玩具总动员2",
                    engName: "Toy Story 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "玩具总动员3",
                    engName: "Toy Story 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "玩具总动员4",
                    engName: "Toy Story 4",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "玩命快递",
                    engName: "The Transporter",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "环太平洋",
                    engName: "Pacific Rim",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "环太平洋：雷霆再起",
                    engName: "Pacific Rim: Uprising",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "珍珠港",
                    engName: "Pearl Harbor",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机",
                    engName: "Resident Evil",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机2：启示录",
                    engName: "Resident Evil: Apocalypse",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机3：灭绝",
                    engName: "Resident Evil: Extinction",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机4：孵化",
                    engName: "Biohazard 4: Incubate",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机4：战神再生",
                    engName: "Resident Evil: Afterlife",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机5：惩罚",
                    engName: "Resident Evil: Retribution",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机：复仇",
                    engName: "バイオハザード：ヴェンデッタ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机：恶化",
                    engName: "バイオハザード ディジェネレーション",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机：死亡岛",
                    engName: "バイオハザード：デスアイランド",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机：终章",
                    engName: "Resident Evil: The Final Chapter",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "生化危机：诅咒",
                    engName: "バイオハザード ダムネーション",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "画皮",
                    engName: "畫皮",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "画皮2",
                    engName: "畫皮Ⅱ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂元素城",
                    engName: "Elemental",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂动物城",
                    engName: "Zootopia",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂动物城+",
                    engName: "Zootopia+",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂原始人",
                    engName: "The Croods",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂原始人2",
                    engName: "The Croods: A New Age",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂外星人",
                    engName: "Home",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂的外星人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疯狂的麦克斯4：狂暴之路",
                    engName: "Mad Max: Fury Road",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-08-18",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疾速追杀",
                    engName: "John Wick",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疾速追杀2",
                    engName: "John Wick: Chapter 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疾速追杀3",
                    engName: "John Wick: Chapter 3 - Parabellum",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "疾速追杀4",
                    engName: "John Wick: Chapter 4",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "白日梦想家",
                    engName: "The Secret Life of Walter Mitty",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "白蛇2：青蛇劫起",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-07-24",
                            address: "大地影院(兰陵开元国际商城店)",
                            accompany: ['岳诗茵', '吕丽娜', '张斌'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "白蛇传说",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "白蛇：缘起",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "白雪公主和七个小矮人",
                    engName: "Snow White and the Seven Dwarfs",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "百万英镑",
                    engName: "The Million Pound Note",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "盗梦空间",
                    engName: "Inception",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "真人快打",
                    engName: "Mortal Kombat",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "瞬息全宇宙",
                    engName: "Everything Everywhere All at Once",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "破坏之王",
                    engName: "破壞之王",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "硬核亨利",
                    engName: "Хардкор",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍",
                    engName: "Mission: Impossible",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍2",
                    engName: "Mission: Impossible II",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍3",
                    engName: "Mission: Impossible III",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍4",
                    engName: "Mission: Impossible - Ghost Protocol",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍5：神秘国度",
                    engName: "Mission: Impossible - Rogue Nation",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍6：全面瓦解",
                    engName: "Mission: Impossible - Fallout",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "碟中谍7：致命清算（上）",
                    engName: "Mission: Impossible – Dead Reckonin...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神偷奶爸",
                    engName: "Despicable Me",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神偷奶爸2",
                    engName: "Despicable Me 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神偷奶爸3",
                    engName: "Despicable Me 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇动物在哪里",
                    engName: "Fantastic Beasts and Where to Find Them",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇动物：格林德沃之罪",
                    engName: "Fantastic Beasts: The Crimes of Grind...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇动物：邓布利多之谜",
                    engName: "Fantastic Beasts: The Secrets of Dumb...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-18",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇四侠",
                    engName: "Fantastic Four",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇四侠2",
                    engName: "Fantastic 4: Rise of the Silver Surfer",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇四侠2015",
                    engName: "Fantastic Four",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇女侠",
                    engName: "Wonder Woman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神奇女侠1984",
                    engName: "Wonder Woman 1984",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-12-18",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神战：权力之眼",
                    engName: "Gods of Egypt",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神秘海域",
                    engName: "Uncharted",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "神话",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "禁闭岛",
                    engName: "Shutter Island",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "私人订制",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "科学怪狗",
                    engName: "Frankenweenie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "秒速5厘米",
                    engName: "秒速5センチメートル",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "移动迷宫",
                    engName: "The Maze Runner",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "移动迷宫2",
                    engName: "Maze Runner: The Scorch Trials",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "移动迷宫3：死亡解药",
                    engName: "Maze Runner: The Death Cure",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "空中营救",
                    engName: "Non-Stop",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "穿靴子的猫",
                    engName: "Puss in Boots",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "穿靴子的猫2",
                    engName: "Puss in Boots: The Last Wish",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第一滴血",
                    engName: "First Blood",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第一滴血2",
                    engName: "Rambo: First Blood Part II",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第一滴血3",
                    engName: "Rambo III",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第一滴血5：最后的血",
                    engName: "Rambo: Last Blood",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第七子：降魔之战",
                    engName: "Seventh Son",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "第九区",
                    engName: "District 9",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "米老鼠和唐老鸭",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵旅社",
                    engName: "Hotel Transylvania",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵旅社2",
                    engName: "Hotel Transylvania 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵旅社3：疯狂假期",
                    engName: "Hotel Transylvania 3: Summer Vacation",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵旅社4：变身大冒险",
                    engName: "Hotel Transylvania 4: Transformania",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-07-23",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵王座",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "精灵鼠小弟",
                    engName: "Stuart Little",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "红海行动",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "纳尼亚传奇1：狮子、女巫和魔衣橱",
                    engName: "The Chronicles of Narnia: Th...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "纳尼亚传奇2：凯斯宾王子",
                    engName: "The Chronicles of Narnia: Prince Cas...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "纳尼亚传奇3：黎明踏浪号",
                    engName: "The Chronicles of Narnia: The Voyage...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者",
                    engName: "The Terminator",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者2018",
                    engName: "Terminator Salvation",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者2：审判日",
                    engName: "Terminator 2: Judgment Day",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者3",
                    engName: "Terminator 3: Rise of the Machines",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者：创世纪",
                    engName: "Terminator Genisys",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "终结者：黑暗命运",
                    engName: "Terminator: Dark Fate",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "终结者6",
                    engName: "Terminator: Dark Fate",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "绣春刀",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "绿巨人浩克",
                    engName: "Hulk",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "绿灯侠",
                    engName: "Green Lantern",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "绿皮书",
                    engName: "Green Book",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "绿野仙踪",
                    engName: "The Wizard of Oz",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "罗宾汉：起源",
                    engName: "Robin Hood",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美丽人生",
                    engName: "La vita è bella",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美人鱼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派",
                    engName: "American Pie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派(番外篇)4：集体露营",
                    engName: "American Pie Presents Band Camp",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派(番外篇)5：裸奔",
                    engName: "American Pie Presents The Naked Mile",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派(番外篇)6：兄弟会",
                    engName: "American Pie Presents Beta House",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派(番外篇)7：索爱天书",
                    engName: "American Pie Presents Book of Love",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派2",
                    engName: "American Pie 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派3：美国婚礼",
                    engName: "American Wedding",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派4：美国重逢",
                    engName: "American Reunion",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派5",
                    engName: "American Pie 5",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国派9",
                    engName: "American Pie Presents: Girls' Rules",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国队长",
                    engName: "Captain America: The First Avenger",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国队长2",
                    engName: "Captain America: The Winter Soldier",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美国队长3",
                    engName: "Captain America: Civil War",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美女与野兽",
                    engName: "La belle et la bête",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美女与野兽",
                    engName: "Beauty and the Beast",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "美食总动员",
                    engName: "Ratatouille",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "羞羞的铁拳",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "老男孩猛龙过江",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "肖申克的救赎",
                    engName: "The Shawshank Redemption",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "胡桃夹子和四个王国",
                    engName: "The Nutcracker And The Four Realms",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "自杀小队",
                    engName: "Suicide Squad",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "航海王：狂热行动",
                    engName: "ONE PIECE STAMPEDE",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-10",
                            address: "电影院",
                            accompany: ['孙义和'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "航海王：红发歌姬",
                    engName: "ONE PIECE FILM RED",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "芬奇",
                    engName: "Finch",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "花木兰",
                    engName: "Mulan",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "花木兰动画版",
                    engName: "Mulan",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "电影院",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "范海辛",
                    engName: "Van Helsing",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "荒野猎人",
                    engName: "The Revenant",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "莫斯科陷落",
                    engName: "Притяжение",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蓝甲虫",
                    engName: "Blue Beetle",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蓝精灵",
                    engName: "The Smurfs",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蓝精灵：寻找神秘村",
                    engName: "Smurfs: The Lost Village",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蚁人",
                    engName: "Ant-Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蚁人2：黄蜂女现身",
                    engName: "Ant-Man and the Wasp",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蚁人3：量子狂潮",
                    engName: "Ant-Man and the Wasp: Quantumania",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜂鸟特攻",
                    engName: "Hummingbird",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠",
                    engName: "Spider-Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠2",
                    engName: "Spider-Man 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠3",
                    engName: "Spider-Man 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠：平行宇宙",
                    engName: "Spider-Man: Into the Spider-Verse",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2023-06-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠：纵横宇宙",
                    engName: "Spider-Man: Across the Spider-Verse",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-06-18",
                            address: "万达影城(台东店)",
                            accompany: ['吕荣钊'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠：英雄归来",
                    engName: "Spider-Man: Homecoming",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠：英雄无归",
                    engName: "Spider-Man: No Way Home",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蜘蛛侠：英雄远征",
                    engName: "Spider-Man: Far from Home",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-06-29",
                            address: "苍山开元国际影城",
                            accompany: ['新宇'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蝎子王",
                    engName: "The Scorpion King",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蝙蝠侠",
                    engName: "Batman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蝙蝠侠大战超人：正义黎明",
                    engName: "Batman v Superman: Dawn of Justice",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2017-03-25",
                            address: "电影院",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "蝙蝠侠归来",
                    engName: "Batman Returns",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蝙蝠侠：黑暗骑士",
                    engName: "The Dark Knight",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "蝙蝠侠：黑暗骑士崛起",
                    engName: "The Dark Knight Rises",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "血钻",
                    engName: "Blood Diamond",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "西游记之大圣归来",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "西游记之大闹天宫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "西游降魔篇",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "西虹市首富",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "西西里的美丽传说",
                    engName: "Malèna",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "言叶之庭",
                    engName: "言の葉の庭",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "警察故事",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "让子弹飞",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "临沂",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "诸神之怒",
                    engName: "Wrath of the Titans",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "诸神之战",
                    engName: "Clash of the Titans",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "豚鼠特攻队",
                    engName: "G-Force",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赌侠",
                    engName: "賭俠",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赌侠2：上海滩赌圣",
                    engName: "賭俠II上海灘賭聖",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赌圣",
                    engName: "賭聖",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赌神",
                    engName: "賭神",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赌神2",
                    engName: "賭神2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赛车总动员",
                    engName: "Cars",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赛车总动员2",
                    engName: "Cars 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赛车总动员3：极速挑战",
                    engName: "Cars 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赤壁(上)",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "赤壁(下)",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超人归来",
                    engName: "Superman Returns",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超人总动员",
                    engName: "The Incredibles",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超人总动员2",
                    engName: "Incredibles 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-10",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超人高校",
                    engName: "Sky High",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超人：钢铁之躯",
                    engName: "Man of Steel",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超体",
                    engName: "Lucy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超凡战队",
                    engName: "Power Rangers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超凡蜘蛛侠",
                    engName: "The Amazing Spider-Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超凡蜘蛛侠2",
                    engName: "The Amazing Spider-Man 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超级战舰",
                    engName: "Battleship",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超级马力欧兄弟大电影",
                    engName: "The Super Mario Bros. Movie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超能查派",
                    engName: "Chappie",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超能陆战队",
                    engName: "Big Hero 6",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "超验骇客",
                    engName: "Transcendence",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "越光宝盒",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "辛德勒的名单",
                    engName: "Schindler's List",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "这个杀手不太冷",
                    engName: "Léon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "这个杀手不太冷静",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "送你一朵小红花",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-03-21",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "逃出克隆岛",
                    engName: "The Island",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "逃学威龙",
                    engName: "逃學威龍",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "逃学威龙2",
                    engName: "逃學威龍2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "逃学威龙3之龙过鸡年",
                    engName: "逃學威龍III之龍過雞年",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "透明人",
                    engName: "Hollow Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "逗鸟外传：萌宝满天飞",
                    engName: "Storks",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情",
                    engName: "The Fast and the Furious",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 10
                        }
                    ]
                },


                {
                    movie: "速度与激情2：涡轮增压前奏曲",
                    engName: "Turbo Charged Prelude to 2 Fast ...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情3：东京漂移",
                    engName: "The Fast and the Furious: Tokyo Drift",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情4",
                    engName: "Fast & Furious",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情5",
                    engName: "Fast Five",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情6",
                    engName: "Furious 6",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情7",
                    engName: "Furious 7",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情8",
                    engName: "The Fate of the Furious",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情9",
                    engName: "F9: The Fast Saga",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情10",
                    engName: "Fast X",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "速度与激情：特别行动",
                    engName: "Fast & Furious Presents: Hobbs & Shaw",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "遗落战境",
                    engName: "Oblivion",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "邪不压正",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "里约大冒险",
                    engName: "Rio",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "里约大冒险2",
                    engName: "Rio 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "重返地球",
                    engName: "After Earth",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚",
                    engName: "King Kong",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚川",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚狼",
                    engName: "X-Men Origins: Wolverine",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚狼2",
                    engName: "The Wolverine",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚狼3：殊死一战",
                    engName: "Logan",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金刚：骷髅岛",
                    engName: "Kong: Skull Island",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金蝉脱壳",
                    engName: "Escape Plan",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "金蝉脱壳2：冥府",
                    engName: "Escape Plan 2: Hades",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "釜山行",
                    engName: "부산행",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "钢铁侠",
                    engName: "Iron Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "钢铁侠2",
                    engName: "Iron Man 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "钢铁侠3",
                    engName: "Iron Man 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "钢铁巨人",
                    engName: "The Iron Giant",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "铁甲钢拳",
                    engName: "Real Steel",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "学校教师",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "铁血战士：狩猎",
                    engName: "Predator",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-08-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "铁血战士",
                    engName: "Predator",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "铁血战士2",
                    engName: "Predator 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "铁血战士：猎物",
                    engName: "Prey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "铁血战士2018",
                    engName: "Prey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-12",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "铃芽之旅",
                    engName: "すずめの戸締まり",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-04-14",
                            address: "万达影城(台东店)",
                            accompany: ['吕荣钊'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银河护卫队",
                    engName: "Guardians of the Galaxy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银河护卫队2",
                    engName: "Guardians of the Galaxy Vol. 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银河护卫队3",
                    engName: "Guardians of the Galaxy Vol. 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-05-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银河护卫队：圣诞特别篇",
                    engName: "The Guardians of the Galaxy Holiday S...",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银河系漫游指南",
                    engName: "The Hitchhiker's Guide to the Galaxy",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "银翼杀手2049",
                    engName: "Blade Runner 2049",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "长江七号",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "长津湖",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-09-30",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "长津湖之水门桥",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "闪电侠",
                    engName: "The Flash",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-06-17",
                            address: "万达影城(CBD万达广场IMAX店)",
                            accompany: ['吕荣钊'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "闪电狗",
                    engName: "Bolt",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "闻香识女人",
                    engName: "Scent of a Woman",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿丽塔：战斗天使",
                    engName: "Alita: Battle Angel",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿凡达",
                    engName: "Avatar",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-03-13",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['宋顺', '吕荣钊'],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿凡达2：水之道",
                    engName: "Avatar: The Way of Water",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-12-16",
                            address: "CGV影城(万象城IMAX店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿拉丁",
                    engName: "Aladdin",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿甘正传",
                    engName: "Forrest Gump",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "阿索卡 第一季",
                    engName: "Ahsoka",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 10
                        }
                    ]
                },
                {
                    movie: "降临",
                    engName: "Arrival",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "隐形人",
                    engName: "The Invisible Man",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雨果",
                    engName: "Hugo",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雪国列车",
                    engName: "설국열차",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷神",
                    engName: "Thor",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷神2：黑暗世界",
                    engName: "Thor: The Dark World",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷神3：诸神黄昏",
                    engName: "Thor: Ragnarok",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2020-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷神4：爱与雷霆",
                    engName: "Thor: Love and Thunder",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-07-25",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷霆沙赞！",
                    engName: "Shazam!",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "雷霆沙赞！众神之怒",
                    engName: "Shazam! Fury of the Gods",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "霍元甲",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "霍比特人1：意外之旅",
                    engName: "The Hobbit: An Unexpected Journey",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "霍比特人2：史矛革之战",
                    engName: "The Hobbit: The Desolation of Smaug",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "霍比特人3：五军之战",
                    engName: "The Hobbit: The Battle of the Five Armies",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "霹雳娇娃",
                    engName: "Charlie's Angels",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "青春变形记",
                    engName: "Turning Red",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "非常小特务",
                    engName: "Spy Kids",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "预见未来",
                    engName: "Next",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "领袖水准",
                    engName: "Boss Level",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "风中奇缘",
                    engName: "Pocahontas",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "风之谷",
                    engName: "風の谷のナウシカ",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "风语者",
                    engName: "Windtalkers",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2018-11",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "飓风营救",
                    engName: "Taken",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "飓风营救2",
                    engName: "Taken 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "飓风营救3",
                    engName: "Taken 3",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "飞屋环游记",
                    engName: "Up",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "食神",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "饥饿游戏",
                    engName: "The Hunger Games",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "饥饿游戏2：星火燎原",
                    engName: "The Hunger Games: Catching Fire",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "饥饿游戏3：嘲笑鸟(上)",
                    engName: "The Hunger Games: Mockingjay - Part 1",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "饥饿游戏3：嘲笑鸟(下)",
                    engName: "The Hunger Games: Mockingjay - Part 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "马达加斯加",
                    engName: "Madagascar",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "马达加斯加2：逃往非洲",
                    engName: "Madagascar: Escape 2 Africa",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "马达加斯加3",
                    engName: "Madagascar 3: Europe's Most Wanted",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "马达加斯加的企鹅",
                    engName: "Penguins of Madagascar",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "驯龙高手",
                    engName: "How to Train Your Dragon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "驯龙高手2",
                    engName: "How to Train Your Dragon 2",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "驯龙高手3",
                    engName: "How to Train Your Dragon: The Hidden World",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03-16",
                            address: "银河欢乐影城(黄岛中国巨幕店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "驯龙高手：归家",
                    engName: "How to Train Your Dragon: Homecoming",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魁拔Ⅲ战神崛起",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔兽",
                    engName: "Warcraft",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔发奇缘",
                    engName: "Tangled",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔女宅急便",
                    engName: "魔女の宅急便",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔法保姆麦克菲",
                    engName: "Nanny McPhee",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔法保姆麦克菲2",
                    engName: "Nanny McPhee Returns",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔法师的学徒",
                    engName: "The Sorcerer's Apprentice",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "鹿鼎记",
                    engName: "鹿鼎記",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "鹿鼎记2：神龙教",
                    engName: "鹿鼎記II 神龍教",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄金罗盘",
                    engName: "The Golden Compass",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄飞鸿",
                    engName: "黃飛鴻",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄飞鸿之三：狮王争霸",
                    engName: "黃飛鴻之三獅王爭霸",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄飞鸿之二：男儿当自强",
                    engName: "黃飛鴻之二男兒當自強",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄飞鸿之英雄有梦",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黄飞鸿之铁鸡斗蜈蚣",
                    engName: "黃飛鴻之鐵雞鬥蜈蚣",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑亚当",
                    engName: "Black Adam",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-11-19",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑夜传说",
                    engName: "Underworld",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑夜传说2：进化",
                    engName: "Underworld: Evolution",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑夜传说3：狼族崛起",
                    engName: "Underworld: Rise of the Lycans",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-01",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑夜传说4：觉醒",
                    engName: "Underworld: Awakening",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑夜传说5：血战",
                    engName: "Underworld: Blood Wars",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑客帝国",
                    engName: "The Matrix",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑客帝国2：重装上阵",
                    engName: "The Matrix Reloaded",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑客帝国3：矩阵革命",
                    engName: "The Matrix Revolutions",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑客帝国4：矩阵重启",
                    engName: "The Matrix Resurrections",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-01-05",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "2022-01-14",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },
                {
                    movie: "黑寡妇",
                    engName: "Black Widow",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑暗塔",
                    engName: "The Dark Tower",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑白魔女库伊拉",
                    engName: "Cruella",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑衣人",
                    engName: "Men in Black",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑衣人2",
                    engName: "Men in Black II",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑衣人3",
                    engName: "Men in Black III",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑衣人4：全球追缉",
                    engName: "Men in Black International",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-06",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑衣人：异形入侵",
                    engName: "Men in Black Alien Attack",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑豹",
                    engName: "Black Panther",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑豹2",
                    engName: "Black Panther: Wakanda Forever",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-02-11",
                            address: "CGV影城(万象城IMAX店)",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑鹰坠落",
                    engName: "Black Hawk Down",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "鼠来宝",
                    engName: "Alvin and the Chipmunks",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "龙与地下城：侠盗荣耀",
                    engName: "Dungeons & Dragons: Honor Among Thieves",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "龙之谷：破晓奇兵",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "掠夺城市",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-02",
                            address: "家",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "比悲伤更悲伤的故事",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-03",
                            address: "青岛理工大学",
                            accompany: ['舍友（7）'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "杀手 代号47",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "龙猫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "悬崖上的金鱼姬",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-07",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "咖喱辣椒",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "武装苏乞儿",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "擦枪走火",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-09",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "决战中途岛",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11-09",
                            address: "星轶IMAX影城(黄岛吾悦广场旗舰店)",
                            accompany: ['宋顺'],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "冷血追击",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-11",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "非常人贩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-05",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "最佳女婿",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-06",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "红鞋子和七个小矮人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-07",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "海上钢琴师",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "黑暗阴影",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "女巫猎人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-08",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "魔力女战士",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2020-10",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "创战纪",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-01",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "男人百分百",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-01",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "我们俩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-10-31",
                            address: "",
                            accompany: [],
                            progress: 100
                        }, {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "赛博朋克 边缘世界",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-10-23",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "红色通缉令",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-08-15",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "战争之王",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-08-13",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "巴斯光年",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-07-23",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "北欧人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-05-17",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "和平使者第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-02-28",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "波巴非特之书",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-02-06",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "剃头匠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2022-01-06",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "爱，死亡与机器人第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "爱，死亡与机器人第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-05-14",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "爱，死亡与机器人第三季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "庆余年",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-12",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "戴夫号飞船",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                },
                {
                    movie: "怪物猎人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "人之怒",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "奥维尔号 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        }
                    ]
                }, {
                    movie: "奥维尔号 第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }
                    ]
                }, {
                    movie: "奥维尔号 第三季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        }
                    ]
                }, {
                    movie: "初来乍到 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        }
                    ]
                }, {
                    movie: "黑袍纠察队 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        }
                    ]
                }, {
                    movie: "龙之家族 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 90
                        }
                    ]
                }, {
                    movie: "破产姐妹 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }
                    ]
                }, {
                    movie: "史前战纪 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }
                    ]
                }, {
                    movie: "寄生虫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "嘘！禁止想象",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "安娜",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        }
                    ]
                }, {
                    movie: "安娜贝尔3：回家",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        }
                    ]
                }, {
                    movie: "贝奥武夫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        }
                    ]
                }, {
                    movie: "不扣纽扣的女孩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 90
                        }
                    ]
                }, {
                    movie: "邻家女孩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "赤焰战场",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "炽焰战场2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }, {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 80
                        }
                    ]
                }, {
                    movie: "仿生人妻子",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "华尔街之狼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }, {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "荒野猎人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        },
                    ]
                }, {
                    movie: "克隆人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "空中监狱",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        },
                    ]
                }, {
                    movie: "李米的猜想",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        },
                    ]
                }, {
                    movie: "前哨",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "杀手47新版",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "王牌贱谍",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "温暖的抱抱",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "我是大哥大剧场版",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "我想和你好好的",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "逍遥法外",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 20
                        },
                    ]
                }, {
                    movie: "王牌贱谍",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "沉睡谷 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "一路向西",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "前任3",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "陷阱：致命的诱惑",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "伦敦战场",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "王者少年",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "起风了",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "起风了",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "美少女特工队",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "暗黑正义联盟：天启星战争",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "特工绍特加长版",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "慈禧的秘密生活",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "黑帮大佬和我的365日",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "辣手保姆",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "老男孩",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "苹果核战记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "苹果核战记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "苹果核战记2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "苹果核战记3",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "金瓶梅",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "金瓶梅2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "花容月貌",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "调音师",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "仿生人妻子",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "荣誉团队",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "红杏出墙",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "洛丽塔",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "危笑",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "海贼王：红发歌姬",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "迪迦奥特曼大电影",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "洛基 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "洛基 第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "鹰眼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "反斗神鹰",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "东北警察故事",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "假如 第一季",
                    engName: "what if",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2021-08-11",
                            address: "家",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "鹰眼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "天际浩劫",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "天际浩劫2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "钢铁苍穹",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "钢铁苍穹2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "字典情人",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "猛兽侠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-02",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "冰菓",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "亮剑",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-04",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "魔幻手机",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "超神学院之黑甲",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "诸天降临",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "沼泽怪物",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-05",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "我是大哥大",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2019-10",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "铁臂阿童木",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "天上掉下个猪八戒",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "星际争霸战 影子掠夺者",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "鼹鼠的故事大电影",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "鼹鼠的故事",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "喜羊羊与灰太狼",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "哪吒传奇",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "数码宝贝",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "火力少年王",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "小鲤鱼历险记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "四驱兄弟",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "成龙历险记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "花园宝宝",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "恐龙宝贝",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 10
                        },
                    ]
                }, {
                    movie: "超兽武装 第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "超兽武装 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "虹猫蓝兔七侠传",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "变形金刚G1",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "神厨小福贵",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "葫芦娃",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "黑猫警长",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "洛洛历险记",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "蓝猫淘气三千问",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "熊出没",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "围棋少年",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "帽儿山的鬼子兵",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "果宝特工 第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 100
                        },
                    ]
                }, {
                    movie: "果宝特工 第一季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "猪猪侠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "福五鼠",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "神笔马良",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "拾荒者统治",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-11-10",
                            address: "",
                            accompany: ['璨璨'],
                            progress: 50
                        },
                    ]
                }, {
                    movie: "武林外传",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-11-27",
                            address: "",
                            accompany: ['璨璨'],
                            progress: 50
                        },
                    ]
                },{
                    movie: "海王2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-12-20",
                            address: "青岛万象城IMAX",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "爱情公寓 第四季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },{
                    movie: "爱情公寓 第五季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "",
                            address: "",
                            accompany: [],
                            progress: 50
                        }
                    ]
                }, {
                    movie: "假如 第二季",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2023-12-30",
                            address: "优住公寓",
                            accompany: [],
                            progress: 50
                        }
                    ]
                },{
                    movie: "纳尼亚传奇2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-01-12",
                            address: "优住公寓",
                            accompany: ['璨璨'],
                            progress: 50
                        }
                    ]
                },{
                    movie: "阿盖尔：神秘特工",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-02-27",
                            address: "青岛万象城IMAX",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "风平浪静",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-02-11",
                            address: "清华园",
                            accompany: [],
                            progress: 100
                        },
                    ]
                },{
                    movie: "功夫熊猫4",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-03-09",
                            address: "青岛万象城IMAX",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "沙丘2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-03-08",
                            address: "青岛万象城IMAX",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "哥斯拉大战金刚2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-02-27",
                            address: "青岛万象城IMAX",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "庆余年2",
                    engName: "",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-06-03",
                            address: "芙蓉路96号",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },{
                    movie: "致命女人",
                    engName: "Kills wemon",
                    persionScore: 0,
                    collect: "",
                    total: [
                        {
                            time: "2024-06-15",
                            address: "芙蓉路96号",
                            accompany: ['璨璨'],
                            progress: 100
                        },
                    ]
                },
            ]
        }
    },
    methods: {
        test() {
            let max = 999999
            let min = 100000
            let key = Math.floor(Math.random() * (max - min + 1)) + min
            return '#' + key
        },
        // 每页多少条
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        sumWatch() {
            let sum = 0
            for (let i = 0; i < this.list.length; i++) {
                for (let k = 0; k < this.list[i].total.length; k++) {
                    sum = sum + 1
                }
            }
            return sum
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
                index: index,
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
            let fullLength = '' // 日期补全便于计算
            if (lastWatchDay.length == 10) { // xxxx-xx-xx
                fullLength = lastWatchDay
            } else if (lastWatchDay.length == 7) { // xxxx-xx
                fullLength = lastWatchDay + '-01'
            } else if (lastWatchDay.length == 4) {
                fullLength = lastWatchDay + '-01-01'
            } else {
                return '很久之前'
            }
            return getFormatedStringFromDays(getDaysBetween(fullLength, this.getToday()))
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
    font-weight: 600;
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
    background-color: white;
    /* padding: 5px; */
    /* border-radius: 8px; */
    /* 鼠标指针 */
    cursor: pointer;
    /* 禁止选中 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    transition: all 0.3s;
}


.movie_card:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.testBorder {
    border: 1px solid #cccccc;
    margin: 2px;
}

.flex_container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 12px;
}

.flex_container>div {
    /* margin: 10px; */
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