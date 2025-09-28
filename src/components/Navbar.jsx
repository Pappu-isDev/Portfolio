import React from 'react';


const Navbar = (props) => {
  return (
    <div>
      <div>`${props.name}`</div>
      <div><ul>
        <li>HOME</li>
        <li>ABOUT ME</li>
        <li>SKILLS</li>
        <li>PROJECTS</li>
        <li>EXPERIENCE</li>
        <li>CONTACT ME</li>
      </ul>
      </div>
    </div>
  )
}

export default Navbar
