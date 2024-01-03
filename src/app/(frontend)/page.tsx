import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getAllEmails from '../../actions/getAllEmails';
import InboxView from '../../components/InboxView';

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (!token) {
    return redirect('/login');
  }

  const { data, success } = await getAllEmails();

  return (
    <div className="w-full h-full flex flex-col bg-[url('https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover">
      <div className="px-10 py-4 border-b shadow-md bg-white w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <p className="text-2xl font-medium">Outlook Inbox</p>
          <a href="/api/logout">Sign Out</a>
        </div>
      </div>
      <InboxView emails={data} success={success} />
    </div>
  );
}
