import { Box, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const SelectCustom = () => {
  const [sval, setSVal] = useState([])

  const handleChange = e => {
    let { value } = e.target
    setSVal(value)
  }
  return (
    <Box width='250px' sx={{margin:'30px',border:'1px solid yellow', padding:'10px'}}>
      <TextField label="Select Country" error select variant='outlined' size='medium' fullWidth required value={sval} onChange={e => handleChange(e)} sx={{ marginTop: '25px' }} SelectProps={{ multiple: true }}>
        <MenuItem value='IN'>INDIA</MenuItem>
        <MenuItem value='AU'>AUS</MenuItem>
        <MenuItem value='UK'>UK</MenuItem>
      </TextField>
    </Box>
  )
}

export default SelectCustom