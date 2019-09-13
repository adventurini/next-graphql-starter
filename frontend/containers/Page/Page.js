import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import DisplayLoading from '../../components/DisplayLoading/DisplayLoading';
import DisplayError from '../../components/DisplayError/DisplayError';
import SignOn from '../../components/SignOn/SignOn';
import { IS_LOGGED_IN } from '../../graphql/queries';

const Page = React.memo(props => (
  <Query query={IS_LOGGED_IN}>
    {({ loading, error, data }) => {
      if (loading) return <DisplayLoading />;
      if (error) return <DisplayError error={error} />;

      return data.isLoggedIn ? props.children : <SignOn />;
    }}
  </Query>
));

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;