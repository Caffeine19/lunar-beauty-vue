import axiosInstance from ".";

export const reqRoutineFindByUser = (userId: number) => {
  return axiosInstance.post("/routine/findByUser", { userId });
};
export const reqRoutineFindNode = (routineId: number) => {
  return axiosInstance.post("/routine/findNode", { routineId });
};
export const reqRoutineFindEdge = (routineId: number) => {
  return axiosInstance.post("/routine/findEdge", { routineId });
};
export const reqRoutineUpdateById = (routineId: number, name: string) => {
  return axiosInstance.post("/routine/updateById", { routineId, name });
};

export const reqRoutineDeleteById = (routineId: number) => {
  return axiosInstance.post("/routine/deleteById", { routineId });
};
export const reqRoutineCreateByUser = (userId: number, name: string) => {
  return axiosInstance.post("/routine/createByUser", { userId, name });
};
