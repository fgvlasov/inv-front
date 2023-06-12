import Link from "next/link";
import Loading from "./Loading";
import NavSubMenu from "./NavSubMenu";
import { useState } from "react";

export default function Nav({ menu }) {
  const [menuOpened, setMenuOpened] = useState(false);
  if (!menu) {
    return <Loading />;
  }

  return (
    <nav className="hidden lg:block lg:mr-auto text-inherit">
      <ul className="flex items-center justify-between">
        {menu
          .filter((item) => !item.parent)
          .map((item) =>
            item.collapsed ? (
              <li key={item.id} className="group relative">
                <p
                  className="p-5 flex items-center cursor-pointer"
                  onClick={() => setMenuOpened(!menuOpened)}
                >
                  {item.title}
                  <svg
                    className="w-[10px] ml-[8px] group-hover:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 7"
                  >
                    <path d="m1 1.3 4 4 4-4" stroke="#fff" />
                  </svg>
                </p>
                <NavSubMenu menu={menu} opened={menuOpened} />
              </li>
            ) : (
              <li key={item.id}>
                <Link href={item.path} className="p-5">
                  {item.title}
                </Link>
              </li>
            )
          )}
      </ul>
    </nav>
  );
}
