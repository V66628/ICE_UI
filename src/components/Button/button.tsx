import React from 'react'
import classNames from 'classnames';
export enum ButtonSize{
    Large='lg',
    Small='sm'
}
export  enum ButtonType{
    primary='primary',
    Default='default',
    Danger='danger',
    Link='link'
}
interface BaseButtonProps{
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string;
}
type NativeButtonProps=BaseButtonProps&React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps=BaseButtonProps&React.AnchorHTMLAttributes<HTMLElement>
//Partial是让Button组件的NativeButtonProps&AnchorButtonProps属性变的全部可选，NativeButtonProps是button属性，AnchorButtonProps是a标签属性，button与a标签属性不可同时拥有，所以要用Partial
export type ButtonProps=Partial<NativeButtonProps&AnchorButtonProps>
const Button:React.FC<ButtonProps>=(props)=>{
    const {
        className,
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    }=props
    const classnames=classNames('btn',className,{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType===ButtonType.Link) && disabled
    })
    if(btnType===ButtonType.Link && href){
        return (
            <a
                className={classnames}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    }else{
         return (
            <button 
            className={classnames}
            disabled={disabled}
            {...restProps}
            >
                {children}
            </button>
         )   
    }
}
Button.defaultProps={
    disabled:false,
    btnType:ButtonType.Default
}
export default Button