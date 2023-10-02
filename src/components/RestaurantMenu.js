import { useEffect, useState } from 'react'
import ShimmerUi from './ShimmerUi'
import { useParams } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as React from 'react';
import ResMenuItem from './ResMenu/ResMenuItem';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null)

    const { resId } = useParams()

    useEffect(() => {
        fetchResData()
        return () => {
            console.log("UNMOUNT")
        }
    }, [])


    const fetchResData = async () => {
        const res = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.597312&lng=77.078112&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        // console.log()
        const json = await res.json()
        console.log(json)
        setResInfo(json.data)
    }

    const { name, cuisines, costForTwoMessage } = resInfo ? resInfo?.cards[0]?.card?.card?.info : {};

    const itemCards = resInfo ?
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        : {}

    const categories = itemCards && itemCards.length && itemCards.filter(ele => ele?.card?.card['@type'] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")



    console.log("RENDER-->", itemCards)
    console.log("RENDER-->", categories)

    return (
        resInfo === null ?
            <ShimmerUi />
            :
            <div className='resInfoCon'>
                <h2>{name}</h2>
                <h5 style={{ marginTop: "0", marginBottom: "0px" }}>{cuisines.join(", ")}</h5>
                <p style={{ marginTop: "5px", marginBottom: "10px" }}>{costForTwoMessage}</p>
                <hr style={{ borderTop: "1px dashed" }} />
                <h3>Menu</h3>
                <hr />
                <p>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        <li>ab</li>
                        {categories && categories.length ?
                            categories.map((val, i) => {
                                return <>
                                    <Accordion key={i}>
                                        <AccordionSummary id={'panel' + (i + 1)} expandIcon={<ExpandMoreIcon />}>
                                            <Typography>{val?.card?.card?.title || ""}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <div className='AccList'>
                                                    <ul>
                                                        {val?.card?.card?.itemCards ?
                                                            val?.card?.card?.itemCards.map((v, i) => {
                                                                console.log("V-->", v)
                                                                return <li key={i} style={{ border: '1px solid', padding: '20px', minHeight: '150px' }}>
                                                                   <ResMenuItem v={v} />
                                                                   
                                                                </li>
                                                            })
                                                            : ''}
                                                    </ul>

                                                </div>

                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            })
                            : ''}
                        <Accordion>
                            <AccordionSummary id='panel1' expandIcon={<ExpandMoreIcon />}>
                                <Typography>Acc1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    TEXT............ Text.....
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ul>
                </p>
            </div>
    )
}

export default RestaurantMenu