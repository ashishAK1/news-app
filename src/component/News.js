import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {

    const [articles, setArticles]= useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title = `News | ${capitaliseFirstLetter(props.category)}`;

    // capitalise First letter
    const capitaliseFirstLetter = (string) => {
        return String.fromCharCode(string[0].charCodeAt(0) - 32) + string.slice(1);
    }



    // function which will be called in didMount, nextClick and prevClick
    const updateData = async (pageNo) => {
        props.setProgress(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);

        props.setProgress(40);
        let parsedData = await data.json();

        props.setProgress(75);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    // fetch api
    // this function component did mount will be called after the render function is called
    // async componentDidMount() {
    //     updateData();
    // }
    
    useEffect(() => {
        document.title = `News | ${capitaliseFirstLetter(props.category)}`;
        updateData();
    }, [])
    

    const handlePreviousClick = async () => {
        // setState({ page: state.page - 1 });
        setPage(page + 1)
        updateData();
    }

    const handleNextClick = async () => {
        // setState({ page: state.page + 1 });
        setPage(page + 1)
        updateData();
    }

    const fetchMoreData = async () => {
        // setState({ page: state.page + 1 })
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;

        setPage(page+1);

        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        // setState({
        //     // concatenating previous data with the next data
        //     articles: state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // })
    };

        return (
            <>
                <h2 className='text-center' style={{marginTop : '90px'}}>News Headlines from {capitaliseFirstLetter(props.category)} category</h2>
                {loading && <Spinner />}

                {/* Adding Infinite Scroll */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner/>}
                >



                    {/* We'll put the map function inside a container to remove horizontal scroll bar at the bottom */}
                    <div className="container">
                        <div className="row">
                        {/* To iterate the aricles array we'll use map function */}
                        {/* In map we write arrow functions */}
                            {articles.map((element,index) => {
                                return <div className="col-md-4 my-3" key={index}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-torn-brown-paper-revealing-word-80963336.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>


                </InfiniteScroll>





                {/* Next and Previous Buttons */}
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={state.page <= 1} type="button" className="btn btn-dark sm" onClick={handlePreviousClick}>&laquo; Previous</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-dark sm" onClick={handleNextClick}>Next &raquo;</button>
                    </div>
                */}

            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News