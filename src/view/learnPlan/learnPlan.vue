<template>
    <div class="learnPlan ptb108">
        <van-nav-bar
            class="learnPlan_title"
            title="学习方案"
            left-arrow
            @click-left="onGoBack"
            fixed
        />
        <van-sticky :offset-top="54">
            <div class="learnPlan_tag plr30 ptb20">
                <ul class="learnPlan_tag_box">
                    <li class="mb40">
                        <div class="li mb20">
                            <van-field v-model="ans" label="问：" placeholder="请输入问题" label-width="25px" />
                            <van-field
                                    v-model="ques"
                                    rows="2"
                                    autosize
                                    label-width="25px"
                                    label="答:"
                                    type="textarea"
                                    maxlength="200"
                                    placeholder="请输入回答内容"
                                    show-word-limit
                            />
                        </div>
                        <div class="btn">
                            <van-button type="default" size="small" plain hairline @click="addLearnPlan">添加</van-button>
                        </div>
                    </li>
                </ul>
            </div>
        </van-sticky>
        <div class="learnPlan_tag plr30 ptb20">
            <ul class="learnPlan_tag_box h900" v-if="messageList.length">
                <li class="mb40" v-for="(item, index) of messageList" :key="'item' + index">
                    <div class="li mb20">
                        <div class="title ptb30 plr30">问：<span>{{item.ans}}</span></div>
                        <div class="desc ptb30 plr30">答：<span>{{item.ques}}</span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { getLearnPlan, addLearnPlan } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { Toast } from 'vant';
    export default {
        name: 'learnPlan',
        data() {
            return {
                messageList: [], // 学习方案
                ans: '',
                ques: ''
            };
        },
        mounted() {
            this.getLearnPlan();
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            /** 2020/3/22
             * 作者：王青高
             * 功能：{} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 获取学习方案
            * 参数：{}
            */
            getLearnPlan() {
                getLearnPlan().then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.messageList = result.list;
                    }
                });
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 添加学习方案
            * 参数：{}
            */
            addLearnPlan() {
                if (!this.ans && !this.ques) {
                    Toast('请完整填写学习方案');
                    return;
                }
                addLearnPlan({
                    ans: this.ans,
                    ques: this.ques
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                       Toast('添加成功!');
                       this.getLearnPlan();
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar .van-icon {
        font-size: 48px;
        color: $coloe_3;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .learnPlan {
        /*position: relative;*/

        &_title {
            height: 108px;
        }
        &_tag {
            background: $bgColor;
            /*height: 100vh;*/
            box-sizing: border-box;
            .h900 {
                height: 900px;
                overflow-y: scroll;
            }
            &_box {
                .li {
                    border: 2px solid $bg_cbb488;
                    border-radius: 20px;
                    overflow: hidden;
                    .van-cell {
                        background: $bgColor;
                    }
                }
                .btn {
                    width: 100%;
                    text-align: right;
                }
                .title {
                    position: relative;
                    &:after {
                        content: '';
                        position: absolute;
                        left: 5%;
                        bottom: 0;
                        width: 90%;
                        height: 1px;
                        background: #ebedf0;
                    }
                }
                .desc {
                    @include multiline-ellipsis(6);
                }
            }
        }
    }
</style>
