<template>
    <div>
        小说详情
    </div>
</template>

<script>
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'bookDetail',
        data() {
            return {
                loading_img_url: [

                ],
                date_start: null,
                date_end: null
            };
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>

</style>
