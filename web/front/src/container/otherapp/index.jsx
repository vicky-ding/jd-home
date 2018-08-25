import React, { Component } from 'react'
import './index.css'
import jsonp from '../utils/jsonp'

export default class ComponentOtherapp extends Component {
    constructor(){
        super()
        this.state={
            otherapp: []
        }
    }
    componentDidMount(){
        jsonp(this.props.source,'','callback',(data)=>{
            if(data.status){
                this.setState({
                    otherapp: data.data
                })
            }
        })
    }
    componentWillUnmount() {
        jsonp(this.props.source,'','callback',(data)=>{
           alert(data.msg)
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