// konfiguracja edytora tekstu używanego na stornach o firmie i kontakt
export let CKEconfig = {         
    toolbar: [ 'heading', '|', 'bold', 'Italic', 'blockQuote', 'link','|', 'bulletedList', 'numberedList','|','Undo', 'Redo',],
    heading: {
      options: [
          { model: 'paragraph', title: 'Tekst', class: 'ck-heading_paragraph' },
          { model: 'heading3', view: 'h3', title: 'Tytuł', class: 'ck-heading_heading3' },
      ],
    }
  };           