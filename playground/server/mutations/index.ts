import { DocumentNode } from '@apollo/client';
import LoginMutation from './LoginMutation';

enum MutationName {
    LoginMutation = 'LoginMutation'
  }

const Mutations : Record<MutationName, DocumentNode> = {
    LoginMutation
}

export {
    Mutations,
    MutationName
}