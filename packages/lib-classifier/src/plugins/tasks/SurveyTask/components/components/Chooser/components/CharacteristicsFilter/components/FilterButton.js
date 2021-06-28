import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { CloseButton } from '@zooniverse/react-components'

export const StyledFilter = styled(Box)`
  button {
    display: none;
  }

  &:focus > button, 
  &:hover > button {
    display: block;
    position: absolute;
  }
`

export function FilterButton (props) {
  const {
    characteristicId,
    checked,
    onFilter,
    buttonSize,
    theme,
    valueImageSrc,
    valueLabel
  } = props

  let backgroundColor = (theme.dark) ? 'light-6' : 'neutral-6'
  if (checked) {
    if (theme.dark) {
      backgroundColor = 'brand'
    } else {
      backgroundColor = 'accent-1'
    }
  }
  const marginPerSize = buttonSize === 'small' ? 'none' : { bottom: 'xsmall' }
  const containerSize = buttonSize === 'small' ? '30px' : '40px'
  const mediaSize = buttonSize === 'small' ? '18' : '25'

  return (
    <StyledFilter
      align='center'
      background={{ color: backgroundColor }}
      height={containerSize}
      justify='center'
      margin={marginPerSize}
      round='full'
      width={containerSize}
    >
      <img
        alt={valueLabel}
        height={mediaSize}
        src={valueImageSrc}
        width={mediaSize}
      />
      {checked && (
        <CloseButton
          closeFn={(event) => {
            // Note: preventDefault and stopPropagation are to prevent the radio button input click handler from firing and re-selecting the characteristic filter
            event.preventDefault()
            event.stopPropagation()
            onFilter(characteristicId)
          }}
        />
      )}
    </StyledFilter>
  )
}

FilterButton.defaultProps = {
  characteristicId: '',
  checked: false,
  onFilter: () => {},
  buttonSize: 'medium',
  theme: {
    dark: false,
    global: {
      colors: {}
    }
  },
  valueImageSrc: '',
  valueLabel: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  onFilter: PropTypes.func,
  buttonSize: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}

export default withTheme(FilterButton)
