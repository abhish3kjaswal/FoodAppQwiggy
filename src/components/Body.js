import { useEffect, useState } from "react";
import restList from "../util/restaurantListData";
import RestaurantCard from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../util/useOnlineStatus";
import ResCardHOC from "../HOC/ResCardHOC";
import { Box, Button, Input } from "@mui/material";
// import { Button } from "@mui/material";


let ti;

const Body = () => {

  const [foodList, setFoodList] = useState([])
  const [searchTxt, setSearchTxt] = useState('')

  const [defFoodList, setDefFoodList] = useState([])

  useEffect(() => {
    getSwiggyData()
  }, [])

  useEffect(() => {
    //debounce method

    if(ti){
      clearTimeout(ti)
    }
    ti = setTimeout(() => {
      handleSearch()
    }, 2000)

  }, [searchTxt])

  const topRated = (e) => {
    e && e.preventDefault();
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
    const jsonData = await data.json()

    // let resData = json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    let resData = jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants

    const ar = resData && Array.isArray(resData) && resData.map(ele => ele.info)

    setFoodList(ar)
    setDefFoodList(ar)
  }

 

  const handleSearch = () => {
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

  if (online === false) {
    return <><h1>Please connect to internet</h1></>
  }

  const EnhancedComp = ResCardHOC(RestaurantCard)

  const handleSearchTab = (e) => {
    const { value } = e.target;
    setSearchTxt(value)
  }

  return <div className='bodyCon'>
    {/* <>
    <Button variant="contained" onClick={()=>setCo(co+1)}>+</Button>
  <label>{co}</label>
    </> */}
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
      <Box sx={{
        marginLeft: '30px',
      }}>
        <Input type='text' placeholder='Search' name='searchTxt' value={searchTxt}
          onChange={(e) => handleSearchTab(e)}
          // sx={{ border: 'none', outline: 'none' }} 
          />
        <a href="#" className="clearSearch" onClick={() => { setFoodList(defFoodList); setSearchTxt("") }}>X</a>
      </Box>
    </div>
    {foodList && foodList.length == 0 ? <ShimmerUi />
      : <div className='res-container'>
        {foodList && foodList.length ? foodList.map((resObj, i) => (
          i % 2 == 0 ? <RestaurantCard key={i} resData={resObj} /> : <EnhancedComp key={i} resData={resObj} />
        )) : ''}
      </div>}
  </div>
}
export default Body;