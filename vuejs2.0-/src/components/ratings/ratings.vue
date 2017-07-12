<template>
    <div class="ratings"  ref="rating">
        <div class="ratings-content" >
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="tittle">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="tittle">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="tittle">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="tittle">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>

            </div>
            <split></split>
            <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
            <div class="rating-wrapper"  >
                <ul >
                    <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img height="28" width="28" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star  :size="24" :score="rating.score"></star>
                                <span class="delivery"  v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="recommend-text" v-for=" text in rating.recommend">{{text}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatdate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import ratingselect from '../ratingselect/ratingselect.vue'
    import split from '../split/split.vue'
    import star from '../star/star.vue'
    import {formatDate} from '../../common/js/date'

   var ERR_OK=0
    const ALL=2
export default{
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        split,
        star,
        ratingselect
    },
    data(){
        return {
            selectType: ALL,
            onlyContent: true,
            ratings:[],
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽',
            }
        }
    },
    created(){
        this.$http.get('/api/ratings').then((response)=>{
            response=response.body
            if (response.errno===ERR_OK){
                this.ratings=response.data
                this.$nextTick(()=>{
                    this.scroll=new BScroll(this.$refs.rating,{
                        click:true
                    })

                })


            }
        })


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
    filters:{
        formatdate(time){
            let date =new Date(time)
            return formatDate(date,'yyy-MM-dd hh:mm')
        }
    },
    methods:{
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
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .ratings
        position: absolute;
        top 174px
        bottom:0
        width:100%
        left:0
        overflow hidden
        .overview
            display: flex
            padding 18px 0
            .overview-left
                flex: 0 0 137px
                width: 137px
                border-right: 1px solid #ebebeb
                text-align: center
                padding:6px 0
                @media only screen and (max-width:320px)
                    flex 0 0 120px
                    width 120px
                .score
                    line-height 28px
                    font-size 24px
                    color #e79143
                    margin-bottom 6px
                .tittle
                    line-height 24px
                    font-size 12px
                    color #6b6b6b
                .rank
                    font-size 10px
                    color: #949494
            .overview-right
                flex 1
                padding 6px 0 6px 24px
                .score-wrapper
                    //line-height 18px
                    margin-bottom 18px
                    font-size 0
                    .tittle
                        display: inline-block
                        vertical-align: top
                        font-size 12px
                        color: #696969
                        line-height: 18px
                    .star
                        display: inline-block
                        margin 0 12px
                        vertical-align top
                    .score
                        display inline-block
                        vertical-align: top
                        font-size 12px
                        line-height: 18px
                        color #e79143
                .delivery-wrapper
                    font-size 0px
                    .tittle
                        display: inline-block
                        vertical-align: top
                        font-size 12px
                        color: #696969
                        line-height: 18px
                    .delivery
                        margin-left 12px
                        font-size 12px
                        color rgb(147,153,159)
                        line-height: 18px





        .rating-wrapper
            padding:0 18px
            margin-top -40px
            .rating-item

                display: flex
                padding: 18px
                border-bottom:1px solid #e9e9e9
                .avatar
                    flex: 0  0 28px
                    width: 28px
                    margin-right 12px
                    img
                        border-radius:50%
                .content
                    flex:1
                    position: relative
                    .name
                        display: block
                        line-height 12px
                        font-size 10px
                        margin-bottom 4px
                        margin-top 10px
                        color: #696969
                        margin-left -210px
                        vertical-align: top
                    .star-wrapper
                        display: block
                        vertical-align: top
                        margin-bottom 6px
                        margin-left -170px
                        font-size 0px
                        .star
                            display: inline-block
                            margin-right 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align top
                            line-height 12px
                            font-size 10px
                            color: rgb(147,153,159)
                    .text
                        line-height 18px
                        color: #011727
                        font-size  12px
                    .recommend
                        line-height 18px
                        .icon-thumb_up,.recommend-text
                            display: inline-block
                            margin:0 8px 4px 0
                            font-size 9px
                        .icon-thumb_up
                            color: rgb(0,160,220)
                        .recommend-text
                            padding:1 6px
                            border: 1px solid #eeeeee
                            color: #8c8c8c
                            background: #ffffff
                    .time
                        position: absolute
                        top:0
                        right 0px
                        line-height 12px
                        font-size 10px




</style>