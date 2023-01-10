import SketchPicker from 'react-color';
import {useState} from 'react';
import {Box } from '@mui/material'

export default function ColorPicker({generalInfo, setGeneral}) {

  const [displayPicker, setDisplayPicker] = useState(false);
  // const [color, setColor]= useState(generalInfo.color)

  function isTooLight(hexColor) {
    const hex = hexColor.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}

  const handleColorChange = (color) => {
    // console.log('changing color to ', color)
    setGeneral({...generalInfo, backgroundColor: color.hex, color: isTooLight(color.hex) ? '#212121' : '#ffffff'})
    
  };

  const styles = {
    color: {
      margin: '2px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: `${generalInfo.backgroundColor}`,
    },
    swatch: {
      padding: '5px',
      background: '#ffffff',
      borderRadius: '50%',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  };

//todo: module to determine text color (generalInfo.color) based on background color
  // if it is past a certain darkness threshold, white. else black (grey?)

  return (
    <Box>
      {/* color: {generalInfo.backgroundColor} */}
      <Box sx={styles.swatch} onClick={()=>setDisplayPicker(true)}>
        <Box sx={styles.color} />
      </Box>
      {displayPicker ? <Box sx={styles.popover}>
        <Box sx={styles.cover} onClick={()=>setDisplayPicker(false)} />
        <SketchPicker 
          sx={generalInfo.backgroundColor} 
          onChange={handleColorChange} 
          color={generalInfo.backgroundColor}
          />
      </Box> : null}

    </Box>
  )

}