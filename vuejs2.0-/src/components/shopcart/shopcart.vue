<template>
    <div class="shopcart">
        <div class="content"  >
            <div class="content-left" @click="list33">
                <div class="logo-wrapper" >
                    <div class="logo" :class="{'heighlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'heighlight':totalCount>0}">
                        </span>
                    </div>
                    <div class="num"  v-show="totalCount>0">{{totalCount}}</div>

                </div>
                <div class="price" :class="{'heighlight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click="acount">
                <div   :class="payClass" >
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
                <div class="inner inner-hook"></div>
            </div>
        </div>
        <div class="orderwrapper">

            <transition name="slide-fade">
                <div class="ordercontent" v-show="list2&&totalCount>0">
                    <div class="listtittle">
                        <div class="gouwuche">购物车</div>
                        <div class="qingkong" @click="qingkong">清空</div>
                    </div>
                    <div >
                        <div class="listcontent" ref="listcontent2">
                            <ul >
                                <li class="orderlist" v-for="food in selectFoods"  >
                                    <div class="foodname">{{food.name}}</div>
                                    <div class="foodprice">￥{{food.price}}</div>
                                    <cartcontrol class="cartcontrol"  :food="food"></cartcontrol>
                                </li>
                            </ul>
                        </div>
                    </div>



                </div>
            </transition>


        </div>
        <transition name="back-fade">
        <div class="cartback"  v-show="list2&&totalCount>0" @click="list33"></div>
        </transition>
    </div>

</template>

<script type="text/ecmascript-6">
    import cartcontrol from  '../cartcontrol/cartcontrol'
    import BScroll from 'better-scroll'

    export default {
        data(){



            return{
//                list2:{
//                    show:false
//                },
                list2:false,
                balls:[
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    }
                ],
                dropballs:[]
            }
        },
        components:{
            cartcontrol
        },


      props:{
            goods:{
                type:Array,
                default(){
                    return [

                    ]
                }
            },
          minPrice:{
              type:Number,
              default:0
          },
          deliveryPrice:{
              type:Number,
              default:0
          },
          selectFoods:{
              type:Array,
              default(){
                  return [

                  ]
              }
          }

      },
        methods:{
            qingkong(){
              this.selectFoods.forEach((food)=>{
                  food.count=0
              })
            },
            list33(){

                if(this.list2){
                    this.list2=false
                    return
                }
                if(!this.list2){
                    this.list2=true

                    let show=this.list2
                    if(show){
                        console.log('llll')
                        this.$nextTick(()=>{

                            if(!this.scroll){
                                this.scroll=new BScroll(this.$refs.listcontent2,{
                                    click:true,
                                    scrollY: true
                                })
                                console.log('2222')
                            }
                            else {
                                console.log('3333')
                                this.scroll.refresh()

                            }

                        })
                    }
                    return

                }

            },
            acount(){
                let count = this.totalPrice*1+this.deliveryPrice*1
                if(this.totalPrice>=this.minPrice){
                    alert('支付'+count+'元')
                }

            },
            drop(el){
                for(let i=0 ;i<this.balls.length;i++){
                    let ball = this.balls[i]
                    if(!ball.show){
                        ball.show=true
                        ball.el=el
                        this.dropballs.push(ball)
                        //console.log(el.getBoundingClientRect())
                        return
                    }
                }
            },
        },
        transitions:{
            drop:{
                beforeEnter(el){
                    let count = this.balls.length
                    while (count--){
                        let ball =this.balls[count]
                        if (ball.show){
                            let rect =ball.el.getBoundingClientRect()
                            let x = rect.left-32
                            let y= -(window.innerHeight-rect.top-22)
                            el.style.display=''
                            el.style.webkitTransform=`translate3d(0,${y}px,0)`
                            el.style.transform=`translate3d(0,${y}px,0)`
                            let inner=el.getElementsByClassName('inner-hook')[0]
                            inner.style.webkitTransform=`translate3d(${x}px,0,0)`
                            inner.style.transform=`translate3d(${x}px,0,0)`

                        }
                    }
                },
                enter(el){
                    let rf =el.offsetHeight
                    this.nextTick(()=>{
                        el.style.webkitTransform=`translate3d(0,0,0)`
                        el.style.transform=`translate3d(0,0,0)`
                        let inner=el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform=`translate3d(0,0,0)`
                        inner.style.transform=`translate3d(0,0,0)`
                    })

                },
                afterEnter(){
                    this.ball=this.dropballs.shift()
                    if(ball){
                        ball.show=false
                        el.style.display='none'

                    }
                }

            }
        },
        computed:{
          totalPrice(){
              let total=0
              this.selectFoods.forEach((food)=>{
                  total+=food.price*food.count
              })
              return total.toFixed(1)
          },
            totalCount(){
              let count = 0
                this.selectFoods.forEach((food)=>{
                  count +=food.count

                })
                return count
            },
            payDesc(){
                if(this.totalPrice===0){
                    return `￥${this.minPrice}元起送`
                }else if(this.totalPrice<this.minPrice){
                    return `还差￥${this.minPrice-this.totalPrice}元`
                }else {
                    return '去结算'

                }
            },
            payClass(){
                if (this.totalPrice>0&&this.totalPrice>=this.minPrice){
                    return 'enough'
                }else {
                    return  'notenough'
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .shopcart
        height: 48px
        position fixed
        left:0
        bottom:0
        z-index:99
        width:100%
        .content
            height: 48px
            display: flex
            background: #141d27
            .content-left
                flex 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin:0 12px
                    padding: 6px
                    height: 56px
                    width:56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 500px
                    background-color: #141d27
                    .logo
                        height 100%
                        width:100%
                        border-radius 500px
                        background: #6b6b6b
                        text-align center
                        &.heighlight
                            background #486dff
                        .icon-shopping_cart
                            font-size 24px
                            color: #e6e6e6
                            line-height: 44px
                            &.heighlight
                                color  #ffffff
                    .num
                        position: absolute
                        top:0
                        right:0
                        width: 24px
                        heigth :16px
                        line-height: 16px
                        text-align: center
                        border-radius 16px
                        font-size 9px
                        font-weight:700
                        color: #ffffff
                        background #ff4344
                        box-shadow  0 4px 8px 0 rgba(0, 0, 0, 0.4)


                .price
                    display: inline-block
                    vertical-align: top
                    line-height 24px
                    margin-top: 12px
                    padding-right 12px
                    border-right: 1px solid #555555
                    box-sizing border-box
                    color: #b8b8b8
                    font-size 16px
                    position: relative
                    font-weight:700
                    &.heighlight
                        color: #ffffff

                .desc
                    display: inline-block
                    display: inline-block
                    vertical-align: top
                    line-height 24px
                    margin-top: 12px
                    padding-right 12px
                    box-sizing border-box
                    color: #b8b8b8
                    font-size 10px
                    position: relative
                    margin-left 10px
            .content-right
                flex:0 0 105px
                width: 105px
                background: #2b333b
                .pay
                    line-height 48px
                    height: 48px
                    text-align center
                    color: #b8b8b8
                    font-size 14px
                    font-weight:700
        .ball-container
            .ball
                position fixed;
                left:32px
                bottom 22px
                z-index: 200
                &.drop-transition
                    transition all 0.4s
                    .inner
                        width 16px
                        height:16px
                        border-radius 50%
                        background rgb(0 ,160 , 220 )
                        transition all 0.4s

    .enough
        line-height 48px
        height: 48px
        text-align center
        color: #ffffff
        font-size 14px
        font-weight:700
        background green
    .orderwrapper
        //position: absolute
        //z-index :-1
        //background black
        //height 100%
        //width 100%
        .ordercontent
            position: absolute
            z-index :-2
            width:100%
            bottom: 48px
            background white
            padding-bottom 20px
            .listtittle
                background: rgba(208, 208, 208, 0.33)
                line-height 40px
                display flex
                z-index: 20
                border-bottom solid 2px rgba(128, 128, 128, 0.15)
                .gouwuche
                    display: inline-block
                    font-size 18px
                    flex:1
                    margin-left 36px
                    color: rgba(0, 0, 0, 0.7)
                .qingkong
                    display: inline-block
                    font-size 14px
                    color: #4691ff
                    margin-right: 24px
                    flex:0 0 48px
            .listcontent
                //position: relative;
                max-height 250px
                overflow hidden
                width 100%
                .orderlist
                    overflow hidden
                    position relative
                    z-index:-2
                    //display: flex
                    font-weight:700
                    margin  0 36px
                    border-bottom solid 1px rgba(128, 128, 128, 0.15)
                    .foodname
                        display: inline-block
                        color: rgba(0, 0, 0, 0.7)
                        position: relative
                        font-size 14px
                        line-height: 48px
                        font-weight:400
                        //flex: 1

                    .foodprice
                        position: absolute
                        display: inline-block
                        color: red
                        bottom: 0
                        font-weight:700
                        right: 115px
                        font-size 14px
                        line-height: 48px
                        //flex: 0 0 56px
                    .cartcontrol
                        bottom: 0
                        position: absolute
                        //flex: 0 0 120px
                        display: inline-block

    .notenough
        line-height 48px
        height: 48px
        text-align center
        color: #b8b8b8
        font-size 14px
        font-weight:700
.cartback
    position: fixed
    z-index: -200
    width:100%
    height:100%
    overflow: hidden
    background rgba(7, 17, 27, 0.5)
    top 0
    left 0
    backdrop-filter: blur(5px)


.slide-fade-enter-active {
    transition: all .4s ease;
}
.slide-fade-leave-active {
    transition: all .4s //cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter{

    transform: translateY(50px);
    opacity: 0;
}
.slide-fade-leave-to{

    transform: translateY(20px);
    opacity: 0;
}

.back-fade-enter-active {
    transition: all .5s ease;
}
.back-fade-leave-active {
    transition: all .5s //cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.back-fade-enter{

    transform: translateX(00px);
    opacity: 0;
}
.back-fade-leave-to{

    transform: translateX(00px);
    opacity: 0;
}

</style>