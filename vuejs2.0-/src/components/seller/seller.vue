<template>
<div class="seller" ref="seller">
    <div class="seller-content">
        <div class="overview">
            <h1 class="tittle">{{seller.name}}</h1>
            <div class="desc">
                <star :size="36" :score="seller.score"></star>
                <span class="text">({{seller.ratingCount}})</span>
                <span class="text">月售{{seller.sellCount}}单</span>
            </div>
            <ul class="remark">
                <li class="block">
                    <h2>起送价</h2>
                    <div class="content">
                        <span class="stress">{{seller.minPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>商家配送</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>平均配送时间</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryTime}}</span>分钟
                    </div>
                </li>
            </ul>
            <div class="favorite" @click="toFavorite($event)">
                <span class="icon-favorite" :class="{'active':favorite}"></span>
                <span class="text">{{favoriteText}}</span>
            </div>
        </div>
        <split></split>
        <div class="bulletin">
            <h1 class="tittle">公告与活动</h1>
            <div class="content-wrapper">
                <p class="content">{{seller.bulletin}}</p>
            </div>
            <ul v-if="seller.supports" class="supports">
                <li v-for="item in seller.supports" class="support-item">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <split></split>
        <div class="pics">
            <h1 class="tittle">商家实景</h1>
            <div class="pic-wrapper" ref="pic">
                <ul class="pic-list" ref="piclist">
                    <li class="pic-item" v-for="pic in seller.pics">
                        <img :src="pic" height="90" width="120px">
                    </li>
                </ul>
            </div>
        </div>
        <split></split>
        <div class="info">
            <h1 class="tittle">商家信息</h1>
            <ul>
                <li class="info-item" v-for="info in seller.infos">{{info}}</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star.vue'
    import split from '../split/split.vue'
    import BScroll from 'better-scroll'

    export default{
    props:{
        seller:{
            type:Object
        }
    },
        data(){
        return{
            favorite :false
        }
        },
        computed:{
            favoriteText(){
                return this.favorite?'已收藏':'收藏'
            }
        },
        methods:{
            toFavorite(event){
                if(!event._constructed)
                {return}

                    console.log(222)
                this.favorite=true

            }
        },
    components:{
        star,
        split
    },
    created(){
        this.classMap=['decrease','discount','guarantee','invoice','special']
        //console.log(classMap[seller.supports[0].type])

    },
        watch:{
            seller :function () {
                this.$nextTick(()=>{
                    this.scorll =new BScroll(this.$refs.seller,{
                        click:true
                    })


                    if(this.seller.pics){
                        let picwidth =120
                        let margin =6
                        let width =(picwidth+margin)*this.seller.pics.length
                        this.$refs.piclist.style.width=width+'px'
                        this.$nextTick(()=>{
                            this.picscroll=new BScroll(this.$refs.pic,{
                                scrollX:true,
                                click:true,
                                eventPassthough:'vertical'
                            })
                        })
                    }

                })
            }
        },

        mounted(){
        if(!this.scorll){
            this.scorll =new BScroll(this.$refs.seller,{
                click:true
            })

            if(this.seller.pics){
                let picwidth =120
                let margin =6
                let width =(picwidth+margin)*this.seller.pics.length
                this.$refs.piclist.style.width=width+'px'
                this.$nextTick(()=>{
                    this.picscroll=new BScroll(this.$refs.pic,{
                        scrollX:true,
                        click:true,
                        eventPassthough:'vertical'
                    })
                })
            }

        }


        }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
.seller
    position: absolute;
    top 174px
    bottom:0
    width:100%
    left:0
    overflow hidden
    .overview
        padding 18px
        .tittle
            margin-bottom 8px
            line-height 14px
            color: #07111b
            font-size 14px
        .desc
            padding-bottom 18px
            border-bottom: 1px solid #e7e7e7
            .star
                display inline-block
                margin-right 8px
                vertical-align: top
            .text
                display: inline-block
                margin-right 12px
                vertical-align: top
                font-size 10px
                line-height 18px
                color: #778593
        .remark
            display: flex
            padding-top 18px
            .block
                flex 1
                text-align: center
                border-right solid 1px #ebebeb
                &:last-child
                    border none
                h2
                    margin-bottom 4px
                    line-height 10px
                    font-size 10px
                    color: #9f9f9f
                .content
                    line-height 24px
                    font-size 10px
                    color #7c7c7c
                    .stress
                        font-size 24px
        .favorite
            position: absolute
            right: 20px
            top: 18px
            text-align center
            width: 50px
            .icon-favorite
                display: block
                color: #b0b0b0
                font-size 24px
                line-height 24px
                margin-bottom 4px
                &.active
                    color: red
            .text
                line-height 10px
                font-size 10px
                color: #6b6b6b

    .bulletin
        padding 18px 18px 0 18px
        .tittle
            margin-bottom 8px
            line-height 14px
            color: #07111b
            font-size 14px
        .content-wrapper
            padding:0 12px 16px 12px
            border-bottom 1px solid #ebebeb
            .content
                color: #d90000
                font-size 12px
                line-height 24px
        .supports
            .support-item
                padding 16px 12px
                font-size 0
                border-bottom 1px solid #ebebeb
                &:last-child
                    border none
                .icon
                    display: inline-block
                    width:16px
                    height: 16px
                    vertical-align: top
                    margin-right 6px
                    background-size 16px 16px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_4')
                    &.discount
                        bg-image('discount_4')
                    &guarantee
                        bg-image('guarantee_4')
                    &invoice
                        bg-image('invoice_4')
                    &special
                        bg-image('special_4')
                .text
                    line-height 16px
                    font-size 12px
                    color: #8a8a8a
    .pics
        padding: 18px
        .tittle
            margin-bottom 8px
            line-height 14px
            color: #07111b
            font-size 14px
        .pic-wrapper
            width:100%
            overflow: hidden
            white-space:nowrap
            .pic-item
                display: inline-block
                margin-right 6px
                width: 120px
                height: 90px
                &:last-child
                    margin:0
    .info
        padding 18px
        color: #808080
        .tittle
            padding-bottom 12px
            padding-top 12px
            line-height 14px
            color: #565656
            font-size 14px
            border-bottom 1px solid #ebebeb
        .info-item
            padding: 16px
            line-height 16px
            border-bottom 1px solid #ebebeb
            font-size 12px
            &:last-child
                border:none


</style>