// 所有网络请求均使用 setTimeout 模拟，返回假数据。

/**
 * 模拟发送验证码
 * @param {string} account 账号（手机号/邮箱）
 * @returns {Promise<{success:boolean, message:string}>}
 */
export function mockSendCode(account) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: '验证码已发送，请注意查收' })
    }, 800)
  })
}

/**
 * 模拟登录请求
 * 约定：密码输入 "error" 时模拟登录失败，其余情况成功。
 * @param {{account:string, password:string, code:string}} payload
 * @returns {Promise<{success:boolean, message:string, token?:string}>}
 */
export function mockLogin({ account, password, code }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (password === 'error') {
        resolve({ success: false, message: '账号或密码错误，请重新输入' })
        return
      }
      resolve({
        success: true,
        message: '登录成功',
        token: 'fake-jwt-' + Math.random().toString(36).slice(2)
      })
    }, 1200)
  })
}
