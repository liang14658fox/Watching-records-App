<template>
    <div>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table ref="filterTable" :data="tableData" style="width: 100%" border stripe>
            <el-table-column type="index" width="50" align="center" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="电影名称" width="180">
                <template slot-scope="scope">
                    <span style="font-weight: 600;">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="上映日期" width="110" sortable>
            </el-table-column>
            <el-table-column prop="unversal" label="616宇宙" width="100" align="center"
                :filters="[{ text: '616宇宙', value: '616' }, { text: '非616宇宙', value: '？' }]" :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="accompany" label="发行" width="75" align="center">
            </el-table-column>
            <el-table-column prop="season" label="阶段" width="75" align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80" align="center"
                :filters="[{ text: '电影', value: '电影' }, { text: '剧集', value: '剧集' }]" :filter-method="filterHandler">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type == '电影'" type="primary">电影</el-tag>
                    <el-tag v-if="scope.row.type == '剧集'" type="success">剧集</el-tag>
                    <el-tag v-if="scope.row.type == '特别篇'" type="warning">特别篇</el-tag>
                </template>
            </el-table-column>
        </el-table>
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
            tableData: [
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2008',
                    season: '1',
                    type: '电影',
                    name: "钢铁侠"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2008',
                    season: '1',
                    type: '电影',
                    name: "无敌浩克"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2010',
                    season: '1',
                    type: '电影',
                    name: "钢铁侠2"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2011',
                    season: '1',
                    type: '电影',
                    name: "雷神"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2011',
                    season: '1',
                    type: '电影',
                    name: "美国队长"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2012',
                    season: '1',
                    type: '电影',
                    name: "复仇者联盟"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2013',
                    season: '2',
                    type: '电影',
                    name: "钢铁侠3"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2013',
                    season: '2',
                    type: '电影',
                    name: "雷神2：黑暗世界"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2014',
                    season: '2',
                    type: '电影',
                    name: "美国队长2：冬日战士"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2014',
                    season: '2',
                    type: '电影',
                    name: "银河护卫队"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2015',
                    season: '2',
                    type: '电影',
                    name: "复仇者联盟2：奥创纪元"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2015',
                    season: '2',
                    type: '电影',
                    name: "蚁人"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2016',
                    season: '3',
                    type: '电影',
                    name: "美国队长3：内战"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2016',
                    season: '3',
                    type: '电影',
                    name: "奇异博士"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2017',
                    season: '3',
                    type: '电影',
                    name: "银河护卫队2"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2017',
                    season: '3',
                    type: '电影',
                    name: "蜘蛛侠：英雄归来"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2017',
                    season: '3',
                    type: '电影',
                    name: "雷神3：诸神黄昏"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2018',
                    season: '3',
                    type: '电影',
                    name: "黑豹"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2018',
                    season: '3',
                    type: '电影',
                    name: "复仇者联盟3：无限战争"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2018',
                    season: '3',
                    type: '电影',
                    name: "蚁人2：黄蜂女现身"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2019',
                    season: '3',
                    type: '电影',
                    name: "惊奇队长"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2019',
                    season: '3',
                    type: '电影',
                    name: "复仇者联盟4：终局之战"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2019',
                    season: '3',
                    type: '电影',
                    name: "蜘蛛侠：英雄远征"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '',
                    season: '4',
                    type: '剧集',
                    name: "旺达·幻视"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2021',
                    season: '4',
                    type: '电影',
                    name: "黑寡妇"
                },
                {
                    unversal: '平行宇宙',
                    accompany: 'Marvel',
                    date: '2021',
                    season: '4',
                    type: '剧集',
                    name: "假如…？第一季"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2021',
                    season: '4',
                    type: '电影',
                    name: "尚气与十环传奇"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2021',
                    season: '4',
                    type: '电影',
                    name: "永恒族"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2021',
                    season: '4',
                    type: '剧集',
                    name: "鹰眼"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '',
                    season: '4',
                    type: '电影',
                    name: "蜘蛛侠：英雄无归"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '剧集',
                    name: "月光骑士"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '',
                    season: '4',
                    type: '电影',
                    name: "奇异博士2：疯狂多元宇宙"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '剧集',
                    name: "惊奇女士"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '剧集',
                    name: "雷神4：爱与雷霆"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '剧集',
                    name: "我是格鲁特第一季"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '剧集',
                    name: "黑豹2：瓦坎达万岁"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2022',
                    season: '4',
                    type: '特别篇',
                    name: "银河护卫队：圣诞特别篇"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2023',
                    season: '5',
                    type: '电影',
                    name: "蚁人3：量子狂潮"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2023',
                    season: '5',
                    type: '电影',
                    name: "银河护卫队3"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2023',
                    season: '5',
                    type: '剧集',
                    name: "秘密入侵"
                },
                {
                    unversal: '616',
                    accompany: 'Marvel',
                    date: '2023',
                    season: '5',
                    type: '电影',
                    name: "惊奇队长2：惊奇联盟"
                },
                {
                    unversal: '平行宇宙',
                    accompany: 'Marvel',
                    date: '2023',
                    season: '5',
                    type: '剧集',
                    name: "假如…？第二季"
                },
                {
                    unversal: '？',
                    accompany: '',
                    date: '2022',
                    season: '',
                    type: '电影',
                    name: "暗夜博士 "
                },
                {
                    unversal: '？',
                    accompany: '',
                    date: '',
                    season: '',
                    type: '电影',
                    name: "毒液1"
                },
                {
                    unversal: '？',
                    accompany: '',
                    date: '',
                    season: '',
                    type: '电影',
                    name: "毒液2"
                },
                {
                    unversal: '？',
                    accompany: '',
                    date: '',
                    season: '',
                    type: '剧集',
                    name: "女浩克"
                }
            ]
        }
    },
    methods: {
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
    },
}
</script>

<style scoped></style>