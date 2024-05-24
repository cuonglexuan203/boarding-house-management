import HomeNavbar from '@/components/HomeNavbar';

export default function HomeLayout(props: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <section>
      <HomeNavbar />
      {props.auth}
      {props.children}
    </section>
  );
}
