<template>
    <transition name="slide-fade" >
    <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="getback" @click="show">
                    <span class="icon-arrow_lift"></span>
                </div>

            </div>
            <div class="content">
                <h1 class="tittle">{{food.name}}</h1>
                <div class="detail2">
                    <span class="sell-count">月售{{food.sellCount}}</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="nowp">￥{{food.price}}</span>
                    <span class="oldp" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">

                    <cartcontrol :food="food"></cartcontrol>

                </div>

                <div @click="addFirst($event)" class="buy" v-show="!food.count||food.count===0">加入购物车</div>

            </div>
            <split v-show="food.info"></split >
            <div class="info" v-show="food.info">
                <h1 class="tittle">商品信息</h1>
                <div class="text">
                    {{food.info}}
                </div>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="tittle">商品评价</h1>
                <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length" >
                            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime| formatdate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down' : rating.rateType===1}"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
                </div>
            </div>
        </div>
    </div>
    </transition>

</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import ratingselect from '../ratingselect/ratingselect.vue'
    import split from '../split/split.vue'
    import BScroll from 'better-scroll'
    import cartcontrol from '../cartcontrol/cartcontrol.vue'
    import {formatDate} from '../../common/js/date'
    const POSITIVE=0
    const NEGATIVE=1
    const ALL=2

    export default {
        props:{
            food:{
                type:Object
            }
        },
        data(){
            return{
                showFlag:false,
                selectType:ALL,
                onlyContent:false,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽',
                }
            }


        },
        methods:{
            show(){
                this.selectType=ALL
                this.onlyContent=false
                this.showFlag=!this.showFlag
                if(this.showFlag){
                    this.$nextTick(()=>{
                        if(!this.scroll){
                            this.scroll=new BScroll(this.$refs.food,{
                                click :true
                            })
                        }else {
                            this.scroll.refresh()
                        }
                    })
                }
            },
            addFirst(event){
                if(!event._constructed)
                {return}
                Vue.set(this.food,'count',1)
            },
            needShow(type,text){
                if(this.onlyContent&&!text){
                    return false
                }
                if(this.selectType===ALL)
                {
                    return true
                }
                else if(this.selectType!=type){
                    return true
                }
            },
        },
        components:{
            ratingselect,
            cartcontrol,
            split,
        },
        filters:{
            formatdate(time){
                let date =new Date(time)
                return formatDate(date,'yyy-MM-dd hh:mm')
            }
        },
        created: function () {
            this.$root.eventHub.$on('ratingtype.select', (type)=>{
                this.selectType=type
                this.$nextTick(()=>{
                    this.scroll.refresh()
                })
            })
            this.$root.eventHub.$on('toggle.content', (onlycontent)=>{
                this.onlyContent=onlycontent
                this.$nextTick(()=>{
                    this.scroll.refresh()
                })
            })
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .food
        position fixed
        left:0
        top 0
        bottom: 48px
        z-index 30px
        width:100%
        background white
        .food-content
            .image-header
                position: relative
                width:100%
                height 0px
                padding-top 100%
                img
                    position: absolute
                    top:0
                    left 0
                    height  100%
                    width:100%
                .getback
                    position: absolute
                    top 10px
                    left: 5px
                    .icon-arrow_lift
                        display: block
                        padding 10px
                        font-size 20px
                        color: rgba(255, 255, 255, 0.66)
                        font-weight 700
            .content
                padding: 18px
                .tittle
                    line-height 14px
                    margin-bottom 8px
                    font-size 14px
                    font-weight 700
                    color #000000
                .detail2
                    margin-bottom 18px
                    line-height 10px
                    font-size 0px
                    .sell-count, .rating
                        font-size 10px
                        color: #9c9c9c
                    .sell-count
                        margin-right 12px
                .price
                    mso-font-width 700
                    line-height 24px
                        .nowp
                            margin-right 8px
                            font-size 14px
                            color: red

                        .oldp
                            text-decoration line-through
                            font-size 10px
                            color: #808080


                .cartcontrol-wrapper
                    position: absolute
                    right: 12px
                    bottom: 12px
                .buy
                    position: absolute
                    right: 18px
                    bottom: 21px
                    z-index 10
                    height: 24px
                    line-height 24px
                    padding:0 12px
                    box-sizing border-box
                    border-radius: 10px
                    font-size 12px
                    color: #ffffff
                    background dodgerblue



            .info
                padding: 18px
                .tittle
                    line-height 14px
                    margin-bottom 6px
                    font-size 14px
                    color: #3d3d3d
                    font-weight 600
                .text
                    padding 0 6px
                    line-height 24px
                    font-size 12px
                    color: #a7a7a7
            .rating
                padding-top 18px

                .tittle
                    line-height 14px
                    margin-left  18px
                    font-size 14px
                    color: #3d3d3d
                    font-weight 600
                .rating-wrapper
                    padding:0 18px
                    margin-top -35px
                    .rating-item
                        position relative
                        padding: 16px 0
                        border-bottom  1px solid #e7e7e7
                        .user
                            position: absolute
                            right:0
                            top 23px
                            line-height 12px
                            font-size 0px
                            .name
                                display inline-block
                                vertical-align: top
                                font-size 10px
                                color: #7c7c7c
                                margin-right 8px
                            .avatar
                                border-radius 50%
                        .time
                            margin-bottom 6px
                            line-height 12px
                            font-size 12px
                            color: #949494
                        .text
                            line-height 16px
                            font-size 16px
                            font-weight 700
                            color: #5c5c5c
                            .icon-thumb_up,.icon-thumb_down
                                margin-right 4px
                                line-height  24px
                                font-size 12px
                            .icon-thumb_up
                                color: #4691ff
.no-rating
    padding: 16px 0
    font-size 14px
    color: #a2a2a2
    padding-bottom 30px


    .slide-fade-enter-active {
    transition: all .4s ease;
}
.slide-fade-leave-active {
    transition: all .4s //cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter{

    transform: translateX(50px);
    opacity: 0;
}
.slide-fade-leave-to {

    transform: translateX(50px);
    opacity: 0;
}
</style>