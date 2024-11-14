export default function (instance) {
  return {
    getNotes() {
      return instance.get('api/notes');
    },
    addNote(payload) {
      return instance.post('api/notes', payload);
    },
    deleteNote(id) {
      return instance.delete(`/api/notes/${id}`);
    },
  };
}
