import './index.css';
import '../../asset/swiper/swiper.min.css'
import React, { Component } from 'react';
import jsonp from '../utils/jsonp'
let Swiper = require('../../asset/swiper/swiper.min.js')

export default class ComponentHeader extends Component {
    constructor() {
        super()
        this.state = {
            imgUrls: [],
        }
    }

    componentDidMount() {
        jsonp(this.props.source, '', 'callback', (data) => {
            if (data.status) {
                this.setState({
                    imgUrls: data.data,
                })
                new Swiper('#header .swiper-container', {
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false
                })
            }
        })
    }
    componenWillUnMount() {
        jsonp(this.props.source, '', 'callback', (data) => {
            alert(data.msg)
        })
    }
    render() {
        let countId = 0;
        return (
            <div id='header'>
                <div className='swiper-container'>
                    <div className='swiper-wrapper'>
                        {
                            this.state.imgUrls.map((url) => {
                                return (
                                    <div className='swiper-slide' key={'header' + countId++}>
                                        <img src={url} className='img' />
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