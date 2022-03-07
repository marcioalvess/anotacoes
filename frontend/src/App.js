import React, { useState, useEffect } from 'react';

import api from './services/api';

import './app.css';
import './global.css';
import './sidebar.css';
import './main.css';


//importa do index.js(components) 
import Notes from './Components/Notes';
import RadioButton from './Components/RadioButton';

//MÉTODOS
function App() {
  const [ selectedValue, setSelectedValue ] = useState('all');//vai deixar o todos setado
  const [ title, setTitles ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ allNotes, setAllNotes ] = useState([]);

  /* Busca, atualiza e mostrar na tela */

  useEffect(() =>{
    getAllNotes();

  }, [])

  async function getAllNotes(){
    const res = await api.get('/annotations',);
    setAllNotes(res.data)
  }

  //vai verificar(query) se o priority está true ou false
  async function loadNotes(option){
    const params = { priority: option };
    const res = await api.get('/priorities',{ params });

    if (res){
      setAllNotes(res.data);
    }
  }

  function handleChange(e){
    setSelectedValue(e.value);

    if(e.checked && e.value !== 'all'){
      loadNotes(e.value);
    }else{
      getAllNotes();
    }
  }


  //DELETE
  async function handleDelete(id){
    const deletedNote = await api.delete(`/annotations/${id}`);

    if (deletedNote){
      setAllNotes(allNotes.filter(note => note._id !== id));
    }
  }
  //PRIORIDADE TRUE E FALSE
  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);

    if(note && selectedValue !== 'all'){
      loadNotes(selectedValue);
    }else if (note){
      getAllNotes();
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    const res = await api.post('/annotations',{
      title,
      notes,
      priority: false
    })
    /* vai limpar o title e o notes*/
    setTitles('')
    setNotes('')

    //mostrar todos ao criar uma anotação
    if (selectedValue !== 'all'){
      getAllNotes();
    } else {
      setAllNotes ([...allNotes, res.data])/* retorna a informação automática*/
    }
    setSelectedValue('all');

  }
  //o botão muda de cor quando adiociona o titulo e as notas
  useEffect(()=>{
    function enableSubmitButton(){
      let btn = document.getElementById('btn_submit')
      btn.style.background = '#a7f58f'
      if(title && notes){
        btn.style.background = '#00ff00'
      }

    }
    enableSubmitButton()
  },[title,notes])

  return (
    <div id='app'>
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className='input-block'>
            <label htmlFor='title'>Titulo da Anotação</label>
            <input
              required
              maxLength='30' /*limitando o title ao 30 caracteres*/
              value={title}
              onChange={e => setTitles(e.target.value)}
            />
          </div>

          <div className='input-block'>
            <label htmlFor='nota'> Anotações </label>
            <textarea 
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button id='btn_submit' type='submit'>Salvar</button>
        </form>
        <RadioButton
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
              key={data._id}
              data={data} 
              handleDelete = {handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>

    </div>
    
  );
}

export default App;
