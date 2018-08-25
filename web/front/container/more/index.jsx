import React, { Component } from 'react';
import './index.css';
import jsonp from '../utils/jsonp.js'
import Swiper from '../../asset/swiper/swiper.min.js'
import '../../asset/swiper/swiper.min.css'


export default class ComponentMore extends Component {
    constructor(){
        super()
        this.state = {
            moreTop: [],
            moreMiddle: [],
            moreFooter: []
        }
    }
    componentDidMount(){
        jsonp(this.props.source,'','callback',(data)=>{
            if(data.status){
                this.setState({
                    moreTop: data.data.slice(0,3),
                    moreMiddle: data.data.slice(3,5),
                    moreFooter: data.data.slice(5,7)
                })

                new Swiper('.more-footer .swiper-container',{
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false
                })
            }
        })
    }
    render() {
        let countId = 0
        return (
            <div id='more'>
                <div className='more-top'>
                    {
                        this.state.moreTop.map((item)=>{
                            return (
                                <div className='more-top-link' key={'more'+countId++}>
                                    <a href={item.url}>
                                        <img src={item.icon} />
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='more-middle'>
                    {
                        this.state.moreMiddle.map((item)=>{
                            return (
                                <div className='more-middle-link' key={'more'+countId++}>
                                    <a href={item.url}>
                                        <img src={item.icon} />
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='more-footer'>
                    <div className='swiper-container'>
                        <div className='swiper-wrapper'>
                            {
                                this.state.moreFooter.map((item)=>{
                                    return (
                                        <div className='swiper-slide' key={'more'+countId++}>
                                            <a href={item.url}>
                                                <img src={item.icon} />
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='swiper-pagination'></div>
                    </div>
                </div>
            </div>
        );
    }
}