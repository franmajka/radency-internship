import { Link } from "react-router-dom";
import { Button } from "../components/button/Button";
import { Layout } from "../components/Layout";
import { Notes } from "../features/notes/Notes";
import { NotesStats } from "../features/notes/NotesStats";

export const NotesPage = () => (
  <Layout>
    <Notes />

    <div className='mt-8'>
      <Link to='create'>
        <Button>
          Create note
        </Button>
      </Link>
    </div>

    <NotesStats />
  </Layout>
);
