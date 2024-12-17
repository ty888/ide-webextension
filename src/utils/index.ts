/**
 * 判断是否是插件CDN
 * @param url 插件CDN
 * @returns boolean
 */
function isCDNJSFile(url: string): boolean {
  // 判断地址中是否包含 sunmi.com
  const hasSunmiDomain = url.includes('sunmi.com');

  // 判断地址是否以 .js 或 .cjs 结尾
  const endsWithJS = url.endsWith('.js');
  const endsWithCJS = url.endsWith('.cjs');

  // 返回是否满足条件
  return hasSunmiDomain && (endsWithJS || endsWithCJS);
}

/**
 * 判断是否是IDE环境
 * @param url 页面URL
 * @returns boolean
 */
function isIDEWeb(url: string): boolean {
  const regex = /^(https?:\/\/)?(?:ide|local)\.(\w+\.)?(?:sunmi|maxiot)\.com(:\d+)?\/?.*$/;
  return regex.test(url);
}


function returnEnv(url: string): string {
  if(url?.includes('ide.dev.maxiot.com')) {
    return '开发环境'
  }

  if(url?.includes('ide.test.maxiot.com')) {
    return '测试环境'
  }

  if(url?.includes('ide.pre.maxiot.com')) {
    return '预发环境'
  }

  if(url?.includes('ide.maxiot.com')) {
    return '线上环境'
  }
  
  return '非IDE正式环境'
}

export {
  isCDNJSFile,
  returnEnv,
  isIDEWeb
}