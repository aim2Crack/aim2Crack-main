import React from 'react'
import PlacementPanel from './PlacementPanel'
import {Link, Route, Routes} from "react-router-dom";
const RightPanelRoot = () =>{
    return(
        <div className='panel'>

            <Routes>
                <Route path="/placement-quiz" element={<PlacementPanel/>}/>
            </Routes>
        </div>
    )
}
export default RightPanelRoot