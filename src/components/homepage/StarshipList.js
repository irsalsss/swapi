import React, { useState, useEffect } from 'react';
import client from "../../client/ApiClient";
import { StarshipsLoading } from './HomePageSkeleton';

const StarshipList = ({ starships, isLoading, setIsLoading }) => {
  const [starshipsData, setStarshipsData] = useState([]);

  const getStarshipsData = async() => {
    let newData = []
    let promises = starships.map(async (data) => {
      const { data: response, status } = await client(data, { method: "GET" })
      if (status == 200){
        newData.push(response)
      }
    })

    await Promise.all(promises);
    setStarshipsData(newData);
    setIsLoading([])
  }

  useEffect(() => {
    if(starships){
      getStarshipsData()
    }
  }, [])

  return (
    <>
      <h2 className="font-bold text-xl mb-2 mt-4">Starships</h2>
      <div className="flex flex-wrap items-center">
        {starshipsData.map((data, idx) => (
          <p className="underline text-blue-500 mr-2 mb-2" key={idx}>{data.name}</p>
        ))}
      </div>
    </>
  )
}

export default StarshipList