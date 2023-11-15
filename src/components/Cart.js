import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, placeOrder, removeFromCart,resetCart } from '../features/Cart/cartSlice'
import { resmenuImgUrl } from '../util/constant'
import { Button } from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Cart = () => {
  const state = useSelector(state => state?.cart?.cartData)

  const dispatch = useDispatch()


  const [cartAr, setCartAr] = useState([])

  // const [openModal, setOpenModal] = useState(false)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ab = Object.keys(state).length ? Object.keys(state[Object.keys(state)]).map(ele => {
      return state[Object.keys(state)[0]][ele]
    }) : []

    setCartAr(ab)
  }, [state])

  console.log("cartAr-->", cartAr)

  const addCart = (e, ele) => {
    e && e.preventDefault()
    let obj = {
      id: ele?.id,
      name: ele?.name,
      price: ele?.defaultPrice || ele?.price,
      imageId: ele?.imageId,
      resName: ele?.resName
    }
    dispatch(addToCart(obj))
  }

  const removeCart = (e, id) => {
    e && e.preventDefault()
    if (state && Object.keys(state).length) {
      dispatch(removeFromCart(id))
    }
  }

  const handlePlaceOrder = () => {
    console.log("handle Place Order")
    dispatch(placeOrder(cartAr))
    handleClickOpen()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(resetCart());

    setOpen(false);
  };

  return <>{cartAr && cartAr.length == 0 ? <>
    <div className='cartCon' >
      No Items in the Cart
    </div>
  </>
    : <div className='cartCon'>
      <label>
        <h3 style={{ fontSize: 'medium' }}>
          {state && Object.keys(state).length ?
            (Object.keys(state))[0]
            : ""}
        </h3>
      </label>
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0', width: '600px' }}>
        {cartAr && cartAr.length > 0 ?
          cartAr.map((ele, i) =>
            <li key={i} className='liCardsResMenu'>
              <div className='cartTopSec'>
                <div className='cartLeftSec'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={resmenuImgUrl + ele?.imageId} className='cartMenuImage' />
                    <h4 style={{ marginLeft: '10px' }}>{ele?.name}</h4>
                  </div>
                  <p>
                    <h4 style={{ marginLeft: '18px', marginTop: '5px', marginBottom: '0' }}>{ele?.price / 100} Rs</h4>
                  </p>
                </div>
                <div className='cartRightSec'>
                  <button className='liCart-Btn2' onClick={e => removeCart(e, { id: ele?.id, resName: ele?.resName })}>
                    -
                  </button>
                  <label>
                    {ele?.count}
                  </label>
                  <button
                    className='liCart-Btn1' onClick={e => addCart(e, ele)}>
                    +
                  </button>
                </div>
              </div>
              {i < cartAr.length - 1 && <hr />}
            </li>)
          : ""}
      </ul>
      <div className='cartBottomSec'>
        <Button variant='contained' color='success' onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>}

    {open && <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Order Placed Successfully"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
            <CheckCircleIcon fontSize='xl'/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Close</Button>
        {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
      </DialogActions>
    </Dialog>}
  </>
}

export default Cart