import React from 'react';
import { Link } from 'app/components/Router';
import st from './style.styl';

export default function Header(props) {
  return <header className={st.wrap}>
    <ul>
      <li><Link path='/'>Home11</Link></li>
      <li><Link path='/about'>With async resolve</Link></li>
      <li><Link path='/missing'>Broken link</Link></li>
    </ul>
  </header>;
};
