import './index.css';
import '../../asset/swiper/swiper.min.css'
import React, { Component } from 'react';
import http from '../utils/http'
let Swiper = require('../../asset/swiper/swiper.min.js')

export default class ComponentHeader extends Component {
    constructor() {
        super()
        this.state = {
            imgUrls: [],
        }
    }

    componentDidMount() {
        http.post({
            url: '/swiper/jd.listAllSwiper'
        }).then(result => {
            if (result.stat === 'OK') {
                this.setState({ imgUrls: result.data.list });
                new Swiper('#header .swiper-container', {
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false
                })
            } else {
                console.log(result.data.message || '出错了');
            }
        }).catch(err => {
            console.log('网络出了问题，请重新尝试~')
        })
    }
    
    render() {
        let countId = 0;
        return (
            <div id='header'>
                <div className='swiper-container'>
                    <div className='swiper-wrapper'>
                        {
                            this.state.imgUrls.map(item => {
                                return (
                                    <div className='swiper-slide' key={'header' + countId++}>
                                        <a href={item.url}>
                                            <img src={item.icon} className='img' />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='swiper-pagination'></div>
                </div>

            </div>
        )

    }
}