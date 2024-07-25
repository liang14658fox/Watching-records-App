<template>
    <div style="background-color: white;border: 1px solid #cccccc;padding: 10px;">
        <el-form ref="form1" :model="formParams" label-width="100px">
            <div class="flex_container">
                <div>
                    <el-form-item label="电影名称" prop="accompany">
                        <el-input class="inputWidth" size="mini" v-model="formParams.name"
                            placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="类型" prop="accompany">
                        <el-select size="mini" clearable v-model="formParams.type" placeholder="请选择"
                            style="width: 100%;">
                            <el-option label="电影" value="电影"></el-option>
                            <el-option label="电视剧" value="电视剧"></el-option>
                            <el-option label="游戏" value="游戏"></el-option>
                            <el-option label="小说" value="小说"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!-- <div>
                    <el-form-item label="电影分类" prop="accompany">
                        <el-select size="mini" clearable v-model="formParams.accompany" placeholder="请选择"
                            style="width: 100%;">
                            <el-option label="科幻" value="01"></el-option>
                            <el-option label="动作" value="02"></el-option>
                        </el-select>
                    </el-form-item>
                </div> -->
                <div>
                    <el-form-item label="收藏情况" prop="collect">
                        <el-select size="mini" clearable v-model="formParams.collect" placeholder="请选择"
                            style="width: 100%;">
                            <el-option label="4k" value="1"></el-option>
                            <el-option label="1080p" value="2"></el-option>
                            <el-option label="蓝光" value="3"></el-option>
                            <el-option label="未发售" value="4"></el-option>
                            <el-option label="暂未收藏" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="观看时间" prop="time">
                        <div class="block">
                            <el-date-picker class="inputWidth" size="mini" v-model="formParams.time" type="daterange"
                                align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" :picker-options="pickerOptions">
                            </el-date-picker>
                            <!-- <el-date-picker clearable v-model="formParams.accompany" type="date" placeholder="请选择"
                                style="width: 100%;" value-format="yyyyMMdd">
                            </el-date-picker> -->
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="观影次数" prop="accompany">
                        <el-input class="inputWidth" type="number" size="mini" v-model="formParams.accompany"
                            placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex;">
                    观看次数
                    <el-switch style="display: block" v-model="formParams.sort" active-color="#13ce66"
                        inactive-color="#ff4949" active-text="升序" inactive-text="降序">
                    </el-switch>
                </div>
                <div style="display: flex;">
                    距离上次观看
                    <el-switch style="display: block" v-model="formParams.sort" active-color="#13ce66"
                        inactive-color="#ff4949" active-text="升序" inactive-text="降序">
                    </el-switch>
                </div>
                <div>
                    <el-form-item label="参与人">
                        <el-input class="inputWidth" size="mini" v-model="formParams.accompany"
                            placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="进度">
                        <el-select size="mini" clearable v-model="formParams.accompany" placeholder="请选择"
                            style="width: 100%;">
                            <el-option label="已看完" value="1"></el-option>
                            <el-option label="未看完" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="观影地址">
                        <el-input class="inputWidth" size="mini" v-model="formParams.address" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex;">
                    <el-form-item style="margin-left: auto;">
                        <el-button icon="el-icon-refresh-right" type="" size="mini" @click="reset()">重置</el-button>
                        <el-button icon="el-icon-search" type="primary" size="mini" @click="onSubmit()">查询</el-button>
                    </el-form-item>
                </div>
                <div class="empty_card">

                </div>
                <div class="empty_card">

                </div>
                <div class="empty_card">

                </div>
            </div>
        </el-form>
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
            options: [
                {
                    label: '全部',
                    value: '0'
                }, {
                    label: '喜剧',
                    value: '1'
                }, {
                    label: '爱情',
                    value: '2'
                }, {
                    label: '动作',
                    value: '3'
                }, {
                    label: '科幻',
                    value: '4'
                }, {
                    label: '动画',
                    value: '5'
                }, {
                    label: '惊悚',
                    value: '6'
                },
            ],
            formParams: {
                movie: {
                    name: '',
                    type: '',
                },
                type: '', // 卡片类型 （游戏、电影、小说）
                date: '', // 观影日期
                collect: '', // 收藏情况
                progress: '',
                WatchSum: '',
                sort: {

                }
            },
            pickerOptions: {
                shortcuts: [{
                    text: '2023年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2022年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2021年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2020年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2019年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2018年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '2017年及以前',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },

        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            // this.loading = true
        },
        reset() {

        }
    },
}
</script>

<style scoped>
.inputWidth {
    width: 245px;
}

.flex_container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    padding-right: 20px;
    padding-left: 20px;
    position: relative;
}

.flex_container>div {
    flex: 1;
    min-width: 300px;
    height: 30px;
    /* margin-bottom: 10px; */
}

.empty_card {
    height: 0;
    margin-top: 0;
}
</style>