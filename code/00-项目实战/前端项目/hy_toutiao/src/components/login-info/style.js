import styled from 'styled-components'

export const LoginInfoWrapper = styled.div`
  background-color: #fafafa;

  display: flex;
  flex-direction: column;
  align-items: center;

  .info {
    text-align: center;
    color: #505050;
    font-weight: 500;
    line-height: 1.3;
    font-size: 18px;
    margin: 10px 0;
  }
  
  .login {
    button {
      border: none;
      background-color: #f04142;
      box-shadow: none;
      padding: 8px 32px;
      line-height: 24px;
      color: #fff;
      border-radius: 6px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`
