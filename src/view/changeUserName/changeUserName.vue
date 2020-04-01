<template>
    <div class="ptb108" v-if="title">
        <van-nav-bar :title="title" left-arrow @click-left="onGoBack" fixed class="videoBox_title"/>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="nickname"
                    name="nickname"
                    label="姓名"
                    placeholder="姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" color="#a33823" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { updateInfo } from '@/api/login';
    export default {
        name: 'changeUserName',
        data() {
            return {
                nickname: '', // 昵称
                title: '个人昵称'
            };
        },
        created() {
            if (this.$route.query && this.$route.query.title) {
                this.nickname = this.$route.query.title;
            }
        },
        mounted() {

        },
        methods: {
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 修改昵称
             * 参数：{}
             */
            onSubmit(values) {
                updateInfo({
                    nickname: values.nickname
                }).then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        if (result.nickname) this.nickname = result.nickname;
                        Toast(res.msg);
                    }
                });
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .van-nav-bar .van-nav-bar__arrow {
        font-size: 0.48rem;
        color: #333;
    }
</style>
