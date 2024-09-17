import React from 'react'
import './Skill.css'
import pythonLogo from './images/python-logo.png'

function Skill() {
  return (
    <div className='skill-box'>
        <div className='skill-left'>
            <p className='skill-name'>Python-Easy</p>
            <div>
              <p className='time'>25 MCQs</p>
              <p className='time'>30 Min</p>
            </div>
        </div>
        <div className='skill-right'>
            <img src={pythonLogo} className="logo"></img>
            <button className='skill-start-btn'>Start</button>
        </div>
    </div>
  )
}

export default Skill