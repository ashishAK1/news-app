import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source } = props; // ->object destructuring in Class based component
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                        }
                        }>
                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>     
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}> {source} </span> */}
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {date.substring(0, 10)} {new Date(date).toLocaleTimeString('in',
                            { timeStyle: 'short', hour12: false, timeZone: 'GMT' })}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem