import React from 'react'
import PlacementPanelQuiz from "./PlacementPanelQuiz";
import SubjectiveQuizPanel from "./SubjectiveQuizPanel";
import YourBooksPanel from "./YourBooksPanel";


const RightPanelRoot = (props) => {
    const isValid = (route) => {
        return route !== undefined && route !== null && componentMap[route] !== undefined
    }
    const summaryLink = props.summaryLink
    const componentMap = {
        'placement-quiz': <PlacementPanelQuiz/>,
        'subjective-quiz' : <SubjectiveQuizPanel/>,
        'your-books' : <YourBooksPanel/>
    }
    return (
        <div className='panel'>
            {isValid(summaryLink) ? componentMap[summaryLink] : <PlacementPanelQuiz/>}
        </div>
    )
}
export default RightPanelRoot