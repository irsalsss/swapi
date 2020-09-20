import React from 'react';
import StarshipList from './StarshipList';

const BodySection = ({ peopleData, isLoading, setIsLoading }) => {

  return (
    <section id="mid-home-page" className="my-12 w-full flex flex-wrap justify-between">
      {peopleData.map((data, idx) => (
        <div key={idx} className="py-4 px-6 mb-4 border border-blue-500 text-blue-800 rounded w-30-percent">
          <h2 className="font-bold text-xl mb-2">{data.name}</h2>

          <div className="flex">
            <p>Height:</p>
            <p className="ml-2">{data.height}</p>
          </div>

          <div className="flex">
            <p>Mass:</p>
            <p className="ml-2">{data.mass}</p>
          </div>

          <div className="flex">
            <p>Hair Color:</p>
            <p className="ml-2">{data.hair_color}</p>
          </div>

          <div className="flex">
            <p>Eye Color:</p>
            <p className="ml-2">{data.eye_color}</p>
          </div>

          <StarshipList setIsLoading={setIsLoading} isLoading={isLoading} starships={data.starships} />

        </div>
      ))}
    </section>
  )
}

export default BodySection