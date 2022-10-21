import { defineStore } from "pinia";
import { reqRoutineProductFindByRoutine, reqRoutineFindFlow } from "@/api";

import type { IRoutineProduct } from "@/types/routineProduct";
import type { IProductNode } from "@/types/productNode";
import type { IIngredientNode } from "@/types/ingredientNode";

import { MarkerType, Position } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";

const useRoutineProductStore = defineStore({
  id: "routineProduct",
  state: () => {
    return {
      routineProductList: [] as IRoutineProduct[],
      initialElements: [
        {
          id: "1",
          type: "input",
          label: "Node 1",
          position: { x: 250, y: 5 },
          class: "light",
        },
        {
          id: "2",
          type: "output",
          label: "Node 2",
          position: { x: 100, y: 100 },
          class: "light",
        },
        {
          id: "3",
          label: "Node 3",
          position: { x: 400, y: 100 },
          class: "light",
        },
        {
          id: "4",
          label: "Node 4",
          position: { x: 150, y: 200 },
          class: "light",
        },
        {
          id: "5",
          type: "output",
          label: "Node 5",
          position: { x: 300, y: 300 },
          class: "light",
        },
        { id: "e1-2", source: "1", target: "2", animated: true },
        {
          id: "e1-3",
          label: "edge with arrowhead",
          source: "1",
          target: "3",
          markerEnd: MarkerType.Arrow,
        },
        {
          id: "e4-5",
          type: "step",
          label: "step-edge",
          source: "4",
          target: "5",
          style: { stroke: "orange" },
          labelStyle: { stroke: "black" },
          labelBgStyle: { fill: "orange" },
        },
        {
          id: "e3-4",
          type: "smoothstep",
          label: "smoothstep-edge",
          source: "3",
          target: "4",
        },
      ],
      nodeList: [] as Node<IProductNode | IIngredientNode>[],
    };
  },
  actions: {
    async getRoutineProductList(routineId: number) {
      try {
        const res = await reqRoutineProductFindByRoutine(routineId);
        const { routineProductList } = res.data;
        routineProductList.forEach((routineProduct: IRoutineProduct) => {
          routineProduct.expense =
            "$" +
            (
              routineProduct.amount *
              parseInt(routineProduct.product.price.slice(1))
            ).toString();
        });
        this.routineProductList = routineProductList;
        console.log({ routineProductList });
      } catch (error) {
        console.log(error);
      }
    },
    async getRoutineFlow(routineId: number) {
      try {
        const res = await reqRoutineFindFlow(routineId);
        const { flowList } = res.data;

        flowList.forEach((pNode: IProductNode) => {
          this.nodeList.push({
            id: pNode.id + "pNode",
            label: pNode.label,
            data: {
              id: pNode.id + "pNode",
              label: pNode.label,
              position: {
                x: pNode.x || 0,
                y: pNode.y || 0,
              },
              routineProductId: pNode.routineProductId,
              showChildren: false,
            },
            position: {
              x: pNode.x || 0,
              y: pNode.y || 0,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            class: "product-node",
          });
          pNode.ingredientNodes?.forEach((iNode) => {
            this.nodeList.push({
              id: iNode.id + "iNode",
              label: iNode.label,
              data: {
                id: iNode.id + "iNode",
                label: iNode.label,
                productNodeId: iNode.productNodeId,
              },
              position: {
                x: iNode.x || 0,
                y: iNode.y || 0,
              },
              parentNode: pNode.id + "pNode",
              hidden: true,
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
              class: "ingredient-node",
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
export default useRoutineProductStore;
