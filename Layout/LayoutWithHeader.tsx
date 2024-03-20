import Header from '@/components/Header';

const LayoutWithHeader = ({
  children,
}: {
  children: React.ReactNode | undefined;
}) => {
  return (
    <>
      <Header />
      <div className='min-h-full'>{children}</div>
    </>
  );
};

export default LayoutWithHeader;
