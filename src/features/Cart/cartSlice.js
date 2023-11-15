import { createSlice, current } from "@reduxjs/toolkit"


const init = {
    cartData: {},
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: init,
    reducers: {
        addToCart: (state, action) => {
            console.log("addToCart Slice----->")
            const { resName, id, name, imageId, price } = action?.payload

            console.log("action?.payload-->",action?.payload)
            
            let ob = current(state).cartData
            console.log("action?.payload ob-->", ob)

            let prevName = Object.keys(ob).length ? Object.keys(ob)[0] : ""
            console.log(" prevName-->", prevName)


            if (prevName && prevName != resName) {
                ob = {}
            }

            if (Object.keys(ob).includes(resName) && Object.keys(ob[resName]).includes(id)) {
                console.log("insiide if-->")
                let newOb = {
                    ...ob,
                    [resName]: {
                        ...ob[resName],
                        [id]: {
                            ...ob[resName][id],
                            count: ob[resName][id].count + 1,
                            resName,
                            id, name, imageId, price
                        }
                    }
                }

                state.cartData = { ...newOb }
            }
            else {
                console.log("insiide else-->")

                ob = {
                    ...ob,
                    [resName]: {
                        ...(ob[resName] && ob[resName]),
                        [id]: {
                            id, name, imageId, price, count: 1, resName
                        }
                    }
                }
                console.log("Else-->",ob)
                state.cartData = { ...ob }
            }

            console.log("CART SLICE-->",state)
        },
        removeFromCart: (state, action) => {
            let obj = current(state).cartData

            let { id, resName } = action.payload

            if (Object.keys(obj).includes(resName) && Object.keys(obj[resName]).includes(id)) {
                if (obj[resName][id]?.count == 1) {
                    let ob = { ...obj[resName] }
                    delete ob[id]

                    if (Object.keys(ob).length) {
                        if (obj[resName]) {
                            obj = {
                                [resName]: {
                                    ...ob
                                }
                            }
                        }
                    }
                    else {
                        obj = {}
                    }
                    state.cartData = obj
                } else {
                    let newObj = {
                        ...obj,
                        [resName]: {
                            ...obj[resName],
                            [id]: {
                                ...obj[resName][id],
                                count: obj[resName][id].count - 1,
                                resName
                            }
                        }
                    }
                    state.cartData = { ...newObj }
                }
            }

        },
        resetCart:(state,action)=>{
            state.cartData = {}
        },
        placeOrder:(state,action)=>{
            state.orderDetail = action?.payload
            console.log("action-->",action)
        }
    }
})


export const { addToCart, removeFromCart, resetCart, placeOrder } = cartSlice.actions

export default cartSlice.reducer