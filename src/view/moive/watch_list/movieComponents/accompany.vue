<template>
    <div style="border: 1px solid #cccccc;">
        <div>
            日期：{{ watch_Number_Details.time || 'Long ago' }}
        </div>
        <div>
            地址：{{ watch_Number_Details.address }}
        </div>
        <div style="margin-top: 5px;display: flex;">
            陪同：<div v-for="(item, index) in watch_Number_Details.accompany" :key="index">
                <el-tooltip class="item" effect="dark" :content="item" placement="top">
                    <div>
                        <el-avatar slot="reference" shape="square" size="small" style="margin-right: 8px;"
                            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
                        </el-avatar>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <div style="">
            <div>进度：</div>
            <div>
                <el-progress :percentage="watch_Number_Details.progress" :color="customColor"></el-progress>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        watch_Number_Details: Object
    },
    created() {

    },
    data() {
        return {
            customColor: '#409eff',
        }
    },
    methods: {
    },
}
</script>

<style scoped></style>