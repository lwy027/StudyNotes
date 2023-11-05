<template>
    <div class="app-footer">
        <footer>
            <div class="f-top">
                <img src="~@/assets/image/icon.png" alt="">
                <div class="title">
                    <h1>熊猫优选</h1>
                    <p>年轻人网购首选</p>
                    <p>购物领券更省钱</p>
                </div>
                <div class="download">
                    <em>|</em>
                    <a href="javascript:;" >下载App</a>
                </div>
            </div>
            <div class="f-bottom">
                <img class="fb-icon" src="~@/assets/image/policeIcon.png" alt="">
                <span>浙公安网备案 33010602009949号</span>
                <em>|</em>
                <span>ICP备案号: 浙ICP备17012864号-1</span>
                <em>|</em>
                <img class="fb-icon" src="~@/assets/image/license.png" alt="">
                <span>证照信息</span>
                <img class="aqkx" src="~@/assets/image/aqkx_83x30.png" alt="">
            </div>
        </footer>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
// 在vue.config.js中配置全局导入
// @import url(@/assets/css/index.less);
.app-footer{
    margin-top: 81px;
    margin-bottom: 50px;
    height: 240px;
    width: 100%;
    opacity: .706;
    color: #fff;
    position: relative;

    background-color: black;
    footer{
        .contentArea();
        height: 100%;
        // color: @color;
        .f-top{
            padding-top: 37px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
                width: 112px;
                height: 112px;
                margin-right: 20px;
            }
            .title{
                text-align: center;
                margin-right: 300px;
                opacity: .95;
                h1{
                    margin: 0 0 5px 0;
                    font-size: 36px;
                    font-family: PingFangSC-Semibold;
                }
                p{
                    margin: 0;
                    font-size: 18px;
                    line-height: 25px;
                }
            }

            .download{
                padding-top: 10px;
                a{
                    font-size: 20px;
                    color: white;
                    text-decoration: none;
                }
            }
            em{
                font-style: normal;
                font-size: 20px;
                margin-right: 10px;
            }

        }
        .f-bottom{
            margin-top: 50px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            opacity: .9;
            .fb-icon{
                width: 22px;
                height: 22px;
                margin: 2px;
            }
            span{
                display: inline-block;
                padding-top: 4px;
                
            }
            em{
                font-style: normal;
                font-size: 20px;
                padding: 3px 3px 0 3px;
            }

            .aqkx{
                margin-left: 35px;
            }
        }
        
    }
}
</style>