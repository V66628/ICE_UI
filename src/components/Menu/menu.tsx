import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode='horizontal' | 'vertical'
type SelectCallback=(selectedIndex:string)=>void
export interface MenuProps{
    defaultIndex?:string;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    children?:any;
    onSelect?:SelectCallback;
    defaultShowIndex?:string[]
}
interface IMenuContext{
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode;
    defaultShowIndex?:string[]
}
export const MenuContext=createContext<IMenuContext>({index:'0'})
const Menu:React.FC<MenuProps>=(props)=>{
    const {className,mode,style,children,defaultIndex,onSelect,defaultShowIndex}=props
    const [currentActive,setActive]=useState(defaultIndex)
    const handleClick=(index:string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext:IMenuContext={
        index:currentActive ?currentActive:'0',
        onSelect:handleClick,
        mode ,
        defaultShowIndex
    }
    const classes=classNames('viking-menu',className,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal':mode!=='vertical'
    })
    //判断Menu组件的children组件是否为MenuItem
    const renderChildren=()=>{
        return React.Children.map(children,(child,index)=>{
            const childElement=child as React.FunctionComponentElement<MenuItemProps>
            const {displayName}=childElement.type
            if(displayName==='MenuItem'||displayName==='subMenu'){
                return React.cloneElement(childElement,{index:index.toString()})
            }else{
                console.error('Warning:Menu has a child which is not a MenuItem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
            {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal',
    defaultShowIndex:[]
}
export default Menu