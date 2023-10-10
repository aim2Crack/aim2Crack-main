// envUtils.js
function getEnvironment() {
  const currentURL = window.location.href;
  const development='http://127.0.0.1:7000'
  const production='https://a2cbackend.onrender.com/'

  if (currentURL.includes('localhost')) {
    return development;
  } else if (currentURL.includes('aim2crack.netlify.app')) {
    return production;
  } else {
    // Default to a specific environment or handle other cases
    return development;
  }
}

export default getEnvironment;
