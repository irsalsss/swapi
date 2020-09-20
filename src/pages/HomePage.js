import React, { useEffect, useState } from 'react'
import client from '../client/ApiClient';
import BodySection from '../components/homepage/BodySection';
import PaginationSection from '../components/homepage/PaginationSection';
import HeaderSection from '../components/homepage/HeaderSection';
import { HeaderLoading, BodyLoading, PaginationLoading } from '../components/homepage/HomePageSkeleton';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(["films", "people"]);
  const [listPage, setListPage] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentPage, setCurrentPage] = useState(1)
  const [filmsData, setFilmsData] = useState([])
  const [peopleData, setPeopleData] = useState([])

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
    getDataPeople(collection[0].characters)
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
    setIsLoading([])
  }

  const onChangeFilm = (val) => {
    setCurrentPage(val.page || val)
  }

  console.log("filmsData", filmsData)
  console.log("peopleData", peopleData)

  useEffect(() => {
    getDataFilms(currentPage)
  }, [])

  return (
    <div className="w-3/4 h-720px m-6" id="container-home-page">

      {isLoading.includes('films') ? (
        <HeaderLoading />
        ) : (
        <HeaderSection
          onChangeFilm={onChangeFilm}
          filmsData={filmsData}
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

      {isLoading.includes('people') ? (
        <PaginationLoading />
        ) : (
        <PaginationSection
          isLoading={isLoading}
          listPage={listPage}
          currentPage={currentPage}
          onChangeFilm={onChangeFilm}
        />
      )}
    </div>
  )
}

export default HomePage;