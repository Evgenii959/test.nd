import instance from './instance';

import authModule from  './auth';
import notesModule from './notes';

export default {
  auth: authModule(instance),
  notes: notesModule(instance),
  instance: instance,
};