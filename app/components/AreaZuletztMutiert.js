'use strict'

import React, { Component, PropTypes } from 'react'
import styles from './AreaZuletztMutiert.css'

class AreaZuletztMutiert extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    interneOptions: PropTypes.array
  }

  render() {
    const { geschaeft, interneOptions } = this.props
    let zuletztMutiertText

    if (!geschaeft.mutationsperson) {
      zuletztMutiertText = 'Bei diesem Geschäft wurde (noch) keine Mutationsperson gespeichert'
    } else {
      const mutPersonOptions = interneOptions.find((o) => {
        if (o.itKonto) {
          // seems that data contains lower case differences
          // and whitespace
          return o.itKonto.toLowerCase().replace(/ /g, '') === geschaeft.mutationsperson.toLowerCase().replace(/ /g, '')
        }
        return false
      })
      const name = (
        mutPersonOptions ?
        ` (${mutPersonOptions.vorname} ${mutPersonOptions.name})` :
        ''
      )
      zuletztMutiertText = `Zuletzt mutiert durch ${geschaeft.mutationsperson}${name} am ${geschaeft.mutationsdatum}`
    }

    return (
      <div className={styles.areaZuletztMutiert}>
        <div className={styles.fieldZuletztMutiert}>
          {zuletztMutiertText}
        </div>
      </div>
    )
  }
}

export default AreaZuletztMutiert
