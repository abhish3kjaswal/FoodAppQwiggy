import React from 'react'
import { resmenuImgUrl } from '../../util/constant'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/Cart/cartSlice'
const ResMenuItem = ({ item,resName }) => {

    const dispatch=useDispatch()

    const AddCartItem = (e, item) => {
        e?.preventDefault()
        e?.stopPropagation()

        let ob={
            id:item.id,
            name:item.name,
            imageId:item.imageId,
            resName:resName,
            price:item.price || item.defaultPrice,
        }

        dispatch(addToCart(ob))   
    }

    const cartState = useSelector(state => state?.cart?.cartData)

    const currentCartstate= cartState && Object.keys(cartState).length ? cartState[Object.keys(cartState)[0]]:{}

    console.log("currentStateCart->",currentCartstate)

    return (
        <div className='resMenuMainCon'>
            <div className='resMenuLeft'>
                <Typography sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {item?.card?.info?.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 'small', marginBottom: '8px' }}>
                    {item?.card?.info?.defaultPrice || item?.card?.info?.price / 100} Rs
                </Typography>
                <Typography variant='subtitle' sx={{ fontSize: 'small' }}>
                    {item?.card?.info?.description || ""}
                </Typography>
            </div>
            <div className='resMenuRight'>
                <img src={resmenuImgUrl + item?.card?.info?.imageId} alt='food img' className='resFoodImg' />
                <Button className='resFoodAddBtn' variant='contained' onClick={e => AddCartItem(e, { ...item?.card?.info })}>Add {
                    currentCartstate && Object.keys(currentCartstate).length && Object.keys(currentCartstate).includes(item?.card?.info?.id) ? currentCartstate[item?.card?.info?.id]?.count
                        : ""
                }</Button>
            </div>
        </div>
    )
}

export default ResMenuItem