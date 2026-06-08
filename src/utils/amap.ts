export const openAmap = (destination: string) => {
  // Mobile browser deep link for Amap
  const androidScheme = `androidamap://route?sourceApplication=TravelApp&dname=${encodeURIComponent(destination)}&dev=0&t=0`;
  const iosScheme = `iosamap://route?sourceApplication=TravelApp&dname=${encodeURIComponent(destination)}&dev=0&t=0`;
  const webUrl = `https://uri.amap.com/navigation?to=${encodeURIComponent(destination)}&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1`;

  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.indexOf('android') > -1;
  const isIos = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);

  if (isAndroid) {
    window.location.href = androidScheme;
  } else if (isIos) {
    window.location.href = iosScheme;
  }
  
  // Fallback to web map after a timeout if app didn't open
  setTimeout(() => {
    window.location.href = webUrl;
  }, 1500);
}
