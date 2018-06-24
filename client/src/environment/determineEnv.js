export default function determineEnv() {
  switch (window.location.hostname) {

    case 'localhost': return 'DEV';

    default: return 'PROD'

  }
}