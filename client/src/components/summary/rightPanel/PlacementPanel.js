import React from "react";

const PlacementPanel = () => {
    return (
        <>

            <div className="search-bar-panel">
                <input
                    type="text"
                    className="search"
                    name="Search..."
                    placeholder="Search...."
                />
                <input
                    type="image"
                    className="search-button-image"
                    name="search"
                    src="./images/searchBar.svg"
                    alt="Search"
                />
            </div>
            <div className="panel-item" id="panel-placement-quiz">
                <div className="upload">
                    <p className="uploaded">PLACEMENT QUIZ</p>
                </div>
                <div className="btn">
                    <button className="upload-button">
                        Upload File
                        <i className="fa fa-upload" aria-hidden="true" />
                    </button>
                </div>
                <div className="cards-container d-flex">
                    <div className="content-card">
                        <div className="upper-container d-flex">
                            <div className="content-card-icon">
                                <img src="./images/pdfImage.svg" className="content-card-image" />
                            </div>
                            <div className="name-box flex-f-col">
                                <p className="file-name">Introduction to Machine Learning</p>
                                <div className="sub-heading ">
                                    <span className="naam">Subject : </span>
                                    <span className="sub-name">EMF Theory</span>
                                </div>
                            </div>
                            <div className="middle-container d-flex">
                                <div className="last-mod"> Modified : Dec-23-2022</div>
                                <div className="vie">Views : 5</div>
                            </div>
                            <div className="end-container d-flex">
                                <i className="fa-solid fa-trash icons card-icons" />
                                <i className="fa-sharp fa-solid fa-pencil icons card-icons" />
                                <i className="fa-solid fa-user-shield icons card-icons" />
                                <i className="fa-solid fa-gears icons card-icons" />
                                <i className="fa-sharp fa-solid fa-rotate icons card-icons" />
                                <i className="fa-sharp fa-solid fa-share-nodes icons card-icons" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PlacementPanel