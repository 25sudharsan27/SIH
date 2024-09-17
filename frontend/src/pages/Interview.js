import React from 'react'
import './Interview.css'
import Skill from './Skill'

function Interview() {
  return (
    <div className='container'>
        <div>
            <p>AI-Interview</p>
            <div className='interview-box'>
                <div className='interview-box-left'></div>
                <div className='interview-box-right'></div>
            </div>
        </div>
        <div>
            <p>Skill Assessment</p>
            <div className='skill-container'>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
            </div>
        </div>
    </div>
  )
}

export default Interview