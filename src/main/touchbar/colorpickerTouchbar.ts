'use strict'

import { EventEmitter } from 'events'
import { TouchBar, nativeImage } from 'electron'

const { TouchBarColorPicker, TouchBarButton } = TouchBar

export default class ColorpickerTouchbar {
  private eventEmitter: EventEmitter
  private touchBar: TouchBar

  constructor () {
    this.eventEmitter = new EventEmitter()
    this.touchBar = new TouchBar({ items: [] })
    this.init()
  }

  private init (): void {
    const colorpicker = new TouchBarColorPicker({
      change: color => this.eventEmitter.emit('changeColor', color)
    })
    const eyedropper = new TouchBarButton({
      icon: nativeImage.createFromPath(`${__dirname}/eyedropper-touchbar.png`),
      click: () => this.eventEmitter.emit('launchPicker')
    })
    const colorsbook = new TouchBarButton({
      icon: nativeImage.createFromPath(`${__dirname}/colorsbook-touchbar.png`),
      click: () => this.eventEmitter.emit('launchColorsbook')
    })
    const settings = new TouchBarButton({
      icon: nativeImage.createFromPath(`${__dirname}/settings-touchbar.png`),
      click: () => this.eventEmitter.emit('showPreferences')
    })

    this.touchBar = new TouchBar({
      items: [colorpicker, eyedropper, colorsbook, settings]
    })
  }

  public getTouchBar (): TouchBar {
    return this.touchBar
  }
}
