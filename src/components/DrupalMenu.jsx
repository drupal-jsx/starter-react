import PropTypes from 'prop-types';
import { attributesToProps as p } from '@drupal-jsx/drupal-utils';

export default function DrupalMenu({ attributes, items }) {
  if (!items) { return <></>; }

  return(
    <ul { ...p(attributes) } >
      { Object.keys(items).map((key) =>
        <li key={ key } { ...p(items[key].attributes) }>
          <a href={ items[key].url }>{ items[key].title }</a>
          <DrupalMenu items={ items[key].below }></DrupalMenu>
        </li>
      )}
    </ul>
  );
}

DrupalMenu.propTypes = {
  attributes: PropTypes.object,
  items: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    // @todo Change this to a (not infinitely) recursive object of shapes like
    //   the parent items.
    below: PropTypes.object,
  })),
}
