import { defineStore } from "pinia";
import { reqRoutineFindByUser, reqRoutineFindFlow } from "@/api";
import type { IRoutine } from "@/types/routine";
const useRoutineStore = defineStore({
  id: "routine",
  state: () => {
    return {
      routineList: [] as IRoutine[],
    };
  },
  actions: {
    async getRoutineList(userId: number) {
      try {
        const res = await reqRoutineFindByUser(userId);
        const { routineList } = res.data;
        this.routineList = routineList;
        console.log({ routineList });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
export default useRoutineStore;
