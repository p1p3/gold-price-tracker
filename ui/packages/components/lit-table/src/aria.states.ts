// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques
import { property, PropertyDeclaration } from 'lit-element';
import { kebabCase } from './helpers';
export function ariaPropertyState(
  options: {
    state:
      | WidegtAttribute
      | LiveRegionsAttribute
      | DragAndDropAttribute
      | RelationShipAttribute;
  } & PropertyDeclaration
): any {
  const config = Object.assign(
    {
      reflect: true,
      attribute: `aria-${options.state}`,
      converter: { toAttribute: (v: any, t) => kebabCase(v.toString()) },
    } as PropertyDeclaration,
    options
  );
  return property(config);
}

export type WidegtAttribute =
  | 'autocomplete'
  | 'checked'
  | 'current'
  | 'disabled'
  | 'errormessage'
  | 'expanded'
  | 'haspopup'
  | 'hidden'
  | 'invalid'
  | 'label'
  | 'level'
  | 'modal'
  | 'multiline'
  | 'multiselectable'
  | 'orientation'
  | 'placeholder'
  | 'pressed'
  | 'readonly'
  | 'required'
  | 'selected'
  | 'sort'
  | 'valuemax'
  | 'valuemin'
  | 'valuenow'
  | 'valuetext';

export type LiveRegionsAttribute = 'live' | 'relevant' | 'atomic' | 'busy';

export type DragAndDropAttribute = 'dropeffect' | 'dragged';

export type RelationShipAttribute =
  | 'activedescendant'
  | 'colcount'
  | 'colindex'
  | 'colspan'
  | 'controls'
  | 'describedby'
  | 'details'
  | 'errormessage'
  | 'flowto'
  | 'labelledby'
  | 'owns'
  | 'posinset'
  | 'rowcount'
  | 'rowindex'
  | 'rowspan'
  | 'setsize';
