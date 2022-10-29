interface IA {
  name: string;
  id: number;
  test1: boolean;
  type: "a";
}
interface IB {
  name: string;
  id: number;
  type: "b";
}

// interface IAOrIb {
//   Or: IA | IB;
// }

interface combineAAndB<T> {
  data: T;
}

const a: IA = {
  name: "a",
  id: 1,
  test1: true,
  type: "a",
};

const combinedA: combineAAndB<IA | IB> = {
  data: a,
};

// console.log(combinedA.data.test1);

/*直接类型断言*/
if ((combinedA.data as IA).test1) {
  console.log((combinedA.data as IA).test1 !== undefined);
}
/*通过in来判断是否具有属性*/
if ("test1" in combinedA.data) {
  console.log(combinedA.data.test1);
}
/*在原有类型上增加用于标识的属性*/
if (combinedA.data.type == "a") {
  console.log(combinedA.data.test1);
}
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);
