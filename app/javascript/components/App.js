import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import EditTodo from './EditTodo'
import './App.css'


// styled component(css)を書き、定義した要素をreturn文で使用する 書き方はCSSと同じ
const Navbar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`


function App() {
  return (
    <>
      {/* constで定義したNavbarをHTMLタグのように扱うことができる  */}
      <Navbar>
        <Logo>
          TODO
        </Logo>
        <NavItems>
          <NavItem>
            <Link to="/todos">
              Todos
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/todos/new">
              Add New Todo
            </Link>
          </NavItem>
        </NavItems>
      </Navbar>
      {/* ここまでがナビバーの記述  */}

      <Wrapper>
        <Switch>
          {/* exactは完全にpathが一致したときに表示する。boolean型でデフォルト値はfalse */}

          {/* URLが/todos　の時は、TodoListコンポーネントを使用する */}
          <Route exact path="/todos" component={TodoList} />

          {/*  */}
          <Route exact path="/todos/new" component={AddTodo} />

          {/*  */}
          <Route path="/todos/:id/edit" component={EditTodo} />
        </Switch>
      </Wrapper>
    </>
  )
}

export default App
