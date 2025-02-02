import Classifier from '@zooniverse/classifier'
import auth from 'panoptes-client/lib/auth'
import { func, string, shape } from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import { logToSentry } from '@helpers/logger'
import ErrorMessage from './components/ErrorMessage'
import Loader from '@shared/components/Loader'

/**
  A wrapper for the Classifier component. Responsible for handling:
  - classifier errors.
  - updates to project recents on classification complete.
  - updates to stored favourites,when the classification subject is favourited.
  - updates to stored collections, when the classification subject is added to a collection.
*/
export default function ClassifierWrapper({
  authClient = auth,
  appLoadingState = asyncStates.initialized,
  collections,
  mode,
  onAddToCollection = () => true,
  onSubjectReset = () => true,
  project,
  recents,
  subjectID,
  subjectSetID,
  user,
  workflowID,
  yourStats
}) {
  function onCompleteClassification(classification, subject) {
    yourStats.increment()
    recents.add({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }

  function onError(error, errorInfo={}) {
    logToSentry(error, errorInfo)
    console.error('Classifier error', error)
  }

  function onToggleFavourite(subjectId, isFavourite) {
    if (isFavourite) {
      collections.addFavourites([subjectId])
    } else {
      collections.removeFavourites([subjectId])
    }
  }

  const somethingWentWrong = appLoadingState === asyncStates.error

  if (somethingWentWrong) {
    const { error: projectError } = project
    const { error: userError } = user
    
    const errorToMessage = projectError || userError || new Error('Something went wrong')
    return (
      <ErrorMessage error={errorToMessage} />
    )
  }

  try {
    if (appLoadingState === asyncStates.success) {
      const key = user.id || 'no-user'
      return (
        <Classifier
          authClient={authClient}
          key={key}
          mode={mode}
          onAddToCollection={onAddToCollection}
          onCompleteClassification={onCompleteClassification}
          onError={onError}
          onSubjectReset={onSubjectReset}
          onToggleFavourite={onToggleFavourite}
          project={project}
          subjectID={subjectID}
          subjectSetID={subjectSetID}
          workflowID={workflowID}
        />
      )
    }
  } catch (error) {
    onError(error)
    return (
      <ErrorMessage error={error} />
    )
  }

  return (
    <Loader
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{
        color: {
          dark: 'dark-3',
          light: 'light-3'
        },
        side: 'all',
        size: 'thin'
      }}
      height='100%'
      width='100%'
    />
  )
}

ClassifierWrapper.propTypes = {
  /** Callback that will be called with a subject ID when the classification subject is added to a collection. */
  onAddToCollection: func,
  /** Panoptes Auth client */
  authClient: shape({}),
  /** Callback that runs when the classifier subject queue is reset, so that we can pick a new subject. */
  onSubjectReset: func,
  /** JSON snapshot of the active Panoptes project */
  project: shape({}),
  /** optional subjectID (from the page URL.) */
  subjectID: string,
  /** optional subject set ID (from the page URL.) */
  subjectSetID: string,
  /** required workflow ID (from the page URL.) */
  workflowID: string
}
