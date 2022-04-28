import { Layout } from "../components/Layout"
import { NoteForm } from "../features/notes/NoteForm"

export const NoteFormPage = () => (
  <Layout ratio='1/3'>
    <div className='mt-8'>
      <NoteForm />
    </div>
  </Layout>
);
