import { useEffect, useState } from 'react'
import ShimmerUi from './ShimmerUi'
import { useParams } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as React from 'react';
import ResMenuItem from './ResMenu/ResMenuItem';
import { useSelector } from 'react-redux';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null)

    const [expanded, setExpanded] = useState("panel1")

    const { resId } = useParams()

    const cartState = useSelector(state => state?.cart?.cartData)

    const currentCartstate= cartState && Object.keys(cartState).length ? cartState[Object.keys(cartState)[0]]:{}

    console.log("currentStateCart->",currentCartstate)

    console.log("CartState->",cartState)

    useEffect(() => {
        fetchResData()
        return () => {
        }
    }, [])
 
    const fetchResData = async () => {
        const res = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.597312&lng=77.078112&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        // console.log()
        const json = await res.json()
        console.log(json)
        setResInfo(json.data)
    }

    const { name, cuisines, costForTwoMessage, avgRatingString, areaName } = resInfo ? resInfo?.cards[0]?.card?.card?.info : {};

    const itemCards = resInfo ?
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        : {}

    const categories = itemCards && itemCards.length && itemCards.filter(ele => ele?.card?.card['@type'] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    // console.log("RENDER-->", itemCards)

    const handleAccordionClick = (id) => {
        console.log("handleAccordionClick-->", id)
        if(id!==expanded){
            setExpanded(id)
        }
        else{
            setExpanded(false)
        }
    }

    return (
        resInfo === null ?
            <ShimmerUi />
            :
            <div className='resInfoCon'>
                <div className='resInfoConTop'>

                    <h2 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '8px', textTransform: 'capitalize', fontFamily: 'ProximaNova,arial,Helvetica Neue,sans-serif' }}>{name}</h2>
                    <h5 style={{ marginTop: "0", marginBottom: "0px", fontSize: 'small' }}>{cuisines.join(", ")}</h5>
                    <p style={{ marginTop: "5px", marginBottom: "10px", fontSize: 'small', fontWeight: 'bold' }}>{costForTwoMessage}</p>
                </div>
                <hr style={{ borderTop: "1px dashed" }} />
                {/* <h3 style={{paddingTop:'10px',paddingBottom:'10px',fontSize:'1.4rem',fontWeight:'600'}}>Menu</h3> */}
                <p style={{ marginTop: '20px' }}>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {categories && categories.length ?
                            categories.map((val, i) => {
                                return <>
                                    <Accordion key={i} sx={{ backgroundColor: '#f9f9f9' }} expanded={expanded === ('panel' + (i + 1))} onClick={() => handleAccordionClick('panel' + (i + 1))}>
                                        <AccordionSummary id={'panel' + (i + 1)} expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: "2px solid #787878" }}>
                                            <Typography sx={{ fontWeight: 'bold' }} >{val?.card?.card?.title || ""} ({val?.card?.card?.itemCards?.length})</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <div className='AccList'>
                                                    <ul>
                                                        {val?.card?.card?.itemCards ?
                                                            val?.card?.card?.itemCards.map((v, i) => {
                                                                return <li key={i} style={{ borderBottom: "2px solid #787878", padding: '20px', minHeight: '150px' }}>
                                                                    <ResMenuItem item={v} resName={name}/>
                                                                </li>
                                                            })
                                                            : ''}
                                                    </ul>

                                                </div>

                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div style={{ width: '50px', width: '100%' }}></div>
                                </>
                            })
                            : ''}

                    </ul>
                </p>
            </div>
    )
}

export default RestaurantMenu