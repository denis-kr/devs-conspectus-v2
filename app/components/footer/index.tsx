import cx from "classnames";
import { containerClasses } from "../../utils/styling";

export function Footer() {
  return (
    <footer className={cx(containerClasses, "my-2 sm:my-5 p-5")}>
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Denis Kravchenko.
      </div>
    </footer>
  );
}
