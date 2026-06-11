<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import { useItineraryStore } from '../store/itinerary';
import ScenicCard from '../components/ScenicCard.vue';
import gsap from 'gsap';

const store = useItineraryStore();
const activeTab = ref(store.currentDayIndex);

onMounted(() => {
  store.initAutoLocation();
  activeTab.value = store.currentDayIndex;
  nextTick(() => {
    animateCards();
  });
});

watch(() => store.currentDayIndex, (newVal) => {
  activeTab.value = newVal;
});

const onTabChange = (index: number) => {
  store.setCurrentDay(index);
  nextTick(() => {
    animateCards();
  });
};

const animateCards = () => {
  const activePane = document.querySelector('.van-tab__panel[style*="display: none"]' ) === null 
    ? document.querySelectorAll('.van-tab__panel') 
    : [document.querySelector('.van-tab__panel:not([style*="display: none"])')];
  
  if (!activePane || !activePane[0]) return;
  
  const cards = activePane[0].querySelectorAll('.scenic-wrapper');
  if(cards.length === 0) return;

  gsap.fromTo(
    cards,
    { y: 60, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)', clearProps: 'all' }
  );
};
</script>

<template>
  <div class="min-h-screen scrapbook-bg pb-24 font-['Comic_Sans_MS',_-apple-system,sans-serif]">
    <!-- 手账风顶部标题 -->
    <div class="pt-10 pb-4 px-6 text-center sticky top-0 z-50 bg-[#FDF9EC]/90 backdrop-blur-md border-b-2 border-dashed border-[#F69022]/30 shadow-sm">
      <h1 class="text-[36px] font-black text-[#F69022] tracking-wider drop-shadow-sm transform -rotate-2">
        <span class="text-[#42B029]">贵</span><span class="text-[#007AFF]">阳</span>漫游
      </h1>
      <p class="text-[16px] text-[#4A3411] mt-1 font-bold bg-[#FFC516] inline-block px-4 py-0.5 rounded-full transform rotate-1 shadow-sm">4天3夜 • 寻味筑城</p>
    </div>

    <!-- 手账风 Tabs -->
    <van-tabs 
      v-model:active="activeTab" 
      @change="onTabChange"
      sticky 
      offset-top="102"
      color="#F69022" 
      title-active-color="#F69022"
      title-inactive-color="#8E8E93"
      background="transparent"
      class="scrapbook-tabs"
      animated
      swipeable
    >
      <van-tab 
        v-for="(day, index) in store.itinerary" 
        :key="day.day" 
        :title="`Day ${day.day}`"
      >
        <div class="p-4 pt-6 overflow-hidden md:max-w-4xl md:mx-auto">
          <div class="mb-10 text-center relative">
            <h2 class="text-[32px] font-black text-[#1C1C1E] tracking-tight relative inline-block z-10">
              {{ day.date }}
              <div class="absolute bottom-1 left-0 w-full h-3 bg-[#FFC516]/60 -z-10 -rotate-2"></div>
            </h2>
            <p class="text-[#42B029] font-black text-[18px] mt-2">{{ day.title }}</p>
          </div>

          <!-- 自定义手账时间轴 -->
          <div class="relative py-4">
            <!-- 中央虚线 -->
            <div class="absolute left-1/2 top-0 bottom-0 w-[3px] border-l-[3px] border-dashed border-[#F69022]/40 -translate-x-1/2 z-0"></div>
            
            <div 
              v-for="(activity, aIndex) in day.activities" 
              :key="aIndex"
              class="scenic-wrapper relative w-full flex justify-center mb-24 z-10"
            >
              <!-- 居中地图图钉 -->
              <div class="absolute left-1/2 -translate-x-1/2 -top-6 w-8 h-8 flex items-center justify-center z-30 drop-shadow-md">
                <van-icon name="location" class="text-[#F69022] text-[32px] md:text-[40px] md:bg-[#FDF9EC] md:rounded-full md:p-1" />
              </div>
              
              <!-- 卡片本体，通过 isLeft 参数交替倾斜 -->
              <div class="w-full px-2 md:px-8 flex justify-center">
                <ScenicCard 
                  :time="activity.time"
                  :location="activity.location"
                  :description="activity.description"
                  :index="index * 10 + aIndex + 1"
                  :is-left="aIndex % 2 === 0"
                  :options="activity.options"
                />
              </div>
            </div>
          </div>

        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style>
/* 手账网格背景 */
.scrapbook-bg {
  background-color: #FDF9EC;
  background-image: 
    linear-gradient(#E8E0C5 1px, transparent 1px),
    linear-gradient(90deg, #E8E0C5 1px, transparent 1px);
  background-size: 20px 20px;
}

.scrapbook-tabs .van-tabs__wrap {
  border-bottom: 2px dashed rgba(246, 144, 34, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(253, 249, 236, 0.8) !important;
}

.scrapbook-tabs .van-tab--active {
  font-weight: 900 !important;
  font-size: 17px !important;
}
.scrapbook-tabs .van-tab {
  font-weight: bold;
}
</style>
