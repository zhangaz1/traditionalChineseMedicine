<template>
    <div class="subMenu">
        <div class="subMenu_title">
            <div class="subMenu_left">{{title}}</div>
            <router-link :to="toRouter" class="subMenu_more">更多 ></router-link>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
    export default {
        name: 'subMenu',
        data() {
            return {

            };
        },
        props: {
            title: {
                type: String,
                default: '标题'
            },
            toRouter: {
                type: String,
                default: '/'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .subMenu {
        &_title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
        }
        &_left,
        &_more {
            color: #a33823;
        }
    }
</style>
