<template>
    <div class="doctorBook_item"  @scroll.stop="addScroll($event)">
        <div class="tips ptb20 plr30">找到 {{searchData.length}} 条结果</div>
        <div v-if="searchData.length">
            <router-link tag="div" :to="{path: '/doctorCase/components/doctorDetail', query: { id: item.id, title: searchValue }}" class="plr30 ptb20 content" v-for="(item, index) of searchData" :key="'item' + index" >
                <div class="title ptb10" v-html="ruleTitle(item.title, searchValue)"></div>
                <div class="desc ptb10" v-html="ruleTitle(item.description, searchValue)"></div> <!--<span class="desc_t">【证候表现】</span>-->
                <!--            <div class="provenance ptb10"><span class="provenance_t">【出处】</span>《世中联名老中医典型医案》</div>-->
            </router-link>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'dockerBook',
        props: {
            searchData: {
                type: [Array, Object],
                default() {
                    return [];
                }
            },
            totalcount: {
                type: Number,
                default: 0
            },
            searchValue: {
                type: String,
                default: ''
            }
        },
        computed: {
            ruleTitle
        },
        methods: {
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 监听滚动条是否触底
             * 参数：{}
             */
            addScroll(event) {
                if (this.totalcount === this.searchData.length) return;
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.$emit('isScroll');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .doctorBook {
        &_item {
            background: $bgc-theme;
            position: relative;
            height: 100vh;
            overflow-y: scroll;
            .tips {
                position: relative;
                text-align: center;
                &:after {
                    content: '';
                    position: absolute;
                    left: 30px;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
            }
            .content {
                position: relative;
                &:after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background: $ccc-color;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                &:before {
                    content: '';
                    position: absolute;
                    font-size: 48px;
                    color: $coloe_3;
                    right: 30px;
                    top: calc(50% - .07rem);
                    width: 14px;
                    height: 14px;
                    border-top: 4px solid #ccc;
                    border-right: 4px solid #ccc;
                    transform: rotate(45deg);
                }
                .title {
                    @include ellipsis();
                    font-size: 28px;
                    color: $coloe_3;
                }
                .provenance,
                .desc {
                    @include ellipsis();
                    font-size: 28px;
                    color: $coloe_3;
                    &_t {
                        color: $color_999;
                    }
                }
            }
        }
    }
</style>
