import { createSlice, current } from "@reduxjs/toolkit";

const init = {
  cartData: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    addToCart: (state, action) => {
      const { resName, id, name, imageId, price } = action?.payload;
      //current cart Object
      let ob = current(state).cartData;

      //prev Restaurant name
      let prevName = Object.keys(ob).length ? Object.keys(ob)[0] : "";

      //if prev Restaurant is not equal to new then clear object
      if (prevName && prevName != resName) {
        ob = {};
      }

      //adding items to existing restaurant present in cart
      if (
        Object.keys(ob).includes(resName) &&
        Object.keys(ob[resName]).includes(id)
      ) {
        let newOb = {
          ...ob,
          [resName]: {
            ...ob[resName],
            [id]: {
              ...ob[resName][id],
              count: ob[resName][id].count + 1,
              resName,
              id,
              name,
              imageId,
              price,
            },
          },
        };

        state.cartData = { ...newOb };
      } else {
        //adding new Restaurant to cart
        ob = {
          ...ob,
          [resName]: {
            ...(ob[resName] && ob[resName]),
            [id]: {
              id,
              name,
              imageId,
              price,
              count: 1,
              resName,
            },
          },
        };
        state.cartData = { ...ob };
      }
    },
    removeFromCart: (state, action) => {
      let obj = current(state).cartData;

      let { id, resName } = action.payload;

      if (
        Object.keys(obj).includes(resName) &&
        Object.keys(obj[resName]).includes(id)
      ) {
        if (obj[resName][id]?.count == 1) {
          let ob = { ...obj[resName] };
          delete ob[id];

          if (Object.keys(ob).length) {
            if (obj[resName]) {
              obj = {
                [resName]: {
                  ...ob,
                },
              };
            }
          } else {
            obj = {};
          }
          state.cartData = obj;
        } else {
          let newObj = {
            ...obj,
            [resName]: {
              ...obj[resName],
              [id]: {
                ...obj[resName][id],
                count: obj[resName][id].count - 1,
                resName,
              },
            },
          };
          state.cartData = { ...newObj };
        }
      }
    },
    resetCart: (state, action) => {
      state.cartData = {};
    },
    placeOrder: (state, action) => {
      state.orderDetail = action?.payload;
    },
  },
});

export const { addToCart, removeFromCart, resetCart, placeOrder } =
  cartSlice.actions;

export default cartSlice.reducer;
