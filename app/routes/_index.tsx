import React from 'react'
import { Link } from '@remix-run/react';
import homeStyles from '~/styles/home.css';

const Index = () => {
  return (
    <div>
      <main id="content">
        <h1>A better way of keeping track of your notes</h1>
        <p>Try our early beta and never loose track of your notes again!</p>
        <p id="cta">
          <Link to={"/notespage"}>Try Now!</Link>
        </p>
      </main>
    </div>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: homeStyles }]
}

export default Index
