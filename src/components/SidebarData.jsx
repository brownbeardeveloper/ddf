import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon : <AiIcons.AiFillHome />,
        cName: 'nav-text'

    },
    {
        title: 'Page1',
        path: '/page1',
        icon : <BiIcons.BiWorld />,
        cName: 'nav-text'

    },
    {
        title: 'Page2',
        path: '/page2',
        icon : <BiIcons.BiWorld />,
        cName: 'nav-text'

    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon : <BiIcons.BiWorld />,
        cName: 'nav-text'

    },
]

export default SidebarData;