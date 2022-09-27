import React, { useContext } from 'react';
import { AppContext } from '../../context/globalState';

const HeaderNavigation = () => {
  const { refs } = useContext(AppContext);

  const executeScroll = menuItem => {
    const myRef = refs?.current?.find(item => item?.key === menuItem);
    myRef?.ref?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="category-links">
      <span
        role="button"
        onClick={() => executeScroll('bestselling')}
      >
        Best selling
      </span>
      <span
        role="button"
        onClick={() => executeScroll('topRated')}
      >
        Top rated
      </span>
      <span
        role="button"
        onClick={() => executeScroll('newReleases')}
      >
        New releases
      </span>
      <span
        role="button"
        onClick={() => executeScroll('nonfiction')}
      >
        Non-fiction
      </span>
      <span
        role="button"
        onClick={() => executeScroll('fiction')}
      >
        Fiction
      </span>
      <span
        role="button"
        onClick={() => executeScroll('tech')}
      >
        Tech Books
      </span>
      <span
        role="button"
        onClick={() => executeScroll('philosophy')}
      >
        Philosophy
      </span>
      <span
        role="button"
        onClick={() => executeScroll('science')}
      >
        Science Books
      </span>
    </div>
  );
}

export default HeaderNavigation;
