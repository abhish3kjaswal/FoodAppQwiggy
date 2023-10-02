import { useEffect, useState } from "react";
import restList from "../util/restaurantListData";
import RestaurantCard from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../util/useOnlineStatus";
import ResCardHOC from "../HOC/ResCardHOC";
// import { Button } from "@mui/material";
const Body = () => {

  const [foodList, setFoodList] = useState([])
  const [searchTxt, setSearchTxt] = useState('')

  const [defFoodList, setDefFoodList] = useState([])

  const topRated = (e) => {
    e && e.preventDefault();
    console.log("topRated->", foodList)
    let ar = foodList.filter((el, i) => el.avgRating > 4)
    setFoodList(ar)

  }
  const cancelTopRated = (e) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    setFoodList(defFoodList)

  }

  const getSwiggyData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.597312&lng=77.078112&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    const json = await data.json()

    console.log("Res--->", json)

    // let resData = json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    let resData = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants

    console.log("REST resData--->", resData)

    const ar = resData && Array.isArray(resData) && resData.map(ele => ele.info)

    console.log("REST ar--->", ar)

    setFoodList(ar)
    setDefFoodList(ar)
  }

  useEffect(() => {
    getSwiggyData()
  }, [])

  console.log("Render-->", foodList)

  const handleSearch = (e) => {
    e && e.preventDefault();  
    console.log("SEARCH-->", searchTxt)
    if (searchTxt) {
      let ar = defFoodList.filter((el, i) => {
        return el.name.toLowerCase().includes(searchTxt.toLowerCase())
      })
      setFoodList(ar)
    }
    else {
      setFoodList(defFoodList)
    }
  }

  const online = useOnlineStatus()
  console.log("status->", online)


  if(online===false){
    return <><h1>Please connect to internet</h1></>
  }

  const EnhancedComp = ResCardHOC(RestaurantCard)


  return <div className='bodyCon'>
    <div className="filter">
      {/* <div className='searchBar'>
        <input type='text' placeholder='Search' name='searchTxt' value={searchTxt}
          onChange={(e) => {
            const { value } = e.target;
            setSearchTxt(value)
          }}
          style={{ border: 'none', outline: 'none' }} />
        <div className='searchLogo' onClick={(e) => handleSearch(e)}>
          <img className='searchLogoImg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUvM5mCyFuhrE2siG58NHl2DvnGC4CItj1Q&usqp=CAU' />
        </div>
      </div> */}
      <button className="filter_Btn" onClick={topRated}>Top Rated
        <a href="#" className="cancelTopRated" onClick={cancelTopRated}>X</a>
      </button>
      {/* <Button variant="contained" >Contained</Button> */}
    </div>
    {foodList && foodList.length == 0 ? <ShimmerUi />
      : <div className='res-container'>
        {foodList && foodList.length ? foodList.map((resObj, i) => (
          i % 2 == 0 ? <RestaurantCard key={i} resData={resObj} /> : <EnhancedComp  key={i} resData={resObj}/>
        )) : ''}
      </div>}
  </div>
}
export default Body;