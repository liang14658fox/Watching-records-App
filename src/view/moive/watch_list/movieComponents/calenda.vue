<template>
    <div>
        1
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        list: Array
    },
    created() {
        
        console.log(this.list)
        // this.testSort() 
        this.algorithm(this.list)
    },
    data() {
        return {
            renderingList:[],
        }
    },
    methods: {
        algorithm(ObjArr) {
            let new_Arr = []
            for (let i = 0; i < ObjArr.length; i++) {
                for (let k = 0; k < ObjArr[i].total.length; k++) {
                    new_Arr.push({
                        accompany: ObjArr[i].total[k].accompany,
                        address: ObjArr[i].total[k].address,
                        progress: ObjArr[i].total[k].progress,
                        time: ObjArr[i].total[k].time,
                        collect: ObjArr[i].collect,
                        movie: ObjArr[i].movie,
                        persionScore: ObjArr[i].persionScore,
                    })
                }
            }
            for (let x = 0; x < new_Arr.length; x++) {
                new_Arr.sort((a, b) => a.time.localeCompare(b.time) || a.time.localeCompare(b.time));
            }
            console.table(new_Arr)
        },
        testSort() { // 排序可对'yyyy','yyyy-MM','yyyy-MM-dd'同时进行排序，空字符串排在最前面
            let testArr = [
                {
                    time: '2021',
                    id: '1',
                }, {
                    time: '2020-01-02',
                    id: '1',
                }, {
                    time: '2022',
                    id: '1',
                }, {
                    time: '2022-01-01',
                    id: '1',
                }, {
                    time: '2021-10-31',
                    id: '1',
                }, {
                    time: '2023',
                    id: '1',
                }, {
                    time: '2021-01',
                    id: '1',
                }, {
                    time: '',
                    id: '1',
                }, {
                    time: '',
                    id: '1',
                }, {
                    time: '2021-11',
                    id: '1',
                }, {
                    time: '2020',
                    id: '1',
                }, {
                    time: '2022-01',
                    id: '1',
                },
            ]
            for (let x = 0; x < testArr.length; x++) {
                testArr.sort((a, b) => a.time.localeCompare(b.time) || a.time.localeCompare(b.time));
            }
            console.log(
                '%c打印➜:', 'background:green;color:#fff;padding:4px;', testArr)
        }
    },
}
</script>

<style scoped></style>