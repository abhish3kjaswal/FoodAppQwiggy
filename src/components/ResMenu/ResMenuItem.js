import React from 'react'
import { resmenuImgUrl } from '../../util/constant'
import { Button, Typography } from '@mui/material'
const ResMenuItem = ({v}) => {
    return (
        <div className='resMenuMainCon'>
            <div className='resMenuLeft'>
                <Typography sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {v?.card?.info?.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 'small', marginBottom: '8px' }}>
                    {v?.card?.info?.defaultPrice || v?.card?.info?.price / 100} Rs
                </Typography>
                <Typography variant='subtitle' sx={{ fontSize: 'small' }}>
                    {v?.card?.info?.description || ""}
                </Typography>
            </div>
            <div className='resMenuRight'>
                <img src={resmenuImgUrl + v?.card?.info?.imageId} alt='food img' className='resFoodImg' />
                <Button className='resFoodAddBtn' variant='contained'>Add+</Button>
            </div>
        </div>
    )
}

export default ResMenuItem