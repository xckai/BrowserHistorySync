import React from 'react';
import SearchBox from './SearchBox';
import { WallPaper } from './WallPaper';

export default function Homepage() {
  return (
    <section
      css={`
        height: 100vh;
        width: 100vw;

      `}
    >
      <WallPaper></WallPaper>
      <SearchBox css={`max-width: 40rem;width:90%; margin: 0px auto; margin-top: 25vh;`}></SearchBox>
    </section>
  );
}
