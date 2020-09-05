$.confirm = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '40wh',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Cancel', type: 'primary', handler() {
            console.log('Cancel btn Clicked!')
            modal.close()
            reject()
          }},
        {text: 'Delete', type: 'danger', handler() {
            console.log('Delete btn Clicked!')
            modal.close()
            resolve()
          }}
      ]
    })
    setTimeout(() => modal.open(), 100)
  })
}