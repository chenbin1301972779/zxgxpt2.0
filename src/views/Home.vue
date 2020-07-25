<template>
    <!-- 主页布局 -->
    <div class="home">
        <div class="header">
            <Header></Header>
        </div>
        <div class="content">
            <router-view />
        </div>
        <div class="footer">
            <p>COPYRIGHT &copy; ICP许可证：苏B2-20190525</p>
            <p>备案号：苏ICP备16066248号</p>
        </div>
    </div>
</template>

<script>
import Header from '../components/header.vue'
export default {
    name: 'Home',
    components: {
        Header
    },
    data () {
        return {

        }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.home {
    box-sizing: border-box;
    height: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -weblit-flex;
    display: flex;
    flex-direction: column;
    .header {
    }
    .content {
        flex: 1;
        background-color: #efefef;
        overflow: auto;
    }
    .footer {
        padding: 7px;
        font-size: 14px;
        color: #fff;
        line-height: 25px;
        text-align: center;
        background: #263859;
    }
}
</style>