<!-- <template>
	<div>
		<div style="border: 1px solid #2e2e2f;width: 400px;">
			<div style="display: flex;">
				<div style="width: 50%;background-color: #9fa4aa;height: 160px;">
					图片
				</div>
				<div>
					电影信息
				</div>
			</div>
			<div style="display: flex;">
				<div>
					第一次观看日期：{{ '' }}<br/>
					最后一次观看日期：{{ '' }}<br/>
					观看次数总计：{{ '' }}<br/>
					本次观看次数：{{ '' }}<br/>
					于影院观看次数：{{ '' }}<br/>
				</div>
				<div>
					观看方式：{{ '' }}<br/>
					观看地点：{{ '' }}<br/>
					观看类型：{{ '' }}<br/>
					距离上次观看日期已经过去：{{ '' }}<br/>
					观影陪同：{{ '' }}<br/>
					收藏清空：{{ '' }}<br/>
				</div>
			</div>
		</div>
		<div class="task" draggable="true">
		  <div class="tags">
		    <span class="tag">Draggable</span>
		    <button class="options">
		      <svg xml:space="preserve" viewBox="0 0 41.915 41.916" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" fill="#000000"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z"></path> <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z"></path> <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z"></path> </g> </g> </g></svg>
		    </button>
		  </div>
		  <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown </p>
		  <div class="stats">
		    <div>
		      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"></path> <circle stroke-width="2" r="9" cy="12" cx="12"></circle> </g></svg>Feb 24</div>
		      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path> </g></svg>18</div>
		      <div><svg fill="#000000" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path fill="#000000" d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"> </path> </g></svg>7</div>
		    </div>
		    <div class="viewer">
		      <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"></path> </g></svg></span>
		      <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"></path> </g></svg></span>
		      <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"></path> </g></svg></span>
		      <span>+20</span>
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
				list: [{
					lastWatch: '', // 第一次观看日期
					firstWatch: '', // 最后一次观看日期
					number: 5, // 观看次数总计
					thisNum: 4, // 本次观看次数
					localNum: 1, // 于影院观看次数
					way: ['院线', '下载', 'IMAX'], // 观看方式
					place: '青岛万象城', // 观看地点
					type: '英语 2D',
					far: 90, // 距离上次观看日期已经过去
					people: ['独自观影', '王珩'], // 观影陪同
					collect: '', // 是否已收藏/下载/购买盒装
				}]
			}
		}
	}
</script>

<style scoped>
	.task {
	  position: relative;
	  color: #2e2e2f;
	  cursor: move;
	  background-color: #fff;
	  padding: 1rem;
	  border-radius: 8px;
	  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
	  margin-bottom: 1rem;
	  border: 3px dashed transparent;
	  max-width: 350px;
	}
	
	.task:hover {
	  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
	  border-color: rgba(162, 179, 207, 0.2) !important;
	}
	
	.task p {
	  font-size: 15px;
	  margin: 1.2rem 0;
	}
	
	.tag {
	  border-radius: 100px;
	  padding: 4px 13px;
	  font-size: 12px;
	  color: #ffffff;
	  background-color: #1389eb;
	}
	
	.tags {
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	}
	
	.options {
	  background: transparent;
	  border: 0;
	  color: #c4cad3;
	  font-size: 17px;
	}
	
	.options svg {
	  fill: #9fa4aa;
	  width: 20px;
	}
	
	.stats {
	  position: relative;
	  width: 100%;
	  color: #9fa4aa;
	  font-size: 12px;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	}
	
	.stats div {
	  margin-right: 1rem;
	  height: 20px;
	  display: flex;
	  align-items: center;
	  cursor: pointer;
	}
	
	.stats svg {
	  margin-right: 5px;
	  height: 100%;
	  stroke: #9fa4aa;
	}
	
	.viewer span {
	  height: 30px;
	  width: 30px;
	  background-color: rgb(28, 117, 219);
	  margin-right: -10px;
	  border-radius: 50%;
	  border: 1px solid #fff;
	  display: grid;
	  align-items: center;
	  text-align: center;
	  font-weight: bold;
	  color: #fff;
	  padding: 2px;
	}
	
	.viewer span svg {
	  stroke: #fff;
	}
	
	

</style> -->
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