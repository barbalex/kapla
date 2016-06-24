'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
moment.locale('de')
import styles from './Geschaeft.css'
import AreaGeschaeft from '../../containers/geschaeft/AreaGeschaeft'
import AreaNummern from '../../containers/geschaeft/AreaNummern'
import AreaFristen from '../../containers/geschaeft/AreaFristen'
import AreaParlVorstoss from '../../containers/geschaeft/AreaParlVorstoss'
import AreaRechtsmittel from '../../containers/geschaeft/AreaRechtsmittel'
import AreaPersonen from '../../containers/geschaeft/AreaPersonen'
import AreaHistory from '../../containers/geschaeft/AreaHistory'
import AreaZuletztMutiert from '../../containers/geschaeft/AreaZuletztMutiert'

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    geschaefteLayout: PropTypes.object.isRequired,
    geschaeftToggleActivated: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    onChangeDatePicker: PropTypes.func.isRequired
  }

  render = () => {
    const {
      geschaeft,
      geschaefteLayout,
      change,
      blur,
      onChangeDatePicker
    } = this.props

    // return immediately if no geschaeft
    const showGeschaeft = geschaeft && geschaeft.idGeschaeft
    if (!showGeschaeft) return null

    const showAreaParlVorstoss = geschaeft.geschaeftsart === 'Parlament. Vorstoss'
    const showAreaRechtsmittel = geschaeft.geschaeftsart === 'Rekurs/Beschwerde'
    const showAreaForGeschaeftsart = (
      showAreaParlVorstoss ||
      showAreaRechtsmittel
    )

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClassBaseString = totalWidth < 750 ? 'wrapperNarrow' : 'wrapperWide'
    // layout needs to work with or without area for geschaeftsart
    const wrapperClassString = (
      showAreaForGeschaeftsart ?
      wrapperClassBaseString :
      `${wrapperClassBaseString}NoAreaForGeschaeftsart`
    )
    const wrapperClass = styles[wrapperClassString]
    // prepare tab indexes
    const nrOfGFields = 10
    const nrOfNrFields = 10
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7

    return (
      <div className={styles.scrollContainer}>
        <div className={wrapperClass}>
          <AreaGeschaeft
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={change}
            blur={blur}
          />
          <AreaNummern
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={change}
            blur={blur}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={change}
              blur={blur}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={change}
              blur={blur}
              onChangeDatePicker={onChangeDatePicker}
            />
          }
          <AreaFristen
            nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
            change={change}
            blur={blur}
            onChangeDatePicker={onChangeDatePicker}
          />
          <AreaPersonen
            nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen}
            change={change}
            blur={blur}
          />
          <AreaHistory
            blur={blur}
            change={change}
          />
          <AreaZuletztMutiert />
          {/* need this so lowest fields are visible */}
          <div style={{ height: 52 }} />
        </div>
      </div>
    )
  }
}

export default Geschaeft
