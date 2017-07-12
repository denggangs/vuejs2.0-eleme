<template>
    <div id="app">
        <v-header  :seller="seller"></v-header>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods"><a >商品</a></router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings"><a>评论</a></router-link>

            </div>
            <div class="tab-item">
                <router-link to="/seller"><a>商家</a></router-link>

            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>

</template>


<script>
    import Vue from 'vue'

    import header from './components/header/header.vue';
    export default {
        data(){
            return{
                seller:{

                }
            }
        },
        created(){
            this.$http.get('/api/seller').then((response)=>{
                response=response.body
                if(response.errno===0){
                    this.seller=response.data
                    console.log(this.seller)
                }
            })
        },
        components: {
            'v-header': header

        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app
        .tab
            display :flex
            width: 100%
            height: 40px
            line-height: 40px
            .tab-item
                flex :1
                text-align :center
                &>a
                    display :block
                    font-size :14px
                    color:rgb(77,85,93)
                    border-bottom solid #efefef 1px


    .tab{
        display :flex
        width: 100%
        height: 40px
        line-height: 40px

    }
    .tab-item{
        flex :1
        text-align :center
        /*display :block*/
    }
    .router-link-active a{
        color: #ea2320
    }

</style>
