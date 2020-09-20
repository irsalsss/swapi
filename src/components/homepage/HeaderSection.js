import React from 'react';
import Dropdown from '../shared/Dropdown';

const HeaderSection = ({ onChangeFilm, filmsData, setSearch }) => {
  return (
    <section id="top-home-page" className="flex-between-center">
      <Dropdown
        onChange={onChangeFilm}
        listValue={filmsData}
      />
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="appearance-none border border-blue-500 rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        id="search" type="text"
        placeholder="Search for people"
      />
    </section>
  )
}

export default HeaderSection;