import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { css, withTheme } from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import Characteristics from '../Characteristics'
import FilterButton from '../components/FilterButton'
import FilterIcon from './FilterIcon'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

const StyledDropButton = styled(DropButton)`
  border: none;
  border-radius: 16px;
  padding: 3px 8px;

  ${props => css`background-color: ${props.backgroundColor};`}

  &:hover, &:focus {
    text-decoration: underline;
  }
`

export function FilterStatus (props) {
  const {
    filters,
    handleFilter,
    task,
    theme
  } = props
  const {
    characteristics,
    characteristicsOrder,
    images
  } = task

  const filterStatusRef = useRef()

  const selectedCharacteristicIds = Object.keys(filters)

  let backgroundColor = 'none'

  if (selectedCharacteristicIds.length > 0) {
    if (theme.dark) {
      backgroundColor = props.theme.global.colors.brand
    } else {
      backgroundColor = props.theme.global.colors['accent-1']
    }
  }
  return (
    <Box
      ref={filterStatusRef}
      border={{
        color: 'light-5',
        size: 'xsmall',
        style: 'solid',
        side: 'bottom'
      }}
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
      height='xxsmall'
    >
      <StyledDropButton
        backgroundColor={backgroundColor}
        dropAlign={{
          left: 'left',
          top: 'bottom'
        }}
        dropContent={
          <Characteristics
            characteristics={characteristics}
            characteristicsOrder={characteristicsOrder}
            filters={filters}
            images={images}
            onFilter={handleFilter}
          />
        }
        dropProps={{
          elevation: 'medium',
          stretch: 'align'
        }}
        dropTarget={filterStatusRef.current}
        gap='none'
        icon={<FilterIcon color='dark-5' />}
        label={
          <SpacedText
            color={{
              dark: 'accent-1',
              light: 'neutral-1'
            }}
            uppercase
          >
            {counterpart('CharacteristicsFilter.filter')}
          </SpacedText>
        }
        plain
      />
      {selectedCharacteristicIds.map(characteristicId => {
        const characteristic = characteristics?.[characteristicId] || {}
        const selectedValueId = filters?.[characteristicId] || ''
        const value = characteristic.values?.[selectedValueId] || {}
        const valueImageSrc = images?.[value.image] || ''

        return (
          <FilterButton
            key={selectedValueId}
            characteristicId={characteristicId}
            checked
            onFilter={handleFilter}
            buttonSize='small'
            valueImageSrc={valueImageSrc}
            valueLabel={value.label}
          />
        )
      })}
    </Box>
  )
}

FilterStatus.defaultProps = {
  filters: {},
  handleFilter: () => {},
  theme: {
    dark: false,
    global: {
      colors: {}
    }
  }
}

FilterStatus.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string),
  handleFilter: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default withTheme(FilterStatus)