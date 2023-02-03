import React,{useContext,FunctionComponentElement,useState} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';
export interface SubMenuProps{
    index?:string;
    title:string;
    className?:string;
    children?:any
}
const SubMenu:React.FC<SubMenuProps>=({index,title,children,className})=>{
    const context=useContext(MenuContext)
        const opendSubMenus=context.defaultShowIndex as Array<string>
        const opend=(index&&context.mode=='vertical')?opendSubMenus.includes(index):false
    const [showSubItem,setShowSubItem]=useState(opend)
    const classes=classNames('menu-item submenu-item',className,{
        'is-active':context.index===index
    })
    //处理subMenu的展开与收缩
    const handleClick=()=>{
        setShowSubItem(!showSubItem)
    }
    let timer:any
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer=setTimeout(() => {
            setShowSubItem(toggle)
        }, 300);
    }
    const clickEvents=context.mode==='vertical'?{onClick:handleClick}:{}
    const hoverEvents=context.mode!=='vertical'?{
        onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)}
    }:{}
    const renderChildren=()=>{
        const classes=classNames('viking-submenu',{
            'menu-opened':showSubItem
        })
   
        const childrenComponment=React.Children.map(children,(child,i)=>{
            const childrenElement=child as React.FunctionComponentElement<MenuItemProps>
            if(childrenElement.type.displayName==='MenuItem'){
                return React.cloneElement(childrenElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('warning:SubMenu has a child which is not a MEnuItem component')
            }
        })
        return (
            <ul className={classes}>
                {childrenComponment}
            </ul>
        )
    }
    return(
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title }
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName='subMenu'
export default SubMenu