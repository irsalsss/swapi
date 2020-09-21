import React, { useEffect, useState } from 'react'
import client from '../client/ApiClient';
import BodySection from '../components/homepage/BodySection';
import PaginationSection from '../components/homepage/PaginationSection';
import HeaderSection from '../components/homepage/HeaderSection';
import { HeaderLoading, BodyLoading, PaginationLoading } from '../components/homepage/HomePageSkeleton';
import useDebounce from "../utils/useDebounce";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(["films", "people"]);
  const [listPage, setListPage] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentPage, setCurrentPage] = useState(1)
  const [filmsData, setFilmsData] = useState([])
  const [peopleData, setPeopleData] = useState([])
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 1000);

  const getDataFilms = async() => {
    let collection = []
    let totalPage = 0

    const promises = listPage.map(async (val, idx) => {
      let url = `https://swapi.dev/api/films/${val}/`
      const { data: response, status } = await client(url, { method: "GET" })

      if (status == 200){
        collection.push({...response, page: val})
        totalPage++
      }

      if (status == 404){
        console.log("not found")
      }
    })

    await Promise.all(promises)
    collection = collection.sort((a, b) => a.page - b.page)
    setFilmsData(collection)
    setListPage(listPage.slice(0, totalPage))
    setIsLoading(["people"])
    getDataPeople(collection[0].characters)
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
      console.log('data', data)
      if (status == 200){
        newData = data.results
      }
    }

    setPeopleData(newData)
    setIsLoading([])
  }

  const onChangeFilm = (val) => {
    setIsLoading(["people"])
    getDataPeople(val.characters)
  }

  const onPagination = (page) => {
    const film = filmsData.find(data => data.page == page)
    const characters = film.characters
    setIsLoading(["people"])
    getDataPeople(characters)
    setCurrentPage(page)
  }

  useEffect(() => {
    if (search){
      setIsLoading(["people"])
      getDataPeople(0, { search }, `https://swapi.dev/api/people/`)
    } else {
      getDataFilms(currentPage)
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