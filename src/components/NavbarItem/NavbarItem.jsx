import NavbarLink from "../NavbarLink/NavbarLink";

function NavbarItem({ title, to }) {
  return (
    <li className="navbar__dropdown-item mb-3 py-1">
      <NavbarLink title={title} to={to} />
    </li>
  );
}

export default NavbarItem;
