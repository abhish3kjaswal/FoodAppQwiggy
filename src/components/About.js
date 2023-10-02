import { Box, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SelectCustom from './MUIComponents/SelectCustom'
import RadioMUI from './MUIComponents/RadioMUI'
import CheckBoxMui from './MUIComponents/CheckBoxMui'

const About = () => {
  const [val, setVal] = useState('')
  const [sval, setSVal] = useState([])

  const handleChange = e => {
    let { name, value } = e.target

    setSVal(value)
  }

  return (
    <div>
      <Typography variant='h2'>
        About
      </Typography>
      <Box width='250px' sx={{ backgroundColor: '',display:'flex',flexDirection:'column',justifyContent:'space-between'  }}>
        <TextField label="Input field" variant='outlined' size='medium' required value={val} onChange={e => setVal(e.target.value)}></TextField>
        <SelectCustom />
        <RadioMUI />
        <CheckBoxMui />
      </Box>
    </div>
  )
}

export default About