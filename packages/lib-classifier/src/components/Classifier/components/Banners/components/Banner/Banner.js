import { PlainButton, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Button, Drop } from 'grommet'
import { CaretNext, CaretPrevious } from 'grommet-icons'
import { array, bool, func, oneOf, oneOfType, shape, string } from 'prop-types'
import React, { Component, createRef } from 'react'
import styled, { withTheme } from 'styled-components'

import en from './locales/en'
import TooltipText from './components/TooltipText'
import Triangle from '../../../shared/Triangle'

counterpart.registerTranslations('en', en)

function Label ({ color }) {
  return (
    <SpacedText color={color}>
      {counterpart('Banner.whyAmISeeingThis')}
    </SpacedText>
  )
}

export function Tooltip ({ mode, tooltipText }) {
  return (
    <Box direction='column' margin='xsmall'>
      <Triangle />
      <Box
        background={mode === 'light' ? 'white' : 'dark-2'}
        pad='small'
      >
        <TooltipText text={tooltipText} />
      </Box>
    </Box>
  )
}

class Banner extends Component {
  state = {
    tooltipOpen: false
  }

  ref = createRef()

  close = () => this.setState({ tooltipOpen: false })

  open = () => this.setState({ tooltipOpen: true })

  toggle = () => this.setState(state => ({ tooltipOpen: !state.tooltipOpen }))

  componentDidUpdate () {
    if (!this.props.show && this.state.tooltipOpen) {
      this.close()
    }
  }

  render () {
    const {
      background,
      bannerText,
      color,
      onNext,
      onPrevious,
      show,
      subjects,
      theme: { mode },
      tooltipText,
    } = this.props

    return show && (
      <Box
        align='center'
        animation='fadeIn'
        background={{ color: background }}
        direction='row'
        key={bannerText}
        justify='between'
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        show={show}
      >
        {onPrevious &&
          <PlainButton
            color={color}
            icon={<CaretPrevious color={color} size='15px' />}
            onClick={onPrevious}
            text={counterpart('Banner.previous')}
          />
        }
        <SpacedText color={color} weight='bold'>
          {bannerText}
        </SpacedText>
        {onNext &&
          <PlainButton
            color={color}
            icon={<CaretNext color={color} size='15px' />}
            onClick={onNext}
            reverse
            text={counterpart('Banner.next')}
          />
        }
        <Button
          disabled={!tooltipText}
          label={<Label color={color} />}
          onClick={this.toggle}
          plain
          ref={this.ref}
        />

        {this.ref.current && this.state.tooltipOpen && (
          <Drop
            align={{ right: 'right', top: 'bottom' }}
            onEsc={this.close}
            plain
            target={this.ref.current}
          >
            <Tooltip
              mode={mode}
              tooltipText={tooltipText}
            />
          </Drop>
        )}
      </Box>
    )
  }
}

Banner.propTypes = {
  background: string.isRequired,
  bannerText: string.isRequired,
  color: string,
  onNext: func,
  onPrevious: func,
  show: bool,
  theme: shape({
    mode: oneOf(['dark', 'light'])
  }),
  tooltipText: oneOfType([
    array,
    string
  ])
}

Banner.defaultProps = {
  color: 'neutral-6',
  show: false,
  theme: {
    mode: 'light'
  }
}

export default withTheme(Banner)
export {
  Banner
}
