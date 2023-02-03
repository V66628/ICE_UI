import React from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
  return (
    <div className="App">
      <Menu defaultIndex={'0'}  mode='vertical' onSelect={(i)=>(alert(i))} defaultShowIndex={['3']}>
        <MenuItem >
          cool link
        </MenuItem>
        <MenuItem >
          cool link2
        </MenuItem>
        <MenuItem >
          cool link3
        </MenuItem>
        <SubMenu title='dropdown'>
        <MenuItem>
          cool link4
        </MenuItem>
        </SubMenu>
      </Menu>
      <Button onClick={()=>{}}>啊哈哈哈哈</Button>
      <Button disabled>啊哈哈哈哈</Button>
      <Button btnType={ButtonType.Danger} >啊哈哈哈哈</Button>
      <Button btnType={ButtonType.primary}>啊哈哈哈哈</Button>
      <Button btnType={ButtonType.Link} disabled>啊哈哈哈哈</Button>
      <a href="#">learn react</a>
    </div>
  );
}

export default App;
