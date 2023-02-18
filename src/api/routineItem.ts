import axiosInstance from ".";

export const reqRoutineItemFindByRoutine = (routineId: number) => {
  return axiosInstance.post("/routineItem/findByRoutine", { routineId });
};
