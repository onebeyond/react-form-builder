import React from 'react'
import ReactMarkdown from '../../Fields/Markdown'

const styles = {
  modal: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    width: '500px',
    backgroundColor: 'white'
  },
  modalHeader: { padding: '10px' },
  modalFooter: { padding: '10px' },
  modalTitle: { margin: '0' },
  modalBody: {
    padding: '10px',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  }
}
const Modal = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div style={styles.modal} onClick={props.onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h4 style={styles.modalTitle}>Modal title</h4>
        </div>
        <div style={styles.modalBody}>
          <ReactMarkdown>{props.modalText}</ReactMarkdown>
          <div style={styles.modalFooter} />
        </div>
      </div>
    </div>
  )
}

export default Modal
