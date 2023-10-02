import { CDN_URL } from "../util/constant"
import { useNavigate } from 'react-router-dom'

import StarIcon from '@mui/icons-material/Star'

const RestaurantCard = (props) => {
  const { resData: foodData } = props
  const navigate = useNavigate()

  return <div className="cardsOuter">
    <div className='res-card' onClick={() => { navigate(`/restaurants/${foodData?.id}`) }}>
      <div className='foodImg-Con'>
        <img className='foodImg' src={CDN_URL + foodData?.cloudinaryImageId} />
      </div>
      <div className="btm-part">
        <label>

          <h4 style={{ height: '44px', overflowY: 'auto', margin: '16px 0 15px 0' }}>{foodData?.name}</h4>
        </label>
        <p style={{ overflowY: 'auto', margin: '0' }}>
          {foodData && foodData.cuisines ? foodData.cuisines.join(", ") : ''}
        </p>
       
        <div className='BtnPart'>
          <div className="ratingCon">
            <StarIcon className="starCon"/>
            <label>{foodData?.avgRatingString} stars
            </label>
          </div>
          <h4>{foodData && foodData.costForTwo ? foodData.costForTwo : ''}</h4>
          <h4>{foodData?.sla?.deliveryTime} mins</h4>
        </div>
        {/* <div className='btnDiv'>
          <hr className='btnHr' />
          <button className='viewBtn' style={{ width: "100%" }} onClick={() => { navigate(`/restaurants/${foodData?.id}`) }}>
            View</button>
        </div> */}
      </div>

    </div>
  </div>

}

export default RestaurantCard