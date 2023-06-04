import React, { useState } from 'react'

function AddQuestion() {
    const [question, setQuestion] = useState({
        question: '',
        marks: 0,
    });
  return (
    <div>AddQuestion</div>
  )
}

export default AddQuestion