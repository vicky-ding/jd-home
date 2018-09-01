import React, { Component } from 'react';
import './index.css';

export default class ComponentSearch extends Component {
    constructor(){
        super()
        this.state={
            bg: 'transparent'
        }
    }
    componentDidMount(event){
        window.onscroll = (event) =>{
            let height = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            let opacity = 0.8 * (height/150);
            if(opacity<=0.8){
                this.setState({
                    bg: `rgba(233, 44, 44, ${opacity})`
                })
            }
        }
    }
    render() {
        // let bgColor = this.state.bg ? this.state.bg : 'transparent'
        return (
            <div id='search' className='pf' style={{background:this.state.bg}}>
                <div className='search pr'>
                    <div className='search-logo pa'>
                        <i></i>
                    </div>
                    <div className='search-body pr'>
                        <span className='search-body-bar pa'></span>
                        <input placeholder='全场畅饮，部分低至99减50' type='text'/>
                    </div>
                    <div className='search-login pa'>
                        登录
                    </div>
                </div>
            </div>
        );
    }
}