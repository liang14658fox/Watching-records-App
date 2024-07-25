<template>
	<div>
		<!-- <div style="width: 300px;">
			还有 {{ 'XX' }} 天 {{ '发售' }} / 已经发售 {{ 'XX' }} 天
			<hr>
			名称 / English Name (用来检索)
			<hr>
			发售日
			<hr>
			类型
			<hr>
			收藏情况
		</div> -->
		<el-radio-group v-model="year" size="mini" style="margin: 0 0 8px 0;">
			<el-radio-button v-for="(val, key, index) in result" :label="key"></el-radio-button>
		</el-radio-group>
		<div v-for="(item, index) in result_2(year)" :key="index" style="width: 100%;display: flex;" class="year_month">
			<div class="month"
				:style="{ 'background-color': (doHandleMonth() == item.month ? 'blue' : doHandleMonth() > item.month ? '#cccccc' : 'green') }">
				<span>{{ item.month }}月</span>
			</div>
			<div class="flex_container">
				<card_item v-for="(item, index) in item.value" :key="index" :itemValue='item'></card_item>
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
		</div>
	</div>
</template>

<script>
import card_item from './card_item.vue';
export default {
	components: {
		card_item
	},
	name: 'HelloWorld',
	props: {
		msg: String
	},
	created() {
		this.result = this.array_year_month(this.listData)
		console.log(this.result, 'this.result')
	},
	methods: {
		doHandleMonth() { // 获得当前月份
			var myDate = new Date();
			var tMonth = myDate.getMonth();
			var m = tMonth + 1;
			if (m.toString().length == 1) {
				m = "0" + m;
			}
			return m;
		},
		result_2(year) {
			// 使用v-for遍历对象会导致顺序错乱，转换为数组
			let arr = []
			let obj = this.result[year]
			for (var prop in obj) {
				arr.push({
					month: prop,
					value: obj[prop],
				})
			}
			return arr.sort((a, b) => {
				return (a.month - b.month)
			})
		},
		array_year_month(data) {
			// 根据日期属性分组
			let groupedData = data.reduce((acc, obj) => {
				let year = obj.date.split('-')[0];
				let month = obj.date.split('-')[1];

				if (!acc[year]) {
					acc[year] = {};
				}

				if (!acc[year][month]) {
					acc[year][month] = [];
				}

				acc[year][month].push(obj);
				return acc;
			}, {});
			console.log(groupedData)
			// 输出分组后的对象
			return groupedData
		}
	},
	data() {
		return {
			type: [{
				action: '播出',
				type: '电视剧',
			}, {
				action: '上映',
				type: '电影',
			}, {
				action: '发布',
				type: '产品',
			}, {
				action: '发售',
				type: '游戏',
			}],
			year: '2023',
			result: [],
			listData: [{
				date: '2024-12-31',
				name: 'PS5 pro 发布'
			}, {
				date: '2077-12-31',
				name: 'iphoneSE 4 发布'
			}, {
				date: '2077-12-31',
				name: '三体美剧 播出'
			}, {
				date: '2077-12-31',
				name: '光环2 播出'
			}, {
				date: '2023-12-07',
				name: '阿凡达：潘多拉边境 发售'
			}, {
				date: '2077-12-31',
				name: '腐烂国度3 宣发'
			}, {
				date: '2077-12-31',
				name: '星际争霸3 宣发'
			}, {
				date: '2024-02',
				name: '家园3'
			}, {
				date: '2077-12-31',
				name: '王国之泪 DLC宣发'
			}, {
				date: '2024-02-14',
				name: '蜘蛛女 上映'
			}, {
				date: '2023-10-20',
				name: '波西·杰克逊与奥林匹斯众神 播出'
			}, {
				date: '2024-01-24',
				name: '正义联盟 无限地球危机 上映'
			}, {
				date: '2024-01-11',
				name: '泰迪熊 播出'
			}, {
				date: '2024-04-12',
				name: '辐射 播出'
			}, {
				date: '2024-08-31',
				name: '龙之家族 第二季（夏季） 播出'
			}, {
				date: '2024-02-08',
				name: '光环 第二季 播出'
			}, {
				date: '2024-04-12',
				name: '哥斯拉大战金刚2 上映'
			}, {
				date: '2024-01-12',
				name: '养蜂人 上映'
			}, {
				date: '2023-11-10',
				name: 'ps5 slim 发售'
			}, {
				date: '2023-11-16',
				name: 'steam deck oled 发售'
			}, {
				date: '2023-09-21',
				name: '生化危机4重制版DLC 发售',
			}, {
				date: '2023-09-01',
				name: '博德之门3 发售',
			}, {
				date: '2077-12-31',
				name: '功夫熊猫4 预告 发布',
			}, {
				date: '2023-07-21',
				name: '皮克敏4 发售',
			}, {
				date: '2023-10-23',
				name: '超级马里奥兄弟奇迹 发售',
			}, {
				date: '2023-10-20',
				name: '沙丘2 上映',
			}, {
				date: '2077-12-31',
				name: '风暴崛起 发售',
			}, {
				date: '2023-08-04',
				name: '巨齿鲨2 上映',
			}, {
				date: '2023-07-14',
				name: '碟中谍7（上） 上映',
			}, {
				date: '2077-12-31',
				name: '力量之戒第二季 播出',
			}, {
				date: '2077-12-31',
				name: '龙之家族第二季 播出',
			}, {
				date: '2077-12-31',
				name: '阿索卡单人剧 播出',
			}, {
				date: '2077-12-31',
				name: '曼达洛人第四季 播出',
			}, {
				date: '2077-12-31',
				name: '阿凡达3 上映',
			}, {
				date: '2077-12-31',
				name: '蜘蛛侠：纵横宇宙（下） 上映',
			}, {
				date: '2077-12-31',
				name: '速度与激情10（下） 上映',
			}, {
				date: '2077-12-31',
				name: '王国之泪amibo 发售',
			}, {
				date: '2077-12-31',
				name: '大灾变Cataclismo 发布',
			}, {
				date: '2077-12-31',
				name: '大陆酒店 播出',
			}, {
				date: '2077-12-31',
				name: '碟中谍7（下） 上映',
			}, {
				date: '2024-12-31',
				name: '粘粘世界2 发售',
			}, {
				date: '2024-02-16',
				name: '育碧黑帆 发售',
			}, {
				date: '2024-12-31',
				name: '黑帝斯2',
			}, {
				date: '2024-03-01',
				name: '恶意不息（奥日新作）',
			}, {
				date: '2024-08-20',
				name: '黑神话 悟空',
			}, {
				date: '2023-12-15',
				name: '小鸡快跑2 上映',
			}, {
				date: '2023-12-20',
				name: '海王2 上映',
			}, {
				date: '2023-12-22',
				name: '假如第二季 播出',
			}, {
				date: '2024-01-30',
				name: '风来之国 DLC 发售',
			}, {
				date: '2024-02-08',
				name: '地狱潜兵2 发售',
			}]
		}
	},
}
</script>

<style scoped>
.month {
	background-color: darkred;
	padding: 10px;
	/* width: 70px; */
	display: flex;
	justify-content: center;
	align-items: center;
	color: aliceblue;
}

.year_month {
	width: 100%;
	border: 1px solid black;
	box-sizing: border-box;
	/* 启动换行 */
}

.flex_container {
	width: 95%;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
}

.flex_container>div {
	cursor: pointer;
	flex: 1;
	min-width: 170px;
}

.empty_card {
	height: 0;
	margin-top: 0;
	/* 宽度和高度都设置为0，不占用空间 */
	/* 不可以忘记margin，否则有可能对不齐 */
}
</style>
