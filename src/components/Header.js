import react, { useState } from 'react'
import { LOGO_URL } from '../util/constant';
import { Link, Typography } from '@mui/material';
import useOnlineStatus from '../util/useOnlineStatus';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [mobLogo, setMobLogo] = useState(false)
    const nav = useNavigate('/')

    const logoClick = (e) => {
        e && e.preventDefault();
        setMobLogo(!mobLogo)
    }


    return <div>
        {/* <div className='header'> */}
        <div className='flex justify-between shadow-md'>
            {/* <div className='logo-container'> */}
            <div className='h-[70px] w-[150px] font-sans p-[10px] flex justify-between cursor-pointer' onClick={() => nav('/')}>
                {/* <img className='logo' src={LOGO_URL} /> */}
                <img className='w-[40px] h-[40px]' src={LOGO_URL} />
                <Typography variant='h6' fontWeight={'bold'} >
                    Qwiggy
                </Typography>
            </div>
            {/* <div className='nav-items'> */}
            <div className='pr-[20px]'>
                {/* <ul className='list'> */}
                <ul className='flex'>
                    {/* <li className='list-item1'> */}
                    <li className='m-[10px] p-[10px] cursor-pointer'>
                        <Link href='/' sx={{
                            '&:hover': {
                                color: 'blue'
                            },
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                            Home
                        </Link>
                    </li>
                    <li className='m-[10px] p-[10px] cursor-pointer'>
                        <Link sx={{
                            '&:hover': {
                                color: 'blue'
                            },
                            textDecoration: 'none',
                            color: 'black'
                        }}
                            href='/about'>
                            About
                        </Link>
                    </li>
                    <li className='m-[10px] p-[10px] cursor-pointer'>
                        <Link sx={{
                            '&:hover': {
                                color: 'blue'
                            },
                            textDecoration: 'none',
                            color: 'black'
                        }}
                            href='/contact'>
                            Contact
                        </Link></li>
                    <li className='m-[10px] p-[10px] cursor-pointer'>
                        <Link sx={{
                            '&:hover': {
                                color: 'blue'
                            },
                            textDecoration: 'none',
                            color: 'black'
                        }}
                            href='/cart'>
                            Cart
                        </Link></li>
                </ul>

            </div>
        </div>
        {/* <div className='mob-navItems' style={{ display: mobLogo ? "block" : 'none'  }}>
      <div className='mob-navItemsLink'>Home</div>
      <div className='mob-navItemsLink'>About</div>
      <div className='mob-navItemsLink'>Link</div>
      <div className='mob-navItemsLink'>Cart</div>
    </div> */}
    </div>
}

export default Header;