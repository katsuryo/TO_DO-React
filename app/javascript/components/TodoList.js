import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// HTTP通信を行うためaxiosをインポートする
import axios from 'axios'

import styled from 'styled-components'

// アイコン（チェックボックス）をインポート
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

// エディットのアイコンを取得
import { AiFillEdit } from 'react-icons/ai'

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function TodoList() {
  {/* todosには、todoリストの全てが格納される。setTodosは変更するためのメソッド */ }
  const [todos, setTodos] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    {/* HTTP通信のメソッド。todosコントローラにアクセスされ、todosがjson形式で帰ってくる */ }
    axios.get('/api/v1/todos.json')
    .then(resp => {
      console.log(resp.data)
      setTodos(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])


  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/todos/destroy_all')
      .then(resp => {
        setTodos([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  // valは更新しようとしているレコードそのもの。id,name,is_completedにそれぞれvalの値が入る
  //indexは何番目のtodoが更新されたかを指す
  const updateIsCompleted = (index, val) => {
    var data = {
      id: val.id,
      name : val.name,
      is_completed: !val.is_completed
    }
    axios.patch(`/api/v1/todos/${val.id}`, data)
    .then(resp => {
    {/* todosをスプレッド構文で展開し、newTodosに代入。newTodosの[index]番目のis_completedとレスポンスのis_completedと比較 */}
      const newTodos = [...todos]
      newTodos[index].is_completed = resp.data.is_completed
      setTodos(newTodos)
    })
  }



  return (
    <>
      <h1>Todo List</h1>
      <SearchAndButtton>
        {/* インプットタグの値が変わったらsetSearchName */}
        <SearchForm
          type="text"
          placeholder="Search todo..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />

        {/* Remove Allボタンを押した時、関数「removeAllTodos」が呼び出される */}
        <RemoveAllButton onClick={removeAllTodos}>
          Remove All
        </RemoveAllButton>

      </SearchAndButtton>

      {/* todo一覧*/}
      <div>
        {/* todosをvalにいれ、serchと一致しているかふるいにかけている。検索窓が空であればtodosを全て返す*/}
        {todos.filter((val) => {
          if(searchName === "") {
            return val

            {/* valのnameがserchのnameを含んでいたら、valを返す。toLowerCaseは全て小文字にして大小文字関係なく検索する*/}
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }

        {/* returnされたcalをmapメソッドで展開する*/}
        }).map((val, key) => {
          return (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(key, val) } />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                  <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val) } />
                </UncheckedBox>
              )}
              <TodoName is_completed={val.is_completed}>
                {val.name}
              </TodoName>
              <Link to={"/todos/" + val.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  )

}

export default TodoList
