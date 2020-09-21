import React, { useEffect, useState } from 'react'
import client from '../client/ApiClient';
import BodySection from '../components/homepage/BodySection';
import PaginationSection from '../components/homepage/PaginationSection';
import HeaderSection from '../components/homepage/HeaderSection';
import { HeaderLoading, BodyLoading, PaginationLoading } from '../components/homepage/HomePageSkeleton';
import { splitArrayIntoPagination, createDummyArray } from "../utils/Helper";
import useDebounce from "../utils/useDebounce";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(["films", "people"]);
  const [listPage, setListPage] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsData, setFilmsData] = useState([]);
  const [activeFilm, setActiveFilm] = useState(null);
  const [peopleData, setPeopleData] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 1000);

  const getDataFilms = async() => {
    let collection = []

    const promises = listPage.map(async (val, idx) => {
      let url = `https://swapi.dev/api/films/${val}/`
      const { data: response, status } = await client(url, { method: "GET" })

      if (status == 200){
        collection.push({...response, page: val})
      }

      if (status == 404){
        console.log("not found")
      }
    })

    await Promise.all(promises)
    collection = manualPagination(collection)
    setFilmsData(collection)
    setListPage(createDummyArray(1, collection[0].characters.length))
    setActiveFilm(collection[0].episode_id)
    setIsLoading(["people"])
    getDataPeople(collection[0].characters[0])
  }

  const getDataPeople = async(peopleData, params = {}, endpoint) => {
    let newData = []

    if (!search){
      let promises = peopleData.map(async (url) => {
        const { data, status } = await client(url, { params, method: "GET" })
        if (status == 200){
          newData.push(data)
        }
      })
      await Promise.all(promises);
    }

    if (search){
      const { data = [], status } = await client(endpoint, { params, method: "GET" })
      if (status == 200){
        newData = data.results
      }
    }

    setPeopleData(newData)
    setIsLoading([])
  }

  const manualPagination = (data) => {
    data.map(val => { val.characters = splitArrayIntoPagination(val.characters) })
    return data
  }

  const onChangeFilm = (val) => {
    const character = val.characters
    setIsLoading(["people"])
    setCurrentPage(1)
    setActiveFilm(val.episode_id)
    setListPage(createDummyArray(1, character.length))
    getDataPeople(character[0])
  }

  const onPagination = (page) => {
    const film = filmsData.find(data => data.episode_id == activeFilm)
    const characters = film.characters[page - 1]
    setIsLoading(["people"])
    getDataPeople(characters)
    setCurrentPage(page)
  }

  useEffect(() => {
    getDataFilms()
  }, [])

  useEffect(() => {
    if (!isLoading.includes("people")){
      if (search){
        setIsLoading(["people"])
        getDataPeople(0, { search }, `https://swapi.dev/api/people/`)
      } else {
        onPagination(1)
      }
    }
  }, [debouncedSearchValue])

  return (
    <div className="w-3/4 h-720px m-6" id="container-home-page">

      {isLoading.includes('films') ? (
        <HeaderLoading />
        ) : (
        <HeaderSection
          onChangeFilm={onChangeFilm}
          filmsData={filmsData}
          setSearch={setSearch}
        />
      )}

      {isLoading.includes('people') ? (
        <BodyLoading />
        ) : (
        <BodySection
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          peopleData={peopleData}
        />
      )}

      {isLoading.includes('films') ? (
        <PaginationLoading />
        ) : (
        <PaginationSection
          isLoading={isLoading}
          listPage={listPage}
          currentPage={currentPage}
          onChangeFilm={onPagination}
        />
      )}
    </div>
  )
}

export default HomePage;