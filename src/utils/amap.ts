export const openAmap = (destination: string) => {
  // 使用 POI 搜索而不是路径规划，因为我们没有经纬度
  const androidScheme = `androidamap://poi?sourceApplication=TravelApp&keywords=${encodeURIComponent(destination)}`;
  const iosScheme = `iosamap://poi?sourceApplication=TravelApp&keywords=${encodeURIComponent(destination)}`;
  
  // 网页版高德链接，支持呼起 App（callnative=1）
  const webUrl = `https://uri.amap.com/search?keyword=${encodeURIComponent(destination)}&callnative=1`;

  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.indexOf('android') > -1;
  const isIos = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);
  const isWechat = ua.indexOf('micromessenger') !== -1;

  if (isWechat) {
    // 微信内直接跳网页版，高德的网页版自带右上角"在APP内打开"（微信会拦截自定义 Scheme）
    window.location.href = webUrl;
    return;
  }

  if (isAndroid) {
    window.location.href = androidScheme;
  } else if (isIos) {
    window.location.href = iosScheme;
  } else {
    window.location.href = webUrl;
    return;
  }
  
  // 备用方案：如果 2 秒内没有触发 App 唤起导致页面隐藏，则跳网页版
  const timer = setTimeout(() => {
    window.location.href = webUrl;
  }, 2000);

  // 如果成功唤起 App，页面会隐藏，此时清除定时器防止跳回网页
  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);
}
