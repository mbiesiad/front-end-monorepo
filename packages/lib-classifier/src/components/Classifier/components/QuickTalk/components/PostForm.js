/*
TODO
- [ ] Show status visually, e.g. when loading, and when there's an error.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Form, Text, TextArea } from 'grommet'
import styled from 'styled-components'
import { Markdownz, MarkdownEditor, PrimaryButton } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

const SubmitButton = styled(PrimaryButton)`
  display: block;
  margin: 0 auto;
`

function stopEvent (e) {
  if (!e) return false
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}

function PostForm ({
  postComment,
  postCommentStatus,
  postCommentStatusMessage,
}) {
  const [text, setText] = React.useState('')
  
  // Reset text when the comment is posting/has been posted.
  React.useEffect(() => {
    setText('')
  }, [postCommentStatus])
  
  function onSubmit (e) {
    postComment(text)
    return stopEvent(e)
  }
  
  const disabled = postCommentStatus === asyncStates.loading
  
  let statusText = undefined
  if (postCommentStatusMessage) {
    statusText = postCommentStatusMessage
  } else if (postCommentStatus === asyncStates.loading) {
    statusText = counterpart('QuickTalk.status.loading')
  }
  
  return (
    <Box
      background={{ dark: 'dark-1', light: 'light-1' }}
      flex={false}
      pad='small'
    >
      {statusText && (
        <Text>{statusText}</Text>
      )}
      <Form onSubmit={onSubmit}>
        <TextArea
          a11yTitle='Write comments'
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={disabled}
        />
        <SubmitButton
          a11yTitle='Post comment'
          onClick={onSubmit}
          type='submit'
          label='Post'
          disabled={disabled}
        />
      </Form>
    </Box>
  )
}

PostForm.propTypes = {
  postComment: PropTypes.func,
  postCommentStatus: PropTypes.string,
  postCommentStatusMessage: PropTypes.string,
}

export default PostForm
