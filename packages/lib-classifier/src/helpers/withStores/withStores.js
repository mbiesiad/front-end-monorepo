import React from 'react'
import { observer } from 'mobx-react'
import useStores from '../useStores'
/**
  Connect a view component to the store, when all you want to do is map some store properties to component props, without any internal state in the connector component.
*/
export default function withStores(
  Component,
  storeMapper = store => store
) {

  function ComponentConnector(props) {
    const storeProps = useStores(storeMapper)
    return <Component {...storeProps} {...props} />
  }

  return observer(ComponentConnector)
}