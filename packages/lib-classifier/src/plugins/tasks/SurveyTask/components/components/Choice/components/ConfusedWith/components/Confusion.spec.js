import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import en from '../locales/en'
import Confusion from './Confusion'

const ELAND = mockTask.choices.LND
const HUMAN = mockTask.choices.HMN

describe('Component > Confusion', function () {
  it('should render without crashing', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen).to.be.ok()
  })

  it('should render the confusion choice label', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.getByText(ELAND.label)).to.be.exist()
  })

  it('should render confusion images with choice with images', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.getByTestId('confusion-images')).to.exist()
  })

  it('should not render confusion images with choice without images', function () {
    render(
      <Confusion
        confusion={HUMAN}
        confusionId='HMN'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.queryByTestId('confusion-images')).to.be.null()
  })

  it('should render confusion text', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.getByText('Test confusion text.')).to.exist()
  })

  it('should render a "Cancel" button', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.getByRole('button', { name: en.ConfusedWith.cancel })).to.exist()
  })

  it('should call onClose when the Cancel button is clicked', function () {
    const onCloseSpy = sinon.spy()

    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        onClose={onCloseSpy}
      />
    )
    userEvent.click(screen.getByRole('button', { name: en.ConfusedWith.cancel }))
    expect(onCloseSpy).to.have.been.calledOnce()
  })

  it('should render a "I think it\'s this" button', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen.getByRole('button', { name: en.ConfusedWith.itsThis })).to.exist()
  })

  it('should call handleChoice with confusion ID when the "I think it\'s this" button is clicked', function () {
    const handleChoiceSpy = sinon.spy()

    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        handleChoice={handleChoiceSpy}
        images={mockTask.images}
      />
    )
    userEvent.click(screen.getByRole('button', { name: en.ConfusedWith.itsThis }))
    expect(handleChoiceSpy).to.have.been.calledOnceWith('LND')
  })
})
