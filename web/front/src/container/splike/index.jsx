import React, { Component } from 'react';
import './index.css';
import jsonp from '../utils/jsonp'

export default class ComponentSpike extends Component {
    constructor() {
        super()
        this.state = {
            hour: '00',
            minutes: '00',
            second: '00',
            splikeStore: [],
            more: ''
        }
    }
    formateTime(times=0){    
        times = +times;
        let hour = 0,
            minutes = 0,
            second = 0,
            regTwo = /^\d{2}$/
        if(times/3600 >=1){
            hour = parseInt(times/3600);
            times -= hour*3600;
            hour = regTwo.test(hour.toString()) ? hour.toString() : `0${hour}`;
        }
        if(times/60>=1){
            minutes = parseInt(times /60);
            times -= minutes*60;
            minutes = regTwo.test(minutes.toString()) ? minutes.toString() : `0${minutes}`;
        }
        second = times
        second = regTwo.test(second.toString()) ? second.toString() : `0${second}`;
      
        return {
            hour: hour,
            minutes: minutes,
            second: second
        }
        
    }
    componentDidMount(){
        let getData = () =>{
            let promise = new Promise((resolve, reject) => {
                jsonp(this.props.source, '', 'callback', (data)=>{
                    if(data.status){
                        this.setState({
                            splikeStore: data.data,
                            more: data.more
                        })
                        resolve(data.times)
                    }else{
                        alert(data.msg)
                        reject('get data error!')
                    }
                })
            })
            return promise
        }

        getData().then((times)=>{
            times = +times;
            let timer = window.setInterval(()=>{
                let {hour, minutes, second} = this.formateTime(times--)
                if (times == -1){
                    clearInterval(timer)
                    time = null
                }
                this.setState({
                    hour: hour,
                    minutes: minutes,
                    second: second
                })
            },1000)
        },(err)=>{
            alert(err)
        })
    }
    
    
    render() {
        let countId=0
        return (
            <div id = 'splike'>
                <div className = 'splike-header'>
                    <i></i>
                    <span className = 'splike-title'>掌上时间</span>
                    <div className = 'splike-time'>
                        {
                            (()=>{
                                return (
                                    <div><span>{this.state.hour}</span>: <span>{this.state.minutes}</span>: <span>{this.state.second}</span></div>
                                )
                            })()
                        }
                    </div>
                    <div className = 'splike-more fr'>
                        <i className = 'fr'></i>
                        <a href = {this.state.more}>
                            <span>更多秒杀</span>
                        </a>
                    </div>
                    <div style = {{ clear: 'both' }}></div>
                </div>

                <div className = 'splike-content'>
                    {
                        this.state.splikeStore.map((item)=>{
                            return (
                                <li key={'splike' + countId++}>
                                    <a href={item.url}>
                                        <div>
                                            <img src={item.icon} />
                                        </div>
                                    </a>
                                    <p>￥{item.sprice}</p>
                                    <p className='price-original'>￥{item.price}</p>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}