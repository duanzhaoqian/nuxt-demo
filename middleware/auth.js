import auth from '~/assets/utils/auth'
export default function({ route, req, res, redirect }) {
  const whiteList = ['/login'] // 不重定向白名单

  let isClient = process.client
  let isServer = process.server
  let redirectURL = '/login'
  var token, path
  console.log('isClient'+isClient)
  console.log('isServer'+isServer)
  //在服务端
  if (isServer) {
    let cookies = auth.getcookiesInServer(req)
    path = req.originalUrl
    token = cookies.token ? cookies.token : ''
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = auth.getcookiesInClient()
    path = route.path
  }
  
  if (path) {
    redirectURL = redirectURL+'?ref=' + encodeURIComponent(path)
  }
  if (whiteList.indexOf(path.split('?')[0]) !== -1) {
    //console.log('whiteList  '+path.split('?')[0])
    return
  }
  //需要进行权限判断的页面开头
  if (!token) {
    console.log('token >>' +token)
    redirect(redirectURL)
  }
}
