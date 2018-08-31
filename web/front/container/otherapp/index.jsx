import React, { Component } from 'react'
import './index.css'
import http from '../utils/http'

export default class ComponentOtherapp extends Component {
    constructor(){
        super()
        this.state={
            otherapp: []
        }
    }

    componentDidMount(){
        http.post({
            url: '/otherapp/jdListAll'
        }).then(result => {
            if (result.stat === 'OK') {
                this.setState({ otherapp: result.data.list });
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
            <div className='otherapp-container'>
                <ul>
                    {
                        this.state.otherapp.map((app)=>{
                            return (
                               <li key = {'app'+ countId++}>
                                   <a href={app.url}>
                                        <div className='app_icon'>
                                            <img src={app.icon} />
                                        </div>
                                        <span>{ app.title }</span>
                                   </a>
                               </li> 
                            )

                        })
                    }
                </ul>
            </div>
        )

    }
}