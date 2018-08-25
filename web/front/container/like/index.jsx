import React, { Component } from 'react';
import './index.css';
import jsonp from '../utils/jsonp.js'

export default class ComponentLike extends Component {
    constructor(){
        super()
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        jsonp(this.props.source,'','callback',(data)=>{
            if(data.status){
                this.setState({
                    data: data.data
                })
            }

        })
    }
    render() {
        let countId=0;
        return (
            <div id="like">
            <p>猜你喜欢</p>
                {
                    this.state.data.map((item)=>{
                        return(
                            <div className="like-content" key={'like'+countId++}>
                                <div className="like-content-link">
                                    <a href={item.url}>
                                        <img src={item.icon} />
                                    </a>
                                </div>
                                <div className="like-content-info">
                                    <span>{item.desc}</span>
                                </div>
                                <div className="like-content-price">
                                <span>￥{item.price}</span>
                                <span><a href={item.more}>看相似</a></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}