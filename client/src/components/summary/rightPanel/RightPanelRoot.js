import React from 'react'
import PlacementQuizPanel from "./PlacementQuizPanel";
import SubjectiveQuizPanel from "./SubjectiveQuizPanel";
import YourBooksPanel from "./YourBooksPanel";
import YourCollectionsPanel from "./YourCollectionsPanel";


const RightPanelRoot = (props) => {
    const isValid = (route) => {
        return route !== undefined && route !== null && componentMap[route] !== undefined
    }
    const summaryLink = props.summaryLink
    const componentMap = {
        'placement-quiz': <PlacementQuizPanel/>,
        'subjective-quiz' : <SubjectiveQuizPanel/>,
        'your-books' : <YourBooksPanel/>,
        'your-collections': <YourCollectionsPanel/>
    }
    return (
        <div className='panel'>
            {isValid(summaryLink) ? componentMap[summaryLink] : <SubjectiveQuizPanel/>}
        </div>
    )
}
export default RightPanelRoot