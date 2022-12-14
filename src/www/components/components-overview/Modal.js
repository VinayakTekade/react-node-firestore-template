import React from 'react'
import { Button } from 'shards-react';

function Modal({ modalText, showCloseButton }) {

  const closeModal = () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal").close();
  }

  return (
    <dialog id='modal' style={{ width: "400px", display: "grid", gridTemplateColumns: "1fr", rowGap: "1rem" }}>
      <div style={{ margin: "0 auto", fontSize: "0.875rem" }}>
        {modalText}
      </div>
      <Button onClick={closeModal} size="md" style={{ width: "5rem", margin: "0 auto", display: showCloseButton ? "block" : "none" }}>
        Close
      </Button>
    </dialog >
  )
}

export default Modal