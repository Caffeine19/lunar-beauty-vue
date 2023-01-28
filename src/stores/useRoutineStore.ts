import { defineStore } from "pinia";
import {
  reqRoutineCreateByUser,
  reqRoutineDeleteById,
  reqRoutineFindByUser,
  reqRoutineUpdateById,
} from "@/api";
import type { IRoutine } from "@/types/routine";
import type { ITooltipInfo } from "@/types/tooltip";
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
    async updateById(routineId: number, name: string): Promise<ITooltipInfo> {
      try {
        const res = await reqRoutineUpdateById(routineId, name);
        const { updatedRoutine } = res.data;
        console.log({ updatedRoutine });
        this.routineList.forEach((routine, index) => {
          if (routine.id == updatedRoutine.id) {
            this.routineList[index].name = updatedRoutine.name;
            return;
          }
        });
        return { status: true, content: "update succeeded" };
      } catch (error) {
        console.log(error);
        return { status: false, content: "update failed" };
      }
    },
    async deleteById(routineId: number): Promise<ITooltipInfo> {
      try {
        const res = await reqRoutineDeleteById(routineId);
        const { deletedRoutine } = res.data;
        this.routineList = this.routineList.filter((routine) => {
          return routine.id != deletedRoutine.id;
        });
        return { status: true, content: "delete succeeded" };
      } catch (error) {
        console.log(error);
        return { status: false, content: "delete failed" };
      }
    },
    async createByUser(
      userId: number,
      name: string
    ): Promise<ITooltipInfo<number>> {
      try {
        const res = await reqRoutineCreateByUser(userId, name);
        const { createdRoutine } = res.data;
        console.log({ createdRoutine });
        this.routineList.push(createdRoutine);
        return {
          status: true,
          content: "create succeeded",
          data: createdRoutine.id as number,
        };
      } catch (error) {
        console.log(error);
        return { status: false, content: "create failed" };
      }
    },
  },
});
export default useRoutineStore;
