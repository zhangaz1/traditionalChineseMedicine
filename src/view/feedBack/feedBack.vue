<template>
    <div class="feedBack ptb108">
        <van-nav-bar
                class="feedBack_title"
                title="反馈建议"
                left-arrow
                @click-left="onGoBack"
                fixed
        />
        <div class="feedBack_content plr30 ptb20">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="message"
                        rows="10"
                        autosize
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入反馈建议内容"
                        show-word-limit
                        class="feedBack_content_field"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" class="feedBack_content_btn">
                        提 交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { addFeedBack } from '@/api/content';
    import { Toast } from 'vant';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'feedBack',
        data() {
            return {
                message: '' // 反馈建议内容
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
            /** 2020/3/22
             * 作者：王青高
             * 功能：{Function} 表单提交-反馈建议
             * 参数：{}
             */
            onSubmit(values) {
                if (!this.message) return;
                addFeedBack(values).then(res => {
                    if (res.state === '1') {
                        Toast('提交成功!');
                    }
                });
            }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
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
    .feedBack {
        position: relative;
        &_title {
            height: 108px;
        }
        &_content {
            background: $bgColor;
            height: 100vh;
            box-sizing: border-box;
            &_field {
                border: 2px solid $bg_cbb488;
                border-radius: 20px;
                overflow: hidden;
            }
            .van-cell {
                background: $bgColor;
            }
            &_btn {
                background: $bgColor;
                border: 1px solid $bg_cbb488;
                color: $color;
                font-weight: bold;
                font-size: 44px;
            }
        }
    }
</style>
