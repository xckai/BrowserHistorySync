import React from 'react';
import SearchBox from './SearchBox';

export default function Homepage() {
  return (
    <section
      css={`
        height: 100vh;
        width: 100vw;
      `}
    >
      <SearchBox></SearchBox>
    </section>
  );
}
