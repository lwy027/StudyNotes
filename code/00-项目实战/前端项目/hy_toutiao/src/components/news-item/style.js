import styled from 'styled-components'

export const NewsItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  cursor: pointer;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
      color: #222;
    }

    .desc {
      font-size: 14px;
      color: #999;
      margin-top: 20px;

      .comment {
        margin: 0 12px;
      }
    }
  }

  .album {
    img {
      width: 160px;
      height: 120px;
      object-fit: cover;
    }
  }
`
