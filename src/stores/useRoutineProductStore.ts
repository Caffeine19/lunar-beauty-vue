import { defineStore } from "pinia";
import { reqRoutineProductFindByRoutine } from "@/api";
import type { IRoutineProduct } from "@/types/routineProduct";
const useRoutineProductStore = defineStore({
  id: "routineProduct",
  state: () => {
    return {
      routineProductList: [] as IRoutineProduct[],
    };
  },
  actions: {
    async getRoutineProductList(routineId: number) {
      try {
        const res = await reqRoutineProductFindByRoutine(routineId);
        const { routineProductList } = res.data;
        this.routineProductList = routineProductList;
        console.log({ routineProductList });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useRoutineProductStore;
