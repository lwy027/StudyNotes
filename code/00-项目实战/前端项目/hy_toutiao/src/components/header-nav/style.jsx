import styled from 'styled-components'

export const NavWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -10px;
  margin-right: 10px;

  font-size: 18px;
  font-weight: 400;

  .first {
    cursor: pointer;
  }

  .list {
    flex: 1;
    display: flex;
    justify-content: space-evenly;

    .item {
      cursor: pointer;
    }
  }
  .active {
    color: #f04142;
  }

  .last {
    position: relative;
    height: 64px;
    display: flex;
    align-items: center;

    .title {
      cursor: pointer;
      display: inline-block;
      padding: 8px 15px;
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    .more {
      display: none;
      position: absolute;
      top: 64px;
      right: 0;
      background-color: #fff;
      padding: 10px 0;

      box-sizing: border-box;
      border-radius: 8px;
      width: 352px;

      .item {
        width: 64px;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        margin: 5px 0 10px 19px;

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }

    &:hover .more {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
`