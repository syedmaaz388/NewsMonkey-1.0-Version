import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
  constructor(){
    super();
    this.state = {
       articles : [],
       loading: false,
       page:1
    }
  }
 async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8380a3d62f240bd8daf68f57cae7814&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState ({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
 }  

 handlepreviousclick = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8380a3d62f240bd8daf68f57cae7814&$&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});

  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState ({articles:parsedData.articles})
  this.setState({
  page:this.state.page - 1,
  articles:parsedData.articles,
  loading:false

})
 }
 handleNextClick = async () => {
  if (!this.state.page + 1 > Math.ceil(this.state.totalResults/this.propspageSize)){

  }
  else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8380a3d62f240bd8daf68f57cae7814&$&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading:false
      })
  }
  
 }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' >NewsMonkey - Top Headlines</h1>
      {this.state.loading && <Spinner/>}
        <div className='row'>
         {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div key = {element.url} className="col md-4">
          <NewsItem title = {element.title?element.title.slice(0,44):" "} description = {element.description?element.description.slice(0,88):""}  imageUrl = {!element.urlToImage?"https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?w=2000":element.urlToImage} newsurl = {element.url} />
          </div>
            )
          })}
        </div>
        <div className='container d-flex justify-content-between my-2'>
             <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlepreviousclick} > &larr;Previous</button>
             <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark mx-2' onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}
