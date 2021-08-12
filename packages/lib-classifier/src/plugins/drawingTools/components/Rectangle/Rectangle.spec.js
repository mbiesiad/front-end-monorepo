import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Rectangle from './Rectangle'
import { default as RectangleMark } from '../../models/marks/Rectangle'
import DragHandle from '../DragHandle'

/*
TODO
- [x] Draw rectangle
- [ ] Move rectangle
- [ ] Resize with top-left
- [ ] Resize with top-right
- [ ] Resize with bottom-left
- [ ] Resize with bottom-right
- [ ] Is active
- [ ] Is not active
- [ ] Delete rectangle
*/

describe.only('Rectangle tool', function () {
  it('should render a rectangle with the coordinates provided', function () {
    render(
      <Rectangle
        mark={{ x_center: 200, y_center: 200, width: 200, height: 200 }}
        scale={1}
      />
    )

    // TODO: How can we test an object or HTMLelement? Instead of each attribute individually?
    expect(screen.getByTestId('rectangle-element'))
      .to.have.attr('x')
      .to.equal('100')
    expect(screen.getByTestId('rectangle-element'))
      .to.have.attr('y')
      .to.equal('100')
    expect(screen.getByTestId('rectangle-element'))
      .to.have.attr('height')
      .to.equal('200')
    expect(screen.getByTestId('rectangle-element'))
      .to.have.attr('width')
      .to.equal('200')
  })

  // Create setup function that creates rectangle
  // it('should render an active rectangle with four drag handles', function () {
  //   const rectangle1 = render(
  //     <Rectangle
  //       active
  //       mark={{ x_center: 200, y_center: 200, width: 200, height: 200 }}
  //       scale={1}
  //     />
  //   )

  //   screen.debug()

  // const erik = screen.getByTestId('rectangle-element')
  // console.log('erik: ', erik)
  // })
})

// describe('Rectangle tool', function () {
//   it('should render a rectangle with the coordinates provided', function () {
//     const wrapper = shallow(
//       <Rectangle
//         mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
//         scale={1}
//       />
//     )
//     expect(
//       wrapper.containsMatchingElement(
//         <rect x={85} y={180} width={30} height={40} />
//       )
//     ).to.be.true()
//   })

//   it('should render an active rectangle with four drag handles', function () {
//     const wrapper = mount(
//       <Rectangle
//         active
//         mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
//         scale={1}
//       />
//     )
//     expect(wrapper.find(DragHandle)).to.have.lengthOf(4)
//   })

//   it('should resize when the drag handles are moved', function () {
//     const mark = RectangleMark.create({
//       id: 'rect1',
//       toolType: 'rectangle',
//       x_center: 100,
//       y_center: 200,
//       width: 30,
//       height: 40
//     })

//     const wrapper = mount(<Rectangle active mark={mark} scale={1} />)

//     const dragMove = wrapper
//       .find(DragHandle)
//       .find('[x=115][y=220][dragMove]')
//       .prop('dragMove')
//     expect(mark.x_center).to.equal(100)
//     expect(mark.y_center).to.equal(200)
//     expect(mark.width).to.equal(30)
//     expect(mark.height).to.equal(40)

//     dragMove({}, { x: 50, y: 20 })

//     expect(mark.x_center).to.equal(125)
//     expect(mark.y_center).to.equal(210)
//     expect(mark.width).to.equal(80)
//     expect(mark.height).to.equal(60)
//   })
// })
