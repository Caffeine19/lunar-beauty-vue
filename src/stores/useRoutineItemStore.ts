import { defineStore } from "pinia";
import {
  reqRoutineItemFindByRoutine,
  reqRoutineFindNode,
  reqRoutineFindEdge,
} from "@/api";

import type { IRoutineItem } from "@/types/routineItem";

import type { IProductNode } from "@/types/productNode";
import type { IIngredientNode } from "@/types/ingredientNode";
import { EdgeType, type IEdge } from "@/types/edge";

import { MarkerType, Position } from "@vue-flow/core";
import type { Node, Edge } from "@vue-flow/core";

const useRoutineItemStore = defineStore({
  id: "routineItem",
  state: () => {
    return {
      routineItemList: [] as IRoutineItem[],
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
      elementList: [] as (Node<IProductNode | IIngredientNode> | Edge<IEdge>)[],
    };
  },
  actions: {
    async getRoutineItemList(routineId: number) {
      try {
        const res = await reqRoutineItemFindByRoutine(routineId);
        const { routineItemList } = res.data;
        routineItemList.forEach((routineItem: IRoutineItem) => {
          routineItem.expense =
            "$" +
            (
              routineItem.amount * parseInt(routineItem.product.price.slice(1))
            ).toString();
        });
        this.routineItemList = routineItemList;
        console.log({ routineItemList });
      } catch (error) {
        console.log(error);
      }
    },
    async getRoutineNode(routineId: number) {
      try {
        const res = await reqRoutineFindNode(routineId);
        const { nodeList } = res.data;

        nodeList.forEach((pNode: IProductNode, index: number) => {
          this.elementList.push({
            id: pNode.id + "PNode",
            label: pNode.label,
            data: {
              id: pNode.id + "PNode",
              label: index + pNode.label,
              position: {
                x: pNode.x || 0,
                y: pNode.y || 0,
              },
              routineItemId: pNode.routineItemId,
              showChildren: false,
            },
            position: {
              x: pNode.x || 0,
              y: pNode.y || 0,
            },
            sourcePosition: Position.Left,
            targetPosition: Position.Right,
            class: "product-node",
          });
          pNode.ingredientNodes?.forEach((iNode) => {
            this.elementList.push({
              id: iNode.id + "INode",
              label: iNode.label,
              data: {
                id: iNode.id + "INode",
                label: iNode.label,
                productNodeId: iNode.productNodeId,
              },
              position: {
                x: iNode.x || 0,
                y: iNode.y || 0,
              },
              parentNode: pNode.id + "PNode",
              hidden: true,
              sourcePosition: Position.Left,
              targetPosition: Position.Right,
              class: "ingredient-node",
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getRoutineEdge(routineId: number) {
      try {
        const res = await reqRoutineFindEdge(routineId);
        const { edgeList } = res.data;
        console.log({ edgeList });
        edgeList.forEach((e: IEdge) => {
          this.elementList.push({
            id: e.id + "Edge",
            label: e.label,
            source: e.source,
            target: e.target,
            data: {
              id: e.id + "Edge",
              label: e.label,
              routineId: e.routineId,
              source: e.source,
              target: e.target,
              edgeType: e.edgeType,
            },
            type: e.edgeType == EdgeType.PP ? "smoothstep" : "default",
            style: { stroke: "#DBC5CF" },
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
export default useRoutineItemStore;
