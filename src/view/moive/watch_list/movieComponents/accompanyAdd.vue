<template>
    <div>

        <div v-if="!(setting || add)">日期:{{ formData.time || 'Long ago' }}</div>
        <div v-if="(setting || add)">
            日期:
            <el-date-picker size="mini"  v-model="formData.time" align="right" type="date" placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div v-if="!(setting || add)">地址:{{ formData.address }}</div>
        <div v-if="(setting || add)">
            地址:<el-input size="mini"  placeholder="请输入内容" v-model="formData.address" clearable>
            </el-input>
        </div>
        <div style="margin-top: 5px;display: flex;">
            <div v-if="!(setting || add)" v-for="(item, index) in formData.accompany" :key="index">
                <el-tooltip class="item" effect="dark" :content="item" placement="top">
                    <div>
                        <el-avatar slot="reference" shape="square" size="small" style="margin-right: 8px;"
                            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
                        </el-avatar>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <div v-if="(setting || add)">
            <el-select size="mini" v-model="formData.accompany" multiple placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div>
            <span>
                进度:
                <el-progress :percentage="formData.progress" :color="customColor">
                </el-progress>
            </span>
            <el-button-group v-if="(setting || add)">
                <el-button icon="el-icon-minus" size="mini"  @click="decrease()"></el-button>
                <el-button icon="el-icon-plus" size="mini"  @click="increase()"></el-button>
            </el-button-group>
        </div>
        <div v-if="(setting || add)" style="display: flex;margin-top: 8px;">
            <el-button style="margin-left: auto;" size="mini" type="" @click="setting = false">取消</el-button>
            <el-button size="mini" type="success" @click="setting = false">保存</el-button>
        </div>
        <div v-if="!(setting || add)" style="display: flex;margin-top: 8px;">
            <el-button size="mini" type="" icon="el-icon-s-tools" @click="setting = true"></el-button>
        </div>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        comParams_receive_watch_Number_Details: Object,
        setting: Boolean,
        add: Boolean
    },
    created() {
        if (this.watch_Number_Details) {
            this.formData = this.watch_Number_Details
        }
    },
    data() {
        return {
            formData: {

            },
            customColor: '#409eff',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        }
    },
    methods: {
        increase() {
            this.formData.progress += 10;
            if (this.formData.progress > 100) {
                this.formData.progress = 100;
            }
        },
        decrease() {
            this.formData.progress -= 10;
            if (this.formData.progress < 0) {
                this.formData.progress = 0;
            }
        }
    },
}
</script>

<style scoped></style>