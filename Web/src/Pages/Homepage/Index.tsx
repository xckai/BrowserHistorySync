import React from 'react';
import SearchBox from './SearchBox';
import { WallWrapper } from './WallWrapper';

export default function Homepage() {
  return (
    <section
      css={`
        height: 100vh;
        width: 100vw;

      `}
    >
      <WallWrapper></WallWrapper>
      <SearchBox css={`max-width: 40rem;width:90%; margin: 0px auto; margin-top: 25vh;`}></SearchBox>
    </section>
  );
}
