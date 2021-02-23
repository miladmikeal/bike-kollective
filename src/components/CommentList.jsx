import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Text } from 'native-base';

const CommentList = (comments) => (
  <List>
    {comments.comments.map((comment) => (
      <ListItem>
        <Text>{comment}</Text>
      </ListItem>
    ))}
  </List>
);

CommentList.propTypes = {
  // There is an eslint bug where comments is not recognized as being used
  // eslint-disable-next-line react/no-unused-prop-types
  comments: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default CommentList;
