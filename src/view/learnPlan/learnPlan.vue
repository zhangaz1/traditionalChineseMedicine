<template>
    <div class="learnPlan ptb108">
        <van-nav-bar
            class="learnPlan_title"
            title="学习方案"
            left-arrow
            @click-left="onGoBack"
            fixed
        />
        <div class="learnPlan_tag plr30 ptb20">
            <ul class="learnPlan_tag_box">
                <li class="mb40">
                    <div class="li mb20">
                        <van-field v-model="text" label="问：" placeholder="请输入问题" label-width="25px" />
                        <van-field
                                v-model="message"
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
                        <van-button type="default" size="small" plain hairline @click="save">保存</van-button>
                    </div>
                </li>
            </ul>
            <ul class="learnPlan_tag_box h600">
                <li class="mb40">
                    <div class="li mb20">
                        <van-field v-model="text" label="问：" placeholder="请输入问题" label-width="25px" />
                        <van-field
                                v-model="message"
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
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'learnPlan',
        data() {
            return {
                text: '', // 答
                message: '' // 内容
            };
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
            /** 2020/3/24
            * 作者：王青高
            * 功能：{} 保存学习方案
            * 参数：{}
            */
            save() {

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
        position: relative;

        &_title {
            height: 108px;
        }
        &_tag {
            background: $bgColor;
            height: 100vh;
            box-sizing: border-box;
            .h600 {
                height: 600px;
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
            }
        }
    }
</style>
