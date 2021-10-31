import ShoppingList from "./views/ShoppingList.js";
import ShoppingNote from "./views/ShoppingNote.js";
import ShoppingStatistics from "./views/ShoppingStatistics.js";

const admindRoutes = [
  {
    path: "/shoppinglist",
    name: "쇼핑내역",
    component: ShoppingList,
    layout: "/main",
  },
  {
    path: "/shoppingnote",
    name: "쇼핑노트",
    component: ShoppingNote,
    layout: "/main",
  },
  {
    path: "/shoppingstatistics",
    name: "쇼핑통계",
    component: ShoppingStatistics,
    layout: "/main",
  },
];

export default admindRoutes;
