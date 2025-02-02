import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store'
import { SubjectFactory, SubjectSetFactory, ProjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

import branchingWorkflow from './branchingWorkflow'

/** build a mock store, with a branching workflow, steps, tasks and subjects. */
export default function mockStore({
  project,
  subject,
  subjectSet,
  workflow = branchingWorkflow
} = {}) {

  const subjectSnapshot = subject || SubjectFactory.build({
    metadata: {}
  })

  const subjectSetSnapshot = subjectSet || SubjectSetFactory.build()

  const workflowSnapshot = workflow || WorkflowFactory.build()

  const projectSnapshot = ProjectFactory.build({}, {
    activeWorkflowId: workflowSnapshot.id
  })

  const subjects = [ subjectSnapshot, ...Factory.buildList('subject', 9)]

  const { panoptes } = stubPanoptesJs({
    field_guides: [],
    projects: [projectSnapshot],
    subjects,
    tutorials: [],
    workflows: [workflowSnapshot]
  })
  const client = {
    caesar: { request: sinon.stub().callsFake(() => Promise.resolve({})) },
    panoptes,
    tutorials: {
      get: sinon.stub().callsFake(() =>
        Promise.resolve({ body: {
          tutorials: []
        }})
      )
    }
  }
  const rootStore = RootStore.create({
    projects: {
      active: projectSnapshot.id,
      resources: {
        [projectSnapshot.id]: projectSnapshot
      }
    },
    subjects: {
      active: subjectSnapshot.id,
      resources: {
        [subjectSnapshot.id]: subjectSnapshot
      }
    },
    subjectSets: {
      active: subjectSetSnapshot.id,
      resources: {
        [subjectSetSnapshot.id]: subjectSetSnapshot
      }
    },
    workflows: {
      active: workflowSnapshot.id,
      resources: {
        [workflowSnapshot.id]: workflowSnapshot
      }
    }
  }, {
    authClient: {
      checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null)),
      checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
    },
    client
  })
  rootStore.workflows.setResources([workflowSnapshot])
  rootStore.workflows.setActive(workflowSnapshot.id)
  rootStore.subjects.setResources([subjectSnapshot])
  rootStore.subjects.advance()
  return rootStore
}