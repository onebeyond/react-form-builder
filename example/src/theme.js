const theme = {
  buttons: {
    primary: {
      color: 'red'
    },
    customButton: {
      color: 'green'
    }
  },
  select: {
    backgroundColor: 'red',
    option: {
      color: 'purple',
      fontSize: '30px'
    },
    control: {
      backgroundColor: 'gray',
      borderRadius: '20px'
    }
  },
  forms: {
    container: {
      contact: {
        display: 'grid',
        backgroundColor: 'green'
      }
    },
    multipleImageCheckboxes: {
      contact: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        label: {
          div: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            cursor: 'pointer',
            height: '28px',
            left: '0',
            width: '28px',
            svg: {
              visibility: 'hidden'
            }
          }
        }
      }
    }
  },
  label: {
    color: 'brown'
  }
}

export default theme
