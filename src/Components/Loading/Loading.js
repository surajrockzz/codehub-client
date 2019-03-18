import React from 'react';
import ReactLoading from 'react-loading';
import  './loading.css'
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} className="loadingComp" />
);
 
export default Loading;