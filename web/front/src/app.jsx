import React from 'react';
import ReactDOM from 'react-dom';
import '../src/asset/style/public.css';
import ComponentSearch from './container/search'
import ComponentHeader from './container/header'
import ComponentOtherapp from './container/otherapp'
import ComponentSpike from './container/splike'
import ComponentMore from  './container/more'
import ComponentLike from './container/like'


ReactDOM.render(
    <div>
        <ComponentSearch />
        <ComponentHeader source="http://localhost:3000/data/swiper" />
		<ComponentOtherapp source="http://localhost:3000/data/otherapp"/>
        <ComponentSpike source="http://localhost:3000/data/spike" />
		<ComponentMore source="http://localhost:3000/data/more" />
        <ComponentLike source="http://localhost:3000/data/like" /> 
    </div>,
document.getElementById('app'));