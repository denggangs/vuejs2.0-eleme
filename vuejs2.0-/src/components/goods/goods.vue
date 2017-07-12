<template>
    <div class="goods">
        <div class="manu-wrapper" ref="manuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menuitem" :class="{'current':currentIndex===index}" @click="selectmenu(index)">
                    <span class="text">
                       <span v-show="item.type>0" class="icon" :class="classMap[item.type]"> </span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="tittle">{{item.name}}</h1>
                    <ul>
                        <li  v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                            <div class="foodicon">
                                <img :src="food.icon" alt="" class="foodimg">
                            </div>
                            <div class="content">
                                <h2 class="name2">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="countm">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="nowp">￥{{food.price}}</span>
                                    <span class="oldp" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :goods="goods"  :select-foods="selectFoods" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>

</template>

<script>
    import cartcontrol from  '../cartcontrol/cartcontrol'
    import shopcart from '../shopcart/shopcart.vue'
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import food from '../food/food.vue'

    const ERR_OK= 0
export default{

    props:{
        seller:{
            type:Object

        },


    },
    data (){
        return{
            goods:[],
            listHeight:[],
            scrolly:0,
            selectedFood:{}

        }

    },
    created(){
        this.$http.get('/api/goods').then((response)=>{
            response=response.body
            if (response.errno===ERR_OK){
                this.goods=response.data

                console.log(this.goods)
                this.$nextTick(()=>{
                    this._iniScroll()
                    this._cuculateHeight()
                })

            }
        })
        this.classMap=['decrease','discount','guarantee','invoice','special']
        this.$root.eventHub.$on('cartadd', this.cartadd2)
    },
    methods:{

        cartadd2(target){
            this._drop(target)
        },
        _drop(target){
//            console.log(target)
            this.$refs.shopcart.drop(target)
        },

        _iniScroll(){
            this.menuScroll=new BScroll(this.$refs.manuWrapper,{
                click:true
            })
            this.foodsScroll=new BScroll(this.$refs.foodWrapper,{
                click:true,
                probeType:3
            })
            this.foodsScroll.on('scroll',(pos)=>{
                this.scrolly=Math.abs(Math.round(pos.y))
            })
        },
        _cuculateHeight(){
            let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
            let height = 0
            this.listHeight.push(height)
            for(let i=0;i<foodList.length;i++)
            {
                height+=foodList[i].clientHeight
                this.listHeight.push(height)
            }
        },
        selectmenu(index){


            let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
            let el =foodList[index]
            this.foodsScroll.scrollToElement(el,300)
        },
        selectFood(food,event){
            if(!event._constructed)
            {return}

            this.selectedFood=food
            this.$refs.food.show()
            event.stopPropagation()
        }




    },


    computed:{
        currentIndex(){
            for(let i =0;i<this.listHeight.length;i++){
                let height1=this.listHeight[i]
                let height2=this.listHeight[i+1]
                if (!height2||(this.scrolly>=height1&&this.scrolly<height2)){
                    return i
                }
            }
            return 0
        },
        selectFoods(){
            let foods=[]
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    components:{
        food,
        cartcontrol,
        shopcart:shopcart
    },

};
</script>



<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

.goods
    position: absolute
    top 170px
    width:100%
    bottom: 48px
    display: flex
    overflow: hidden
    .manu-wrapper
        flex:0 0 80px
        width: 80px
        background: #f3f5f7
        .menuitem
            padding :0 12px
            display: table
            width 56%
            height: 54px
            line-height: 14px
            display: table
            width: 56px
            vertical-align: middle
            &.current
                background #ffffff
                z-index: 10
                position relative
                margin: 0px 0
                font-weight 700
                border-left solid 4px #b6211f
                padding-left 8px


            .icon
                display :inline-block
                height :12px
                width:12px
                background-size 12px 12px
                vertical-align :top
                margin-right: 2px
                background-repeat: no-repeat
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &guarantee
                    bg-image('guarantee_3')
                &invoice
                    bg-image('invoice_3')
                &special
                    bg-image('special_3')

            .text
                color #5d5d5d
                display: table-cell
                width: 56px
                vertical-align: middle
                font-size: 12px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)

    .foods-wrapper
        flex:1
        .tittle
            padding-left 14px
            height: 26px
            line-height 26px
            border-left:3px solid #a8a8a8
            font-size: 12px
            color: #777
            background #f2f2f2
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-bottom solid 1px rgba(7, 17, 27, 0.1)
            &:last-child
                border-bottom 0px
.foodicon
    height:57px
    width: 57px
    flex:0 0 57px
    margin-right 10px
.foodimg
    heigth:57px
    width: 57px
.content
    flex:1
    position: relative
    .name2
        margin-top 2px
        height: 14px
        line-height: 14px
        font-size 14px
        color: rgb(7,17,27)
    .desc
        margin-top 8px
        line-height 10px
        font-size: 10px
        color: rgb(147,153,157)
    .extra
        margin-top 8px
        line-height 10px
        font-size: 10px
        color: rgb(147,153,157)
        margin-bottom 8px
    .cartcontrol-wrapper
        position: absolute
        right:0
        bottom: -23px
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

.countm
    margin-right 12px




</style>