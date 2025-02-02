import { types } from 'mobx-state-tree'
import RotateRectangleTool from '../RotateRectangleTool'
import { TemporalRotateRectangle } from '../../marks'

const TemporalRotateRectangleTool = types
  .model('TemporalRotateRectangle', {
    marks: types.map(TemporalRotateRectangle),
    type: types.literal('temporalRotateRectangle')
  })
  .actions((self) => {
    function createMark(mark) {
      const newMark = TemporalRotateRectangle.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose(
  'TemporalRotateRectangleTool',
  RotateRectangleTool,
  TemporalRotateRectangleTool
)
