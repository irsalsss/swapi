import React from 'react'

const PaginationSection = ({ isLoading, listPage, currentPage, onChangeFilm }) => {
  return (
    <section id="bottom-home-page" className="flex justify-center">

      <div
        className={
          `${isLoading.includes('people') ? "opacity-50 pointer-events-none" : "cursor-pointer"}
          py-2 px-4 m-1 border border-blue-500 rounded text-blue-500`}
      >
        First
      </div>

      <div
        className={
          `${isLoading.includes('people') ? "opacity-50 pointer-events-none" : "cursor-pointer"}
          py-2 px-4 m-1 border border-blue-500 rounded text-blue-500`}
      >
        Prev
      </div>

      {listPage.map((val, idx) => (
        <div
          onClick={() => currentPage != val && onChangeFilm(val)}
          key={idx}
          className={
            `${isLoading.includes('people') ? "opacity-50 pointer-events-none" : "cursor-pointer"}
            ${currentPage == val ? "text-white bg-blue-500" : "text-blue-500"}
            py-2 px-4 m-1 border border-blue-500 rounded `
          }
        >
          {val}
        </div>
      ))}

      <div
        className={
          `${isLoading.includes('people') ? "opacity-50 pointer-events-none" : "cursor-pointer"}
          py-2 px-4 m-1 border border-blue-500 rounded text-blue-500`}
      >
        Next
      </div>

      <div
        className={
          `${isLoading.includes('people') ? "opacity-50 pointer-events-none" : "cursor-pointer"}
          py-2 px-4 m-1 border border-blue-500 rounded text-blue-500`}
      >
        Last
      </div>

    </section>
  )
}

export default PaginationSection;