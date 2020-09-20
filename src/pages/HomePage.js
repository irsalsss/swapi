import React, { useEffect, useState } from 'react'
import Dropdown from '../components/shared/Dropdown';
import client from '../client/ApiClient';
import Skeleton from 'react-skeleton-loader';

const HeaderLoading = () => {
  return (
    <div className="flex-between-center">
      <div className="w-56 h-8">
        <Skeleton />
      </div>
      <div className="w-56 h-8">
        <Skeleton />
      </div>
    </div>
  )
}

const PaginationLoading = () => {
  return (
    <div className="w-full h-8">
      <Skeleton width="700px" />
    </div>
  )
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(["films", "people"]);
  const [listPage, setListPage] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentPage, setCurrentpage] = useState(1)
  const [filmsData, setFilmsData] = useState([])
  const [peopleData, setPeopleData] = useState([
    {"name":"Raymus Antilles","height":"188","mass":"79","hair_color":"brown","skin_color":"light","eye_color":"brown","birth_year":"unknown","gender":"male","homeworld":"http://swapi.dev/api/planets/2/","films":["http://swapi.dev/api/films/1/","http://swapi.dev/api/films/6/"],"species":[],"vehicles":[],"starships":[],"created":"2014-12-20T19:49:35.583000Z","edited":"2014-12-20T21:17:50.493000Z","url":"http://swapi.dev/api/people/81/"}
  ])

  const getDataFilms = async() => {
    let collection = []

    const promises = listPage.map(async (val) => {
      let url = `https://swapi.dev/api/films/${val}`
      const { data: response, status } = await client(url, { method: "GET" })

      if (status == 200){
        collection.push({...response, page: val})
      }

      if (status == 404){
        collection.push({ title: `Star Wars Episode ${val}`, page: val })
      }
    })

    await Promise.all(promises)
    collection = collection.sort((a, b) => a.page - b.page)
    setFilmsData(collection)
    setIsLoading(["people"])
    // getDataPeople(collection[0].characters)
  }

  const getDataPeople = async(peopleData) => {
    let newData = []
    let promises = peopleData.map(async (url) => {
      const { data, status } = await client(url, { method: "GET" })
      if (status == 200){
        newData.push(data)
      }
    })

    await Promise.all(promises);
    setPeopleData(newData)
  }

  const onChangeFilm = (val) => {
    setCurrentpage(val.page || val)
  }

  console.log("filmsData", filmsData)
  console.log("peopleData", peopleData)

  useEffect(() => {
    getDataFilms(currentPage)
  }, [])

  return (
    <div className="w-2/3 h-720px m-6" id="container-home-page">

      {isLoading.includes('films') ? (
        <HeaderLoading />
      ) : (
        <section id="top-home-page" className="flex-between-center">
          <Dropdown
            onChange={onChangeFilm}
            listValue={filmsData}
          />
          <input
            className="appearance-none border border-blue-500 rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="search" type="text"
            placeholder="Search for people"
          />
        </section>
      )}

      <section id="mid-home-page" className="h-64 mt-12 w-full">
        {peopleData && peopleData.map((val, idx) => (
          <div key={idx} className="py-4 px-6 border border-blue-500 text-blue-800 rounded w-1/2">
            <h2 className="font-bold text-xl mb-2">{val.name}</h2>

            <div className="flex">
              <p>Height:</p>
              <p className="ml-2">{val.height}</p>
            </div>

            <div className="flex">
              <p>Mass:</p>
              <p className="ml-2">{val.mass}</p>
            </div>

            <div className="flex">
              <p>Hair Color:</p>
              <p className="ml-2">{val.hair_color}</p>
            </div>

            <div className="flex">
              <p>Eye Color:</p>
              <p className="ml-2">{val.eye_color}</p>
            </div>

            <h2 className="font-bold text-xl mb-2 mt-4">Starships</h2>
          </div>
        ))}
      </section>

      <section id="bottom-home-page" className="flex">
        {isLoading.includes('people') ? (
          <PaginationLoading />
        ) : (
          <>
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
          </>
        )}

      </section>

    </div>
  )
}

export default HomePage;