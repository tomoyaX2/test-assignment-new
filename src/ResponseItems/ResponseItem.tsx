import * as React from 'react';
import { ServerItem } from '../store/store';
import { MaxLengths } from '../enums/MaxLengths';

const formatAbout = (title: string) => title.length > MaxLengths.maxAbout ? `${title.substr(0, MaxLengths.maxAbout)}...` : title

const ResponseItem: React.FC<ServerItem> = ({ name, about, picture }) => {
    return <div className='flex flex-col p-4 b-4 w-64 justfe-center items-center'>
        <img src={`${picture}`} className='w-20 h-24' alt='item asset' />
        <span>{name}</span>
        <span title={about}>{formatAbout(about)}</span>
    </div>
}

export default ResponseItem