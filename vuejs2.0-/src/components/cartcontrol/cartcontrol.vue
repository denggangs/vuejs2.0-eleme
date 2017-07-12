<template>
<div class="cartcontrol">
    <transition name="slide-fade">
        <div transition="move"  class="cart-decrease" v-show="food.count>0" @click="decCart">
            <div class="inner  icon-remove_circle_outline"></div>
        </div>


    </transition>
    <div class="cart-count" v-show="food.count>0">
        {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart">

    </div>
</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
    export default {

        props:{
            food:{

                type:Object
            }
        },
        methods:{

            addCart(event){


                if(!event._constructed)
                {return}
//                console.log('ddd')
                if(!this.food.count){
                    Vue.set(this.food,'count',1)
                }else {
                    this.food.count +=1
                }

                this.$root.eventHub.$emit('cartadd',event.target)

                event.stopPropagation()

            },
            decCart(){



                if(!event._constructed)
                {return}


                    this.food.count -=1
                event.stopPropagation()
            }

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size 0
        color: #2ba2ff
        right:0
        .cart-decrease
            display: inline-block
            padding: 10px
            line-height 24px
            font-size 24px
            transition all 0.04s linear
            &.move-transition
                opacity:1
                transform translate3D(0,0,0)
                .inner
                    transition all 0.04s linear
                    transform rotate(0)
            &.move-enter,&.move-leave
                opacity:0
                transform translate3D(24px,0,0)
                .inner
                    transform  rotate(180deg)


        .cart-count
            display: inline-block
            padding-top 9px
            text-align center
            font-size 12px
            line-height 24px
            color: #c0c0c0
            vertical-align top
            width: 24px

        .cart-add
            display: inline-block
            padding: 10px
            line-height 24px
            font-size 24px


.slide-fade-enter-active {
    transition: all .4s ease;
}
.slide-fade-leave-active {
    transition: all .4s ease//cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{

    transform: translateX(5px);
    opacity: 0;
}

</style>