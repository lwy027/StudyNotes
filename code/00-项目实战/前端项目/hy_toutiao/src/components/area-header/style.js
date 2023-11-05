import styled from 'styled-components'

import iconHotImage from '../../assets/image/icon_hot.png'
import iconChangeImage from '../../assets/image/icon_change.png'

export const AreaHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;

  .left {
    padding-left: 30px;
    position: relative;

    h3 {
      font-size: 20px;
      color: #222;
      font-weight: 500;
      line-height: 28px;
      margin: 0;
    }

    ::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 22px;
      background: url(${iconHotImage}) center / 24px 22px;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .right {
    button {
      position: relative;
      padding-left: 28px;
      border: none;
      box-shadow: none;
      background-color: transparent;

      color: #f04142;
      font-weight: 600;
      line-height: 24px;

      cursor: pointer;

      ::before {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        background: url(${iconChangeImage}) center / 16px 16px;
        left: 6px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    
  }
`
