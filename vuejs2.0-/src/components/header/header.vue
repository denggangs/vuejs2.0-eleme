<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" height="64"width="64">
            </div>
            <div class="content">
                <div class="tittle">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>

                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports" >
                    <span class="icon" :class="classMap[seller.supports[0].type]"><img src="" alt=""></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showdetail">
                <span class="count">{{seller.supports.length}}个
                      <li class="icon-keyboard_arrow_right"></li>
                </span>

            </div>
        </div>
        <div class="bulletin-wrapper" @click="showdetail">
            <span class="bulletin-tittle"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <li class="icon-keyboard_arrow_right"></li>

        </div>
        <div class="background" >
            <img :src="seller.avatar"  class="bg-img">
        </div>
        <transition name="fade">
        <div class="detail" v-show="detatilshow" transition="fade">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                    <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="detail-tittle">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports2">
                    <li v-for="item in seller.supports" class="support-item">
                        <span class="icon2" :class="classMap[item.type]"></span>
                        <span class="text2">{{item.description}}</span>
                    </li>
                </ul>
                    <div class="detail-tittle">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="gg-bulletin">
                        <p class="gg-content">{{seller.bulletin}}</p>
                    </div>

                </div>
            </div>
            <div class="detail-close" @click="closeshow">
                <li class="icon-close"></li>
            </div>
        </div>
        </transition>
    </div>

</template>

<script type="text/ecmascript-6">
    import star from '../star/star.vue'
    export default{
        props:{
            seller:{
//               type:
            }
        },
        data(){
            return{
                detatilshow:false
            }
        },
        methods :{
            showdetail(){
                this.detatilshow = true
            },
            closeshow(){
                this.detatilshow = false
            }

        },
        created(){
            this.classMap=['decrease','discount','guarantee','invoice','special']
            //console.log(classMap[seller.supports[0].type])
        },
        components:{
            star
        }
    };
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .header
        color: #fff
        position: relative
        background : rgba(7, 17, 27, 0.1)
        .content-wrapper
            position :relative
            padding: 24px 12px 18px 24px
            .avatar
                vertical-align :top
                display :inline-block
            .content
                display: inline-block
                font-size 14px
                margin-left:16px
                .tittle
                    margin :2px 0 8px 0
                    .brand
                        display: inline-block
                        width: 30px
                        height: 18px
                        vertical-align :top
                        bg-image('brand')
                        background-size 30px 18px
                        background-repeat :no-repeat
                        img
                            border-radius : 2 px
                    .name
                        display: inline-block
                        margin-left 6px
                        font-size :18px
                        line-height :18px
                        font-weight :bold
                        vertical-align :inherit
                .dexcription
                    line-height :12px
                    font-size :12px
                    margin-bottom :10px
                .supports
                    .icon
                        display :inline-block
                        height :12px
                        width:12px
                        margin-top :6px
                        background-size 12px 12px
                        vertical-align :top
                        margin-right: 2px
                        background-repeat: no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &guarantee
                            bg-image('guarantee_1')
                        &invoice
                            bg-image('invoice_1')
                        &special
                            bg-image('special_1')
                    .text
                        display inline-block
                        line-height :12px
                        font-size :12px
                        margin-top :6px



.support-count
    position :absolute
    right :12px
    border: 18px
    bottom: 18px
    padding :0 8px
    height :24px
    line-height :24px
    border-radius :14px
    background : rgba(0, 0, 0, 0.2)


.count
    font-size :12px
    vertical-align :top
    line-height :24px
    display :inline-block

.icon-keyboard_arrow_right
    font-size :12px
    line-height :24px
    margin-left :-4px
    display :inline-block
.bulletin-wrapper
    height :22px
    line-height :22px
    padding:0 22px 0 12px
    white-space :nowrap
    overflow :hidden
    position: relative
    text-overflow :ellipsis
    background rgba(10, 3, 5, 0.23)
    .bulletin-tittle
        display inline-block
        width:22px
        margin-top 5px
        vertical-align top
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
    .bulletin-text
        margin: 0 4px
        vertical-align top
        font-size 10px
    .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right 12px
        top 1px
.background
    position absolute
    top: 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
    overflow hidden
.bg-img
    heigth 100%
    width 100%

.detail

    position: fixed
    z-index: 100
    width:100%
    height:100%
    overflow: auto
    background rgba(7, 17, 27, 0.5)
    top 0
    left 0
    backdrop-filter: blur(5px)
    &.fade-enter-active
        animation: bounce-in 0.5s;
    &.fade-leave-active
        animation: bounce-out 0.5s;
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        60% {
            transform: scale(0.85);
        }
        100% {
            transform: scale(0);
        }
    }

.detail-wrapper
    min-height 100%
    width:100%
    .detail-main
        margin-top 64px
        padding-bottom 80px
.name
    font-size 20px
    text-align center
    line-height 16px
    font-weight 700

.star-wrapper
    margin-top 18px
    padding: 2px  0
    text-align center

.detail-tittle
    display flex
    width:80%
    margin:30px auto 24px auto
    .line
        flex 1
        position: relative
        top: -6px
        border-bottom 1px solid rgba(255, 255, 255, 0.21)
    .text
        font-weight 700
        margin 0 15px

.supports2
    width:80%
    margin 0 auto
    .support-item
        padding 0 12px
        margin-bottom 12px
        font-size 0px
        &:last-child
            margin-bottom 0px
        .icon2
            display: inline-block
            width:16px
            height: 16px
            vertical-align: top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
                bg-image('decrease_2')
            &.discount
                bg-image('discount_2')
            &guarantee
                bg-image('guarantee_2')
            &invoice
                bg-image('invoice_2')
            &special
                bg-image('special_2')


        .text2
            line-height: 16px
            font-size 12px
.detail-close
    position: relative;
    width: 40px;
    height: 40px
    margin: -60px auto auto auto;
    clear: both
    font-size: 40px
    border solid 2px
    border-radius 50px

.gg-bulletin
    width 80%
    margin 0 auto
    .gg-content
        line-height 24px
        padding:0 12px
        font-size 12px



.guarantee{
    background-image: url("guarantee_1@3x.png")
}


.invoice
    bg-image('invoice_2')
.special
    bg-image('special_2')


</style>