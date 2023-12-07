export interface CustomHTMLFormElement<FromControlsCollection = undefined>
  extends Omit<HTMLFormElement, 'elements'> {
  elements: FromControlsCollection
}
