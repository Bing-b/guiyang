<script setup lang="ts">
import { computed } from 'vue';
import { openAmap } from '../utils/amap';

const props = defineProps<{
  time: string;
  location: string;
  description: string;
  index: number;
  isLeft: boolean;
}>();

const handleNavigate = () => {
  openAmap(props.location);
}

// 动态导入所有本地图片
const images = import.meta.glob('../assets/images/*', { eager: true, import: 'default' });

const displayImage = computed(() => {
  const loc = props.location;
  const desc = props.description;
  for (const path in images) {
    const filename = path.split('/').pop()?.split('.')[0] || '';
    if (loc.includes(filename) || filename.includes(loc) || desc.includes(filename)) {
      return images[path] as string;
    }
  }
  if (loc.includes('肠旺面') && images['../assets/images/肠旺面.png']) return images['../assets/images/肠旺面.png'] as string;
  if (loc.includes('烙锅') && images['../assets/images/大十字吃一烙锅.png']) return images['../assets/images/大十字吃一烙锅.png'] as string;
  if (loc.includes('锦江都城酒店') && images['../assets/images/贵阳北站锦江都城酒店.png']) return images['../assets/images/贵阳北站锦江都城酒店.png'] as string;
  if (loc.includes('市区') && images['../assets/images/贵阳市区.png']) return images['../assets/images/贵阳市区.png'] as string;
  return null;
});

// 提取关键词并高亮不同颜色，适配手账风格
const formattedDescription = computed(() => {
  let text = props.description;
  const transportRegex = /(地铁.*?号线|地铁|公交车|打车|高铁|S1 线城际|索道|步行)/g;
  const timeRegex = /(\d{1,2}:\d{2}|\d+(?:\.\d+)?(?:min|分钟|h|小时|～\d+h))/g;
  const actionRegex = /(入住|早餐|午餐|晚餐|宵夜|方案 ?[A-C]?)/g;
  const poiRegex = /(南门进|南门出|东门进|南门|东门|弘福寺|猕猴步道|熊猫馆|动物园|瞰筑亭|黔灵湖|麒麟洞|中山西路站 F 口|小孟工业园|大十字|国际生态会议中心|灵长猴区|文昌阁|电台街|虎门巷|主景区|东山寺)/g;
  
  text = text.replace(transportRegex, '<span class="text-[#007AFF] font-black">$1</span>'); 
  text = text.replace(timeRegex, '<span class="text-[#FF4500] font-black">$1</span>');     
  text = text.replace(poiRegex, '<span class="text-[#42B029] font-black">$1</span>');      
  text = text.replace(actionRegex, '<span class="text-[#9932CC] font-black">$1</span>');    
  
  return text;
});

// 随机旋转角度
const randomRotate = computed(() => {
  return props.isLeft ? -2 - (props.index % 2) : 2 + (props.index % 2);
});
</script>

<template>
  <div class="relative w-full flex flex-col items-center">
    
    <!-- 照片边框样式 -->
    <div 
      class="relative bg-white p-2 shadow-[4px_6px_15px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105 z-10 w-full max-w-[280px]" 
      :style="`border: 3.5px solid #F69022; transform: rotate(${randomRotate}deg)`"
    >
      
      <!-- 第X站 标签 -->
      <div 
        class="absolute -top-4 bg-[#FFC516] text-[#4A3411] font-black px-3 py-1 text-[16px] shadow-md z-20 border-[2.5px] border-white"
        :class="isLeft ? '-left-4 -rotate-6' : '-right-4 rotate-6'"
      >
        第{{ index }}站
      </div>
      
      <!-- 图片 -->
      <div class="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img v-if="displayImage" :src="displayImage" class="w-full h-full object-cover" loading="lazy" />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400 font-bold">暂无配图</div>
      </div>
      
      <!-- 地点绿色徽章 -->
      <div 
        class="absolute -bottom-5 bg-[#42B029] text-white font-black px-4 py-1.5 text-[15px] sm:text-[16px] shadow-md z-20 w-max max-w-[90%] break-words leading-snug rounded-sm" 
        :class="isLeft ? 'right-2 text-right' : 'left-2 text-left'"
      >
        {{ location }}
      </div>
    </div>
    
    <!-- 描述文字与时间 -->
    <div class="mt-12 mb-4 px-2 text-center w-full max-w-[300px]">
      <div class="inline-block bg-white/80 backdrop-blur border-2 border-dashed border-[#F69022] rounded-2xl px-4 pt-5 pb-3 shadow-sm relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 text-[#F69022] bg-[#FDF9EC] px-2 font-black text-[13px] whitespace-nowrap">
          🕒 {{ time }}
        </div>
        <p class="text-[#333] font-bold text-[15px] leading-[1.7] text-left" v-html="'· ' + formattedDescription"></p>
        
        <button 
          @click="handleNavigate"
          class="mt-3 inline-flex items-center justify-center bg-[#F69022] active:scale-95 transition-transform text-white font-black text-[14px] px-5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(246,144,34,0.4)]"
        >
          <van-icon name="guide-o" class="mr-1.5 text-[16px]" />
          出发
        </button>
      </div>
    </div>
    
  </div>
</template>
