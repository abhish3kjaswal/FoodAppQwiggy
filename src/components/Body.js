import { useEffect, useState } from "react";
import restList from "../util/restaurantListData";
import RestaurantCard from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";
import useOnlineStatus from "../util/useOnlineStatus";
import ResCardHOC from "../HOC/ResCardHOC";
import { Box, Button, Input } from "@mui/material";
// import { Button } from "@mui/material";

// let ti;

const Body = () => {
  const [foodList, setFoodList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const [defFoodList, setDefFoodList] = useState([]);

  useEffect(() => {
    getSwiggyData();
  }, []);

  useEffect(() => {
    //debounce method
    let ti = setTimeout(() => {
      handleSearch();
    }, 2000);

    return () => {
      clearTimeout(ti);
    };
  }, [searchTxt]);

  const topRated = (e) => {
    e && e.preventDefault();
    let ar = foodList.filter((el, i) => el.avgRating > 4);
    setFoodList(ar);
  };
  const cancelTopRated = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    // setFoodList(defFoodList)
    getSwiggyData();
  };

  const getSwiggyData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.597312&lng=77.078112&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();


    // let resData = json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    let resData =
      jsonData?.data?.cards[5]?.card?.card?.gridElements ? jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants : jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    const ar =
      resData && Array.isArray(resData) && resData.map((ele) => ele.info);

    // setDefFoodList(ar)
    setFoodList(ar);
  };

  const handleSearch = () => {
    if (searchTxt) {
      // let ar = defFoodList.filter((el, i) => {
      let ar = foodList.filter((el, i) => {
        return el.name.toLowerCase().includes(searchTxt.toLowerCase());
      });
      setFoodList(ar);
    } else {
      // setFoodList(defFoodList)
      getSwiggyData();
    }
  };

  const online = useOnlineStatus();

  if (online === false) {
    return (
      <>
        <h1>Please connect to internet</h1>
      </>
    );
  }

  const EnhancedComp = ResCardHOC(RestaurantCard);

  const handleSearchTab = (e) => {
    const { value } = e.target;
    value && setSearchTxt(value);
  };


  return (
    <div className="bodyCon">
      <div className="filter">
        <button className="filter_Btn" onClick={topRated}>
          Top Rated
          <a href="#" className="cancelTopRated" onClick={cancelTopRated}>
            X
          </a>
        </button>
        <Box
          sx={{
            marginLeft: "30px",
          }}
        >
          <Input
            type="text"
            placeholder="Search"
            name="searchTxt"
            value={searchTxt}
            onChange={(e) => handleSearchTab(e)}
            // sx={{ border: 'none', outline: 'none' }}
          />
          <a
            href="#"
            className="clearSearch"
            onClick={() => {
              // setFoodList(defFoodList);
              getSwiggyData();
              setSearchTxt("");
            }}
          >
            X
          </a>
        </Box>
      </div>
      {foodList && foodList.length == 0 ? (
        <ShimmerUi />
      ) : (
        <div className="res-container">
          {foodList && foodList.length
            ? foodList.map((resObj, i) =>
                i % 2 == 0 ? (
                  <RestaurantCard key={i} resData={resObj} />
                ) : (
                  <EnhancedComp key={i} resData={resObj} />
                )
              )
            : ""}
        </div>
      )}
    </div>
  );
};
export default Body;
