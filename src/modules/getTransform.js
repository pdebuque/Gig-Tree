/* 
module to set the position of a modal depending on the mouse position.

mousePos: {x, y}

___________________________________________
                                  |         |
                                  |         |
                                  |         |
              CASE 1              | CASE 3  |
                                  |         |
                                  |         |
                                  |         |
                                  |         |
------------------------------------------- 
                                  |         |
              CASE 2              | CASE 4  |
                                  |         |
-------------------------------------------


*/


export function getTransform(position) {
  //
  if (position.x < 1200)
    // 1: bottom right of cursor
    if (position.y < 900) return 'translate(-95%,-105%)'
    // 2: top right of cursor
    else return 'translate(-5%, -5%)'

  // 3: bottom left of cursor
  else if (position.y <= 900) return 'translate(-5%, -105%'
  return 'translate(-5%,5%)'
}
