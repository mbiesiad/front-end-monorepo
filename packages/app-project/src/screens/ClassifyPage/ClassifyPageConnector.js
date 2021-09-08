import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import ClassifyPageContainer from './ClassifyPageContainer'

function useStore(store) {
  const { 
    appLoadingState,
    user: { personalization: { projectPreferences }}
  } = store

  return { appLoadingState, projectPreferences }
}

function ClassifyPageConnector (props) {
  const { store } = useContext(MobXProviderContext)
  const { appLoadingState, projectPreferences } = useStore(store)

  return (
    <ClassifyPageContainer 
      appLoadingState={appLoadingState}
      projectPreferences={projectPreferences}
      {...props}
    />
  )
}

export default observer(ClassifyPageConnector)
