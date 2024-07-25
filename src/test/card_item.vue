<template>
    <div>
        <div style="" class="card_container">
            <div class="card">
                <span class="text-title">
                    {{ itemValue.name.substring(0, itemValue.name.length - 2) }}
                </span>
                <span class="text-body">
                    还有 {{ 'XX' }} 天
                </span>
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
                <div class="tag">
                    {{ itemValue.date }}
                </div>
                <div style="" class="mar_top_auto">
                    {{ itemValue.name.slice(itemValue.name.length - 2, itemValue.name.length) }}
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
        itemValue: Object
    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style scoped>
.mar_top_auto {
    position: absolute;
    bottom: 42px;
    right: 5px;
    border: 1px solid rgb(1, 124, 255);
    padding: 2px 6px;
}

.tag {
    margin-top: auto;
    border: 1px solid #aaaa00;
    text-align: center;
    padding: 5px;
}

.card_container {
    display: flex;
    background-color: beige;
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 5px;
}

.card {
    width: 100%;
    height: 125px;
    background-color: #ffffff;
    margin: 10px 5px 10px 5px;
    flex-direction: column;
    display: flex;
    position: relative;
    /* border: 3px solid black; */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 5px;
}

.text-title {
    font-weight: 900;
    font-size: 1em;
    line-height: 1.5;
    padding: 0px 5px;
}

.text-body {
    font-size: .8em;
    padding-bottom: 10px;
    padding: 0 5px;
}

/* collect */
.ui-bookmark {
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