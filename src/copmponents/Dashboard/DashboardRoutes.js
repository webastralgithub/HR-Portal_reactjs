import React, { lazy, Suspense } from 'react'


export default function DashboardRoutes({type,accType}) {

  const DynamicComponent = lazy(() => import(`../${accType}/${type}`));

  return (
    <div>
{!type && <p>homepage</p>}
{type && <Suspense fallback={<div>Loading...</div>}>
      <DynamicComponent />
    </Suspense>}
    </div>
  )
}
