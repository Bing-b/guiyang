import { defineStore } from 'pinia'
import itineraryData from '../assets/data/itinerary.json'

export const useItineraryStore = defineStore('itinerary', {
  state: () => ({
    itinerary: itineraryData,
    currentDayIndex: 0
  }),
  actions: {
    setCurrentDay(index: number) {
      this.currentDayIndex = index;
    },
    initAutoLocation() {
      // Logic to auto switch to current day based on start date
      // "6.18" is the first day. 
      // This is a simplified logic. In a real app we might parse dates better.
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      const todayStr = `${currentMonth}.${currentDate}`;
      
      const foundIndex = this.itinerary.findIndex(day => day.date === todayStr);
      if (foundIndex !== -1) {
        this.currentDayIndex = foundIndex;
      }
    }
  }
})
