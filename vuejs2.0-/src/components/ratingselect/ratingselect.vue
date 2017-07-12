<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)"  class="block    positive"  :class="{'active':selectType===2}">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
            <span @click="select(1,$event)" class="block   positive"  :class="{'active':selectType===1}">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
            <span @click="select(0,$event)" class="block   negative"  :class="{'active':selectType===0}">{{desc.negative}} <span class="count">{{nagetives.length}}</span></span>
        </div>

        <div @click="togglecontent" class="switch " :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价 </span>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    const POSITIVE=0
    const NEGATIVE=1
    const ALL=2
    export default {
        props:{
            ratings:{
                type:Array,
                default(){
                    return []
                     }
            },
            selectType:{
                type:Number,
                default:0
            },
            onlyContent:{
                type:Boolean,
                default:false
            },

            desc:{
                type:Object,
                default(){
                    return{
                        all:'全部',
                        positive:'满意',
                        negative:'不满意',
                    }
                }
            },
        },
        data(){
            return{
                selecttype:{
                    type:Number,
                    default:this.selectType
                },
                onlycontent:{
                    type:Boolean,
                    default:this.onlyContent
                },
            }

        },
        methods:{
            select(type,event){
                if(!event._constructed)
                {return}
                this.selecttype=type
                this.$root.eventHub.$emit('ratingtype.select',type)
            },
            togglecontent(){
                this.onlycontent=!this.onlyContent
                this.$root.eventHub.$emit('toggle.content',this.onlycontent)
            }

        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType===POSITIVE
                })
            },
            nagetives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType===NEGATIVE
                })
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratingselect
    margin-bottom 48px
    .rating-type
        padding: 18px 0

        //border-bottom 1px solid #e0e0e0
        margin:0 18px
        //font-size 0
        .block
            display: inline-block
            padding: 8px 12px
            border-radius 2px
            margin-right 8px
            line-height 16px

            font-size 12px
            .count
                margin-left 2px
                font-size 8px
                line-height 16px
    .switch
        padding 12px 18px
        line-height 24px
        //border-top 1px solid #e0e0e0
        border-bottom 1px solid #e0e0e0
        font-size 0
        color: #7e7e7e
        &.on
            .icon-check_circle
                color: #21a908
        .icon-check_circle
            font-size 24px
            margin-right 4px
            display: inline-block
            vertical-align: top
        .text
            font-size 14px





.positive
    color: #747474
    background rgba(0,160,220,0.2)
    &.active
        background rgb(0,160,220)
        color: white

.negative
    color: #747474
    background rgba(77,85,93,0.2)
    &.active
        background rgb(77,85,93)
        color: white



</style>