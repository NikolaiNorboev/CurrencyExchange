import React, { useEffect, useState } from 'react';
import FileSaver from 'file-saver';

export default () => {
  
  let config = {};
  const [formData, setFormData] = useState([]);
  const [formControl, setFormControl] = useState({});

  const handlerForm = ({ target: { value, name } }) => {
    setFormControl({
      ...formControl,
      [name]: value
    })
  }

  const submitForm = (event) => {
    event.preventDefault();
    fetch('/api/admin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formControl
        }),
      })
  }

  const reset = () => {
    setFormControl(config)
  }
  const save = () => {
    const json = JSON.stringify(config)
    const blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, 'config.json');
  }

  useEffect(() => {
    fetch('/api/admin')
      .then(responce => {
        const result = responce.json();
        return result;
      })
      .then(result => {
        setFormControl(result);
        config = {...result};
        const keys = Object.keys(result); 
        setFormData(keys)});
  }, [])

  return(
    <div>
      <form onSubmit={submitForm}>
        {formData.length && formData.map(key => {
          return (
            <>
            <label
            style={{
              color: "red"
            }}
            >
            {key}: 
            <input
            name={key} 
            value={formControl[key]}
            onChange={handlerForm}
            style={{
              fontFamily: "Arial",
              minWidth: "1000px"
            }}
            />
            </label>
            <br />
            </>
          )
        })}
        <button type='submit'>Ввод</button>
        <button onClick={reset}>Reset</button>
        <button onClick={save}>Save</button>
      </form>
    </div>
  )
}
