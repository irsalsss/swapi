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
    <div className="h-8">
      <Skeleton width="700px" />
    </div>
  )
}

export const BodyLoading = () => {
  return (
    <div id="mid-home-page" className="my-12">
      <Skeleton width="700px" height="224px" />
    </div>
  )
}

export const StarshipsLoading = () => {
  return (
    <div>
      <div className="mt-4">
        <Skeleton width="200px" />
      </div>
      <div className="mt-1">
        <Skeleton width="100px" />
      </div>
      <div className="mt-1">
        <Skeleton width="100px" />
      </div>
      <div className="mt-1">
        <Skeleton width="100px" />
      </div>
    </div>
  )
}
