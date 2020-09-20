import React, { useState, useEffect } from 'react';
import client from "../../client/ApiClient";
import Modal from "../shared/Modal"

const StarshipList = ({ starships, isLoading, setIsLoading }) => {
  const [starshipsData, setStarshipsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({open: false})
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
          <p
            onClick={() => setIsModalOpen({ open: true, data})}
            className="cursor-pointer underline text-blue-500 mr-2 mb-2"
            key={idx}
          >
            {data.name}
          </p>
        ))}

        {starshipsData.length === 0 && (
          <p className="text-blue-500 mr-2 mb-2">No starships</p>
        )}
      </div>

      {isModalOpen.open && (
        <Modal setState={() => setIsModalOpen({open: false})}>
          <div className="flex">
            <p>Name:</p>
            <p className="ml-2">{isModalOpen.data.name}</p>
          </div>

          <div className="flex">
            <p>Model:</p>
            <p className="ml-2">{isModalOpen.data.model}</p>
          </div>

          <div className="flex">
            <p>Manufacturer:</p>
            <p className="ml-2">{isModalOpen.data.manufacturer}</p>
          </div>

          <div className="flex">
            <p>Length:</p>
            <p className="ml-2">{isModalOpen.data.length}</p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default StarshipList