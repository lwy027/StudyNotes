import styled from 'styled-components'

export const VideoItemWrapper = styled.a`
  display: flex;
  text-decoration: none;
  color: #222;

  margin-top: 30px;

  .album {
    position: relative;
    width: 126px;
    height: 96px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
    }

    .rank {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 3px;
      color: #fff;

      width: 26px;
      height: 20px;
      text-align: center;
      padding: 2px 0;
      background: #f04142;
    }
  }

  .info {
    flex: 1;
    margin-left: 8px;

    .title {
      font-weight: 500;
      line-height: 1.5;

      /* 显示两行 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .like {
      display: inline-block;
      margin: 5px 0;
      font-size: 12px;
      color: #f04142;
      background-color: #fff2f2;
      padding: 4px 6px;
      border-radius: 4px;
    }

    .desc {
      display: flex;
      justify-content: space-between;

      color: #999;
      font-size: 14px;
    }
  }
`
