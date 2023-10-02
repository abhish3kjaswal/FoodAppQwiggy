import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import React, { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CheckBox } from '@mui/icons-material';
const CheckBoxMui = () => {
    const [val, setVal] = useState(false)
    const [skills, setSkills] = useState([])

    const handleChangeCheck = (e) => {
        const i = skills.indexOf(e.target.value)
        if (i == -1) {
            setSkills([...skills, e.target.value])
        }
        else {
            setSkills(skills.filter(sk => sk !== e.target.value))
        }
    }

    return (
        <Box width={'350px'} sx={{ margin: '30px', border: '1px solid green', padding: '10px' }}>

            <FormControlLabel label='I accept terms and Condition' control={<Checkbox checked={val} onChange={e => setVal(e.target.checked)} />} />

            <Box sx={{ margin: '30px', border: '1px solid red', padding: '10px' }}>
                <Checkbox checked={val}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    onChange={e => setVal(e.target.value)}
                />
            </Box>

            {/* multple checkboxes */}

            <Box sx={{ margin: '30px', border: '1px solid red', padding: '10px' }}>
                <FormControl>
                    <FormLabel>Skills</FormLabel>
                    <FormGroup row={false}>
                        <FormControlLabel label='HTML' control={<CheckBox value='html' checked={skills.includes('html')} onChange={handleChangeCheck} />} />
                        <FormControlLabel label='CSS' control={<CheckBox value='css' checked={skills.includes('css')} onChange={handleChangeCheck} />} />
                        <FormControlLabel label='JS' control={<CheckBox value='js' checked={skills.includes('js')} onChange={handleChangeCheck} />} />
                    </FormGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

export default CheckBoxMui