import React, { useEffect, useState } from 'react'
import Dropdown from '../components/shared/Dropdown';
import client from '../client/ApiClient';
import { listPage } from '../utils/Helper';

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentpage] = useState(1)
  const [dropdownValue, setDropdownValue] = useState("Star Wars Episode 1")
  const [data, setData] = useState({});

  const getData = async(url, type) => {
    setIsLoading(true)
    const { data: response, status } = await client(url, { method: "GET" })
    console.log('status', status)

    if (status == 200){
      setData({
        ...response[type],
        [type]: response
      })
    }

    if (status == 404){
      setData({})
    }

    setIsLoading(false)
  }

  const onChangeFilm = (val) => {
    setData({})
    getData(`https://swapi.dev/api/films/${val}`, "filmsData");
    setCurrentpage(val)
    setDropdownValue(`Star Wars Episode ${val}`)
  }

  console.log(data)

  useEffect(() => {
    getData(`https://swapi.dev/api/films/${currentPage}`, "filmsData");
  }, [])

  return (
    <div className="w-2/3 m-6" id="container-home-page">

      <section id="top-home-page" className="flex-between-center">
        <Dropdown
          state={dropdownValue}
          onChange={onChangeFilm}
          listValue={listPage}
        />
        <input
          className="appearance-none border border-blue-500 rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          id="search" type="text"
          placeholder="Search for people"
        />
      </section>

      <section id="mid-home-page" className="h-96">
        {!isLoading && Object.keys(data).length !== 0 && (
          <div className="border border-blue-500 text-blue-800 rounded">
            <h2 className="font-bold text-xl mb-2">{data.filmsData.title}</h2>
          </div>
        )}
      </section>

      <section id="bottom-home-page" className="flex">
        {listPage.map((val, idx) => (
          <div
            onClick={() => currentPage != val && onChangeFilm(val)}
            key={idx}
            className={`${isLoading ? "opacity-50 pointer-events-none" : "cursor-pointer"} py-2 px-4 m-1 border border-blue-500 rounded ${currentPage == val ? "text-white bg-blue-500" : "text-blue-500"}`}
          >
            {val}
          </div>
        ))}
      </section>

    </div>
  )
}

export default HomePage;