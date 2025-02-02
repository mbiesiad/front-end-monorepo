import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import DoneAndTalkButton from './DoneAndTalkButton'

function withStores(Component) {
  function DoneAndTalkButtonConnector(props) {
    const {
      classifierStore: {
        annotatedSteps: {
          finish,
          hasNextStep
        },
        classifications: {
          completeClassification
        },
        subjects: {
          active: subject
        },
        workflowSteps: {
          shouldWeShowDoneAndTalkButton
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (!hasNextStep && shouldWeShowDoneAndTalkButton && subject?.id) {
      function onClick(event) {
        event.preventDefault()
        const isCmdClick = event.metaKey
        subject.openInTalk(isCmdClick)
        finish()
        return completeClassification()
      }

      return (
        <Component
          onClick={onClick}
          {...props}
        />
      )
    }

    return null
  }
  return observer(DoneAndTalkButtonConnector)
}

export default withStores(DoneAndTalkButton)
