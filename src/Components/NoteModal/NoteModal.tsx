import React, { useEffect, useState, useContext } from 'react'
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext';
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
  const [note, setNote] = useState<string>('');
  const [highlightedDiv, setHighlightedDiv] = useState<string>('textAreaDiv');
  const [highlightedBtn, setHighlightedBtn] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { controlled, setControlled } = useContext(ControlledComponentContext);
  const textArea = document.querySelector('.note-input');
  const buttonContainer = document.querySelector('.button-container');
  
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

  useEffect(() => {
    const cancelBtn = buttonContainer?.children[1];
    
    const handleKeyPress = (e: KeyboardEvent) => {
        switch(e.key) {
            case 'ArrowUp':
                if(highlightedDiv === 'buttonDiv' && !isTyping) {
                    setHighlightedDiv('textAreaDiv');
                }
                break;
            case 'ArrowDown':
                if(highlightedDiv === 'textAreaDiv' && !isTyping) {
                    setHighlightedDiv('buttonDiv');
                }
                break;
            case 'ArrowLeft':
                if(highlightedDiv === 'buttonDiv' && highlightedBtn > 0) {
                    setHighlightedBtn(highlightedBtn - 1);
                }
                break;
            case 'ArrowRight':
                if(highlightedDiv === 'buttonDiv' && highlightedBtn < 1 && !cancelBtn?.classList.contains('disabled')) {
                    setHighlightedBtn(highlightedBtn + 1);
                }
                break;
            case 'Enter':
                if(highlightedDiv === 'textAreaDiv') {
                    if(!isTyping){
                        let clickable = textArea as HTMLTextAreaElement;
                        clickable.focus();
                        setIsTyping(true);
                    }
                }
                break;
        }
      }

      if(controlled === 'noteModal') {
        window.addEventListener('keydown', handleKeyPress);
      }
      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      }
  }, [controlled, setControlled, buttonContainer?.children, highlightedBtn, highlightedDiv, isTyping, textArea]);

  useEffect(() => {
      if(controlled !== 'noteModal') {
        textArea?.classList.add('highlighted');
        setHighlightedDiv('textAreaDiv')
      }
      const cancelBtn = buttonContainer?.children[0];
      const addBtn = buttonContainer?.children[1];

      if(controlled === 'noteModal') {
        if(highlightedDiv === 'textAreaDiv') {
            cancelBtn?.classList.remove('highlighted');
            addBtn?.classList.remove('highlighted');
            textArea?.classList.add('highlighted');
        } else if(highlightedDiv === 'buttonDiv') {
            textArea?.classList.remove('highlighted');
            cancelBtn?.classList.remove('highlighted');
            addBtn?.classList.remove('highlighted');

            if(buttonContainer?.children[highlightedBtn] === cancelBtn) {
                cancelBtn?.classList.add('highlighted');
            } else {
                addBtn?.classList.add('highlighted');
            }
        }
      }
  }, [controlled, textArea, highlightedDiv, setHighlightedDiv, buttonContainer, highlightedBtn]);

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