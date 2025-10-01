type HeaderSearchProps = {
  className?: string;
};

const HeaderSearch = ({ className }: HeaderSearchProps) => {
  return (
    <div className={className}>
      <input type="text" placeholder="Search че хочешь" name="search" />
    </div>
  );
};

export default HeaderSearch;
