import React from 'react';
import Skeleton from 'react-skeleton-loader';

export const HeaderLoading = () => {
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

export const PaginationLoading = () => {
  return (
    <div className="w-full h-8 flex justify-center">
      <Skeleton width="700px" />
    </div>
  )
}

export const BodyLoading = () => {
  return (
    <div id="mid-home-page" className="my-12 w-full flex flex-wrap justify-between">
      <div className="py-4 px-6 mb-4 w-30-percent">
        <Skeleton height="254px" width="324px" />
      </div>
      <div className="py-4 px-6 mb-4 w-30-percent">
        <Skeleton height="254px" width="324px" />
      </div>
      <div className="py-4 px-6 mb-4 w-30-percent">
        <Skeleton height="254px" width="324px" />
      </div>
    </div>
  )
}
