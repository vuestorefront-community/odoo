import gql from 'graphql-tag';

export default gql`
  mutation($email: String){
    newsletterSubscribe(email: $email){
      subscribed
    }
  }`;
