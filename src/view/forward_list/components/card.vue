<template>
    <div class="card">
        <!-- 收藏情况 -->
        <label class="ui-bookmark">
            <input type="checkbox">
            <div class="bookmark">
                <svg viewBox="0 0 32 32">
                    <g>
                        <path
                            d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z">
                        </path>
                    </g>
                </svg>
            </div>
        </label>
        <!-- 名称 -->
        <div class="test">
            {{ itemValue.name.substring(0, itemValue.name.length - 2) }}
        </div>
        <div style="display: flex;margin: 10px -3px 0 0;">
            <!-- 计算发售日期 -->
            <div style="color: #989898;">
                <span
                    v-if="(getDaysBetween(getTodayDate(), itemValue.date) - 1 > 0) && (getDaysBetween(getTodayDate(), itemValue.date) - 1 < 10000)">
                    还有
                    <span class="code">
                        {{ getDaysBetween(getTodayDate(), itemValue.date) - 1 }}
                    </span>
                    天
                </span>
                <span v-else-if="getDaysBetween(getTodayDate(), itemValue.date) - 1 == 0">
                    今日
                </span>
                <span v-else-if="getDaysBetween(getTodayDate(), itemValue.date) - 1 > 10000">
                    未知日期
                </span>
                <span v-else>
                    已
                </span>
                <span class="code" v-if="getDaysBetween(getTodayDate(), itemValue.date) - 1 < 10000">
                    {{
                        itemValue.name.slice(itemValue.name.length -
                            2, itemValue.name.length) }}
                </span>
            </div>
            <!-- 类型 -->
            <div class="time" style="width: 55px;">
                {{ findTpyeByStr(
                    itemValue.name.slice(itemValue.name.length -
                        2, itemValue.name.length)) }}
            </div>
            <!-- 日期 -->
            <div class="time" style="margin-left: 5px;"
                :style="{ 'background-color': (getDaysBetween(getTodayDate(), itemValue.date) - 1 == 0 ? 'yellow' : '') }">
                {{ itemValue.date }}
            </div>


        </div>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        itemValue: Object,
        types: Object,
    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {
        findTpyeByStr(str) {
            for (let i = 0; i < this.types.length; i++) {
                if (this.types[i].action == str) {
                    return this.types[i].type
                }
            }
        },
        getTodayDate() {
            let date = new Date(),
                year = date.getFullYear(), //获取完整的年份(4位)
                month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
                strDate = date.getDate() // 获取当前日(1-31)
            if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
            if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
            // console.log(`${year}-${month}-${strDate}`)
            return `${year}-${month}-${strDate}`
        },
        getDaysBetween(date1, date2) { // 计算两个日期之间的天数
            var startDate = Date.parse(date1);
            var endDate = Date.parse(date2);
            if (startDate > endDate) {
                return 0;
            }
            if (startDate == endDate) {
                return 1;
            }
            var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
            console.log('dats', days)
            return days;
        }

    },
}
</script>

<style scoped>
.time {
    margin-left: auto;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    height: 21px;
    width: 105px;
    color: #848484;
    text-align: center;
}

.code {
    color: #12312d;
}

.card {
    background-color: #fefcfc;
    height: auto;
    /* width: 100%; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 10px;
    position: relative;
}

.card:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.test {
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-bottom: 5px;
}


.ui-bookmark {
    position: absolute;
    top: 12px;
    right: 5px;
    --icon-size: 24px;
    --icon-secondary-color: rgb(77, 77, 77);
    --icon-hover-color: rgb(97, 97, 97);
    --icon-primary-color: gold;
    --icon-circle-border: 1px solid var(--icon-primary-color);
    --icon-circle-size: 35px;
    --icon-anmt-duration: 0.3s;
}

.ui-bookmark input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
}

.ui-bookmark .bookmark {
    width: var(--icon-size);
    height: auto;
    fill: var(--icon-secondary-color);
    cursor: pointer;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    -webkit-transform-origin: top;
    -ms-transform-origin: top;
    transform-origin: top;
}

.bookmark::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    -webkit-box-shadow: 0 30px 0 -4px var(--icon-primary-color),
        30px 0 0 -4px var(--icon-primary-color),
        0 -30px 0 -4px var(--icon-primary-color),
        -30px 0 0 -4px var(--icon-primary-color),
        -22px 22px 0 -4px var(--icon-primary-color),
        -22px -22px 0 -4px var(--icon-primary-color),
        22px -22px 0 -4px var(--icon-primary-color),
        22px 22px 0 -4px var(--icon-primary-color);
    box-shadow: 0 30px 0 -4px var(--icon-primary-color),
        30px 0 0 -4px var(--icon-primary-color),
        0 -30px 0 -4px var(--icon-primary-color),
        -30px 0 0 -4px var(--icon-primary-color),
        -22px 22px 0 -4px var(--icon-primary-color),
        -22px -22px 0 -4px var(--icon-primary-color),
        22px -22px 0 -4px var(--icon-primary-color),
        22px 22px 0 -4px var(--icon-primary-color);
    border-radius: 50%;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
}

.bookmark::before {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: var(--icon-circle-border);
    opacity: 0;
}

/* actions */

.ui-bookmark:hover .bookmark {
    fill: var(--icon-hover-color);
}

.ui-bookmark input:checked+.bookmark::after {
    -webkit-animation: circles var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation: circles var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    -webkit-animation-delay: var(--icon-anmt-duration);
    animation-delay: var(--icon-anmt-duration);
}

.ui-bookmark input:checked+.bookmark {
    fill: var(--icon-primary-color);
    -webkit-animation: bookmark var(--icon-anmt-duration) forwards;
    animation: bookmark var(--icon-anmt-duration) forwards;
    -webkit-transition-delay: 0.3s;
    -o-transition-delay: 0.3s;
    transition-delay: 0.3s;
}

.ui-bookmark input:checked+.bookmark::before {
    -webkit-animation: circle var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation: circle var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    -webkit-animation-delay: var(--icon-anmt-duration);
    animation-delay: var(--icon-anmt-duration);
}

@-webkit-keyframes bookmark {
    50% {
        -webkit-transform: scaleY(0.6);
        transform: scaleY(0.6);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}

@keyframes bookmark {
    50% {
        -webkit-transform: scaleY(0.6);
        transform: scaleY(0.6);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}

@-webkit-keyframes circle {
    from {
        width: 0;
        height: 0;
        opacity: 0;
    }

    90% {
        width: var(--icon-circle-size);
        height: var(--icon-circle-size);
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes circle {
    from {
        width: 0;
        height: 0;
        opacity: 0;
    }

    90% {
        width: var(--icon-circle-size);
        height: var(--icon-circle-size);
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@-webkit-keyframes circles {
    from {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        opacity: 1;
    }

    to {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0;
    }
}

@keyframes circles {
    from {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        opacity: 1;
    }

    to {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0;
    }
}
</style>