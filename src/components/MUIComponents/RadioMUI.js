import { Box, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, FormHelperText } from '@mui/material'
import React, { useState } from 'react'

const RadioMUI = () => {
    const [value, setValue] = useState('')
    console.log("VALie-->", value)
    return (
        <Box width={'250px'} sx={{margin:'30px',border:'1px solid green',padding:'10px'}}>
            <FormControl error={false}>
                <FormLabel id='job-exp'>
                    Years Of Exp
                </FormLabel>
                <RadioGroup name='job-exp' aria-labelledby='job-exp' value={value} onChange={e => setValue(e.target.value)} row={false}>
                    <FormControlLabel control={<Radio />} label='0-2' value='0-2' />
                    <FormControlLabel control={<Radio />} label='2-4' value='2-4' />
                    <FormControlLabel control={<Radio />} label='4-6' value='4-6' />
                </RadioGroup>
                <FormHelperText>Required Fields*</FormHelperText>
            </FormControl>
        </Box>
    )
}

export default RadioMUI