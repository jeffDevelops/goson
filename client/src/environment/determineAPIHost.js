import determineEnv from './determineEnv';

export default function determineAPIHost() {
  const host = determineEnv();

  switch(host) {

    case 'DEV': return 'http://localhost:3000';
    
    case 'PROD': return 'https://goson.herokuapp.com'

    default: throw new Error('Was not able to determine API host because client host unknown.');
  }
}