import { MyTodo } from '../components/MyTodo';
import { Layout } from 'src/layouts/Layout';

const MyTodoPage = () => (
  <>
    <Layout pageTitle="mytodo">
      <MyTodo />
    </Layout>
  </>
);

export default MyTodoPage;
