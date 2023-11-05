import styled from 'styled-components'

import { mainActiveColor } from '../../assets/css/variable'

export const AppHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 64px;
  min-width: 1066px;
  background-color: #fff;

  img {
    position: relative;
    right: 50px;
  }

  .category {
    width: 676px;
  }

  .search {
    position: relative;
    left: 60px;
    width: 390px;
    height: 40px;

    input {
      background-color: #f5f5f5;
      border: 2px solid #f5f5f5;
      padding-right: 52px;
      padding-left: 18px;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      outline: none;

      box-sizing: border-box;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 40px;
      border: none;
      position: absolute;
      top: 0;
      right: 0;
      background-color: transparent;

      i {
        text-align: center;
        display: inline-block;
        width: 30px;
        height: 30px;
        background-image: url("https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/search_icon_red.8cddc3e5.svg");
      }
    }
  }

  .login {
    margin-left: 20px;
    position: relative;
    left: 60px;
    button {
      background-color: ${mainActiveColor};
      border: none;
      padding: 8px 16px;
      color: #fff;
      border-radius: 6px;
    }
  }
`
