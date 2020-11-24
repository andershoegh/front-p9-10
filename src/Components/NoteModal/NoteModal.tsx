import React, { FormEvent, useEffect, useState } from 'react'
import './NoteModal.scss'

export interface NoteModalProps {
  showModal: boolean;
  toggleModal: CallableFunction;
  item: string;
  setOrderNote: CallableFunction;
  prevNote?: string
}

const NoteModal: React.FC<NoteModalProps> = (props) => {
  const { showModal, toggleModal, item, setOrderNote, prevNote } = props;
  const modal = document.getElementById('note-modal');
  const [note, setNote] = useState<string>( '');
  useEffect(()=>{
    if(prevNote && prevNote !== ''){
      setNote(prevNote);
    }
  }, [prevNote])
  if(modal) {
    if(showModal) {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  }
  const discardNote = ()=>{
    if(prevNote === note || ( prevNote && note ==='') ){
      setOrderNote('');
    } 
    toggleModal();
    setNote('');
  }
  const addNote = () =>{
    //Do stuff
    setOrderNote(note);
    toggleModal();
    setNote('');
  }
  const handleInput = (e:any)=>{
    setNote(e.currentTarget.value);
  }


  return (
    <div id="note-modal">
      <div className="modal-content">
        <h2>Add note to {item}</h2>
        <textarea className="note-input" placeholder="Write any special preferences to your order here." value={note} onKeyUp={handleInput} onChange={handleInput}/>
        <div className="button-container">
            <button className="no-button" onClick={discardNote}>
              {(prevNote === note || ( prevNote && note ==='') ) ? 
                'Delete Note' 
                : prevNote && prevNote !== note ? 
                  'Discard Changes' 
                  : 'Discard Note'}
            </button>
            <button className={"yes-button " + (note.length > 0 ? "":"disabled")}onClick={addNote}>{prevNote ? 'Save Changes' : 'Add Note'}</button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal