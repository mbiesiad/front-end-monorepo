import { shallow } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'

import AuthenticationInvitationConnector, { DynamicallyImportedAuthenticationInvitationContainer } from './AuthenticationInvitationConnector'

describe('Component > AuthenticationInvitationConnector', function () {
  let wrapper
  let componentWrapper
  let useContextMock

  const mockStore = {
    store: {
      project: {
        isComplete: false
      },
      user: {
        isLoggedIn: false,
        personalization: {
          sessionCount: 5
        }
      }
    }
  }

  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <AuthenticationInvitationConnector />
    )
    componentWrapper = wrapper.find(DynamicallyImportedAuthenticationInvitationContainer)
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should be visible', function () {
    expect(componentWrapper.props().isVisible).to.be.true()
  })

  describe('when the project is finished', function () {
    before(function () {
      mockStore.store.project.isComplete = true
      wrapper = shallow(
        <AuthenticationInvitationConnector />
      )
      componentWrapper = wrapper.find(DynamicallyImportedAuthenticationInvitationContainer)
    })

    after(function () {
      mockStore.store.project.isComplete = false
    })

    it('should not be visible', function () {
      expect(componentWrapper.props().isVisible).to.be.false()
    })
  })

  describe('when the user is logged in', function () {
    before(function () {
      mockStore.store.user.isLoggedIn = true
      wrapper = shallow(<AuthenticationInvitationConnector />)
      componentWrapper = wrapper.find(DynamicallyImportedAuthenticationInvitationContainer)
    })

    after(function () {
      mockStore.store.user.isLoggedIn = false
    })

    it('should not be visible', function () {
      expect(componentWrapper.props().isVisible).to.be.false()
    })
  })

  describe('when the session classification count is less than five', function () {
    before(function () {
      mockStore.store.user.personalization.sessionCount = 3
      wrapper = shallow(<AuthenticationInvitationConnector />)
      componentWrapper = wrapper.find(DynamicallyImportedAuthenticationInvitationContainer)
    })

    it('should not be visible', function () {
      expect(componentWrapper.props().isVisible).to.be.false()
    })
  })
})
