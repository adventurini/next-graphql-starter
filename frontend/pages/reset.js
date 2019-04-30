import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from '../components/Head/Head';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import DisplayError from '../components/DisplayError/DisplayError';

// Should this page be accessable if a user is logged in?

const ResetPage = React.memo(props => {
  const { resetToken, resetTokenExpiry } = props.router.query;

  const isTokenMissing = !resetToken || !resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;
  const isTokenValid = !isTokenMissing && !isTokenExpired;

  const tokenMissingError = {
    message: 'Your reset token is invalid.  Please request a new one.'
  };
  const tokenExpiredError = {
    message: 'Your reset token is expired.  Please request a new one.'
  };

  return (
    <>
      <Head title="Reset Password" />

      {isTokenMissing && <DisplayError error={tokenMissingError} />}
      {isTokenExpired && <DisplayError error={tokenExpiredError} />}

      {isTokenValid && <ResetPassword resetToken={resetToken} />}
    </>
  );
});

ResetPage.defaultProps = {
  router: { query: { resetToken: '', resetTokenExpiry: '' } }
};

ResetPage.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      resetToken: PropTypes.string,
      resetTokenExpiry: PropTypes.string
    })
  })
};

export default withRouter(ResetPage);
