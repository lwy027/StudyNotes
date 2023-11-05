import styled from 'styled-components'

export const HotRankingWrapper = styled.div`
  margin-top: 30px;

  .list {
    .item {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 20px 13px 20px 0;

      :nth-child(1) {
        .number {
          color: #a82e2e;
        }
      }

      :nth-child(2) {
        .number {
          color: #f04142;
        }
      }

      :nth-child(3) {
        .number {
          color: #ff9a03;
        }
      }


      .number {
        width: 24px;
        height: 24px;
        line-height: 24px;
        margin: 0 10px 0 0;
        text-align: center;

        font-size: 20px;
        color: #999;
      }

      .title {
        font-size: 16px;
        color: #222;
        flex: 1;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
`
