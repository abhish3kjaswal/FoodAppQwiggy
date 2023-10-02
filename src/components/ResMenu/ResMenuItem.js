import React from 'react'
import { resmenuImgUrl } from '../../util/constant'
import { Typography } from '@mui/material'

const ResMenuItem = (props) => {
    const { v } = props
    return (
        <div className='resMenuMainCon'>
            <div className='resMenuLeft'>
                <Typography sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {v?.card?.info?.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 'small', marginBottom: '8px' }}>
                    {v?.card?.info?.defaultPrice / 100} Rs
                </Typography>
                <Typography variant='subtitle' sx={{ fontSize: 'small' }}>
                    {v?.card?.info?.description}
                </Typography>
            </div>
            <div className='resMenuRight'>
                <img src={resmenuImgUrl + v?.card?.info?.imageId} alt='food img' className='resFoodImg' />
                <button className='resFoodAddBtn'>Add</button>
            </div>
        </div>
    )
}

export default ResMenuItem